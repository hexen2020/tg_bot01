class BotZaim {
  
    constructor(anketa)
    {
    this.anketa=anketa
    }

    think()
    {
        if (this.anketa.complete)
        {
            return {
                msg:"Вот какие займы сейчас можно вам предложить:",
                opts:{}
            }
        }
        else
        {
            return {
                msg:"Чтобы получить предложения займов, сначала заполните анкету",
                opts:{}
            }
        }
    }
}


module.exports = BotZaim;