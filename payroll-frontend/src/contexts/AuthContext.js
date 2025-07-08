import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { supabase } from '../supabaseClient';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);
  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [roleError, setRoleError] = useState('');

  // Helper to fetch role and handle errors
  const fetchUserProfile = useCallback(async (userId) => {
    // Add a failsafe timeout
    const timeoutId = setTimeout(() => {
      console.log('[fetchUserProfile] TIMEOUT - forcing setLoading(false)');
      setLoading(false);
      setRoleError('Role fetch timed out. Please try again.');
    }, 10000);

    try {
      setRoleError('');
      console.log('[fetchUserProfile] Fetching role for user:', userId);
      console.log('[fetchUserProfile] User ID type:', typeof userId);
      console.log('[fetchUserProfile] User ID length:', userId?.length);
      
      const { data: roleData, error: roleError } = await supabase
        .from('user_roles')
        .select('role')
        .eq('user_id', userId)
        .single();
      console.log('[fetchUserProfile] roleData:', roleData, 'roleError:', roleError);
      console.log('[fetchUserProfile] Full query result:', { roleData, roleError });
      
      clearTimeout(timeoutId); // Clear timeout on success
      
      if (roleError || !roleData) {
        console.log('[fetchUserProfile] No role found or error:', roleError);
        setRole(null);
        setRoleError('Could not fetch user role. Please try again.');
        setLoading(false);
        return;
      }
      setRole(roleData?.role ?? null);
      const { data: { user: authUser }, error: authError } = await supabase.auth.getUser();
      console.log('[fetchUserProfile] authUser:', authUser, 'authError:', authError);
      if (authError) {
        setRoleError('Could not fetch user profile.');
        setLoading(false);
        return;
      }
      setUserProfile({
        id: authUser.id,
        email: authUser.email,
        role: roleData?.role,
        created_at: authUser.created_at,
        last_sign_in_at: authUser.last_sign_in_at
      });
      setLoading(false);
    } catch (error) {
      clearTimeout(timeoutId); // Clear timeout on error
      setRoleError('Error fetching user profile: ' + error.message);
      setLoading(false);
      console.error('[fetchUserProfile] Exception:', error);
    }
  }, []);

  // Retry role fetch
  const retryRoleFetch = useCallback(async () => {
    if (user) {
      setLoading(true);
      await fetchUserProfile(user.id);
      setLoading(false);
    }
  }, [user, fetchUserProfile]);

  useEffect(() => {
    // Get initial session
    const getInitialSession = async () => {
      // Add a failsafe timeout
      const timeoutId = setTimeout(() => {
        console.log('[getInitialSession] TIMEOUT - forcing setLoading(false)');
        setLoading(false);
        setRoleError('Session initialization timed out. Please refresh the page.');
      }, 5000);

      try {
        setRoleError('');
        setLoading(true);
        const { data: { session }, error } = await supabase.auth.getSession();
        console.log('[getInitialSession] session:', session, 'error:', error);

        clearTimeout(timeoutId); // Clear timeout on success

        if (error || !session) {
          // Force sign out and clear all state if session is invalid or error
          await supabase.auth.signOut();
          setUser(null);
          setRole(null);
          setUserProfile(null);
          setLoading(false);
          setRoleError('Session expired or invalid. Please log in again.');
          return;
        }
        setUser(session.user);
        await fetchUserProfile(session.user.id);
      } catch (error) {
        clearTimeout(timeoutId); // Clear timeout on error
        setRoleError('Error getting initial session: ' + error.message);
        setLoading(false);
        console.error('[getInitialSession] Exception:', error);
      }
    };
    getInitialSession();
    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      console.log('[onAuthStateChange] event:', event, 'session:', session);
      setUser(session?.user ?? null);
      if (session?.user) {
        await fetchUserProfile(session.user.id);
      } else {
        setRole(null);
        setUserProfile(null);
        setLoading(false);
      }
    });
    return () => {
      subscription.unsubscribe();
    };
  }, [fetchUserProfile]);

  // Role-based permission checks
  const hasRole = (requiredRoles) => {
    if (!role) return false;
    if (Array.isArray(requiredRoles)) {
      return requiredRoles.includes(role);
    }
    return role === requiredRoles;
  };
  const isAdmin = () => hasRole('admin');
  const isHR = () => hasRole(['admin', 'hr']);
  const isEmployee = () => hasRole(['admin', 'hr', 'employee']);
  const logout = async (onSuccess) => {
    try {
      console.log('[logout] Starting logout process...');
      
      // Clear all state immediately
      setUser(null);
      setRole(null);
      setUserProfile(null);
      setLoading(false);
      setRoleError(''); // Clear any role errors
      localStorage.removeItem('pending_role');
      
      console.log('[logout] State cleared, calling supabase.auth.signOut()...');
      
      // Sign out from Supabase
      const { error } = await supabase.auth.signOut();
      
      if (error) {
        console.error('[logout] Supabase signOut error:', error);
        setRoleError('Error during logout: ' + error.message);
      } else {
        console.log('[logout] Supabase signOut successful');
      }
      
      // Call success callback if provided
      if (typeof onSuccess === 'function') {
        console.log('[logout] Calling onSuccess callback...');
        onSuccess();
      }
      
      console.log('[logout] Logout process completed');
    } catch (error) {
      console.error('[logout] Exception during logout:', error);
      setRoleError('Error during logout: ' + error.message);
      setLoading(false);
    }
  };
  const contextValue = {
    user, 
    role, 
    userProfile, 
    loading,
    hasRole,
    isAdmin,
    isHR,
    isEmployee,
    logout,
    roleError,
    retryRoleFetch
  };
  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}; 