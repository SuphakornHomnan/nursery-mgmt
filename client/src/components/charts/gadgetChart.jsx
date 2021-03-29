import React from 'react'
import { defaults, HorizontalBar, } from 'react-chartjs-2';
import { useSelector } from 'react-redux'

defaults.global.tooltips.enabled = false;


const GadgetChart = () => {
    const gadgetObj = useSelector((state)=> state.chartReducer.gadgetInfo)
    return (
        <div>

            <HorizontalBar
                data={
                    {
                        labels: ['นม', 'แพมเพิส', 'ขวดน้ำ', 'ขวดนม', 'ผ้าขนหนู'],
                        datasets: [{
                            label: 'นำมา',
                            data: gadgetObj.ok,
                            backgroundColor: 'rgb(73,199,116,0.2)',
                            borderColor: 'rgb(73,199,116,1)',
                            borderWidth: 1,
                            maxBarThickness: 50,
                        },
                        {
                            label: 'ไม่นำได้มา',
                            data: gadgetObj.notOk,
                            backgroundColor: 'rgb(242,71,103,0.2)',
                            borderColor: 'rgb(242,71,103,1)',
                            borderWidth: 1,
                            maxBarThickness: 50,
                        },

                        ]
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
                                    max: gadgetObj.total
                                },
                                
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
export default GadgetChart;
