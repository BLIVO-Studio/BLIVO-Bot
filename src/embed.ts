import { EmbedBuilder } from "@discordjs/builders";
import { embed_color, embed_error_color } from "../config.json";
import { ChatInputCommandInteraction } from "discord.js";

function safeGet<T> (obj: any): T {
    const conv = obj as T;
    
    if (conv == null || conv == undefined) {
        throw new Error('Given object is null or undefined')
    }

    return conv;
}

function getDefaultEmbed(interaction: ChatInputCommandInteraction) : EmbedBuilder {
    return new EmbedBuilder()
        .setColor(Number(embed_color))
        .setTimestamp()
        .setFooter({text: `Requested by ${interaction.user.tag}`, iconURL: safeGet<string>(interaction.user.avatarURL())});
}

function getErrorEmbed(interaction: ChatInputCommandInteraction, error_name: string="Error!", error_message: string="An internal error occurred!") : EmbedBuilder {
    return new EmbedBuilder()
        .setColor(Number(embed_error_color))
        .addFields(
            {name: error_name, value: error_message}
        )
        .setTimestamp()
        .setFooter({text: `Requested by ${interaction.user.tag}`, iconURL: safeGet<string>(interaction.user.avatarURL())});
}

export { getDefaultEmbed, getErrorEmbed, safeGet }
