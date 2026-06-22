markdown
# 📅 Calendar

**Веб-приложение календаря с микросервисной архитектурой и event-driven подходом.**

---

## 📋 Описание

**Calendar** — это полнофункциональное веб-приложение для управления событиями и расписанием. Проект построен на основе **микросервисной архитектуры** с использованием **Apache Kafka** для асинхронного обмена сообщениями между сервисами.

---

## 🚀 Технологии

- **Frontend:**
  - JavaScript (ES6+)
  - HTML5
  - CSS3
- **Backend:**
  - Python (FastAPI / Flask)
  - Node.js
- **Инфраструктура:**
  - Docker & Docker Compose
  - Nginx (веб-сервер и reverse proxy)
  - Apache Kafka (брокер сообщений)
  - Zookeeper (координация Kafka)

---

## 🏗️ Архитектура проекта

### 1. Компоненты

- **Frontend** — клиентская часть приложения (SPA).
- **Backend** — серверная часть с бизнес-логикой.
- **Nginx** — раздача статики и reverse proxy.
- **Kafka** — асинхронная коммуникация между сервисами.

### 2. Взаимодействие (Event Flow)

> *Диаграмма потоков данных между сервисами через Kafka*
[Пользователь] → [Frontend] → [Backend API] → (Kafka Producer)
↓
(Kafka Broker)
↓
[Consumer Service]
↓
(Уведомления / Логи)

text

---

## 📁 Структура проекта

```plaintext
calendar-app/
├── frontend/
│   ├── src/
│   │   ├── js/
│   │   ├── css/
│   │   └── index.html
│   └── Dockerfile
├── backend/
│   ├── app/
│   │   ├── routes/
│   │   ├── models/
│   │   └── services/
│   ├── requirements.txt
│   └── Dockerfile
├── nginx/
│   └── nginx.conf
├── kafka/
│   └── docker-compose.kafka.yml
├── docker-compose.yml
├── .env.example
└── README.md
🛠️ Возможности
✅ Создание, редактирование и удаление событий

✅ Просмотр календаря (день / неделя / месяц)

✅ Уведомления о событиях в реальном времени

✅ Асинхронная обработка событий через Kafka

✅ Масштабируемая микросервисная архитектура

✅ Контейнеризация для простого развертывания

📦 Установка и запуск
Требования
Docker (версия 20.10+)

Docker Compose (версия 2.0+)

Быстрый старт
Клонируйте репозиторий:

bash
git clone https://github.com/wendamys/calendar.git
cd calendar
Запустите приложение:

bash
docker-compose up -d
Откройте браузер и перейдите по адресу:

text
http://localhost:80
Запуск в режиме разработки
bash
docker-compose -f docker-compose.yml -f docker-compose.dev.yml up
Остановка приложения
bash
docker-compose down
🔧 Конфигурация
Основные переменные окружения настраиваются в файле .env (создайте на основе .env.example):

env
# Backend
BACKEND_PORT=8000
DEBUG=True

# Kafka
KAFKA_BOOTSTRAP_SERVERS=kafka:9092
KAFKA_TOPIC_EVENTS=calendar_events

# Database
DATABASE_URL=postgresql://user:pass@db:5432/calendar

# Redis (для кеша)
REDIS_URL=redis://redis:6379/0
🧪 Тестирование
Запуск тестов для всех сервисов:

bash
# Backend (Python)
pytest backend/tests/

# Frontend (если используется Jest)
npm test --prefix frontend
📊 Метрики и мониторинг
Приложение включает:

Логирование всех событий (уровни: INFO, ERROR)

Health check эндпоинты (/health)

Метрики производительности (время ответа, количество запросов)

🤝 Вклад в проект
Fork репозитория

Создайте ветку (git checkout -b feature/AmazingFeature)

Закоммитьте изменения (git commit -m 'Add some AmazingFeature')

Отправьте в ветку (git push origin feature/AmazingFeature)

Откройте Pull Request
