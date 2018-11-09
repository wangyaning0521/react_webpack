import React from 'react'
import { LineChart,  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Area, AreaChart, Line } from 'recharts'

import styles from './AreaChart.less'

const data = [
    {name: '王小小', '年收入': 4000, '日收入': 2400, '总收入': 2400},
    {name: '亚小小', '年收入': 3000, '日收入': 1398, '总收入': 2210},
    {name: '宁小小', '年收入': 2000, '日收入': 9800, '总收入': 2290},
    {name: '邸小小', '年收入': 2780, '日收入': 3908, '总收入': 2000},
    {name: '丹小小', '年收入': 1890, '日收入': 4800, '总收入': 2181},
    {name: '哈小小', '年收入': 2390, '日收入': 3800, '总收入': 2500},
    {name: '哈小小', '年收入': 3490, '日收入': 4300, '总收入': 2100},
];

class AreaChartPage extends React.Component{
    constructor( props ){
        super( props )
    }
    render(){
        return (
            <ResponsiveContainer minHeight={360} >
                <AreaChart width={730} height={250} data={data}
                    margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                    <defs>
                        <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>
                            <stop offset="95%" stopColor="#8884d8" stopOpacity={0}/>
                        </linearGradient>
                        <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8}/>
                            <stop offset="95%" stopColor="#82ca9d" stopOpacity={0}/>
                        </linearGradient>
                    </defs>
                    <XAxis dataKey="name" axisLine={false}/>
                    <YAxis axisLine={false} tickLine={false}/>
                    <CartesianGrid strokeDasharray="3 3" />
                    <Tooltip />
                    <Legend verticalAlign="top"
                        content={(prop) => {
                        const { payload } = prop
                        return (<ul className={styles.AreaChartName}>
                            {payload.map((item, key) => <li key={key}><span className='radiusdot' style={{ background: item.color }} />{item.value}</li>)}
                        </ul>)
                        }}
                    />
                    <Area type="monotone" dataKey="年收入" stroke="#8884d8" fillOpacity={1} fill="url(#colorUv)" />
                    <Area type="monotone" dataKey="日收入" stroke="#82ca9d" fillOpacity={1} fill="url(#colorPv)" />
                    <Area type="monotone" dataKey="总收入" stroke="#82ca9d" fillOpacity={1} fill="url(#colorPv)" />
                </AreaChart>
            </ResponsiveContainer>
        )
    }
}
export default AreaChartPage