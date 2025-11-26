import { Component } from 'react';
import { useDispatch } from 'react-redux';
import { changeTitle } from '../../redux/actions/titleAction';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { Alert, Autocomplete, Button, FormControl, MenuItem, Paper, Select, Snackbar, TextField, Typography } from '@mui/material';
// import MediaPopup from '../../component/MediaPopup';
// import EditorPhoto from '../photo/EditorPhoto';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import CategoryIcon from '@mui/icons-material/Category';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { apiFaqAdd, apiFaqUpdate } from '../req/req_faq';

interface PropsMain {
    dispatch: any;
    navigate: any;
    params: any;
    location: any;
}

interface StateMain {
    contentReady: boolean;
    question: string;
    answer: string;
    id: string;
    openSnackbar: boolean;
    messageSnackbar: string;
    listCategory: string[];
    category: string;
    alertOpen: boolean;
    alertMessage: string;
    editMode: boolean;
}

class AddFaq extends Component<PropsMain, StateMain> {
    editorRef: any;

    constructor(props: PropsMain) {
        super(props);
        const datas = props.location.state
          .map((e: any) => e["faqCategory"])
          .reduce((acc: any, item: any) => {
            console.log("acc: ", acc);

            acc[item] = (acc[item] || 0) + 1;
            return acc;
          }, {});
        let dataRow: any = {};
        let editMode = false;
        if (props.params.id) {
            dataRow = props.location.state.filter(
              (e: any) => e["faqID"] === props.params.id
            )[0];
            editMode = true;
        }
        // console.log("dataRow", props.params.id, dataRow);
        this.state = {
            contentReady: props.params.id ? false : true,
            question: dataRow["faqQuestion"],
            answer: dataRow["faqAnswer"],
            id: dataRow["faqID"],
            openSnackbar: false,
            messageSnackbar: "",
            listCategory: Object.keys(datas),
            category: dataRow["faqCategory"],
            alertOpen: false,
            alertMessage: "",
            editMode: editMode
        };
    }

    componentDidMount() {
        this.props.dispatch(changeTitle((this.state.editMode ? "Edit" : "Add") + ' FAQ'));
    }

    render() {
        return (
            <div className='row'>
                <div className="ckeditor-container expand">
                    <div className='box-input row expand' style={{
                        alignItems: "center",
                        marginBottom: 10,
                    }}>
                        <input type='text' value={this.state.question} placeholder='Input Question' className='expand search-member'
                            onChange={(e) => this.setState({ question: e.target.value })}
                        />
                    </div>

                    <div style={{ fontWeight: "bold", paddingBottom: 10, paddingTop: 10 }}>Answer</div>

                    <CKEditor
                        //@ts-ignore
                        editor={ClassicEditor}
                        config={{
                            toolbar: []  // Mengatur toolbar menjadi array kosong
                        }}
                        data={this.state.answer}
                        onReady={editor => {
                            this.editorRef = editor;
                        }}
                        onChange={(event, editor) => {
                            //@ts-ignore
                            const data = editor.getData();
                            this.setState({ answer: data });
                        }}
                    />
                </div>
                <Paper className='column' style={{
                    margin: 20, marginTop: 0, width: 300, marginBottom: 0,
                    height: "calc(100vh - 100px)",
                }}>
                    {this.buttonAction()}
                    <div className='expand  element-with-scrollbar' style={{ overflow: 'auto', }}>
                        {this.renderAutoComplete()}
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
            </div>
        );
    }

    renderAutoComplete() {
        return (
            <div className='props_field' style={{ padding: 10 }}>
                <Autocomplete
                    options={this.state.listCategory}
                    getOptionLabel={(option) => option}
                    value={this.state.category}
                    onChange={(event, value, reason) => {
                        this.setState({ category: value || "" });
                    }}
                    renderInput={(params) => (
                        <TextField {...params} label="Category" variant="outlined" onChange={(e) => {
                            this.setState({ category: e.target.value });
                        }} onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                                e.preventDefault();
                                //@ts-ignore
                                e.target.blur();
                                this.setState({
                                    listCategory: [...this.state.listCategory, this.state.category],
                                });
                            }
                        }} />
                    )}
                />
            </div>
        );
    }

    renderSelectCategory() {
        return (
            <div className='post_props'>
                <div className='row bCenter post_label'>
                    <CategoryIcon />
                    <div style={{ width: 10 }} />
                    <Typography variant='subtitle1'><b>Category</b></Typography>
                </div>
                <div className='props_field' style={{ padding: 10 }}>
                    <FormControl style={{ width: '100%' }}>
                        <Select value={this.state.category} onChange={(event) => {
                            this.setState({
                                category: event.target.value,
                            });
                        }}>
                            <MenuItem value="-">
                                <em>Select Category</em>
                            </MenuItem>
                            {this.state.listCategory.map((item: string, i: number) => {
                                return (<MenuItem key={`category-${i}`} value={item}>{item}</MenuItem>);
                            })}
                        </Select>
                    </FormControl>
                </div>
            </div>
        );
    }

    buttonAction() {
        return (
            <div className='row' style={{ padding: 10 }}>
                <div style={{ width: 10 }} />
                <Button variant='contained' className='expand' onClick={async () => {
                    if (!this.state.answer.trim()) {
                        this.showAlert("Answer is empty!");
                        return;
                    }

                    if (!this.state.question.trim()) {
                        this.showAlert("Question is empty!");
                        return;
                    }

                    if (!this.state.category.trim()) {
                        this.showAlert("Category is empty!");
                        return;
                    }

                    if (this.state.editMode) {
                        apiFaqUpdate({
                            "faqAnswer": this.state.answer,
                            "faqCategory": this.state.category,
                            "faqQuestion": this.state.question,
                            "faqID": this.state.id
                        }).then(() => {
                            window.history.back();
                        });
                    } else {
                        apiFaqAdd({
                            "faqAnswer": this.state.answer,
                            "faqCategory": this.state.category,
                            "faqQuestion": this.state.question
                        }).then(() => {
                            window.history.back();
                        });
                    }
                }}>{this.state.editMode ? "Update" : "Add"}</Button>
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
    // const count = useSelector((state: any) => state.counter.count);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const params = useParams();
    return <AddFaq dispatch={dispatch} navigate={navigate} params={params} location={location} />;
};