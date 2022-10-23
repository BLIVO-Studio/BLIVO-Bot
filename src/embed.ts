import { EmbedBuilder } from "@discordjs/builders";
import { embed_color } from "../config.json";
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

export { getDefaultEmbed, safeGet }
