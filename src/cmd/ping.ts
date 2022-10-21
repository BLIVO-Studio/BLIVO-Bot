import { SlashCommandBuilder, EmbedBuilder } from "@discordjs/builders";
import { embed_color } from "../../config.json";

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription("Replies with 'Pong!'"),
    async execute(interaction: any) {
        const embeds = new EmbedBuilder()
            .setColor(Number(embed_color))
            .setTitle('Pong!')
            /*.setAuthor(
                {name: interaction.user.tag, iconURL: interaction.user.avatarURL()}
            )*/
            .addFields(
                { name: 'Latency', value: `${Date.now() - interaction.createdTimestamp}ms` }   
            )
            .setTimestamp()
            .setFooter({text: `Requested by ${interaction.user.tag}`, iconURL: interaction.user.avatarURL()})
        
        await interaction.reply({ embeds: [embeds] })
    }
}