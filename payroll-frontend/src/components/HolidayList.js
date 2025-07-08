// src/components/HolidayList.js

import React from 'react';
import {
  List,
  ListItem,
  ListItemText,
  IconButton,
  Typography,
  Paper
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

const HolidayList = ({ holidays, onEdit, onDelete }) => {
  return (
    <Paper elevation={3} sx={{ padding: 2 }}>
      <Typography variant="h6" gutterBottom>
        Holiday List
      </Typography>
      {holidays.length === 0 ? (
        <Typography>No holidays added yet.</Typography>
      ) : (
        <List>
          {holidays.map((holiday, index) => (
            <ListItem
              key={index}
              secondaryAction={
                <>
                  <IconButton edge="end" onClick={() => onEdit(holiday)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton edge="end" onClick={() => onDelete(holiday)}>
                    <DeleteIcon />
                  </IconButton>
                </>
              }
            >
              <ListItemText
                primary={`${holiday.date} - ${holiday.name}`}
              />
            </ListItem>
          ))}
        </List>
      )}
    </Paper>
  );
};

export default HolidayList;
// This component displays a list of holidays with options to edit or delete each holiday.