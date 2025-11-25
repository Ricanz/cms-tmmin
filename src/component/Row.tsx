import React, { Component } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, Outlet } from 'react-router-dom';


interface PropsMain {
    child: any;
    dispatch: any;
    count: any;
}

class Row extends Component<PropsMain> {

    constructor(props: PropsMain) {
        super(props);
    }

    render() {
        return (
            <div className='Row' style={{
                backgroundColor: "blue",
                display: "flex",
                flexDirection: "row"
            }}>
                {this.props.child}
            </div>
        );
    }
}

export default (props: any): any => {
    const count = useSelector((state: any) => state.counter.count);
    const dispatch = useDispatch();
    return <Row dispatch={dispatch} count={count} child={props.children} />;
};
