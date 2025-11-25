import React, { Component } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Outlet, useNavigate } from 'react-router-dom';
import TableGenerate from '../component/TableGenerate';
import { changeTitle } from '../redux/actions/titleAction';

const dataSample = [
    
];

interface PropsMain {
    dispatch: any;
    navigate: any;
}
interface StateMain {
}

class Banner extends Component<PropsMain, StateMain> {

    constructor(props: PropsMain) {
        super(props);
        this.state = {};
    }

    componentDidMount(): void {
        this.props.dispatch(changeTitle("Data Banner"));
    }


    render() {
        return <TableGenerate 
            field={[
                { label: "Title", width: 100, field: "title" },
                { label: "Url", field: "url" },
                { label: "Active", field: "active" },
                { label: "Image", field: "image" },
            ]}
            data={dataSample}
        />
    }
}

export default (): any => {
    const count = useSelector((state: any) => state.counter.count);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    return <Banner dispatch={dispatch} navigate={navigate} />;
};
