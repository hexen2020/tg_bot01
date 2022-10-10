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
                opts:{parse_mode: 'html'}
            }
        }
        else
        {
            return {
                msg:"<i>Для получения полного списка предложений и наилучшей выдачи результатов, необходимо заполнить профиль, нажав кнопку - <b>Заполнить профиль.</b> \nВНИМАНИЕ! У Вас еще не заполнен профиль — Вам доступны не все предложения.</i>",
                opts:{parse_mode: 'html'}
            }
        }
    }
}


module.exports = BotZaim;