import React from 'react';
import { Modal, Box, Typography, Button } from '@mui/material';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { motion } from 'framer-motion';

// Стили как у ConfirmModal
const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '90%',
  maxWidth: 400,
  bgcolor: '#fff0fa',
  borderRadius: '16px',
  boxShadow: '0 8px 32px #ffb7e0aa',
  p: 4,
  textAlign: 'center', // Центрируем контент
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