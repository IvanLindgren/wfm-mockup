import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Box, Typography, List, ListItem, ListItemText, Divider, Button } from '@mui/material';
import PrintIcon from '@mui/icons-material/Print';
import Header from '../components/Header';
import LoadingSpinner from '../components/LoadingSpinner';
import './ActViewScreen.bimbo.css';

function ActViewScreen({ generatedActs }) { // Получаем "сгенерированные" акты
  const { naryadId } = useParams();
  const navigate = useNavigate();
  const [actData, setActData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    // Имитация поиска акта
    const timer = setTimeout(() => {
        const foundAct = generatedActs[naryadId]; // Ищем акт по ID наряда
        if (foundAct) {
            setActData(foundAct);
        } else {
             // Если акта нет, можно показать сообщение или редиректнуть
             // Для демо покажем сообщение
             console.warn(`Акт для наряда ${naryadId} не найден в 'generatedActs'`);
        }
        setIsLoading(false);
    }, 300); // Небольшая задержка

    return () => clearTimeout(timer);
  }, [naryadId, generatedActs]);

  const handlePrint = () => {
      // Здесь можно реализовать логику печати (window.print() или генерация PDF)
      alert('Имитация печати акта...');
  }

  if (isLoading) {
      return (
          <>
              <Header title="Загрузка Акта..." />
              <LoadingSpinner />
          </>
      );
  }

  if (!actData) {
      return (
          <>
              <Header title="Акт не найден 😢" />
              <Box className="act-bimbo-wrapper" style={{marginTop: 32}}>
                <Typography sx={{ mt: 2, color: '#ff3cab', fontWeight: 'bold', fontSize: '1.3em' }}>
                  💔 Не удалось загрузить данные акта для наряда <b>{naryadId}</b>.<br/> Возможно, он еще не был сгенерирован.
                </Typography>
                <div className="act-bimbo-btns">
                  <button className="act-bimbo-btn" onClick={() => navigate(`/naryad/${naryadId}`)}>
                    🔙 Вернуться к наряду
                  </button>
                </div>
              </Box>
          </>
      );
  }

  // Если акт найден, отображаем его
  return (
    <>
      <Header title={`Акт № ${actData.id} 💖`} />
      <div className="act-bimbo-wrapper">
        <div className="act-bimbo-title">
          <span className="act-bimbo-emoji">📄</span>
          Акт Приема-Передачи <span role="img" aria-label="sparkles">✨</span>
        </div>
        <div className="act-bimbo-info">
          <b>Акт №:</b> <span style={{color:'#ff3cab'}}>{actData.id}</span><br/>
          <b>К Наряду №:</b> <span style={{color:'#ff3cab'}}>{actData.naryadId}</span><br/>
          <b>Дата:</b> {actData.date}
        </div>
        <div className="act-bimbo-info">
          <b>Клиент:</b> {actData.client}<br/>
          <b>Адрес установки:</b> {actData.address}
        </div>
        <div className="act-bimbo-info" style={{background:'#ffe0f7'}}>
          <b>Переданное оборудование:</b>
          <ul className="act-bimbo-list">
            {actData.equipment.map((eq, idx) => (
              <li key={eq.id}>
                <span className="act-bimbo-emoji">💅</span> {idx + 1}. <b>{eq.type}</b> — {eq.model} <span style={{color:'#ff69b4'}}>({eq.id})</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="act-bimbo-info" style={{background:'#fff0fa'}}>
          <b>Исполнитель:</b> ___________________ <span className="act-bimbo-emoji">👩‍🔧</span><br/>
          <b>Клиент:</b> ___________________ / {actData.client} / <span className="act-bimbo-emoji">👛</span>
        </div>
        <div className="act-bimbo-btns">
          <button className="act-bimbo-btn" onClick={handlePrint}>
            🖨️ Печать
          </button>
          <button className="act-bimbo-btn" onClick={() => navigate(`/naryad/${actData.naryadId}`)}>
            🔙 К наряду
          </button>
        </div>
      </div>
    </>
  );
}

export default ActViewScreen;