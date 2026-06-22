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



---

## 📁 Структура проекта

```plaintext
calendar-app/
├── frontend/                    # 🎨 Клиентская часть приложения (UI)
│   ├── src/                     # Исходный код фронтенда
│   │   ├── js/                  # JavaScript логика (обработка событий, API-запросы)
│   │   ├── css/                 # Стили и оформление интерфейса
│   │   └── index.html           # Главная HTML-страница приложения
│   └── Dockerfile               # 🐳 Инструкции для сборки Docker-образа фронтенда
│
├── backend/                     # ⚙️ Серверная часть приложения (API)
│   ├── app/                     # Основная директория backend-приложения
│   │   ├── routes/              # 🛣️ API-эндпоинты (маршруты)
│   │   ├── models/              # 📊 Модели данных (схемы БД)
│   │   └── services/            # 🔧 Бизнес-логика и сервисы (работа с Kafka, БД)
│   ├── requirements.txt         # 📦 Список Python-зависимостей
│   └── Dockerfile               # 🐳 Инструкции для сборки Docker-образа бэкенда
│
├── nginx/                       # 🌐 Конфигурация веб-сервера
│   └── nginx.conf               # Настройки Nginx (reverse proxy, раздача статики)
│
├── kafka/                       # 📨 Конфигурация брокера сообщений
│   └── docker-compose.kafka.yml # Docker Compose для запуска Kafka и Zookeeper
│
├── docker-compose.yml           # 🐳 Главный файл оркестрации всех контейнеров
├── .env.example                 # 🔑 Шаблон переменных окружения (пароли, порты)
└── README.md                    # 📖 Документация проекта
```

## 📝 Пояснения к ключевым файлам

| Файл / Папка | Назначение |
|--------------|------------|
| `frontend/src/js/` | Логика календаря: отрисовка сетки, обработка кликов, отправка запросов на backend |
| `frontend/src/css/` | Стили для календаря, модальных окон, адаптивная вёрстка |
| `backend/app/routes/` | REST API эндпоинты: `GET /events`, `POST /events`, `DELETE /events/:id` |
| `backend/app/models/` | Схемы данных для событий (название, дата, описание, участники) |
| `backend/app/services/` | Сервисы для работы с Kafka (отправка уведомлений) и базой данных |
| `nginx/nginx.conf` | Настройка проксирования: `/api` → backend, `/` → frontend |
| `kafka/docker-compose.kafka.yml` | Отдельный compose-файл для запуска Kafka + Zookeeper |
| `docker-compose.yml` | Запускает все сервисы одной командой: `docker-compose up` |
| `.env.example` | Пример конфигурации, который нужно скопировать в `.env` и заполнить своими данными |

---

## 🛠️ Возможности

- ✅ Создание, редактирование и удаление событий
- ✅ Просмотр календаря (день / неделя / месяц)
- ✅ Уведомления о событиях в реальном времени
- ✅ Асинхронная обработка событий через Kafka
- ✅ Масштабируемая микросервисная архитектура
- ✅ Контейнеризация для простого развертывания

## 📦 Установка и запуск

### Требования

- Docker (версия 20.10+)
- Docker Compose (версия 2.0+)

### Быстрый старт

Клонируйте репозиторий:

```bash
git clone https://github.com/wendamys/calendar.git
cd calendar
```
Запустите приложение:

```bash
docker-compose up -d
```
Откройте браузер и перейдите по адресу:
```bash
http://localhost:80
```
Запуск в режиме разработки
```bash
docker-compose -f docker-compose.yml -f docker-compose.dev.yml up
```
Остановка приложения
```bash
docker-compose down
```
🔧 Конфигурация

Основные переменные окружения настраиваются в файле .env (создайте на основе .env.example): env

## Backend
BACKEND_PORT=8000
DEBUG=True

## Kafka
KAFKA_BOOTSTRAP_SERVERS=kafka:9092
KAFKA_TOPIC_EVENTS=calendar_events

## Database
DATABASE_URL=postgresql://user:pass@db:5432/calendar

## Redis (для кеша)
```bash
REDIS_URL=redis://redis:6379/0
```

🧪 Тестирование
Запуск тестов для всех сервисов:

## Backend (Python)
```bash
pytest backend/tests/
```

## Frontend (если используется Jest)
```bash
npm test --prefix frontend
```

📊 Метрики и мониторинг

Приложение включает:

- ✅ Логирование всех событий (уровни: INFO, ERROR)
- ✅ Health check эндпоинты (/health)
- ✅ Метрики производительности (время ответа, количество запросов)

🤝 Вклад в проект -> Fork репозитория

Создайте ветку (git checkout -b feature/AmazingFeature)
- ✅ Закоммитьте изменения (git commit -m 'Add some AmazingFeature')
- ✅ Отправьте в ветку (git push origin feature/AmazingFeature)
- ✅ Откройте Pull Request

