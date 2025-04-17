import React, { useState, useEffect } from 'react';
import { Modal, Box, Typography, List, ListItem, ListItemText, Checkbox, Button, Divider, Chip } from '@mui/material';
import ListItemButton from '@mui/material/ListItemButton';
import Alert from '@mui/material/Alert';
import BuildIcon from '@mui/icons-material/Build';
import MemoryIcon from '@mui/icons-material/Memory';
import RouterIcon from '@mui/icons-material/Router';
import EmojiObjectsIcon from '@mui/icons-material/EmojiObjects';
import './EquipmentSelectModal.anim.css';

// Стили для модального окна (вынесены для читаемости)
const modalStyle = {
  width: '90%',
  maxWidth: 420,
  minWidth: 280,
  minHeight: 120,
  maxHeight: '90vh',
  bgcolor: '#fff0fa',
  border: 'none',
  borderRadius: '18px',
  boxShadow: '0 8px 32px rgba(255, 105, 180, 0.25)', // розовая тень
  p: { xs: 2, sm: 4 },
  outline: 'none',
  overflowY: 'auto',
};

function EquipmentSelectModal({ open, onClose, equipmentList = [], requiredTypes = [], onSelect }) {
  const [selectedIds, setSelectedIds] = useState([]);
  const [selectionError, setSelectionError] = useState('');

  // Сброс состояния при открытии/закрытии
  useEffect(() => {
    if (open) {
      setSelectedIds([]);
      setSelectionError('');
    }
  }, [open]);

  const handleToggle = (id) => {
    setSelectionError(''); // Сбросить ошибку при изменении выбора
    const currentIndex = selectedIds.indexOf(id);
    const newChecked = [...selectedIds];

    if (currentIndex === -1) {
      newChecked.push(id);
    } else {
      newChecked.splice(currentIndex, 1);
    }
    setSelectedIds(newChecked);
  };

  const validateSelection = () => {
    const selectedItems = equipmentList.filter(eq => selectedIds.includes(eq.id));
    const selectedTypes = selectedItems.map(item => item.type);

    // Простая проверка: выбрано ли хотя бы по одному устройству каждого требуемого типа
    for (const reqType of requiredTypes) {
      if (!selectedTypes.includes(reqType)) {
        return `Не выбрано оборудование типа: ${reqType}`;
      }
    }
    // Можно добавить более сложные проверки (например, не больше одного роутера, если нужно)
    return ''; // Ошибки нет
  }

  const handleSubmit = () => {
    const errorMsg = validateSelection();
    if (errorMsg) {
        setSelectionError(errorMsg);
        return;
    }

    const finalSelection = equipmentList.filter(eq => selectedIds.includes(eq.id));
    onSelect(finalSelection);
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      closeAfterTransition
      aria-labelledby="equipment-select-modal-title"
      aria-describedby="equipment-select-modal-description"
      sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
      container={document.body}
      disablePortal={false}
    >
      <Box sx={modalStyle} className="equipment-modal-appear">
        <Typography variant="h6" component="h2" sx={{ mb: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
          <EmojiObjectsIcon sx={{ fontSize: 28, color: '#ff69b4' }} />
          Выбор оборудования <span role="img" aria-label="tools">🛠️</span>
        </Typography>
        <Divider sx={{ mb: 2 }} />
        <List>
          {equipmentList.length > 0 ? equipmentList.map((eq) => (
            <ListItem key={eq.id} disablePadding className="equipment-list-item">
              <ListItemButton onClick={() => handleToggle(eq.id)} selected={selectedIds.includes(eq.id)}>
                <Checkbox
                  edge="start"
                  checked={selectedIds.includes(eq.id)}
                  tabIndex={-1}
                  disableRipple
                  sx={{ mr: 1, color: '#ff69b4', '&.Mui-checked': { color: '#ff69b4' } }}
                />
                {/* Иконка по типу оборудования + эмодзи */}
                {eq.type === 'Роутер' && <RouterIcon sx={{ color: '#ff69b4', mr: 1 }} />}
                {eq.type === 'Память' && <MemoryIcon sx={{ color: '#ff69b4', mr: 1 }} />}
                {eq.type === 'Инструмент' && <BuildIcon sx={{ color: '#ff69b4', mr: 1 }} />}
                {/* Эмодзи для других типов */}
                {eq.type !== 'Роутер' && eq.type !== 'Память' && eq.type !== 'Инструмент' && (
                  <span className="equipment-emoji" role="img" aria-label="equipment">🔧</span>
                )}
                <ListItemText
                  primary={eq.name}
                  secondary={<span style={{ color: '#ff69b4' }}>{eq.type}</span>}
                  sx={{ ml: 1 }}
                />
              </ListItemButton>
            </ListItem>
          )) : (
            <Typography sx={{p: 2, textAlign: 'center', color: 'text.secondary'}}>
              Нет доступного оборудования нужного типа <span role="img" aria-label="sad">😕</span>.
            </Typography>
          )}
        </List>
        {selectionError && (
          <Alert severity="warning" className="equipment-alert" sx={{ mt: 2, fontSize: '1.1em', alignItems: 'center' }}>
            ⚠️ {selectionError}
          </Alert>
        )}
        <Box sx={{ mt: 3, display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, justifyContent: 'center', alignItems: 'center', gap: 2, background: 'none' }}>
          <Button onClick={onClose} className="cancel-btn-anim" sx={{ mb: { xs: 1, sm: 0 }, borderRadius: 2, px: 3, color: '#ff3cab' }}>
            ❌ Отмена
          </Button>
          <Button
            variant="contained"
            onClick={handleSubmit}
            disabled={selectedIds.length === 0 || equipmentList.length === 0}
            className="confirm-btn-anim"
            sx={{ borderRadius: 2, px: 3, background: '#ff69b4', color: '#fff', '&:hover': { background: '#ff3cab' }, boxShadow: '0 2px 8px #ff69b433' }}
            >
            ✅ Подтвердить
          </Button>
        </Box>
      </Box>
    </Modal>
  );
}
export default EquipmentSelectModal;