const COPY = {
  ru: {
    images: 'Изображения',
    openImage: 'Открыть изображение',
    openImageNamed: (caption) => `Открыть изображение: ${caption}`,
    previous: 'Предыдущий',
    next: 'Следующий',
    slide: (number) => `Слайд ${number}`,
    slidePosition: (index, total) => `${index} из ${total}`,
    scenarios: 'Сценарии'
  },
  en: {
    images: 'Images',
    openImage: 'Open image',
    openImageNamed: (caption) => `Open image: ${caption}`,
    previous: 'Previous',
    next: 'Next',
    slide: (number) => `Slide ${number}`,
    slidePosition: (index, total) => `${index} of ${total}`,
    scenarios: 'Scenarios'
  }
}

export const getBlockCopy = (language) => COPY[language === 'ru' ? 'ru' : 'en']
