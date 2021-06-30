import { Band } from './band';


class BandsRepository {

    private bandsDict: Record<string, Band>;

    constructor() {
        const bands = [
            new Band('Metallica'),
            new Band('Héroes del silencio'),
            new Band('Bon Jovi'),
            new Band('Breaking Benjamin'),
            new Band('Soda stereo'),
        ];
        this.bandsDict = bands.reduce(
            (acc: Record<string, Band>, band: Band) => {
                const dictEntry = {
                    [band.id]: band,
                };
                acc = {
                    ...acc,
                    ...dictEntry,
                };
                return acc;
            },
            {}
        );
    }

    addBand(bandname: string): Band[] {
        const band = new Band(bandname);
        this.bandsDict[band.id] = band;
        return this.bands;
    }

    removeBand(id: string): void {
        const band = this.bandsDict[id];
        if (band) {
            delete this.bandsDict[id];
        } else {
            throw new Error('Band does not exist');
        }

    }

    increaseVotes(id: string): Band {
        const band = this.bandsDict[id];
        if (band) {
            this.bandsDict[id].votes += 1;
        } else {
            throw new Error('Band does not exist');
        }
        return band;
    }

    changeName(id: string, name: string): Band {
        const band = this.bandsDict[id];
        if (band) {
            this.bandsDict[id].name = name;
        } else {
            throw new Error('Band does not exist');
        }
        return band;
    }




    get bands(): Band[] {
        return Object.values(this.bandsDict);
    }

}


export {
    BandsRepository,
}