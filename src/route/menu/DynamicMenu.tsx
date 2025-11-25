import React, { Component } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Outlet, useNavigate } from 'react-router-dom';
import { changeTitle } from '../../redux/actions/titleAction';
import TableGenerate from '../../component/TableGenerate';
import { apiGetMembers, apiUpdateMember } from '../req/req_member';
import CategoryIcon from '@mui/icons-material/Category';
import { apiDeleteDinMenu, apiGetDinMenu, apiUpdateDinMenu } from '../req/req_dinmenu';
import { Switch } from '@mui/material';

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
        "field": "name",
        "label": "Dynamic Menu Name",
        "type": "text",
        "default": "",
        "show_in_table": true,
        "show_in_form": true,
        width: 200,
    },
    {
        "field": "created_at",
        "label": "Created Date",
        "type": "date",
        "default": "",
        "show_in_table": true,
        "show_in_form": false,
    },
    {
        "field": "is_active",
        "label": "Is Active",
        "type": "date",
        "default": "",
        "show_in_table": true,
        "show_in_form": true,
        "element": (val, row, self) => {
            return (
                <div>
                    <Switch
                        checked={val}
                        onChange={(e) => {
                            delete row["created_at"];
                            row.is_active = e.target.checked;
                            apiUpdateDinMenu(row).then(() => {
                                self.props.reload();
                            });
                        }}
                    />
                </div>
            );
        }
    },
    {
        "field": "icon",
        "label": "Icon",
        "type": "photo",
        "default": "",
        "show_in_table": false,
        "show_in_form": true,
    },
    {
        "field": "image",
        "label": "Image",
        "type": "photo",
        "default": "",
        "show_in_table": false,
        "show_in_form": true,
    },
    {
        "field": "content",
        "label": "Content",
        "type": "content",
        "default": "",
        "show_in_table": false,
        "show_in_form": true,
    },
];

const fixedData = [
    // {
    //     "name": "Corporate Profile",
    //     "created_at": "-",
    //     "is_active": false,
    // },
    // {
    //     "name": "Our Product",
    //     "created_at": "-",
    //     "is_active": false,
    // },
    // {
    //     "name": "Branch Office",
    //     "created_at": "-",
    //     "is_active": false,
    // },
    // {
    //     "name": "Contact Us",
    //     "created_at": "-",
    //     "is_active": false,
    // },
];

class DynamicMenu extends Component<PropsMain, StateMain> {

    constructor(props: PropsMain) {
        super(props);
        this.state = {
            data: [],
            popup: false,
        };
    }

    getData() {
        apiGetDinMenu().then((data) => {
            this.setState({ data: [...data.data, ...fixedData] });
        });
    }

    componentDidMount() {
        this.props.dispatch(changeTitle("Dynamic Menu"));
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
                    reload={() => {
                        this.getData();
                    }}
                    deleteRow={(row) => {
                        if (row.content.indexOf("direct:") > 0) {
                        } else {
                            apiDeleteDinMenu(row.id).then(() => {
                                this.getData();
                            });
                        }
                    }}
                    add={() => this.props.navigate("/dynamicmenu-add")}
                    edit={(row) => {
                        // this.props.navigate("/dynamicmenu-edit", { state: row });
                        if (row.content.indexOf("direct:") > 0) {
                            const route = row.content.split("direct:")[1].split("|||")[0];
                            console.log(route);
                            this.props.navigate(route);
                        } else {
                            this.props.navigate("/dynamicmenu-edit", { state: row });
                        }
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
    return <DynamicMenu dispatch={dispatch} navigate={navigate} type={propt.type} />;
};
