/* eslint-disable import/no-anonymous-default-export */
import { Card, Collapse, List, ListItemButton, ListItemIcon, ListItemText, ListSubheader } from '@mui/material';
import React, { Component } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import NewspaperIcon from '@mui/icons-material/Newspaper';
import SettingsIcon from '@mui/icons-material/Settings';
import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';
import { ExpandLess, ExpandMore } from '@mui/icons-material';
import GTranslateIcon from '@mui/icons-material/GTranslate';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import PersonOffIcon from '@mui/icons-material/PersonOff';
import Person2Icon from '@mui/icons-material/Person2';
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';
import ListAltIcon from '@mui/icons-material/ListAlt';
import InfoIcon from '@mui/icons-material/Info';
import { useNavigate } from 'react-router-dom';
import GradingIcon from '@mui/icons-material/Grading';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import PermContactCalendarIcon from '@mui/icons-material/PermContactCalendar';
import CampaignIcon from '@mui/icons-material/Campaign';
import BusinessIcon from '@mui/icons-material/Business';
import LocalLibraryIcon from '@mui/icons-material/LocalLibrary';
import CategoryIcon from '@mui/icons-material/Category';
import PivotTableChartIcon from '@mui/icons-material/PivotTableChart';
import SignalCellularAltIcon from '@mui/icons-material/SignalCellularAlt';
import ViewCarouselIcon from '@mui/icons-material/ViewCarousel';
import WidgetsIcon from '@mui/icons-material/Widgets';
import LiveHelpIcon from '@mui/icons-material/LiveHelp';
import BloodtypeIcon from '@mui/icons-material/Bloodtype';
// import { auth } from './../../firebase';
// import { signOut } from 'firebase/auth';
//@ts-ignore
// import logo from "../../logo.png";
import logo from "../../image/logo-tmmin.png";
import SettingsInputSvideoIcon from '@mui/icons-material/SettingsInputSvideo';
import SettingsInputCompositeIcon from '@mui/icons-material/SettingsInputComposite';
import TagIcon from '@mui/icons-material/Tag';
import LineStyleIcon from '@mui/icons-material/LineStyle';
import AttractionsIcon from '@mui/icons-material/Attractions';

interface PropsMain {
    dispatch: any;
    count: any;
    navigate: any;
}

interface MenuProps {
    label: string;
    path?: string;
    onClick?: Function;
    open?: boolean;
    active: boolean,
    icon: any;
    childreen?: MenuProps[];
}

interface StateMain {
    open: boolean;
    listMenu: MenuProps[];
}



class Menu extends Component<PropsMain, StateMain> {

