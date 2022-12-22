import { SlashCommandBuilder } from "@discordjs/builders";
import { ChatInputCommandInteraction, CommandInteractionOption, CacheType } from "discord.js";
import {
    CMD_VOTE_DESCRIPTION,
    CMD_VOTE_CHOICE_TITLE,
    CMD_VOTE_CHOICE_TITLE_DESCRIPTION,
    CMD_VOTE_CHOICE_ITEM_DEFAULT,
    CMD_VOTE_CHOICE_ITEM_DEFAULT_DESCRIPTION,
    CMD_VOTE_CHOICE_DESCRIPTION,
    CMD_VOTE_CHOICE_DESCRIPTION_DESCRIPTION,
    CMD_VOTE_EMBED_TITLE_PREFIX,
    CMD_VOTE_ERROR_FIELD_SERIES,
    CMD_VOTE_ERROR_FIELD_SERIES_ADDITIONAL,
    CMD_VOTE_DEFAULT_ERROR_TITLE,
    CMD_VOTE_DEFAULT_ERROR_NAME,    
} from "../../message.json";
import { getMessage } from "../message"
import { getDefaultEmbed, getErrorEmbed, getIDEmbed, safeGet } from '../embed'
import { BotMessage } from '../type'
import { ID } from '../scr/id'
import {
    default_vote_choice_1,
    default_vote_choice_2,
    default_vote_choice_3,
    default_vote_choice_4,
    default_vote_choice_5,
    default_vote_choice_6,
    default_vote_choice_7,
    default_vote_choice_8,
    default_vote_choice_9,
    reaction_delay
} from '../../config.json'

function getOptionObj(index: number): BotMessage {
    return { ENG: `item ${index}`, KR: `${index}번` }
}

function delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function formatString(str: string, ... args: any[]) {
    return str.replace(/{(\d+)}/g, function (match, n) {
        return typeof args[n] != 'undefined' ? args[n]: match;
    });
};

let Field: {
    name: string,
    value: string
};

type Field = typeof Field;

module.exports = {
    data: new SlashCommandBuilder()
        .setName('vote')
        .setDescription(getMessage(CMD_VOTE_DESCRIPTION))
        .addStringOption(option =>
            option.setName(getMessage(CMD_VOTE_CHOICE_TITLE))
                .setDescription(getMessage(CMD_VOTE_CHOICE_TITLE_DESCRIPTION))
                .setRequired(true))
        .addStringOption(option =>
            option.setName(getMessage(CMD_VOTE_CHOICE_ITEM_DEFAULT))
                .setDescription(getMessage(CMD_VOTE_CHOICE_ITEM_DEFAULT_DESCRIPTION))
                .setRequired(true)) // 'vote' command requires at least one option        
        .addStringOption(option =>
            option.setName(getMessage(getOptionObj(2)))
                .setDescription(getMessage(CMD_VOTE_CHOICE_ITEM_DEFAULT_DESCRIPTION))
                .setRequired(false))
        .addStringOption(option =>
            option.setName(getMessage(getOptionObj(3)))
                .setDescription(getMessage(CMD_VOTE_CHOICE_ITEM_DEFAULT_DESCRIPTION))
                .setRequired(false))
        .addStringOption(option =>
            option.setName(getMessage(getOptionObj(4)))
                .setDescription(getMessage(CMD_VOTE_CHOICE_ITEM_DEFAULT_DESCRIPTION))
                .setRequired(false))
        .addStringOption(option =>
            option.setName(getMessage(getOptionObj(5)))
                .setDescription(getMessage(CMD_VOTE_CHOICE_ITEM_DEFAULT_DESCRIPTION))
                .setRequired(false))
        .addStringOption(option =>
            option.setName(getMessage(getOptionObj(6)))
                .setDescription(getMessage(CMD_VOTE_CHOICE_ITEM_DEFAULT_DESCRIPTION))
                .setRequired(false))
        .addStringOption(option =>
            option.setName(getMessage(getOptionObj(7)))
                .setDescription(getMessage(CMD_VOTE_CHOICE_ITEM_DEFAULT_DESCRIPTION))
                .setRequired(false))
        .addStringOption(option =>
            option.setName(getMessage(getOptionObj(8)))
                .setDescription(getMessage(CMD_VOTE_CHOICE_ITEM_DEFAULT_DESCRIPTION))
                .setRequired(false))
        .addStringOption(option =>
            option.setName(getMessage(getOptionObj(9)))
                .setDescription(getMessage(CMD_VOTE_CHOICE_ITEM_DEFAULT_DESCRIPTION))
                .setRequired(false))
        .addStringOption(option =>
            option.setName(getMessage(CMD_VOTE_CHOICE_DESCRIPTION))
                .setDescription(getMessage(CMD_VOTE_CHOICE_DESCRIPTION_DESCRIPTION))
                .setRequired(false)),

    async execute(interaction: ChatInputCommandInteraction) {
        let tmp: any;

        const title = safeGet<CommandInteractionOption<CacheType>>(interaction.options.get(getMessage(CMD_VOTE_CHOICE_TITLE)));
        const item1 = safeGet<CommandInteractionOption<CacheType>>(interaction.options.get(getMessage(CMD_VOTE_CHOICE_ITEM_DEFAULT)));

        tmp = interaction.options.get(getMessage(CMD_VOTE_CHOICE_DESCRIPTION));
        const description = tmp == null ? null : safeGet<string>(tmp.value);            

        let fields: Field[] = [];
        let num_seq: number[] = [];

        fields.push({ name: getMessage(CMD_VOTE_CHOICE_ITEM_DEFAULT), value: safeGet<string>(item1.value) });

        for (let i = 2; i < 10; i++) {
            const name = getMessage(getOptionObj(i))
            const item = interaction.options.get(name);

            if (item == null) continue;

            fields.push({ name: name, value: safeGet<string>(item.value) });
            num_seq.push(i);
        }

        let lastOf = (l: Field[]) => l[l.length - 1];

        if (safeGet<Field>(lastOf(fields)).name.replace('번', '') != fields.length.toString()) {            
            let p, q: string ='';

            for (let i = 0; i < num_seq.length; i++) {
                if (i == num_seq.length - 1) {
                    q = num_seq[i].toString()
                } else {
                    p = p + num_seq[i].toString() + ', '
                }
            }            

            let s = getMessage(CMD_VOTE_ERROR_FIELD_SERIES) + '\n' + formatString(getMessage(CMD_VOTE_ERROR_FIELD_SERIES_ADDITIONAL), p, q)

            await interaction.reply({
                embeds: [getErrorEmbed(
                    interaction,
                    getMessage(CMD_VOTE_DEFAULT_ERROR_TITLE),
                    getMessage(CMD_VOTE_DEFAULT_ERROR_NAME),
                    s
                )]
            });
            return;
        }

        const embeds = getDefaultEmbed(interaction);
        embeds.setTitle(getMessage(CMD_VOTE_EMBED_TITLE_PREFIX) + title.value)
            .addFields(fields)

        const id = new ID()
        const id_embeds = getIDEmbed(interaction, id.toString());

        if (description != null) embeds.setDescription(description);

        const reply = await interaction.reply({ embeds: [embeds, id_embeds], fetchReply: true });

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
        ]

        async function react(i: number) {
            reply.react(vote_reactions[i]);
            await delay(Number(reaction_delay));
            return;
        }

        for (let i = 0; i < fields.length; i++) {
            react(i);
        }
    }
}
