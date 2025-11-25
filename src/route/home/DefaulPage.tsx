import React, { Component } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Outlet, useNavigate } from 'react-router-dom';


interface PropsMain {
    dispatch: any;
    navigate: any;
}
interface StateMain {
}

class DefaulPage extends Component<PropsMain, StateMain> {

    constructor(props: PropsMain) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <div>
                <h1>DefaulPage </h1>
                <Outlet />
            </div>
        );
    }
}

export default (): any => {
    const count = useSelector((state: any) => state.counter.count);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    return <DefaulPage dispatch={dispatch} navigate={navigate} />;
};
