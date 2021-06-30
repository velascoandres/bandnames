import React, { useEffect, useState } from 'react'
import { IBand } from '../interfaces/band.interface';

type BandListProps = {
    bands: IBand[];
    voteBand: (id: string) => void;
    deleteBand: (id: string) => void;
    changeName: (id: string, name: string) => void;
}


export const BandList: React.FC<BandListProps> = ({ bands, voteBand, deleteBand, changeName }: BandListProps) => {


    const [bandCollection, setBandCollection] = useState<IBand[]>(bands);

    useEffect(() => {
        setBandCollection(bands);
    }, [bands]);

    const nameChanges = (event: React.ChangeEvent<HTMLInputElement>, id: string) => {
        const newName = event.target.value;
        setBandCollection(
            bands => bands.map(
                band => {
                    if (band.id === id) {
                        band.name = newName;
                    }
                    return band;
                }
            ),
        );
    };

    const onUnfocus = (id: string, name: string) => {
        changeName(id, name);
    };

    const createRows = () => {

        return bandCollection.map(
            ({ id, name, votes }: IBand) => {

                return (
                    <tr key={id}>
                        <td>
                            <button
                                className="btn btn-primary"
                                onClick={() => voteBand(id)}
                            >
                                +1
                            </button>
                        </td>
                        <td>
                            <input
                                className="form-control"
                                value={name}
                                onChange={(e) => nameChanges(e, id)}
                                onBlur={() => onUnfocus(id, name)}
                            />
                        </td>
                        <td>
                            <h3>{votes}</h3>
                        </td>
                        <td>
                            <button
                                className="btn btn-danger"
                                onClick={() => deleteBand(id)}
                            >
                                Delete
                            </button>
                        </td>
                    </tr>
                );
            },
        );
    };


    return (
        <>
            <h3>Currents Bands</h3>

            <table className="table table-stripped">
                <thead>
                    <tr>
                        <th></th>
                        <th>Name</th>
                        <th>Votes</th>
                        <th>Delete</th>
                    </tr>
                </thead>

                <tbody>
                    {createRows()}
                </tbody>
            </table>
        </>
    )
}
