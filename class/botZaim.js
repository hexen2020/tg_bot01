class BotZaim {
  
    constructor(anketa,connection)
    {
        this.anketa=anketa
        this.selectstep=0
        this.users_data1={}
        this.selectbegin=false
        this.selectcomplete=false

        this.connection=connection
        let _this=this

    
        this.base=global.requests.base2
    }


    init(users_data1,client_id)
    {
      this.client_id=client_id
      this.users_data1=users_data1
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
        this.users_data1[last_selectstep.question]=message


        this.connection.query("INSERT INTO selection_data (client_id,question_id,answer) VALUE ('"+this.client_id+"','"+last_selectstep.id+"','"+message+"')ON DUPLICATE KEY UPDATE answer='"+message+"'", function(err, data) {
        })



      }
      let my_selectstep=this.base[this.selectstep]
      this.selectstep++
      if (this.selectstep>this.base.length-1)
      {
        this.selectbegin=false
        this.selectcomplete=true
        this.selectstep=0
      }
      if(my_selectstep.anketaopts.length>0)
      {return {
        msg:my_selectstep.question,
        opts:{
          "reply_markup": {
            "inline_keyboard":  my_selectstep.anketaopts.map((n) => [n])
          },
          "parse_mode": "html"
        }
      }
    }
    else {
      return {
        msg:my_selectstep.question,
        opts:{"parse_mode": "html"}
      }

    }
    }
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
        if (message=="До 10 000 руб" || message=="От 10 000 до 20 000 руб"|| message=="От 20 000 до 30 000 руб"|| message=="Более 30 000 руб")
        {
            return true
        }
       }
       if (type=="term") 
       {
        if (message=="До 10 дней" || message=="От 10 до 20 дней"|| message=="От 20 до 30 дней"|| message=="Более 30 дней")
        {
            return true
        }
       }
       if (type=="rate") 
       {
        if (message=="Под 0" || message=="Под обычный процент")
        {
            return true
        }
       }
       return false
    }
}
module.exports = BotZaim;