class BotStart {
  
    constructor()
    {
        this.base4=global.requests.base4

    }

    think()
    {


        return [{
        msg:this.base4[0].msg,
        opts:{
          "reply_markup": {
            "inline_keyboard":  this.base4[0].opts.map((n) => [n])
          },
          "parse_mode": "html"
        }
      }]
    }
}


module.exports = BotStart;