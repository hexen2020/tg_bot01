const TelegramBot = require('node-telegram-bot-api')

const token = '5776133707:AAGmOcGr_D4tfIwfssqL8V1b68eXIgfDQuE'

const bot = new TelegramBot(token, { polling: true })


//конфиг клавиатуры
const keyboard1 = [
    [
      {
        text: '📝Заполнить анкету', // текст на кнопке
        callback_data: 'k11' // данные для обработчика событий
      }
    ],
    [
        {
          text: '🔎Подобрать займ',
          callback_data: 'k12'
        }
    ],
    [
      {
        text: '⭐Популярные предложения',
        callback_data: 'k13'
      }
  ],
    [
        {
          text: '⁉Помощь',
          callback_data: 'k14'
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

// обработка клавиатуры 1
    if (query.data === 'k11') { 
      bot.sendMessage(chatId, "📝Запуск редактора профиля... \n Редактор профиля - модуль, позволяющий менять постоянные значения пользователя, которые бот использует для обеспечения правильной выдачи.\n \n Позволяет изменить:\n ❗Ваш возраст \n ❗Регион проживания \n ❗Кредитную историю", {
        reply_markup: {
          inline_keyboard: keyboard4}
      });
  }

    if (query.data === 'k12') { 
        bot.sendMessage(chatId, "сначала сдалать анкету, потом эту кнопку");
    }
    if (query.data === 'k13') { 
      bot.sendMessage(chatId, "⭐Популярные предложения", {
        reply_markup: {
          inline_keyboard: keyboard2}
      });
  }
  if (query.data === 'k14') { 
    bot.sendMessage(chatId, "Чем мы можем помочь?", {
      reply_markup: {
        inline_keyboard: keyboard3}
    }); 
}

// обработка клавиатуры 4

if (query.data === 'k41') { 
  bot.sendMessage(chatId, "Тут будут вопросы по анкете");
}
if (query.data === 'k42') { 
  bot.sendMessage(chatId, "Приветствие ещё раз", {
    reply_markup: {
      inline_keyboard: keyboard1}
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

  //конфиг клавиатуры
  const keyboard4 = [
    [
      {
        text: '✅Запустить', // текст на кнопке
        callback_data: 'k41' // данные для обработчика событий
      }
    ],
    [
        {
          text: 'Вернуться в начало',
          callback_data: 'k42'
        }
    ],
   ];