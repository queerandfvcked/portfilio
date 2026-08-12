export function getCaseStudies(t) {
  return {

    'zhabka': {

      title: t('caseStudies.zhabka.title'),

      subtitle: t('caseStudies.zhabka.subtitle'),

      description: t('caseStudies.zhabka.description'),

      tags: t('caseStudies.zhabka.tags'),

      heroImage: '/assets/zhabka casecard.png',

      heroImages: [

        '/assets/zhabka casecard.png'

      ],

      sections: [

        {

          id: 'problem',

          title: t('caseStudies.zhabka.sections.0.title'),

          content: t('caseStudies.zhabka.sections.0.content'),

          images: []

        },

        {

          id: 'task',

          title: t('caseStudies.zhabka.sections.1.title'),

          content: t('caseStudies.zhabka.sections.1.content'),

          images: []

        },

        {

          id: 'solution',

          title: t('caseStudies.zhabka.sections.2.title'),

          content: t('caseStudies.zhabka.sections.2.content'),

          images: [],

          accordionTitle: t('caseStudies.zhabka.sections.2.accordionTitle'),

          flowSteps: t('caseStudies.zhabka.sections.2.flowSteps'),

          items: t('caseStudies.zhabka.sections.2.items')

        },

        {

          id: 'product-decisions',

          title: t('caseStudies.zhabka.sections.3.title'),

          images: [],

          items: t('caseStudies.zhabka.sections.3.items')

        },

        {

          id: 'motion-states',

          title: t('caseStudies.zhabka.sections.4.title'),

          content: t('caseStudies.zhabka.sections.4.content'),

          images: []

        },

        {

          id: 'results',

          title: t('caseStudies.zhabka.sections.5.title'),

          content: t('caseStudies.zhabka.sections.5.content'),

          images: []

        }

      ]

    },

    'keepl-app': {

      title: t('caseStudies.keeplApp.title'),

      subtitle: t('caseStudies.keeplApp.subtitle'),

      description: t('caseStudies.keeplApp.description'),

      tags: t('caseStudies.keeplApp.tags'),

      heroImage: '/assets/keepl app.png',

      heroImages: [

        '/assets/keepl app.png',

        '/assets/keepl app/home_placeholder.png',

        '/assets/keepl app/create_new_goal.png'

      ],

      sections: [

        {

          id: 'overview',

          title: t('caseStudies.keeplApp.sections.0.title'),

          content: 'Проект начался как эксперимент: я провел небольшие интервью с друзьями, чтобы понять, с какими трудностями они сталкиваются при достижении своих задач и целей. На основе этих наблюдений я попробовал спроектировать несколько экранов мобильного приложения, которое помогает пользователю отслеживать прогресс и поддерживает мотивацию. Опыт оказался интересным, и я решил развить его в полноценный продукт.',

          images: ['/assets/mini-research.png']

        },

        {

          id: 'problem',

          title: t('caseStudies.keeplApp.sections.1.title'),

          content: 'Пользователи сталкиваются с несколькими ключевыми трудностями при попытке достигать своих целей:\n\n• Сложно видеть свой прогресс и понимать, что уже сделано, а что еще нет.\n• Мотивация падает, когда сервис не показывает достижения и не помогает удерживать фокус.\n• Давление со стороны привычных механик (стрики, невыполненные задачи) вызывает чувство вины и стресс вместо поддержки и мотивации.\n• Существующие инструменты либо перегружены функциями, либо слишком абстрактны и не учитывают эмоциональный опыт пользователя.\n• Часто приходится комбинировать разные приложения и методы, что создает хаос и лишнюю нагрузку.\n\nВ результате достижение целей превращается в рутину, а не в осознанный и мотивирующий процесс, и пользователи часто ощущают усталость и разочарование.',

          images: []

        },

        {

          id: 'product-discovery',

          title: t('caseStudies.keeplApp.sections.2.title'),

          content: '### Что именно мы хотим сделать?\n\nВеб-приложение, которое помогает пользователю достигать своих целей (какими бы они ни были) и делает процесс более осознанным и мотивирующим. В центре внимания - опыт и эмоции пользователя: он отслеживает прогресс в наглядной форме и может фиксировать свое настроение, чтобы понимать, как оно соотносится с результатом.\n\nЯ сфокусировался на персонализации и эмпатии: приложение подстраивается под стиль работы пользователя и поддерживает его мотивацию через простые и понятные механики.\n\n### Для кого это предназначено?\n\nЦелевая аудитория - люди, которые ставят себе личные или рабочие цели, но сталкиваются с проблемой поддержания мотивации и отслеживания прогресса.\n\n### Зачем мы это делаем?\n\nОбычно сервисы для целей фокусируются только на продуктивности: выполнить как можно больше и быстрее. В итоге пользователь со временем приходит к тому, что прожимает чекбоксы на автомате.\nМы же хотим сместить акцент на сам процесс - дать пользователю пространство для осознанности, поддержки и понимания своего состояния. Это не только про "сделать задачу", а про то, чтобы видеть ценность в собственных шагах и понимать, что даже небольшое действие приближает к прогрессу.\n\n### Какие есть альтернативы?\n\nБольшинство конкурентов можно разделить на четыре типа:\n\n- Таск-менеджеры: сильны в управлении задачами, метриках и отчетности, но почти не затрагивают эмоциональную мотивацию.\n- Коучинг-лайфстайл приложения: дают поддержку и вдохновение, но часто перегружены функциями и не имеют удобной визуализации прогресса.\n- Трекеры привычек и настроений: помогают отмечать шаги и привычки, показывают прогресс в графиках, иногда связывают действия с настроением, но ограничены в глубине постановки целей и редко выходят за рамки чек-листов.\n- Планировщики дня: структурируют расписание и помогают следовать режиму, но почти не работают с долгосрочными целями и эмоциями пользователя.\n\nТаким образом, рынок закрывает разные аспекты: где-то есть жесткая структура и визуализация, где-то эмоциональная поддержка и коучинг, а где-то гибкий трекинг привычек. Но практически никто не соединяет все это вместе: постановку целей с подцелями, эмоциональные теги и настроение на уровне конкретных шагов, фото-прогресс и мягкие альтернативы действий под состояние пользователя.\n\nЧтобы глубже понять рынок, я проанализировал конкретные продукты из этих категорий:\n\n| **Название** | **Цели и мини-цели** | **Визуализация прогресса** | **Настроение/теги** | **Фото прогресс** | **Альтернативы действий** | **Мотивация** |\n| --- | --- | --- | --- | --- | --- | --- |\n| Strides | ✅ гибкие цели, привычки, KPI | ✅ прогресс бар, графики | ❌ | ❌ | ❌ | ❌ |\n| Fabulous | ❌ фокус на привычки | ❌ стрики | частично, общий трекер | ❌ | ✅ | ✅ коуч-сценарии |\n| Daylio | ❌ только привычки | ✅ графики настроения/привычек | ✅ | ❌ | ❌ | ❌ статистика |\n| Habitica | ✅ квесты | ✅ xp, уровни | ❌ | ❌ | ✅ | ✅ геймификация, коммьюнити |\n| Coach.me | ✅ | ❌ счетчики | ❌ | ❌ | ❌ | ✅ коучи |\n| Remente | ✅ life goals, подцели, планы | ✅ | ✅ муд трекер | ❌ | ❌ | ✅ статьи, напоминания |\n| Way of Life | ❌ фокус на привычки | ✅ | ✅ муд теги к привычкам | ❌ | ❌ | ❌ статистика |\n| Goal: Habits & Tasks | ✅ цели, привычки, задачи | ✅ прогресс бары, календари | ❌ | ❌ | ❌ | ❌ |\n| Success Wizard | ✅ пошаговые планы, цели | ❌ отчеты | ❌ | ❌ | ❌ | ❌ |\n| ATracker PRO | ❌ тайм трекер | ✅ графики | ❌ | ❌ | ❌ | ❌ |\n| ClickUp | ✅ | ✅ дашборды и метрики | ❌ | ❌ | ❌ | ❌ |\n\n### Как пользователи решают эту проблему сейчас?\n\nЛюди используют заметки, таск-менеджеры, планировщики и трекеры привычек, но ни один инструмент не объединяет мотивацию, визуальный прогресс и эмоциональную поддержку. Часто они полагаются на самодисциплину и теряют мотивацию, когда не видят результатов.',

          images: []

        },

        {

          id: 'ux-research',

          title: t('caseStudies.keeplApp.sections.3.title'),

          content: 'Чтобы глубже понять контекст и реальные боли, я провел небольшие интервью со знакомыми и дополнительно проанализировал отзывы пользователей схожих приложений (Strides, Habitica, Daylio, Fabulous, Finch).\n\nЭто помогло сформулировать три ключевых паттерна поведения:\n\n- Сложно начать\n\nЛюди теряются при первом запуске и не понимают, как правильно поставить цель. Значит, нужен онбординг и шаблоны, которые помогают начать без стресса.\n\n- Нет гибкости\n\nПриложения заставляют подстраиваться под жесткие шаблоны, а пользователи хотят задавать свои параметры. Значит, важно дать возможность настраивать единицы измерения и структуру цели под себя.\n\n- Эмоциональное давление\n\nИз-за стриков и отчетности у людей появляется чувство вины, если они не выполняют все запланированные действия. Интерфейс должен поддерживать, а не осуждать. Нужен мягкий UX-тон, текстовые мотивации, легкие альтернативы шагов.',

          images: []

        },

        {

          id: 'jtbd',

          title: t('caseStudies.keeplApp.sections.4.title'),

          content: '\n\n- Когда я ставлю большую цель, я хочу разбить ее на маленькие шаги, чтобы видеть понятный план и не терять мотивацию.\n- Когда я выполняю ежедневные действия, я хочу отмечать прогресс и видеть динамику визуально, чтобы чувствовать движение вперед и гордиться результатом.\n- Когда я устал или у меня плохое настроение, я хочу иметь более легкую альтернативу шага, чтобы не выпадать из процесса, сохранить ритм и не винить себя за пропуски.\n- Когда я закрываю мини-цель, я хочу прикрепить фото или заметку, чтобы наглядно видеть изменения и иметь возможность вернуться к ним позже.\n- Когда я фиксирую настроение после выполнения мини-цели, я хочу отслеживать его вместе с прогрессом, чтобы видеть связь между действиями и состоянием.\n- Когда я теряю интерес или силы, я хочу получать мягкие подбадривающие напоминания, чтобы поддерживать мотивацию и продолжать движение к цели.',

          images: []

        },

        {

          id: 'hypothesis',

          title: t('caseStudies.keeplApp.sections.5.title'),

          content: 'Если дать пользователю возможность кастомизировать цели под свой стиль и состояние, добавить эмоциональный фидбек (трекер настроения, фото, поддерживающие тексты) и легкую альтернативу, то это поможет ему дольше сохранять мотивацию и ощущение прогресса. Что, в свою очередь, приведет к росту retention, stickness (DAU) и снизит drop-off rate.',

          images: []

        },

        {

          id: 'user-flow',

          title: t('caseStudies.keeplApp.sections.6.title'),

          content: 'Три сценария пользователя: создание цели, отметка выполнения ежедневной мини-цели и замена мини-цели на более легкую альтернативу. Флоу простой и наглядный, чтобы показать, как пользователь взаимодействует с сервисом.\n\n### Сценарий 1: пользователь создает новую цель.\n\nФлоу создания цели сфокусирован на минимизации когнитивной нагрузки и борьбе с эффектом, когда "слишком много нужно сделать". Гибкая настройка единиц измерения и превентивное добавление легкой альтернативы в момент создания цели - ключевое продуктовое решение.\n\nМы даем пользователю полный контроль над своим планом Б, позволяя ему заранее установить реалистичный, упрощенный шаг на случай низкой мотивации. Пользователю не нужно импровизировать или пропускать шаг, что напрямую решает проблему "сложно начать и отсутствие гибкости".\n\n### Сценарий 2: пользователь отмечает ежедневный прогресс.\n\nЭтот флоу сознательно отказывается от агрессивного акцента на стриках, смещая фокус на сам прогресс. Ручной ввод результата заставляет пользователя осознанно оценить свое усилие. Визуализация прогресса, даже минимального, сразу после ввода дает позитивное подкрепление и борется с ощущением, что усилия тщетны.\n\nОпциональный трекинг настроения на оверлее интегрирован для сбора данных о корреляции между действием и эмоциональным состоянием: пользователь видит, что в прошлый раз, когда он выполнил задачу, он почувствовал себя лучше, а значит, имеет смысл сделать усилие и в этот раз.\n\n### Сценарий 3: Пользователь устал и не может выполнить цель полностью.\n\nЭтот сценарий - решение для инсайта "пользователь чувствует вину и бросает цель, когда не может ее выполнить полностью". Вместо пропуска задачи флоу предлагает активировать заранее определенный пользователем упрощенный путь. Это сохраняет привычку и снимает эмоциональное давление, используя решение, принятое самим пользователем в более мотивированном состоянии, что является критически важным для долгосрочного удержания.',

          images: ['/assets/keepl app/flow.png']

        },

        {

          id: 'metrics',

          title: t('caseStudies.keeplApp.sections.7.title'),

          content: 'Для оценки успеха мы будем отслеживать следующие показатели:',

          images: [],

          items: t('caseStudies.keeplApp.sections.7.items')

        },

        {

          id: 'ui',

          title: t('caseStudies.keeplApp.sections.8.title'),

          content: 'Дизайн Keepl отошел от агрессивных интерфейсов продуктивности и сфокусировался на создании поддерживающей, гибкой и осознанной среды для достижения целей. Я использовал мягкие скругления для снижения визуальной резкости, такую же мягкую тень для создания легкой, но быстрой узнаваемости интерактивных элементов, и спокойную цветовую палитру, не режущую глаз при ежедневном использовании приложения.\n\nМобильная адаптация реализована в виде PWA - пользователь сможет "сохранить" веб страницу на свой хоум скрин и использовать как обычное мобильное приложение. Для этого я переработал некоторые элементы интерфейса, чтобы приложение вело себя нативно: сайд бар сменился привычным таб баром, модалки стали bottom sheet.\n\n## Первый вход в приложение и создание цели',

          images: [],

          imagePairs: [

            {

              desktop: '/assets/keepl app/log_in.png',

              mobile: '/assets/keepl app/log_in 1.png'

            }

          ],

          onboardingImages: [

            '/assets/keepl app/onboarding.png',

            '/assets/keepl app/onboarding 2.png',

            '/assets/keepl app/onboarding 3.png',

            '/assets/keepl app/onboarding 4.png'

          ]

        },{

          id: 'results',

          title: t('caseStudies.keeplApp.sections.9.title'),

          content: 'Спроектирован и реализован полный пользовательский опыт для трекера целей. Создано 15+ экранов с адаптивным дизайном, разработана дизайн-система из 50+ компонентов. Реализована сложная навигация с сохранением контекста пользователя. Заканчиваем связку бэкенда с фронтом и запускаем этап тестирования.',

          images: []

        }

      ]

    },

    'hired-app': {

      title: t('caseStudies.hiredApp.title'),

      subtitle: t('caseStudies.hiredApp.subtitle'),

      description: t('caseStudies.hiredApp.description'),

      tags: t('caseStudies.hiredApp.tags'),

      heroImage: '/assets/hired app.png',

      heroImages: [

        '/assets/hired app.png',

        '/assets/hired app/Frame_1984077494.png'

      ],

      sections: [

        {

          id: 'idea',

          title: t('caseStudies.hiredApp.sections.0.title'),

          content: t('caseStudies.hiredApp.sections.0.content'),

          images: []

        },

        {

          id: 'process',

          title: t('caseStudies.hiredApp.sections.1.title'),

          content: t('caseStudies.hiredApp.sections.1.content'),

          images: []

        },

        {

          id: 'user-problem',

          title: t('caseStudies.hiredApp.sections.2.title'),

          content: t('caseStudies.hiredApp.sections.2.content'),

          images: []

        },

        {

          id: 'hypothesis',

          title: t('caseStudies.hiredApp.sections.3.title'),

          content: t('caseStudies.hiredApp.sections.3.content'),

          images: []

        },

        {

          id: 'research-analysis',

          title: t('caseStudies.hiredApp.sections.4.title'),

          content: t('caseStudies.hiredApp.sections.4.content'),

          additionalContent: t('caseStudies.hiredApp.sections.4.additionalContent'),

          moreContent: t('caseStudies.hiredApp.sections.4.moreContent'),

          images: t('caseStudies.hiredApp.sections.4.images'),

          finalImages: t('caseStudies.hiredApp.sections.4.finalImages'),

          additionalImages: t('caseStudies.hiredApp.sections.4.additionalImages')

        },

        {

          id: 'structure-design',

          title: t('caseStudies.hiredApp.sections.5.title'),

          content: t('caseStudies.hiredApp.sections.5.content'),

          additionalContent: t('caseStudies.hiredApp.sections.5.additionalContent'),

          moreContent: t('caseStudies.hiredApp.sections.5.moreContent'),

          images: t('caseStudies.hiredApp.sections.5.images'),

          additionalImages: t('caseStudies.hiredApp.sections.5.additionalImages'),

          additionalContent2: t('caseStudies.hiredApp.sections.5.additionalContent2'),

          additionalContent3: t('caseStudies.hiredApp.sections.5.additionalContent3'),

          additionalContent4: t('caseStudies.hiredApp.sections.5.additionalContent4'),

          additionalContent5: t('caseStudies.hiredApp.sections.5.additionalContent5'),

          finalImages: t('caseStudies.hiredApp.sections.5.finalImages')

        },

        {

          id: 'final-mockups',

          title: t('caseStudies.hiredApp.sections.6.title'),

          content: t('caseStudies.hiredApp.sections.6.content'),

          additionalContent: t('caseStudies.hiredApp.sections.6.additionalContent'),

          images: t('caseStudies.hiredApp.sections.6.images'),

          additionalContent2: t('caseStudies.hiredApp.sections.6.additionalContent2'),

          additionalImages: t('caseStudies.hiredApp.sections.6.additionalImages'),

          additionalContent3: t('caseStudies.hiredApp.sections.6.additionalContent3'),

          additionalContent4: t('caseStudies.hiredApp.sections.6.additionalContent4'),

          additionalImages2: t('caseStudies.hiredApp.sections.6.additionalImages2'),

          additionalContent5: t('caseStudies.hiredApp.sections.6.additionalContent5'),

          additionalImages3: t('caseStudies.hiredApp.sections.6.additionalImages3'),

          additionalContent6: t('caseStudies.hiredApp.sections.6.additionalContent6'),

          additionalContent7: t('caseStudies.hiredApp.sections.6.additionalContent7')

        }

      ]

    },

    'keepl-landing': {

      title: t('caseStudies.keeplLanding.title'),

      subtitle: t('caseStudies.keeplLanding.subtitle'),

      description: t('caseStudies.keeplLanding.description'),

      tags: t('caseStudies.keeplLanding.tags'),

      heroImage: '/assets/landing.png',

      heroImages: [

        '/assets/landing.png',

        '/assets/keepl landing page/desktop.png',

        '/assets/keepl landing page/mobile.png'

      ],

      sections: [

        {

          id: 'problem',

          title: t('caseStudies.keeplLanding.sections.0.title'),

          content: t('caseStudies.keeplLanding.sections.0.content'),

          images: []

        },

        {

          id: 'task-hypothesis',

          title: t('caseStudies.keeplLanding.sections.1.title'),

          content: t('caseStudies.keeplLanding.sections.1.content'),

          images: []

        },

        {

          id: 'solution',

          title: t('caseStudies.keeplLanding.sections.2.title'),

          content: t('caseStudies.keeplLanding.sections.2.content'),

          images: []

        },

        {

          id: 'implementation',

          title: t('caseStudies.keeplLanding.sections.3.title'),

          content: t('caseStudies.keeplLanding.sections.3.content'),

          images: ['/assets/keepl landing page/Hero-section & Philosophy.png'],

          imageFullWidth: true,

          additionalContent: t('caseStudies.keeplLanding.sections.3.additionalContent'),

          additionalImages: ['/assets/keepl landing page/What can you do with Keepl.png'],

          moreContent: t('caseStudies.keeplLanding.sections.3.moreContent'),

          finalImages: ['/assets/keepl landing page/Features.png'],

          lastContent: t('caseStudies.keeplLanding.sections.3.lastContent'),

          imagePairs: [

            {

              desktop: '/assets/keepl landing page/card 1.png',

              mobile: '/assets/keepl landing page/card 1.png'

            },

            {

              desktop: '/assets/keepl landing page/card 2.png',

              mobile: '/assets/keepl landing page/card 2.png'

            }

          ],

          finalSection: t('caseStudies.keeplLanding.sections.3.finalSection'),

          ctaImage: '/assets/keepl landing page/CTA and footer.png'

        },

        {

          id: 'results',

          title: t('caseStudies.keeplLanding.sections.4.title'),

          content: t('caseStudies.keeplLanding.sections.4.content'),

          images: []

        }

      ]

    },

    'add-transition': {

      title: t('caseStudies.addTransition.title'),

      subtitle: t('caseStudies.addTransition.subtitle'),

      description: t('caseStudies.addTransition.description'),

      tags: t('caseStudies.addTransition.tags'),

      heroImage: '/assets/New folder/hero.png',

      heroImages: [

        '/assets/New folder/hero.png'

      ],

      sections: [

        {

          id: 'goal-context',

          title: t('caseStudies.addTransition.sections.0.title'),

          content: t('caseStudies.addTransition.sections.0.content'),

          images: []

        },

        {

          id: 'user-problem',

          title: t('caseStudies.addTransition.sections.1.title'),

          content: t('caseStudies.addTransition.sections.1.content'),

          images: []

        },

        {

          id: 'competitor-solutions',

          title: t('caseStudies.addTransition.sections.2.title'),

          content: t('caseStudies.addTransition.sections.2.content'),

          images: []

        },

        {

          id: 'ux-solutions',

          title: t('caseStudies.addTransition.sections.3.title'),

          content: t('caseStudies.addTransition.sections.3.content'),

          images: []

        },

        {

          id: 'flow',

          title: t('caseStudies.addTransition.sections.4.title'),

          content: t('caseStudies.addTransition.sections.4.content'),

          images: []

        },

        {

          id: 'layout',

          title: t('caseStudies.addTransition.sections.5.title'),

          content: t('caseStudies.addTransition.sections.5.content'),

          images: []

        },

        {

          id: 'result',

          title: t('caseStudies.addTransition.sections.6.title'),

          content: t('caseStudies.addTransition.sections.6.content'),

          images: []

        }

      ]

    }

  }
}
