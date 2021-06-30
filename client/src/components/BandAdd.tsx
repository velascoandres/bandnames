import React from 'react'

export const BandAdd: React.FC = () => {
    return (
        <>
            <h3>Add Band</h3>
            <form >
                <input
                    type="text" 
                    className="form-control"
                    placeholder="Nuevo nombre de banda"
                />
            </form>
        </>
    )
}
