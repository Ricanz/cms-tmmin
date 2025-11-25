import { Button, CircularProgress, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControl, IconButton, MenuItem, Paper, Select, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow } from '@mui/material';
import React, { Component } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Outlet, useNavigate } from 'react-router-dom';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import CachedOutlinedIcon from '@mui/icons-material/CachedOutlined';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import EditRoadOutlinedIcon from '@mui/icons-material/EditRoadOutlined';
import RemoveCircleOutlineOutlinedIcon from '@mui/icons-material/RemoveCircleOutlineOutlined';
// import { collection, deleteDoc, doc, getDoc, getDocs, limit, orderBy, query, where } from 'firebase/firestore';
// import { firestore } from '../../firebase';
import { changeTitle } from '../../redux/actions/titleAction';
import { apiDeleteNewsById, apiGetNews, apiGetNewsById } from '../req/req_news';
import TableGenerate from '../../component/TableGenerate';


interface PropsMain {
    dispatch: any;
    navigate: any;
}
interface StateMain {
    data: any[];
    loading: boolean;
    totalRow: number;
    page: number;
    rowsPerPage: number;
}

const config = [
    { field: "newsTitle", label: "Title", width: 400 },
    { field: "newsCreatedAt", label: "Create Date" },
];

class AllArticle extends Component<PropsMain, StateMain> {

    constructor(props: PropsMain) {
        super(props);
        this.state = {
            data: [],
            loading: false,
            totalRow: 0,
            page: 0,
            rowsPerPage: 10,
        };
    }

    componentDidMount() {
        this.props.dispatch(changeTitle("All Article"));
        this.getData();
    }

    async getData() {
        this.setState({ loading: true });
        const accessToken = localStorage.getItem("accessToken") ?? "";
        apiGetNews(accessToken, {
            limit: this.state.rowsPerPage,
            page: this.state.page + 1,
            "sort": "DESC",
            "sort_by": "newsCreatedAt",
            "filter": "",
            "type": "all"
        }).then(({ data, code }) => {
            this.setState({ loading: false });
            if (code == 200) {
                this.setState({
                    data: data.data,
                    totalRow: data.pagination.totalRecord,
                    page: data.pagination.page === 1 ? 0 : data.pagination.page - 1
                });
            }
        })
    }

    render() {
        return (
          <TableGenerate
            field={config}
            data={this.state.data}
            showButtonAdd={true}
            showButtonDelete={true}
            showButtonEdit={true}
            config={config}
            totalRow={this.state.totalRow}
            page={this.state.page}
            rowsPerPage={this.state.rowsPerPage}
            reload={() => {
              this.getData();
            }}
            add={() => {
              this.props.navigate("/article/add-article");
            }}
            edit={(value) => {
              this.props.navigate(
                "/article/edit-article/" + value.newsID + "/",
                value
              );
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
            formAddSubmit={({ key, id, en }) => {
              const accessToken = localStorage.getItem("accessToken") ?? "";
              // apiAddBanner(accessToken, {

              // }).then(() => {
              //     this.getData();
              // });
            }}
            formEditSubmit={(value) => {
              const accessToken = localStorage.getItem("accessToken") ?? "";
              // apiUpdateBanner(accessToken, {
              //     id: value.id,
              //     key: value.key,
              //     value: {
              //         id: value.lang_id,
              //         en: value.lang_en
              //     }
              // }).then(() => {
              //     this.getData();
              // });
            }}
            deleteRow={(value) => {
              apiDeleteNewsById(value.newsID).then(({ code, message }) => {
                if (code == 200) {
                  this.getData();
                } else {
                  alert(message);
                }
              });
            }}
          />
        );
    }
}

export default (): any => {
    const count = useSelector((state: any) => state.counter.count);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    return <AllArticle dispatch={dispatch} navigate={navigate} />;
};
