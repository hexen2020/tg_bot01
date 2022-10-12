class BotProfile {
  
    constructor(anketa)
    {
    this.anketa=anketa


    }



    
    think()
    {
        
        let message=""
        for (let key in this.anketa.users_data) {
            if (key.length>0)
            {message+=key+" "+this.anketa.users_data[key]+"\n"}
          }


        console.log(this.anketa.users_data)
        if (this.anketa.complete)
        {
            return {
                msg:message,
                opts:{
                    reply_markup: {
                        inline_keyboard: [
                            [
                                {
                                  text: 'Редактировать профиль',
                                  callback_data: 'k11'
                                }
                            ],
                           ]},
                    parse_mode: 'html'
                }
            }
        }
        else
        {
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
}


module.exports = BotProfile;