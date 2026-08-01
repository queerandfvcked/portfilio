export const formatContent = (content, openImageModal, language) => {
    if (!content) return null

    const lines = content.split('\n')

    let inTable = false

    let tableContent = []

    let afterBullet = false

    

    return lines.map((line, index) => {

      if (line.startsWith('### ')) {

        afterBullet = false

        return (

          <h3 key={index} className="text-xl font-bold text-cyan-300 mt-6 mb-3">

            {line.replace('### ', '')}

          </h3>

        )

      } else if (line.startsWith('## ')) {

        afterBullet = false

        return (

          <h2 key={index} className="text-2xl font-bold text-cyan-200 mt-8 mb-4">

            {line.replace('## ', '')}

          </h2>

        )

      } else if (line.includes('COINKEEPER_IMAGES_START')) {

        // Handle Coinkeeper special marker

        return (

          <div key={index} className="flex justify-center items-center w-full my-8">

            <div className="cursor-pointer group relative max-w-md" onClick={() => openImageModal("/assets/New folder/Competitive analysis/coinkeeper.png")}>

              <img 

                src="/assets/New folder/Competitive analysis/coinkeeper.png" 

                alt="Coinkeeper"

                className="w-full h-auto object-contain rounded-lg transition-transform duration-300 group-hover:scale-105"

              />

            </div>

          </div>

        )

      } else if (line.includes('MONEYMANAGER_IMAGES_START')) {

        // Handle Money Manager special marker

        return (

          <div key={index} className="flex justify-center items-center w-full my-8">

            <div className="cursor-pointer group relative max-w-md" onClick={() => openImageModal("/assets/New folder/Competitive analysis/money manager.png")}>

              <img 

                src="/assets/New folder/Competitive analysis/money manager.png" 

                alt="Money Manager"

                className="w-full h-auto object-contain rounded-lg transition-transform duration-300 group-hover:scale-105"

              />

            </div>

          </div>

        )

      } else if (line.includes('INCOMES_IMAGES_START')) {

        // Handle Incomes special marker

        return (

          <div key={index} className="flex justify-center items-center w-full my-8">

            <div className="cursor-pointer group relative max-w-md" onClick={() => openImageModal("/assets/New folder/Competitive analysis/incomes.png")}>

              <img 

                src="/assets/New folder/Competitive analysis/incomes.png" 

                alt="Incomes"

                className="w-full h-auto object-contain rounded-lg transition-transform duration-300 group-hover:scale-105"

              />

            </div>

          </div>

        )

      } else if (line.includes('ZENMONEY_IMAGES_START')) {

        // Handle ZenMoney special marker

        return (

          <div key={index} className="flex justify-center items-center w-full my-8">

            <div className="cursor-pointer group relative max-w-md" onClick={() => openImageModal("/assets/New folder/Competitive analysis/ZenMoney.png")}>

              <img 

                src="/assets/New folder/Competitive analysis/ZenMoney.png" 

                alt="ZenMoney"

                className="w-full h-auto object-contain rounded-lg transition-transform duration-300 group-hover:scale-105"

              />

            </div>

          </div>

        )

      } else if (line.includes('MONEFY_IMAGES_START')) {

        // Handle Monefy special marker

        return (

          <div key={index} className="flex justify-center items-center w-full my-8">

            <div className="cursor-pointer group relative max-w-md" onClick={() => openImageModal("/assets/New folder/Competitive analysis/Monefy.png")}>

              <img 

                src="/assets/New folder/Competitive analysis/Monefy.png" 

                alt="Monefy"

                className="w-full h-auto object-contain rounded-lg transition-transform duration-300 group-hover:scale-105"

              />

            </div>

          </div>

        )

      } else if (line.includes('SPENDEE_IMAGES_START')) {

        // Handle Spendee special marker

        return (

          <div key={index} className="flex justify-center items-center w-full my-8">

            <div className="cursor-pointer group relative max-w-md" onClick={() => openImageModal("/assets/New folder/Competitive analysis/Spendee.png")}>

              <img 

                src="/assets/New folder/Competitive analysis/Spendee.png" 

                alt="Spendee"

                className="w-full h-auto object-contain rounded-lg transition-transform duration-300 group-hover:scale-105"

              />

            </div>

          </div>

        )

      } else if (line.includes('MONEYMGR_IMAGES_START')) {

        // Handle Money Mgr special marker

        return (

          <div key={index} className="flex justify-center items-center w-full my-8">

            <div className="cursor-pointer group relative max-w-md" onClick={() => openImageModal("/assets/New folder/Competitive analysis/Money Mgr.png")}>

              <img 

                src="/assets/New folder/Competitive analysis/Money Mgr.png" 

                alt="Money Mgr"

                className="w-full h-auto object-contain rounded-lg transition-transform duration-300 group-hover:scale-105"

              />

            </div>

          </div>

        )

      } else if (line.includes('LAYOUT_START_RU')) {

        // Handle layout section with image and text side by side - Russian version

        return (

          <div key={index} className="flex flex-col lg:flex-row gap-8 my-12">

            <div className="lg:w-1/2 cursor-pointer group" onClick={() => openImageModal("/assets/New folder/iPhone_13_mini.png")}>

              <img 

                src="/assets/New folder/iPhone_13_mini.png" 

                alt="iPhone 13 mini mockup"

                className="w-full h-auto rounded-lg object-contain transition-transform duration-300 group-hover:scale-105"

              />

            </div>

            <div className="lg:w-1/2">

              <div className="space-y-4">

                <div className="flex items-start space-x-2">

                  <span className="text-cyan-400">•</span>

                  <span className="text-gray-200">По умолчанию видны 4 категории. Предполагается, что первыми стоят используемые чаще всего, чтобы не вынуждать пользователя лишний раз разворачивать список</span>

                </div>

                <div className="flex items-start space-x-2">

                  <span className="text-cyan-400">•</span>

                  <span className="text-gray-200">Кнопка неактивна, пока не будет введена сумма и выбрана категория</span>

                </div>

                <div className="flex items-start space-x-2">

                  <span className="text-cyan-400">•</span>

                  <span className="text-gray-200">При заходе на экран инпут суммы сразу в фокусе, клавиатура открыта. Так мы сократим время на тапе и сразу позволим ввести сумму (за этим пользователь и пришел на экран)</span>

                </div>

              </div>

              <div className="mt-6 text-gray-400 text-sm italic">

                Для удобства и скорости можно также использовать кастомную клавиатуру на экране, как у конкурентов, но я посчитал, что автоматический фокус на инпуте сработает не хуже, а системная клавиатура будет привычнее для пользователя.

              </div>

            </div>

          </div>

        )

      } else if (line.includes('LAYOUT_START')) {

        // Handle layout section with image and text side by side - English version

        return (

          <div key={index} className="flex flex-col lg:flex-row gap-8 my-12">

            <div className="lg:w-1/2 cursor-pointer group" onClick={() => openImageModal("/assets/New folder/iPhone_13_mini.png")}>

              <img 

                src="/assets/New folder/iPhone_13_mini.png" 

                alt="iPhone 13 mini mockup"

                className="w-full h-auto rounded-lg object-contain transition-transform duration-300 group-hover:scale-105"

              />

            </div>

            <div className="lg:w-1/2">

              <div className="space-y-4">

                <div className="flex items-start space-x-2">

                  <span className="text-cyan-400">•</span>

                  <span className="text-gray-200">By default, 4 categories are visible. It is assumed that the most frequently used ones come first to avoid forcing the user to expand the list unnecessarily</span>

                </div>

                <div className="flex items-start space-x-2">

                  <span className="text-cyan-400">•</span>

                  <span className="text-gray-200">The button is inactive until an amount is entered and a category is selected</span>

                </div>

                <div className="flex items-start space-x-2">

                  <span className="text-cyan-400">•</span>

                  <span className="text-gray-200">When entering the screen, the amount input is immediately in focus and the keyboard is open. This reduces tap time and immediately allows the user to enter the amount (which is why they came to the screen)</span>

                </div>

              </div>

              <div className="mt-6 text-gray-400 text-sm italic">

                For convenience and speed, you could also use a custom keyboard on the screen like competitors, but I believe that automatic input focus will work just as well, and the system keyboard will be more familiar to the user.

              </div>

            </div>

          </div>

        )

      } else if (line.includes('LAYOUT_SECOND_RU')) {

        // Handle second layout section with image and text side by side - Russian version

        return (

          <div key={index} className="flex flex-col lg:flex-row gap-8 my-12">

            <div className="lg:w-1/2 cursor-pointer group" onClick={() => openImageModal("/assets/New folder/iPhone_13_mini 1.png")}>

              <img 

                src="/assets/New folder/iPhone_13_mini 1.png" 

                alt="iPhone 13 mini mockup 1"

                className="w-full h-auto rounded-lg object-contain transition-transform duration-300 group-hover:scale-105"

              />

            </div>

            <div className="lg:w-1/2">

              <div className="space-y-4">

                <div className="flex items-start space-x-2">

                  <span className="text-cyan-400">•</span>

                  <span className="text-gray-200">Выделил категории разными цветами, но сделал их пастельными, не яркими, чтоб не резали глаз при ежедневном использовании. Если для каждой категории установить фиксированный цвет, то юзер может ориентироваться еще и по цвету в выборе категории</span>

                </div>

                <div className="flex items-start space-x-2">

                  <span className="text-cyan-400">•</span>

                  <span className="text-gray-200">Дата по умолчанию стоит "сегодня". При необходимости юзер нажмет на иконку и в боттом шит календаре выберет нужную дату</span>

                </div>

                <div className="flex items-start space-x-2">

                  <span className="text-cyan-400">•</span>

                  <span className="text-gray-200">Инпут комментария не занимает много места, лейбл в плейсхолдере. Сразу указал в нем на опциональность функции, чтобы пользователь точно не запутался</span>

                </div>

              </div>

            </div>

          </div>

        )

      } else if (line.includes('LAYOUT_SECOND')) {

        // Handle second layout section with image and text side by side - English version

        return (

          <div key={index} className="flex flex-col lg:flex-row gap-8 my-12">

            <div className="lg:w-1/2 cursor-pointer group" onClick={() => openImageModal("/assets/New folder/iPhone_13_mini 1.png")}>

              <img 

                src="/assets/New folder/iPhone_13_mini 1.png" 

                alt="iPhone 13 mini mockup 1"

                className="w-full h-auto rounded-lg object-contain transition-transform duration-300 group-hover:scale-105"

              />

            </div>

            <div className="lg:w-1/2">

              <div className="space-y-4">

                <div className="flex items-start space-x-2">

                  <span className="text-cyan-400">•</span>

                  <span className="text-gray-200">I highlighted categories with different colors, but made them pastel, not bright, so they don't strain the eyes during daily use. If you set a fixed color for each category, the user can also navigate by color when selecting a category</span>

                </div>

                <div className="flex items-start space-x-2">

                  <span className="text-cyan-400">•</span>

                  <span className="text-gray-200">The date defaults to "today". If needed, the user taps the icon and selects the desired date in the bottom sheet calendar</span>

                </div>

                <div className="flex items-start space-x-2">

                  <span className="text-cyan-400">•</span>

                  <span className="text-gray-200">The comment input doesn't take up much space, with the label in the placeholder. I immediately indicated the optional nature of the function so the user wouldn't get confused</span>

                </div>

              </div>

            </div>

          </div>

        )

      } else if (line.includes('LAYOUT_IMAGES')) {

        // Handle three layout images in row

        const layoutImagesText = language === 'ru' 
          ? 'Если категорий много, то можно использовать боттом шит с поиском, чтобы не нагружать основной экран и сделать поиск более удобным.'
          : 'If there are many categories, you can use a bottom sheet with search to avoid cluttering the main screen and make searching more convenient.'

        return (

          <div key={index}>

            <div className="flex flex-col lg:flex-row gap-6 justify-start items-center w-full my-12">

              <div className="w-full lg:w-[30%] cursor-pointer group" onClick={() => openImageModal("/assets/New folder/iPhone_13_mini 2.png")}>

                <img 

                  src="/assets/New folder/iPhone_13_mini 2.png" 

                  alt="iPhone 13 mini mockup 2"

                  className="w-full h-auto object-contain transition-transform duration-300 group-hover:scale-105"

                />

              </div>

              <div className="w-full lg:w-[30%] cursor-pointer group" onClick={() => openImageModal("/assets/New folder/iPhone_13_mini 3.png")}>

                <img 

                  src="/assets/New folder/iPhone_13_mini 3.png" 

                  alt="iPhone 13 mini mockup 3"

                  className="w-full h-auto object-contain transition-transform duration-300 group-hover:scale-105"

                />

              </div>

              <div className="w-full lg:w-[30%] cursor-pointer group" onClick={() => openImageModal("/assets/New folder/iPhone_13_mini 4.png")}>

                <img 

                  src="/assets/New folder/iPhone_13_mini 4.png" 

                  alt="iPhone 13 mini mockup 4"

                  className="w-full h-auto object-contain transition-transform duration-300 group-hover:scale-105"

                />

              </div>

            </div>

            <div className="mt-6 text-gray-400 text-sm italic">

              {layoutImagesText}

            </div>

          </div>

        )

      } else if (line.trim().startsWith('<div')) {

        // Handle HTML div tags for flex layouts

        if (line.includes('zenmoney')) {

          return (

            <div key={index} className="flex flex-row gap-4 justify-center items-center w-full my-4">

              <img 

                src="/assets/New folder/Competitive analysis/zenmoney 1.png" 

                alt="ZenMoney 1"

                className="w-1/3 h-64 object-contain"

              />

              <img 

                src="/assets/New folder/Competitive analysis/zenmoney 2.png" 

                alt="ZenMoney 2"

                className="w-1/3 h-64 object-contain"

              />

              <img 

                src="/assets/New folder/Competitive analysis/zenmoney 3.png" 

                alt="ZenMoney 3"

                className="w-1/3 h-64 object-contain"

              />

            </div>

          )

        }

        return null

      } else if (line.trim().startsWith('<div')) {

        // Handle HTML div tags - render as HTML

        return (

          <div key={index} dangerouslySetInnerHTML={{ __html: line }} />

        )

      } else if (line.trim().startsWith('<p')) {

        // Handle HTML p tags - render as HTML  

        return (

          <p key={index} dangerouslySetInnerHTML={{ __html: line }} />

        )

      } else if (line.trim().startsWith('<img ')) {

        // Handle HTML img tags

        const imgMatch = line.match(/<img src="([^"]+)"[^>]*>/);

        if (imgMatch) {

          const src = imgMatch[1];

          return (

            <div key={index} className="my-4">

              <img

                src={src}

                alt="Screenshot"

                className="w-full max-w-full h-auto rounded-lg object-contain transition-transform duration-300 hover:scale-105 bg-transparent"

                style={{ maxWidth: '90%', margin: '0 auto', display: 'block' }}

              />

            </div>

          )

        }

        return null

      } else if (line.startsWith('| ') && line.endsWith(' |')) {

        afterBullet = false

        // Table row

        if (!inTable) {

          inTable = true

          tableContent = []

        }

        const cells = line.split('|').filter(cell => cell.trim() !== '').map(cell => cell.trim())

        

        // Skip separator rows (---, ===, or rows with only dashes/equals)

        const isSeparator = cells.every(cell => cell.match(/^[-=]+$/))

        if (!isSeparator) {

          tableContent.push(cells)

        }

        

        return null // Don't render individual table rows

      } else if (line.startsWith('---') || line.startsWith('===')) {

        afterBullet = false

        // Table separator

        return null

      } else if (inTable && tableContent.length > 0) {

        afterBullet = false

        // Render table when we hit a non-table line after table content

        inTable = false

        const table = (

          <div key={index} className="overflow-x-auto mb-8">

            <table className="w-full border-collapse border border-cyan-800/30 rounded-lg text-xs">

              <thead>

                <tr className="bg-cyan-900/20">

                  {tableContent[0].map((cell, cellIndex) => (

                    <th key={cellIndex} className="border border-cyan-800/30 px-2 py-2 text-left text-cyan-100 font-semibold break-words max-w-[120px]">

                      {cell.replace(/\*\*/g, '')}

                    </th>

                  ))}

                </tr>

              </thead>

              <tbody>

                {tableContent.slice(1).map((row, rowIndex) => (

                  <tr key={rowIndex} className="hover:bg-cyan-900/10">

                    {row.map((cell, cellIndex) => (

                      <td key={cellIndex} className="border border-cyan-800/30 px-2 py-1 text-gray-200 break-words max-w-[120px]">

                        {cell.replace(/\*\*/g, '')}

                      </td>

                    ))}

                  </tr>

                ))}

              </tbody>

            </table>

          </div>

        )

        tableContent = []

        return table

      } else if (line.startsWith('• ')) {

        afterBullet = true

        return (

          <div key={index} className="flex items-start space-x-2 mb-2">

            <span className="text-cyan-400">•</span>

            <span className="text-gray-200">{line.replace('• ', '')}</span>

          </div>

        )

      } else if (line.startsWith('- ')) {

        afterBullet = true

        return (

          <div key={index} className="flex items-start space-x-2 mb-2">

            <span className="text-cyan-400">•</span>

            <span className="text-gray-200">{line.replace('- ', '')}</span>

          </div>

        )

      } else if (
        line.startsWith('Таким образом, рынок закрывает разные аспекты') ||
        line.startsWith('Thus, the market covers different aspects')
      ) {

        afterBullet = false

        return (

          <p key={index} className="text-gray-200 mb-3 mt-8 font-medium">

            {line}

          </p>

        )

      } else if (
        line.startsWith('Чтобы глубже понять рынок, я проанализировал конкретные продукты из этих категорий:') ||
        line.startsWith('To understand the market deeper, I analyzed specific products from these categories:')
      ) {

        afterBullet = false

        return (

          <p key={index} className="text-gray-200 mb-6 font-medium">

            {line}

          </p>

        )

      } else if (line.startsWith('• ')) {

        afterBullet = true

        return (

          <div key={index} className="flex items-start space-x-2 mb-2">

            <span className="text-cyan-400">•</span>

            <span className="text-gray-200">{line.replace('• ', '')}</span>

          </div>

        )

      } else if (line.startsWith('- ')) {

        afterBullet = true

        return (

          <div key={index} className="flex items-start space-x-2 mb-2">

            <span className="text-cyan-400">•</span>

            <span className="text-gray-200">{line.replace('- ', '')}</span>

          </div>

        )

      } else if (afterBullet && line.trim() !== '' && !line.startsWith('Также сделал разбор конкурентов')) {

        return (

          <p key={index} className="text-gray-200 mb-3 ml-4">

            {line}

          </p>

        )

      } else if (line.startsWith('Также сделал разбор конкурентов')) {

        afterBullet = false

        return (

          <p key={index} className="text-gray-200 mb-3 mt-6">

            {line}

          </p>

        )

      } else if (line.trim() === '') {

        return null // Skip empty lines to avoid extra spacing

      } else {

        afterBullet = false

        return (

          <p key={index} className="text-gray-200 mb-3">

            {line}

          </p>

        )

      }

    }).filter(Boolean) // Filter out null values

}
