class BotAnketa {
  
    constructor()
    {
        this.step=0
        this.users_data={}
        this.begin=false
        this.complete=false
        this.base=[
            {
                question:"#ВОПРОС (1/5) \n ❗Введите свой возраст \n \n -------------------- \n Вам должно быть больше 18 лет!",
                anketaopts:{},
                type:"age",
                error:"Вам должно быть больше 18 лет!"
            },
            {
                question:"#ВОПРОС (2/5) \n ❗Введите город своего проживания",
                anketaopts:{},
                type:"string",
                error:"Город введен некорректно"
            },
            {
              question:"#ВОПРОС (3/5) \n ❗Введите количество активных займов и кредитов",
              anketaopts:{
                reply_markup: {
                    inline_keyboard: [
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
                     ]}
            },
            type:"amount",
            error:"Необходимо выбрать один вариант из предложенных"
            },
            {
              question:"#ВОПРОС (4/5) \n ❗Введите необходимую сумму займа в рублях",
              anketaopts:{},
              type:"sum",
              error:"Сумма введена некорректно"
          },
          {
            question:"#ВОПРОС (5/5) \n ❗Введите необходимый срок займа в месяцах",
            anketaopts:{},
            type:"term",
            error:"Срок введен некорректно"
        },
            {
                question:"Все готово! \n✅Ваш профиль заполнен \nТеперь для вас доступен подбор займа",
                type:"null"
            }
        ]
    }

    think(message)
    {
      this.begin=true
      if (this.step>0)
      {
        let last_step=this.base[this.step-1]
        if (!this.verify(message,last_step.type))
        {
            return {
                msg:last_step.error,
                opts:{}
              }
        }
        this.users_data[last_step.question]=message
        console.log(this.users_data)
      }
      let my_step=this.base[this.step]
      this.step++
      if (this.step>this.base.length-1)
      {
        this.begin=false
        this.complete=true
        this.step=0
      }
      return {
        msg:my_step.question,
        opts:my_step.anketaopts
      }
    }

    verify(message,type)
    {
       if (type=="string") 
       {
        if (message.length>2)
        {
            return true
        }
       }
       if (type=="age") 
       {
        if (message>17)
        {
            return true
        }
       }
       if (type=="amount") 
       {
        if (message=="k51" || message=="k52" || message=="k53" || message=="k54")
        {
            return true
        }
       }
       if (type=="sum") 
       {
        if (message>500)
        {
            return true
        }
       }
       if (type=="term") 
       {
        if (message>0)
        {
            return true
        }
       }
       return false
    }

}

module.exports = BotAnketa;