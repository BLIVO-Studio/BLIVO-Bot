import { Client, Events, GatewayIntentBits } from 'discord.js';
import { getToken } from './token'

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.once(Events.ClientReady, (client) => {
	console.log(`Ready! Logged in as ${client.user.tag}`);
});

client.login(getToken());