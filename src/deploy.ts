import { REST, Routes } from 'discord.js';
import { applicationId, guildId } from '../config.json';
import { getToken } from './token'

const commands: any[] = [];

const rest = new REST({ version: '10' }).setToken(getToken());

rest.put(Routes.applicationGuildCommands(applicationId, guildId), { body: commands })
	.then((data: any) => console.log(`Successfully registered ${data.length} application commands.`))
	.catch(console.error);