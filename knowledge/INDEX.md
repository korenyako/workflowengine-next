# WorkflowEngine Site Knowledge Base

Вики проекта, поддерживается LLM.

## Обзор

- [architecture](architecture.md) — Стек, структура, static export, сборка, деплой.
- [domain/overview](domain/overview.md) — Что за продукт, страницы-продукты, связь с FormEngine.

## Подсистемы

- [routes](routes.md) — Полный список маршрутов, статус каждого, навигация и футер.
- [content-blocks](content-blocks.md) — JSON-driven блочная система (registry, layout hooks, ограничения).
- [blog](blog.md) — MDX-пайплайн, `src/data/blog.ts`, воркэраунд для пустого блога.
- [external-scripts](external-scripts.md) — GTM, Bitrix24, правила для сторонних скриптов в static export.

## Решения

- [decisions](decisions.md) — Ключевые архитектурные решения и их причины (static export, GTM без `next/script`, Bitrix24, `__placeholder__` slug, форк-стратегия, и т.д.).

## Планы

- [plans/roadmap](plans/roadmap.md) — Что надо доделать после форка FormEngine → WorkflowEngine.
- [plans/content-migration](plans/content-migration.md) — Инвентарь workflowengine.io и план переноса контента.

## Служебное

- [log](log.md) — Хронологический лог изменений вики.
