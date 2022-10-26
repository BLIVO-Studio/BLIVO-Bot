import { EmbedBuilder } from "@discordjs/builders";
import { embed_color, embed_error_color } from "../config.json";
import { ChatInputCommandInteraction } from "discord.js";
import {
    CMD_VOTE_DEFAULT_ERROR_TITLE,
    CMD_VOTE_DEFAULT_ERROR_NAME,
    CMD_VOTE_DEFAULT_ERROR_FIELD
} from '../message.json'
import { getMessage } from "./message";

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

function getErrorEmbed(interaction: ChatInputCommandInteraction, error_title: string=getMessage(CMD_VOTE_DEFAULT_ERROR_TITLE), error_name: string=getMessage(CMD_VOTE_DEFAULT_ERROR_NAME), error_message: string=getMessage(CMD_VOTE_DEFAULT_ERROR_FIELD)) : EmbedBuilder {
    return new EmbedBuilder()
        .setTitle(error_title)
        .setColor(Number(embed_error_color))
        .addFields(
            {name: error_name, value: error_message}
        )
        .setTimestamp()
        .setFooter({text: `Requested by ${interaction.user.tag}`, iconURL: safeGet<string>(interaction.user.avatarURL())});
}

function getIDEmbed(interaction: ChatInputCommandInteraction, id: string) : EmbedBuilder {
    return new EmbedBuilder()
        .setColor(Number(embed_color))        
        .setFooter({text: `ID: ${id}`});
}

export { getDefaultEmbed, getErrorEmbed, getIDEmbed, safeGet }
