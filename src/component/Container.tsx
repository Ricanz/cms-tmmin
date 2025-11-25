import React, { Component } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, Outlet } from 'react-router-dom';
import Row from './Row';
import Expanded from './Expanded';


interface PropsMain {
    dispatch: any;
    count: any;
}

class Container extends Component<PropsMain> {

    constructor(props: PropsMain) {
        super(props);
    }

    render() {
        return (
            <div className='Container' style={{
                backgroundColor: "red",
                height: '100vh'
            }}>
                <Row>
                    <Expanded>
                        <div>OKE 1</div>
                    </Expanded>
                    <div>OKE 2</div>
                </Row>
            </div>
        );
    }
}

export default (): any => {
    const count = useSelector((state: any) => state.counter.count);
    const dispatch = useDispatch();
    return <Container dispatch={dispatch} count={count} />;
};
