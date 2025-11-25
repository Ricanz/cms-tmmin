import React, { Component } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Outlet, useNavigate } from 'react-router-dom';
import { changeTitle } from '../../redux/actions/titleAction';
import { Alert, Button, InputAdornment, Snackbar, TextField } from '@mui/material';
import AttachmentIcon from '@mui/icons-material/Attachment';
import MediaPopup from '../../component/MediaPopup';
import PersonIcon from '@mui/icons-material/Person';
import EmailIcon from '@mui/icons-material/Email';
import LanguageIcon from '@mui/icons-material/Language';
import TitleIcon from '@mui/icons-material/Title';
import FormatColorTextIcon from '@mui/icons-material/FormatColorText';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import { samplePostMan, sendNotif } from '../req/req_notif';

interface PropsMain {
    dispatch: any;
    navigate: any;
}
interface StateMain {
    toats: boolean;
    mediaPopup: boolean;
    title: string;
    message: string;
    url: string;
    fileExcel: string;
    byName: string;
    byAge: string;
    byCard: string;
    byCompany: string;
    alertMessage: string;
    file: any;
    alertOpen: boolean;
}

class PushNotif extends Component<PropsMain, StateMain> {

    constructor(props: PropsMain) {
        super(props);
        this.state = {
            toats: false,
            mediaPopup: false,
            title: "",
            message: "",
            url: "",
            fileExcel: "",
            byName: "",
            byAge: "",
            byCard: "",
            byCompany: "",
            alertMessage: "",
            file: null,
            alertOpen: false,
        };
    }

    componentDidMount(): void {
        this.props.dispatch(changeTitle("Push Notifications"));
    }


