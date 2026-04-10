# Организация медиафайлов в FormEngine

## Структура папок

### �� `public/images/` - Изображения продукта

- **Все изображения интерфейса и продукта в одной папке**
- Форматы: PNG, JPEG, WEBP
- Включает:
  - 🖥️ Скриншоты интерфейса FormEngine
  - 📊 Графики и диаграммы
  - 🎨 Коллажи и иллюстрации
  - 🔧 Демонстрации процессов и возможностей
  - 🖼️ Любые изображения, иллюстрирующие продукт

### 📁 `public/photos/` - Фотографии

- Фотографии людей, команды, офиса, событий
- Форматы: PNG, JPEG, WEBP
- Примеры: `team-photo.jpg`, `office-workspace.webp`, `conference-2025.png`

### 📁 `public/icons/` - SVG иконки

- Векторные иконки для интерфейса
- Формат: SVG
- Примеры: `arrow-right.svg`, `check-mark.svg`, `close.svg`
- Использование: кнопки, индикаторы, декоративные элементы

### 📁 `public/logos/` - Логотипы

- Логотипы FormEngine и партнёров
- Формат: SVG (предпочтительно), PNG для растровых версий
- Примеры: `formengine-logo.svg`, `partner-logo.svg`
- Варианты: белые, цветные, монохромные версии

### 📁 `public/videos/` - Видео демонстрации

- Видео с показом работы интерфейса
- Форматы: MP4, WEBM
- Примеры: `form-building-demo.mp4`, `feature-overview.webm`
- Использование: hero блоки, туториалы, демонстрации

## Правила именования

### Изображения продукта (`/images/`)

- Используйте kebab-case: `form-builder-interface.png`
- Указывайте назначение: `hero-demo.webp`, `dashboard-overview.jpg`
- Для разных размеров: `feature-showcase-1920.png`, `feature-showcase-768.png`

### Фотографии (`/photos/`)

- Описательные названия: `team-photo-2025.jpg`, `office-moscow.webp`
- Указывайте событие: `conference-react-summit.png`

### Иконки и логотипы

- Краткие названия: `arrow-right.svg`, `formengine-logo.svg`
- Варианты: `logo-white.svg`, `logo-color.svg`

### Видео

- Указывайте содержание: `form-builder-overview.mp4`
- Добавляйте качество: `demo-1080p.mp4`, `demo-720p.mp4`

## Доступ к файлам в коде

Все файлы из `public/` доступны по корневому URL:

```tsx
// Изображения продукта
<img src="/images/form-builder-interface.png" alt="FormBuilder" />
<img src="/images/hero-demo.webp" alt="Demo" />
<img src="/images/dashboard-screenshot.jpg" alt="Dashboard" />

// Фотографии
<img src="/photos/team-photo.jpg" alt="Our team" />

// Иконки
<img src="/icons/arrow-right.svg" alt="Arrow" />

// Логотипы  
<img src="/logos/formengine-logo.svg" alt="FormEngine" />

// Видео
<video src="/videos/form-demo.mp4" autoPlay muted />
```

## Примеры использования

```json
// В main.json
{
  "type": "HeroImageBlock",
  "props": {
    "image": {
      "src": "/images/form-builder-hero-demo.webp",
      "alt": "FormEngine Demo"
    }
  }
}
```

```tsx
// В компонентах
const productDemo = "/images/dashboard-overview.png";
const teamPhoto = "/photos/team-2025.jpg";
const logo = "/logos/formengine-white.svg";
const demoVideo = "/videos/quick-start-guide.mp4";
```

## Что куда помещать

### ✅ В `/images/` помещайте

- Скриншоты FormEngine интерфейса
- Диаграммы архитектуры
- Схемы процессов
- Демонстрации возможностей
- Hero изображения
- Иллюстрации фич
- Коллажи интерфейсов
- Графики и схемы

### ✅ В `/photos/` помещайте

- Фотографии команды
- Фото с конференций
- Офисные фотографии
- Портреты сотрудников
- Фото с мероприятий
