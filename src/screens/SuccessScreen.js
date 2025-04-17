import React from 'react';
import { Modal, Box, Typography, Button, CheckCircleOutline } from '@mui/material';
import { motion } from 'framer-motion'; // Для анимации

const style = { /* Стили */ };

function SuccessScreen({ onViewAct }) { // Принимаем функцию для просмотра акта
  return (
      // Можно сделать и модальным окном, и отдельным экраном
      <Box sx={style} component={motion.div} initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }}>
        <CheckCircleOutline color="success" sx={{ fontSize: 60, mb: 2 }}/>
        <Typography variant="h5" component="h2" sx={{ mb: 2 }}>Успешно!</Typography>
        <Typography sx={{ mb: 3 }}>Оборудование отмечено как выданное. Данные переданы в RMS, акт сформирован.</Typography>
        <Button variant="contained" onClick={onViewAct}>
          Просмотреть Акт
        </Button>
      </Box>
  );
}
export default SuccessScreen;