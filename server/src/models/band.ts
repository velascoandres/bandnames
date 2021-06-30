import { v4 as uuid } from 'uuid';

class Band {

    public id: string;
    constructor(
        public name: string,
        public votes = 0,
    ) {
        this.id = uuid();
    }

}

export {
    Band,
}