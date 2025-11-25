/* eslint-disable import/no-anonymous-default-export */
import React, { Component } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import './App.css';
import { Outlet } from 'react-router-dom';
import Menu from './route/home/Menu';
import Toolbar from './route/home/Toolbar';
import Login from './route/login/Login';
import { Card, Paper, Snackbar } from '@mui/material';
// import { auth } from './firebase';
// import { onAuthStateChanged } from 'firebase/auth';
import { setUser } from './redux/actions/loginAction';
import { apiGetAccountInfo } from './route/req/req_user';


interface PropsHomePage {
    dispatch: any;
    user: any;
    reducer: any;
}

interface StateHome {
    loading: boolean;
}

class HomePages extends Component<PropsHomePage, StateHome> {

    ref: any;

    constructor(props: PropsHomePage) {
        super(props);
        this.state = {
            loading: false,
        };
    }

    componentDidMount(): void {
        const accessToken = localStorage.getItem('accessToken') ?? "";
        apiGetAccountInfo(accessToken).then(({ code, message, data, status }) => {
            if (code === 200) {
                const user = data;
                this.props.dispatch(setUser({ user }));
            }
        });
    }

    renderData() {
        return Array.from({ length: 5 }).map((p, i) => {
            return (
                <Paper key={i} style={{
                    margin: 10,
                }}>
                    <Card style={{ padding: 10, }}>Number {i}</Card>
                </Paper>
            );
        });
    }

    render() {
        //USER LOGIN
        return this.props.user == null ? <Login /> : (
            <div className="main">
                <Menu />
                <div className='body'>
                    <Toolbar />
                    <div className='body'>
                        <Outlet />
                    </div>
                </div>


                <Snackbar
                    anchorOrigin={{ vertical: "top", horizontal: "right" }}
                    open={this.props.reducer.toast}
                    onClose={() => {

                    }}
                    message={this.props.reducer.toastTitle}
                    key={"info1"}
                />
            </div>
        );
    }
}

export default (): any => {
    const user = useSelector((state: any) => state.loginReducer.user);
    const reducer = useSelector((state: any) => state.titleReducer);
    const dispatch = useDispatch();
    return <HomePages dispatch={dispatch} user={user} reducer={reducer} />;
};
