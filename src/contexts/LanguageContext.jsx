import React, { createContext, useState, useContext } from 'react'

const translations = {
  ru: {
    // Navigation
    nav: {
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
        projects: 'Проектов',
        clients: 'Клиентов',
        rating: 'Рейтинг'
      }
    },
    // Projects
    projects: {
      title: 'Кейсы',
      moreDetails: 'Подробнее'
    },
    // About
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
    // Footer
    footer: {
      copyright: 'Product Designer Portfolio. Все права защищены.'
    }
  },
  en: {
    // Navigation
    nav: {
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
        projects: 'Projects',
        clients: 'Clients',
        rating: 'Rating'
      }
    },
    // Projects
    projects: {
      title: 'Cases',
      moreDetails: 'More Details'
    },
    // About
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
