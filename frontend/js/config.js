// ---------- API КОНФИГУРАЦИЯ ----------
const API_BASE_URL = 'http://127.0.0.1:8000';
const WS_URL = 'ws://127.0.0.1:8000/ws';

// ---------- ГЛОБАЛЬНЫЕ ПЕРЕМЕННЫЕ ----------
let currentUser = null;
let users = [];
let activeUserIds = []; // Массив выбранных друзей
let currentYear, currentMonth, selectedDate = null;
let editingEventId = null;

let futureStatusCache = new Map();
let currentTimeFrom = "00:00";
let currentTimeTo = "23:59";

let currentEventsCache = {};
let friendsEventsCountCache = {};
let ws = null;
let currentTheme = localStorage.getItem('theme') || 'light';

// Цветовые категории событий
const eventCategories = {
  'работа': { color: '#ef4444', emoji: '💼' },
  'личное': { color: '#8b5cf6', emoji: '🏠' },
  'спорт': { color: '#10b981', emoji: '🏃' },
  'встреча': { color: '#f59e0b', emoji: '🤝' },
  'праздник': { color: '#ec4899', emoji: '🎉' },
  'учёба': { color: '#3b82f6', emoji: '📚' },
  'другое': { color: '#6b7280', emoji: '📌' }
};