class BotZaim {
  
    constructor(anketa,connection)
    {
        this.anketa=anketa
        this.selectstep=0
        this.users_data={}
        this.selectbegin=false
        this.selectcomplete=false

        this.connection=connection
        let _this=this



        this.connection.query("SELECT * FROM selection", function(err, selresults) {
          selresults.forEach((item)=>{
            item.anketaopts=JSON.parse(item.anketaopts)
            _this.base.push(item)


          })
        })



        this.base=[]
    }


    init(users_data,client_id)
    {
      this.client_id=client_id
      this.users_data=users_data
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


        this.connection.query("INSERT INTO selection_data (client_id,question_id,answer) VALUE ('"+this.client_id+"','"+last_selectstep.id+"','"+message+"')", function(err, data) {
          console.log(err)
          console.log(data)
        })


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