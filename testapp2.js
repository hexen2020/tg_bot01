const TelegramBot = require('node-telegram-bot-api')
const botManager = require('./class/botManager')
const mysql = require("mysql2")


const fs=require("fs")
const connection = mysql.createConnection({
    host: "rc1b-oo0r1cutb0wqf6qq.mdb.yandexcloud.net",
    user: "crm",
    database: "TgBot",
    password: "3HZOdQSA",
    ssl  : {
      ca : fs.readFileSync('./root.crt'),
    }
});


const token = '5776133707:AAGmOcGr_D4tfIwfssqL8V1b68eXIgfDQuE'



//5776133707:AAGmOcGr_D4tfIwfssqL8V1b68eXIgfDQuE - serv
//5400109352:AAF6wtuT_CwF9U5mgcqirCZL9YNwczRjjEc - local

const bot = new TelegramBot(token, { polling: true })
let users={}
bot.on('callback_query', (query) => {
    const chatId = query.message.chat.id
    const user_id=query.message.chat.id
    if (!users[user_id])
    {
    users[user_id]=new botManager(connection,user_id)
    }
    let result=users[user_id].think(query.data)
    bot.sendMessage(chatId,result.msg,result.opts)

})

bot.on('message', (msg) => {
const chatId = msg.chat.id
const user_id=msg.chat.id
let timeout_message=0

if (!users[user_id])
{
    users[user_id]=new botManager(connection,user_id)
    bot.sendMessage(chatId,"<i>Спасибо, что выбрали именно нас!</i>",{
        reply_markup: {
            resize_keyboard: true,
            one_time_keyboard: false,
            keyboard: [
                [
                  {
                    text: '🔎Подобрать займ',
                  }, {
                    text: '⭐Популярные предложения'
                  }
                ],
                [
                  {
                    text: '📝Профиль'
                  }
                ],
                [
                  {
                    text: '⁉Помощь'
                  }
                ]        
              ],
        },
        parse_mode: 'html'})
        timeout_message=1
}
else
{
    if (msg.text=='/start')
    {
        bot.sendMessage(chatId,"<i>Привет!</i>",{
            reply_markup: {
                resize_keyboard: true,
                one_time_keyboard: false,
                keyboard: [
                    [
                      {
                        text: '🔎Подобрать займ',
                      }, {
                        text: '⭐Популярные предложения'
                      }
                    ],
                    [
                      {
                        text: '📝Профиль'
                      }
                    ],
                    [
                      {
                        text: '⁉Помощь'
                      }
                    ]        
                  ],
            },
            parse_mode: 'html'})
            timeout_message=3
    }
}

let result=users[user_id].think(msg.text)

setTimeout(()=>{

    bot.sendMessage(chatId,result.msg,result.opts)
},timeout_message*300)


})


