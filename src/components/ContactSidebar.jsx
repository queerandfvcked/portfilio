import React, { useState } from 'react'

const ContactSidebar = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  })

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    // Create mailto link with form data
    const subject = encodeURIComponent(`Portfolio Contact from ${formData.name}`)
    const body = encodeURIComponent(`Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`)
    const mailtoLink = `mailto:andrianshtark@gmail.com?subject=${subject}&body=${body}`
    
    // Open email client
    window.open(mailtoLink, '_blank')
    
    // Close sidebar
    onClose()
  }

  const socialLinks = [
    {
      name: 'Telegram',
      url: 'https://t.me/icedcreamsoda',
      color: 'hover:bg-blue-500'
    },
    {
      name: 'Gmail',
      url: 'mailto:andrianshtark@gmail.com',
      color: 'hover:bg-red-500'
    },
    {
      name: 'HH.ru',
      url: 'https://spb.hh.ru/resume/a951adeaff0f2857bf0039ed1f645643673433',
      color: 'hover:bg-red-600'
    }
  ]

  if (!isOpen) return null

  return (
    <>
      {/* Overlay with fade animation */}
      <div 
        className={`fixed inset-0 bg-black z-40 transition-all duration-300 ${
          isOpen ? 'opacity-50' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
      />
      
      {/* Sidebar with slide-out animation */}
      <div 
        className={`fixed right-0 top-0 h-screen w-full md:h-full md:w-96 shadow-2xl z-50 transition-all duration-500 ease-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        style={{
          backgroundColor: '#111318'
        }}
      >  
        {/* Header */}
        <div className="flex items-center justify-between p-3 md:p-4 border-b border-gray-700" style={{ backgroundColor: '#111318' }}>
          <h2 className="text-lg md:text-xl font-semibold text-white">
            Contact
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors p-2 hover:bg-gray-700/50 rounded-lg"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-3 md:p-4" style={{ backgroundColor: '#111318' }}>
          {/* Contact Form */}
          <form onSubmit={handleSubmit} className="space-y-3 md:space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 transition-all duration-300"
                style={{ backgroundColor: '#181A1F' }}
                placeholder="Your name"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 transition-all duration-300"
                style={{ backgroundColor: '#181A1F' }}
                placeholder="your.email@example.com"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Message
              </label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                required
                rows={3}
                className="w-full px-3 py-2 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 transition-all duration-300 resize-none"
                style={{ backgroundColor: '#181A1F' }}
                placeholder="Your message..."
              />
            </div>

            <button
              type="submit"
              className="w-full bg-cyan-500 text-gray-900 py-2 px-6 rounded-full font-semibold hover:bg-cyan-400 transition-colors duration-300 transform hover:scale-105"
            >
              Send Message
            </button>
          </form>

          {/* Social Links */}
          <div className="mt-4 md:mt-6 pt-4 md:pt-6 border-t border-gray-700">
            <h3 className="text-lg font-semibold text-white mb-3 md:mb-4">Connect with me</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-2 md:gap-3">
              {socialLinks.map((link, index) => (
                <a
                  key={link.name}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex items-center justify-center p-2 md:p-3 border border-gray-600 rounded-lg hover:border-cyan-400/50 transition-all duration-300 group ${link.color}`}
                  style={{ backgroundColor: '#181A1F' }}
                >
                  <span className="text-gray-300 group-hover:text-white transition-colors duration-300 font-medium text-sm md:text-base text-center">
                    {link.name}
                  </span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default ContactSidebar
