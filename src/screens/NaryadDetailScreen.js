import React, { useState, useEffect, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Typography, Button, Box, Paper, Divider, Snackbar, Alert } from '@mui/material';
import Header from '../components/Header';
import LoadingSpinner from '../components/LoadingSpinner';
import EquipmentSelectModal from './EquipmentSelectModal'; // <--- Правильное имя файла
import ConfirmModal from './ConfirmModal';             // <--- Проверяем это имя тоже
import SuccessModal from './SuccessModal';           // <--- И это
import { naryady as mockNaryady, availableEquipment, generateActId } from '../data/mockData';


function NaryadDetailScreen({ addGeneratedAct }) { // Принимаем функцию для сохранения акта
  const { id } = useParams();
  const navigate = useNavigate();

  // Имитируем "загрузку" данных наряда
  const [naryad, setNaryad] = useState(null);
  const [isLoading, setIsLoading] = useState(true); // Начальное состояние - загрузка

  // Состояния для модальных окон и процесса
  const [selectedEquipment, setSelectedEquipment] = useState([]);
  const [isSelectModalOpen, setSelectModalOpen] = useState(false);
  const [isConfirmModalOpen, setConfirmModalOpen] = useState(false);
  const [isSuccessModalOpen, setSuccessModalOpen] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false); // Индикатор обработки подтверждения
  const [error, setError] = useState(''); // Сообщение об ошибке
  const [lastGeneratedActId, setLastGeneratedActId] = useState(null); // ID последнего акта для ссылки

  // "Загружаем" данные при монтировании или смене id
  useEffect(() => {
    setIsLoading(true);
    // Симуляция задержки сети/запроса
    const timer = setTimeout(() => {
      const foundNaryad = mockNaryady.find(n => n.id === id);
      if (foundNaryad) {
        setNaryad(foundNaryad);
      } else {
        // Если наряд не найден, можно показать ошибку или редиректнуть
        navigate('/');
      }
      setIsLoading(false);
    }, 500); // Имитация 0.5 сек загрузки

    return () => clearTimeout(timer); // Очистка таймера при размонтировании
  }, [id, navigate]);

  // Фильтруем доступное оборудование по ТИПУ, который нужен в наряде
  const equipmentForSelection = useMemo(() => {
      if (!naryad) return [];
      return availableEquipment.filter(eq => naryad.equipmentNeeded.includes(eq.type));
  }, [naryad]);

  // --- Шаги Use Case 1 ---

  const handleStartEquipmentAssignment = () => {
    if (naryad?.actGenerated) {
        setError("Оборудование по этому наряду уже выдано.");
        return;
    }
    setSelectedEquipment([]); // Сброс предыдущего выбора
    setSelectModalOpen(true);
  };

  const handleEquipmentSelect = (selection) => {
    setSelectedEquipment(selection);
    setSelectModalOpen(false);
    setConfirmModalOpen(true); // Открыть окно подтверждения
  };

  const handleConfirmAssignment = () => {
    setConfirmModalOpen(false);
    setIsProcessing(true);
    setError('');
    setLastGeneratedActId(null);

    // Имитация отправки данных в RMS, генерации акта
    console.log('Имитация: Отправка данных в RMS для:', selectedEquipment);
    setTimeout(() => {
      const isSuccess = Math.random() > 0.1; // 90% шанс успеха

      if (isSuccess && naryad) {
        const actId = generateActId(naryad.id);
        const actData = {
          id: actId,
          naryadId: naryad.id,
          client: naryad.client,
          address: naryad.address,
          equipment: selectedEquipment.map(e => ({ id: e.id, type: e.type, model: e.model })), // Сохраняем нужную инфу
          date: new Date().toLocaleString('ru-RU')
        };
        console.log('Имитация: Акт сгенерирован:', actData);
        addGeneratedAct(naryad.id, actData); // Сохраняем "сгенерированный" акт в App.js
        setLastGeneratedActId(actId); // Сохраняем ID для ссылки
        // Обновляем статус наряда (локально для демо)
        setNaryad(prev => ({ ...prev, status: 'Выдача завершена', actGenerated: true }));
        setIsProcessing(false);
        setSuccessModalOpen(true); // Показать окно успеха
      } else {
        console.error('Имитация: Ошибка связи с RMS');
        setIsProcessing(false);
        setError('Не удалось передать данные в RMS. Проверьте соединение и попробуйте позже.');
      }
    }, 1500); // Имитация 1.5 сек обработки
  };

  const handleViewAct = () => {
    setSuccessModalOpen(false);
    if (lastGeneratedActId && naryad) {
        navigate(`/act/${naryad.id}`); // Переход на страницу акта по ID наряда
    } else {
        setError("Не удалось найти информацию о созданном акте.");
    }
  };

  // --- Рендер ---

  if (isLoading) {
    return (
        <>
            <Header title="Загрузка Наряда..." />
            <LoadingSpinner />
        </>
    );
  }

  if (!naryad) {
     // Состояние, когда наряд не найден (хотя мы редиректим)
     return (
         <>
             <Header title="Ошибка" />
             <Typography color="error" sx={{mt: 2}}>Наряд с ID {id} не найден.</Typography>
         </>
     );
  }

  return (
    <>
      <Header title={`Наряд ${naryad.id}`} />
      <Paper elevation={2} sx={{ p: 3, mt: 2 }}> {/* Используем Paper для контента */}
        <Typography variant="h5" gutterBottom>Детали Наряда</Typography>
        <Typography variant="body1"><strong>Клиент:</strong> {naryad.client}</Typography>
        <Typography variant="body1"><strong>Адрес:</strong> {naryad.address}</Typography>
        <Typography variant="body1"><strong>Статус:</strong> {naryad.status}</Typography>
        <Typography variant="body1" sx={{ mb: 2 }}><strong>Требуется выдать:</strong> {naryad.equipmentNeeded.join(', ') || 'Не указано'}</Typography>

        <Divider sx={{ my: 2 }}/>

        <Box sx={{ mt: 2 }}>
          <Button
              variant="contained"
              sx={{ background: '#ff69b4', color: '#fff', '&:hover': { background: '#ff3cab' } }}
              onClick={handleStartEquipmentAssignment}
            disabled={isProcessing || naryad.actGenerated} // Блокируем, если идет обработка или акт уже есть
            startIcon={isProcessing ? <LoadingSpinner size={20}/> : null}
          >
            {naryad.actGenerated ? 'Оборудование выдано' : 'Выдать Оборудование'}
          </Button>
        </Box>
      </Paper>

      {/* Модальные окна */}
      <EquipmentSelectModal
        open={isSelectModalOpen}
        onClose={() => setSelectModalOpen(false)}
        equipmentList={equipmentForSelection}
        requiredTypes={naryad.equipmentNeeded} // Передаем типы, чтобы модалка могла валидировать
        onSelect={handleEquipmentSelect}
      />
      <ConfirmModal
        open={isConfirmModalOpen}
        onClose={() => setConfirmModalOpen(false)}
        equipment={selectedEquipment}
        client={naryad.client}
        onConfirm={handleConfirmAssignment}
      />
      <SuccessModal
        open={isSuccessModalOpen}
        onClose={() => setSuccessModalOpen(false)} // Просто закрыть
        onViewAct={handleViewAct} // Перейти к акту
      />

      {/* Уведомление об ошибке */}
      <Snackbar
         open={!!error}
         autoHideDuration={6000}
         onClose={() => setError('')}
         anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={() => setError('')} severity="error" variant="filled" sx={{ width: '100%' }}>
          {error}
        </Alert>
      </Snackbar>
    </>
  );
}

export default NaryadDetailScreen;