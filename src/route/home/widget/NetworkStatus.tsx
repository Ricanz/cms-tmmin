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

class NetworkStatus extends Component<PropsMain, StateMain> {

    constructor(props: PropsMain) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <div>
                <GaugeChart
                    id="gauge-chart3"
                    nrOfLevels={3}
                    colors={["green", "orange", "red"]}
                    arcWidth={0.3}
                    percent={0.37}
                    textColor={'black'}
                // hideText={true} // If you want to hide the text
                />
            </div>
        );
    }
}

export default (): any => {
    const count = useSelector((state: any) => state.counter.count);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    return <NetworkStatus dispatch={dispatch} navigate={navigate} />;
};
