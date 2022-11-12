import { SlashCommandBuilder } from "@discordjs/builders";
import { ChannelType, ChatInputCommandInteraction, PrivateThreadChannel, PublicThreadChannel, TextBasedChannel, TextChannel, VoiceChannel } from "discord.js";
import {
    CMD_CLEAR_DESCRIPTION,
    CMD_CLEAR_CHOICE_COUNT,
    CMD_CLEAR_CHOICE_COUNT_DESCRIPTION,
    CMD_CLEAR_DEFAULT_ERROR_TITLE,
    CMD_CLEAR_DEFAULT_ERROR_NAME,
    CMD_CLEAR_DEFAULT_ERROR_FIELD,
    CMD_CLEAR_ERROR_FIELD_01_BEGIN,
    CMD_CLEAR_ERROR_FIELD_01_END,
    CMD_CLEAR_EMBED_TITLE,
    CMD_CLEAR_EMBED_FIELD_NAME_01
} from "../../message.json";
import { getMessage } from "../message"
import { getDefaultEmbed, getErrorEmbed, safeGet } from '../embed'
import { message_delete_limitation } from '../../config.json'

module.exports = {
    data: new SlashCommandBuilder()
        .setName('clear')
        .setDescription(getMessage(CMD_CLEAR_DESCRIPTION))
        .addIntegerOption(option =>
            option.setName(getMessage(CMD_CLEAR_CHOICE_COUNT))
                .setDescription(getMessage(CMD_CLEAR_CHOICE_COUNT_DESCRIPTION))
                .setRequired(true)),

    async execute(interaction: ChatInputCommandInteraction) {
        const count = safeGet<number>(interaction.options.getInteger(getMessage(CMD_CLEAR_CHOICE_COUNT)));

        if (count <= 0 || count > message_delete_limitation) {
            const s: string = getMessage(CMD_CLEAR_ERROR_FIELD_01_BEGIN) + message_delete_limitation + getMessage(CMD_CLEAR_ERROR_FIELD_01_END);

            await interaction.reply({
                embeds: [getErrorEmbed(
                    interaction,
                    getMessage(CMD_CLEAR_DEFAULT_ERROR_TITLE),
                    getMessage(CMD_CLEAR_DEFAULT_ERROR_NAME),
                    s
                )]
            });
            return;
        }

        let channel = safeGet<TextBasedChannel>(interaction.channel);

        function clear(channel: TextChannel | VoiceChannel | PublicThreadChannel | PrivateThreadChannel) {
            channel.messages.fetch({
                limit: count + 1
            }).then(messages => {
                channel.bulkDelete(messages);
            }).catch(console.error);
        }

        if (channel.type == ChannelType.GuildText) {
            channel = channel as TextChannel;
            clear(channel);
        } else if (channel.type == ChannelType.GuildVoice) {
            channel = channel as VoiceChannel;
            clear(channel);
        } else if (channel.type == ChannelType.PublicThread) {
            channel = channel as PublicThreadChannel;
            clear(channel);
        } else if (channel.type == ChannelType.PrivateThread) {
            channel = channel as PrivateThreadChannel;
            clear(channel);
        } else {
            await interaction.reply({
                embeds: [getErrorEmbed(
                    interaction,
                    getMessage(CMD_CLEAR_DEFAULT_ERROR_TITLE),
                    getMessage(CMD_CLEAR_DEFAULT_ERROR_NAME),
                    getMessage(CMD_CLEAR_DEFAULT_ERROR_FIELD)
                )]
            });
            return;
        }

        const embeds = getDefaultEmbed(interaction);
        embeds.setTitle(getMessage(CMD_CLEAR_EMBED_TITLE))
            .addFields(
                { name: getMessage(CMD_CLEAR_EMBED_FIELD_NAME_01), value: `${count}` }
            )

        await interaction.reply({ embeds: [embeds] })
    }
}
