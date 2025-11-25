/* eslint-disable import/no-anonymous-default-export */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { Component } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { changeTitle } from '../../redux/actions/titleAction';
import TableGenerate from '../../component/TableGenerate';
import { apiGetMembers } from '../req/req_member';
import { apiGetLogs } from '../req/req_logging';

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
}

const config = [
  {
    field: "timestamp",
    label: "Timestamp",
    type: "text_disabled",
    default: "",
    show_in_table: true,
    show_in_form: true,
    width: 130,
  },
  {
    field: "requestAs",
    label: "Request As",
    type: "text_disabled",
    default: "",
    show_in_table: true,
    show_in_form: true,
    width: 30,
  },
  {
    field: "key",
    label: "Key",
    type: "text_disabled",
    default: "",
    show_in_table: true,
    show_in_form: true,
  },
  {
    field: "method",
    label: "Method",
    type: "text_disabled",
    default: "",
    show_in_table: true,
    show_in_form: true,
  },
  {
    field: "endpoint",
    label: "Endpoint",
    type: "text_disabled",
    default: "",
    show_in_table: true,
    show_in_form: true,
  },
  {
    field: "headers",
    label: "Headers",
    type: "json",
    default: "",
    show_in_table: false,
    show_in_form: true,
  },
  {
    field: "params",
    label: "Params",
    type: "json",
    default: "",
    show_in_table: false,
    show_in_form: true,
  },
  {
    field: "query",
    label: "Query",
    type: "json",
    default: "",
    show_in_table: false,
    show_in_form: true,
  },
  {
    field: "body",
    label: "Body",
    type: "json",
    default: "",
    show_in_table: false,
    show_in_form: true,
  },
  {
    field: "response",
    label: "Response",
    type: "json",
    default: "",
    show_in_table: false,
    show_in_form: true,
  },
];

class Logging extends Component<PropsMain, StateMain> {

    constructor(props: PropsMain) {
        super(props);
        this.state = {
            data: [],
            popup: false,
            totalRow: 0,
            page: 0,
            rowsPerPage: 10,
            filter: "",
        };
    }

    getData() {
        const accessToken = localStorage.getItem('accessToken') ?? "";
        apiGetLogs(accessToken, {
          limit: this.state.rowsPerPage,
          page: this.state.page + 1,
          filter: this.state.filter,
        }).then(({ code, data, message, status }) => {
          console.log("this.state: ", this.state);

          if (code == 200) {
            this.setState({
              data: data.data,
              totalRow: data.limit,
              page: data.page === 1 ? 0 : data.page - 1,
            });
          }
        });
    }

    componentDidMount() {
        this.props.dispatch(changeTitle("Data Log API"));
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
              config={config}
              totalRow={this.state.totalRow}
              page={this.state.page}
              rowsPerPage={this.state.rowsPerPage}
              showButtonDelete={false}
              showButtonDetailPopup={true}
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
    return <Logging dispatch={dispatch} navigate={navigate} type={propt.type}
        tagManager={tagManager}
    />;
};
