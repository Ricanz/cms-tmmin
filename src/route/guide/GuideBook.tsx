import React, { Component } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Outlet, useNavigate } from 'react-router-dom';
import { changeTitle } from '../../redux/actions/titleAction';
import { Alert, Button, Snackbar, TextField } from '@mui/material';
import AttachmentIcon from '@mui/icons-material/Attachment';
import MediaPopup from '../../component/MediaPopup';
import { apiGetGuideBook, apiUpdateGuideBook } from '../req/req_guidebook';

interface PropsMain {
    dispatch: any;
    navigate: any;
}
interface StateMain {
    toats: boolean;
    mediaPopup: boolean;
    title: string;
    guidebook_app: string;
    guidebook_image: string;
    id: string;
}

class GuideBook extends Component<PropsMain, StateMain> {

    constructor(props: PropsMain) {
        super(props);
        this.state = {
            toats: false,
            mediaPopup: false,
            title: "",
            guidebook_app: "",
            guidebook_image: "",
            id: "",
        };
    }

    componentDidMount(): void {
        this.props.dispatch(changeTitle("GuideBook"));
        apiGetGuideBook().then(({ code, message, data }) => {
            if (code == 200) {
                this.setState({ title: data.guidebookTitle, guidebook_app: data.guidebookApp, id: data.guidebookID, guidebook_image: data.guidebookImage });
            } else {
                alert(message);
            }
        });
    }


    render() {
        return (
            <div>
                <div style={{ padding: 10, width: 500 }}>
                    <TextField label={"Guide Book Name"} fullWidth value={this.state.title} onChange={(e) => {
                        this.setState({ title: e.target.value });
                    }} />
                </div>
                <div style={{ padding: 10, width: 615, display: "flex" }}>
                    <TextField fullWidth value={this.state.guidebook_app} />
                    <div style={{ width: 10 }}></div>
                    <Button variant="contained" startIcon={<AttachmentIcon />}
                        style={{ paddingLeft: 30, paddingRight: 30 }}
                        onClick={() => {
                            this.setState({ mediaPopup: true });
                        }}
                    >File</Button>
                </div>

                <div style={{ padding: 10, display: "flex" }}>
                    <Button variant="contained"
                        style={{ paddingLeft: 30, paddingRight: 30 }}
                        onClick={() => {
                            if (this.state.guidebook_app) {
                                window.open(this.state.guidebook_app, "blank");
                            }
                        }}
                    >Check File</Button>
                    <div style={{ width: 10 }}></div>
                    <Button variant="contained"
                        style={{ paddingLeft: 30, paddingRight: 30 }}
                        onClick={() => {
                            //update data
                            apiUpdateGuideBook({
                                "guidebookID": this.state.id,
                                "guidebookTitle": this.state.title,
                                "guidebookApp": this.state.guidebook_app,
                                "guidebookImage": this.state.guidebook_image
                            }).then(({ code, message, data }) => {
                                if (code == 200) {
                                    this.setState({ toats: true });
                                } else {
                                    alert(message);
                                }
                            });
                        }}
                    >Update</Button>
                </div>

                <MediaPopup
                    open={this.state.mediaPopup}
                    type={["pdf"]}
                    closePopup={() => this.setState({ mediaPopup: false })}
                    onClick={(url: string) => {
                        this.setState({
                            guidebook_app: url,
                            mediaPopup: false,
                        });
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
    return <GuideBook dispatch={dispatch} navigate={navigate} />;
};
