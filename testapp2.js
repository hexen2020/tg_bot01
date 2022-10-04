const TelegramBot = require('node-telegram-bot-api')
const botManager = require('./class/botManager')

const token = '5776133707:AAGmOcGr_D4tfIwfssqL8V1b68eXIgfDQuE'

const bot = new TelegramBot(token, { polling: true })
let users={}

bot.on('message', (msg) => {
const chatId = msg.chat.id
const user_id=msg.from.id
if (users[user_id])
{
    users[user_id].message(msg.text)
    bot.sendMessage(chatId, users[user_id].think())
}
else
{
    users[user_id]=new botManager()
    bot.sendMessage(chatId, "Ты хто?")
}

})


