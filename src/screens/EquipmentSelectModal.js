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
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '90%',
  maxWidth: 500,
  bgcolor: '#fff0fa',
  border: 'none',
  borderRadius: '16px',
  boxShadow: '0 8px 32pxrgba(255, 126, 197, 0.33)',
  p: 4,
  outline: 'none',
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
    >
      <Box sx={modalStyle} className="equipment-modal-appear">
        <Typography variant="h6" component="h2" sx={{ mb: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
          <EmojiObjectsIcon color="primary" sx={{ fontSize: 28 }} />
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
                  color="primary"
                  sx={{ mr: 1 }}
                />
                {/* Иконка по типу оборудования + эмодзи */}
                {eq.type === 'Роутер' && <RouterIcon sx={{ color: '#1976d2', mr: 1 }} />}
                {eq.type === 'Память' && <MemoryIcon sx={{ color: '#388e3c', mr: 1 }} />}
                {eq.type === 'Инструмент' && <BuildIcon sx={{ color: '#fbc02d', mr: 1 }} />}
                {/* Эмодзи для других типов */}
                {eq.type !== 'Роутер' && eq.type !== 'Память' && eq.type !== 'Инструмент' && (
                  <span className="equipment-emoji" role="img" aria-label="equipment">🔧</span>
                )}
                <ListItemText
                  primary={eq.name}
                  secondary={<span style={{ color: '#888' }}>{eq.type}</span>}
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
        <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end', background: 'none' }}>
          <Button onClick={onClose} className="cancel-btn-anim" sx={{ mr: 1, borderRadius: 2, px: 3 }}>
            ❌ Отмена
          </Button>
          <Button
            variant="contained"
            onClick={handleSubmit}
            disabled={selectedIds.length === 0 || equipmentList.length === 0}
            className="confirm-btn-anim"
            sx={{ borderRadius: 2, px: 3, boxShadow: '0 2px 8px #ff69b433' }}
            >
            ✅ Подтвердить
          </Button>
        </Box>
      </Box>
    </Modal>
  );
}
export default EquipmentSelectModal;