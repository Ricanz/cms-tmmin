import React, { Component } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Outlet, useNavigate } from 'react-router-dom';

import { PieChart, Pie, Cell } from 'recharts';

const RADIAN = Math.PI / 180;
const data = [
    { name: 'A', value: 80, color: '#ff0000' },
    { name: 'B', value: 45, color: '#00ff00' },
    { name: 'C', value: 25, color: '#0000ff' },
];
// const cx = 100;
// const cy = 100;
const iR = 50;
const oR = 100;
const value = 90;

const needle = (value: any, data: any, cx: any, cy: any, iR: any, oR: any, color: any) => {
    let total = 0;
    data.forEach((v: any) => {
        total += v.value;
    });
    const ang = 180.0 * (1 - value / total);
    const length = (iR + 2 * oR) / 3;
    const sin = Math.sin(-RADIAN * ang);
    const cos = Math.cos(-RADIAN * ang);
    const r = 5;
    const x0 = cx + 5;
    const y0 = cy + 5;
    const xba = x0 + r * sin;
    const yba = y0 - r * cos;
    const xbb = x0 - r * sin;
    const ybb = y0 + r * cos;
    const xp = x0 + length * cos;
    const yp = y0 + length * sin;

    return [
        <circle cx={x0} cy={y0} r={r} fill={color} stroke="none" />,
        <path d={`M${xba} ${yba}L${xbb} ${ybb} L${xp} ${yp} L${xba} ${yba}`} stroke="#none" fill={color} />,
    ];
};


interface PropsMain {
    dispatch: any;
    navigate: any;
}
interface StateMain {
    value: number;
}

class ServerTrafic extends Component<PropsMain, StateMain> {

    constructor(props: PropsMain) {
        super(props);
        this.state = {
            value: 70,
        };
    }

    componentDidMount(): void {
        // setInterval(() => {
        //     this.setState({
        //         value: (Math.random() * 100)
        //     });
        // }, 1000);
    }

    render() {
        const width = ((window.screen.availWidth - 440) / 3);
        const cx = 170;
        const cy = 100;
        return (
            <PieChart width={width} height={width - 200}>
                <Pie
                    dataKey="value"
                    startAngle={180}
                    endAngle={0}
                    data={data}
                    cx={cx}
                    cy={cy}
                    innerRadius={iR}
                    outerRadius={oR}
                    fill="#8884d8"
                    stroke="none"
                >
                    {data.map((entry, index) => (
                        <Cell key={`cells-${index}`} fill={entry.color} />
                    ))}
                </Pie>
                {needle(this.state.value, data, cx, cy, iR, oR, '#d0d000')}
            </PieChart>
        );
    }
}

export default (): any => {
    const count = useSelector((state: any) => state.counter.count);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    return <ServerTrafic dispatch={dispatch} navigate={navigate} />;
};
