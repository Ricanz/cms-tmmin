import React, { Component } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Outlet, useNavigate } from 'react-router-dom';
import { changeTitle } from '../../../redux/actions/titleAction';
import { Alert, Button, InputAdornment, Snackbar, TextField } from '@mui/material';
import AttachmentIcon from '@mui/icons-material/Attachment';
import MediaPopup from '../../../component/MediaPopup';
import PersonIcon from '@mui/icons-material/Person';
import ContactPhoneIcon from '@mui/icons-material/ContactPhone';
import EmailIcon from '@mui/icons-material/Email';
import LanguageIcon from '@mui/icons-material/Language';
import { apiGetContact, apiUpdateContact } from '../../req/req_contact';

interface PropsMain {
    dispatch: any;
    navigate: any;
}
interface StateMain {
    toats: boolean;
    mediaPopup: boolean;
    contactName: string;
    address: string;
    phone: string;
    email: string;
    web: string;
    id: string;
}

class Contact extends Component<PropsMain, StateMain> {

    constructor(props: PropsMain) {
        super(props);
        this.state = {
            toats: false,
            mediaPopup: false,
            contactName: "",
            address: "",
            phone: "",
            email: "",
            web: "",
            id: "",
        };
    }

    getData() {
        apiGetContact().then((data) => {
            this.setState({
                contactName: data.data.contact_name,
                address: data.data.address,
                phone: data.data.phone,
                email: data.data.email,
                web: data.data.website,
                id: data.data.id,
            });
        });
    }

    componentDidMount(): void {
        this.props.dispatch(changeTitle("Edit Contact Us"));
        this.getData();
    }


    render() {
        return (
            <div>
                <div style={{ padding: 10, width: 500 }}>
                    <TextField label={"Contact Name"} fullWidth value={this.state.contactName} onChange={(e) => {
                        this.setState({ contactName: e.target.value });
                    }}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <PersonIcon />
                                </InputAdornment>
                            ),
                        }}
                    />
                </div>
                <div style={{ padding: 10, width: 500 }}>
                    <TextField
                        label="Address"
                        fullWidth
                        multiline
                        rows={3}
                        value={this.state.address}
                        onChange={(e) => {
                            this.setState({ address: e.target.value });
                        }}
                    />
                </div>
                <div style={{ padding: 10, width: 500 }}>
                    <TextField label={"Phone"} fullWidth value={this.state.phone} onChange={(e) => {
                        this.setState({ phone: e.target.value });
                    }}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <ContactPhoneIcon />
                                </InputAdornment>
                            ),
                        }}
                    />
                </div>
                <div style={{ padding: 10, width: 500 }}>
                    <TextField label={"Email"} fullWidth value={this.state.email} onChange={(e) => {
                        this.setState({ email: e.target.value });
                    }}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <EmailIcon />
                                </InputAdornment>
                            ),
                        }}
                    />
                </div>
                <div style={{ padding: 10, width: 500 }}>
                    <TextField label={"Website"} fullWidth value={this.state.web} onChange={(e) => {
                        this.setState({ web: e.target.value });
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


                <div style={{ padding: 10 }}>
                    <Button variant="contained"
                        style={{ paddingLeft: 30, paddingRight: 30 }}
                        onClick={() => {
                            apiUpdateContact({
                                contact_name: this.state.contactName,
                                address: this.state.address,
                                phone: this.state.phone,
                                email: this.state.email,
                                website: this.state.web,
                                id: this.state.id,
                            }).then(() => this.setState({ toats: true }));
                        }}
                    >Update</Button>
                </div>



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
    return <Contact dispatch={dispatch} navigate={navigate} />;
};

