import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme, CssBaseline } from '@mui/material';
import NaryadListScreen from './screens/NaryadListScreen';
import NaryadDetailScreen from './screens/NaryadDetailScreen';
import ActViewScreen from './screens/ActViewScreen';
// ... импорты других экранов

const theme = createTheme(); // Используем стандартную тему MUI

function App() {
  const [acts, setActs] = React.useState([]);

  // Добавить или обновить акт по id наряда
  const addGeneratedAct = (naryadId, actData, navigate) => {
    setActs(prevActs => {
      const filtered = prevActs.filter(act => act.naryadId !== naryadId);
      return [...filtered, { naryadId, ...actData }];
    });
    // После создания акта — переход на страницу просмотра
    if (navigate) {
      navigate(`/act/${naryadId}`);
    }
  };

  // Для быстрого поиска акта по id
  const actsMap = React.useMemo(() => {
    const map = {};
    acts.forEach(act => { map[act.naryadId] = act; });
    return map;
  }, [acts]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline /> {/* Сброс стилей браузера */}
      <Router>
        <Routes>
          <Route path="/" element={<NaryadListScreen />} />
          <Route path="/naryad/:id" element={<NaryadDetailScreen addGeneratedAct={addGeneratedAct} />} />
          <Route path="/act/:naryadId" element={<ActViewScreen generatedActs={actsMap} />} />
          {/* Добавить роуты для других экранов, если они не модальные */}
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;