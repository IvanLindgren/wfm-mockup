import React from 'react';
import { Modal, Box, Typography, Button } from '@mui/material';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { motion } from 'framer-motion';

// Стили как у ConfirmModal
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

// Анимации как у ConfirmModal
const backdropVariants = { hidden: { opacity: 0 }, visible: { opacity: 1 } };
const modalVariants = {
  hidden: { scale: 0.8, opacity: 0 },
  visible: { scale: 1, opacity: 1, transition: { delay: 0.1, type: "spring", stiffness: 150 } }
};


function SuccessModal({ open, onClose, onViewAct }) {
  return (
     <Modal
      open={open}
      onClose={onClose} // Закрытие по клику вне окна
      closeAfterTransition
      BackdropComponent={motion.div}
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
            <CheckCircleOutlineIcon color="success" sx={{ fontSize: 60, mb: 2 }}/>
            <Typography variant="h5" component="h2" sx={{ mb: 2 }}>
              Успешно!
            </Typography>
            <Typography sx={{ mb: 3 }}>
              Оборудование отмечено как выданное. Данные переданы, акт сформирован.
            </Typography>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}> {/* Кнопки по краям */}
                <Button variant="outlined" onClick={onViewAct}>
                    Просмотреть Акт
                </Button>
                 <Button variant="contained" onClick={onClose}>
                    Закрыть
                </Button>
            </Box>
          </Box>
       </motion.div>
    </Modal>
  );
}
export default SuccessModal;