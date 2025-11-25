import React, { Component } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Outlet, useNavigate } from 'react-router-dom';
import { changeTitle } from '../../redux/actions/titleAction';
import { Paper } from '@mui/material';
import PersonSearchIcon from '@mui/icons-material/PersonSearch';


interface PropsMain {
    dispatch: any;
    navigate: any;
}
interface StateMain {
}

class Message extends Component<PropsMain, StateMain> {

    constructor(props: PropsMain) {
        super(props);
        this.state = {};
    }

    componentDidMount(): void {
        setTimeout(() => {
            this.props.navigate("/message/all-message");
        }, 100);
    }

    render() {
        return (
            <div className='row fitHeight'>
                <div className='list-message column'>
                    <div className='search-box'>
                        <div className='box-input row aCenter'>
                            <PersonSearchIcon style={{ paddingLeft: 5 }} />
                            <input type='text' placeholder='Search Message' className='expand search-member' />
                        </div>
                    </div>
                    <Paper className='expand overflow'>

                    </Paper>
                    <div style={{ height: 20 }} />
                </div>
                <div className='expand row'>
                    <Outlet />
                </div>
            </div>
        );
    }
}

export default (): any => {
    const count = useSelector((state: any) => state.counter.count);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    return <Message dispatch={dispatch} navigate={navigate} />;
};
