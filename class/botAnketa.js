class BotAnketa {
  
    constructor()
    {
        this.step=0
        this.users_data={}
        this.begin=false
        this.complete=false
        this.base=[
            {
                question:"<i>Вопрос 1/4 \nВведите свой возраст (бот реагирует только на числа от 18):</i>",
                anketaopts:{parse_mode: 'html'},
                type:"age",
                error:"Вам должно быть больше 18 лет!"
            },
            {
                question:"<i>Вопрос 2/4 \nВыберите регион Вашего проживания:</i>",
                anketaopts:{parse_mode: 'html'},
                type:"string",
                error:"Регион введен некорректно"
            },
            {
              question:"<i>Вопрос 3/4 \nКакая у вас кредитная история? \n\n<b>Хорошая кредитная история</b> - выберите этот вариант, если за последний месяц у вас не было просрочек по платежам, нет или мало активных кредитов (займов) и количество отказов по кредитам (займам) минимально. \n<b>Плохая кредитная история</b> - выберите этот вариант, если у вас были просрочки по займам (кредитам) за последнее время, есть несколько активных задолженностей, большое количество отказов. \n\n(Сейчас бот реагирует только на кнопки под этим сообщением)</i>",
              anketaopts:{
                reply_markup: {
                    inline_keyboard: [
                      [
                        {
                          text: 'Положительная', 
                          callback_data: 'k51' 
                        }
                      ],
                      [
                          {
                            text: 'Отрицательная',
                            callback_data: 'k52'
                          }
                      ],
                     ]},
                     parse_mode: 'html'
            },
            type:"history",
            error:"Необходимо выбрать один вариант из предложенных"
            },
            {
              question:"<i>Вопрос 4/4 \n Количество активных займов более 5?</i>",
              anketaopts:{
                reply_markup: {
                  inline_keyboard: [
                    [
                      {
                        text: 'ДА', 
                        callback_data: 'k61' 
                      }
                    ],
                    [
                        {
                          text: 'НЕТ',
                          callback_data: 'k62'
                        }
                    ],
                   ]},
                   parse_mode: 'html'
              },
              type:"amount",
              error:"Необходимо выбрать один вариант из предложенных"
          },
            {
                question:"<i>Спасибо, Ваши данные успешно сохранены.</i>",
                anketaopts:{parse_mode: 'html'},
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
       if (type=="history") 
       {
        if (message=="k51" || message=="k52")
        {
            return true
        }
       }
       if (type=="amount") 
       {
        if (message=="k61" || message=="k62")
        {
            return true
        }
       }
       return false
    }
}
module.exports = BotAnketa;