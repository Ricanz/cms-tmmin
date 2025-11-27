import { Component } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { changeTitle } from '../../redux/actions/titleAction';
import TableGenerate from '../../component/TableGenerate';
import { apiAddTelemedicine, apiDeleteTelemedicine, apiGetTelemedicine, apiUpdateTelemedicine } from '../req/req_telemedicine';

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
    field: "telemedicineIcon",
    label: "Icon",
    type: "photo",
    default: "",
    show_in_table: true,
    show_in_form: true,
    width: 50,
    element: (value: any) => {
      return (
        <div
          style={{
            width: 30,
            height: 30,
            marginLeft: 10,
            backgroundImage: `url(${value})`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
          }}
        />
      );
    },
  },
  {
    field: "telemedicineLink",
    label: "Link",
    type: "text",
    default: "",
    show_in_table: true,
    show_in_form: true,
    width: 200,
    element: (value: any) => {
      return (
        <a target="_blank" href={value}>
          {value}
        </a>
      );
    },
  },
  {
    field: "telemedicineName",
    label: "Name",
    type: "text",
    default: "",
    show_in_table: true,
    show_in_form: true,
    width: 300,
  },
  {
    field: "telemedicineIsActive",
    label: "Active",
    type: "switch",
    default: "",
    show_in_table: true,
    show_in_form: true,
    element: (value: any) => {
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
          totalRow: 0,
          page: 0,
          rowsPerPage: 10,
        };
    }

    getData() {
        const accessToken = localStorage.getItem("accessToken") ?? "";
        apiGetTelemedicine(accessToken, {
          limit: this.state.rowsPerPage,
          page: this.state.page + 1,
          sort: "DESC",
          sort_by: "telemedicineCreatedAt",
          filter: "",
          type: "all",
        }).then(({ data, code }) => {
          if (code == 200) {
            this.setState({
              data: data.data,
              totalRow: data.pagination.totalRecord,
              page: data.pagination.page === 1 ? 0 : data.pagination.page - 1,
            });
          }
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
              field={config.filter((item) => item.show_in_table)}
              data={this.state.data}
              showButtonAdd={true}
              showButtonDelete={true}
              config={config}
              formAddSubmit={(value: any) => {
                apiAddTelemedicine(value).then(() => {
                  this.getData();
                });
              }}
              formEditSubmit={(value: any, row: any) => {
                apiUpdateTelemedicine({
                  ...value,
                  id: row.id,
                }).then(() => {
                  this.getData();
                });
              }}
              deleteRow={(row: any) => {
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
    // const count = useSelector((state: any) => state.counter.count);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    return <Telemedicine dispatch={dispatch} navigate={navigate} type={propt.type} />;
};
