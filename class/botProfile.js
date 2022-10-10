class BotProfile {
  
    constructor(anketa)
    {
    this.anketa=anketa
    }

    think()
    {
        if (this.anketa.complete)
        {
            return {
                msg:"<b>Ваш профиль</b> \n<i>Возраст: \nРегион: \nКредитная история: \nКоличество активных займов:</i>",
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