import React, { createContext, useState, useContext } from 'react'

const translations = {
  ru: {
    // Navigation
    nav: {
      home: 'Главная',
      projects: 'Кейсы',
      about: 'Подход к продукту',
      resume: 'Резюме',
      contact: 'Контакты'
    },
    // Hero
    hero: {
      title: 'Продуктовый дизайнер',
      subtitle: 'Проектирую B2C-интерфейсы, опираясь на данные и продуктовую логику. Готовлю к запуску собственный продукт: от валидации идеи и до самостоятельной сборки фронтенда с помощью вайб-кодинга.',
      description: 'Создаю пользовательские интерфейсы, которые решают реальные бизнес-задачи и приносят пользу людям.',
      viewProjects: 'Смотреть проекты',
      contactMe: 'Связаться со мной',
      stats: {
        experience: 'Года опыта',
        projects: 'Кейсов',
        clients: 'Клиентов',
        rating: 'Рейтинг'
      }
    },
    // Projects
    projects: {
      title: 'Кейсы',
      moreDetails: 'Подробнее'
    },
    projectsList: [
      {
        id: 'keepl-app',
        image: '/assets/keepl app.png',
        title: 'Keepl App',
        subtitle: 'Web & Mobile',
        description: 'Веб-приложение для достижения целей. Проектирование продукта с нуля: от анализа рынка и гипотез до разработки адаптивной дизайн-системы. В рамках кейса я проработал сложные сценарии визуализации данных и самостоятельно реализовал фронтенд-часть на React, чтобы валидировать UX-паттерны в живом интерфейсе.',
        tags: ['Product Design', 'Web App', 'Frontend (React)'],
        link: '/keepl-app'
      },
      {
        id: 'keepl-landing',
        title: 'Keepl Landing page',
        subtitle: 'Landing page',
        description: 'Keepl Landing Page — лендинг для экосистемы трекинга целей. Спроектировал структуру страницы, выстраивая повествование от «боли» пользователя к решению, чтобы удержать внимание и максимально раскрыть ценность продукта. Перенес визуальный концепт приложения в адаптивный веб-дизайн и реализовал фронтенд с помощью ИИ, обеспечивая точность и соответствие интерфейса оригиналу.',
        image: '/assets/landing.png',
        tags: ['Product Design', 'Web', 'Mobile', 'Frontend (React)'],
        link: '/keepl-landing'
      },
      {
        id: 'add-transition',
        title: 'Проектирование интерфейса добавления операций',
        subtitle: 'Mobile App',
        description: 'Оптимизация процесса учета расходов. Провел UX-анализ причин оттока пользователей и полностью переработал флоу фиксации операций, сократив время ввода до 2-3 секунд. Спроектировал одноэкранный интерфейс с выбором категорий, минимизировал когнитивную нагрузку и подготовил финальный UI, сфокусированный на скорости использования «на ходу».',
        image: '/assets/fintech.png',
        tags: ['FinTech', 'Mobile', 'Product Design'],
        link: '/add-transition'
      },
      {
        id: 'hired-app',
        title: 'Hired App',
        subtitle: 'Mobile App',
        description: 'Проектирование платформы по поиску работы с нуля. Создал полный пользовательский опыт: от этапа исследования и JTBD-фреймворков до финальных интерфейсов. Разработал сложную архитектуру продукта, многошаговые сценарии и масштабируемую дизайн-систему.',
        image: '/assets/hired app.png',
        tags: ['Product Design', 'Mobile'],
        link: '/hired-app'
      }
    ],
    about: {
      title: 'Подход к продукту',
      subtitle: 'Как я работаю',
      description1: 'Я продуктовый дизайнер с фокусом на создание интерфейсов, которые решают реальные бизнес-задачи.',
      description2: 'Мой подход основан на данных, пользовательских исследованиях и глубоком понимании бизнес-целей.',
      description3: 'Я верю, что хороший дизайн — это не только красивая картинка, но и работающее решение, которое приносит результат.',
      info: {
        location: 'Местоположение',
        locationValue: 'Москва, Россия',
        experience: 'Опыт',
        experienceValue: '2+ года',
        focus: 'Специализация',
        focusValue: 'Продуктовый дизайн'
      }
    },
    // Skills
    skills: {
      title: 'Навыки и инструменты',
      description: 'Я использую современные инструменты и методологии для создания эффективных дизайнерских решений',
      categories: {
        designTools: 'Дизайн инструменты',
        designSkills: 'Дизайн навыки',
        methodologies: 'Методологии'
      }
    },
    // Contact
    contact: {
      title: 'Контакты',
      description: 'Давайте обсудим ваш проект! Я всегда открыт к новым интересным задачам.',
      contactMe: 'Связаться со мной',
      writeMe: 'Напишите мне',
      sendMessage: 'Отправить сообщение',
      form: {
        name: 'Ваше имя',
        email: 'Ваш email',
        message: 'Ваше сообщение'
      }
    },
    // Skills Ticker
    skills: [
      'Продуктовая логика',
      'Проектирование MVP', 
      'UX-исследования',
      'Информационная архитектура',
      'Дизайн-системы',
      'Вайбкодинг',
      'Прототипирование',
      'Адаптивный дизайн',
      'Продуктовые метрики',
      'Доступность'
    ],
    // Product Approaches
    approaches: [
      {
        icon: (
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M11 2v20c-5.07-.5-9-4.79-9-10s3.93-9.5 9-10zm2.03 0v8.99H22c-.47-4.74-4.24-8.52-8.97-8.99zm0 11.01V22c4.74-.47 8.5-4.25 8.97-8.99h-8.97z"/>
          </svg>
        ),
        title: 'Продуктовое мышление',
        description: 'Фокусируюсь на поиске решений для бизнеса через MVP и проверку гипотез. Проектирую интерфейсы, которые помогают продукту расти и удерживать пользователей.'
      },
      {
        icon: (
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M3 13h2v-2H3v2zm0 4h2v-2H3v2zm0-8h2V7H3v2zm4 4h14v-2H7v2zm0 4h14v-2H7v2zM7 7v2h14V7H7z"/>
          </svg>
        ),
        title: 'UI & Дизайн-системы',
        description: 'Создаю масштабируемые библиотеки компонентов с учетом гайдлайнов Apple и Google. Поддерживаю порядок в макетах и чистоту в визуальной иерархии.'
      },
      {
        icon: (
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"/>
          </svg>
        ),
        title: 'UX-исследования',
        description: 'Глубоко погружаюсь в боли пользователей. Анализирую конкурентов и паттерны рынка, чтобы создавать интуитивно понятные сценарии.'
      },
      {
        icon: (
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
          </svg>
        ),
        title: 'Доступность и гайдлайны',
        description: 'Проектирую с учетом инклюзивности и платформенных паттернов. Знаю, как сделать интерфейс удобным для всех и понятным для команды разработки.'
      },
      {
        icon: (
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
          </svg>
        ),
        title: 'Проектирование логики',
        description: 'Разрабатываю сложную информационную архитектуру и User Flows. Устраняю "тупики" в сценариях, делая путь пользователя бесшовным и логичным.'
      },
      {
        icon: (
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M13 2.05v3.03c3.39.49 6 3.39 6 6.92 0 .9-.18 1.75-.48 2.54l2.6 1.53c.56-1.24.88-2.62.88-4.07 0-5.18-3.95-9.45-9-9.99zM12 19c-3.87 0-7-3.13-7-7 0-3.53 2.61-6.43 6-6.92V2.05c-5.06.5-9 4.76-9 9.95 0 5.52 4.47 10 9.99 10 3.31 0 6.24-1.61 8.06-4.09l-2.6-1.53C16.17 17.98 14.21 19 12 19z"/>
          </svg>
        ),
        title: 'Вайбкодинг и AI-инструменты',
        description: 'Использую ИИ для сборки функциональных фронтенд-прототипов. Это позволяет мне тестировать дизайн в реальной среде и быстрее проверять идеи.'
      }
    ],
    // Case Studies
    caseStudies: {
      keeplApp: {
        title: 'Keepl App',
        subtitle: 'Mobile App',
        description: 'Веб-приложение для достижения целей. Помогает пользователям отслеживать прогресс, учитывать эмоциональное состояние и бороться с выгоранием. Проектирование продукта с нуля: от анализа рынка и гипотез до разработки адаптивной дизайн-системы.',
        tags: ['Product Design', 'Web App', 'Frontend (React)'],
        heroImage: '/assets/keepl app.png',
        heroImages: [
          '/assets/keepl app.png',
          '/assets/keepl app/home_placeholder.png',
          '/assets/keepl app/create_new_goal.png'
        ],
        sections: [
          {
            id: 'overview',
            title: 'Предыстория',
            content: 'Проект начался как эксперимент: я провел небольшие интервью с друзьями, чтобы понять, с какими трудностями они сталкиваются при достижении своих задач и целей. На основе этих наблюдений я попробовал спроектировать несколько экранов мобильного приложения, которое помогает пользователю отслеживать прогресс и поддерживать мотивацию. Опыт оказался интересным, и я решил развить его в полноценный продукт.',
            images: ['/assets/mini-research.png']
          },
          {
            id: 'problem',
            title: 'Проблема пользователей',
            content: 'Пользователи сталкиваются с несколькими ключевыми трудностями при попытке достигать своих целей:\n\n• Сложно видеть свой прогресс и понимать, что уже сделано, а что еще нет.\n• Мотивация падает, когда сервис не показывает достижения и не помогает удерживать фокус.\n• Давление со стороны привычных механик (стрики, невыполненные задачи) вызывает чувство вины и стресс вместо поддержки и мотивации.\n• Существующие инструменты либо перегружены функциями, либо слишком абстрактны и не учитывают эмоциональный опыт пользователя.\n• Часто приходится комбинировать разные приложения и методы, что создает хаос и лишнюю нагрузку.\n\nВ результате достижение целей превращается в рутину, а не в осознанный и мотивирующий процесс, и пользователи часто ощущают усталость и разочарование.',
            images: []
          },
          {
            id: 'product-discovery',
            title: 'Product discovery',
            content: `### Что именно мы хотим сделать?\n\nВеб-приложение, которое помогает пользователю достигать своих целей (какими бы они ни были) и делает процесс более осознанным и мотивирующим. В центре внимания - опыт и эмоции пользователя: он отслеживает прогресс в наглядной форме и может фиксировать свое настроение, чтобы понимать, как оно соотносится с результатом.\n\nЯ сфокусировался на персонализации и эмпатии: приложение подстраивается под стиль работы пользователя и поддерживает его мотивацию через простые и понятные механики.\n\n### Для кого это предназначено?\n\nЦелевая аудитория - люди, которые ставят себе личные или рабочие цели, но сталкиваются с проблемой поддержания мотивации и отслеживания прогресса.\n\n### Зачем мы это делаем?\n\nОбычно сервисы для целей фокусируются только на продуктивности: выполнить как можно больше и быстрее. В итоге пользователь со временем приходит к тому, что прожимает чекбоксы на автомате.\nМы же хотим сместить акцент на сам процесс - дать пользователю пространство для осознанности, поддержки и понимания своего состояния. Это не только про "сделать задачу", а про то, чтобы видеть ценность в собственных шагах и понимать, что даже небольшое действие приближает к прогрессу.\n\n### Какие есть альтернативы?\n\nБольшинство конкурентов можно разделить на четыре типа:\n\n• Таск-менеджеры: сильны в управлении задачами, метриках и отчетности, но почти не затрагивают эмоциональную мотивацию.\n• Коучинг-лайфстайл приложения: дают поддержку и вдохновение, но часто перегружены функциями и не имеют удобной визуализации прогресса.\n• Трекеры привычек и настроений: помогают отмечать шаги и привычки, показывают прогресс в графиках, иногда связывают действия с настроением, но ограничены в глубине постановки целей и редко выходят за рамки чек-листов.\n• Планировщики дня: структурируют расписание и помогают следовать режиму, но почти не работают с долгосрочными целями и эмоциями пользователя.\n\nТаким образом, рынок закрывает разные аспекты: где-то есть жесткая структура и визуализация, где-то эмоциональная поддержка и коучинг, а где-то гибкий трекинг привычек. Но практически никто не соединяет все это вместе: постановку целей с подцелями, эмоциональные теги и настроение на уровне конкретных шагов, фото-прогресс и мягкие альтернативы действий под состояние пользователя.\n\nЧтобы глубже понять рынок, я проанализировал конкретные продукты из этих категорий:\n\n| **Название** | **Цели и мини-цели** | **Визуализация прогресса** | **Настроение/теги** | **Фото прогресс** | **Альтернативы действий** | **Мотивация** |\n| --- | --- | --- | --- | --- | --- | --- |\n| Strides | ✅ гибкие цели, привычки, KPI | ✅ прогресс бар, графики | ❌ | ❌ | ❌ | ❌ |\n| Fabulous | ❌ фокус на привычки | ❌ стрики | частично, общий трекер | ❌ | ✅ | ✅ коуч-сценарии |\n| Daylio | ❌ только привычки | ✅ графики настроения/привычек | ✅ | ❌ | ❌ | ❌ статистика |\n| Habitica | ✅ квесты | ✅ xp, уровни | ❌ | ❌ | ✅ | ✅ геймификация, коммьюнити |\n| Coach.me | ✅ | ❌ счетчики | ❌ | ❌ | ❌ | ✅ коучи |\n| Remente | ✅ life goals, подцели, планы | ✅ | ✅ муд трекер | ❌ | ❌ | ✅ статьи, напоминания |\n| Way of Life | ❌ фокус на привычки | ✅ | ✅ муд теги к привычкам | ❌ | ❌ | ❌ статистика |\n| Goal: Habits & Tasks | ✅ цели, привычки, задачи | ✅ прогресс бары, календари | ❌ | ❌ | ❌ | ❌ |\n| Success Wizard | ✅ пошаговые планы, цели | ❌ отчеты | ❌ | ❌ | ❌ | ❌ |\n| ATracker PRO | ❌ тайм трекер | ✅ графики | ❌ | ❌ | ❌ | ❌ |\n| ClickUp | ✅ | ✅ дашборды и метрики | ❌ | ❌ | ❌ | ❌ |\n\n### Как пользователи решают эту проблему сейчас?\n\nЛюди используют заметки, таск-менеджеры, планировщики и трекеры привычек, но ни один инструмент не объединяет мотивацию, визуальный прогресс и эмоциональную поддержку. Часто они полагаются на самодисциплину и теряют мотивацию, когда не видят результатов.`,
            images: []
          },
          {
            id: 'ux-research',
            title: 'UX-исследование и инсайты',
            content: 'Чтобы глубже понять контекст и реальные боли, я провел небольшие интервью со знакомыми и дополнительно проанализировал отзывы пользователей схожих приложений (Strides, Habitica, Daylio, Fabulous, Finch).\n\nЭто помогло сформулировать три ключевых паттерна поведения:\n\n• Сложно начать\n\nЛюди теряются при первом запуске и не понимают, как правильно поставить цель. Значит, нужен онбординг и шаблоны, которые помогают начать без стресса.\n\n• Нет гибкости\n\nПриложения заставляют подстраиваться под жесткие шаблоны, а пользователи хотят задавать свои параметры. Значит, важно дать возможность настраивать единицы измерения и структуру цели под себя.\n\n• Эмоциональное давление\n\nИз-за стриков и отчетности у людей появляется чувство вины, если они не выполняют все запланированные действия. Интерфейс должен поддерживать, а не осуждать. Нужен мягкий UX-тон, текстовые мотивации, легкие альтернативы шагов.',
            images: []
          },
          {
            id: 'jtbd',
            title: 'JTBD',
            content: '- Когда я ставлю большую цель, я хочу разбить ее на маленькие шаги, чтобы видеть понятный план и не терять мотивацию.\n- Когда я выполняю ежедневные действия, я хочу отмечать прогресс и видеть динамику визуально, чтобы чувствовать движение вперед и гордиться результатом.\n- Когда я устал или у меня плохое настроение, я хочу иметь более легкую альтернативу шага, чтобы не выпадать из процесса, сохранить ритм и не винить себя за пропуски.\n- Когда я закрываю мини-цель, я хочу прикрепить фото или заметку, чтобы наглядно видеть изменения и иметь возможность вернуться к ним позже.\n- Когда я фиксирую настроение после выполнения мини-цели, я хочу отслеживать его вместе с прогрессом, чтобы видеть связь между действиями и состоянием.\n- Когда я теряю интерес или силы, я хочу получать мягкие подбадривающие напоминания, чтобы поддерживать мотивацию и продолжать движение к цели.',
            images: []
          },
          {
            id: 'hypothesis',
            title: 'Гипотеза',
            content: 'Если дать пользователю возможность кастомизировать цели под свой стиль и состояние, добавить эмоциональный фидбек (трекер настроения, фото, поддерживающие тексты) и легкую альтернативу, то это поможет ему дольше сохранять мотивацию и ощущение прогресса. Что, в свою очередь, приведет к росту retention, stickness (DAU) и снизит drop-off rate.',
            images: []
          },
          {
            id: 'user-flow',
            title: 'User flow',
            content: 'Три сценария пользователя: создание цели, отметка выполнения ежедневной мини-цели и замена мини-цели на более легкую альтернативу. Флоу простой и наглядный, чтобы показать, как пользователь взаимодействует с сервисом.\n\n### Сценарий 1: пользователь создает новую цель\n\nФлоу создания цели сфокусирован на минимизации когнитивной нагрузки и борьбе с эффектом, когда "слишком много нужно сделать". Гибкая настройка единиц измерения и превентивное добавление легкой альтернативы в момент создания цели - ключевое продуктовое решение.\n\nМы даем пользователю полный контроль над своим планом Б, позволяя ему заранее установить реалистичный, упрощенный шаг на случай низкой мотивации. Пользователю не нужно импровизировать или пропускать шаг, что напрямую решает проблему "сложно начать и отсутствие гибкости".\n\n### Сценарий 2: пользователь отмечает ежедневный прогресс\n\nЭтот флоу сознательно отказывается от агрессивного акцента на стриках, смещая фокус на сам прогресс. Ручной ввод результата заставляет пользователя осознанно оценить свое усилие. Визуализация прогресса, даже минимального, сразу после ввода дает позитивное подкрепление и борется с ощущением, что усилия тщетны.\n\nОпциональный трекинг настроения на оверлее интегрирован для сбора данных о корреляции между действием и эмоциональным состоянием: пользователь видит, что в прошлый раз, когда он выполнил задачу, он почувствовал себя лучше, а значит, имеет смысл сделать усилие и в этот раз.\n\n### Сценарий 3: Пользователь устал и не может выполнить цель полностью\n\nЭтот сценарий - решение для инсайта "пользователь чувствует вину и бросает цель, когда не может ее выполнить полностью". Вместо пропуска задачи флоу предлагает активировать заранее определенный пользователем упрощенный путь. Это сохраняет привычку и снимает эмоциональное давление, используя решение, принятое самим пользователем в более мотивированном состоянии, что является критически важным для долгосрочного удержания.',
            images: []
          },
          {
            id: 'metrics',
            title: 'Метрики и план проверки гипотезы',
            content: '### Основная гипотеза\n\nЖесткие системы "выполнено/пропущено" создают давление на пользователя и чувство вины при пропуске. Внедрение кастомизации под текущее состояние пользователя (ручной ввод прогресса, легкая альтернатива и эмоциональный фидбек) позволит сохранить ощущение контроля и мотивацию на длинной дистанции.\n\n### Ключевые метрики\n\nДля оценки успеха мы будем отслеживать следующие показатели:\n\n- Retention через 30 дней - ключевой индикатор долгосрочной ценности. Мы ожидаем, что гибкость системы удержит пользователя в продукте дольше, чем классические аналоги\n- Stickiness (DAU/MAU) - частота возвратов. Покажет, стало ли приложение ежедневным помощником благодаря "легким альтернативам".\n- Feature Adoption Rate - процент использования функций "lighter alternative" и ручного инпута. Это подтвердит, что пользователи находят эти инструменты полезными в моменты усталости.\n- Completion Rate - процент целей, доведенных до конца. Позволит увидеть, помогает ли "легкая альтернатива" не бросать сложные задачи, а дожимать их до финала.',
            images: []
          },
          {
            id: 'ui',
            title: 'UI',
            content: 'Дизайн Keepl отошел от агрессивных интерфейсов продуктивности и сфокусировался на создании поддерживающей, гибкой и осознанной среды для достижения целей. Я использовал мягкие скругления для снижения визуальной резкости, такую же мягкую тень для создания легкой, но быстрой узнаваемости интерактивных элементов, и спокойную цветовую палитру, не режущую глаз при ежедневном использовании приложения.\n\nМобильная адаптация реализована в виде PWA - пользователь сможет "сохранить" веб страницу на свой хоум скрин и использовать как обычное мобильное приложение. Для этого я переработал некоторые элементы интерфейса, чтобы приложение вело себя нативно: сайд бар сменился привычным таб баром, модалки стали bottom sheet.\n\n### Первый вход в приложение и создание цели',
            images: []
          },
          {
            id: 'results',
            title: 'Статус проекта',
            content: 'Спроектирован и реализован полный пользовательский опыт для трекера целей. Создано 15+ экранов с адаптивным дизайном, разработана дизайн-система из 50+ компонентов. Реализована сложная навигация с сохранением контекста пользователя. Идет работа над бэком.',
            images: []
          }
        ]
      }
    },
    // Projects
    projects: [
      {
        id: 'keepl-app',
        image: '/assets/keepl app.png',
        title: 'Keepl App',
        subtitle: 'Web & Mobile',
        description: 'Веб-приложение для достижения целей. Проектирование продукта с нуля: от анализа рынка и гипотез до разработки адаптивной дизайн-системы. В рамках кейса я проработал сложные сценарии визуализации данных и самостоятельно реализовал фронтенд-часть на React, чтобы валидировать UX-паттерны в живом интерфейсе.',
        tags: ['Product Design', 'Web App', 'Frontend (React)'],
        link: '/keepl-app'
      },
      {
        id: 'keepl-landing',
        title: 'Keepl Landing page',
        subtitle: 'Landing page',
        description: 'Keepl Landing Page — лендинг для экосистемы трекинга целей. Спроектировал структуру страницы, выстраивая повествование от «боли» пользователя к решению, чтобы удержать внимание и максимально раскрыть ценность продукта. Перенес визуальный концепт приложения в адаптивный веб-дизайн и реализовал фронтенд с помощью ИИ, обеспечивая точность и соответствие интерфейса оригиналу.',
        image: '/assets/landing.png',
        tags: ['Product Design', 'Web', 'Mobile', 'Frontend (React)'],
        link: '/keepl-landing'
      },
      {
        id: 'add-transition',
        title: 'Проектирование интерфейса добавления операций',
        subtitle: 'Mobile App',
        description: 'Оптимизация процесса учета расходов. Провел UX-анализ причин оттока пользователей и полностью переработал флоу фиксации операций, сократив время ввода до 2-3 секунд. Спроектировал одноэкранный интерфейс с выбором категорий, минимизировал когнитивную нагрузку и подготовил финальный UI, сфокусированный на скорости использования «на ходу».',
        image: '/assets/fintech.png',
        tags: ['FinTech', 'Mobile', 'Product Design'],
        link: '/add-transition'
      },
      {
        id: 'hired-app',
        title: 'Hired App',
        subtitle: 'Mobile App',
        description: 'Проектирование платформы по поиску работы с нуля. Создал полный пользовательский опыт: от этапа исследования и JTBD-фреймворков до финальных интерфейсов. Разработал сложную архитектуру продукта, многошаговые сценарии и масштабируемую дизайн-систему.',
        image: '/assets/hired app.png',
        tags: ['Product Design', 'Mobile'],
        link: '/hired-app'
      }
    ],
    // Footer
    footer: {
      copyright: 'Product Designer Portfolio. Все права защищены.'
    }
  },
  en: {
    // Navigation
    nav: {
      home: 'Home',
      projects: 'Cases',
      about: 'Product Approach',
      resume: 'Resume',
      contact: 'Contact'
    },
    // Hero
    hero: {
      title: 'Product Designer',
      subtitle: 'I design B2C interfaces based on data and product logic. Currently preparing to launch my own product: from idea validation to independent frontend development using vibe-coding.',
      description: 'I create user interfaces that solve real business problems and bring value to people.',
      viewProjects: 'View Projects',
      contactMe: 'Contact Me',
      stats: {
        experience: 'Years Experience',
        projects: 'Cases',
        clients: 'Clients',
        rating: 'Rating'
      }
    },
    // Projects
    projects: {
      title: 'Cases',
      moreDetails: 'More Details'
    },
    projectsList: [
      {
        id: 'keepl-app',
        image: '/assets/keepl app.png',
        title: 'Keepl App',
        subtitle: 'Web & Mobile',
        description: 'Web application for achieving goals. Product design from scratch: from market analysis and hypotheses to adaptive design system development. As part of the case, I worked out complex data visualization scenarios and independently implemented the frontend part on React to validate UX patterns in a live interface.',
        tags: ['Product Design', 'Web App', 'Frontend (React)'],
        link: '/keepl-app'
      },
      {
        id: 'keepl-landing',
        title: 'Keepl Landing page',
        subtitle: 'Landing page',
        description: 'Keepl Landing Page - landing page for goal tracking ecosystem. I designed the page structure, building a narrative from user pain to solution to retain attention and maximally reveal product value. I transferred the visual concept of the application to adaptive web design and implemented the frontend using AI, ensuring accuracy and interface compliance with the original.',
        image: '/assets/landing.png',
        tags: ['Product Design', 'Web', 'Mobile', 'Frontend (React)'],
        link: '/keepl-landing'
      },
      {
        id: 'add-transition',
        title: 'Transaction Interface Design',
        subtitle: 'Mobile App',
        description: 'Optimization of expense tracking process. I conducted UX analysis of user churn reasons and completely redesigned the transaction flow, reducing input time to 2-3 seconds. I designed a single-screen interface with category selection, minimized cognitive load and prepared a final UI focused on "on-the-go" usage speed.',
        image: '/assets/fintech.png',
        tags: ['FinTech', 'Mobile', 'Product Design'],
        link: '/add-transition'
      },
      {
        id: 'hired-app',
        title: 'Hired App',
        subtitle: 'Mobile App',
        description: 'Job search platform design from scratch. I created a complete user experience: from research stage and JTBD frameworks to final interfaces. I developed complex product architecture, multi-step scenarios and a scalable design system.',
        image: '/assets/hired app.png',
        tags: ['Product Design', 'Mobile'],
        link: '/hired-app'
      }
    ],
    about: {
      title: 'Product Approach',
      subtitle: 'How I work',
      description1: 'I am a product designer focused on creating interfaces that solve real business problems.',
      description2: 'My approach is based on data, user research, and deep understanding of business goals.',
      description3: 'I believe that good design is not just a beautiful picture, but a working solution that brings results.',
      info: {
        location: 'Location',
        locationValue: 'Moscow, Russia',
        experience: 'Experience',
        experienceValue: '2+ years',
        focus: 'Specialization',
        focusValue: 'Product Design'
      }
    },
    // Skills
    skills: {
      title: 'Skills & Tools',
      description: 'I use modern tools and methodologies to create effective design solutions',
      categories: {
        designTools: 'Design Tools',
        designSkills: 'Design Skills',
        methodologies: 'Methodologies'
      }
    },
    // Contact
    contact: {
      title: 'Contact',
      description: 'Let\'s discuss your project! I\'m always open to new interesting challenges.',
      contactMe: 'Contact Me',
      writeMe: 'Write Me',
      sendMessage: 'Send Message',
      formetrics: {
        userRetention: '+25%',
        taskCompletion: '+40%'
      },
      form: {
        name: 'Your Name',
        email: 'Your Email',
        message: 'Your Message'
      }
    },
    // Skills Ticker
    skills: [
      'Product Logic',
      'MVP Design', 
      'UX Research',
      'Information Architecture',
      'Design Systems',
      'Vibe Coding',
      'Prototyping',
      'Responsive Design',
      'Product Metrics',
      'Accessibility'
    ],
    // Product Approaches
    approaches: [
      {
        icon: (
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M11 2v20c-5.07-.5-9-4.79-9-10s3.93-9.5 9-10zm2.03 0v8.99H22c-.47-4.74-4.24-8.52-8.97-8.99zm0 11.01V22c4.74-.47 8.5-4.25 8.97-8.99h-8.97z"/>
          </svg>
        ),
        title: 'Product Thinking',
        description: 'I focus on finding business solutions through MVP and hypothesis testing. I design interfaces that help products grow and retain users.'
      },
      {
        icon: (
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M3 13h2v-2H3v2zm0 4h2v-2H3v2zm0-8h2V7H3v2zm4 4h14v-2H7v2zm0 4h14v-2H7v2zM7 7v2h14V7H7z"/>
          </svg>
        ),
        title: 'UI & Design Systems',
        description: 'I create scalable component libraries following Apple and Google guidelines. I maintain order in layouts and clarity in visual hierarchy.'
      },
      {
        icon: (
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"/>
          </svg>
        ),
        title: 'UX Research',
        description: 'I dive deep into user pain points. I analyze competitors and market patterns to create intuitive scenarios.'
      },
      {
        icon: (
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
          </svg>
        ),
        title: 'Accessibility & Guidelines',
        description: 'I design with inclusivity and platform patterns in mind. I know how to make interfaces convenient for everyone and understandable for the development team.'
      },
      {
        icon: (
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
          </svg>
        ),
        title: 'Logic Design',
        description: 'I develop complex information architecture and User Flows. I eliminate "dead ends" in scenarios, making the user path seamless and logical.'
      },
      {
        icon: (
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M13 2.05v3.03c3.39.49 6 3.39 6 6.92 0 .9-.18 1.75-.48 2.54l2.6 1.53c.56-1.24.88-2.62.88-4.07 0-5.18-3.95-9.45-9-9.99zM12 19c-3.87 0-7-3.13-7-7 0-3.53 2.61-6.43 6-6.92V2.05c-5.06.5-9 4.76-9 9.95 0 5.52 4.47 10 9.99 10 3.31 0 6.24-1.61 8.06-4.09l-2.6-1.53C16.17 17.98 14.21 19 12 19z"/>
          </svg>
        ),
        title: 'Vibe Coding & AI Tools',
        description: 'I use AI to build functional frontend prototypes. This allows me to test design in a real environment and validate ideas faster.'
      }
    ],
    // Projects
    projects: [
      {
        id: 'keepl-app',
        image: '/assets/keepl app.png',
        title: 'Keepl App',
        subtitle: 'Web & Mobile',
        description: 'Web application for achieving goals. Product design from scratch: from market analysis and hypotheses to adaptive design system development. As part of the case, I worked out complex data visualization scenarios and independently implemented the frontend part on React to validate UX patterns in a live interface.',
        tags: ['Product Design', 'Web App', 'Frontend (React)'],
        link: '/keepl-app'
      },
      {
        id: 'keepl-landing',
        title: 'Keepl Landing page',
        subtitle: 'Landing page',
        description: 'Keepl Landing Page - landing page for goal tracking ecosystem. I designed the page structure, building a narrative from user pain to solution to retain attention and maximally reveal product value. I transferred the visual concept of the application to adaptive web design and implemented the frontend using AI, ensuring accuracy and interface compliance with the original.',
        image: '/assets/landing.png',
        tags: ['Product Design', 'Web', 'Mobile', 'Frontend (React)'],
        link: '/keepl-landing'
      },
      {
        id: 'add-transition',
        title: 'Transaction Interface Design',
        subtitle: 'Mobile App',
        description: 'Optimization of expense tracking process. I conducted UX analysis of user churn reasons and completely redesigned the transaction flow, reducing input time to 2-3 seconds. I designed a single-screen interface with category selection, minimized cognitive load and prepared a final UI focused on "on-the-go" usage speed.',
        image: '/assets/fintech.png',
        tags: ['FinTech', 'Mobile', 'Product Design'],
        link: '/add-transition'
      },
      {
        id: 'hired-app',
        title: 'Hired App',
        subtitle: 'Mobile App',
        description: 'Job search platform design from scratch. I created a complete user experience: from research stage and JTBD frameworks to final interfaces. I developed complex product architecture, multi-step scenarios and a scalable design system.',
        image: '/assets/hired app.png',
        tags: ['Product Design', 'Mobile'],
        link: '/hired-app'
      }
    ],
    // Case Studies
    caseStudies: {
      keeplApp: {
        title: 'Keepl App',
        subtitle: 'Mobile App',
        description: 'Web application for achieving goals. Helps users track progress, consider emotional state and fight burnout. Product design from scratch: from market analysis and hypotheses to adaptive design system development.',
        tags: ['Product Design', 'Web App', 'Frontend (React)'],
        heroImage: '/assets/keepl app.png',
        heroImages: [
          '/assets/keepl app.png',
          '/assets/keepl app/home_placeholder.png',
          '/assets/keepl app/create_new_goal.png'
        ],
        sections: [
          {
            id: 'overview',
            title: 'Background',
            content: 'The project started as an experiment: I conducted small interviews with friends to understand what difficulties they face when achieving their tasks and goals. Based on these observations, I tried to design several mobile app screens that help the user track progress and maintain motivation. The experience was interesting, and I decided to develop it into a full-fledged product.',
            images: ['/assets/mini-research.png']
          },
          {
            id: 'problem',
            title: 'User Problem',
            content: 'Users face several key difficulties when trying to achieve their goals:\n\n• It\'s difficult to see progress and understand what\'s already done and what\'s not.\n• Motivation drops when the service doesn\'t show achievements and doesn\'t help maintain focus.\n• Pressure from familiar mechanics (streaks, uncompleted tasks) creates feelings of guilt and stress instead of support and motivation.\n• Existing tools are either overloaded with features or too abstract and don\'t consider the user\'s emotional experience.\n• Often have to combine different apps and methods, which creates chaos and extra load.\n\nAs a result, achieving goals turns into a routine rather than a conscious and motivating process, and users often feel tired and disappointed.',
            images: []
          },
          {
            id: 'product-discovery',
            title: 'Product discovery',
            content: `### What exactly do we want to do?\n\nA web application that helps users achieve their goals (whatever they may be) and makes the process more conscious and motivating. The focus is on user experience and emotions: they track progress in a visual form and can record their mood to understand how it correlates with results.\n\nI focused on personalization and empathy: the application adapts to the user\'s work style and supports their motivation through simple and understandable mechanics.\n\n### Who is this for?\n\nThe target audience is people who set personal or work goals for themselves but face the problem of maintaining motivation and tracking progress.\n\n### Why are we doing this?\n\nUsually goal-oriented services focus only on productivity: complete as much as possible as quickly as possible. As a result, users eventually end up mindlessly checking boxes.\nWe want to shift the focus to the process itself - to give users space for mindfulness, support, and understanding of their state. It\'s not just about "completing a task", but about seeing value in one\'s own steps and understanding that even small actions contribute to progress.\n\n### What alternatives exist?\n\nMost competitors can be divided into four types:\n\n- Task managers: strong in task management, metrics and reporting, but almost don\'t address emotional motivation.\n- Coaching-lifestyle applications: provide support and inspiration, but are often overloaded with features and lack convenient progress visualization.\n- Habit and mood trackers: help track steps and habits, show progress in graphs, sometimes connect actions with mood, but are limited in goal-setting depth and rarely go beyond checklists.\n- Daily planners: structure schedules and help follow routines, but hardly work with long-term goals and user emotions.\n\nThus, the market covers different aspects: somewhere there\'s rigid structure and visualization, somewhere emotional support and coaching, and somewhere flexible habit tracking. But practically no one combines all this together: goal setting with subgoals, emotional tags and mood at the level of specific actions, photo progress and gentle action alternatives based on user state.\n\nTo understand the market deeper, I analyzed specific products from these categories:\n\n| **Name** | **Goals & Subgoals** | **Progress Visualization** | **Mood/Tags** | **Photo Progress** | **Action Alternatives** | **Motivation** |\n| --- | --- | --- | --- | --- | --- | --- |\n| Strides | ✅ flexible goals, habits, KPIs | ✅ progress bars, graphs | ❌ | ❌ | ❌ | ❌ |\n| Fabulous | ❌ focus on habits | ❌ streaks | partially, general tracker | ❌ | ✅ | ✅ coaching scenarios |\n| Daylio | ❌ only habits | ✅ mood/habit graphs | ✅ | ❌ | ❌ | ❌ statistics |\n| Habitica | ✅ quests | ✅ xp, levels | ❌ | ❌ | ✅ | ✅ gamification, community |\n| Coach.me | ✅ | ❌ counters | ❌ | ❌ | ❌ | ✅ coaches |\n| Remente | ✅ life goals, subgoals, plans | ✅ | ✅ mood tracker | ❌ | ❌ | ✅ articles, reminders |\n| Way of Life | ❌ focus on habits | ✅ | ✅ mood tags for habits | ❌ | ❌ | ❌ statistics |\n| Goal: Habits & Tasks | ✅ goals, habits, tasks | ✅ progress bars, calendars | ❌ | ❌ | ❌ | ❌ |\n| Success Wizard | ✅ step-by-step plans, goals | ❌ reports | ❌ | ❌ | ❌ | ❌ |\n| ATracker PRO | ❌ time tracker | ✅ graphs | ❌ | ❌ | ❌ | ❌ |\n| ClickUp | ✅ | ✅ dashboards and metrics | ❌ | ❌ | ❌ | ❌ |\n\n### How do users solve this problem now?\n\nPeople use notes, task managers, planners, and habit trackers, but no tool combines motivation, visual progress, and emotional support. They often rely on self-discipline and lose motivation when they don\'t see results.`,
            images: []
          },
          {
            id: 'ux-research',
            title: 'UX Research & Insights',
            content: 'To understand the context and real pain points more deeply, I conducted small interviews with acquaintances and reviewed user feedback from similar apps (Strides, Habitica, Daylio, Fabulous, Finch).\n\nThis helped me formulate three key behavior patterns:\n\n• Hard to start\n\nPeople get lost at first launch and don\'t understand how to set a goal correctly. This means we need onboarding and templates that help start without stress.\n\n• No flexibility\n\nApps force users to fit rigid templates, but users want to set their own parameters. This means it\'s important to allow customizing units of measurement and goal structure.\n\n• Emotional pressure\n\nBecause of streaks and reporting, users feel guilty if they don\'t complete all planned actions. The interface should support them, not judge. We need soft UX tone, motivational texts, easy action alternatives.',
            images: []
          },
          {
            id: 'jtbd',
            title: 'JTBD',
            content: '- When I set a big goal, I want to break it down into small steps so I can see a clear plan and not lose motivation.\n- When I complete daily actions, I want to mark progress and see the dynamic visually so I feel movement forward and feel proud of the result.\n- When I\'m tired or in a bad mood, I want to have an easier alternative to the action so I don\'t drop out of the process, maintain rhythm, and don\'t blame myself for skips.\n- When I close a mini-goal, I want to attach a photo or note so I can visually see changes and have a chance to revisit them later.\n- When I record my mood after completing a mini-goal, I want to track it along with progress to see the connection between actions and my state.\n- When I lose interest or energy, I want to receive soft encouraging reminders to maintain motivation and keep moving toward my goal.',
            images: []
          },
          {
            id: 'hypothesis',
            title: 'Hypothesis',
            content: 'If we give users the ability to customize goals to their own style and state, add emotional feedback (mood tracker, photos, supporting texts) and easy alternatives, then this will help them maintain motivation longer and keep a sense of progress. In turn, this will lead to increased retention, stickiness (DAU) and reduced drop-off rate.',
            images: []
          },
          {
            id: 'user-flow',
            title: 'User Flow',
            content: 'Three user scenarios: goal creation, marking daily mini-goal completion, and replacing a mini-goal with an easier alternative. The flow is simple and clear to show how users interact with the service.\n\n### Scenario 1: User creates a new goal\n\nThe goal creation flow focuses on minimizing cognitive load and fighting the "too much to do" effect. Flexible unit customization and preventive addition of an easier alternative at the moment of goal creation - this is the key product decision.\n\nWe give the user complete control over their Plan B, allowing them to set a realistic, simplified step in advance for low-motivation moments. The user doesn\'t need to improvise or skip a step, directly solving the "hard to start and lack of flexibility" problem.\n\n### Scenario 2: User marks daily progress\n\nThis flow deliberately avoids aggressive emphasis on streaks, shifting focus to progress itself. Manual result input forces users to consciously evaluate their effort. Instant progress visualization, even minimal, provides positive reinforcement and combats the feeling that efforts are futile.\n\nOptional mood tracking on the overlay is integrated to collect data on the correlation between action and emotional state: the user sees that last time when they completed a task, they felt better, so it makes sense to make the effort this time too.\n\n### Scenario 3: User is tired and can\'t complete the goal fully\n\nThis scenario solves the "user feels guilty and abandons the goal when unable to complete it fully" insight. Instead of skipping the task, the flow suggests activating a user-defined simplified path. This preserves the habit and removes emotional pressure by using a solution decided by the user themselves in a more motivated state, which is critical for long-term retention.',
            images: []
          },
          {
            id: 'metrics',
            title: 'Metrics & Hypothesis Validation Plan',
            content: '### Main Hypothesis\n\nRigid "completed/skipped" systems create pressure on users and guilt when they miss. Implementing customization to the user\'s current state (manual progress input, easy alternative, emotional feedback) will preserve a sense of control and motivation over the long term.\n\n### Key Metrics\n\nTo assess success, we will track the following indicators:\n\n- 30-day retention - key indicator of long-term value. We expect the system\'s flexibility will keep users in the product longer than classic alternatives.\n- Stickiness (DAU/MAU) - frequency of returns. Will show if the app became a daily helper thanks to "easy alternatives".\n- Feature Adoption Rate - percentage using "lighter alternative" and manual input functions. This will confirm that users find these tools helpful during tired moments.\n- Completion Rate - percentage of goals brought to completion. Will show if "easy alternative" helps users not abandon difficult tasks and keep pushing to finish.',
            images: []
          },
          {
            id: 'ui',
            title: 'UI',
            content: 'Keepl\'s design moved away from aggressive productivity interfaces and focused on creating a supportive, flexible, and conscious environment for achieving goals. I used soft corners to reduce visual harshness, soft shadows to create light but quick recognition of interactive elements, and a calm color palette that doesn\'t strain the eye with daily app use.\n\nMobile adaptation is implemented as a PWA - users can "save" the web page to their home screen and use it like a regular mobile app. For this, I reworked some interface elements so the app behaves natively: the sidebar was replaced with a familiar tab bar, modals became bottom sheets.\n\n### First Login & Goal Creation',
            images: []
          },
          {
            id: 'results',
            title: 'Project Status',
            content: 'Designed and implemented complete user experience for a goal tracking app. Created 15+ screens with responsive design and developed a design system with 50+ components. Implemented complex navigation with user context preservation. Backend development is in progress.',
            images: []
          }
        ]
      }
    },
    // Footer
    footer: {
      copyright: 'Product Designer Portfolio. All rights reserved.'
    }
  }
}

const LanguageContext = createContext()

export const useTranslation = () => {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error('useTranslation must be used within a LanguageProvider')
  }
  return context
}

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState('ru')

  const t = (key) => {
    const keys = key.split('.')
    let value = translations[language]
    
    for (const k of keys) {
      value = value?.[k]
    }
    
    return value || key
  }

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'ru' ? 'en' : 'ru')
  }

  return (
    <LanguageContext.Provider value={{ language, t, toggleLanguage }}>
      {children}
    </LanguageContext.Provider>
  )
}
