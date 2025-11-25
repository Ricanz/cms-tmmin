import React, { Component } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { changeTitle } from '../../redux/actions/titleAction';
import { useLocation, useNavigate } from 'react-router-dom';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import { Alert, Button, Paper, Snackbar, Switch, Typography } from '@mui/material';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import AddPhotoAlternateOutlinedIcon from '@mui/icons-material/AddPhotoAlternateOutlined';
import EditOffOutlinedIcon from '@mui/icons-material/EditOffOutlined';
import EditorPhoto from '../photo/EditorPhoto';
import MediaPopup from '../../component/MediaPopup';
import { apiAddDinMenu, apiUpdateDinMenu } from '../req/req_dinmenu';

interface PropsMain {
    dispatch: any;
    navigate: any;
    location: any;
}

interface StateMain {
    id: string;
    name: string;
    content: string;
    messageSnackbar: string;
    alertMessage: string;
    image: string;
    imageIcon: string;
    preview: string;
    previewIcon: string;
    editMode: boolean;
    openSnackbar: boolean;
    alertOpen: boolean;
    mediaPopup: boolean;
    mediaPopupIcon: boolean;
    is_active: boolean;
    file: any;
}

class AddDynMenu extends Component<PropsMain, StateMain> {
    editorRef: any;

    constructor(props: PropsMain) {
        super(props);

        let id = "";
        let name = "";
        let content = "";
        let imageIcon = "";
        let image = "";
        let preview = "";
        let previewIcon = "";
        let is_active = false;
        let editMode = false;
        if (props.location.state) {
            // console.log(props.location.state);
            name = props.location.state.name;
            content = props.location.state.content;
            imageIcon = props.location.state.icon;
            previewIcon = props.location.state.icon;
            image = props.location.state.image;
            preview = props.location.state.image;
            is_active = props.location.state.is_active;
            id = props.location.state.id;
            editMode = true;
        }

        this.state = {
            id: id,
            name: name,
            content: content,
            image: image,
            imageIcon: imageIcon,
            messageSnackbar: "",
            alertMessage: "",
            preview: preview,
            previewIcon: previewIcon,
            editMode: editMode,
            openSnackbar: false,
            alertOpen: false,
            mediaPopup: false,
            mediaPopupIcon: false,
            is_active: is_active,
            file: null,
        };
    }

    componentDidMount() {
        this.props.dispatch(changeTitle('Add Dynamic Menu'));
    }


    render() {
        return (
            <div className='row'>
                <div className="ckeditor-container expand">
                    <div className='box-input row expand' style={{
                        alignItems: "center",
                        marginBottom: 10,
                    }}>
                        <input type='text' value={this.state.name} placeholder='Name' className='expand search-member'
                            onChange={(e) => this.setState({ name: e.target.value })}
                        />
                    </div>

                    <CKEditor
                        //@ts-ignore
                        editor={ClassicEditor}
                        data={this.state.content}
                        onReady={editor => {
                            this.editorRef = editor;
                        }}
                        onChange={(event, editor) => {
                            //@ts-ignore
                            const data = editor.getData();
                            this.setState({ content: data });
                        }}
                    />
                </div>
                <Paper className='column' style={{
                    margin: 20, marginTop: 0, width: 300, marginBottom: 0,
                    height: "calc(100vh - 100px)",
                }}>
                    {this.buttonAction()}
                    <div className='expand  element-with-scrollbar' style={{ overflow: 'auto', }}>
                        <div style={{ height: 10 }} />
                        {this.activeWidget()}
                        {this.renderImagesIcon()}
                        {this.renderImages()}
                    </div>
                </Paper>

                <Snackbar
                    open={this.state.openSnackbar}
                    autoHideDuration={3000}
                    onClose={() => this.setState({ openSnackbar: false, messageSnackbar: "" })}
                    message={this.state.messageSnackbar}
                />

                <Snackbar
                    open={this.state.alertOpen}
                    autoHideDuration={6000}
                    anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                    onClose={() => this.setState({ alertOpen: false })}
                >
                    <Alert onClose={() => this.setState({ alertOpen: false })} severity="error">
                        {this.state.alertMessage}
                    </Alert>
                </Snackbar>

                <MediaPopup open={this.state.mediaPopup} closePopup={() => this.setState({ mediaPopup: false })} onClick={(url: string) => {
                    this.setState({ image: url, preview: url });
                }} />

                <MediaPopup open={this.state.mediaPopupIcon} closePopup={() => this.setState({ mediaPopupIcon: false })} onClick={(url: string) => {
                    this.setState({ imageIcon: url, previewIcon: url });
                }} />
            </div>
        );
    }

