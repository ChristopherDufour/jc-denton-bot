#!/usr/bin/env node
const Discord = require('./Discord')

const clientId = process.env.JCD_CLIENT_ID
const clientSecret = process.env.JCD_CLIENT_SECRET

async function runServer() {
  let discordBot = new Discord()

  await discordBot.login(clientId, clientSecret)

  console.log(discordBot, discordBot.token)
}

runServer()
