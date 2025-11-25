import React, { Component } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { Box, Button, Paper, Snackbar, Typography } from '@mui/material';
import AddPhotoAlternateOutlinedIcon from '@mui/icons-material/AddPhotoAlternateOutlined';
import EditOffOutlinedIcon from '@mui/icons-material/EditOffOutlined';
import EditorPhoto from './../../route/photo/EditorPhoto';
import MediaPopup from '../../component/MediaPopup';
import { changeTitle } from '../../redux/actions/titleAction';
import { apiAddProduct, apiUpdateProduct } from '../req/req_product';

interface PropsMain {
    dispatch: any;
    navigate: any;
    params: any;
    location: any;
}
interface StateMain {
    preview: string;
    file: any;
    file2: any;
    loadingUploadImage: boolean;
    product_name: string;
    product_name_en: string;
    description: string;
    tags: string[];
    image: string;
    product_desc: string;
    product_desc_en: string;
    listCategory: string[];
    id: string;
    openSnackbar: boolean;
    messageSnackbar: string;
    mediaPopup: boolean;
    contentReady: boolean;
    activeIndexLanguage: number;
}


class AddProduct extends Component<PropsMain, StateMain> {

    editorRef: any;
    editorRef_en: any;
    refFile: any;
    refFile2: any;
    execute: boolean = false;

    constructor(props: PropsMain) {
        super(props);

        let id = "";
        let product_desc = "";
        let product_desc_en = "";
        let product_image = "";
        let product_name = "";
        let product_name_en = "";
        if (props.location.state) {
            // console.log(props.location.state);
            id = props.location.state.id;
            product_desc = props.location.state.product_desc;
            product_desc_en = props.location.state.product_desc_en;
            product_image = props.location.state.product_image;
            product_name = props.location.state.product_name;
            product_name_en = props.location.state.product_name_en;
        }
        this.state = {
            id: id,
            product_desc: product_desc,
            product_desc_en: product_desc_en,
            image: product_image,
            product_name: product_name,
            product_name_en: product_name_en,
            openSnackbar: false,
            messageSnackbar: "",
            listCategory: [],
            loadingUploadImage: false,
            file: null,
            file2: null,
            description: "",
            tags: [],
            preview: product_image,
            mediaPopup: false,
            contentReady: props.params.id ? false : true,
            activeIndexLanguage: 0,
        };
    }

    componentDidMount() {
        this.props.dispatch(changeTitle("Add Product"));
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
            <div className="ckeditor-container expand column main2">
                <div className='box-input row' style={{ alignItems: "center", marginBottom: 10 }}>
                    <input type='text' value={this.state.product_name} placeholder='Product Name (id)' className='expand search-member'
                        onChange={(e) => this.setState({ product_name: e.target.value })}
                    />
                </div>
                <div className='expand'>
                    <CKEditor
                        //@ts-ignore
                        editor={ClassicEditor}
                        data={this.state.product_desc}
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
                            this.setState({ product_desc: data });
                        }}
                    />
                </div>
            </div>
        );
    }

    renderEditor_en() {
        return (
            <div className="ckeditor-container expand column main2">
                <div className='box-input row' style={{ alignItems: "center", marginBottom: 10 }}>
                    <input type='text' value={this.state.product_name_en} placeholder='Product Name (en)' className='expand search-member'
                        onChange={(e) => this.setState({ product_name_en: e.target.value })}
                    />
                </div>
                <div className='expand'>
                    <CKEditor
                        //@ts-ignore
                        editor={ClassicEditor}
                        data={this.state.product_desc_en}
                        onReady={editor => {
                            this.editorRef_en = editor;
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
                            this.setState({ product_desc_en: data });
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
                        <Box display={this.state.activeIndexLanguage === 0 ? 'block' : 'none'}>
                            {this.renderEditor()}
                        </Box>
                        <Box display={this.state.activeIndexLanguage === 1 ? 'block' : 'none'}>
                            {this.renderEditor_en()}
                        </Box>
                    </div>
                </div>

                <Paper className='column' style={{
                    margin: 20, marginTop: 0, width: 300, marginBottom: 0,

                    height: "calc(100vh - 100px)",
                }}>
                    <div className='expand  element-with-scrollbar' style={{ overflow: 'auto', }}>
                        {this.renderImages()}
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
                    const dataSend = {
                        "feature": "product_info",
                        "products": [],
                        "product_desc": this.state.product_desc,
                        "product_name": this.state.product_name,
                        "product_image": this.state.image,
                        "product_desc_en": this.state.product_desc_en,
                        "product_name_en": this.state.product_name_en
                    };
                    if (this.state.id) {
                        apiUpdateProduct({ ...dataSend, id: this.state.id }).then(() => {
                            window.history.back();
                        });
                    } else {
                        apiAddProduct(dataSend).then(() => {
                            window.history.back();
                        });
                    }
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
    const location = useLocation();
    return <AddProduct dispatch={dispatch} navigate={navigate} params={params} location={location} />;
};
