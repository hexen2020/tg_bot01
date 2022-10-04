class BotManager {

    constructor(){
     this.name="noname"
     this.step=0
     console.log("imCreate")
    }
    message(text)
    {
        if (this.step==0)
        {
            this.name=text
            this.step++
        }
        
    }
    think()
    {
        if (this.step==0)
        {
         return "Окай "+this.name
        }
        if (this.step==1)
        {
         return "Твой город "+this.name+"?"
        }
    }

}

module.exports = BotManager;