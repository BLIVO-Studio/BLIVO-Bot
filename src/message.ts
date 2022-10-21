import { TYPE } from "../message.json";

export type langMsg = typeof TYPE;

function getMessage(messageContainer: langMsg, lang : string) {
    if (lang == "KR") {
        return messageContainer.KR
    } else if (lang == "ENG") {
        return messageContainer.ENG
    } else {
        throw new Error(`Invalid language(${lang})`);
    }
};

export { getMessage }
