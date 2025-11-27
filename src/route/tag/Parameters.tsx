/* eslint-disable import/no-anonymous-default-export */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { Component } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { changeTitle, showToast } from '../../redux/actions/titleAction';
import { getParameters, ParametersData, addParameter, updateParameter, deleteParameter } from '../req/req_config';
import TableGenerate from '../../component/TableGenerate';

interface PropsMain {
    dispatch: any;
    navigate: any;
}
interface StateMain {
    loading: boolean;
    data: ParametersData[];
    totalRow: number;
    page: number;
    rowsPerPage: number;
    filter: string;
}

const config = [
    {
        "field": "tagparamKeyName",
        "label": "Key Name",
        "type": "text",
        "default": "",
        "show_in_table": true,
        "show_in_form": true,
        width: 200,
    },
    {
        "field": "tagparamKeyConfig",
        "label": "Key Config",
        "type": "textarea",
        "default": "",
        "show_in_table": true,
        "show_in_form": true
    },
];

class Parameters extends Component<PropsMain, StateMain> {

    constructor(props: PropsMain) {
        super(props);
        this.state = {
            loading: false,
            data: [],
            totalRow: 0,
            page: 0,
            rowsPerPage: 10,
            filter: ''
        };
    }

    async getData() {
        this.setState({ loading: true });
        getParameters({
            limit: this.state.rowsPerPage,
            page: this.state.page + 1,
            "sort": "DESC",
            "sort_by": "tagparamCreatedAt",
            "filter": this.state.filter,
            "type": "all"
        }).then(({ data, code }) => {
            this.setState({ loading: false });
            if (code === 200) {
                this.setState({
                    data: data.data,
                    totalRow: data.pagination.totalRecord,
                    page: data.pagination.page === 1 ? 0 : data.pagination.page - 1
                });
            }
        })
    }

    componentDidMount() {
        this.props.dispatch(changeTitle("Setup Parameters"));
        this.getData();
    }

    render() {
        return (
          <React.Fragment>
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
              reload={() => {
                this.getData();
              }}
              formAddSubmit={(value: any) => {
                console.log("SUBMIT VALUE:", value);
                console.log("this.state.data:", this.state.data);

                const dataSend = {
                  config: "tagParam",
                  ...value,
                };
                this.setState(
                  {
                    data: [dataSend, ...this.state.data],
                  },
                  async () => {
                    await addParameter(dataSend);
                    this.props.dispatch(showToast(true, "Success add data"));
                    setTimeout(
                      () => this.props.dispatch(showToast(false, "")),
                      3000
                    );
                  }
                );
              }}
              formEditSubmit={(value: any, row: any) => {
                const dataSend = Object.assign(row, value);

                this.setState(
                  {
                    data: this.state.data.map((e) => {
                      if (e.tagparamKeyName === row.tagparamKeyName) {
                        return value;
                      } else {
                        return e;
                      }
                    }),
                  },
                  async () => {
                    await updateParameter(dataSend);
                    this.props.dispatch(showToast(true, "Success update"));
                    setTimeout(
                      () => this.props.dispatch(showToast(false, "")),
                      3000
                    );
                  }
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
              onSearchEnter={(value: string) => {
                this.setState(
                  {
                    filter: value,
                    page: 0,
                  },
                  () => {
                    this.getData();
                  }
                );
              }}
              deleteRow={(row: any) => {
                this.setState(
                  {
                    data: this.state.data.filter(
                      (e) => e.tagparamKeyName !== row.tagparamKeyName
                    ),
                  },
                  async () => {
                    await deleteParameter(row.tagparamID);
                    this.props.dispatch(showToast(true, "Success delete"));
                    setTimeout(
                      () => this.props.dispatch(showToast(false, "")),
                      3000
                    );
                  }
                );
              }}
            />
          </React.Fragment>
        );
    }
}

export default (propt: any): any => {
    // const count = useSelector((state: any) => state.counter.count);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    return <Parameters dispatch={dispatch} navigate={navigate} />;
};
