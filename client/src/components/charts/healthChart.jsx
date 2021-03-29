import React from 'react'
import { defaults, HorizontalBar, } from 'react-chartjs-2';
import { useSelector } from 'react-redux'

defaults.global.tooltips.enabled = false;


const HealthChart = () => {
    const healthObj = useSelector((state)=> state.chartReducer.healthInfo)
    return (
        <div>

            <HorizontalBar
                data={
                    {
                        labels: ['อาหารเช้า', 'เสื้อผ้า', 'ศรีษะ', 'หู/ใบหู', 'เล็บ', 'ผิวหนัง', 'วัดไข้', 'ร่องรอยบาดแผล'],
                        datasets: [{
                            label: 'ปกติ',
                            data: healthObj.ok,
                            backgroundColor: 'rgb(73,199,116,0.2)',
                            borderColor: 'rgb(73,199,116,1)',
                            borderWidth: 1,
                            maxBarThickness: 50,
                        },
                        {
                            label: 'ไม่ปกติ',
                            data: healthObj.notOk,
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
                                    max: healthObj.total
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
export default HealthChart;
