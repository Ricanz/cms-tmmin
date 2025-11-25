import React, { Component } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { Button, InputLabel, Paper, Snackbar, Switch, Typography } from '@mui/material';
import AddPhotoAlternateOutlinedIcon from '@mui/icons-material/AddPhotoAlternateOutlined';
import EditOffOutlinedIcon from '@mui/icons-material/EditOffOutlined';
import EditorPhoto from './../../route/photo/EditorPhoto';
import MediaPopup from '../../component/MediaPopup';
import { changeTitle } from '../../redux/actions/titleAction';
import TagOutlinedIcon from '@mui/icons-material/TagOutlined';

interface PropsMain {
    dispatch: any;
    navigate: any;
    params: any;
}
interface StateMain {
    preview: string;
    file: any;
    file2: any;
    loadingUploadImage: boolean;
    title: string;
    description: string;
    tags: string[];
    image: string;
    content: string;
    listCategory: string[];
    id: string;
    openSnackbar: boolean;
    messageSnackbar: string;
    mediaPopup: boolean;
    contentReady: boolean;
    activeIndexLanguage: number;
}


class AddDynamicMenu extends Component<PropsMain, StateMain> {

    editorRef: any;
    refFile: any;
    refFile2: any;
    execute: boolean = false;

    constructor(props: PropsMain) {
        super(props);
        this.state = {
            openSnackbar: false,
            messageSnackbar: "",
            id: props.params.id,
            listCategory: [],
            loadingUploadImage: false,
            file: null,
            file2: null,
            title: "",
            description: "",
            tags: [],
            content: "",
            image: "",
            preview: "",
            mediaPopup: false,
            contentReady: props.params.id ? false : true,
            activeIndexLanguage: 0,
        };
    }

    componentDidMount() {
        this.props.dispatch(changeTitle("Add Dynamic Menu"));
    }

    convertStringToBlob(dataURI: string) {
        const byteString = atob(dataURI.split(',')[1]);
        const mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
        const ab = new ArrayBuffer(byteString.length);
        const ia = new Uint8Array(ab);
        for (let i = 0; i < byteString.length; i++) {
            ia[i] = byteString.charCodeAt(i);
        }
        return new Blob([ab], { type: mimeString });
    }

    renderEditor() {
        return (
            <div className="ckeditor-container expand column">
                <div className='box-input row' style={{ alignItems: "center", marginBottom: 10 }}>
                    <input type='text' value={this.state.title} placeholder='Menu Name' className='expand search-member'
                        onChange={(e) => this.setState({ title: e.target.value })}
                    />
                </div>
                <div className='expand'>
                    <CKEditor
                        //@ts-ignore
                        editor={ClassicEditor}
                        data={this.state.content}
                        onReady={editor => {
                            this.editorRef = editor;
                            //@ts-ignore
                            document.querySelector(".ck-file-dialog-button").addEventListener("click", (e) => {
                                e.preventDefault();
                                if (this.execute == false) {
                                    this.execute = true;
                                    this.refFile2.click();
                                }
                                return false;
                            });
                        }}
                        onChange={(event, editor) => {
                            //@ts-ignore
                            const data = editor.getData();
                            this.setState({ content: data });
                        }}
                    />
                </div>
            </div>
        );
    }

    render() {
        return this.state.contentReady ? (
            <div className='row'>
                <div className='expand column'>
                    <div className='header-tab' style={{ height: 50, display: 'flex' }}>
                        <div className={this.state.activeIndexLanguage === 0 ? "label-tab active" : "label-tab"} onClick={() => this.setState({ activeIndexLanguage: 0 })}>Indonesia</div>
                        <div className={this.state.activeIndexLanguage === 1 ? "label-tab active" : "label-tab"} onClick={() => this.setState({ activeIndexLanguage: 1 })}>English</div>
                    </div>
                    <div className='content-tab expand' style={{ padding: 10 }}>
                        {this.renderEditor()}
                    </div>
                </div>

                <Paper className='column' style={{
                    margin: 20, marginTop: 0, width: 300, marginBottom: 0,

                    height: "calc(100vh - 100px)",
                }}>
                    <div className='expand element-with-scrollbar' style={{ overflow: 'auto', }}>
                        {this.renderImages()}
                    </div>

                    <div className='post_props'>
                        <div className='row bCenter post_label'>
                            <TagOutlinedIcon />
                            <div style={{ width: 10 }} />
                            <Typography variant='subtitle1'><b>Active</b></Typography>
                            <div className='expand'></div>
                            <Switch checked={true} onChange={() => true} />
                        </div>
                    </div>

                    {this.buttonAction()}
                </Paper>

                <input type="file" ref={(r) => this.refFile2 = r} style={{ display: 'none' }}
                    onChange={(event) => {
                        const selectedFile = event.target.files ? event.target.files[0] : null;
                        if (selectedFile) {
                            const reader = new FileReader();
                            reader.onloadend = () => {
                                const image = new Image();
                                image.onload = () => {
                                    this.setState({ file2: image });
                                };
                                //@ts-ignore
                                image.src = reader.result;
                            };
                            reader.readAsDataURL(selectedFile);
                        }
                    }}
                />

                {this.state.file2 ? <EditorPhoto file={this.state.file2} onFinish={(preview: any) => {
                    this.setState({ file2: null });
                }} /> : null}

                <Snackbar
                    open={this.state.openSnackbar}
                    autoHideDuration={3000}
                    onClose={() => this.setState({ openSnackbar: false, messageSnackbar: "" })}
                    message={this.state.messageSnackbar}
                />

                <MediaPopup open={this.state.mediaPopup} closePopup={() => this.setState({ mediaPopup: false })} onClick={(url: string) => {
                    this.setState({
                        image: url,
                        preview: url,
                    });
                }} />
            </div>
        ) : <div>Loading ...</div>;
    }

    buttonAction() {
        return (
            <div className='row' style={{ padding: 10 }}>
                <div style={{ width: 10 }} />
                <Button variant='contained' className='expand' onClick={async () => {

                }}>{this.state.id ? "Update" : "Save"}</Button>
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

                {this.state.file ? <EditorPhoto file={this.state.file} onFinish={(preview: any) => {

                }} /> : null}

            </div>
        );
    }
}


export default (props: any): any => {
    const count = useSelector((state: any) => state.counter.count);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const params = useParams();
    return <AddDynamicMenu dispatch={dispatch} navigate={navigate} params={params} />;
};
