import { Component } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { changeTitle } from '../../redux/actions/titleAction';
import TableGenerate from '../../component/TableGenerate';
import { apiAddUsers, apiDeleteUsers, apiGetUsers, apiUpdateUsers } from '../req/reg_users';
import { Alert, Button, Snackbar, TextField } from '@mui/material';
import SystemUpdateAltIcon from '@mui/icons-material/SystemUpdateAlt';

import * as XLSX from 'xlsx';

const config = [
  {
    "field": "userUsername",
    "label": "User Name",
    "type": "text",
    "default": "",
    "show_in_table": true,
    "show_in_form": true,
    width: 200,
  },
  {
    "field": "userName",
    "label": "Name",
    "type": "text",
    "default": "",
    "show_in_table": true,
    "show_in_form": true,
    width: 200,
  },
  {
    "field": "userPassword",
    "label": "Password",
    "type": "text",
    "default": "",
    "show_in_table": true,
    "show_in_form": true,
    width: 200,
  },
  {
    "field": "userRole",
    "label": "Role",
    "type": "option",
    "default": "",
    "dataOption": [
      { label: "CS", value: "CS" },
      { label: "ADMIN", value: "ADMIN" },
      { label: "SUPERADMIN", value: "SUPERADMIN" },
    ],
    "show_in_table": true,
    "show_in_form": true
  },
  {
    "field": "userIsActive",
    "label": "Active",
    "type": "switch",
    "default": true,
    "show_in_table": true,
    "show_in_form": true,
    "element": (v: string) => {
      return v ? "Active" : "InActive";
    }
  },
];

interface PropsMain {
  dispatch: any;
  navigate: any;
}
interface StateMain {
  data: any;
  toats: boolean;
  filter: string;
  byName: string;
  byEmail: string;
  totalRow: number;
  page: number;
  rowsPerPage: number;
}

class User extends Component<PropsMain, StateMain> {

  constructor(props: PropsMain) {
    super(props);
    this.state = {
      data: [],
      toats: false,
      filter: "",
      byName: "",
      byEmail: "",
      totalRow: 0,
      page: 0,
      rowsPerPage: 10,
    };
  }

  getData() {
    apiGetUsers({
      "limit": 10,
      "page": this.state.page + 1,
      "sort": "DESC",
      "sort_by": "userCreatedAt",
      "filter": this.state.filter,
      "type": "all"
    }).then(({ code, data, message, status }) => {
      console.log("data.data", data.data);
      if (code === 200) {
        this.setState({
          data: data.data,
          totalRow: data.pagination.totalRecord,
          page: data.pagination.page === 1 ? 0 : data.pagination.page - 1
        });
      }
    });
  }

  componentDidMount() {
    this.props.dispatch(changeTitle("User Setting"));
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
          reload={() => {
            this.getData();
          }}
          customButton={[
            {
              icon: SystemUpdateAltIcon,
              title: "Export to excel",
              action: () => {
                // console.log("Download to excel");
                apiGetUsers({
                  limit: 10,
                  page: 1,
                  sort: "DESC",
                  sort_by: "created_at",
                  filter: "",
                  type: "all",
                }).then(({ data }) => {
                  const ws = XLSX.utils.json_to_sheet(data.result);
                  const wb = XLSX.utils.book_new();
                  XLSX.utils.book_append_sheet(wb, ws, "Sheet1");

                  // generate XLSX file and send to client
                  XLSX.writeFile(wb, "data.xlsx");
                });
              },
            },
          ]}
          formAddSubmit={(data: any) => {
            apiAddUsers(data).then(({ code, message, status }) => {
              if (code === 200) {
                this.setState({ toats: true });
                this.getData();
              } else {
                // console.log(status);
                alert(message);
              }
            });
          }}
          formEditSubmit={(data: any, row: any) => {
            apiUpdateUsers({
              userID: row.userID,
              ...data,
              userProfileImage: "-",
            }).then(({ code, message, status }) => {
              if (code === 200) {
                this.setState({ toats: true });
                this.getData();
              } else {
                // console.log(status);
                alert(message);
              }
            });
          }}
          deleteRow={(value: any) => {
            apiDeleteUsers(value.userID).then(
              ({ code, message, status }) => {
                if (code === 200) {
                  this.setState({ toats: true });
                  this.getData();
                } else {
                  // console.log(status);
                  alert(message);
                }
              }
            );
          }}
          onFilterClick={(status: any) => {
            if (!status) {
              this.setState({
                filter: "",
              });
            }
          }}
          filterElement={
            <div className="column">
              <div className="row">
                <TextField
                  label={"Filter By Name"}
                  fullWidth
                  InputLabelProps={{ shrink: true }}
                  onChange={(e) => {
                    this.setState({ filter: e.target.value });
                  }}
                />
                <div style={{ width: 5 }} />
                <TextField
                  label={"Filter By Email"}
                  fullWidth
                  InputLabelProps={{ shrink: true }}
                  onChange={(e) => {
                    this.setState({ filter: e.target.value });
                  }}
                />
                <div style={{ width: 5 }} />
                <TextField
                  type="datetime-local"
                  label={"Start Date"}
                  fullWidth
                  InputLabelProps={{ shrink: true }}
                />
                <div style={{ width: 5 }} />
                <TextField
                  type="datetime-local"
                  label={"End Date"}
                  fullWidth
                  InputLabelProps={{ shrink: true }}
                />
              </div>
              <div
                style={{
                  marginTop: 10,
                  justifyContent: "flex-end",
                  display: "flex",
                }}
              >
                <Button
                  variant="contained"
                  onClick={() => {
                    this.getData();
                  }}
                >
                  Find
                </Button>
              </div>
            </div>
          }
        />

        <Snackbar
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          open={this.state.toats}
          autoHideDuration={6000}
          onClose={() => this.setState({ toats: false })}
        >
          <Alert
            onClose={() => this.setState({ toats: false })}
            severity="success"
          >
            Success update content
          </Alert>
        </Snackbar>
      </>
    );
  }

}

export default (): any => {
  // const count = useSelector((state: any) => state.counter.count);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  return <User dispatch={dispatch} navigate={navigate} />;
};