    render() {
        return (
            <div>
                <div style={{ padding: 10, width: 500 }}>
                    <TextField label={"Title"} fullWidth value={this.state.title} onChange={(e) => {
                        this.setState({ title: e.target.value });
                    }}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <FormatColorTextIcon />
                                </InputAdornment>
                            ),
                        }}
                    />
                </div>
                <div style={{ padding: 10, width: 500 }}>
                    <TextField
                        label="Message"
                        fullWidth
                        multiline
                        rows={3}
                        value={this.state.message}
                        onChange={(e) => {
                            this.setState({ message: e.target.value });
                        }}
                    />
                </div>
                <div style={{ padding: 10, width: 500 }}>
                    <TextField label={"Url"} fullWidth value={this.state.url} onChange={(e) => {
                        this.setState({ url: e.target.value });
                    }}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <LanguageIcon />
                                </InputAdornment>
                            ),
                        }}
                    />
                </div>

                <div style={{ margin: 10, fontWeight: "bold" }}>Recipients:</div>
                <div style={{ marginLeft: 10 }}>Upload excel file (1 field contains Card Number, 1st row is header)</div>
                <div style={{ padding: 10, width: 615, display: "flex" }}>
                    {/* <TextField fullWidth value={this.state.fileExcel} />
                    <div style={{ width: 10 }}></div>
                    <Button variant="contained" startIcon={<AttachmentIcon />}
                        style={{ paddingLeft: 30, paddingRight: 30 }}
                        onClick={() => {
                            this.setState({ mediaPopup: true });
                        }}
                    >File</Button> */}
                    <TextField
                        fullWidth
                        type="file"
                        style={{ width: 500 }}
                        InputProps={{
                            inputProps: {
                                accept: ".csv", // accept only Excel files, adjust if necessary
                                onChange: (event) => {
                                    //@ts-ignore
                                    if (event.target.files.length > 0) {
                                        //@ts-ignore
                                        const file = event.target.files[0];
                                        this.setState({
                                            fileExcel: file.name,  // set filename to state
                                            file: file  // store the file to state
                                        });
                                    }
                                }
                            }
                        }}
                    />
                </div>

                <div style={{ margin: 10, fontWeight: "bold" }}>OR:</div>

                <div style={{ padding: 10, width: 500 }}>
                    <TextField label={"By Name"} fullWidth value={this.state.byName} onChange={(e) => {
                        this.setState({ byName: e.target.value });
                    }}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <FilterAltIcon />
                                </InputAdornment>
                            ),
                        }}
                    />
                </div>

                <div style={{ padding: 10, width: 500 }}>
                    <TextField label={"By Age"} fullWidth value={this.state.byAge} onChange={(e) => {
                        this.setState({ byAge: e.target.value });
                    }}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <FilterAltIcon />
                                </InputAdornment>
                            ),
                        }}
                    />
                </div>

                <div style={{ padding: 10, width: 500 }}>
                    <TextField label={"By Card Number"} fullWidth value={this.state.byCard} onChange={(e) => {
                        this.setState({ byCard: e.target.value });
                    }}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <FilterAltIcon />
                                </InputAdornment>
                            ),
                        }}
                    />
                </div>

                <div style={{ padding: 10, width: 500 }}>
                    <TextField label={"By Company"} fullWidth value={this.state.byCompany} onChange={(e) => {
                        this.setState({ byCompany: e.target.value });
                    }}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <FilterAltIcon />
                                </InputAdornment>
                            ),
                        }}
                    />
                </div>


                <div style={{ padding: 10 }}>
                    <Button variant="contained"
                        style={{ paddingLeft: 30, paddingRight: 30 }}
                        onClick={() => {
                            // const dataSend = {
                            //     title: this.state.title,
                            //     message: this.state.message,
                            //     url: this.state.url,
                            //     byCard: this.state.byCard,
                            //     byName: this.state.byName,
                            //     byCompany: this.state.byCompany,
                            //     byAge: this.state.byAge,
                            //     file: this.state.file,
                            // };
                            if (!this.state.title) {
                                alert("Please input title");
                            }
                            if (!this.state.message) {
                                alert("Please input message");
                            }

                            let rec = "";
                            let sendby = "";
                            if (this.state.byCard) {
                                sendby = "cardno";
                                rec = this.state.byCard;
                            }
                            if (this.state.byName) {
                                sendby = "name";
                                rec = this.state.byName;
                            }
                            if (this.state.byCompany) {
                                sendby = "company";
                                rec = this.state.byCompany;
                            }
                            if (this.state.byAge) {
                                sendby = "age";
                                rec = this.state.byAge;
                            }

                            if (this.state.file) {
                                // sendNotif("file", {
                                //     title: this.state.title,
                                //     message: this.state.message,
                                //     url: this.state.url,
                                //     recipient: this.state.file
                                // }).then(() => {
                                //     this.setState({ alertMessage: "Message Send" });
                                // });
                                alert("File belum didukung");
                            } else {
                                if (rec) {
                                    samplePostMan(sendby, {
                                        title: this.state.title,
                                        message: this.state.message,
                                        url: this.state.url,
                                        recipient: rec
                                    }).then(() => {
                                        this.setState({ alertMessage: "Message Send" });
                                    });
                                } else {
                                    this.setState({ alertMessage: "Please fullfield" });
                                }
                            }
                        }}
                    >Send Notification</Button>
                </div>

                <Snackbar
                    open={this.state.alertOpen}
                    autoHideDuration={6000}
                    onClose={() => this.setState({ alertOpen: false })}
                >
                    <Alert onClose={() => this.setState({ alertOpen: false })} severity="error">
                        {this.state.alertMessage}
                    </Alert>
                </Snackbar>

                <MediaPopup
                    open={this.state.mediaPopup}
                    closePopup={() => this.setState({ mediaPopup: false })}
                    onClick={(url: string) => {

                    }} />

                <Snackbar
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                    open={this.state.toats} autoHideDuration={6000} onClose={() => this.setState({ toats: false })}>
                    <Alert onClose={() => this.setState({ toats: false })} severity="success">
                        Success update content
                    </Alert>
                </Snackbar>
            </div>
        );
    }
}

export default (): any => {
    const count = useSelector((state: any) => state.counter.count);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    return <PushNotif dispatch={dispatch} navigate={navigate} />;
};
