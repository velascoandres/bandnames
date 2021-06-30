import React, { useState } from 'react'

export type BandAddProps = {
    addBand: (name: string) => void;
};


export const BandAdd: React.FC<BandAddProps> = ({addBand}: BandAddProps) => {


    const [name, setName] = useState<string>();
    
    const onSubmit = (e: React.ChangeEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (name && name.trim().length > 0){
            addBand(name);
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
