import { Button, Card, Typography } from '@mui/material';
import { Component } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import AlternateEmailOutlinedIcon from '@mui/icons-material/AlternateEmailOutlined';
import HttpsOutlinedIcon from '@mui/icons-material/HttpsOutlined';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
import { setUser } from '../../redux/actions/loginAction';
import { apiLogin } from '../req/req_user';

interface PropsMain {
    dispatch: any;
    navigate: any;
    user: any;
    auth: any;
}
interface StateMain {
    visible: boolean;
    username: string;
    password: string;
}

class Login extends Component<PropsMain, StateMain> {

    constructor(props: PropsMain) {
        super(props);
        this.state = {
            visible: false,
            // username: "admadmedika",
            // password: "Admed!ka@1",
            username: "",
            password: "",
        };
    }

    render() {
        const { visible, username, password } = this.state;
        const { auth } = this.props;
        return (
            <div className='column aCenter fullHeight loginpage'>
                <Card style={{
                    backgroundColor: "#a2a2a278",
                    color: "white"
                }}>
                    <div className='column' style={{ width: 380, height: 280, padding: 20 }}>
                        <Typography variant='h3'>Login</Typography>

                        <div style={{ height: 30 }} />
                        <div className='field expand'>

                            <div className='box-input row' style={{ alignItems: "center" }}>
                                <AlternateEmailOutlinedIcon style={{ marginLeft: 10 }} />
                                <input type='text' placeholder='email address'
                                    className='expand search-member fieldtext'
                                    value={username}
                                    onChange={(e) => this.setState({ username: e.target.value })}
                                />
                            </div>
                            <div style={{ height: 20 }} />
                            <div className='box-input row expand'
                                style={{ alignItems: "center", cursor: "pointer" }}
                            >
                                <HttpsOutlinedIcon style={{ marginLeft: 10 }} />
                                <input type={visible ? 'text' : 'password'} placeholder='password'
                                    className='expand search-member fieldtext'
                                    value={password}
                                    onChange={(e) => this.setState({ password: e.target.value })}
                                />

                                {visible
                                    ? <VisibilityOffOutlinedIcon style={{ marginRight: 10 }}
                                        onClick={() => this.setState({ visible: !visible })} />
                                    : <VisibilityOutlinedIcon style={{ marginRight: 10 }}
                                        onClick={() => this.setState({ visible: !visible })} />}
                            </div>
                            <div style={{ height: 10 }} />
                            {/* <Typography variant='body2'><a href="#">Lupa password</a></Typography> */}
                        </div>

                        <div className='footer-login row' style={{
                            justifyContent: "end"
                        }}>
                            <Button variant="contained" onClick={async () => {
                                apiLogin({
                                    "userUsername": username,
                                    "userPassword": password,
                                    "userInsuranceId": 3
                                }).then(({ code, message, data }) => {
                                    if (code === 200) {
                                        const dataUser = {
                                            "id": data.userUsername,
                                            "username": data.userName,
                                            "name": data.userName,
                                            "profile_image": data.userProfileImage,
                                            "role": data.userRole
                                        };
                                        localStorage.setItem('accessToken', data.userToken);
                                        localStorage.setItem('user', JSON.stringify(dataUser));
                                        this.props.dispatch(setUser({ user: dataUser}));
                                    } else {
                                        alert(message);
                                    }
                                });
                            }}>Login</Button>
                        </div>
                    </div>

                </Card>
            </div>
        );
    }
}

export default (): any => {
    const user = useSelector((state: any) => state.loginReducer.user);
    const auth = useSelector((state: any) => state.loginReducer.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    return <Login dispatch={dispatch} navigate={navigate} user={user} auth={auth} />;
};
