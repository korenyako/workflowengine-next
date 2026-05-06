# Scroll-reveal (progressive content fade-in)

Паттерн постепенного появления секций при скролле — каждая зона «всплывает» (opacity 0→1 + лёгкий translateY) когда попадает во вьюпорт. Опционально — со стаггером по соседним элементам внутри одной секции.

## Референс

- **Канонический пример**: страница продукта Ortofon — https://ortofon.com/products/stylus-2m-red
- **Локальная копия для офлайн-разбора**: `c:/Work/Stylus 2M Red – Ortofon.html` (не в репо, у пользователя на машине; "Save Page As" из браузера).
- Тема Shopify, паттерн встречается на любой их странице — у них всё framework-нейтрально, чистый IntersectionObserver + CSS state classes.

## Контракт markup'а (как у Ortofon)

Глобальный флаг на `<body>`:
```html
<body class="cc-animate-enabled dom-loaded dom-loaded-plus-6">
```
- `cc-animate-enabled` — мастер-выключатель. Без него анимации не применяются (graceful degradation для старых браузеров и no-JS).
- `dom-loaded`, `dom-loaded-plus-N` — таймеры через setTimeout (~+100ms каждый). Анимации привязаны к `plus-6` чтобы первая «волна» не запускалась до того как браузер докрасит начальный экран — защита от FOUC.

На каждой анимируемой секции:
```html
<div class="cc-animate-init cc-animate-in" data-cc-animate>
```
- `cc-animate-init` — стартовое состояние (opacity:0, translateY).
- `cc-animate-in` — конечное состояние, добавляется через JS когда элемент попал во вьюпорт.
- `data-cc-animate` — JS-хук для `querySelectorAll`.

Для стаггера соседей — инлайн `animation-delay`:
```html
<div class="cc-animate-init cc-animate-in" data-cc-animate
     data-cc-animate-delay="0.07s" style="animation-delay: 0.07s;">
```
Шаблонный движок просто пишет `${index * 0.07}s` при рендере списка. Никакого JS для расчёта delay'а.

## CSS

```css
.cc-animate-enabled .cc-animate-init {
  opacity: 0;
  transform: translateY(20px);
  transition: opacity .6s ease, transform .6s ease;
}
.cc-animate-enabled .cc-animate-init.cc-animate-in {
  opacity: 1;
  transform: none;
}

@media (prefers-reduced-motion: reduce) {
  .cc-animate-init { opacity: 1; transform: none; transition: none; }
}
```

`prefers-reduced-motion` — обязателен. Без него — нарушение WCAG 2.1, и пользователям с вестибулярными расстройствами реально плохо.

## JS — IntersectionObserver

```js
const io = new IntersectionObserver((entries) => {
  for (const e of entries) {
    if (e.isIntersecting) {
      e.target.classList.add('cc-animate-in');
      io.unobserve(e.target); // одноразовая анимация
    }
  }
}, { rootMargin: '0px 0px -10% 0px', threshold: 0.05 });

document.querySelectorAll('[data-cc-animate]').forEach((el) => io.observe(el));
```

- `rootMargin: -10%` снизу — триггер срабатывает чуть раньше полного появления элемента, плавнее ощущается.
- `threshold: 0.05` — достаточно 5% площади.
- `unobserve` после первого срабатывания — не наблюдаем повторно при обратном скролле, экономим CPU.

## Производительность

- Анимация только `opacity` и `transform` — обе GPU-accelerated, без layout/paint.
- IntersectionObserver вместо scroll-listener'ов — нативно, не блокирует main thread.
- `unobserve` после first reveal — линейная стоимость от количества секций, не от длительности скролла.

## Когда применять — общие правила

**Применять** на страницах, где пользователь читает блоки последовательно сверху вниз:
- Long-form marketing landing'и
- Product/feature story-страницы
- Articles / редакционный контент
- Hero-секции (но саму Hero — не оборачивать, она во вьюпорте на загрузке)

**НЕ применять** (вредит скану):
- Сетки/листинги карточек, листы поиска, фильтрационные виды
- Таблицы сравнения и спецификаций (читают построчно)
- Транзакционные экраны (формы, downloads, contact) — пользователь пришёл с задачей, любая задержка CTA = трение
- Любые DataTable / list-views

**Причина:** в режиме «сканирую много карточек, ищу нужную» анимация добавляет 300–900ms когнитивного налога на каждую секцию. Power-users скроллят быстро и видят кашу из ещё не отрендеренного. Для длинных marketing-страниц, наоборот, помогает удерживать внимание блок за блоком.

## Имплементация в Next.js (как сделано)

1. **Компонент-обёртка** [src/components/Reveal.tsx](../src/components/Reveal.tsx) — клиентский, ставит `data-reveal=""` на корневом `<div>` и через `IntersectionObserver` (`rootMargin: 0px 0px -10% 0px`, `threshold: 0.05`) добавляет `data-revealed`. После первого hit — `unobserve`. Учитывает `prefers-reduced-motion: reduce` → сразу ставит `data-revealed`. Опциональный prop `delayMs` для стаггера.

