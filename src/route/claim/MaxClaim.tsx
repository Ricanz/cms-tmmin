import React, { Component } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Outlet, useNavigate } from 'react-router-dom';
import { changeTitle } from '../../redux/actions/titleAction';
import { Alert, Button, InputAdornment, Snackbar, TextField } from '@mui/material';
import AttachmentIcon from '@mui/icons-material/Attachment';
import MediaPopup from '../../component/MediaPopup';
import PersonIcon from '@mui/icons-material/Person';
import EmailIcon from '@mui/icons-material/Email';
import LanguageIcon from '@mui/icons-material/Language';
import TitleIcon from '@mui/icons-material/Title';
import FormatColorTextIcon from '@mui/icons-material/FormatColorText';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import PriceChangeIcon from '@mui/icons-material/PriceChange';
import { apiGetMaxClaim, apiUpdateMaxClaim } from '../req/req_maxclaim';

interface PropsMain {
    dispatch: any;
    navigate: any;
}
interface StateMain {
    toats: boolean;
    mediaPopup: boolean;
    id: string;
    maxClaim: string;
}

class MaxClaim extends Component<PropsMain, StateMain> {

    constructor(props: PropsMain) {
        super(props);
        this.state = {
            toats: false,
            mediaPopup: false,
            id: "",
            maxClaim: "",
        };
    }

    getData() {
        apiGetMaxClaim().then((data) => {
            this.setState({
                maxClaim: data.data.max_claim,
                id: data.data.id,
            });
        });
    }

    componentDidMount(): void {
        this.props.dispatch(changeTitle("Edit Max Claim"));
        this.getData();
    }


    render() {
        return (
            <div>
                <div style={{ padding: 10, width: 500 }}>
                    <TextField label={"Max Claim"} fullWidth value={this.state.maxClaim} onChange={(e) => {
                        this.setState({ maxClaim: e.target.value });
                    }}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <PriceChangeIcon />
                                </InputAdornment>
                            ),
                        }}
                    />
                </div>

                <div style={{ padding: 10 }}>
                    <Button variant="contained"
                        style={{ paddingLeft: 30, paddingRight: 30 }}
                        onClick={() => {
                            // console.log("===>", this.state.id, this.state.maxClaim);
                            apiUpdateMaxClaim(this.state.id, this.state.maxClaim).then(() => {
                                this.setState({ toats: true });
                            });
                        }}
                    >Update</Button>
                </div>



                <MediaPopup
                    open={this.state.mediaPopup}
                    closePopup={() => this.setState({ mediaPopup: false })}
                    onClick={(url: string) => {

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
    return <MaxClaim dispatch={dispatch} navigate={navigate} />;
};
