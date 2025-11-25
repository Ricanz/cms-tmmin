import React, { Component } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, Outlet } from 'react-router-dom';
import Row from './Row';


interface PropsMain {
    child: any;
    dispatch: any;
    count: any;
}

class Expanded extends Component<PropsMain> {

    constructor(props: PropsMain) {
        super(props);
    }

    render() {
        return (
            <div className='Expanded' style={{
                flex: 1,
            }}>
                {this.props.child}
            </div>
        );
    }
}

export default (props: any): any => {
    const count = useSelector((state: any) => state.counter.count);
    const dispatch = useDispatch();
    return <Expanded dispatch={dispatch} count={count} child={props.children} />;
};
