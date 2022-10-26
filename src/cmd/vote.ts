import { SlashCommandBuilder } from "@discordjs/builders";
import { ChatInputCommandInteraction, CommandInteractionOption, CacheType } from "discord.js";
import {
    CMD_VOTE_DESCRIPTION,
    CMD_VOTE_CHOICE_TITLE,
    CMD_VOTE_CHOICE_TITLE_DESCRIPTION,
    CMD_VOTE_CHOICE_ITEM1,
    CMD_VOTE_CHOICE_ITEM1_DESCRIPTION,
    CMD_VOTE_CHOICE_DESCRIPTION,
    CMD_VOTE_CHOICE_DESCRIPTION_DESCRIPTION,
    CMD_VOTE_EMBED_TITLE_PREFIX
} from "../../message.json";
import { getMessage } from "../message"
import { getDefaultEmbed, getErrorEmbed, getIDEmbed, safeGet } from '../embed'
import { BotMessage } from '../type'
import { ID } from '../scr/id'

function getOptionObj(index: number): BotMessage {
    return { ENG: `item ${index}`, KR: `${index}번` }
}

module.exports = {
    data: new SlashCommandBuilder()
        .setName('vote')
        .setDescription(getMessage(CMD_VOTE_DESCRIPTION))
        .addStringOption(option =>
            option.setName(getMessage(CMD_VOTE_CHOICE_TITLE))
                .setDescription(getMessage(CMD_VOTE_CHOICE_TITLE_DESCRIPTION))
                .setRequired(true))
        .addStringOption(option =>
            option.setName(getMessage(CMD_VOTE_CHOICE_ITEM1))
                .setDescription(getMessage(CMD_VOTE_CHOICE_ITEM1_DESCRIPTION))
                .setRequired(true)) // 'vote' command requires at least one option
        .addStringOption(option =>
            option.setName(getMessage(CMD_VOTE_CHOICE_DESCRIPTION))
                .setDescription(getMessage(CMD_VOTE_CHOICE_DESCRIPTION_DESCRIPTION))
                .setRequired(false))
        .addStringOption(option =>
            option.setName(getMessage(getOptionObj(2)))
                .setDescription(getMessage(CMD_VOTE_CHOICE_ITEM1_DESCRIPTION))
                .setRequired(false))
        .addStringOption(option =>
            option.setName(getMessage(getOptionObj(3)))
                .setDescription(getMessage(CMD_VOTE_CHOICE_ITEM1_DESCRIPTION))
                .setRequired(false))
        .addStringOption(option =>
            option.setName(getMessage(getOptionObj(4)))
                .setDescription(getMessage(CMD_VOTE_CHOICE_ITEM1_DESCRIPTION))
                .setRequired(false))
        .addStringOption(option =>
            option.setName(getMessage(getOptionObj(5)))
                .setDescription(getMessage(CMD_VOTE_CHOICE_ITEM1_DESCRIPTION))
                .setRequired(false))
        .addStringOption(option =>
            option.setName(getMessage(getOptionObj(6)))
                .setDescription(getMessage(CMD_VOTE_CHOICE_ITEM1_DESCRIPTION))
                .setRequired(false))
        .addStringOption(option =>
            option.setName(getMessage(getOptionObj(7)))
                .setDescription(getMessage(CMD_VOTE_CHOICE_ITEM1_DESCRIPTION))
                .setRequired(false))
        .addStringOption(option =>
            option.setName(getMessage(getOptionObj(8)))
                .setDescription(getMessage(CMD_VOTE_CHOICE_ITEM1_DESCRIPTION))
                .setRequired(false))
        .addStringOption(option =>
            option.setName(getMessage(getOptionObj(9)))
                .setDescription(getMessage(CMD_VOTE_CHOICE_ITEM1_DESCRIPTION))
                .setRequired(false)),

    async execute(interaction: ChatInputCommandInteraction) {
        let tmp: any;

        const title = safeGet<CommandInteractionOption<CacheType>>(interaction.options.get(getMessage(CMD_VOTE_CHOICE_TITLE)));

        const item1 = safeGet<CommandInteractionOption<CacheType>>(interaction.options.get(getMessage(CMD_VOTE_CHOICE_ITEM1)));

        tmp = interaction.options.get(getMessage(CMD_VOTE_CHOICE_DESCRIPTION));
        const description = tmp == null ? null : safeGet<string>(tmp.value);

        let Field: {
            name: string,
            value: string
        };

        type Field = typeof Field;

        let fields: Field[] = [];

        fields.push({ name: getMessage(CMD_VOTE_CHOICE_ITEM1), value: safeGet<string>(item1.value) });

        for (let i = 2; i < 10; i++) {
            const name = getMessage(getOptionObj(i))
            const item = interaction.options.get(name);

            if (item == null) continue;

            fields.push({ name: name, value: safeGet<string>(item.value) });
        }

        let lastOf = (l: Field[]) => l[l.length - 1];

        if (safeGet<Field>(lastOf(fields)).name.replace('번', '') != fields.length.toString()) {
            await interaction.reply({ embeds: [getErrorEmbed(interaction)] });
            return;
        }

        const embeds = getDefaultEmbed(interaction);
        embeds.setTitle(getMessage(CMD_VOTE_EMBED_TITLE_PREFIX) + title.value)
            .addFields(fields)    

        const id = new ID(fields.length.toString())
        const id_embeds = getIDEmbed(interaction, id.toString());

        if (description != null) embeds.setDescription(description);

        const reply = await interaction.reply({ embeds: [embeds, id_embeds], fetchReply: true });
    }
}
