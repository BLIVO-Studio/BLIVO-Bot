import { Events, GatewayIntentBits, ClientUser } from "discord.js";
import { Collection } from "discord.js";
import { getToken } from './token'
import { ExtendedClient } from './ext/client'
import { loadCommands } from './loader'
import { Command } from './type'

/*import { safeGet } from './embed'
import { CMD_ANNOUNCE_EMBED_TITLE, CMD_VOTE_EMBED_TITLE_PREFIX } from '../message.json'
import { getMessage } from "./message";
import {
    default_announcement_reaction_emoji,
    default_vote_choice_1,
    default_vote_choice_2,
    default_vote_choice_3,
    default_vote_choice_4,
    default_vote_choice_5,
    default_vote_choice_6,
    default_vote_choice_7,
    default_vote_choice_8,
    default_vote_choice_9,
    id_separator,
    reaction_delay
} from "../config.json"


const vote_reactions: string[] = [
    default_vote_choice_1,
    default_vote_choice_2,
    default_vote_choice_3,
    default_vote_choice_4,
    default_vote_choice_5,
    default_vote_choice_6,
    default_vote_choice_7,
    default_vote_choice_8,
    default_vote_choice_9
]*/

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

/*
function delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
}

// I know this is not a good way. But currently 'react' method doesn't work on individual command script and I don't know why.
client.on(Events.MessageCreate, async (message) => {
    if (message.author.id != safeGet<ClientUser>(client.user).id) return;

    if (message.embeds.length == 0) return;    

    if (safeGet<string>(message.embeds[0].title) === getMessage(CMD_ANNOUNCE_EMBED_TITLE)) {

      message.react(default_announcement_reaction_emoji);
    } else if (safeGet<string>(message.embeds[0].title).includes(getMessage(CMD_VOTE_EMBED_TITLE_PREFIX))) {      
        const text = safeGet<string>(message.embeds[1].footer?.text);
        const idx = text.indexOf(id_separator);
        const len = text.slice(idx + 1);
        const num: number = Number(len)

        if (num > 9) return;

        async function react(i: number) {
            message.react(vote_reactions[i]);
            await delay(Number(reaction_delay));
            return;
        }

        for (let i = 0; i < num; i++) {
            react(i);
        }
    }
});
*/

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
