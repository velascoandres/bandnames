import React, { useContext, useEffect, useState } from 'react'
import { Chart, ChartConfiguration, registerables } from 'chart.js';
import { IBand } from '../interfaces/band.interface';
import { SocketContext } from '../context/SocketContext';
Chart.register(...registerables);

let myChart: Chart;

export const BandChart: React.FC = () => {

    const { socket } = useContext(SocketContext);
    const [bands, setBands] = useState<IBand[]>([])

    useEffect(() => {
        socket.on(
            'current-bands',
            (bands: IBand[]) => {
                setBands(bands)
            }
        );

        return () => {
            socket.off('current-bands');
        }
    }, [socket]);


    useEffect(() => {
        createChart(bands);
    }, [bands])


    const createChart = (bands: IBand[]) => {
        const labels = bands.map(
            band => band.name,
        );
        const votes = bands.map(
            band => band.votes,
        );
        const config: ChartConfiguration<'bar', number[], any> = {
            data: {
                labels,
                datasets: [
                    {
                        label: 'Band Chart',
                        data: votes,
                        backgroundColor: [
                            'rgba(255, 99, 132, 0.2)',
                            'rgba(54, 162, 235, 0.2)',
                            'rgba(255, 206, 86, 0.2)',
                            'rgba(75, 192, 192, 0.2)',
                            'rgba(153, 102, 255, 0.2)',
                            'rgba(255, 159, 64, 0.2)'
                        ],
                        borderColor: [
                            'rgba(255, 99, 132, 1)',
                            'rgba(54, 162, 235, 1)',
                            'rgba(255, 206, 86, 1)',
                            'rgba(75, 192, 192, 1)',
                            'rgba(153, 102, 255, 1)',
                            'rgba(255, 159, 64, 1)'
                        ],
                        borderWidth: 1
                    }
                ],
            },
            type: 'bar',
            options: {
                animation: false,
                indexAxis: 'y',
            },
        };
        const ctx = document.getElementById('myChart') as HTMLCanvasElement;
        if (typeof myChart !== 'undefined') {
            myChart.destroy();
        }
        myChart = new Chart(
            ctx,
            config,
        );
    }



    return (
        <div>
            <canvas
                id="myChart"
            >
            </canvas>
        </div>

    );
}
