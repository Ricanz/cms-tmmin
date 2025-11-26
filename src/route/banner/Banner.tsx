/* eslint-disable import/no-anonymous-default-export */
import { Component } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { changeTitle } from '../../redux/actions/titleAction';
import TableGenerate from '../../component/TableGenerate';
import { apiAddBanner, apiDeleteBanner, apiGetBanner, apiUpdateBanner } from '../req/req_banner';

interface PropsMain {
    dispatch: any;
    navigate: any;
    type: string;
}
interface StateMain {
    data: any;
    popup: boolean;
    totalRow: number;
    page: number;
    rowsPerPage: number;
}

// function formatDate(input) {
//     const parsedDate = new Date(input);
//     const year = parsedDate.getUTCFullYear();
//     const month = String(parsedDate.getUTCMonth() + 1).padStart(2, '0'); // Bulan dimulai dari 0 di JavaScript
//     const day = String(parsedDate.getUTCDate()).padStart(2, '0');
//     const hours = String(parsedDate.getUTCHours()).padStart(2, '0');
//     const minutes = String(parsedDate.getUTCMinutes()).padStart(2, '0');

//     return `${year}-${month}-${day} ${hours}:${minutes}`;
// }

const config = [
  {
    field: "bannerName",
    label: "Banner Name",
    type: "text",
    default: "",
    show_in_table: true,
    show_in_form: true,
    width: 200,
  },
  {
    field: "bannerLink",
    label: "Link",
    type: "text",
    default: "",
    show_in_table: false,
    show_in_form: true,
  },
  {
    field: "bannerImage",
    label: "Image",
    type: "photo",
    default: "",
    show_in_table: true,
    show_in_form: true,
  },
  {
    field: "bannerIsActive",
    label: "Active",
    type: "switch",
    default: "",
    show_in_table: true,
    show_in_form: true,
    element: (value: any, row: any, self: any) => {
      return value ? "Active" : "Non Active";
    },
  },
];

class Banner extends Component<PropsMain, StateMain> {

    constructor(props: PropsMain) {
        super(props);
        this.state = {
            data: [],
            popup: false,
            totalRow: 0,
            page: 0,
            rowsPerPage: 10
        };
    }

    getData() {
        apiGetBanner({
            limit: this.state.rowsPerPage,
            page: this.state.page + 1,
            "sort": "DESC",
            "sort_by": "bannerCreatedAt",
            "filter": "",
            "type": "all"
        }).then((data: any) => {
            if (data.code === 200) {
                this.setState({
                    data: data.data.data,
                    totalRow: data.data.pagination.totalRecord,
                    page: data.data.pagination.page === 1 ? 0 : data.data.pagination.page - 1
                });
            }
        });
    }

    componentDidMount() {
        this.props.dispatch(changeTitle("Banner"));
        this.getData();
    }

    render() {
        return (
          <>
            <TableGenerate
              field={config.filter((item) => item.show_in_table)}
              data={this.state.data}
              showButtonAdd={true}
              showButtonDelete={true}
              showButtonEdit={true}
              config={config}
              totalRow={this.state.totalRow}
              page={this.state.page}
              rowsPerPage={this.state.rowsPerPage}
              onPageChanged={(p: any) => {
                this.setState({ page: p }, () => {
                  this.getData();
                });
              }}
              onRowsPerPageChanged={(p: any) => {
                this.setState({ rowsPerPage: p }, () => {
                  this.getData();
                });
              }}
              formAddSubmit={(value: any) => {
                apiAddBanner(value).then(() => {
                  this.getData();
                });
              }}
              formEditSubmit={(row: any, datas: any) => {
                Object.assign(datas, row);
                apiUpdateBanner({
                  ...datas,
                  bannerID: datas.bannerID,
                }).then(() => {
                  this.getData();
                });
              }}
              deleteRow={(row: any) => {
                apiDeleteBanner(row.bannerID).then(() => {
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
    // const count = useSelector((state: any) => state.counter.count);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    return <Banner dispatch={dispatch} navigate={navigate} type={propt.type} />;
};
