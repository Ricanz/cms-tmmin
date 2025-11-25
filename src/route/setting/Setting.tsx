import React, { Component } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, Outlet } from 'react-router-dom';


interface PropsMain {
    dispatch: any;
    count: any;
}

class Setting extends Component<PropsMain> {

    constructor(props: PropsMain) {
        super(props);
    }

    render() {
        return (
            <div>
                <h1>Setting</h1>
                <Link to={`/setting/changepwd/123`}>Change Profile</Link>
                <Outlet />
            </div>
        );
    }
}

export default (): any => {
    const count = useSelector((state: any) => state.counter.count);
    const dispatch = useDispatch();
    return (
        <div className="App" >
            <Setting dispatch={dispatch} count={count} />
        </div>
    );
};
