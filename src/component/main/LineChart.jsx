import React from 'react'
import { color } from 'utils'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import main_mock from '../../mock/main'

import styles from './LineChart.less'

class LineCharts extends React.Component{
    constructor(props) {
        super(props)
    }
    render(){
        return (
            <div className={styles.LineChart}>
                <div>
                    hello charts
                </div>
                <ResponsiveContainer minHeight={360} className={styles.LineChart}>
                    <LineChart width={730} height={250} data={main_mock.data}
                        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                        <XAxis dataKey="name" axisLine={{ stroke: color.borderBase, strokeWidth: 1 }} tickLine={false} />
                        <YAxis axisLine={false} tickLine={false} />
                        <CartesianGrid vertical={false} stroke={color.borderBase} strokeDasharray="5 5" />
                        <Tooltip />
                        <Legend verticalAlign="top"
                            content={(prop) => {
                            const { payload } = prop
                            return (<ul className={styles.legend}>
                                {payload.map((item, key) => <li key={key}><span className='radiusdot' style={{ background: item.color }} />{item.value}</li>)}
                            </ul>)
                            }}
                        />
                        <Line type="monotone" dataKey="Food" stroke={color.purple} strokeWidth={3} dot={{ fill: color.purple }} activeDot={{ r: 5, strokeWidth: 0 }} />
                        <Line type="monotone" dataKey="Clothes" stroke={color.red} strokeWidth={3} dot={{ fill: color.red }} activeDot={{ r: 5, strokeWidth: 0 }} />
                        <Line type="monotone" dataKey="Electronics" stroke={color.green} strokeWidth={3} dot={{ fill: color.green }} activeDot={{ r: 5, strokeWidth: 0 }} />
                    </LineChart>
                </ResponsiveContainer>
                
            </div>
            
        )
    }
}

export default LineCharts