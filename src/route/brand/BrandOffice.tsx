import React, { Component } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Outlet, useNavigate } from 'react-router-dom';
import { changeTitle } from '../../redux/actions/titleAction';
import TableGenerate from '../../component/TableGenerate';
import { apiGetMembers, apiUpdateMember } from '../req/req_member';
import { addBranch, deleteBranch, getBranch, updateBranch } from '../req/req_branc';

interface PropsMain {
    dispatch: any;
    navigate: any;
    type: string;
}
interface StateMain {
    data: any;
    popup: boolean,
    totalRow: number;
}

const config = [
    {
        "field": "address",
        "label": "Address",
        "type": "textarea",
        "default": "",
        "show_in_table": true,
        "show_in_form": true,
        width: 400,
    },
    {
        "field": "city",
        "label": "City",
        "type": "text",
        "default": "",
        "show_in_table": true,
        "show_in_form": true,
        width: 200,
    },
    {
        "field": "email",
        "label": "Email",
        "type": "text",
        "default": "",
        "show_in_table": true,
        "show_in_form": true,
        width: 200,
    },
    {
        "field": "fax",
        "label": "Fax",
        "type": "text",
        "default": "",
        "show_in_table": true,
        "show_in_form": true,
        width: 200,
    },
    {
        "field": "phone",
        "label": "Phone",
        "type": "text",
        "default": "",
        "show_in_table": true,
        "show_in_form": true,
        width: 200,
    },
];

class BrandOffice extends Component<PropsMain, StateMain> {

    constructor(props: PropsMain) {
        super(props);
        this.state = {
            data: [],
            popup: false,
            totalRow: 50,
        };
    }

    getData() {
        getBranch().then((data) => {
            this.setState({ data: data.data, totalRow: data.data.length });
        });
    }

    componentDidMount() {
        this.props.dispatch(changeTitle("Branch Office"));
        this.getData();
    }

    render() {
        return (
            <>
                <TableGenerate
                    field={config.filter(item => item.show_in_table)}
                    data={this.state.data}
                    showButtonAdd={true}
                    rowsPerPage={50}
                    totalRow={this.state.totalRow}
                    showButtonDelete={true}
                    config={config}
                    reload={() => {
                        this.getData();
                    }}
                    formAddSubmit={(value) => {
                        addBranch(value).then(() => {
                            this.getData();
                        });
                    }}
                    formEditSubmit={(value, row) => {
                        updateBranch({ ...value, id: row.id }).then(() => {
                            this.getData();
                        });
                    }}
                    deleteRow={(row) => {
                        deleteBranch(row.id).then(() => {
                            this.getData();
                        });
                    }}
                />
            </>
        );
    }

}

export default (propt: any): any => {
    const count = useSelector((state: any) => state.counter.count);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    return <BrandOffice dispatch={dispatch} navigate={navigate} type={propt.type} />;
};
