import fs from 'node:fs'

function exist(dir: string): boolean {
    return fs.existsSync(dir);
}

function mkdir(dir: string): void {
    if (!exist(dir)) {
        fs.mkdirSync(dir);
    }
}

function write(data: any, dir: string): void {
    // if (!exist(dir)) throw new Error("Given directory doesn't exist.")

    fs.writeFileSync(dir, JSON.stringify(data));
}

function read(dir: string) {
    if (!dir.endsWith('.json')) throw new Error('Given file is not a JSON file')
    if (!exist(dir)) throw new Error("Given directory doesn't exist.")

    return require(dir);
}

export { exist, write, read }
