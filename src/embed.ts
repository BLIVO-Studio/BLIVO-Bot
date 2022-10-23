import { EmbedBuilder } from "@discordjs/builders";
import { embed_color } from "../config.json";
import { ChatInputCommandInteraction } from "discord.js";

function tryConvertToString(s : string | null | undefined) : string {
    if (s == null || s == undefined) {
        throw new Error('Given string is null')
    }

    return s;
}


function getDefaultEmbed(interaction: ChatInputCommandInteraction) : EmbedBuilder {
    return new EmbedBuilder()
        .setColor(Number(embed_color))
        .setTimestamp()
        .setFooter({text: `Requested by ${interaction.user.tag}`, iconURL: tryConvertToString(interaction.user.avatarURL())});
}

export { getDefaultEmbed }
