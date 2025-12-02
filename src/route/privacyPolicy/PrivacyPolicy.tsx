import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import { Component } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { changeTitle } from '../../redux/actions/titleAction';
import MediaPopup from '../../component/MediaPopup';
import { Alert, Button, Snackbar } from '@mui/material';
import { apiGetPrivacyPolicy, apiUpdatePrivacyPolicy } from '../req/req_privacy_policy';

interface PropsMain {
    dispatch: any;
    count: any;
}

interface StateMain {
    ppContent: string;
    file2: any;
    mediaPopup: boolean;
    toats: boolean;
    ppID: string;
}

class PrivacyPolicy extends Component<PropsMain, StateMain> {

    editorRef: any;
    execute: boolean = false;
    refFile: any;
    refFile2: any;
    constructor(props: PropsMain) {
        super(props);
        this.state = {
            ppID: "",
            ppContent: "",
            file2: null,
            mediaPopup: false,
            toats: false,
        };
    }

    componentDidMount(): void {
        this.props.dispatch(changeTitle("Privacy & Policy"));
        apiGetPrivacyPolicy().then(({ code, message, data }) => {
            if (code === 200) {
                this.setState({
                    ppID: data.ppID,
                    ppContent: data.ppContent,
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
                    data={this.state.ppContent}
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
                        this.setState({ ppContent: data });
                    }}
                />

                <div style={{ margin: 10, textAlign: "left", marginLeft: 0 }}>
                    <Button variant='contained' className='expand' onClick={async () => {
                        apiUpdatePrivacyPolicy(this.state.ppID, this.state.ppContent).then(({ code, message, data }) => {
                            if (code === 200) {
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
            <PrivacyPolicy dispatch={dispatch} count={count} />
        </div>
    );
};
