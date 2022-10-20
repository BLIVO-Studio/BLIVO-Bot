import { Client, Events, GatewayIntentBits } from 'discord.js';
import { token, load_token_from_env } from '../config.json';

let TOKEN : string | undefined

if (load_token_from_env) {
    TOKEN = process.env['TOKEN']
} else {
    TOKEN = token
}

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.once(Events.ClientReady, (client) => {
	console.log(`Ready! Logged in as ${client.user.tag}`);
});

client.login(TOKEN);