    constructor(props: PropsMain) {
        super(props);
        this.state = {
            open: true,
            listMenu: []
            // listMenu: [
            //     // {
            //     //     label: "Dashboard",
            //     //     icon: DashboardIcon,
            //     //     active: true,
            //     //     path: "/dashboard"
            //     // },
            //     {
            //         label: "Health Article",
            //         icon: NewspaperIcon,
            //         active: false,
            //         path: "/article",
            //         open: true,
            //         childreen: [
            //             {
            //                 label: "Add Article",
            //                 icon: DriveFileRenameOutlineIcon,
            //                 active: false,
            //                 path: "/article/add-article",
            //             },
            //             {
            //                 label: "All Article",
            //                 icon: ListAltIcon,
            //                 active: false,
            //                 path: "/article/all-article",
            //             },
            //         ],
            //     },
            //     {
            //         label: "Member",
            //         icon: AccountBoxIcon,
            //         active: false,
            //         path: "/member",
            //         open: true,
            //         childreen: [
            //             {
            //                 label: "All Member",
            //                 icon: PersonAddIcon,
            //                 active: false,
            //                 path: "/member/all-member"
            //             },
            //             {
            //                 label: "Active Member",
            //                 icon: Person2Icon,
            //                 active: false,
            //                 path: "/member/active-member"
            //             },
            //             {
            //                 label: "Deactive Member",
            //                 icon: PersonOffIcon,
            //                 active: false,
            //                 path: "/member/deactive-member"
            //             },
            //         ]
            //     },
            //     // {
            //     //     label: "Message",
            //     //     icon: MessageIcon,
            //     //     active: false,
            //     //     path: "/message"
            //     // },
            //     {
            //         label: "FAQ",
            //         icon: LiveHelpIcon,
            //         active: false,
            //         path: "/faq/all"
            //     },
            //     {
            //         label: "Banner",
            //         icon: ViewCarouselIcon,
            //         active: false,
            //         path: "/banner"
            //     },
            //     {
            //         label: "Dynamic Menu",
            //         icon: WidgetsIcon,
            //         active: false,
            //         path: "/dynamicmenu"
            //     },
            //     {
            //         label: "Branch Office",
            //         icon: BusinessIcon,
            //         active: false,
            //         path: "/brandoffice"
            //     },
            //     {
            //         label: "Buku Panduan",
            //         icon: LocalLibraryIcon,
            //         active: false,
            //         path: "/manualbook"
            //     },
            //     {
            //         label: "Product Info",
            //         icon: CategoryIcon,
            //         active: false,
            //         path: "/productinfo"
            //     },
            //     {
            //         label: "Corporate Profile",
            //         icon: InfoIcon,
            //         active: false,
            //         path: "/about"
            //     },
            //     // {
            //     //     label: "Claim",
            //     //     icon: PivotTableChartIcon,
            //     //     active: false,
            //     //     path: "/claim"
            //     // },
            //     {
            //         label: "Term",
            //         icon: GradingIcon,
            //         active: false,
            //         path: "/term"
            //     },
            //     // {
            //     //     label: "Guidebook",
            //     //     icon: AutoStoriesIcon,
            //     //     active: false,
            //     //     path: "/guidebook"
            //     // },
            //     {
            //         label: "Setting",
            //         icon: SettingsIcon,
            //         active: false,
            //         path: "/setting",
            //         open: true,
            //         childreen: [
            //             // {
            //             //     label: "App Config",
            //             //     icon: SettingsEthernetIcon,
            //             //     active: false,
            //             //     path: "/setting/app-config"
            //             // },
            //             {
            //                 label: "Max Claim",
            //                 icon: SignalCellularAltIcon,
            //                 active: false,
            //                 path: "/setting/maxclaim"
            //             },
            //             {
            //                 label: "Language Config",
            //                 icon: GTranslateIcon,
            //                 active: false,
            //                 path: "/setting/language"
            //             },
            //             {
            //                 label: "User",
            //                 icon: VerifiedUserIcon,
            //                 active: false,
            //                 path: "/user"
            //             },
            //             {
            //                 label: "Contact",
            //                 icon: PermContactCalendarIcon,
            //                 active: false,
            //                 path: "/setting/contact"
            //             },
            //             {
            //                 label: "Push Notification",
            //                 icon: CampaignIcon,
            //                 active: false,
            //                 path: "/pushnotification"
            //             },
            //             // {
            //             //     label: "User Priveleges",
            //             //     icon: VerifiedUserIcon,
            //             //     active: false,
            //             //     path: "/setting/user"
            //             // },
            //         ]
            //     },
            //     {
            //         label: "Logout",
            //         icon: PowerSettingsNewIcon,
            //         active: false,
            //         onClick: () => {
            //             // signOut(auth);
            //             localStorage.removeItem("accessToken");
            //             document.location.reload();
            //         }
            //     },
            // ],
        };
    }

    componentDidMount(): void {
        this.getTheMenu();
    }

