const TelegramBot = require('node-telegram-bot-api')
const botManager = require('./class/botManager')

const token = '5776133707:AAGmOcGr_D4tfIwfssqL8V1b68eXIgfDQuE'

const bot = new TelegramBot(token, { polling: true })
let users={}
bot.on('callback_query', (query) => {
    const chatId = query.message.chat.id
    const user_id=query.message.chat.id
    if (!users[user_id])
    {
    users[user_id]=new botManager()
    }
    let result=users[user_id].think(query.data)
    bot.sendMessage(chatId,result.msg,result.opts)

})

bot.on('message', (msg) => {
const chatId = msg.chat.id
const user_id=msg.chat.id

if (!users[user_id])
{
    users[user_id]=new botManager()
}
let result=users[user_id].think(msg.text)
bot.sendMessage(chatId,result.msg,result.opts)

})


