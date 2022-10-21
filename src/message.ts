import { TYPE } from "../message.json";
import { lang } from "../config.json"

export type langMsg = typeof TYPE;

function getMessage(messageContainer: langMsg) {
    if (lang == "KR") {
        return messageContainer.KR
    } else if (lang == "ENG") {
        return messageContainer.ENG
    } else {
        throw new Error(`Invalid language(${lang})`);
    }
};

export { getMessage }
