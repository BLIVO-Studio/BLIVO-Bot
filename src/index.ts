import { Events, GatewayIntentBits } from "discord.js";
import { Collection } from "discord.js";
import { getToken } from './token'
import { ExtendedClient } from './ext/client'
import { loadCommands } from './loader'
import { Command } from './type'

const client = new ExtendedClient({ intents: [GatewayIntentBits.Guilds] });
client.commands = new Collection()

loadCommands((command: Command) => {
    client.commands.set(command.data.name, command);
});

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