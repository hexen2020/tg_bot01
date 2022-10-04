const TelegramBot = require('node-telegram-bot-api')
const botManager = require('./class/botManager')


const token = '5776133707:AAGmOcGr_D4tfIwfssqL8V1b68eXIgfDQuE'

const bot = new TelegramBot(token, { polling: true })



let users={}

this.step=0


bot.onText(/^\/start$/, function (msg) {
    const opts = {
        reply_markup: {
            resize_keyboard: true,
            one_time_keyboard: false,
            keyboard: [
                [
                  {
                    text: '🔎Подобрать займ',
                  }, {
                    text: '⭐Популярные предложения'
                  }
                ],
                [
                  {
                    text: '📝Заполнить анкету'
                  }
                ],
                [
                  {
                    text: '⁉Помощь'
                  }
                ]        
              ],
        }
    };

    bot.sendMessage(msg.chat.id, "Текст приветствия \n Очень большой текст приветствия", opts);
});

bot.on('message', (msg) => {
    const chatId = msg.chat.id
    const user_id=msg.from.id

    if (msg.text.includes('займ')) {
      
      if(this.step==4){
      bot.sendMessage(chatId, "Вот какие займы сейчас можно вам предложить: \n(будут позже)")

      }
      else {
        bot.sendMessage(chatId, "Чтобы получить предложения займов, сначала заполните анкету")
      }

    }
      

    if (msg.text.includes('предложения')) {
      bot.sendMessage(chatId, "⭐Популярные предложения", {
        reply_markup: {
          inline_keyboard: keyboard2}
      });
    }
    if (msg.text.includes('анкету')) {
      bot.sendMessage(chatId, "📝Запуск редактора профиля... \n Редактор профиля - модуль, позволяющий менять постоянные значения пользователя, которые бот использует для обеспечения правильной выдачи.\n \n Позволяет изменить:\n ❗Ваш возраст \n ❗Регион проживания \n ❗Кредитную историю", {
        reply_markup: {
          inline_keyboard: keyboard4}
      });
    }
    if (msg.text.includes('Помощь')) {
      bot.sendMessage(chatId, "Чем мы можем помочь?", {
        reply_markup: {
          inline_keyboard: keyboard3}
      });
    }




  })





// обработчик событий нажатий на клавиатуру
bot.on('callback_query', (query) => {
    const chatId = query.message.chat.id;



// обработка клавиатуры 3

if (query.data === 'k31') { 
  bot.sendMessage(chatId, "Ответ на вопрос 1");
}

if (query.data === 'k32') { 
  bot.sendMessage(chatId, "Ответ на вопрос 2");
}

if (query.data === 'k33') { 
  bot.sendMessage(chatId, "Ответ на вопрос 3");
}


// обработка клавиатуры 4

if (query.data === 'k41') { 
  bot.sendMessage(chatId, "#ВОПРОС (1/4) \n ❗Введите свой возраст \n \n -------------------- \n Вам должно быть больше 18 лет!");
  this.step=0

  this.step++
  console.log(this.step)


  bot.on('message', (msg) => {
    const chatId = msg.chat.id;
    const user_id=msg.from.id
    
    
    if (this.step==1) {
     
      if (msg.text>17) {
        console.log(this.step)
        bot.sendMessage(chatId, "#ВОПРОС (2/4) \n ❗Введите город своего проживания")
        this.step++
      }
      
    }

    if (this.step==2) {


      if (isNaN(msg.text)) {
        console.log(this.step)
        bot.sendMessage(chatId, "#ВОПРОС (3/4) \n ❗Введите количество активных займов и кредитов", {
          reply_markup: {
            inline_keyboard: keyboard5}
        });
      }
 
    }






  });
}
if (query.data === 'k42') { 
  bot.sendMessage(chatId, "Приветствие ещё раз", {
    reply_markup: {
        resize_keyboard: true,
        one_time_keyboard: false,
        keyboard: [
            [
              {
                text: '🔎Подобрать займ',
              }, {
                text: '⭐Популярные предложения'
              }
            ],
            [
              {
                text: '📝Заполнить анкету'
              }
            ],
            [
              {
                text: '⁉Помощь'
              }
            ]        
          ],
    }
  });
}


// обработка клавиатуры 5

if (query.data === 'k51') { 
  this.step=3
  console.log(this.step)
  bot.sendMessage(chatId, "#ВОПРОС (4/4) \n ❗Введите необходимую сумму и срок займа")
  
  bot.on('message', (msg) => {
    const chatId = msg.chat.id
    const user_id=msg.from.id
    
    
    if (this.step==3) {
     
      if (msg.text) {
        bot.sendMessage(chatId, "Все готово! \n✅Ваш профиль заполнен \nТеперь для вас доступен подбор займа")
        this.step++
        console.log(this.step)
      }
      
    }


  })
}

if (query.data === 'k52') { 
  this.step=3
  console.log(this.step)
  bot.sendMessage(chatId, "#ВОПРОС (4/4) \n ❗Введите необходимую сумму и срок займа")
  
  bot.on('message', (msg) => {
    const chatId = msg.chat.id
    const user_id=msg.from.id
    
    
    if (this.step==3) {
     
      if (msg.text) {
        bot.sendMessage(chatId, "Все готово! \n✅Ваш профиль заполнен \nТеперь для вас доступен подбор займа")
        this.step++
        console.log(this.step)
      }
      
    }


  })
}

if (query.data === 'k53') { 
  this.step=3
  console.log(this.step)
  bot.sendMessage(chatId, "#ВОПРОС (4/4) \n ❗Введите необходимую сумму и срок займа")
  
  bot.on('message', (msg) => {
    const chatId = msg.chat.id
    const user_id=msg.from.id
    
    
    if (this.step==3) {
     
      if (msg.text) {
        bot.sendMessage(chatId, "Все готово! \n✅Ваш профиль заполнен \nТеперь для вас доступен подбор займа")
        this.step++
        console.log(this.step)
      }
      
    }


  })
}

if (query.data === 'k54') { 
  this.step=3
  console.log(this.step)
  bot.sendMessage(chatId, "#ВОПРОС (4/4) \n ❗Введите необходимую сумму и срок займа")
  
  bot.on('message', (msg) => {
    const chatId = msg.chat.id
    const user_id=msg.from.id
    
    
    if (this.step==3) {
     
      if (msg.text) {
        bot.sendMessage(chatId, "Все готово! \n✅Ваш профиль заполнен \nТеперь для вас доступен подбор займа")
        this.step++
        console.log(this.step)
      }
      
    }


  })
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
      callback_data: 'k23'
    }
],
  [
    {
      text: 'На Yandex.Деньги',
      callback_data: 'k24'
    }
],
[
  {
    text: 'Наличными через Контакт',
    callback_data: 'k25'
  }
],
[
  {
    text: 'Все варианты',
    callback_data: 'k26'
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
      callback_data: 'k33'
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

     //конфиг клавиатуры
  const keyboard5 = [
    [
      {
        text: '0', 
        callback_data: 'k51' 
      }
    ],
    [
        {
          text: '1-5',
          callback_data: 'k52'
        }
    ],
    [
      {
        text: '6-10',
        callback_data: 'k53'
      }
  ],
  [
    {
      text: '10 и более',
      callback_data: 'k54'
    }
],
   ];