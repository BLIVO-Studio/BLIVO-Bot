import { SlashCommandBuilder } from "@discordjs/builders";

let Command: {
  data: SlashCommandBuilder;
  execute: Function
};

let BotMessage: {
  ENG: string;
  KR: string
}

export type Command = typeof Command
export type BotMessage = typeof BotMessage
