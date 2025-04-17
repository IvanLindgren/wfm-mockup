import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { List, ListItem, ListItemText, ListItemButton, Typography, Paper } from '@mui/material';
import Header from '../components/Header';
import { naryady } from '../data/mockData';

function NaryadListScreen() {
  return (
    <>
      <Header title="Список Нарядов" />
      <Paper elevation={2} sx={{ mt: 2 }}> {/* Обертка для красоты */}
        <List disablePadding> {/* Убираем отступы у списка */}
          {naryady.map((naryad) => (
            <ListItem key={naryad.id} disablePadding divider> {/* Добавляем разделители */}
              <ListItemButton component={RouterLink} to={`/naryad/${naryad.id}`}>
                <ListItemText
                  primary={`Наряд ${naryad.id} - ${naryad.client}`}
                  secondary={`${naryad.address} | Статус: ${naryad.status}`}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        {naryady.length === 0 && (
            <Typography sx={{ p: 2, textAlign: 'center' }}>Нет доступных нарядов.</Typography>
        )}
      </Paper>
    </>
  );
}

export default NaryadListScreen;