import React  from 'react'
import {  defaults, HorizontalBar, } from 'react-chartjs-2';
import { useSelector } from 'react-redux'
defaults.global.tooltips.enabled = false;


const AttandanceChart = () => {
    const attendObj = useSelector((state)=> state.chartReducer.attendInfo)
    return (
        <div>

            <HorizontalBar
                data={
                    {

                        labels: ['เช็คชื่อ'],
                        datasets: [
                            {
                                label: 'มาเรียน',
                                data: attendObj.attendInfo,
                                backgroundColor: 'rgb(73,199,116,0.2)',
                                borderColor: 'rgb(73,199,116,1)',
                                borderWidth: 1,
                                maxBarThickness: 50,

                            },
                            {
                                label: 'ไม่มาเรียน',
                                data: attendObj.absentInfo,
                                backgroundColor: 'rgb(242,71,103,0.2)',
                                borderColor: 'rgb(242,71,103,1)',
                                borderWidth: 1,
                                maxBarThickness: 50,

                            }
                        ],
                    }
                }
                height={400}
                width={600}
                options={{
                    maintainAspectRatio: false,
                    scales: {
                        xAxes: [
                            {
                                stacked: true,
                                ticks: {
                                    beginAtZero: true,
                                    max: attendObj.total,
                                    
                                }
                            }
                        ],
                        yAxes: [
                            {
                                stacked: true,
                            }
                        ]
                    }
                }}
            />
        </div>
    )
}
export default AttandanceChart;
