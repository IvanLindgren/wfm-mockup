import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { AppBar, Toolbar, Typography, IconButton } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

function Header({ title }) {
  const navigate = useNavigate();
  const location = useLocation();
  const showBackButton = location.pathname !== '/'; // Показываем кнопку "назад" везде, кроме главной

  return (
    <AppBar position="static" sx={{ background: '#ff69b4', boxShadow: '0 4px 16px #ffb7e0aa' }}>
      <Toolbar>
        {showBackButton && (
          <IconButton
            edge="start"
            color="inherit"
            aria-label="back"
            onClick={() => navigate(-1)} // Вернуться на предыдущую страницу
            sx={{ mr: 2 }}
          >
            <ArrowBackIcon />
          </IconButton>
        )}
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          {title}
        </Typography>
        {/* Можно добавить другие элементы, например, иконку пользователя */}
      </Toolbar>
    </AppBar>
  );
}

export default Header;