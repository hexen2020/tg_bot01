const TelegramBot = require('node-telegram-bot-api')

const token = '5776133707:AAGmOcGr_D4tfIwfssqL8V1b68eXIgfDQuE'

const bot = new TelegramBot(token, { polling: true })


//конфиг клавиатуры
const keyboard1 = [
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
          callback_data: 'more4'
        }
      ]
  ];

// обработчик события присылания нам любого сообщения
bot.on('message', (msg) => {
  const chatId = msg.chat.id; //получаем идентификатор диалога, чтобы отвечать именно тому пользователю, который нам что-то прислал

  // отправляем сообщение
  bot.sendMessage(chatId, 'Текст приветствия', { // прикрутим клаву
        reply_markup: {
            inline_keyboard: keyboard1
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
      bot.sendMessage(chatId, "⭐Популярные предложения", {
        reply_markup: {
          inline_keyboard: keyboard2}
      });
  }
  if (query.data === 'more4') { 
    bot.sendMessage(chatId, "Чем мы можем помочь?", {
      reply_markup: {
        inline_keyboard: keyboard3}
    });
}
  });

  //конфиг клавиатуры
const keyboard2 = [
  [
    {
      text: 'Под 0%', // текст на кнопке
      callback_data: 'k21' // данные для обработчика событий
    }
  ],
  [
      {
        text: 'С плохой кредитной историей',
        callback_data: 'k22'
      }
  ],
  [
    {
      text: 'На QIWI',
      callback_data: 'к23'
    }
],
  [
    {
      text: 'На Yandex.Деньги',
      callback_data: 'к24'
    }
],
[
  {
    text: 'Наличными через Контакт',
    callback_data: 'к25'
  }
],
[
  {
    text: 'Все варианты',
    callback_data: 'к26'
  }
],
];

 //конфиг клавиатуры
 const keyboard3 = [
  [
    {
      text: 'Как подобрать выгодный займ?', // текст на кнопке
      callback_data: 'k31' // данные для обработчика событий
    }
  ],
  [
      {
        text: 'Как выбрать займ в популярных предложениях?',
        callback_data: 'k32'
      }
  ],
  [
    {
      text: 'Как сменить страну или возраст?',
      callback_data: 'к33'
    }
]
 ];