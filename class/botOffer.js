class BotOffer {
  
    constructor(anketa,connection)
    {
        this.anketa=anketa
        this.step=0
        this.users_data1={}
        this.offerbegin=false
        this.offercomplete=false

        this.connection=connection
        let _this=this

    
        this.base=global.requests.base3

    }

   
    think(message)
    {
        this.offerbegin=true
        this.offercomplete=false

        
        if (message=="Ещё варианты") {
            this.step+=1

        }
        if (message=="Назад") {
            this.step=0
            this.offerbegin=false
            this.offercomplete=true
        }



        if (this.step>this.base.length-1){
            this.step=0

        }
        if (this.step<0){
            this.step=0
        }

        let my_step=this.base[this.step]


        if (this.offercomplete) {
            return {
                msg:"<i>Вы можете снова воспользоваться подбором займа в любое время!</i>",
                opts:{"parse_mode": "html"}
              }  
        }

        else {
        return {
            msg:my_step.description,
            opts:{
                "reply_markup": {
                  "inline_keyboard":  [
                      [
                          {
                            text: 'Получить деньги',
                            url: my_step.link
                          }
                      ],
                      [
                          {
                            text: 'Ещё варианты',
                            callback_data: 'Ещё варианты'
                          }
                      ],
                      [
                        {
                          text: 'Назад',
                          callback_data: 'Назад'
                        }
                    ],
                  ]
                },
                "parse_mode": "html"
              }
          }  
        }  
    }



}
module.exports = BotOffer;