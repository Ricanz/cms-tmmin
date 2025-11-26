import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import { Component } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { changeTitle } from '../../redux/actions/titleAction';
import MediaPopup from '../../component/MediaPopup';
import { Alert, Button, Snackbar } from '@mui/material';
import { apiGetTerm, apiUpdateTerm } from '../req/req_term';

interface PropsMain {
    dispatch: any;
    count: any;
}

interface StateMain {
    content: string;
    file2: any;
    mediaPopup: boolean;
    toats: boolean;
    id: string;
}

class Term extends Component<PropsMain, StateMain> {

    editorRef: any;
    execute: boolean = false;
    refFile: any;
    refFile2: any;
    constructor(props: PropsMain) {
        super(props);
        this.state = {
            id: "",
            content: "",
            file2: null,
            mediaPopup: false,
            toats: false,
        };
    }

    componentDidMount(): void {
        this.props.dispatch(changeTitle("Term"));
        apiGetTerm().then(({ code, message, data }) => {
            if (code === 200) {
                this.setState({
                    id: data.termID,
                    content: data.termContent,
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
                    data={this.state.content}
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
                        this.setState({ content: data });
                    }}
                />

                <div style={{ margin: 10, textAlign: "left", marginLeft: 0 }}>
                    <Button variant='contained' className='expand' onClick={async () => {
                        apiUpdateTerm(this.state.id, this.state.content).then(({ code, message, data }) => {
                            if (code === 200) {
                                this.setState({ toats: true });
                            } else {
                                alert(message);
                            }
                        });
                    }}>{"Update"}</Button>
                </div>

                {!this.state.mediaPopup ? null : (<MediaPopup
                    open={this.state.mediaPopup} closePopup={() => this.setState({ mediaPopup: false })} onClick={(url: string) => {
                        this.editorRef.execute('insertImage', {
                            source: {
                                src: url, alt: 'Image'
                            }
                        });
                    }} />)}

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
            <Term dispatch={dispatch} count={count} />
        </div>
    );
};
