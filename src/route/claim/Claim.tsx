import React, { Component } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Outlet, useNavigate } from 'react-router-dom';
import { changeTitle } from '../../redux/actions/titleAction';
import TableGenerate from '../../component/TableGenerate';
import { apiGetMembers, apiUpdateMember } from '../req/req_member';
import CategoryIcon from '@mui/icons-material/Category';
import { Button, TextField } from '@mui/material';
import SystemUpdateAltIcon from '@mui/icons-material/SystemUpdateAlt';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';

interface PropsMain {
    dispatch: any;
    navigate: any;
    type: string;
}
interface StateMain {
    data: any;
    popup: boolean,
}

const config = [
    {
        "field": "reg",
        "label": "No. Registrasi",
        "type": "text",
        "default": "",
        "show_in_table": true,
        "show_in_form": true,
        width: 100,
    },
    {
        "field": "member",
        "label": "Member ID",
        "type": "upload",
        "default": "",
        "show_in_table": true,
        "show_in_form": true,
        width: 100,
    },
    {
        "field": "name",
        "label": "Name",
        "type": "upload",
        "default": "",
        "show_in_table": true,
        "show_in_form": true,
        width: 200,
    },
    {
        "field": "createDate",
        "label": "Create Date",
        "type": "upload",
        "default": "",
        "show_in_table": true,
        "show_in_form": true,
        width: 100,
    },
    {
        "field": "status",
        "label": "Verification Status",
        "type": "upload",
        "default": "",
        "show_in_table": true,
        "show_in_form": true,
    },
];

class Claim extends Component<PropsMain, StateMain> {

    constructor(props: PropsMain) {
        super(props);
        this.state = {
            data: [],
            popup: false,
        };
    }

    componentDidMount() {
        this.props.dispatch(changeTitle("Claim"));
    }

    render() {
        return (
            <>
                <TableGenerate
                    field={config.filter(item => item.show_in_table)}
                    data={this.state.data}
                    showButtonAdd={false}
                    showButtonDelete={false}
                    config={config}
                    reload={() => {

                    }}
                    formEditSubmit={(row, datas) => {
                        Object.assign(datas, row)
                        apiUpdateMember(datas).then(({ code, status, message }) => {

                        });
                    }}
                    customButton={[
                        {
                            icon: SystemUpdateAltIcon,
                            title: "Export to excel",
                            action: () => { }
                        },
                        {
                            icon: FormatListBulletedIcon,
                            title: "List Document",
                            action: () => { }
                        },
                    ]}
                    filterElement={
                        <div className='column'>
                            <div className='row'>
                                <TextField label={"Filter By Register Number"} fullWidth InputLabelProps={{ shrink: true }} />
                                <div style={{ width: 5 }} />
                                <TextField label={"Filter By Name"} fullWidth InputLabelProps={{ shrink: true }} />
                                <div style={{ width: 5 }} />
                                <TextField label={"Filter By Member ID"} fullWidth InputLabelProps={{ shrink: true }} />
                            </div>
                            <div className='row' style={{ marginTop: 20 }}>
                                <TextField type="datetime-local" label={"Start Date"} fullWidth InputLabelProps={{ shrink: true }} style={{ width: 250 }} />
                                <div style={{ width: 5 }} />
                                <TextField type="datetime-local" label={"End Date"} fullWidth InputLabelProps={{ shrink: true }} style={{ width: 250 }} />
                            </div>
                            <div style={{ marginTop: 10, justifyContent: "flex-start", display: "flex" }}>
                                <Button variant='contained' onClick={() => { }}>Find</Button>
                            </div>
                        </div>
                    }
                />
            </>
        );
    }

}

export default (propt: any): any => {
    const count = useSelector((state: any) => state.counter.count);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    return <Claim dispatch={dispatch} navigate={navigate} type={propt.type} />;
};
