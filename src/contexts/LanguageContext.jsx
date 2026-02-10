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
