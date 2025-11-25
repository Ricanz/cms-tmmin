/* eslint-disable */

import React, { Component } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Outlet, useNavigate, useParams } from 'react-router-dom';
import { Button, Paper, Snackbar, Typography } from '@mui/material';
import { changeTitle } from '../../redux/actions/titleAction';
import TagOutlinedIcon from '@mui/icons-material/TagOutlined';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import AddPhotoAlternateOutlinedIcon from '@mui/icons-material/AddPhotoAlternateOutlined';
import WbIncandescentOutlinedIcon from '@mui/icons-material/WbIncandescentOutlined';
import EditOffOutlinedIcon from '@mui/icons-material/EditOffOutlined';
import EditorPhoto from '../photo/EditorPhoto';
import { apiAddNews, apiGetNewsById, apiUpdateNews } from '../req/req_news';
import MediaPopup from '../../component/MediaPopup';

import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

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
    mediaPopup2: boolean;
}

class AddArticle extends Component<PropsMain, StateMain> {

    editorRef: any;
    editorCkRef: any;
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
            mediaPopup2: false,
            contentReady: props.params.id ? false : true,
        };
    }

    componentDidMount(): void {
        const { id } = this.state;
        if (id) {
            this.props.dispatch(changeTitle("Edit Article"));
            apiGetNewsById(id).then(({ code, message, data }) => {
                if (code == 200) {
                    this.setState({
                        title: data.newsTitle,
                        description: data.newsDescription,
                        content: data.newsContent,
                        tags: data.newsTags,
                        image: data.newsImage,
                        preview: data.newsImage,
                        contentReady: true,
                    });
                } else {
                    alert(message);
                }
            });
        } else {
            this.props.dispatch(changeTitle("Create Article"));
        }
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

    render() {
        return this.state.contentReady ? (
            <div className='row'>
                <div className="ckeditor-container expand">
                    <div className='box-input row expand' style={{
                        alignItems: "center",
                        marginBottom: 10,
                    }}>
                        <input type='text' value={this.state.title} placeholder='Title Post' className='expand search-member'
                            onChange={(e) => this.setState({ title: e.target.value })}
                        />
                    </div>

                    <CKEditor
                        //@ts-ignore
                        editor={ClassicEditor}
                        ref={(r) => {
                            this.editorCkRef = r;
                        }}
                        config={{
                            toolbar: {
                                items: [
                                    'heading',
                                    '|',
                                    'fontColor',
                                    'fontSize',
                                    'fontFamily',
                                    'fontBackgroundColor',
                                    'bold',
                                    'italic',
                                    'link',
                                    'bulletedList',
                                    'imageUpload',
                                    'numberedList',
                                    '|',
                                    'outdent',
                                    'indent',
                                    '|',
                                    'blockQuote',
                                    'sourceEditing'
                                ]
                            },
                        }}
                        data={this.state.content}
                        onReady={editor => {
                            this.editorRef = editor;
                            //@ts-ignore
                            document.querySelector(".ck-file-dialog-button").addEventListener("click", (e) => {
                                e.preventDefault();
                                this.setState({
                                    mediaPopup2: true
                                });
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
                <Paper className='column' style={{
                    margin: 20, marginTop: 0, width: 300, marginBottom: 0,
                    height: "calc(100vh - 100px)",
                }}>
                    {this.buttonAction()}
                    <div className='expand  element-with-scrollbar' style={{ overflow: 'auto', }}>
                        {/* {this.renderSelectCategory()} */}
                        <div style={{ height: 10 }} />
                        {this.renderDescription()}
                        <div style={{ height: 10 }} />
                        {this.renderTags()}
                        <div style={{ height: 10 }} />
                        {this.renderImages()}
                    </div>
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
                    // this.uploadFile(preview, (event: any) => {
                    //     if (event.type == 'success') {
                    //         this.editorRef.model.change((writer: any) => {
                    //             const imageElement = writer.createElement('imageBlock', {
                    //                 src: event.data,
                    //             });
                    //             this.editorRef.model.insertContent(imageElement, this.editorRef.model.document.selection);
                    //             this.execute = false;
                    //         });
                    //     }
                    // });
                }} /> : null}

                <Snackbar
                    open={this.state.openSnackbar}
                    autoHideDuration={3000}
                    onClose={() => this.setState({ openSnackbar: false, messageSnackbar: "" })}
                    message={this.state.messageSnackbar}
                />

                <MediaPopup open={this.state.mediaPopup2} closePopup={() => this.setState({ mediaPopup2: false })} onClick={(url: string) => {
                    console.log(this.editorCkRef);
                    const editorInstance = this.editorCkRef.editor;
                    // editorInstance.model.change(writer => {
                    //     editorInstance.model.insertContent(writer.createText('Hello World'), editorInstance.model.document.selection);
                    // });

                    // editorInstance.model.change(writer => {
                    //     const imageElement = writer.createElement('image', {
                    //         src: url
                    //     });
                    //     const insertAtSelection = editorInstance.model.document.selection.getFirstPosition();
                    //     editorInstance.model.insertContent(imageElement, insertAtSelection);
                    // });

                    editorInstance.execute('insertImage', { source: url });

                }} />

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
                {/* {this.state.id != "" && this.state.status == "draft" ? (
                    <Button variant='outlined' className='expands' onClick={async () => {
                        try {
                            let postsCollection;
                            if (this.state.id) {
                                postsCollection = doc(firestore, 'web_content', this.state.id);
                                const docRef = await updateDoc(postsCollection, {
                                    title: this.state.title,
                                    category: this.state.category,
                                    description: this.state.description,
                                    tags: this.state.tags,
                                    image: this.state.image,
                                    content: this.state.content,
                                    status: "draft",
                                    last_update: Date.now(),
                                });
                                this.setState({
                                    messageSnackbar: "Data update",
                                    openSnackbar: true,
                                });
                            } else {
                                postsCollection = collection(firestore, 'web_content');
                                const docRef = await addDoc(postsCollection, {
                                    title: this.state.title,
                                    category: this.state.category,
                                    description: this.state.description,
                                    tags: this.state.tags,
                                    image: this.state.image,
                                    content: this.state.content,
                                    status: "draft",
                                    last_update: Date.now(),
                                });
                                this.setState({
                                    id: docRef.id,
                                    messageSnackbar: "Data Saved",
                                    openSnackbar: true,
                                }, () => {
                                    this.props.navigate("/article/edit-article/" + docRef.id);
                                });
                            }
                        } catch (e) {
                            console.error('Error adding document: ', e);
                        }
                    }}>Draft</Button>
                ) : null} */}
                <div style={{ width: 10 }} />
                <Button variant='contained' className='expand' onClick={async () => {
                    if (this.state.id) {
                        const dataSend = {
                            newsID: this.state.id,
                            newsTitle: this.state.title,
                            newsDescription: this.state.description,
                            newsAuthor: "Admin",
                            newsIsActive: true,
                            newsTags: this.state.tags,
                            link: this.generateLink(this.state.title, "https://www.admedika.co.id"),
                            newsContent: this.state.content,
                            newsImage: this.state.image,
                        };
                        apiUpdateNews(dataSend).then((value) => {
                            if (value.code == 200) {
                                this.props.navigate("/article/all-article/");
                            } else {
                                alert(value.message);
                            }
                        });
                    } else {
                        const accessToken = localStorage.getItem("accessToken") ?? "";
                        const dataSend = {
                            newsTitle: this.state.title,
                            newsDescription: this.state.description,
                            newsAuthor: "Admin",
                            newsIsActive: true,
                            newsTags: this.state.tags,
                            link: this.generateLink(this.state.title, "https://www.admedika.co.id"),
                            newsContent: this.state.content,
                            newsImage: this.state.image,
                        };
                        apiAddNews(accessToken, dataSend).then(value => {
                            if (value.code == 200) {
                                this.props.navigate("/article/all-article/");
                            } else {
                                alert(value.message);
                            }
                        });
                    }
                }}>{this.state.id ? "Update Publish" : "Publish"}</Button>
            </div>
        );
    }

    generateLink(title, host) {
        // Filter karakter untuk hanya mengandung alfanumerik dan spasi
        const filteredTitle = title.replace(/[^a-zA-Z0-9 ]/g, "");

        // Ubah semua karakter menjadi huruf kecil
        const lowerTitle = filteredTitle.toLowerCase();

        // Gantikan semua spasi dengan '-'
        const slug = lowerTitle.split(' ').join('-');

        // Gabungkan host dan slug untuk membentuk URL
        return `${host}${slug}`;
    }
    // renderSelectCategory() {
    //     return (
    //         <div className='post_props'>
    //             <div className='row bCenter post_label'>
    //                 <CategoryOutlinedIcon />
    //                 <div style={{ width: 10 }} />
    //                 <Typography variant='subtitle1'><b>Category</b></Typography>
    //             </div>
    //             <div className='props_field' style={{ padding: 10 }}>
    //                 <FormControl style={{ width: '100%' }}>
    //                     <Select value={this.state.category} onChange={(event) => {
    //                         this.setState({
    //                             category: event.target.value,
    //                         });
    //                     }}>
    //                         <MenuItem value="-">
    //                             <em>Select Category</em>
    //                         </MenuItem>
    //                         {this.state.listCategory.map((item: string, i: number) => {
    //                             return (<MenuItem key={`category-${i}`} value={item}>{item}</MenuItem>);
    //                         })}
    //                     </Select>
    //                 </FormControl>
    //             </div>
    //         </div>
    //     );
    // }

    renderDescription() {
        return (
            <div className='post_props'>
                <div className='row bCenter post_label'>
                    <WbIncandescentOutlinedIcon />
                    <div style={{ width: 10 }} />
                    <Typography variant='subtitle1'><b>Description</b></Typography>
                </div>
                <div className='props_field' style={{ padding: 10 }}>
                    <textarea value={this.state.description} placeholder='Enter text description' className='txt_desc'
                        onChange={(e) => this.setState({ description: e.target.value })}
                    ></textarea>
                </div>
            </div>
        );
    }
    renderTags() {
        return (
            <div className='post_props'>
                <div className='row bCenter post_label'>
                    <TagOutlinedIcon />
                    <div style={{ width: 10 }} />
                    <Typography variant='subtitle1'><b>Tags</b></Typography>
                </div>
                <div className='props_field' style={{ padding: 10 }}>
                    <div className='box-input row expand' style={{ alignItems: "center" }}>
                        <input type='text' placeholder='Enter Tags' className='expand search-member'
                            onKeyUp={(event: any) => {
                                if (event.key === 'Enter') {
                                    this.setState({
                                        tags: [...this.state.tags, event.target.value]
                                    }, () => {
                                        event.target.value = "";
                                    });
                                }
                            }}
                        />
                    </div>
                    <div className='preview_tags'>
                        {this.state.tags.map((tag: string, i: number) => {
                            return (
                                <div key={`tags-${i}`} className='row tags-style'>
                                    <CloseOutlinedIcon fontSize='small' onClick={() => {
                                        this.setState({
                                            tags: this.state.tags.filter((t) => t !== tag),
                                        });
                                    }} />
                                    <label>{tag}</label>
                                </div>
                            );
                        })}
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
                        // this.refFile.click();
                        // this.props.navigate("/edit-photo");
                        this.setState({ mediaPopup: true });
                    }}>
                        {this.state.preview
                            ? <EditOffOutlinedIcon className='img2' style={{ fontSize: 50 }} />
                            : <AddPhotoAlternateOutlinedIcon className='img2' style={{ fontSize: 50 }} />}
                    </div>
                    {/* <input type="file" ref={(r) => this.refFile = r} style={{ display: 'none' }}
                        onChange={(event) => {
                            const selectedFile = event.target.files ? event.target.files[0] : null;
                            if (selectedFile) {
                                const reader = new FileReader();
                                reader.onloadend = () => {
                                    const image = new Image();
                                    image.onload = () => {
                                        this.setState({ file: image });
                                    };
                                    //@ts-ignore
                                    image.src = reader.result;
                                    // this.setState({
                                    //     preview: reader.result ? reader.result.toString() : "",
                                    // });
                                };
                                reader.readAsDataURL(selectedFile);
                            }
                        }}
                    /> */}
                </div>

                {this.state.file ? <EditorPhoto file={this.state.file} onFinish={(preview: any) => {
                    // this.uploadFile(preview, (event: any) => {
                    //     if (event.type == 'success') {
                    //         this.setState({ preview: event.data, file: null, image: event.data });
                    //     }
                    // });
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
    return <AddArticle dispatch={dispatch} navigate={navigate} params={params} />;
};