class BotZaim {
  
    constructor(anketa)
    {
        this.anketa=anketa
        this.selectstep=0
        this.users_data={}
        this.selectbegin=false
        this.selectcomplete=false
        this.base=[
            {
                question:"<b>Выберите сумму займа:</b>",
                anketaopts:{
                    reply_markup: {
                        inline_keyboard: [
                          [
                            {
                              text: 'До 10 000 руб', 
                              callback_data: 'k71' 
                            }
                          ],
                          [
                              {
                                text: 'От 10 000 до 20 000 руб',
                                callback_data: 'k72'
                              }
                          ],
                          [
                            {
                              text: 'От 20 000 до 30 000 руб',
                              callback_data: 'k73'
                            }
                        ],
                        [
                            {
                              text: 'Более 30 000 руб',
                              callback_data: 'k74'
                            }
                        ],
                         ]},
                         parse_mode: 'html'
                },
                type:"sum",
                error:"Необходимо выбрать один вариант из предложенных"
            },
            {
                question:"<b>Выберите срок займа:</b>",
                anketaopts:{
                    reply_markup: {
                        inline_keyboard: [
                          [
                            {
                              text: 'До 10 дней', 
                              callback_data: 'k81' 
                            }
                          ],
                          [
                              {
                                text: 'От 10 до 20 дней',
                                callback_data: 'k82'
                              }
                          ],
                          [
                            {
                              text: 'От 20 до 30 дней',
                              callback_data: 'k83'
                            }
                        ],
                        [
                            {
                              text: 'Более 30 дней',
                              callback_data: 'k84'
                            }
                        ],
                         ]},
                         parse_mode: 'html'
                },
                type:"term",
                error:"Необходимо выбрать один вариант из предложенных"
            },
            {
              question:"<b>Выберите процентную ставку по займу:</b>",
              anketaopts:{
                reply_markup: {
                    inline_keyboard: [
                      [
                        {
                          text: 'Займы под 0%', 
                          callback_data: 'k91' 
                        }
                      ],
                      [
                          {
                            text: 'Займы под обычный процент',
                            callback_data: 'k92'
                          }
                      ],
                     ]},
                     parse_mode: 'html'
            },
            type:"rate",
            error:"Необходимо выбрать один вариант из предложенных"
            },
            {
                question:"<i>На данный момент мы можем предложить Вам следующие займы:</i>",
                anketaopts:{parse_mode: 'html'},
                type:"null"
            }
        ]
    }
    think(message)
    {
        if (this.anketa.complete)
      {this.selectbegin=true
      if (this.selectstep>0)
      {
        let last_selectstep=this.base[this.selectstep-1]
        if (!this.verify(message,last_selectstep.type))
        {
            return {
                msg:last_selectstep.error,
                opts:{}
              }
        }
        this.users_data[last_selectstep.question]=message
        console.log(this.users_data)
      }
      let my_selectstep=this.base[this.selectstep]
      this.selectstep++
      if (this.selectstep>this.base.length-1)
      {
        this.selectbegin=false
        this.selectcomplete=true
        this.selectstep=0
      }
      return {
        msg:my_selectstep.question,
        opts:my_selectstep.anketaopts
      }}
      else {
        return {
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
            }
        }
      }
    }
    verify(message,type)
    {
       if (type=="sum") 
       {
        if (message=="k71" || message=="k72"|| message=="k73"|| message=="k74")
        {
            return true
        }
       }
       if (type=="term") 
       {
        if (message=="k81" || message=="k82"|| message=="k83"|| message=="k84")
        {
            return true
        }
       }
       if (type=="rate") 
       {
        if (message=="k91" || message=="k92")
        {
            return true
        }
       }
       return false
    }
}
module.exports = BotZaim;