    getTheMenu() {
        const CS = [
            {
                label: "Member",
                icon: AccountBoxIcon,
                active: false,
                path: "/member",
                open: true,
                childreen: [
                    {
                        label: "All Member",
                        icon: PersonAddIcon,
                        active: false,
                        path: "/member/all-member"
                    },
                    {
                        label: "Active Member",
                        icon: Person2Icon,
                        active: false,
                        path: "/member/active-member"
                    },
                    {
                        label: "Deactive Member",
                        icon: PersonOffIcon,
                        active: false,
                        path: "/member/deactive-member"
                    },
                ]
            }
        ];
        const ADMIN = [
            {
                label: "Health Article",
                icon: NewspaperIcon,
                active: false,
                path: "/article",
                open: true,
                childreen: [
                    {
                        label: "Add Article",
                        icon: DriveFileRenameOutlineIcon,
                        active: false,
                        path: "/article/add-article",
                    },
                    {
                        label: "All Article",
                        icon: ListAltIcon,
                        active: false,
                        path: "/article/all-article",
                    },
                ],
            },
            {
                label: "Member",
                icon: AccountBoxIcon,
                active: false,
                path: "/member",
                open: true,
                childreen: [
                    {
                        label: "All Member",
                        icon: PersonAddIcon,
                        active: false,
                        path: "/member/all-member"
                    },
                    {
                        label: "Active Member",
                        icon: Person2Icon,
                        active: false,
                        path: "/member/active-member"
                    },
                    {
                        label: "Deactive Member",
                        icon: PersonOffIcon,
                        active: false,
                        path: "/member/deactive-member"
                    },
                ]
            },
            {
                label: "Setting",
                icon: SettingsIcon,
                active: false,
                path: "/setting",
                open: true,
                childreen: [
                    {
                        label: "Language Config",
                        icon: GTranslateIcon,
                        active: false,
                        path: "/setting/language",
                    }
                ],
            },
            {
                label: "Term",
                icon: GradingIcon,
                active: false,
                path: "/term"
            },
            {
                label: "FAQ",
                icon: LiveHelpIcon,
                active: false,
                path: "/faq/all"
            },
            {
                label: "Banner",
                icon: ViewCarouselIcon,
                active: false,
                path: "/banner"
            },
            // {
            //     label: "Dynamic Menu",
            //     icon: WidgetsIcon,
            //     active: false,
            //     path: "/dynamicmenu"
            // },
            // {
            //     label: "Branch Office",
            //     icon: BusinessIcon,
            //     active: false,
            //     path: "/brandoffice"
            // },
            {
                label: "Buku Panduan",
                icon: LocalLibraryIcon,
                active: false,
                path: "/manualbook"
            },
            // {
            //     label: "Product Info",
            //     icon: CategoryIcon,
            //     active: false,
            //     path: "/productinfo"
            // },
            // {
            //     label: "Corporate Profile",
            //     icon: InfoIcon,
            //     active: false,
            //     path: "/about"
            // },
            {
                label: "Logout",
                icon: PowerSettingsNewIcon,
                active: false,
                onClick: () => {
                    localStorage.removeItem("accessToken");
                    document.location.reload();
                }
            },
        ];
        const SUPERADMIN = [
            {
                label: "Health Article",
                icon: NewspaperIcon,
                active: false,
                path: "/article",
                open: true,
                childreen: [
                    {
                        label: "Add Article",
                        icon: DriveFileRenameOutlineIcon,
                        active: false,
                        path: "/article/add-article",
                    },
                    {
                        label: "All Article",
                        icon: ListAltIcon,
                        active: false,
                        path: "/article/all-article",
                    },
                ],
            },
            {
                label: "Member",
                icon: AccountBoxIcon,
                active: false,
                path: "/member",
                open: true,
                childreen: [
                    {
                        label: "All Member",
                        icon: PersonAddIcon,
                        active: false,
                        path: "/member/all-member",
                    },
                    {
                        label: "Active Member",
                        icon: Person2Icon,
                        active: false,
                        path: "/member/active-member",
                    },
                    {
                        label: "Deactive Member",
                        icon: PersonOffIcon,
                        active: false,
                        path: "/member/deactive-member",
                    },
                ],
            },
            {
                label: "FAQ",
                icon: LiveHelpIcon,
                active: false,
                path: "/faq/all",
            },
            {
                label: "About",
                icon: InfoIcon,
                active: false,
                path: "/about",
            },
            {
                label: "Term",
                icon: GradingIcon,
                active: false,
                path: "/term",
            },
            {
                label: "Banner",
                icon: ViewCarouselIcon,
                active: false,
                path: "/banner",
            },
            {
                label: "Telemedicine",
                icon: BloodtypeIcon,
                active: false,
                path: "/telemedicine"
            },
            // {
            //     label: "Dynamic Menu",
            //     icon: WidgetsIcon,
            //     active: false,
            //     path: "/dynamicmenu"
            // },
            // {
            //     label: "Branch Office",
            //     icon: BusinessIcon,
            //     active: false,
            //     path: "/brandoffice"
            // },
            {
                label: "Buku Panduan",
                icon: LocalLibraryIcon,
                active: false,
                path: "/manualbook",
            },
            {
                label: "Ketentuan PDP",
                icon: InfoIcon,
                active: false,
                path: "/pdp",
            },
            // {
            //     label: "Product Info",
            //     icon: CategoryIcon,
            //     active: false,
            //     path: "/productinfo"
            // },
            // {
            //     label: "Corporate Profile",
            //     icon: InfoIcon,
            //     active: false,
            //     path: "/about"
            // },
            // {
            //     label: "Term",
            //     icon: GradingIcon,
            //     active: false,
            //     path: "/term"
            // },
            {
                label: "Tag Manager",
                icon: TagIcon,
                active: false,
                path: "/tagManager",
                open: true,
                childreen: [
                    {
                        label: "Rules",
                        icon: LineStyleIcon,
                        active: false,
                        path: "/tagManager/rules",
                    },
                    {
                        label: "Action",
                        icon: AttractionsIcon,
                        active: false,
                        path: "/tagManager/actionRules",
                    },
                    {
                        label: "* Key Target",
                        icon: SettingsInputSvideoIcon,
                        active: false,
                        path: "/tagManager/setupKey",
                    },
                    {
                        label: "* Parameters",
                        icon: SettingsInputCompositeIcon,
                        active: false,
                        path: "/tagManager/setupParameters",
                    },
                ],
            },
            {
                label: "Setting",
                icon: SettingsIcon,
                active: false,
                path: "/setting",
                open: true,
                childreen: [
                    // {
                    //     label: "Max Claim",
                    //     icon: SignalCellularAltIcon,
                    //     active: false,
                    //     path: "/setting/maxclaim"
                    // },
                    {
                        label: "Language Config",
                        icon: GTranslateIcon,
                        active: false,
                        path: "/setting/language",
                    },
                    {
                        label: "User",
                        icon: VerifiedUserIcon,
                        active: false,
                        path: "/user",
                    },
                    // {
                    //     label: "Contact",
                    //     icon: PermContactCalendarIcon,
                    //     active: false,
                    //     path: "/setting/contact"
                    // },
                    // {
                    //     label: "Push Notification",
                    //     icon: CampaignIcon,
                    //     active: false,
                    //     path: "/pushnotification"
                    // },
                ],
            },
            {
                label: "Logging",
                icon: ListAltIcon,
                active: false,
                path: "/logging",
            },
            {
                label: "Logout",
                icon: PowerSettingsNewIcon,
                active: false,
                onClick: () => {
                    // signOut(auth);
                    localStorage.removeItem("accessToken");
                    document.location.reload();
                },
            },
        ];
        const MENU = { CS, ADMIN, SUPERADMIN };
        const user = JSON.parse(localStorage.getItem("user") || "{}");
        const privileges = user["role"];
        this.setState({ listMenu: MENU[privileges] });
    }

