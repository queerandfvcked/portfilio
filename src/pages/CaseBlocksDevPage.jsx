import React, { useState } from 'react'
import { formatContent } from '../components/formatCaseContent.jsx'

const sample = `:::callout label="Гипотеза"
Если сократить путь до первой полезной записи, пользователь вернётся в продукт на следующий день.
:::

:::cards cols=3 numbered
**Проблема** | Пользователь не понимает, с чего начать.
**Решение** | Один короткий сценарий вместо длинного онбординга.
**Результат** | Первая запись за 40 секунд.
:::

:::triad labels="Когда|Хочу|Чтобы"
Вечером после работы | быстро записать трату | не забыть детали
Утром перед покупкой | увидеть остаток бюджета | принять решение
:::

:::stats
15+ | экранов
4 | сценария
40 сек | до первой записи
:::

:::quad axes="INTERNAL|EXTERNAL|TECHNICAL|PRODUCT"
Команда | Скорость решений
Рынок | Ожидания пользователей
Инструменты | Ограничения платформы
Сценарии | Ценность для человека
:::

:::steps
Определить задачу
Собрать гипотезы
Проверить прототип
Замерить результат
:::

:::steps-tabs
# Новый пользователь
Понять цель
Выбрать сценарий
Сделать первую запись
# Возвращающийся пользователь
Открыть историю
Повторить действие
Скорректировать бюджет
:::

:::chain
Нет контекста
Сложно выбрать
Нет действия
:::

:::chips
исследование, прототип, интервью, метрики, запуск
:::

:::rows
**Сначала контекст.** Без понимания задачи пользователя любое решение выглядит убедительно.
**Потом проверка.** Гипотеза становится полезной только после контакта с реальным сценарием.
**В конце метрика.** Результат должен менять следующее решение команды.
:::

:::findings
good | Понятный первый шаг | Пользователь видит одно действие и не теряется. | /assets/case-main/keepl-desktop-1600.webp
mistake | Слишком много выбора | Три равнозначных сценария конкурируют за внимание. | /assets/case-main/zhabka-desktop-1600.webp
:::

:::gallery cols=3
/assets/case-main/keepl-desktop-1600.webp | Главный экран
/assets/case-main/keepl-mobile-800.webp | Мобильный сценарий
/assets/case-main/zhabka-desktop-1600.webp | Игровой экран
:::

:::stage layout=pair
/assets/case-main/hired-1400.webp | До изменений
/assets/case-main/fintech-1400.webp | После изменений
:::

:::flow
circle | Старт | Пользователь открывает продукт
square | Первый шаг | Выбирает сценарий
diamond | Проверка | Понимает следующий шаг
loop 3>2 | нет
:::`

const CaseBlocksDevPage = () => {
  const [selectedImage, setSelectedImage] = useState(null)

  return (
    <div className="case-page min-h-screen">
      <main className="container py-32">
        <div className="mb-16 max-w-3xl">
          <span className="mono-meta">DEV ONLY</span>
          <h1 className="mt-4 font-heading text-4xl font-bold text-primary">
            Блоки страниц кейсов
          </h1>
          <p className="mt-5 text-secondary">
            Тестовая страница для проверки всех блоков на десктопе и мобильном.
          </p>
        </div>

        <div className="case-chapter__content max-w-5xl">
          {formatContent(sample, setSelectedImage, 'ru', 'add-transition')}
        </div>
      </main>

      {selectedImage && (
        <div
          className="fixed inset-0 z-[70] flex items-center justify-center bg-black/90 p-6"
          onClick={() => setSelectedImage(null)}
        >
          <button
            type="button"
            className="absolute right-5 top-5 text-sm text-white"
            onClick={() => setSelectedImage(null)}
          >
            Закрыть
          </button>
          <img
            src={selectedImage}
            alt=""
            className="max-h-[88vh] max-w-full object-contain"
            onClick={(event) => event.stopPropagation()}
          />
        </div>
      )}
    </div>
  )
}

export default CaseBlocksDevPage
