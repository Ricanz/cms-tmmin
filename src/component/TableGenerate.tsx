/* eslint-disable import/no-anonymous-default-export */
import { Component } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  Button,
  CircularProgress,
  FormControl,
  IconButton,
  MenuItem,
  Paper,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Switch,
  TextField,
  InputLabel,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@mui/material";

import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import CachedOutlinedIcon from "@mui/icons-material/CachedOutlined";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import EditRoadOutlinedIcon from "@mui/icons-material/EditRoadOutlined";
import RemoveCircleOutlineOutlinedIcon from "@mui/icons-material/RemoveCircleOutlineOutlined";
import { Formik, Field, Form } from "formik";
import MediaPopup from "./MediaPopup";
import TuneIcon from "@mui/icons-material/Tune";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

interface PropsMain {
  dispatch: any;
  navigate: any;
  config: any;
  field: any[];
  data: any[];
  add: Function;
  edit: Function;
  reload: Function;
  formAddSubmit: Function;
  formEditSubmit: Function;
  deleteRow: Function;
  showButtonAdd: boolean;
  showButtonDelete: boolean;
  showButtonEdit: boolean;
  showButtonDetailPopup: boolean;
  customButton: any[];
  filterElement: any;
  totalRow: number;
  page: number;
  rowsPerPage: number;
  onPageChanged: Function;
  onRowsPerPageChanged: Function;
  onFilterClick: Function;
  onSearchEnter: Function;
}
interface StateMain {
  listArticle: any[];
  listField: any[];
  loading: boolean;
  deleteConfirm: boolean;
  popup: boolean;
  indexChecked: number;
  search: string;
  searchField: string;
  selectItem: any;
  mode: string;
  mediaPopup: boolean;
  callbackMediaPopup: Function;
  showFilter: boolean;
  content: string;
  type: string[];
  config: any;
}

class TableGenerate extends Component<PropsMain, StateMain> {
  editorRef: any;
  refField: any = {};

  formikRef: any;
  constructor(props: PropsMain) {
    super(props);
    this.state = {
      config: props.config,
      showFilter: false,
      deleteConfirm: false,
      searchField: "",
      search: "",
      indexChecked: -1,
      loading: false,
      popup: false,
      listField: [],
      listArticle: [],
      type: ["image"],
      selectItem: null,
      mode: "",
      mediaPopup: false,
      callbackMediaPopup: (v: any) => v,
      content: "",
    };
  }

  renderCustomButton() {
    return this.props.customButton ? this.props.customButton.map((e: any, i: number) => {
      return (
        <div key={"keys_" + i} style={{ marginLeft: 10 }}>
          <div style={{ width: 10 }} />
          <Button key={"cb-" + i} startIcon={<e.icon />} variant='contained' onClick={() => {
            e.action();
          }}>{e.title}</Button>
        </div>
      );
    }) : [];
  }

