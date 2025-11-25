import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import React, { Component } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { changeTitle } from '../../redux/actions/titleAction';
import MediaPopup from '../../component/MediaPopup';
import { Alert, Button, Snackbar } from '@mui/material';
import { apiGetAbout, apiUpdateAbout } from '../req/req_about';

interface PropsMain {
    dispatch: any;
    count: any;
}

interface StateMain {
    aboutContent: string;
    file2: any;
    mediaPopup: boolean;
    toats: boolean;
    aboutID: string;
}

class About extends Component<PropsMain, StateMain> {

    editorRef: any;
    execute: boolean = false;
    refFile: any;
    refFile2: any;
    constructor(props: PropsMain) {
        super(props);
        this.state = {
            aboutID: "",
            aboutContent: "",
            file2: null,
            mediaPopup: false,
            toats: false,
        };
    }

    componentDidMount(): void {
        this.props.dispatch(changeTitle("About"));
        apiGetAbout().then(({ code, message, data }) => {
            if (code == 200) {
                this.setState({
                    aboutID: data.aboutID,
                    aboutContent: data.aboutContent,
                });
            } else {
                alert(message);
            }
        });
    }

    render() {
        return (
            <div style={{ marginRight: 20 }}>
                <CKEditor
                    //@ts-ignore
                    editor={ClassicEditor}
                    data={this.state.aboutContent}
                    onReady={editor => {
                        this.editorRef = editor;
                        //@ts-ignore
                        document.querySelector(".ck-file-dialog-button").addEventListener("click", (e) => {
                            e.preventDefault();
                            this.setState({ mediaPopup: true });
                            return false;
                        });
                    }}
                    onChange={(event, editor) => {
                        //@ts-ignore
                        const data = editor.getData();
                        this.setState({ aboutContent: data });
                    }}
                />

                <div style={{ margin: 10, textAlign: "left", marginLeft: 0 }}>
                    <Button variant='contained' className='expand' onClick={async () => {
                        apiUpdateAbout(this.state.aboutID, this.state.aboutContent).then(({ code, message, data }) => {
                            if (code == 200) {
                                this.setState({ toats: true });
                            } else {
                                alert(message);
                            }
                        });
                    }}>{"Update"}</Button>
                </div>


                {this.state.mediaPopup ? (<MediaPopup
                    open={this.state.mediaPopup} closePopup={() => this.setState({ mediaPopup: false })} onClick={(url: string) => {
                        this.editorRef.execute('insertImage', {
                            source: {
                                src: url, 
                                alt: 'Image'
                            }
                        });
                    }} />) : null}
                

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
    return (
        <div className="App" >
            <About dispatch={dispatch} count={count} />
        </div>
    );
};
