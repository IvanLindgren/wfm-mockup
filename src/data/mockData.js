// Моковые данные для демонстрации

export const naryady = [
    {
      id: 'N123',
      client: 'Корнилов Денис Андреевич',
      address: 'ул. Ленина, д. 1, кв. 5',
      status: 'Назначен',
      equipmentNeeded: ['Роутер'], // Типы оборудования, которые нужно выдать
      actGenerated: false // Флаг, был ли акт уже сгенерирован
    },
    {
      id: 'N456',
      client: 'Тралалело Тралала',
      address: 'пр. Мира, д. 5, офис 10',
      status: 'В работе',
      equipmentNeeded: ['Роутер', 'ТВПриставка'],
      actGenerated: false
    },
    {
      id: 'N789',
      client: 'Тунг тунг сахур',
      address: 'б-р Космонавтов, 12',
      status: 'Завершен', // Пример завершенного
      equipmentNeeded: ['Роутер'],
      actGenerated: true // Предположим, акт уже есть
    },
  ];
  
  // Оборудование, которое "есть у выездного специалиста"
  export const availableEquipment = [
    { id: 'SN-RTR-001', type: 'Роутер', model: 'TP-Link Archer C80' },
    { id: 'SN-RTR-002', type: 'Роутер', model: 'Keenetic Hopper' },
    { id: 'SN-RTR-003', type: 'Роутер', model: 'Xiaomi Mi Router 4A' },
    { id: 'SN-TVB-001', type: 'ТВПриставка', model: 'SberBox Time' },
    { id: 'SN-TVB-002', type: 'ТВПриставка', model: 'Xiaomi Mi Box S' },
    { id: 'SN-TVB-003', type: 'ТВПриставка', model: 'Wink+ (Ростелеком)' },
    { id: 'SN-MOD-001', type: 'Модем', model: 'Zyxel VDSL' }, // Пример другого типа
  ];
  
  // Функция для имитации генерации ID акта
  export const generateActId = (naryadId) => `ACT-${naryadId}-${Date.now().toString().slice(-5)}`;