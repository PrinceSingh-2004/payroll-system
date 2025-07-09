import { createClient } from '@supabase/supabase-js';

const supabaseUrl = "https://muidcdpuqnegicrbxehs.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im11aWRjZHB1cW5lZ2ljcmJ4ZWhzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDcxNTM1NjEsImV4cCI6MjA2MjcyOTU2MX0.8nl3o_kuiaIaACUISOYOhvCTijrXlnm6eYPDkOsnt3M";

console.log('Supabase URL:', supabaseUrl);
console.log('Supabase Anon Key:', supabaseAnonKey ? 'Set' : 'Not set');

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Missing Supabase environment variables!');
  console.error('Please check your .env file in the payroll-frontend directory');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Make supabase available in browser console for debugging
if (typeof window !== 'undefined') {
  window.supabase = supabase;
  console.log('Supabase client attached to window.supabase for debugging');
}

// Test the connection
supabase.auth.getSession().then(({ data, error }) => {
  if (error) {
    console.error('Supabase connection error:', error);
  } else {
    console.log('Supabase connected successfully');
  }
}); 