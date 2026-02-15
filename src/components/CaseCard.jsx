import React from 'react'

const CaseCard = ({ 
  title, 
  subtitle, 
  description, 
  image, 
  tags, 
  metrics, 
  link, 
  index = 0,
  className = '' 
}) => {
  return (
    <div 
      className={`project-card group cursor-pointer ${className}`}
      style={{ 
        animationDelay: `${index * 0.1}s`
      }}
    >
      {/* Desktop/Tablet: Horizontal layout */}
      <div className="hidden md:flex">
        {/* Left side - Image (50%) */}
        <div className="w-1/2 relative overflow-hidden">
          <img 
            src={image} 
            alt={title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          
          {/* View case study button on hover */}
          <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <a 
              href={link}
              className="w-full bg-cyan-500 text-gray-900 px-4 py-2 rounded-full font-medium text-center hover:bg-cyan-400 transition-colors"
            >
              View Case Study
            </a>
          </div>
        </div>
        
        {/* Right side - Content (50%) */}
        <div className="w-1/2 p-8 flex flex-col justify-center min-h-96">
          {/* Project subtitle */}
          <div className="text-cyan-400 text-sm font-medium mb-2">
            {subtitle}
          </div>
          
          {/* Project title */}
          <h3 className="text-2xl font-semibold text-white mb-4 group-hover:text-cyan-400 transition-colors duration-300">
            {title}
          </h3>
          
          {/* Project description */}
          <p className="text-slate-400 mb-6 leading-relaxed">
            {description}
          </p>
          
          {/* Metrics */}
          {metrics && metrics.length > 0 && (
            <div className="flex flex-wrap gap-6 mb-6">
              {metrics.map((metric, metricIndex) => (
                <div key={metricIndex} className="text-center">
                  <div className="text-xl font-bold text-cyan-400">
                    {metric.value}
                  </div>
                  <div className="text-xs text-slate-400">
                    {metric.label}
                  </div>
                </div>
              ))}
            </div>
          )}
          
          {/* Tags */}
          {tags && tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-6">
              {tags.map((tag) => (
                <span 
                  key={tag}
                  className="px-3 py-1 bg-cyan-500/20 text-cyan-400 rounded-full text-xs font-medium"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
          
          {/* More details link */}
          <a 
            href={link}
            className="inline-flex items-center text-cyan-400 hover:text-cyan-300 font-medium text-sm transition-colors duration-300"
          >
            More Details
            <svg className="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </a>
        </div>
      </div>

      {/* Mobile: Vertical layout */}
      <div className="md:hidden">
        {/* Mobile image */}
        <div className="aspect-video relative overflow-hidden">
          <img 
            src={image} 
            alt={title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          
          {/* View case study button on hover */}
          <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <a 
              href={link}
              className="w-full bg-cyan-500 text-gray-900 px-4 py-2 rounded-full font-medium text-center hover:bg-cyan-400 transition-colors"
            >
              View Case Study
            </a>
          </div>
        </div>
        
        {/* Mobile content */}
        <div className="p-6">
          {/* Project subtitle */}
          <div className="text-cyan-400 text-sm font-medium mb-2">
            {subtitle}
          </div>
          
          {/* Project title */}
          <h3 className="text-xl font-semibold text-white mb-3 group-hover:text-cyan-400 transition-colors duration-300">
            {title}
          </h3>
          
          {/* Project description */}
          <p className="text-slate-400 mb-4 line-clamp-3">
            {description}
          </p>
          
          {/* Metrics */}
          {metrics && metrics.length > 0 && (
            <div className="flex flex-wrap gap-4 mb-4">
              {metrics.map((metric, metricIndex) => (
                <div key={metricIndex} className="text-center">
                  <div className="text-lg font-bold text-cyan-400">
                    {metric.value}
                  </div>
                  <div className="text-xs text-slate-400">
                    {metric.label}
                  </div>
                </div>
              ))}
            </div>
          )}
          
          {/* Tags */}
          {tags && tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-4">
              {tags.map((tag) => (
                <span 
                  key={tag}
                  className="px-3 py-1 bg-cyan-500/20 text-cyan-400 rounded-full text-xs font-medium"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
          
          {/* More details link */}
          <a 
            href={link}
            className="inline-flex items-center text-cyan-400 hover:text-cyan-300 font-medium text-sm transition-colors duration-300"
          >
            More Details
            <svg className="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </a>
        </div>
      </div>
    </div>
  )
}

export default CaseCard
