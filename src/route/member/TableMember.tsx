/* eslint-disable import/no-anonymous-default-export */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { Component } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Outlet, useNavigate } from 'react-router-dom';
import { changeTitle } from '../../redux/actions/titleAction';
import TableGenerate from '../../component/TableGenerate';
import { apiDeleteMember, apiGetMembers, apiUpdateMember, exportMember } from '../req/req_member';
import { Button, TextField } from '@mui/material';
import SystemUpdateAltIcon from '@mui/icons-material/SystemUpdateAlt';
import { setProps } from '../../redux/actions/tagManagerAcrion';
import TagComponent from '../../tagging/TagComponent';

interface PropsMain {
    dispatch: any;
    navigate: any;
    type: string;
    tagManager: any;
}
interface StateMain {
    data: any;
    popup: boolean,
    totalRow: number;
    page: number;
    rowsPerPage: number;
    filter: string;
    filter_by: string;
    byCard: string;
    byName: string;
    byEmail: string;
    byDateofbirth: string;
    byCreated1: string;
    byCreated2: string;
}

const config = [
    {
        "field": "memberName",
        "label": "Name",
        "type": "text",
        "default": "",
        "show_in_table": true,
        "show_in_form": true,
        width: 200,
    },
    {
        "field": "memberEmail",
        "label": "Email",
        "type": "text",
        "default": "",
        "show_in_table": true,
        "show_in_form": true
    },
    {
        "field": "memberPhone",
        "label": "Phone",
        "type": "text",
        "default": "",
        "show_in_table": true,
        "show_in_form": true
    },
    {
        "field": "memberCardNo",
        "label": "Nomor Kartu",
        "type": "text",
        "default": "",
        "show_in_table": true,
        "show_in_form": true
    },
    {
        "field": "memberDob",
        "label": "Date Of Birth",
        "type": "date",
        "default": "",
        "show_in_table": true,
        "show_in_form": true
    },
    // {
    //     "field": "firebase_token",
    //     "label": "Firebase Token",
    //     "type": "textarea",
    //     "default": "",
    //     "show_in_table": false,
    //     "show_in_form": false
    // },
    // {
    //     "field": "activation_code",
    //     "label": "Code",
    //     "type": "text",
    //     "default": "",
    //     "show_in_table": false,
    //     "show_in_form": false
    // },
    {
        "field": "memberImage",
        "label": "Profile Photo",
        "type": "upload",
        "default": "",
        "show_in_table": false,
        "show_in_form": false
    },
    {
        "field": "memberActivate",
        "label": "Active User",
        "type": "switch",
        "default": true,
        "show_in_table": false,
        "show_in_form": true
    },
    // {
    //     "field": "deleted_at",
    //     "label": "Delete At",
    //     "type": "date",
    //     "default": "",
    //     "show_in_table": false,
    //     "show_in_form": false
    // },
    // {
    //     "field": "deleted_reason",
    //     "label": "Delete Reason",
    //     "type": "text",
    //     "default": "",
    //     "show_in_table": false,
    //     "show_in_form": false
    // },
    // {
    //     "field": "data_member",
    //     "label": "DATA",
    //     "type": "textarea",
    //     "default": "",
    //     "show_in_table": false,
    //     "show_in_form": false
    // },
    {
        "field": "memberCreatedAt",
        "label": "Created At",
        "type": "date",
        "default": "",
        "show_in_table": false,
        "show_in_form": false
    },
    {
        "field": "memberUpdatedAt",
        "label": "Updated At",
        "type": "date",
        "default": "",
        "show_in_table": false,
        "show_in_form": false
    },
    // {
    //     "field": "status",
    //     "label": "Status",
    //     "type": "switch",
    //     "default": true,
    //     "show_in_table": false,
    //     "show_in_form": true
    // }
];

class TableMember extends Component<PropsMain, StateMain> {

    constructor(props: PropsMain) {
        super(props);
        this.state = {
            data: [],
            popup: false,
            totalRow: 0,
            page: 0,
            rowsPerPage: 10,
            filter: "",
            filter_by: "",
            byCard: "",
            byName: "",
            byEmail: "",
            byDateofbirth: "",
            byCreated1: "",
            byCreated2: "",
        };
    }

    getData() {
        const accessToken = localStorage.getItem('accessToken') ?? "";
        apiGetMembers(accessToken, {
            limit: this.state.rowsPerPage,
            page: this.state.page + 1,
            sort: "DESC",
            sort_by: "memberCreatedAt",
            filter: this.state.filter,
            // filter_by: this.state.filter_by,
            type: this.props.type //"inactive" // active inactive
        }).then(({ code, data, message, status }) => {
            console.log('this.state: ', this.state);
            
            if (code == 200) {
                this.setState({
                    data: data.data,
                    totalRow: data.pagination.totalRecord,
                    page: data.pagination.page === 1 ? 0 : data.pagination.page - 1
                });
            }
        });
    }

    componentDidMount() {
        this.props.dispatch(changeTitle(this.props.type == "all" ? "Data All Member" : (this.props.type == "active" ? "Active Member" : "InActive Member")));
        this.getData();
    }

    render() {
        return (
          <>
            {/* <TagComponent
                    tag="button-ext"
                    children={<button onClick={() => {
                        this.props.dispatch(setProps({ tagManager: "OKEH" }));
                    }}>SAMPLE</button>} /> */}
            <TableGenerate
              field={config.filter((item) => item.show_in_table)}
              data={this.state.data}
              showButtonAdd={false}
              showButtonDelete={true}
              showButtonEdit={true}
              config={config}
              totalRow={this.state.totalRow}
              page={this.state.page}
              rowsPerPage={this.state.rowsPerPage}
              deleteRow={(row) => {
                const accessToken = localStorage.getItem("accessToken") ?? "";
                apiDeleteMember(accessToken, row.memberID).then(() => {
                  this.getData();
                });
              }}
              onPageChanged={(p) => {
                this.setState({ page: p }, () => {
                  this.getData();
                });
              }}
              onRowsPerPageChanged={(p) => {
                this.setState({ rowsPerPage: p }, () => {
                  this.getData();
                });
              }}
              reload={() => {
                this.getData();
              }}
              formEditSubmit={(row, datas) => {
                Object.assign(datas, row);
                apiUpdateMember(datas).then(({ code, status, message }) => {
                  // console.log(code, status, message);
                  this.getData();
                });
              }}
              customButton={[
                {
                  icon: SystemUpdateAltIcon,
                  title: "Export to excel",
                  action: () => {
                    exportMember().then((v) => {
                      // console.log(v);
                    });
                  },
                },
              ]}
              onSearchEnter={(value: string) => {
                this.setState(
                  {
                    filter: value,
                  },
                  () => {
                    this.getData();
                  }
                );
              }}
            />
          </>
        );
    }

}

export default (propt: any): any => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const tagManager = useSelector((state: any) => state.tagManager.props);
    return <TableMember dispatch={dispatch} navigate={navigate} type={propt.type}
        tagManager={tagManager}
    />;
};