    activeWidget() {
        return (
            <div className='post_props'>
                <div className='row bCenter post_label'>
                    <div style={{ width: 10 }} />
                    <Typography variant='subtitle1'><b>Active Menu</b></Typography>
                </div>
                <div className='props_field' style={{ padding: 10 }}>
                    <Switch
                        checked={this.state.is_active}
                        onChange={(e) => {
                            this.setState({ is_active: e.currentTarget.checked });
                        }}
                    />
                </div>
            </div>
        );
    }

    buttonAction() {
        return (
            <div className='row' style={{ padding: 10 }}>
                <div style={{ width: 10 }} />
                <Button variant='contained' className='expand' onClick={async () => {
                    if (!this.state.name.trim()) {
                        this.showAlert("Name is empty!");
                        return;
                    }

                    if (!this.state.content.trim()) {
                        this.showAlert("Content is empty!");
                        return;
                    }

                    if (!this.state.imageIcon.trim()) {
                        this.showAlert("Icon is empty!");
                        return;
                    }

                    if (!this.state.image.trim()) {
                        this.showAlert("Image is empty!");
                        return;
                    }

                    // console.log({
                    //     "icon": this.state.imageIcon,
                    // "name": this.state.name,
                    // "image": this.state.image,
                    // "content": this.state.content,
                    // "is_active": this.state.is_active
                    //     });


                    if (this.state.editMode) {
                        apiUpdateDinMenu({
                            "icon": this.state.imageIcon,
                            "name": this.state.name,
                            "image": this.state.image,
                            "content": this.state.content,
                            "is_active": this.state.is_active,
                            "id": this.state.id
                        }).then(() => {
                            window.history.back();
                        });
                    } else {
                        apiAddDinMenu({
                            "icon": this.state.imageIcon,
                            "name": this.state.name,
                            "image": this.state.image,
                            "content": this.state.content,
                            "is_active": this.state.is_active
                        }).then(() => {
                            window.history.back();
                        });
                    }
                }}>{this.state.editMode ? "Update" : "Add"}</Button>
            </div >
        );
    }

    renderImagesIcon() {
        return (
            <div className='post_props'>
                <div className='row bCenter post_label'>
                    <AddPhotoAlternateOutlinedIcon />
                    <div style={{ width: 10 }} />
                    <Typography variant='subtitle1'><b>Icon</b></Typography>
                </div>
                <div className='props_field img-hober' style={{ padding: 10 }}>
                    <div className='image_preview' style={{
                        height: 200,
                        backgroundImage: `url(${this.state.previewIcon})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                    }} onClick={() => {
                        this.setState({ mediaPopupIcon: true });
                    }}>
                        {this.state.preview
                            ? <EditOffOutlinedIcon className='img2' style={{ fontSize: 50 }} />
                            : <AddPhotoAlternateOutlinedIcon className='img2' style={{ fontSize: 50 }} />}
                    </div>
                </div>
            </div>
        );
    }

    renderImages() {
        return (
            <div className='post_props'>
                <div className='row bCenter post_label'>
                    <AddPhotoAlternateOutlinedIcon />
                    <div style={{ width: 10 }} />
                    <Typography variant='subtitle1'><b>Image</b></Typography>
                </div>
                <div className='props_field img-hober' style={{ padding: 10 }}>
                    <div className='image_preview' style={{
                        height: 200,
                        backgroundImage: `url(${this.state.preview})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                    }} onClick={() => {
                        this.setState({ mediaPopup: true });
                    }}>
                        {this.state.preview
                            ? <EditOffOutlinedIcon className='img2' style={{ fontSize: 50 }} />
                            : <AddPhotoAlternateOutlinedIcon className='img2' style={{ fontSize: 50 }} />}
                    </div>
                </div>
            </div>
        );
    }

    showAlert(message: string) {
        this.setState({
            alertOpen: true,
            alertMessage: message
        });
    }

}

export default (propt: any): any => {
    const count = useSelector((state: any) => state.counter.count);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    return <AddDynMenu dispatch={dispatch} navigate={navigate} location={location} />;
};