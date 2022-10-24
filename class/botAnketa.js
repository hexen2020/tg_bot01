
class BotAnketa {
  
    constructor(connection)
    {
        this.step=0
        this.connection=connection
        this.begin=false
        this.complete=false
        let _this=this

        this.users_data={}
        this.base=global.requests.base1
    }

    init(users_data,client_id)
    {
      this.client_id=client_id
      this.users_data=users_data
    }
    think(message)
    {

      this.begin=true
      if (this.step>0)
      {
        let last_step=this.base[this.step-1]
        let verify_result=this.verify(message,last_step.type)
        if (!verify_result)
        {
            return [{
                msg:last_step.error,
                opts:{}
              }]
        }
        if (last_step.type=="region") {message=verify_result}
        this.users_data[last_step.question_small]=message


        this.connection.query("INSERT INTO clients_data (client_id,question_id,answer) VALUE ('"+this.client_id+"','"+last_step.id+"','"+message+"') ON DUPLICATE KEY UPDATE answer='"+message+"'", function(err, data) {
        })



      }
      let my_step=this.base[this.step]
      this.step++
      if (this.step>this.base.length-1)
      {
        this.begin=false
        this.complete=true
        this.step=0
      }
 
 
      if(my_step.anketaopts.length>0)
      {return [{
        msg:my_step.question,
        opts:{
          "reply_markup": {
            "inline_keyboard":  my_step.anketaopts.map((n) => [n])
          },
          "parse_mode": "html"
        }
      }]
    }
    else {
      return [{
        msg:my_step.question,
        opts:{"parse_mode": "html"}
      }]

    }
  }

    verify(message,type)
    {
      let verify=false


       if (type=="region") 
       {
        global.requests.baseregions.forEach((item)=>{
         
   
        if (message.toLowerCase().indexOf(item.name.toLowerCase())>-1 || item.name.toLowerCase().indexOf(message.toLowerCase())>-1)
        { 

          verify=item.name

        }
        })
       }



       if (type=="age") 
       {
        if (message>17)
        {
          verify=true
        }
       }
       if (type=="history") 
       {
        if (message=="Положительная" || message=="Отрицательная")
        {
          verify=true
        }
       }
       if (type=="amount") 
       {
        if (message=="Да" || message=="Нет")
        {
          verify=true
        }
       }
       return verify
      }
}
module.exports = BotAnketa;