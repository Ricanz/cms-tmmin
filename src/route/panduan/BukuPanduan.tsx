import React, { Component } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Outlet, useNavigate } from 'react-router-dom';
import { changeTitle } from '../../redux/actions/titleAction';
import TableGenerate from '../../component/TableGenerate';
import { apiGetMembers, apiUpdateMember } from '../req/req_member';
import { Button, TextField } from '@mui/material';
import { apiAddPanduan, apiDeletePanduan, apiGetPanduan, apiUpdatePanduan } from '../req/req_panduan';

interface PropsMain {
    dispatch: any;
    navigate: any;
    type: string;
}

const config = [
    {
        "field": "polis_number",
        "label": "Polish Number",
        "type": "text",
        "default": "",
        "show_in_table": true,
        "show_in_form": true,
        width: 200,
    },
    {
        "field": "polis_file",
        "label": "File Buku Polis",
        "type": "docpdf",
        "default": "",
        "show_in_table": true,
        "show_in_form": true,
    },
    {
        "field": "polis_filename",
        "label": "File Name",
        "type": "text",
        "default": "",
        "show_in_table": true,
        "show_in_form": true,
    },
    {
        "field": "created_at",
        "label": "Created Date",
        "type": "date",
        "default": "",
        "show_in_table": true,
        "show_in_form": false,
    },
];

interface StateMain {
    data: any;
    popup: boolean,
    totalRow: number;
    page: number;
    rowsPerPage: number;
}

class BukuPanduan extends Component<PropsMain, StateMain> {

    constructor(props: PropsMain) {
        super(props);
        this.state = {
            data: [],
            popup: false,
            totalRow: 0,
            page: 0,
            rowsPerPage: 10,
        };
    }

    getData() {
        apiGetPanduan({
            "limit": this.state.rowsPerPage,
            "page": this.state.page + 1,
            "sort": "DESC",
            "sort_by": "created_at",
            "filter": "" // search by polis_number ex "SOMPOTES2019"
        }).then((data) => {
            this.setState({ data: data.data.result, totalRow: data.data.total });
        });
    }

    componentDidMount() {
        this.props.dispatch(changeTitle("Buku Panduan"));
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
                    totalRow={this.state.totalRow}
                    page={this.state.page}
                    rowsPerPage={this.state.rowsPerPage}
                    reload={() => {
                        this.getData();
                    }}
                    formAddSubmit={(value) => {
                        apiAddPanduan(value).then(() => {
                            this.getData();
                        });
                    }}
                    formEditSubmit={(value, row) => {
                        apiUpdatePanduan({ ...value, id: row.id }).then(() => {
                            this.getData();
                        });
                    }}
                    onPageChanged={(p) => {
                        this.setState({ page: p }, () => this.getData());
                    }}
                    onRowsPerPageChanged={(p) => {
                        this.setState({ rowsPerPage: p }, () => this.getData());
                    }}
                    deleteRow={(row) => {
                        apiDeletePanduan(row.id).then(() => {
                            this.getData();
                        });
                    }}
                // formEditSubmit={(row, datas) => {
                //     Object.assign(datas, row)
                //     apiUpdateMember(datas).then(({ code, status, message }) => {
                //         // console.log(code, status, message);
                //         this.getData();
                //     });
                // }}
                // filterElement={
                //     <div className='column'>
                //         <div className='row'>
                //             <TextField label={"Filter By Polish Number"} fullWidth InputLabelProps={{ shrink: true }} style={{ width: 400 }} />
                //         </div>
                //         <div style={{ marginTop: 10, justifyContent: "flex-start", display: "flex" }}>
                //             <Button variant='contained' onClick={() => { }}>Find</Button>
                //         </div>
                //     </div>
                // }
                />
            </>
        );
    }

}

export default (propt: any): any => {
    const count = useSelector((state: any) => state.counter.count);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    return <BukuPanduan dispatch={dispatch} navigate={navigate} type={propt.type} />;
};
