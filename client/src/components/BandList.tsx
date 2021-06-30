import React, { useContext, useEffect, useState } from 'react'
import { SocketContext } from '../context/SocketContext';
import { IBand } from '../interfaces/band.interface';



export const BandList: React.FC = () => {

    

    const [bandCollection, setBandCollection] = useState<IBand[]>([]);

    useEffect(() => {
        setBandCollection(bandCollection);
    }, [bandCollection]);

    const { socket } = useContext(SocketContext);

    useEffect(() => {

        socket.on(
          'current-bands', (bands: IBand[]) => {
            setBandCollection(bands);
          },
        );
    
      }, [socket]);

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

    const voteBand = (id: string) => {
        socket.emit('vote-band', { id });
    }

    const deleteBand = (id: string) => {
        socket.emit('delete-band', { id });
    }

    const changeName = (id: string, name: string) => {
        socket.emit('change-band-name', { id, name });
    }


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