2. **CSS** в [globals.css](../src/styles/globals.css) (секция «Scroll-reveal»). Hidden-state применяется только при `html[data-reveal-ready]`:
   ```css
   html[data-reveal-ready] [data-reveal] {
     transition:
       opacity 0.9s cubic-bezier(0.16, 1, 0.3, 1),
       transform 0.9s cubic-bezier(0.16, 1, 0.3, 1);
   }
   html[data-reveal-ready] [data-reveal]:not([data-revealed]) {
     opacity: 0;
     transform: translateY(40px);
   }
   ```
   Атрибут `data-reveal-ready` ставит inline-script в `<head>` ([layout.tsx](../src/app/layout.tsx)) синхронно до paint'а. Без JS атрибут не появляется → контент рендерится нормально (graceful degradation для краулеров и no-JS).

   Кривая `cubic-bezier(0.16, 1, 0.3, 1)` — «snappy ease-out-quart», которую используют Stripe / Linear: быстрый старт, затухающий финиш. Воспринимается живо, но не дёргано. С `ease` (по умолчанию) на длинной странице ощущалось «почти статикой» — слишком симметрично.

3. **Интеграция в block-системы** — оба registry, [blocks.tsx](../src/components/blocks.tsx) (главная) и [PageBlocks.tsx](../src/components/PageBlocks.tsx) (sub-страницы), приняли prop `revealOnScroll?: boolean`. Когда `true`, каждый блок кроме первого (Hero) оборачивается в `<Reveal>`. Hero пропускается специально — он во вьюпорте при загрузке, анимация дала бы только flash без эффекта.

## Применимость на workflowengine.io — фактическое состояние

**Включено** (`revealOnScroll`):
- `/` ([page.tsx](../src/app/page.tsx)) — главная, длинный landing
- `/features/` ([features/page.tsx](../src/app/features/page.tsx))
- `/server/` ([server/page.tsx](../src/app/server/page.tsx))

**Выключено** (transactional / list-views):
- `/contacts/` — форма должна быть видна сразу
- `/downloads/` — пользователь пришёл за бинарником, любая задержка CTA = трение
- `/blog/` — listing, скан карточек статей; индивидуальные посты тоже без reveal в теле статьи

## Тюнинг — крутилки

Если ощущения не те, конкретные knobs:

| Что | Где | Эффект |
| --- | --- | --- |
| Длительность | `globals.css` — `0.9s` в `transition` | < 0.7s ощущается дёрганым/«почти статика» (особенно на длинной странице, где блоки большие). 0.8–1.0s — sweet spot для marketing. > 1.2s начинает раздражать. |
| Амплитуда движения | `globals.css` — `translateY(40px)` | 24–32px — тонкий «всплыв», легко не заметить. 40–48px — выраженное движение. > 60px — блоки «прилетают издалека», слишком много motion. |
| Easing curve | `globals.css` — `cubic-bezier(0.16, 1, 0.3, 1)` | `ease-out-quart` (текущая) — snappy/живая. `ease` — линейнее, ровнее. `cubic-bezier(0.34, 1.56, 0.64, 1)` — с overshoot, рискованно для контента. |
| Когда триггерить | [Reveal.tsx](../src/components/Reveal.tsx) — `rootMargin: '0px 0px -10% 0px'` | Чем отрицательнее (`-25%`, `-30%`), тем позже срабатывает — блок виден глубже во вьюпорте, эффект драматичнее. Слишком ранний триггер = анимация играет пока пользователь к блоку только подъезжает, ощущается «уже статичной». |
| Threshold | [Reveal.tsx](../src/components/Reveal.tsx) — `threshold: 0.05` | Доля площади блока, после которой триггерится. 0.05 — чуть-чуть видно, 0.5 — половина блока. |

## Гочи: `overflow-x: hidden` на ancestor + `transform` на детях

[blocks.tsx](../src/components/blocks.tsx) и [PageBlocks.tsx](../src/components/PageBlocks.tsx) имели `<div className="w-full overflow-x-hidden">` как корневую обёртку. По CSS-спеке `overflow-x: hidden` неявно делает `overflow-y: auto` (любое значение != `visible` на одной оси промотирует другую). Когда дочерние reveal-блоки в начальном состоянии имеют `transform: translateY(40px)`, браузер учитывает трансформированную геометрию при расчёте overflow родителя → нижний блок «торчит» на 40px ниже логической границы → wrapper показывает свой Y-скроллбар (двойной скролл рядом с системным).

**Фикс:** заменить на `overflow-x-clip`. Поведение визуально идентично, но `clip` НЕ создаёт scrolling box и не пересчитывает Y-axis. Поддержка: Chrome 90+, Firefox 81+, Safari 16+ — для marketing-сайта приемлемо.

Запомнить на будущее: любая обёртка с `overflow-x: hidden` вокруг scroll-reveal или transform-анимаций — мина.
