import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import { Component } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { changeTitle } from '../../redux/actions/titleAction';
import MediaPopup from '../../component/MediaPopup';
import { Alert, Button, Snackbar } from '@mui/material';
import { apiGetPdp, apiUpdatePdp } from '../req/req_pdp';

interface PropsMain {
    dispatch: any;
    count: any;
}

interface StateMain {
    pdpContent: string;
    file2: any;
    mediaPopup: boolean;
    toats: boolean;
    pdpID: string;
}

class Pdp extends Component<PropsMain, StateMain> {

    editorRef: any;
    execute: boolean = false;
    refFile: any;
    refFile2: any;
    constructor(props: PropsMain) {
        super(props);
        this.state = {
            pdpID: "",
            pdpContent: "",
            file2: null,
            mediaPopup: false,
            toats: false,
        };
    }

    componentDidMount(): void {
        this.props.dispatch(changeTitle("Ketentuan PDP"));
        apiGetPdp().then(({ code, message, data }) => {
            if (code == 200) {
                this.setState({
                    pdpID: data.pdpID,
                    pdpContent: data.pdpContent,
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
                    data={this.state.pdpContent}
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
                        this.setState({ pdpContent: data });
                    }}
                />

                <div style={{ margin: 10, textAlign: "left", marginLeft: 0 }}>
                    <Button variant='contained' className='expand' onClick={async () => {
                        apiUpdatePdp(this.state.pdpID, this.state.pdpContent).then(({ code, message, data }) => {
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
            <Pdp dispatch={dispatch} count={count} />
        </div>
    );
};
