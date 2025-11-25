import { IconButton, ListItemIcon, Menu, MenuItem, Paper, Typography } from '@mui/material';
import React, { Component } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Outlet, useNavigate } from 'react-router-dom';
import AttachmentIcon from '@mui/icons-material/Attachment';
import SendIcon from '@mui/icons-material/Send';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import FileOpenIcon from '@mui/icons-material/FileOpen';
import MyLocationIcon from '@mui/icons-material/MyLocation';
import MoreVertOutlinedIcon from '@mui/icons-material/MoreVertOutlined';
import BlockOutlinedIcon from '@mui/icons-material/BlockOutlined';
import SaveAsOutlinedIcon from '@mui/icons-material/SaveAsOutlined';
import GetAppOutlinedIcon from '@mui/icons-material/GetAppOutlined';
import FileCopyOutlinedIcon from '@mui/icons-material/FileCopyOutlined';
import { changeTitle } from '../../redux/actions/titleAction';


interface PropsMain {
    dispatch: any;
    navigate: any;
}
interface StateMain {
    anchorElAttachment: any;
    anchorElChat: any;
}

class AllMessage extends Component<PropsMain, StateMain> {

    constructor(props: PropsMain) {
        super(props);
        this.state = {
            anchorElAttachment: null,
            anchorElChat: null,
        };
    }

    componentDidMount(): void {
        this.props.dispatch(changeTitle("All Message"));
    }

    render() {
        return (
            <React.Fragment>

                <Paper className='expand column' style={{ margin: 20, marginTop: 0 }}>
                    <div className='header-chat row' style={{ alignItems: "center" }}>
                        <div className='info-user row aCenter'>
                            <div className='avatar' style={{
                                backgroundImage: 'url(https://avatars.githubusercontent.com/u/97165289)',
                                backgroundRepeat: "no-repeat",
                                backgroundSize: "cover",
                                border: "1px solid #ccc",
                                width: 40,
                                height: 40,
                                margin: 10,
                            }}></div>
                            <div className='user-name'>
                                <b>Jupri Irawan</b>
                                <div className='row'>
                                    <Typography variant='body2'>Card No: 8000101000769388</Typography>
                                    <IconButton
                                        style={{
                                            width: 20, height: 20
                                        }}
                                    >
                                        <FileCopyOutlinedIcon style={{ fontSize: 14 }} />
                                    </IconButton>
                                </div>
                            </div>
                        </div>
                        <div className='expand'></div>
                        <IconButton
                            aria-controls="dropdown-menu"
                            aria-haspopup="true"
                            style={{ width: 50, height: 50 }}
                            onClick={(e) => this.setState({ anchorElChat: e.target })}
                        >
                            <MoreVertOutlinedIcon />
                        </IconButton>
                    </div>
                    <div className='body-chat expand'></div>
                    <div className='footer-chat row' style={{ alignItems: "center" }}>
                        <IconButton
                            aria-controls="dropdown-menu"
                            aria-haspopup="true"
                            style={{ width: 50, height: 50 }}
                            onClick={(e) => this.setState({ anchorElAttachment: e.target })}
                        >
                            <AttachmentIcon />
                        </IconButton>


                        <div className='box-input row expand' style={{ alignItems: "center" }}>
                            <input type='text' placeholder='Write Message' className='expand search-member' />
                        </div>

                        <IconButton
                            aria-controls="dropdown-menu"
                            aria-haspopup="true"
                            style={{ width: 50, height: 50 }}
                            onClick={() => true}
                        >
                            <SendIcon />
                        </IconButton>
                    </div>
                </Paper>


                <Menu
                    id="dropdown-menu-chat"
                    anchorEl={this.state.anchorElChat}
                    open={Boolean(this.state.anchorElChat)}
                    onClose={() => this.setState({ anchorElChat: null })}
                >
                    <MenuItem disabled>
                        <Typography variant="inherit" color="textSecondary">
                            chat
                        </Typography>
                    </MenuItem>
                    <MenuItem onClick={() => this.setState({ anchorElChat: null })}>
                        <ListItemIcon>
                            <GetAppOutlinedIcon />
                        </ListItemIcon>
                        Export to text
                    </MenuItem>
                    <MenuItem onClick={() => this.setState({ anchorElChat: null })}>
                        <ListItemIcon>
                            <SaveAsOutlinedIcon />
                        </ListItemIcon>
                        Draft chat
                    </MenuItem>
                    <MenuItem onClick={() => this.setState({ anchorElChat: null })}>
                        <ListItemIcon>
                            <BlockOutlinedIcon />
                        </ListItemIcon>
                        Block user
                    </MenuItem>
                </Menu>

                <Menu
                    id="dropdown-menu-attachment"
                    anchorEl={this.state.anchorElAttachment}
                    open={Boolean(this.state.anchorElAttachment)}
                    onClose={() => this.setState({ anchorElAttachment: null })}
                >
                    <MenuItem disabled>
                        <Typography variant="inherit" color="textSecondary">
                            select file
                        </Typography>
                    </MenuItem>
                    <MenuItem onClick={() => this.setState({ anchorElAttachment: null })}>
                        <ListItemIcon>
                            <AddPhotoAlternateIcon />
                        </ListItemIcon>
                        Photo
                    </MenuItem>
                    <MenuItem onClick={() => this.setState({ anchorElAttachment: null })}>
                        <ListItemIcon>
                            <FileOpenIcon />
                        </ListItemIcon>
                        File Document
                    </MenuItem>
                    <MenuItem onClick={() => this.setState({ anchorElAttachment: null })}>
                        <ListItemIcon>
                            <MyLocationIcon />
                        </ListItemIcon>
                        Location
                    </MenuItem>
                </Menu>
            </React.Fragment>
        );
    }
}

export default (): any => {
    const count = useSelector((state: any) => state.counter.count);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    return <AllMessage dispatch={dispatch} navigate={navigate} />;
};
