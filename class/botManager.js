const botAnketa = require('./botAnketa')
const botProfile = require('./botProfile')
const botZaim = require('./botZaim')

class BotManager {

    constructor(){
     this.name="noname"
     this.anketa=new botAnketa()
     this.profile=new botProfile(this.anketa)
     this.zaim=new botZaim(this.anketa)
     this.base=[   
        {
          message:"займ",
          logic: this.zaim
        },
        {
            message:"/start",
            result:{
                msg:"<i>Для получения полного списка предложений и наилучшей выдачи результатов, необходимо заполнить профиль, нажав кнопку - <b>Заполнить профиль.</b> \nВНИМАНИЕ! У Вас еще не заполнен профиль — Вам доступны не все предложения.</i>",
                opts:{
                  reply_markup: {
                    inline_keyboard: [
                        [
                            {
                              text: 'Заполнить профиль',
                              callback_data: 'k11'
                            }
                        ],
                       ]},
                    parse_mode: 'html'
                },
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
                                  text: 'Как изменить страну, возраст или кредитную историю?',
                                  callback_data: 'k32'
                                }
                            ],
                            [
                              {
                                text: 'Как выбрать займ в популярных предложениях?',
                                callback_data: 'k33'
                              }
                          ]
                           ]}
                }
            }
        },
        {
          message:"Профиль",
          logic: this.profile
      },
      {
        message:"k11",
        logic: this.anketa
    },
      {
        message:"k41",
        logic: this.anketa
    },
    {
        message:"k42",
        logic: this.profile
    },
        {
            message:"k31",
            result:{
                msg:"<i>Как подобрать выгодный займ? \n1. Нажмите кнопку Подобрать займ. \n2. Выберите СУММУ займа. \n3. Выбери СРОК займа. \n4. Выберите процентную ставку по займу. Под 0% или под обычный процент. \n 5. Далее выбирайте МФО с помощью кнопок Назад и Еще варианты. Чтобы получить займ нажмите Получить деньги и заполните заявку.</i>",
                opts:{
                  reply_markup: {
                    inline_keyboard: [
                        [
                            {
                              text: 'Назад',
                              callback_data: 'k42'
                            }
                        ],
                       ]},
                  parse_mode: 'html'
                }
            }
        },
        {
            message:"k32",
            result:{
                msg:"<i>Как изменить страну, возраст или кредитную историю? \n1. Нажмите кнопку Профиль и вы увидите страну, возраст, кредитную историю, которые вы выбрали ранее. \n2. Если вы хотите изменить страну, возраст или кредитную историю, нажмите кнопку Изменить. \n3. Выберите нужные варианты.</i>",
                opts:{
                  reply_markup: {
                    inline_keyboard: [
                        [
                            {
                              text: 'Назад',
                              callback_data: 'k42'
                            }
                        ],
                       ]},
                  parse_mode: 'html'
                }
            }
        },
        {
            message:"k33",
            result:{
                msg:"<i>Как выбрать займ? \n1. Нажмите кнопку Популярные предложения. \n2. Выберите более подходящую для вас подборку нажатием кнопки. \n 3. Далее выбирайте МФО с помощью кнопок Назад и Еще варианты. Чтобы получить займ нажмите Получить деньги и заполните заявку.</i>",
                opts:{
                  reply_markup: {
                    inline_keyboard: [
                        [
                            {
                              text: 'Назад',
                              callback_data: 'k42'
                            }
                        ],
                       ]},
                  parse_mode: 'html'
                }
            }
        },
        {
          message:"предложения",
          result:{
              msg:"⭐Популярные предложения \n Тут будет список лучших предложений",
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
        if (this.zaim.selectbegin)
        {
           return this.zaim.think(message)
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
            msg:"Ошибка, попробуйте ещё раз",
            opts:{}
          }
        }
       return result
    }
}
module.exports = BotManager;