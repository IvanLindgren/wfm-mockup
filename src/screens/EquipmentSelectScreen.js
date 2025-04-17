import React, { useState, useEffect } from 'react';
import { Modal, Box, Typography, List, ListItem, ListItemText, Checkbox, Button, Divider, Chip } from '@mui/material';

// Стили для модального окна (вынесены для читаемости)
const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '90%',
  maxWidth: 500, // Ограничение ширины
  bgcolor: 'background.paper',
  border: 'none',
  borderRadius: '8px', // Скругление углов
  boxShadow: 24,
  p: 4, // Внутренние отступы
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
        aria-labelledby="equipment-select-title"
        aria-describedby="equipment-select-description"
    >
      <Box sx={modalStyle}>
        <Typography id="equipment-select-title" variant="h6" component="h2">
          Выберите Оборудование для Выдачи
        </Typography>
        <Typography id="equipment-select-description" sx={{ mt: 1, mb: 1 }}>
            Требуемые типы: {requiredTypes.map(type => <Chip key={type} label={type} size="small" sx={{mr: 0.5}}/>)}
        </Typography>
        <Divider sx={{ my: 1 }}/>
        <Box sx={{ maxHeight: '60vh', overflowY: 'auto', pr: 1 }}> {/* Ограничение высоты и скролл */}
            <List dense> {/* Уменьшаем высоту строк */}
            {equipmentList.length > 0 ? equipmentList.map((eq) => (
                <ListItem key={eq.id} disablePadding>
                    <ListItemButton onClick={() => handleToggle(eq.id)} role={undefined} dense>
                        <Checkbox
                            edge="start"
                            checked={selectedIds.indexOf(eq.id) !== -1}
                            tabIndex={-1}
                            disableRipple
                            inputProps={{ 'aria-labelledby': `label-${eq.id}` }}
                        />
                        <ListItemText
                            id={`label-${eq.id}`}
                            primary={`${eq.type} - ${eq.model}`}
                            secondary={`S/N: ${eq.id}`}
                        />
                    </ListItemButton>
                </ListItem>
            )) : (
                <Typography sx={{p: 2, textAlign: 'center', color: 'text.secondary'}}>
                    Нет доступного оборудования нужного типа.
                </Typography>
            )}
            </List>
        </Box>

        {selectionError && (
            <Alert severity="warning" sx={{ mt: 2 }}>{selectionError}</Alert>
        )}

        <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end' }}>
          <Button onClick={onClose} sx={{ mr: 1 }}>Отмена</Button>
          <Button
            variant="contained"
            onClick={handleSubmit}
            disabled={selectedIds.length === 0 || equipmentList.length === 0}
            >
            Подтвердить Выбор
          </Button>
        </Box>
      </Box>
    </Modal>
  );
}
export default EquipmentSelectModal;