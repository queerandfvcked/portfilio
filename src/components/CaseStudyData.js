const isMissingTranslation = (value, key) =>
  value == null ||
  value === '' ||
  (typeof value === 'string' &&
    (value === key || value.startsWith('caseStudies.') || value.startsWith('casePage.')))

export function getCaseStudies(t, language = 'ru') {
  const tx = (key) => {
    const value = t(key)
    if (Array.isArray(value) || (value && typeof value === 'object' && !Array.isArray(value))) {
      return value
    }
    if (isMissingTranslation(value, key)) return undefined
    return value
  }

  return {

    'zhabka': {

      title: t('caseStudies.zhabka.title'),

      subtitle: t('caseStudies.zhabka.subtitle'),

      description: t('caseStudies.zhabka.description'),

      tags: t('caseStudies.zhabka.tags'),

      heroImage: '/assets/case-main/zhabka-desktop-1600.webp',

      heroImages: [

        '/assets/zhabka casecard.png'

      ],

      meta: {

        role: t('casePage.roleValue'),

        status: t('casePage.cases.zhabka.status')

      },

      stats: t('casePage.cases.zhabka.stats'),

      links: [],

      takeaways: t('casePage.cases.zhabka.takeaways'),

      tldr: {

        problem: t('casePage.tldr.zhabka.problem'),

        solution: t('casePage.tldr.zhabka.solution'),

        result: t('casePage.tldr.zhabka.result')

      },

      sections: [

        {

          id: 'problem',
          collapsible: false,

          title: t('caseStudies.zhabka.sections.0.title'),

          content: t('caseStudies.zhabka.sections.0.content'),

          images: []

        },

        {

          id: 'task',
          collapsible: false,

          title: t('caseStudies.zhabka.sections.1.title'),

          content: t('caseStudies.zhabka.sections.1.content'),

          images: []

        },

        {

          id: 'solution',
          collapsible: false,

          title: t('caseStudies.zhabka.sections.2.title'),

          content: t('caseStudies.zhabka.sections.2.content'),

          images: [],

          accordionTitle: t('caseStudies.zhabka.sections.2.accordionTitle'),

          flowSteps: t('caseStudies.zhabka.sections.2.flowSteps'),

          items: t('caseStudies.zhabka.sections.2.items')

        },

        {

          id: 'product-decisions',
          collapsible: false,

          title: t('caseStudies.zhabka.sections.3.title'),

          images: [],

          items: t('caseStudies.zhabka.sections.3.items')

        },

        {

          id: 'motion-states',
          collapsible: false,

          title: t('caseStudies.zhabka.sections.4.title'),

          content: t('caseStudies.zhabka.sections.4.content'),

          images: []

        },

        {

          id: 'results',
          collapsible: false,

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

      heroImage: '/assets/case-main/keepl-desktop-1600.webp',

      heroImages: [

        '/assets/keepl app.png',

        '/assets/keepl app/home_placeholder.png',

        '/assets/keepl app/create_new_goal.png'

      ],

      meta: {

        role: t('casePage.roleValue'),

        status: t('casePage.cases.keepl-app.status')

      },

      stats: t('casePage.cases.keepl-app.stats'),

      links: [

        {

          label: t('casePage.pitchDeck'),

          href: language === 'ru' ? '/assets/pitch_deck_ru.pdf' : '/assets/pitch_deck_en.pdf',

          kind: 'primary',

          external: true

        },

        {

          label: t('casePage.landingCta'),

          href: 'https://keepl.vercel.app/',

          kind: 'ghost',

          external: true

        }

      ],

      takeaways: t('casePage.cases.keepl-app.takeaways'),

      tldr: {

        problem: t('casePage.tldr.keepl-app.problem'),

        solution: t('casePage.tldr.keepl-app.solution'),

        result: t('casePage.tldr.keepl-app.result')

      },

      sections: [

        {

          id: 'overview',
          collapsible: false,

          title: tx('caseStudies.keeplApp.sections.0.title'),
          label: tx('caseStudies.keeplApp.sections.0.label'),
          lead: tx('caseStudies.keeplApp.sections.0.lead'),
          content: tx('caseStudies.keeplApp.sections.0.content') || '',

          images: ['/assets/mini-research.png']

        },

        {

          id: 'constraints',
          collapsible: false,

          title: tx('caseStudies.keeplApp.sections.10.title'),
          label: tx('caseStudies.keeplApp.sections.10.label'),
          lead: tx('caseStudies.keeplApp.sections.10.lead'),
          content: tx('caseStudies.keeplApp.sections.10.content') || '',

          images: []

        },

        {

          id: 'problem',
          collapsible: false,

          title: tx('caseStudies.keeplApp.sections.1.title'),
          label: tx('caseStudies.keeplApp.sections.1.label'),
          lead: tx('caseStudies.keeplApp.sections.1.lead'),
          content: tx('caseStudies.keeplApp.sections.1.content') || '',

          images: []

        },

        {

          id: 'product-discovery',
          collapsible: true,
          defaultOpen: false,

          title: tx('caseStudies.keeplApp.sections.2.title'),
          label: tx('caseStudies.keeplApp.sections.2.label'),
          lead: tx('caseStudies.keeplApp.sections.2.lead'),
          content: tx('caseStudies.keeplApp.sections.2.content') || '',

          images: []

        },

        {

          id: 'ux-research',
          collapsible: false,

          title: tx('caseStudies.keeplApp.sections.3.title'),
          label: tx('caseStudies.keeplApp.sections.3.label'),
          lead: tx('caseStudies.keeplApp.sections.3.lead'),
          content: tx('caseStudies.keeplApp.sections.3.content') || '',

          images: []

        },

        {

          id: 'jtbd',
          collapsible: true,
          defaultOpen: false,

          title: tx('caseStudies.keeplApp.sections.4.title'),
          label: tx('caseStudies.keeplApp.sections.4.label'),
          lead: tx('caseStudies.keeplApp.sections.4.lead'),
          content: tx('caseStudies.keeplApp.sections.4.content') || '',

          images: []

        },

        {

          id: 'hypothesis',
          collapsible: false,

          title: tx('caseStudies.keeplApp.sections.5.title'),
          label: tx('caseStudies.keeplApp.sections.5.label'),
          lead: tx('caseStudies.keeplApp.sections.5.lead'),
          content: tx('caseStudies.keeplApp.sections.5.content') || '',

          images: []

        },

        {

          id: 'mechanics',
          collapsible: false,

          title: tx('caseStudies.keeplApp.sections.11.title'),
          label: tx('caseStudies.keeplApp.sections.11.label'),
          lead: tx('caseStudies.keeplApp.sections.11.lead'),
          content: tx('caseStudies.keeplApp.sections.11.content') || '',

          images: []

        },

        {

          id: 'user-flow',
          collapsible: false,

          title: tx('caseStudies.keeplApp.sections.6.title'),
          label: tx('caseStudies.keeplApp.sections.6.label'),
          lead: tx('caseStudies.keeplApp.sections.6.lead'),
          content: tx('caseStudies.keeplApp.sections.6.content') || '',

          images: []

        },

        {

          id: 'metrics',
          collapsible: false,

          title: tx('caseStudies.keeplApp.sections.7.title'),
          label: tx('caseStudies.keeplApp.sections.7.label'),
          lead: tx('caseStudies.keeplApp.sections.7.lead'),
          content: tx('caseStudies.keeplApp.sections.7.content') || '',

          images: []

        },

        {

          id: 'ui',
          collapsible: false,

          title: tx('caseStudies.keeplApp.sections.8.title'),
          label: tx('caseStudies.keeplApp.sections.8.label'),
          lead: tx('caseStudies.keeplApp.sections.8.lead'),
          content: tx('caseStudies.keeplApp.sections.8.content') || '',

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

        },

        {

          id: 'results',
          collapsible: false,

          title: tx('caseStudies.keeplApp.sections.9.title'),
          label: tx('caseStudies.keeplApp.sections.9.label'),
          lead: tx('caseStudies.keeplApp.sections.9.lead'),
          content: tx('caseStudies.keeplApp.sections.9.content') || '',

          images: []

        },

        {

          id: 'next',
          collapsible: false,

          title: tx('caseStudies.keeplApp.sections.12.title'),
          label: tx('caseStudies.keeplApp.sections.12.label'),
          lead: tx('caseStudies.keeplApp.sections.12.lead'),
          content: tx('caseStudies.keeplApp.sections.12.content') || '',

          images: []

        },

        {
          id: 'landing',
          collapsible: true,
          defaultOpen: false,

          title: tx('casePage.landingTitle'),

          teaser: tx('casePage.landingTeaser'),

          content: tx('casePage.landingBody') || '',

          images: ['/assets/landing.png'],

          landingLinks: [

            { label: t('casePage.landingCta'), href: 'https://keepl.vercel.app/', kind: 'primary', external: true },

            { label: t('casePage.fullCase'), href: '/keepl-landing', kind: 'ghost' }

          ]

        }

      ].filter((section) => Boolean(section.title))

    },

    'hired-app': {

      title: t('caseStudies.hiredApp.title'),

      subtitle: t('caseStudies.hiredApp.subtitle'),

      description: t('caseStudies.hiredApp.description'),

      tags: t('caseStudies.hiredApp.tags'),

      heroImage: '/assets/case-main/hired-1400.webp',

      heroImages: [

        '/assets/hired app.png',

        '/assets/hired app/Frame_1984077494.png'

      ],

      meta: {

        role: t('casePage.roleValue'),

        status: t('casePage.cases.hired-app.status')

      },

      stats: t('casePage.cases.hired-app.stats'),

      links: [

        {

          label: t('common.behanceButton'),

          href: 'https://www.behance.net/gallery/228101995/Hired-Job-search-app',

          kind: 'primary',

          external: true

        }

      ],

      takeaways: t('casePage.cases.hired-app.takeaways'),

      tldr: {

        problem: t('casePage.tldr.hired-app.problem'),

        solution: t('casePage.tldr.hired-app.solution'),

        result: t('casePage.tldr.hired-app.result')

      },

      sections: [

        {

          id: 'idea',
          collapsible: false,

          title: t('caseStudies.hiredApp.sections.0.title'),

          label: tx('caseStudies.hiredApp.sections.0.label'),
          nav: tx('caseStudies.hiredApp.sections.0.nav'),
          lead: tx('caseStudies.hiredApp.sections.0.lead'),

          content: t('caseStudies.hiredApp.sections.0.content'),

          images: []

        },

        {

          id: 'process',
          collapsible: false,

          title: t('caseStudies.hiredApp.sections.1.title'),

          label: tx('caseStudies.hiredApp.sections.1.label'),
          nav: tx('caseStudies.hiredApp.sections.1.nav'),
          lead: tx('caseStudies.hiredApp.sections.1.lead'),

          content: t('caseStudies.hiredApp.sections.1.content'),

          images: []

        },

        {

          id: 'user-problem',
          collapsible: false,

          title: t('caseStudies.hiredApp.sections.2.title'),

          label: tx('caseStudies.hiredApp.sections.2.label'),
          nav: tx('caseStudies.hiredApp.sections.2.nav'),
          lead: tx('caseStudies.hiredApp.sections.2.lead'),

          content: t('caseStudies.hiredApp.sections.2.content'),

          images: []

        },

        {

          id: 'hypothesis',
          collapsible: false,

          title: t('caseStudies.hiredApp.sections.3.title'),

          label: tx('caseStudies.hiredApp.sections.3.label'),
          nav: tx('caseStudies.hiredApp.sections.3.nav'),
          lead: tx('caseStudies.hiredApp.sections.3.lead'),

          content: t('caseStudies.hiredApp.sections.3.content'),

          images: []

        },

        {

          id: 'research-analysis',
          collapsible: false,

          title: t('caseStudies.hiredApp.sections.4.title'),

          label: tx('caseStudies.hiredApp.sections.4.label'),
          nav: tx('caseStudies.hiredApp.sections.4.nav'),
          lead: tx('caseStudies.hiredApp.sections.4.lead'),

          content: t('caseStudies.hiredApp.sections.4.content'),

          additionalContent: t('caseStudies.hiredApp.sections.4.additionalContent'),

          moreContent: t('caseStudies.hiredApp.sections.4.moreContent'),

          images: t('caseStudies.hiredApp.sections.4.images'),

          finalImages: t('caseStudies.hiredApp.sections.4.finalImages'),

          additionalImages: t('caseStudies.hiredApp.sections.4.additionalImages')

        },

        {

          id: 'structure-design',
          collapsible: false,

          title: t('caseStudies.hiredApp.sections.5.title'),

          label: tx('caseStudies.hiredApp.sections.5.label'),
          nav: tx('caseStudies.hiredApp.sections.5.nav'),
          lead: tx('caseStudies.hiredApp.sections.5.lead'),

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
          collapsible: false,

          title: t('caseStudies.hiredApp.sections.6.title'),

          label: tx('caseStudies.hiredApp.sections.6.label'),
          nav: tx('caseStudies.hiredApp.sections.6.nav'),
          lead: tx('caseStudies.hiredApp.sections.6.lead'),

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

      meta: {

        role: t('casePage.roleValue'),

        status: t('casePage.cases.keepl-landing.status')

      },

      stats: [],

      links: [

        {

          label: 'Live Landing',

          href: 'https://keepl.vercel.app/',

          kind: 'primary',

          external: true

        }

      ],

      takeaways: [],

      sections: [

        {

          id: 'problem',
          collapsible: false,

          title: t('caseStudies.keeplLanding.sections.0.title'),

          content: t('caseStudies.keeplLanding.sections.0.content'),

          images: []

        },

        {

          id: 'task-hypothesis',
          collapsible: false,

          title: t('caseStudies.keeplLanding.sections.1.title'),

          content: t('caseStudies.keeplLanding.sections.1.content'),

          images: []

        },

        {

          id: 'solution',
          collapsible: false,

          title: t('caseStudies.keeplLanding.sections.2.title'),

          content: t('caseStudies.keeplLanding.sections.2.content'),

          images: []

        },

        {

          id: 'implementation',
          collapsible: false,

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
          collapsible: true,
          defaultOpen: false,

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

      heroImage: '/assets/case-main/fintech-1400.webp',

      heroImages: [

        '/assets/New folder/hero.png'

      ],

      meta: {

        role: t('casePage.roleValue')

      },

      stats: t('casePage.cases.add-transition.stats'),

      links: [],

      takeaways: t('casePage.cases.add-transition.takeaways'),

      tldr: {

        problem: t('casePage.tldr.add-transition.problem'),

        solution: t('casePage.tldr.add-transition.solution'),

        result: t('casePage.tldr.add-transition.result')

      },

      sections: [

        {

          id: 'goal-context',
          collapsible: false,

          title: t('caseStudies.addTransition.sections.0.title'),

          label: tx('caseStudies.addTransition.sections.0.label'),
          nav: tx('caseStudies.addTransition.sections.0.nav'),
          lead: tx('caseStudies.addTransition.sections.0.lead'),

          content: t('caseStudies.addTransition.sections.0.content'),

          images: []

        },

        {

          id: 'competitor-solutions',
          collapsible: false,

          title: t('caseStudies.addTransition.sections.2.title'),

          label: tx('caseStudies.addTransition.sections.2.label'),
          nav: tx('caseStudies.addTransition.sections.2.nav'),
          lead: tx('caseStudies.addTransition.sections.2.lead'),

          content: t('caseStudies.addTransition.sections.2.content'),

          images: []

        },

        {

          id: 'user-problem',
          collapsible: false,

          title: t('caseStudies.addTransition.sections.1.title'),

          label: tx('caseStudies.addTransition.sections.1.label'),
          nav: tx('caseStudies.addTransition.sections.1.nav'),
          lead: tx('caseStudies.addTransition.sections.1.lead'),

          content: t('caseStudies.addTransition.sections.1.content'),

          images: []

        },

        {

          id: 'ux-solutions',
          collapsible: false,

          title: t('caseStudies.addTransition.sections.3.title'),

          label: tx('caseStudies.addTransition.sections.3.label'),
          nav: tx('caseStudies.addTransition.sections.3.nav'),
          lead: tx('caseStudies.addTransition.sections.3.lead'),

          content: t('caseStudies.addTransition.sections.3.content'),

          images: []

        },

        {

          id: 'flow',
          collapsible: false,

          title: t('caseStudies.addTransition.sections.4.title'),

          label: tx('caseStudies.addTransition.sections.4.label'),
          nav: tx('caseStudies.addTransition.sections.4.nav'),
          lead: tx('caseStudies.addTransition.sections.4.lead'),

          content: t('caseStudies.addTransition.sections.4.content'),

          images: []

        },

        {

          id: 'layout',
          collapsible: false,

          title: t('caseStudies.addTransition.sections.5.title'),

          label: tx('caseStudies.addTransition.sections.5.label'),
          nav: tx('caseStudies.addTransition.sections.5.nav'),
          lead: tx('caseStudies.addTransition.sections.5.lead'),

          content: t('caseStudies.addTransition.sections.5.content'),

          images: []

        },

        {

          id: 'result',
          collapsible: false,

          title: t('caseStudies.addTransition.sections.6.title'),

          label: tx('caseStudies.addTransition.sections.6.label'),
          nav: tx('caseStudies.addTransition.sections.6.nav'),
          lead: tx('caseStudies.addTransition.sections.6.lead'),

          content: t('caseStudies.addTransition.sections.6.content'),

          images: []

        }

      ]

    }

  }
}
