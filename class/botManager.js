const botAnketa = require('./botAnketa')
const botProfile = require('./botProfile')
const botZaim = require('./botZaim')
const botOffer = require('./botOffer')
const botStart = require('./botStart')
const botTop = require('./botTop')



class BotManager {

    constructor(connection,user_id,first_name,last_name){
    this.connection=connection
    this.user_id=user_id
    this.first_name=first_name
    this.last_name=last_name
    let _this=this
    this.anketa=new botAnketa(connection)
    this.profile=new botProfile(this.anketa)
    this.zaim=new botZaim(this.anketa,connection)
    this.offer=new botOffer(this.anketa,this.zaim,connection)
    this.start=new botStart()
    this.top=new botTop()



    function connectbase(user_id) {
      _this.connection.query("SELECT question_id,question,answer,question_small FROM clients_data LEFT JOIN questions ON questions.id=clients_data.question_id WHERE client_id='"+user_id+"'", function(err, anketa) {
        let users_data={}
        
        anketa.forEach((item)=>{
          users_data[item.question_small]=item.answer
        })
        _this.anketa.init(users_data,user_id)
      })

      _this.connection.query("SELECT question_id,question,answer,question_small FROM selection_data LEFT JOIN questions ON questions.id=selection_data.question_id WHERE client_id='"+user_id+"'", function(err, anketa1) {
        let users_data1={}
        anketa1.forEach((item)=>{
          users_data1[item.question_small]=item.answer
        })
        _this.zaim.init(users_data1,user_id)
        
      })
    }



    connection.query("SELECT * FROM clients WHERE chatid="+user_id, function(err, results) {
      if (results.length>0)
      {
        connectbase(results[0]['id'])
      }
      else
      {
        connection.query("INSERT INTO clients (chatid,name,lastname) VALUES ('"+user_id+"','"+first_name+"','"+last_name+"')", function(err, results) {
          
        })
        connection.query("SELECT * FROM clients WHERE chatid="+user_id, function(err, results) {
          connectbase(results[0]['id'])
      });
      }
  });
     this.base=[   
        {
          message:"займ",
          logic: this.zaim
        },
        {
            message:"/start",
            logic: this.start
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
        message:"Заполнить профиль",
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
          logic: this.top
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
           result=[]
           this.zaim.think(message).forEach((msg)=>
           {
           result.push(msg)
           })

           if (!this.zaim.selectbegin)
           {
            this.offer.think(message).forEach((msg)=>
            {
            result.push(msg)
            })
           }
           return result
        }
        if (this.offer.offerbegin)
        {
           return this.offer.think(message)
        }
        
        this.base.forEach((item)=>{
            if (message.includes(item.message))
            {
                if (item.logic)
                {
                  result=item.logic.think(message)
                }else
                {
                    result=[item.result]
                }
                
            }
        })
        if (!result)
        {
          return [{
            msg:"Ошибка, попробуйте ещё раз",
            opts:{}
          }]
        }
       return result
    }
}
module.exports = BotManager;