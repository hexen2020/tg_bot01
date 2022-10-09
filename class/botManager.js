const botAnketa = require('./botAnketa')
const botZaim = require('./botZaim')

class BotManager {

    constructor(){
     this.name="noname"
     this.anketa=new botAnketa()
     this.zaim=new botZaim(this.anketa)
     this.base=[   
        {
          message:"займ",
          logic: this.zaim
        },
        {
            message:"/start",
            result:{
                msg:"Текст приветствия",
                opts:{
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
                }
            }
        },
        {
            message:"Помощь",
            result:{
                msg:"Чем мы можем помочь?",
                opts:{
                    reply_markup: {
                        inline_keyboard: [
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
                           ]}
                }
            }
        },
        {
          message:"анкету",
          result:{
              msg:"📝Запуск редактора профиля... \n Редактор профиля - модуль, позволяющий менять постоянные значения пользователя, которые бот использует для обеспечения правильной выдачи.\n \n Позволяет изменить:\n ❗Ваш возраст \n ❗Регион проживания \n ❗Кредитную историю",
              opts:{
                  reply_markup: {
                      inline_keyboard: [
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
                         ]}
              }
          }
      },
      {
        message:"k41",
        logic: this.anketa
    },
    {
        message:"k42",
        result:{
            msg:"Текст приветствия ещё раз",
            opts:{}
        }
    },
        {
            message:"k31",
            result:{
                msg:"Ответ на первый вопрос",
                opts:{}
            }
        },
        {
            message:"k32",
            result:{
                msg:"Ответ на второй вопрос",
                opts:{}
            }
        },
        {
            message:"k33",
            result:{
                msg:"Ответ на третий вопрос",
                opts:{}
            }
        },
        {
          message:"предложения",
          result:{
              msg:"⭐Популярные предложения",
              opts:{
                  reply_markup: {
                      inline_keyboard: [
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
                         ]}
              }
          }
      },
      {
          message:"k21",
          result:{
              msg:"Популярные предложения №1",
              opts:{}
          }
      },
      {
          message:"k22",
          result:{
              msg:"Популярные предложения №2",
              opts:{}
          }
      },
      {
          message:"k23",
          result:{
              msg:"Популярные предложения №3",
              opts:{}
          }
      },
      {
        message:"k24",
        result:{
            msg:"Популярные предложения №4",
            opts:{}
        }
    },
    {
      message:"k25",
      result:{
          msg:"Популярные предложения №5",
          opts:{}
      }
  },
  {
    message:"k26",
    result:{
        msg:"Популярные предложения №6",
        opts:{}
    }
},
     ]
    }  
    think(message)
    {
        let result=false
        if (this.anketa.begin)
        {
           return this.anketa.think(message)
        }
        this.base.forEach((item)=>{
            if (message.includes(item.message))
            {
                if (item.logic)
                {
                  result=item.logic.think(message)
                }else
                {
                    result=item.result
                }
                
            }
        })
        if (!result)
        {
          return {
            msg:"Не понимать",
            opts:{}
          }
        }
       return result
    }
}
module.exports = BotManager;