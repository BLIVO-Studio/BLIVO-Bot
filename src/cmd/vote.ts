import { SlashCommandBuilder, ActionRowBuilder, ButtonBuilder } from "@discordjs/builders";
import { ChatInputCommandInteraction, ButtonStyle } from "discord.js";
import { CMD_VOTE_DESCRIPTION } from "../../message.json";
import { getMessage } from "../message"
import { getDefaultEmbed } from '../embed'

module.exports = {
    data: new SlashCommandBuilder()
        .setName('vote')
        .setDescription(getMessage(CMD_VOTE_DESCRIPTION)),
    
    async execute(interaction: ChatInputCommandInteraction) {      
        const embeds = getDefaultEmbed(interaction);

        await interaction.reply({ embeds: [embeds], fetchReply: true });
    }
}
