import React, { Component } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Outlet, useNavigate } from 'react-router-dom';
import { changeTitle } from '../../redux/actions/titleAction';
import TableGenerate from '../../component/TableGenerate';
import { Button, Checkbox, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControl, FormControlLabel, MenuItem, Select, Switch, TextField } from '@mui/material';

const dataSample = [];

/**
 * Class Name: Structure
 * Field Table: 
    [
        { label: "Title", width: 200, field: "title" },
        { label: "Url", field: "url" },
        { label: "Active", field: "active", width: 50 },
        { label: "Image", field: "image" },
    ]
 */

interface PropsMain {
    dispatch: any;
    navigate: any;
}
interface StateMain {
    popupOpen: boolean;
    popupOpenEdit: boolean;
    isChecked: boolean;
    url: string;
    itemSelected: any;
    fields: any;
}

class Structure extends Component<PropsMain, StateMain> {

    constructor(props: PropsMain) {
        super(props);
        this.state = {
            popupOpen: false,
            popupOpenEdit: false,
            isChecked: true,
            url: '',
            itemSelected: null,
            fields: [
                { label: "Title", width: 200, field: "title" },
                { label: "Url", field: "url" },
                { label: "Active", field: "active", width: 50 },
                { label: "Image", field: "image" },
            ],
        };
    }

    componentDidMount(): void {
        this.props.dispatch(changeTitle("Structure"));
    }

    render() {
        return (
            <React.Fragment>
                <TableGenerate
                    field={this.state.fields}
                    data={dataSample}
                    add={() => this.setState({ popupOpen: true })}
                    edit={(itemSelected) => this.setState({ popupOpenEdit: true, itemSelected })}
                />
                {this.renderDialogAddData()}
                {this.state.popupOpenEdit ? this.renderDialogEditData() : null}
            </React.Fragment>
        );
    }

    renderDialogEditData() {
        return (
            <Dialog
                open={this.state.popupOpenEdit}
                onClose={() => this.setState({ popupOpenEdit: false })}
                aria-labelledby="form-dialog-title"
            >
                <DialogTitle id="form-dialog-title">Edit Member</DialogTitle>
                <DialogContent>
                    <DialogContentText style={{
                        width: 800,
                        height: 500,
                    }}>
                        <div style={{ padding: 20 }}>
                            <div className='field' style={{ marginBottom: 20 }}>
                                <TextField
                                    label="Title"
                                    variant="outlined"
                                    value={this.state.itemSelected.title}
                                    style={{ minWidth: 560, display: 'inline-flex' }}
                                    onChange={(value) => {
                                        // console.log(value);
                                    }}
                                />
                            </div>
                            <div className='field' style={{ marginBottom: 20 }}>
                                <TextField
                                    label="Url"
                                    variant="outlined"
                                    value={this.state.url}
                                    style={{ minWidth: 560, display: 'inline-flex' }}
                                    onChange={(value) => {
                                        this.setState({ url: value.target.value });
                                    }}
                                />
                            </div>

                            <div className='field' style={{ marginBottom: 20 }}>
                                <FormControlLabel control={
                                    <Switch
                                        checked={this.state.isChecked}
                                        onChange={() => this.setState({ isChecked: !this.state.isChecked })}
                                        inputProps={{ 'aria-label': 'controlled' }}
                                    />
                                } label={this.state.isChecked ? "Active" : "Non Active"} />
                            </div>

                            <div className='field' style={{ marginBottom: 20 }}>
                                <input
                                    accept="image/*"
                                    style={{ display: 'none' }}
                                    id="raised-button-file"
                                    type="file"
                                    onChange={(e: any) => {
                                        // console.log(e);
                                    }}
                                />
                                <label htmlFor="raised-button-file">
                                    <Button variant="contained" component="span">Select Image</Button>
                                </label>
                            </div>

                        </div>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => this.setState({ popupOpenEdit: false })} color="primary">
                        Cancel
                    </Button>
                    <Button variant="contained" onClick={() => this.setState({ popupOpenEdit: false })} color="primary">
                        Simpan
                    </Button>
                </DialogActions>
            </Dialog>
        );
    }

    renderDialogAddData() {
        return (
            <Dialog
                open={this.state.popupOpen}
                onClose={() => this.setState({ popupOpen: false })}
                aria-labelledby="form-dialog-title"
            >
                <DialogTitle id="form-dialog-title">Add New Member</DialogTitle>
                <DialogContent>
                    <DialogContentText style={{
                        width: 800,
                        height: 500,
                    }}>
                        <div style={{ padding: 20 }}>
                            <div className='field' style={{ marginBottom: 20 }}>
                                <TextField
                                    label="Title"
                                    variant="outlined"
                                    value={""}
                                    style={{ minWidth: 560, display: 'inline-flex' }}
                                    onChange={(value) => {
                                        // console.log(value);
                                    }}
                                />
                            </div>
                            <div className='field' style={{ marginBottom: 20 }}>
                                <TextField
                                    label="Url"
                                    variant="outlined"
                                    value={this.state.url}
                                    style={{ minWidth: 560, display: 'inline-flex' }}
                                    onChange={(value) => {
                                        this.setState({ url: value.target.value });
                                    }}
                                />
                            </div>

                            <div className='field' style={{ marginBottom: 20 }}>
                                <FormControlLabel control={
                                    <Switch
                                        checked={this.state.isChecked}
                                        onChange={() => this.setState({ isChecked: !this.state.isChecked })}
                                        inputProps={{ 'aria-label': 'controlled' }}
                                    />
                                } label={this.state.isChecked ? "Active" : "Non Active"} />
                            </div>

                            <div className='field' style={{ marginBottom: 20 }}>
                                <input
                                    accept="image/*"
                                    style={{ display: 'none' }}
                                    id="raised-button-file"
                                    type="file"
                                    onChange={(e: any) => {
                                        // console.log(e);
                                    }}
                                />
                                <label htmlFor="raised-button-file">
                                    <Button variant="contained" component="span">Select Image</Button>
                                </label>
                            </div>

                        </div>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => this.setState({ popupOpen: false })} color="primary">
                        Cancel
                    </Button>
                    <Button variant="contained" onClick={() => this.setState({ popupOpen: false })} color="primary">
                        Simpan
                    </Button>
                </DialogActions>
            </Dialog>
        );
    }
}

export default (): any => {
    const count = useSelector((state: any) => state.counter.count);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    return <Structure dispatch={dispatch} navigate={navigate} />;
};
