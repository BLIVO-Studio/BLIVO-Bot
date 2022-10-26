import { BotMessage } from "./type";
import { lang } from "../config.json"

function getMessage(messageContainer: BotMessage) {
  if (lang == "KR") {
    return messageContainer.KR
  } else if (lang == "ENG") {
    return messageContainer.ENG
  } else {
    throw new Error(`Invalid language(${lang})`);
  }
};

export { getMessage }
