import React from 'react'
import {
  CaseBlock,
  parseCaseBlocks,
  CaseCallout,
  CaseCards,
  CaseTriad,
  CaseStats,
  CaseQuad,
  CaseSteps,
  CaseChain,
  CaseChips,
  CaseRows,
  CaseFindings,
  CaseGallery,
  CaseStage,
  CaseSlider,
  CaseFlow,
  CaseEmbed
} from './case-blocks'

const devContent = `
# Dev: все блоки (только development)

:::callout label="Callout"
Текст отзыва, оставленный пользователем. Блок не ломается, если внутри пусто.
:::

:::cards cols=2 numbered
**Сценарий** | пользователь выбирает тип отклика
**Состояние** | после сохранения появляется подтверждение
:::

:::triad labels="Когда|Хочу|Чтобы"
Вечером | быстро откликнуться | не пропустить подходящее
Утром | выбрать резюме | отправить сразу
:::

:::stats
5 | шагов создания резюме
2 | формата работы в фильтре
1 | отклик на выбранное резюме
:::

:::quad axes="ПРОБЛЕМА|РЫНОК|ТЕХНИЧЕСКИЙ|ПРОДУКТ"
**Нет понимания** | какой отклик ушел
**Конкуренты** | фильтр формата слабый
**iframe** | блок поддерживает несколько видов
**Прототип** | обёртка готова к интеграции
:::

:::steps
Сформировать образы
Разложить путь по шагам
Выделить фичи
:::

:::steps-tabs
# Сценарий соискателя
Выбор резюме
Отправка отклика
Подтверждение
# Сценарий рекрутера
Просмотр откликов
Фильтр по формату
:::

:::chain
Нет контекста | сложно откликнуться | нет доверия
:::

:::chips
исследование, прототип, интервью, метрики, фильтр
:::

:::rows
**Сначала исследование.** Без контекста решение выглядит убедительно.
**Потом проверка.** Гипотеза проверяется на реальном сценарии.
:::

:::findings
good | Понятная карточка отклика | Резюме указано сразу | /assets/hired app/pics.png
mistake | Скрытый формат работы | Фильтр не очевиден | /assets/hired app/stack.png
:::

:::gallery cols=2
/assets/hired app/Frame_1984077494.png | User Flow
/assets/hired app/Frame_1984077494 1.png | Информационная архитектура
:::

:::stage layout=single
/assets/hired app/image features.png | Набросок возможных фич в FigJam
:::

:::stage layout=pair
/assets/hired app/hh vs hired 1.png | hh: непонятно, с какого резюме отправлен отклик
/assets/hired app/hh vs hired 2.png | Hired: резюме указано в отклик
:::

:::slider
/assets/hired app/competitive analysis.png | Веб-сайты
/assets/hired app/приложения.jpg | Мобильные приложения
:::

:::flow
circle | Старт | Пользователь открывает продукт
square | Первый шаг | Выбирает сценарий
square | Второй шаг | Смотрит отклик
circle | Финиш | Возвращается завтра
:::

:::embed url="https://cdn.knightlab.com/libs/juxtapose/latest/embed/index.html?uid=e1bccb4c-cff0-11f0-ba1b-0e6f42328d7d" ratio=16:9 sandbox=wide title="Вайрфреймы: интерактивное сравнение"
:::

:::embed url="https://embed.figma.com/proto/J1DL62y8hKJYKosiXTzmDo/prototype?content-scaling=fixed&kind=proto&node-id=1-13507&page-id=0%3A1&scaling=scale-down&starting-point-node-id=1%3A12816&embed-host=share" ratio=16:9 mobileratio=4:5 maxwidth=800 title="Кликабельный Figma-прототип Hired"
:::
`

const sampleEmbeds = [
  {
    name: 'Описание',
    block: {
      type: 'embed',
      props: {
        url: 'https://cdn.knightlab.com/libs/juxtapose/latest/embed/index.html?uid=e1bccb4c-cff0-11f0-ba1b-0e6f42328d7d',
        ratio: '16:9',
        sandbox: 'wide',
        title: 'Вайрфреймы: интерактивное сравнение'
      }
    }
  },
  {
    name: 'Figma-прототип (интерактивный)',
    block: {
      type: 'embed',
      props: {
        url: 'https://embed.figma.com/proto/J1DL62y8hKJYKosiXTzmDo/prototype?content-scaling=fixed&kind=proto&node-id=1-13507&page-id=0%3A1&scaling=scale-down&starting-point-node-id=1%3A12816&embed-host=share',
        ratio: '16:9',
        mobileRatio: '4:5',
        maxWidth: 800,
        title: 'Кликабельный Figma-прототип Hired'
      }
    }
  }
]

export default function CaseBlocksDevPage() {
  const [parsed] = React.useState(() => parseCaseBlocks(devContent))

  return (
    <div style={{ padding: 24, maxWidth: 920, margin: '0 auto' }}>
      <h1 style={{ fontWeight: 700, fontSize: 28 }}>Dev: все блоки</h1>
      <p style={{ color: '#7a8291', marginTop: 8 }}>Только development. В production-сборку страница не попадает.</p>

      <div style={{ marginTop: 24 }}>
        {parsed.map((segment, idx) => {
          if (segment.type === 'text') {
            return <div key={idx} style={{ whiteSpace: 'pre-wrap', marginBottom: 16 }}>{segment.text}</div>
          }

          return (
            <div key={idx} style={{ marginBottom: 24 }}>
              <CaseBlock block={segment.block} caseId="dev" openImageModal={() => {}} />
            </div>
          )
        })}
      </div>

      <hr style={{ border: '1px solid #e5e7eb', margin: '32px 0' }} />

      <h2>Автономные примеры CaseEmbed</h2>
      <p style={{ color: '#7a8291', marginTop: 8 }}>Блок без текста внутри; параметры передаются как пропсы.</p>

      {sampleEmbeds.map((item) => (
        <div key={item.name} style={{ marginBottom: 32 }}>
          <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 8 }}>{item.name}</div>
          <CaseEmbed {...item.block.props} />
        </div>
      ))}
    </div>
  )
}
