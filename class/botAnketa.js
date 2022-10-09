class BotAnketa {
  
    constructor()
    {
        this.step=0
        this.users_data={}
        this.begin=false
        this.complete=false
        this.base=[
            {
                question:"❗Введите свой возраст \n \n -------------------- \n Вам должно быть больше 18 лет!",
                type:"age",
                error:"Вы малолетка"
            },
            {
                question:"❗Введите город своего проживания",
                type:"string",
                error:"Это не город"
            },
            {
                question:"Анкета заполнена",
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
        opts:{}
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
       return false
    }

}

module.exports = BotAnketa;