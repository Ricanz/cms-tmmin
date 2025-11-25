/* eslint-disable import/no-anonymous-default-export */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { Component } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Outlet, useNavigate } from 'react-router-dom';
import { changeTitle, showToast } from '../../redux/actions/titleAction';
import { getActionRules, ActionRuleData, addActionRule, updateActionRule, deleteActionRule } from '../req/req_config';
import TableGenerate from '../../component/TableGenerate';

interface PropsMain {
    dispatch: any;
    navigate: any;
}
interface StateMain {
    loading: boolean;
    data: ActionRuleData[];
    totalRow: number;
    page: number;
    rowsPerPage: number;
    filter: string;
}

const config = [
    {
        "field": "tagActionName",
        "label": "Action Name",
        "type": "text",
        "default": "",
        "show_in_table": true,
        "show_in_form": true,
        width: 200,
    },
    {
        "field": "tagActionDescription",
        "label": "Action Description",
        "type": "textarea",
        "default": "",
        "show_in_table": true,
        "show_in_form": true
    },
    {
        "field": "tagActionValue",
        "label": "Action Value",
        "type": "text",
        "default": "",
        "show_in_table": true,
        "show_in_form": true
    },
];

class ActionRule extends Component<PropsMain, StateMain> {

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
        getActionRules({
            limit: this.state.rowsPerPage,
            page: this.state.page + 1,
            "sort": "DESC",
            "sort_by": "tagActionCreatedAt",
            "filter": this.state.filter,
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

    componentDidMount() {
        this.props.dispatch(changeTitle("Action Rule"));
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
                // getActionRules().then((data) => {
                //     this.setState({ data });
                //     this.props.dispatch(showToast(true, "Update table"));
                //     setTimeout(() => this.props.dispatch(showToast(false, "")), 3000);
                // });
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
              formAddSubmit={(value) => {
                const dataSend = {
                  config: "tagAction",
                  ...value,
                };

                this.setState(
                  {
                    data: [value, ...this.state.data],
                  },
                  async () => {
                    await addActionRule(dataSend);
                    this.props.dispatch(showToast(true, "Success add data"));
                    setTimeout(
                      () => this.props.dispatch(showToast(false, "")),
                      3000
                    );
                  }
                );
              }}
              formEditSubmit={(value, row) => {
                const dataSend = Object.assign(row, value);

                this.setState(
                  {
                    data: this.state.data.map((e) => {
                      if (e.tagActionName === row.tagActionName) {
                        return value;
                      } else {
                        return e;
                      }
                    }),
                  },
                  async () => {
                    await updateActionRule(dataSend);
                    this.props.dispatch(showToast(true, "Success update"));
                    setTimeout(
                      () => this.props.dispatch(showToast(false, "")),
                      3000
                    );
                  }
                );
              }}
              deleteRow={(row) => {
                this.setState(
                  {
                    data: this.state.data.filter(
                      (e) => e.tagActionName !== row.tagActionName
                    ),
                  },
                  async () => {
                    await deleteActionRule(row.tagActionID);
                    this.props.dispatch(showToast(true, "Success delete"));
                    setTimeout(
                      () => this.props.dispatch(showToast(false, "")),
                      3000
                    );
                  }
                );
              }}
              edit={(row) => {
                this.props.navigate("/tagManager/editAction", {
                  state: this.state.data.filter(
                    (x) => x.tagActionID == row.tagActionID
                  )[0],
                });
              }}
              add={() => {
                this.props.navigate("/tagManager/addAction");
              }}
            />
          </React.Fragment>
        );
    }
}

export default (propt: any): any => {
    const count = useSelector((state: any) => state.counter.count);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    return <ActionRule dispatch={dispatch} navigate={navigate} />;
};