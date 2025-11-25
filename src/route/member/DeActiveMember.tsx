import React, { Component } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Outlet, useNavigate } from 'react-router-dom';
import TableGenerate from '../../component/TableGenerate';
import { Button, Checkbox, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControl, FormControlLabel, MenuItem, Select, Switch, TextField } from '@mui/material';
import { changeTitle } from '../../redux/actions/titleAction';

const dataSample = [];

/**
 * Class Name: DeActiveMember
 * Field Table: 
    [
        { label: "Phone", width: 200, field: "phone" },
        { label: "Username", field: "username" },
        { label: "Policy", field: "policy" },
        { label: "Status", field: "status" },
        { label: "Created At", field: "created_at" },
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
    username: string;
    itemSelected: any;
    fields: any;
}

class DeActiveMember extends Component<PropsMain, StateMain> {

    constructor(props: PropsMain) {
        super(props);
        this.state = {
            popupOpen: false,
            popupOpenEdit: false,
            isChecked: true,
            username: '',
            itemSelected: null,
            fields: [
                { label: "Title", width: 200, field: "phone" },
                { label: "Url", field: "username" },
                { label: "Active", field: "policy", width: 50 },
                { label: "Image", field: "status" },
            ],
        };
    }

    componentDidMount(): void {
        this.props.dispatch(changeTitle("DeActiveMember"));
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
                aria-labelledby="form-dialog-phone"
            >
                <DialogTitle id="form-dialog-phone">Edit Member</DialogTitle>
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
                                    value={this.state.itemSelected.phone}
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
                                    value={this.state.username}
                                    style={{ minWidth: 560, display: 'inline-flex' }}
                                    onChange={(value) => {
                                        this.setState({ username: value.target.value });
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
                                    accept="status/*"
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
                aria-labelledby="form-dialog-phone"
            >
                <DialogTitle id="form-dialog-phone">Add New Member</DialogTitle>
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
                                    value={this.state.username}
                                    style={{ minWidth: 560, display: 'inline-flex' }}
                                    onChange={(value) => {
                                        this.setState({ username: value.target.value });
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
                                    accept="status/*"
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
    return <DeActiveMember dispatch={dispatch} navigate={navigate} />;
};
