import fs from 'node:fs'
import path from 'node:path'

import { Events, GatewayIntentBits } from "discord.js";
import { Collection } from "discord.js";
import { getToken } from './token'
import { ExtendedClient } from './extensions/client'
import { commands_folder_dir } from '../config.json'

const client = new ExtendedClient({ intents: [GatewayIntentBits.Guilds] });
client.commands = new Collection()

const commandsPath = commands_folder_dir
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.ts'));

for (const file of commandFiles) {
	const filePath = path.join(commandsPath, file);
	const command = require(filePath);
	client.commands.set(command.data.name, command);
}

client.once(Events.ClientReady, (client) => {
    console.log(`Ready! Logged in as ${client.user.tag}`);
});

client.on(Events.InteractionCreate, async (interaction) => {
    if (!interaction.isChatInputCommand()) return;    

    const command = (interaction.client as ExtendedClient).commands.get(interaction.commandName);

	if (!command) {
		console.error(`No command matching ${interaction.commandName} was found.`);
		return;
	}

	try {
		await command.execute(interaction);
	} catch (error) {
		console.error(error);
		await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true })};
});


client.login(getToken());