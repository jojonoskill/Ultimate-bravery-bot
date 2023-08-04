const fs = require('fs');
//const path = require('node:path');                              //nodejs files
const { Client,Collection,GatewayIntentBits, Routes,REST, Options} = require('discord.js');//discord main importer
const config = require('./config.json');              //token file
const commands = require('./commands.js');
const getChampion = require('./getChampionUBFunc.js');




const client = new Client({
        intents: [
            GatewayIntentBits.Guilds,                                   //client imports(important)
            GatewayIntentBits.GuildMessages,
            GatewayIntentBits.MessageContent,
            GatewayIntentBits.DirectMessages,
            GatewayIntentBits.DirectMessageTyping
        ]
});

const rest = new REST({ version: '10' }).setToken(config.TOKEN);

//client.commands = new Collection();                                     //коллекция всех команд из папки commands


client.login(config.TOKEN);
//login

client.on('ready',()=>{                                     //первый запуск
    console.log('bot has logged in');
})

client.on('messageCreate',async (message)=>{     //считывание сообщения
    /*if(message.content !== '') {
        console.log(message.content);
        console.log(message.createdAt.toJSON());
    }*/

   // message.react('🧻');
    /*switch (message.content) {
        case 'JOJO':
            console.log('jojo has mentioned');
            break;
        case 'GAY':
            message.reply('JOJO');
            break;
        default:
            break;
    }*/
    try{
        if(ubgameobj[message.author.id].chatid === message.channel.id){
            switch (ubgameobj[message.author.id].event){
                case 1:
                    ubgameobj[message.author.id].players = message.content.split(' ');
                    //ubgameobj[message.author.id].event = 2;
                    for(let i = 0;i<ubgameobj[message.author.id].players.length / 2;i++){
                        let players = ubgameobj[message.author.id].players.length;
                        let newplayer = Math.floor(Math.random()
                            * players);
                        ubgameobj[message.author.id].redteam.
                        push(ubgameobj[message.author.id].players[newplayer]);
                        ubgameobj[message.author.id].players.splice(newplayer,1);
                    }
                    ubgameobj[message.author.id].blueteam = ubgameobj[message.author.id].players;
                    message.channel.send(`Blue team: ${ubgameobj[message.author.id].blueteam.join(' , ')}`);
                    message.channel.send(`Red team: ${ubgameobj[message.author.id].redteam.join(' , ')}`);
                    message.channel.send('again to refresh teams, go to pick your mama');
                    for(const i in ubgameobj[message.author.id].redteam){
                        ubgameobj[message.author.id].players.push(ubgameobj[message.author.id].redteam[i]);
                    }
                    ubgameobj[message.author.id].event = 2;
                    break;
                case 2:
                    switch (message.content){
                        case 'again':
                            ubgameobj[message.author.id].blueteam = [];
                            ubgameobj[message.author.id].redteam = [];
                            for(let i = 0;i<ubgameobj[message.author.id].players.length / 2;i++){
                                let players = ubgameobj[message.author.id].players.length;
                                let newplayer = Math.floor(Math.random()
                                    * players);
                                ubgameobj[message.author.id].redteam.
                                push(ubgameobj[message.author.id].players[newplayer]);
                                ubgameobj[message.author.id].players.splice(newplayer,1);
                            }
                            ubgameobj[message.author.id].blueteam = ubgameobj[message.author.id].players;
                            message.channel.send(`Blue team: ${ubgameobj[message.author.id].blueteam.join(' , ')}`);
                            message.channel.send(`Red team: ${ubgameobj[message.author.id].redteam.join(' , ')}`);
                            message.channel.send('again to refresh teams, go to pick your mama');
                            for(const i in ubgameobj[message.author.id].redteam){
                                ubgameobj[message.author.id].players.push(ubgameobj[message.author.id].redteam[i]);
                            }
                            break;
                        case 'go':
                            ubgameobj[message.author.id].event = 3;
                            switch (ubgameobj[message.author.id].blueteam.length){
                                case 1:
                                    message.channel.send(`Игра 1 на 1 на миду, lets go`);
                                    break;
                                case 2:
                                    message.channel.send(`Игра 2 на 2 в лесу и на миду, lets go`);
                                    break;
                                case 3:
                                    message.channel.send(`Игра 3 на 3 : в лесу, на миду і на топі, lets go`);
                                    break;
                                case 4:
                                    message.channel.send('Игра 4 на 4 без сапов');
                                    break;
                                default:
                                    message.channel.send('фулл лобби игра еееее');
                                    break;
                            }
                            break;
                    }
                case 3:

                default:
                    break;
            }
        }
    }catch (err){    }
})





client.on('interactionCreate',async (interaction)=>{
    if(!interaction.isChatInputCommand()) return;
    commandCreate[interaction.commandName](interaction);
});                         //slash command interaction


(async () => {
    console.log('Started refreshing application (/) commands.');
    try{
        await rest.put(Routes.applicationCommands(config.CLIENT_ID),
            { body: commands });
        console.log('Successfully reloaded application (/) commands.');
    }catch (err){
        throw err;
    }
})();                       //slash command builder

const commandCreate = {
    'troll': async (interaction)=>{
        interaction.reply('ok')
        const obj = interaction.options.data[0];
        const urlnameobject = await getChampion(obj.value);
        interaction.channel.send({
            files:[
                `./lolimages/screenshot.png`
            ]
        })
        await fs.stat(`./lolimages/screenshot.png`,async function (err, stats) {
            if (err) return console.error(err);
            await fs.unlink(`./lolimages/screenshot.png`,function(err){
                if(err) return console.log(err);
            });
        })
    },
    'randomizer': async (interaction)=>{
        let arr = new Array(interaction.options.data.length)
        for(const i in interaction.options.data){
            const obj = interaction.options.data[i];
            arr[i] = obj.value;
        }
        let newgame = Math.floor(Math.random()
            *interaction.options.data.length);
        await interaction.reply(`from ${arr} games won ${arr[newgame]}`);
    },
    'ubgame': async (interaction)=>{
        ubgameobj[interaction.user.id] = {
            event:1,                //1 для ввода никнеймов, 2 реролл команд, 3 - выбор ролей
            chatid:interaction.channelId,
            redteam:[],
            blueteam:[],
        }
        interaction.reply('людей пожалуйста через пробел');
        console.log(ubgameobj[interaction.user.id]);
    }
}


const ubgameobj = {}
const secons ={
    1:'mid',
    2:'jungle',
    3:'top',
    4:'adc',
    5:'supp',
}
