class BotOffer {
  
    constructor(anketa,zaim,connection)
    {
        this.anketa=anketa
        this.zaim=zaim
        this.step=0
        this.offerbegin=false
        this.offercomplete=false

        this.connection=connection
        let _this=this

        this.base=[]
        //this.base=global.requests.base3

    }
     
    generate_podbor()
    {
    this.base=[]
   // console.log(global.requests.base3)
   // console.log(this.anketa.users_data)
  //console.log(this.zaim.users_data)
    let _this=this
    global.requests.base3.forEach((offer)=>{
     let opts=offer.jsonopts
     let offer_check=false

     opts.forEach((option)=>{
      let find_anketa=false
      for (let key in _this.anketa.users_data)
      {
        if (key.toLowerCase()==option.question.toLowerCase())
        {
         // console.log("Условие оффера",option.question)
         // console.log("Ответ в анкете",this.anketa.users_data[key])
          find_anketa=this.anketa.users_data[key]
        }
      }

      for (let key in _this.zaim.users_data)
      {
        if (key.toLowerCase()==option.question.toLowerCase())
        {
         // console.log("Условие оффера",option.question)
         // console.log("Ответ в анкете",this.anketa.users_data[key])
          find_anketa=this.zaim.users_data[key]
        }
      }
      
      if (find_anketa)
      {
        if (option.type=="number")
        {
          if (option.max>=find_anketa && option.min<=find_anketa)
          {
            offer_check=true
           
          }
        }


        if (option.type=="string")
        {
          if (find_anketa.toLowerCase().indexOf(option.string.toLowerCase())>-1 || option.string.toLowerCase().indexOf(find_anketa.toLowerCase())>-1 )
          {
            offer_check=true
          }
        }

        if (option.type=="location")
        {
          if (find_anketa.toLowerCase().indexOf(option.geo.toLowerCase())>-1 || option.geo.toLowerCase().indexOf(find_anketa.toLowerCase())>-1 )
          {
            
          }
          else {
            offer_check=true
          }

        }

      }

     })
     
     if (offer_check){
      _this.base.push(offer)
     }

    })

    }

   
    think(message)
    {
        if (!this.offerbegin)
        {
          this.generate_podbor()
        }

        if (this.base.length<1)
        {
          return [{
            msg:"<i>К сожалению, для вас пока нет доступных займов, попробуйте подобрать снова позднее!</i>",
            opts:{"parse_mode": "html"}
          } ]
        }

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
            return [{
                msg:"<i>Вы можете снова воспользоваться подбором займа в любое время!</i>",
                opts:{"parse_mode": "html"}
              } ] 
        }

        else {
        return [{
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
          }]  
        }  
    }



}
module.exports = BotOffer;