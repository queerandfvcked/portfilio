const fs = require('fs');
const { createCanvas } = require('canvas');

// Создаем canvas 32x32
const canvas = createCanvas(32, 32);
const ctx = canvas.getContext('2d');

// Рисуем фон
ctx.fillStyle = '#0891b2'; // Темно-cyan цвет
ctx.fillRect(0, 0, 32, 32);

// Рисуем буквы "AS"
ctx.fillStyle = '#ffffff';
ctx.font = 'bold 16px Arial';
ctx.textAlign = 'center';
ctx.textBaseline = 'middle';
ctx.fillText('AS', 16, 16);

// Сохраняем как PNG
const buffer = canvas.toBuffer('image/png');
fs.writeFileSync('public/favicon.png', buffer);

console.log('Favicon PNG создан!');
