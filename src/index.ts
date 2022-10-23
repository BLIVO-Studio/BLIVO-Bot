import { Events, GatewayIntentBits, ClientUser } from "discord.js";
import { Collection } from "discord.js";
import { getToken } from './token'
import { ExtendedClient } from './ext/client'
import { loadCommands } from './loader'
import { Command } from './type'
import { safeGet } from './embed'
import { CMD_ANNOUNCE_EMBED_TITLE } from '../message.json'
import { default_announcement_reaction_emoji } from '../config.json'
import { getMessage } from "./message";

const client = new ExtendedClient({
    intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessageReactions, GatewayIntentBits.GuildMessages,
    GatewayIntentBits.Guilds]
});
client.commands = new Collection()

loadCommands((command: Command) => {
    client.commands.set(command.data.name, command);
});

client.once(Events.ClientReady, (client) => {
    console.log(`Ready! Logged in as ${client.user.tag}`);
});

// I know this is not a good way. But currently 'react' method doesn't work on individual command script and I don't know why.
client.on(Events.MessageCreate, async (message) => {
    if (message.author.id != safeGet<ClientUser>(client.user).id) return;

    if (safeGet<string>(message.embeds[0].title) === getMessage(CMD_ANNOUNCE_EMBED_TITLE)) {
        message.react(default_announcement_reaction_emoji);
    }
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
        await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true })
    };
});


client.login(getToken());
