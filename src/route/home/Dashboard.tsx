import { Paper, Typography } from '@mui/material';
import React, { Component } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Outlet, useNavigate } from 'react-router-dom';
import Visitor from './widget/Visitor';
import Register from './widget/Register';
import Engagment from './widget/Engagment';
import Installed from './widget/Installed';
import ServerTrafic from './widget/ServerTrafic';
import NetworkStatus from './widget/NetworkStatus';
import ProccessStatus from './widget/ProccessStatus';
import { changeTitle } from '../../redux/actions/titleAction';


interface PropsMain {
    dispatch: any;
    navigate: any;
}
interface StateMain {
}

class Dashboard extends Component<PropsMain, StateMain> {

    constructor(props: PropsMain) {
        super(props);
        this.state = {};
    }

    componentDidMount(): void {
        this.props.dispatch(changeTitle(""));
    }

    render() {
        return null;
    }

    render2() {
        const width = (window.screen.availWidth - 440) / 2;
        const width2 = (window.screen.availWidth - 440) / 3;
        return (
            <div className='column'>
                <div className='row' style={{ paddingRight: 20 }}>
                    <div className='expand'>
                        <Paper className='widget column slide-in-animation-1' style={{ height: 150, width: width2, overflow: "hidden" }}>
                            <div className='title-widget-2'><Typography variant='body2'>Hardware Usage</Typography></div>
                            <div className='expand' style={{ position: "relative" }}>
                                <NetworkStatus />
                            </div>
                        </Paper>
                    </div>
                    <div className='expand'>
                        <Paper className='widget column slide-in-animation-2' style={{ height: 150 }}>
                            <div className='title-widget-2'><Typography variant='body2'>Network Trafic</Typography></div>
                            <div className='expand' style={{ position: "relative", overflow: "hidden" }}>
                                <ProccessStatus />
                            </div>
                        </Paper>
                    </div>
                    <div className='expand'>
                        <Paper className='widget column  slide-in-animation-3' style={{ height: 150 }}>
                            <div className='title-widget-2'><Typography variant='body2'>Proccess Status</Typography></div>
                            <div className='expand' style={{ position: "relative", overflow: "hidden" }}>
                                <NetworkStatus />
                            </div>
                        </Paper>
                    </div>
                </div>
                <div className='list-widget' style={{ paddingRight: 20 }}>
                    <Paper className='widget column slide-in-up-animation-1' style={{ width: width, height: width - 150 }}>
                        <div className='title-widget'><Typography variant='body2'>Visitor</Typography></div>
                        <div className='expand' style={{}}>
                            <Visitor />
                        </div>
                    </Paper>
                    <Paper className='widget column slide-in-up-animation-2' style={{ width: width, height: width - 150 }}>
                        <div className='title-widget'><Typography variant='body2'>Register</Typography></div>
                        <div className='expand' style={{}}>
                            <Register />
                        </div>
                    </Paper>
                    <Paper className='widget column slide-in-up-animation-3' style={{ width: width, height: width - 150 }}>
                        <div className='title-widget'><Typography variant='body2'>Installed</Typography></div>
                        <div className='expand' style={{}}>
                            <Installed />
                        </div>
                    </Paper>
                    <Paper className='widget column slide-in-up-animation-4' style={{ width: width, height: width - 150 }}>
                        <div className='title-widget'><Typography variant='body2'>Engagment</Typography></div>
                        <div className='expand' style={{}}>
                            <Engagment />
                        </div>
                    </Paper>
                </div>
            </div>
        );
    }
}

export default (): any => {
    const count = useSelector((state: any) => state.counter.count);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    return <Dashboard dispatch={dispatch} navigate={navigate} />;
};
