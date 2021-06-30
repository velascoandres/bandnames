import React from 'react'

export const BandList: React.FC = () => {

    const createRows = () => {
        return (
            <tr>
                <td>
                    <button className="btn btn-primary"> +1 </button>
                </td>
                <td>
                    <input
                        className="form-control"
                    />
                </td>
                <td>
                    <h3>15</h3>
                </td>
                <td>
                    <button className="btn btn-danger"> Delete </button>
                </td>
            </tr>
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
