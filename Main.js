const Discord = require('discord.js');

const client = new Discord.Client/*({partials: ["MESSAGE" , "CHANNEL" , "REACTION"] })*/;

const getRoles = require('./getroles')

const prefix = '!';

const fs = require('fs')

client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));


for (const file of commandFiles){
    const command = require(`./commands/${file}`);

    client.commands.set(command.name, command);
}

client.once('ready' , () => {
    console.log('Bark Bark Luna is Online!');
    getRoles(client)
})

client.on('message', message =>{
    if(!message.content.startsWith(prefix)  || message.author.bot) return;

    const args = message.content.slice(prefix.length).split(/ +/);
    const command = args.shift().toLowerCase();

    if(command === 'guide'){
        client.commands.get('guide').execute(message, args);
    }

});
client.login('')