  filterSearch() {
    return typeof this.props.onSearchEnter === "function" ? (
      <div style={{ width: 250, display: "block" }}>
        <div className="box-input row expand" style={{ alignItems: "center" }}>
          <SearchOutlinedIcon
            style={{
              marginLeft: 10,
              cursor: "pointer",
              transition: "transform 0.2s ease, color 0.2s ease",
            }}
            onClick={() => {
              if (typeof this.props.onSearchEnter === "function") {
                this.props.onSearchEnter(this.state.search);
              }
            }}
            onMouseDown={(e) =>
              (e.currentTarget.style.transform = "scale(0.9)")
            }
            onMouseUp={(e) => (e.currentTarget.style.transform = "scale(1)")}
            onMouseEnter={(e) => (e.currentTarget.style.color = "#007bff")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "inherit")}
          />

          <input
            type="text"
            placeholder="Search"
            className="expand search-member"
            onChange={(e) => {
              this.setState({ search: e.target.value });
            }}
            onKeyUp={(e) => {
              if (e.code === "Enter") {
                if (typeof this.props.onSearchEnter === "function") {
                  this.props.onSearchEnter(this.state.search);
                }
              }
            }}
          />
        </div>
      </div>
    ) : null;
  }

  renderToolbar() {
    return (
      <div className="row" style={{ height: 50, marginRight: 20 }}>
        <div className="expand">
          <div className="row bCenter">
            <IconButton
              color="primary"
              onClick={() => {
                this.props.reload();
              }}
            >
              <CachedOutlinedIcon />
            </IconButton>
            <div style={{ width: 10 }} />

            {this.props.showButtonAdd ? (
              <Button
                startIcon={<AddOutlinedIcon />}
                variant="contained"
                onClick={() => {
                  if (this.props.add) {
                    this.props.add();
                  } else {
                    this.setState({ popup: true, mode: "add" });
                  }
                }}
              >
                Add
              </Button>
            ) : null}

            {this.renderCustomButton()}
            <div style={{ width: 10 }} />
            {this.state.indexChecked >= 0 ? (
              <>
                {this.props.showButtonDetailPopup ? (
                  <Button
                    startIcon={<EditRoadOutlinedIcon />}
                    variant="contained"
                    color="info"
                    onClick={() => {
                      if (this.props.edit) {
                        this.props.edit(this.state.selectItem);
                      } else {
                        this.setState({ popup: true, mode: "detail" });
                      }
                    }}
                  >
                    Detail
                  </Button>
                ) : null}

                {this.props.showButtonEdit ? (
                  <Button
                    startIcon={<EditRoadOutlinedIcon />}
                    variant="contained"
                    color="warning"
                    onClick={() => {
                      if (this.props.edit) {
                        this.props.edit(this.state.selectItem);
                      } else {
                        this.setState({ popup: true, mode: "edit" });
                      }
                    }}
                  >
                    Edit
                  </Button>
                ) : null}

                <div style={{ width: 10 }} />
                {this.props.showButtonDelete ? (
                  <Button
                    startIcon={<RemoveCircleOutlineOutlinedIcon />}
                    variant="contained"
                    color="error"
                    onClick={async () => {
                      if (window.confirm("Delete row ?")) {
                        if (this.props.deleteRow) {
                          this.props.deleteRow(this.state.selectItem);
                        }
                      }
                    }}
                  >
                    Delete
                  </Button>
                ) : null}
              </>
            ) : null}
          </div>
        </div>
        {this.props.filterElement ? (
          <IconButton
            color="primary"
            onClick={() => {
              this.setState({ showFilter: !this.state.showFilter }, () => {
                if (this.props.onFilterClick) {
                  this.props.onFilterClick(this.state.showFilter);
                }
              });
            }}
          >
            <TuneIcon />
          </IconButton>
        ) : null}
        {/* <div style={{ width: 150, display: "block" }}>
                    <FormControl style={{ width: '100%' }}>
                        <Select value={this.state.searchField} onChange={(e) => {
                            this.setState({ searchField: e.target.value });
                        }} style={{ padding: 0, height: 40 }}>
                            <MenuItem value="-">
                                <em>Select Field</em>
                            </MenuItem>
                            {this.props.field.map((item: any, i: number) => {
                                return (<MenuItem key={`field-${i}`} value={item.field}>{item.label}</MenuItem>);
                            })}
                        </Select>
                    </FormControl>
                </div> */}
        <div style={{ width: 5 }}></div>
        {this.filterSearch()}
      </div>
    );
  }

  renderHead() {
    return this.props.field
      .filter((item) => item.field !== "id")
      .map((e: any, i: number) => {
        return (
          <TableCell key={`head-${i}`} width={e.width || 100}>
            <b>{e.label}</b>
          </TableCell>
        );
      });
  }

  renderBody() {
    return this.props.data.map((item: any, index) => {
      return (
        <TableRow
          key={`row-${index}`}
          selected={this.state.indexChecked === index}
          // onDoubleClick={() => {

          // }}
          onClick={() => {
            this.setState(
              {
                indexChecked: index === this.state.indexChecked ? -1 : index,
              },
              () => {
                if (this.state.indexChecked >= 0) {
                  if (item) {
                    this.setState({ selectItem: item }, () => {
                      // // console.log("Row Click", this.state.selectItem);
                    });
                  }
                } else {
                  this.setState({ selectItem: null }, () => {
                    // // console.log("Row Click", this.state.selectItem);
                  });
                }
              }
            );
          }}
        >
          {this.props.field
            .filter((item) => item.field !== "id")
            .map((e: any, i: number) => {
              if (e.element) {
                return (
                  <TableCell key={"row-" + i} style={{ padding: 3 }}>
                    {e.element(item[e.field], item, this)}
                  </TableCell>
                );
              } else {
                return <TableCell key={"row-" + i}>{item[e.field]}</TableCell>;
              }
            })}
        </TableRow>
      );
    });
  }

  renderCustomFilter() {
    const Childreen = this.props.filterElement;
    return Childreen ? (
      <div
        style={{
          marginBottom: 10,
          marginRight: 20,
          padding: 20,
          border: "1px dotted #ccc85f",
        }}
      >
        {Childreen}
      </div>
    ) : null;
  }

  render() {
    return (
      <div className="column expand">
        {this.state.showFilter ? this.renderCustomFilter() : null}

        {this.renderToolbar()}

        <Paper className="expand" style={{ marginRight: 20 }}>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>{this.renderHead()}</TableRow>
              </TableHead>
              <TableBody>{this.renderBody()}</TableBody>
            </Table>
          </TableContainer>
        </Paper>

        <div style={{ height: 80, marginRight: 10 }} className="row">
          {this.state.loading ? (
            <CircularProgress size={20} style={{ margin: 10 }} />
          ) : (
            <div></div>
          )}
          <div className="expand">
            <TablePagination
              // rowsPerPageOptions={[10, 25, 50]}
              rowsPerPageOptions={[]}
              component="div"
              count={this.props.totalRow || 10}
              rowsPerPage={this.props.rowsPerPage || 10}
              page={this.props.page || 0}
              onPageChange={(event, newPage) => {
                if (this.props.onPageChanged) {
                  this.props.onPageChanged(newPage);
                }
              }}
              onRowsPerPageChange={(event) => {
                if (this.props.onRowsPerPageChanged) {
                  this.props.onRowsPerPageChanged(+event.target.value);
                }
              }}
            />
          </div>
        </div>

        {this.renderDialogEditData(this.props.config)}

        {this.state.mediaPopup ? (
          <MediaPopup
            type={this.state.type}
            open={true}
            closePopup={() => this.setState({ mediaPopup: false })}
            onClick={(url: string) => {
              this.state.callbackMediaPopup(url);
            }}
          />
        ) : null}
      </div>
    );
  }

  dynamicForm(config: any, onSubmit: any) {
    const initialValues = config.reduce(
      (acc: any, curr: any) => ({ ...acc, [curr.field]: curr.default }),
      {}
    );
    return (
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        innerRef={(formikRef) => {
          this.formikRef = formikRef;
        }}
      >
        <Form style={{ maxWidth: 550 }}>
          {config.map(
            (fieldConfig: any) =>
              fieldConfig.show_in_form && (
                <div key={fieldConfig.field} style={{ marginBottom: 20 }}>
                  <Field name={fieldConfig.field}>
                    {(field: any, form: any) => {
                      switch (fieldConfig.type) {
                        case "json":
                          const data = form.values;
                          const json = data[fieldConfig.field];
                          return (
                            <div>
                              <p
                                style={{
                                  marginBottom: "5px",
                                  color: "rgba(0, 0, 0, 0.6)",
                                  fontSize: "12px",
                                }}
                              >
                                {fieldConfig.label}
                              </p>
                              <div
                                className="preview"
                                style={{
                                  height: "auto",
                                  backgroundColor: "#282c34", // Dark mode background
                                  color: "#61dafb", // Font color biru muda
                                  padding: "15px",
                                  fontSize: "12px",
                                  borderRadius: "8px",
                                  fontFamily: "monospace", // Agar terlihat seperti di code editor
                                  whiteSpace: "pre-wrap", // Agar tidak overflow
                                  wordBreak: "break-word", // Mencegah teks panjang keluar layar
                                  overflowX: "auto",
                                }}
                              >
                                <pre style={{ whiteSpace: "pre-wrap" }}>
                                  {JSON.stringify(json, null, 2)}
                                </pre>
                              </div>
                            </div>
                          );

                        case "text":
                          return (
                            <TextField
                              {...field}
                              label={fieldConfig.label}
                              fullWidth
                            />
                          );
                        case "text_disabled":
                          return (
                            <TextField
                              {...field}
                              InputProps={{ readOnly: true }}
                              label={fieldConfig.label}
                              fullWidth
                            />
                          );
                        case "content":
                          // return <TextField {...field} label={fieldConfig.label} fullWidth />;
                          return (
                            <>
                              <TextField
                                {...field}
                                label={fieldConfig.label}
                                fullWidth
                                style={{ display: "none" }}
                              />
                              <CKEditor
                                //@ts-ignore
                                editor={ClassicEditor}
                                data={this.state.content}
                                onReady={(editor) => {
                                  this.editorRef = editor;
                                }}
                                onChange={(event, editor) => {
                                  //@ts-ignore
                                  const data = editor.getData();
                                  form.setFieldValue(fieldConfig.field, data);
                                }}
                              />
                            </>
                          );
                        case "photo":
                          return (
                            <>
                              {/* <div className='preview' style={{
                                                        height: 300,
                                                        backgroundColor: "#ccc",
                                                        marginBlock: 10
                                                    }}>

                                                    </div> */}
                              <div style={{ display: "flex" }}>
                                <TextField
                                  {...field}
                                  label={fieldConfig.label}
                                  fullWidth
                                />
                                <div style={{ width: 5 }}></div>
                                <Button
                                  variant="contained"
                                  onClick={() =>
                                    this.setState({
                                      mediaPopup: true,
                                      callbackMediaPopup: (url: any) => {
                                        // this.formikRef.setValues({
                                        //     [fieldConfig.field]: url,
                                        // });
                                        form.setFieldValue(
                                          fieldConfig.field,
                                          url
                                        );
                                      },
                                    })
                                  }
                                >
                                  Open
                                </Button>
                              </div>
                            </>
                          );
                        case "docpdf":
                          return (
                            <>
                              <div style={{ display: "flex" }}>
                                <TextField
                                  {...field}
                                  label={fieldConfig.label}
                                  fullWidth
                                />
                                <div style={{ width: 5 }}></div>
                                <Button
                                  variant="contained"
                                  onClick={() =>
                                    this.setState({
                                      mediaPopup: true,
                                      type: ["pdf"],
                                      callbackMediaPopup: (url: any) => {
                                        form.setFieldValue(
                                          fieldConfig.field,
                                          url
                                        );
                                      },
                                    })
                                  }
                                >
                                  Open
                                </Button>
                              </div>
                            </>
                          );
                        case "switch":
                          field.value = field.value || false;
                          return (
                            <div>
                              <InputLabel>{fieldConfig.label}</InputLabel>
                              <Switch
                                {...field}
                                checked={field.value}
                                onChange={() => {
                                  form.setFieldValue(
                                    fieldConfig.field,
                                    !field.value
                                  );
                                  if (fieldConfig.onChange) {
                                    fieldConfig.onChange(
                                      !field.value,
                                      this.state.config,
                                      this
                                    );
                                  }
                                }}
                              />
                            </div>
                          );
                        case "date":
                          const disabledDate =
                            typeof fieldConfig.disabled === "boolean"
                              ? fieldConfig.disabled
                              : false;
                          return (
                            <TextField
                              {...field}
                              type="date"
                              label={fieldConfig.label}
                              fullWidth
                              InputLabelProps={{ shrink: true }}
                              disabled={disabledDate}
                            />
                          );
                        case "datetime":
                          const value = field.value
                            ? new Date(field.value).toISOString().slice(0, 16)
                            : "";
                          field.value = value;
                          const disabled =
                            typeof fieldConfig.disabled === "boolean"
                              ? fieldConfig.disabled
                              : false;
                          return (
                            <TextField
                              {...field}
                              type="datetime-local"
                              label={fieldConfig.label}
                              fullWidth
                              InputLabelProps={{ shrink: true }}
                              disabled={disabled}
                              ref={(r) => {
                                this.refField[fieldConfig.field] = r;
                              }}
                            />
                          );
                        case "textarea":
                          return (
                            <TextField
                              {...field}
                              multiline
                              rows={4}
                              label={fieldConfig.label}
                              fullWidth
                            />
                          );
                        case "option":
                          return (
                            <FormControl fullWidth>
                              <InputLabel>{fieldConfig.label}</InputLabel>
                              <Select {...field}>
                                {fieldConfig.dataOption.map((option: any, index: any) => (
                                  <MenuItem key={index} value={option.value}>
                                    {option.label}
                                  </MenuItem>
                                ))}
                              </Select>
                            </FormControl>
                          );
                        default:
                          return (
                            <TextField
                              {...field}
                              label={fieldConfig.label}
                              fullWidth
                            />
                          );
                      }
                    }}
                  </Field>
                </div>
              )
          )}
        </Form>
      </Formik>
    );
  }

  renderDialogEditData(config: any) {
    config = config.filter((e: any) => e.show_in_form);
    if (this.state.mode === "detail") {
      config = config.map((item: any) => {
        if (this.state.selectItem) {
          item.default = this.state.selectItem[item.field];
        }
        item.value = item.default;
        return item;
      });

      return (
        <Dialog
          open={this.state.popup}
          onClose={() => this.setState({ popup: false })}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Detail</DialogTitle>
          <DialogContent>
            <DialogContentText
              style={{ width: 600, height: "90vh" }}
              component={"div"}
            >
              <div style={{ padding: 20 }}>
                {this.dynamicForm(this.state.config, (value: any) => {
                  this.props.formEditSubmit(value, this.state.selectItem);
                })}
              </div>
            </DialogContentText>
          </DialogContent>
        </Dialog>
      );
    } else {
      if (this.state.mode === "edit") {
        config = config.map((item: any) => {
          if (this.state.selectItem) {
            item.default = this.state.selectItem[item.field];
          }
          item.value = item.default;
          return item;
        });
      } else {
        config = config.map((item: any) => {
          if (item.type === "switch" && item.default === "") {
            item.default = true;
          } else {
            item.default = "";
          }
          return item;
        });
      }

      return (
        <Dialog
          open={this.state.popup}
          onClose={() => this.setState({ popup: false })}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">
            {this.state.mode === "edit" ? "Edit" : "Add"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText
              style={{ width: 550, height: "90vh" }}
              component={"div"}
            >
              <div style={{ padding: 20 }}>
                {this.dynamicForm(this.state.config, (value: any) => {
                  if (this.state.mode === "add") {
                    if (this.props.formAddSubmit) {
                      this.props.formAddSubmit(value);
                    }
                  }
                  if (this.state.mode === "edit") {
                    if (this.props.formEditSubmit) {
                      this.props.formEditSubmit(value, this.state.selectItem);
                    }
                  }
                })}
              </div>
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={() => this.setState({ popup: false })}
              color="primary"
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              onClick={() => {
                this.formikRef.submitForm();
                this.setState({ popup: false });
              }}
              color="primary"
            >
              {this.state.mode === "edit" ? "Update" : "Add"}
            </Button>
          </DialogActions>
        </Dialog>
      );
    }
  }
}

export default (props: any): any => {
  // const count = useSelector((state: any) => state.counter.count);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  return (
    <TableGenerate
      dispatch={dispatch}
      navigate={navigate}
      field={props.field}
      data={props.data}
      add={props.add}
      edit={props.edit}
      reload={props.reload}
      config={props.config}
      showButtonAdd={props.showButtonAdd}
      showButtonDelete={props.showButtonDelete}
      showButtonEdit={props.showButtonEdit}
      showButtonDetailPopup={props.showButtonDetailPopup}
      deleteRow={props.deleteRow}
      formAddSubmit={props.formAddSubmit}
      formEditSubmit={props.formEditSubmit}
      customButton={props.customButton}
      filterElement={props.filterElement}
      totalRow={props.totalRow}
      page={props.page}
      rowsPerPage={props.rowsPerPage}
      onPageChanged={props.onPageChanged}
      onRowsPerPageChanged={props.onRowsPerPageChanged}
      onFilterClick={props.onFilterClick}
      onSearchEnter={props.onSearchEnter}
    />
  );
};
