import { SlashCommandBuilder } from "@discordjs/builders";
import { ChatInputCommandInteraction } from "discord.js";
import { CMD_PING_DESCRIPTION } from "../../message.json";
import { getMessage } from "../message"
import { getDefaultEmbed } from '../embed'

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription(getMessage(CMD_PING_DESCRIPTION)),
    
    async execute(interaction: ChatInputCommandInteraction) {
        const embeds = getDefaultEmbed(interaction);
            embeds.setTitle('Pong!')
            /*.setAuthor(
                {name: interaction.user.tag, iconURL: interaction.user.avatarURL()}
            )*/
            .addFields(
                { name: 'Latency', value: `${Date.now() - interaction.createdTimestamp}ms` }   
            )
        
        await interaction.reply({ embeds: [embeds] })
    }
}
