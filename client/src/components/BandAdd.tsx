import React, { useContext, useState } from 'react'
import { SocketContext } from '../context/SocketContext';
import { ISocketContext } from '../interfaces/socketContext.interface';




export const BandAdd: React.FC = () => {


    const [name, setName] = useState<string>();
    const { socket } = useContext<ISocketContext>(SocketContext);


    const onSubmit = (e: React.ChangeEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (name && name.trim().length > 0) {
            // addBand(name);
            socket.emit('add-band', { name });
            setName('');
        }
    };


    return (
        <>
            <h3>Add Band</h3>
            <form onSubmit={onSubmit}>
                <input
                    type="text"
                    name="name"
                    className="form-control"
                    placeholder="Nuevo nombre de banda"
                    value={name}
                    onChange={(ev) => setName(ev.target.value)}
                />
            </form>
        </>
    );
}
