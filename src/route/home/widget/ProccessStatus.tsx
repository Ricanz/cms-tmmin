import React, { Component } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Outlet, useNavigate } from 'react-router-dom';
import GaugeChart from "react-gauge-chart";


interface PropsMain {
    dispatch: any;
    navigate: any;
}
interface StateMain {
}

class ProccessStatus extends Component<PropsMain, StateMain> {

    constructor(props: PropsMain) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <div>
                <GaugeChart id="gauge-chart4"
                    nrOfLevels={10}
                    arcPadding={0.1}
                    cornerRadius={3}
                    percent={0.6}
                    textColor={'black'}
                />
            </div>
        );
    }
}

export default (): any => {
    const count = useSelector((state: any) => state.counter.count);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    return <ProccessStatus dispatch={dispatch} navigate={navigate} />;
};
