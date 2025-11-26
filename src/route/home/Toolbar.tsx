import { Component } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button, ListItemIcon, ListItemText, Menu, MenuItem, Popover, Typography } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';


interface PropsMain {
    dispatch: any;
    title: string
}

interface StateMain {
    anchorEl: any;
    anchorEl2: any;
    left: number;
    top: number;
    user: any;
}

class Toolbar extends Component<PropsMain, StateMain> {

    notifRef: any;

    constructor(props: PropsMain) {
        super(props);
        this.state = {
            anchorEl: null,
            anchorEl2: null,
            left: 0,
            top: 0,
            user: {},
        };
    }

    componentDidMount(): void {
        //@ts-ignore
        const user = JSON.parse(localStorage.getItem("user"));
        // console.log(user);
        this.setState({ user });
    }

    render() {
        return (
            <div className='header'>
                <div className='expand'>
                    <div className='row aCenter'>
                        <div className='expand row'>
                            <h1>{this.props.title}</h1>
                        </div>
                        {/* <IconButton style={{ margin: 10, width: 50, height: 50 }} onClick={(e) => {
                            this.setState({
                                anchorEl: this.notifRef,
                            });
                            console.dir(this.notifRef.offsetLeft);
                            console.dir(this.notifRef.offsetTop);
                        }} ref={(r) => this.notifRef = r}>
                            <NotificationsIcon fontSize={"medium"} />
                        </IconButton> */}
                    </div>
                </div>
                <Button variant="text" endIcon={<AccountCircleIcon />} onClick={(e) => {
                    this.setState({ anchorEl2: e.target });
                }}>{this.state.user.name}</Button>


                {this.state.anchorEl ? (<div className='arrow' style={{
                    position: "fixed",
                    borderBottom: "10px solid #999999",
                    borderLeft: "10px solid transparent",
                    borderRight: "10px solid transparent",
                    top: this.state.anchorEl.offsetTop + 40,
                    left: this.state.anchorEl.offsetLeft + 15,
                }}></div>) : null}

                <Popover
                    id={"123"}
                    open={Boolean(this.state.anchorEl)}
                    anchorEl={this.state.anchorEl}
                    onClose={() => {
                        this.setState({ anchorEl: null })
                    }}
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'center',
                    }}
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'center',
                    }}
                >
                    <div className='container' style={{
                        width: 400, height: 600,
                    }}>
                        <Typography sx={{ p: 2 }}>Notification menu content</Typography>
                    </div>
                </Popover>

                <Menu
                    id="basic-menu"
                    anchorEl={this.state.anchorEl2}
                    open={Boolean(this.state.anchorEl2)}
                    onClose={() => this.setState({ anchorEl2: null })}
                    MenuListProps={{
                        'aria-labelledby': 'basic-button',
                    }}
                >
                    <MenuItem style={{ width: 200 }} onClick={() => {
                        this.setState({ anchorEl2: null });
                        localStorage.removeItem("accessToken");
                        document.location.reload();
                    }}>
                        <ListItemIcon><PowerSettingsNewIcon /></ListItemIcon>
                        <ListItemText>Logout</ListItemText>
                    </MenuItem>
                </Menu>
            </div>
        );
    }
}

export default (): any => {
    const title = useSelector((state: any) => state.titleReducer.title);
    const dispatch = useDispatch();
    return (
        <div className="App" >
            <Toolbar dispatch={dispatch} title={title} />
        </div>
    );
};
