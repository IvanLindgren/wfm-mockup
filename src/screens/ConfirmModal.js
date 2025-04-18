import React from 'react';
import { Modal, Box, Typography, Button, List, ListItem, ListItemText, Divider } from '@mui/material';
import { motion } from 'framer-motion'; // Для анимации

// Стили те же, что и у EquipmentSelectModal
const modalStyle = {
  width: '90%',
  maxWidth: 420,
  minWidth: 280,
  minHeight: 120,
  maxHeight: '90vh',
  bgcolor: '#fff0fa',
  border: 'none',
  borderRadius: '18px',
  boxShadow: '0 8px 32px rgba(255, 105, 180, 0.25)',
  p: { xs: 2, sm: 4 },
  textAlign: 'center',
  outline: 'none',
  overflowY: 'auto',
};

// Анимация для появления
const backdropVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 }
};
const modalVariants = {
  hidden: { y: "-50px", opacity: 0 },
  visible: { y: "0", opacity: 1, transition: { delay: 0.1 } }
};


function ConfirmModal({ open, onClose, equipment = [], client = "Не указан", onConfirm }) {
  return (
    <Modal
      open={open}
      onClose={onClose}
      closeAfterTransition // Для работы анимации Framer Motion
      BackdropComponent={motion.div} // Используем motion.div для фона
      BackdropProps={{
        initial:"hidden",
        animate:"visible",
        exit:"hidden",
        variants:backdropVariants,
        transition:{ duration: 0.2 }
      }}
      sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
      container={document.body}
      disablePortal={false}
    >
      <motion.div initial="hidden" animate="visible" exit="hidden" variants={modalVariants}>
          <Box sx={modalStyle}>
            <Typography variant="h6" component="h2" gutterBottom>
              Подтверждение Выдачи Оборудования
            </Typography>
            <Typography variant="body1" sx={{ mb: 1 }}>
              Клиент: <strong>{client}</strong>
            </Typography>
            <Typography variant="body1" sx={{ mb: 1 }}>
              Выбрано оборудование:
            </Typography>
            <Box sx={{ maxHeight: '40vh', overflowY: 'auto', border: '1px solid #eee', borderRadius: 1, mb: 2 }}>
              <List dense disablePadding>
                {equipment.map((eq, index) => (
                  <React.Fragment key={eq.id}>
                    <ListItem>
                      <ListItemText
                        primary={`${eq.type} - ${eq.model}`}
                        secondary={`S/N: ${eq.id}`}
                      />
                    </ListItem>
                    {index < equipment.length - 1 && <Divider component="li" />}
                  </React.Fragment>
                ))}
              </List>
            </Box>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              При подтверждении информация будет отправлена в RMS и будет сгенерирован акт.
            </Typography>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
              <Button onClick={onClose} sx={{ mr: 1 }}>Отмена</Button>
              <Button variant="contained" sx={{ background: '#ff69b4', color: '#fff', '&:hover': { background: '#ff3cab' } }} onClick={onConfirm}>
                Подтвердить Выдачу
              </Button>
            </Box>
          </Box>
      </motion.div>
    </Modal>
  );
}
export default ConfirmModal;