    renderMenu() {
        return this.state.listMenu.map((item: MenuProps, i: number) => {
            return (
                <React.Fragment key={`menu-${i}`}>
                    <ListItemButton onClick={() => {
                        if (typeof item.onClick === 'function') {
                            item.onClick();
                        } else {
                            const newMenu = this.state.listMenu;
                            const newListMenu = newMenu.map((itemChild, i2) => {
                                if (i2 == i) {
                                    if (itemChild.childreen) {
                                        itemChild.open = !itemChild.open;
                                        if (!itemChild.open) {
                                            if (itemChild.childreen) {
                                                itemChild.childreen = itemChild.childreen.map((_item, _i) => {
                                                    _item.active = false;
                                                    return _item;
                                                });
                                            }
                                        }
                                    }
                                    itemChild.active = true;
                                    return itemChild;
                                } else {
                                    itemChild.active = false;
                                    if (itemChild.childreen) {
                                        itemChild.childreen = itemChild.childreen.map((_item, _i) => {
                                            _item.active = false;
                                            return _item;
                                        });
                                    }
                                    return itemChild;
                                }
                            });
                            this.setState({
                                listMenu: newListMenu
                            }, () => {
                                if (!item.childreen) {
                                    this.props.navigate(item.path);
                                }
                            });
                        }
                    }}>
                        {item.active ?
                            !item.childreen ? (<div className='marking'></div>) : null
                            : null}
                        <ListItemIcon>
                            {<item.icon style={{
                                color: item.active ? "#2ba205" : "black"
                            }} />}
                        </ListItemIcon>
                        <ListItemText primary={item.label} />
                        {item.childreen ? (item.childreen.length ? item.open ? <ExpandLess /> : <ExpandMore /> : null) : null}
                    </ListItemButton>

                    {item.childreen ? this.renderSubMenu(item, i) : null}
                </React.Fragment>
            );
        })
    }

