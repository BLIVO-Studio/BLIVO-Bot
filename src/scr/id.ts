import { id_separator } from '../../config.json'

class ID {
    private auto_id: string;
    private additional_id: string;
    private id: string;

    public constructor(additional: string='') {
        this.auto_id = ''
        this.id = ''
        this.additional_id = additional;        
        this.refreshAutoID();        
        this.setID();
    }

    public getID = () => this.id;

    public refreshID(additional: string='') {
        this.additional_id = additional;
        this.refreshAutoID();        
        this.setID();
    }

    public refreshAdditionalID(additional: string) {
        this.additional_id = additional;

        this.setID();
    }

    public toString = () : string => {
        return this.getID();
    }

    private setID() {
        this.id = this.auto_id + id_separator + this.additional_id;
    }

    private refreshAutoID() {
        let id: string = '';

        function padTo2Digits(n: number) {
              return n.toString().padStart(2, '0');
        }
        
        const today = new Date();
        const d = padTo2Digits(today.getDate());
        const m = padTo2Digits(today.getMonth() + 1);
        const y = today.getFullYear();
        const h = padTo2Digits(today.getHours())
        const mn = padTo2Digits(today.getMinutes())
        const s = padTo2Digits(today.getSeconds())
        const ms = padTo2Digits(today.getMilliseconds());

        // id = y + m + d + h + mn + s + ms // Long ID
        // id = `${Number(d) + Number(m)}` + h + mn + s // Short ID
        id = Number(h + mn + s + ms).toString() // Shorter ID

        this.auto_id = id;
    }    
}

export { ID }
