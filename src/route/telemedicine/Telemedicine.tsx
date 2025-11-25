import React, { Component } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Outlet, useNavigate } from 'react-router-dom';
import { changeTitle } from '../../redux/actions/titleAction';
import TableGenerate from '../../component/TableGenerate';
import { apiGetMembers, apiUpdateMember } from '../req/req_member';
import CategoryIcon from '@mui/icons-material/Category';
import { apiAddTelemedicine, apiDeleteTelemedicine, apiGetTelemedicine, apiUpdateTelemedicine } from '../req/req_telemedicine';

interface PropsMain {
    dispatch: any;
    navigate: any;
    type: string;
}
interface StateMain {
    data: any;
    popup: boolean,
}

function formatDate(input) {
    const parsedDate = new Date(input);
    const year = parsedDate.getUTCFullYear();
    const month = String(parsedDate.getUTCMonth() + 1).padStart(2, '0'); // Bulan dimulai dari 0 di JavaScript
    const day = String(parsedDate.getUTCDate()).padStart(2, '0');
    const hours = String(parsedDate.getUTCHours()).padStart(2, '0');
    const minutes = String(parsedDate.getUTCMinutes()).padStart(2, '0');

    return `${year}-${month}-${day} ${hours}:${minutes}`;
}

const config = [
    {
        "field": "icon",
        "label": "Icon",
        "type": "photo",
        "default": "",
        "show_in_table": true,
        "show_in_form": true,
        width: 50,
        "element": (value, row, self) => {
            return (
                <div style={{
                    width: 30,
                    height: 30,
                    marginLeft: 10,
                    backgroundImage: `url(${value})`,
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "cover"
                }} />
            );
        },
    },
    {
        "field": "link",
        "label": "Link",
        "type": "text",
        "default": "",
        "show_in_table": true,
        "show_in_form": true,
        width: 200,
        "element": (value, row, self) => {
            return (
                <a target='_blank' href={value}>{value}</a>
            );
        },
    },
    {
        "field": "name",
        "label": "Name",
        "type": "text",
        "default": "",
        "show_in_table": true,
        "show_in_form": true,
        width: 300,
    },
    {
        "field": "is_active",
        "label": "Active",
        "type": "switch",
        "default": "",
        "show_in_table": true,
        "show_in_form": true,
        "element": (value, row, self) => {
            return value ? "Active" : "Non Active";
        },
    },
];

class Telemedicine extends Component<PropsMain, StateMain> {

    constructor(props: PropsMain) {
        super(props);
        this.state = {
            data: [],
            popup: false,
        };
    }

    getData() {
        apiGetTelemedicine({}).then((data: any) => {
            this.setState({ data: data.data });
        });
    }

    componentDidMount() {
        this.props.dispatch(changeTitle("Telemedicine"));
        this.getData();
    }

    render() {
        return (
            <>
                <TableGenerate
                    field={config.filter(item => item.show_in_table)}
                    data={this.state.data}
                    showButtonAdd={true}
                    showButtonDelete={true}
                    config={config}
                    formAddSubmit={(value) => {
                        apiAddTelemedicine(value).then(() => {
                            this.getData();
                        });
                    }}
                    formEditSubmit={(value, row) => {
                        apiUpdateTelemedicine({
                            ...value,
                            id: row.id
                        }).then(() => {
                            this.getData();
                        });
                    }}
                    deleteRow={(row) => {
                        apiDeleteTelemedicine(row.id).then(() => {
                            this.getData();
                        });
                    }}
                    reload={() => {
                        this.getData();
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
    return <Telemedicine dispatch={dispatch} navigate={navigate} type={propt.type} />;
};
