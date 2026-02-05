import React from 'react'
import { useTranslation } from '../contexts/LanguageContext'

const Skills = () => {
  const { t } = useTranslation()

  const skillCategories = [
    {
      title: t('skills.categories.designTools'),
      icon: '🎨',
      skills: [
        { name: 'Figma', level: 90, color: 'bg-purple-500' },
        { name: 'Sketch', level: 85, color: 'bg-orange-500' },
        { name: 'Adobe XD', level: 80, color: 'bg-pink-500' },
        { name: 'Framer', level: 75, color: 'bg-blue-500' }
      ]
    },
    {
      title: t('skills.categories.designSkills'),
      icon: '💡',
      skills: [
        { name: 'UI/UX Design', level: 95, color: 'bg-green-500' },
        { name: 'User Research', level: 85, color: 'bg-indigo-500' },
        { name: 'Prototyping', level: 90, color: 'bg-yellow-500' },
        { name: 'Design Systems', level: 80, color: 'bg-red-500' }
      ]
    },
    {
      title: t('skills.categories.methodologies'),
      icon: '🚀',
      skills: [
        { name: 'Design Thinking', level: 90, color: 'bg-teal-500' },
        { name: 'Agile/Scrum', level: 85, color: 'bg-cyan-500' },
        { name: 'User Testing', level: 88, color: 'bg-rose-500' },
        { name: 'A/B Testing', level: 75, color: 'bg-amber-500' }
      ]
    }
  ]

  return (
    <section id="skills" className="py-20">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            {t('skills.title')}
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            {t('skills.description')}
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {skillCategories.map((category, index) => (
            <div 
              key={index} 
              className="glass p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 group"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Category header with icon */}
              <div className="flex items-center mb-8">
                <div className="text-4xl mr-3 group-hover:scale-110 transition-transform duration-300">
                  {category.icon}
                </div>
                <h3 className="text-xl font-semibold text-white group-hover:text-amber-400 transition-colors duration-300">
                  {category.title}
                </h3>
              </div>
              
              <div className="space-y-6">
                {category.skills.map((skill, skillIndex) => (
                  <div key={skillIndex} className="group">
                    <div className="flex justify-between items-center mb-3">
                      <div className="flex items-center">
                        <div className={`w-3 h-3 ${skill.color} rounded-full mr-3 group-hover:scale-125 transition-transform duration-300`}></div>
                        <span className="text-gray-200 font-medium group-hover:text-white transition-colors duration-300">
                          {skill.name}
                        </span>
                      </div>
                      <span className="text-cyan-400 font-bold text-sm group-hover:text-cyan-300 transition-colors duration-300">
                        {skill.level}%
                      </span>
                    </div>
                    <div className="relative">
                      <div className="w-full bg-gray-700 rounded-full h-3 overflow-hidden">
                        <div 
                          className={`${skill.color} h-3 rounded-full transition-all duration-1000 ease-out relative overflow-hidden`}
                          style={{ 
                            width: `${skill.level}%`,
                            animationDelay: `${skillIndex * 0.1}s`
                          }}
                        >
                          {/* Animated shine effect */}
                          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 animate-pulse"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Skills tags cloud */}
        <div className="mt-20 text-center">
          <h3 className="text-2xl font-semibold text-white mb-8">
            Additional Expertise
          </h3>
          <div className="inline-flex flex-wrap gap-3 justify-center max-w-4xl mx-auto">
            {[
              'Product Design', 'Mobile Design', 'Web Design', 'Design Systems',
              'User Research', 'Usability Testing', 'Wireframing', 'Prototyping',
              'Responsive Design', 'Accessibility', 'Design Thinking', 'Agile',
              'User Flows', 'Information Architecture', 'Interaction Design', 'Visual Design'
            ].map((tag, index) => (
              <span 
                key={tag}
                className="px-4 py-2 glass border border-gray-600/50 rounded-full text-gray-300 hover:border-cyan-400/50 hover:text-cyan-400 hover:bg-cyan-400/10 transition-all duration-300 cursor-pointer hover:scale-105"
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Skills
