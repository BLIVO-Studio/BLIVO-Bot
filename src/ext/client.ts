import * as Discord from "discord.js";

class ExtendedClient extends Discord.Client {

     public commands: Discord.Collection<string, any>;

     constructor(options: Discord.ClientOptions){
          super(options);
          this.commands = new Discord.Collection();
     }

}

export { ExtendedClient }
