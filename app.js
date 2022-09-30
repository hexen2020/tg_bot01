const TelegramBot = require('node-telegram-bot-api')

const token = '5776133707:AAGmOcGr_D4tfIwfssqL8V1b68eXIgfDQuE'

const bot = new TelegramBot(token, { polling: true })


//конфиг клавиатуры
const keyboard = [
    [
      {
        text: '📝Заполнить анкету', // текст на кнопке
        callback_data: 'more1' // данные для обработчика событий
      }
    ],
    [
        {
          text: '🔎Подобрать займ',
          callback_data: 'more2'
        }
    ],
    [
      {
        text: '⭐Популярные предложения',
        callback_data: 'more3'
      }
  ],
    [
        {
          text: '⁉Помощь',
          url: 'https://htmlacademy.ru/blog/js/telegram-bot' //внешняя ссылка
        }
      ]
  ];

// обработчик события присылания нам любого сообщения
bot.on('message', (msg) => {
  const chatId = msg.chat.id; //получаем идентификатор диалога, чтобы отвечать именно тому пользователю, который нам что-то прислал

  // отправляем сообщение
  bot.sendMessage(chatId, 'Текст приветствия', { // прикрутим клаву
        reply_markup: {
            inline_keyboard: keyboard
        }
    });
});

// обработчик событий нажатий на клавиатуру
bot.on('callback_query', (query) => {
    const chatId = query.message.chat.id;


    if (query.data === 'more1') { 
        bot.sendMessage(chatId, "Ответ 1");
    }

    if (query.data === 'more2') { 
        bot.sendMessage(chatId, "Ответ 2");
    }
    if (query.data === 'more3') { 
      bot.sendMessage(chatId, "Ответ 3");
  }
  });