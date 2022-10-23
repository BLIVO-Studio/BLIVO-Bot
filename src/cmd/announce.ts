import { SlashCommandBuilder } from "@discordjs/builders";
import { ChatInputCommandInteraction, CommandInteractionOption, CacheType } from "discord.js";
import {
    CMD_ANNOUNCE_DESCRIPTION,
    CMD_ANNOUNCE_CHOICE_CONTENT,
    CMD_ANNOUNCE_CHOICE_CONTENT_DESCRIPTION,
    CMD_ANNOUNCE_CHOICE_READER,
    CMD_ANNOUNCE_CHOICE_READER_DESCRIPTION,
    CMD_ANNOUNCE_CHOICE_REACTION,
    CMD_ANNOUNCE_CHOICE_REACTION_DESCRIPTION,
    CMD_ANNOUNCE_EMBED_TITLE,
    CMD_ANNOUNCE_EMBED_READER_NAME,
    CMD_ANNOUNCE_EMBED_CONTENT_NAME
} from "../../message.json";
import { getMessage } from "../message"
import { getDefaultEmbed, safeGet } from '../embed'
import {
    default_announcement_mention,
    default_announcement_reaction_emoji
} from '../../config.json'

module.exports = {
    data: new SlashCommandBuilder()
        .setName('announce')
        .setDescription(getMessage(CMD_ANNOUNCE_DESCRIPTION))
        .addStringOption(option =>
            option.setName(getMessage(CMD_ANNOUNCE_CHOICE_CONTENT)).setDescription(getMessage(CMD_ANNOUNCE_CHOICE_CONTENT_DESCRIPTION))
                .setRequired(true))
        .addStringOption(option =>
            option.setName(getMessage(CMD_ANNOUNCE_CHOICE_READER))
                .setDescription(getMessage(CMD_ANNOUNCE_CHOICE_READER_DESCRIPTION))
                .setRequired(false))
        .addStringOption(option =>
            option.setName(getMessage(CMD_ANNOUNCE_CHOICE_REACTION))
                .setDescription(getMessage(CMD_ANNOUNCE_CHOICE_REACTION_DESCRIPTION))
                .setRequired(false)),

    async execute(interaction: ChatInputCommandInteraction) {
        let tmp: any;

        const content = safeGet<CommandInteractionOption<CacheType>>(interaction.options.get(getMessage(CMD_ANNOUNCE_CHOICE_CONTENT)));

        tmp = interaction.options.get(getMessage(CMD_ANNOUNCE_CHOICE_READER));
        const reader = tmp == null ? default_announcement_mention : safeGet<string>(tmp.value);

        tmp = interaction.options.get(getMessage(CMD_ANNOUNCE_CHOICE_REACTION));
        const reaction = tmp == null ? default_announcement_reaction_emoji : safeGet<string>(tmp.value);

        const embeds = getDefaultEmbed(interaction);
        embeds.setTitle(getMessage(CMD_ANNOUNCE_EMBED_TITLE))
            .addFields(
                { name: getMessage(CMD_ANNOUNCE_EMBED_READER_NAME), value: reader },
                { name: getMessage(CMD_ANNOUNCE_EMBED_CONTENT_NAME), value: safeGet<string>(content.value).toString().trim() }
            );

        const reply = await interaction.reply({ embeds: [embeds], fetchReply: true });
        reply.react(reaction); // Currently this doesn't work and I don't know why

        //const reply = await interaction.reply({ embeds: [embeds], fetchReply: true});        
    }
}