    renderSubMenu(menu: MenuProps, x: number) {
        let childreen: MenuProps[] = [];
        if (menu.childreen) {
            childreen = menu.childreen;
        }
        return childreen.map((item, i) => {
            return (
                <Collapse key={`submenu-${x}-${i}`} in={menu.open} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                        <ListItemButton sx={{ pl: 4 }} onClick={() => {
                            const listMenu = this.state.listMenu.map((menu: any) => {
                                if (menu.childreen) {
                                    menu.childreen = menu.childreen.map(sub => {
                                        sub.active = false;
                                        return sub;
                                    });
                                }
                                return menu;
                            });

                            listMenu[x].childreen?.map((_item, _i) => {
                                if (_item == item) {
                                    _item.active = true;
                                    return _item;
                                } else {
                                    _item.active = false;
                                    return _item;
                                }
                            });
                            listMenu.map((__item, __i) => {
                                if (__item == menu) {
                                    __item.active = true;
                                    return __item;
                                } else {
                                    __item.active = false;
                                    return __item;
                                }
                            });
                            this.setState({
                                listMenu: listMenu
                            }, () => {
                                this.props.navigate(item.path);
                            });
                        }}>
                            {item.active ? (<div className='marking'></div>) : null}
                            <ListItemIcon>
                                {<item.icon style={{
                                    color: item.active ? "#2ba205" : "black"
                                }} />}
                            </ListItemIcon>
                            <ListItemText primary={item.label} />
                        </ListItemButton>
                    </List>
                </Collapse>
            );
        });
    }

    render() {
        return (
            <div className='menu'>
                <Card style={{ overflow: "auto" }} className='element-with-scrollbar'>
                    <div style={{
                        height: 100,
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center"
                    }}>
                        <img src={logo} style={{ width: '70%' }} />
                    </div>
                    <List
                        sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
                        component="nav"
                        aria-labelledby="nested-list-subheader"
                        subheader={
                            <ListSubheader component="div" id="nested-list-subheader">
                                Menu
                            </ListSubheader>
                        }
                    >
                        {this.renderMenu()}
                        {/* <ListItemButton onClick={() => {
                            this.setState({
                                open: !this.state.open,
                            });
                        }}>
                            <ListItemIcon>
                                <InboxIcon />
                            </ListItemIcon>
                            <ListItemText primary="Inbox" />
                            {this.state.open ? <ExpandLess /> : <ExpandMore />}
                        </ListItemButton>
                        <Collapse in={this.state.open} timeout="auto" unmountOnExit>
                            <List component="div" disablePadding>
                                <ListItemButton sx={{ pl: 4 }}>
                                    <ListItemIcon>
                                        <StarBorder />
                                    </ListItemIcon>
                                    <ListItemText primary="Starred" />
                                </ListItemButton>
                            </List>
                        </Collapse> */}
                    </List>
                </Card>
            </div>
        );
    }
}

export default (): any => {
    const count = useSelector((state: any) => state.counter.count);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    return <Menu dispatch={dispatch} count={count} navigate={navigate} />;
};
