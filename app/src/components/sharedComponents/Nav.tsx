import * as React from "react";
import { AbstractProps } from "../../../..";
import AppBar from "@material-ui/core/AppBar";
import CssBaseline from "@material-ui/core/CssBaseline";
import Divider from "@material-ui/core/Divider";
import Drawer from "@material-ui/core/Drawer";
import Hidden from "@material-ui/core/Hidden";
import IconButton from "@material-ui/core/IconButton";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import MailIcon from "@material-ui/icons/Mail";
import MenuIcon from "@material-ui/icons/Menu";
import Toolbar from "@material-ui/core/Toolbar";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import SettingsIcon from "@material-ui/icons/Settings";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import EqualizerIcon from "@material-ui/icons/Equalizer";
import { Link } from "react-router-dom";
import store from "../../../global/store/store";
import { _logout } from "../../../global/actions/userAction";
import { Typography, Avatar } from "@material-ui/core";
import AvTimerIcon from "@material-ui/icons/AvTimer";
import DynamicFeedIcon from "@material-ui/icons/DynamicFeed";
import BusinessCenterIcon from "@material-ui/icons/BusinessCenter";
import { useDispatch } from "react-redux";
import * as actions from "../../../global/actions/userAction";
const soundClip = require("../../../assets/audio/navClip.mp3").default;
import AccountBalanceIcon from "@material-ui/icons/AccountBalance";
const useStyles = makeStyles((theme) => ({
    appBar: {
        [theme.breakpoints.up("sm")]: {
            width: `calc(100% - ${drawerWidth}px)`,
            marginLeft: drawerWidth,
        },
        backgroundColor: "#f9f9f9",
        boxShadow: "none",
        color: "Black",
    },
    menuButton: {
        marginRight: theme.spacing(2),
        [theme.breakpoints.up("sm")]: {
            display: "none",
        },
        alignSelf: "left",
    },
    menuIcon: {
        color: "black",
    },
    toolbar: theme.mixins.toolbar,
    drawerPaper: {
        width: drawerWidth,
        // #0072ff
        backgroundColor: "#f9f9f9",
        boxShadow: "0px 0px 0px #888888",
        flexShrink: 0,
    },
    drawer: {
        [theme.breakpoints.up("sm")]: {
            width: drawerWidth,
            flexShrink: 0,
        },
    },
    notMenuIcon: {
        color: "#ffc700",
        height: "35px",
        width: "35px",
    },
    notIconButton: {
        marginRight: "2%",
    },
    exitIconButton: {
        marginRight: "2%",
    },
    exitMenuIcon: {
        color: "#0072ff",
        height: "35px",
        width: "35px",
    },
    avatar: {
        height: "45px",
        width: "45px",
        marginRight: "3%",
    },
    listText: {
        color: "black",
    },
    listItem: {
        backgroundColor: "#e8e8e8",
        height: "70px",
        transition: "width 0.5s, height 0.2s",
        "&:hover": {
            backgroundColor: "#a0ebb4",
            height: "100px",
            width: "100%",
        },
    },
    listItemOnClickClass: {
        backgroundColor: "#75eb95",
        border: "0.2px solid rgba(0,0,0,0.3)",
        height: "100px",
        width: "100%",
    },
    list: {
        marginTop: "50%",
    },
    flexToolbar: {
        display: "flex",
    },
    box: {
        flexGrow: 1,
        display: "flex",
        justifyContent: "center",
    },
    searchTextField: {
        width: "35%",
        marginTop: "1.4%",
    },
    logo: {
        height: "50px",
        width: "50px",
        marginRight: "7%",
    },
}));

const navItems = [
    {
        name: "Dashboard",
        path: "/user/dashboard",
        icon: (iconProps) => (
            <ListItemIcon>
                <EqualizerIcon style={{ color: iconProps.color }} />
            </ListItemIcon>
        ),
        iconColor: "#e3291b",
        color: "black",
    },
    {
        name: "Positions",
        path: "/user/questrade/positions",
        icon: (iconProps) => (
            <ListItemIcon>
                <BusinessCenterIcon style={{ color: iconProps.color }} />
            </ListItemIcon>
        ),
        iconColor: "#1e5fe3",
        color: "black",
    },
    {
        name: "Executions",
        path: "/user/questrade/executions",
        icon: (iconProps) => (
            <ListItemIcon>
                <DynamicFeedIcon style={{ color: iconProps.color }} />
            </ListItemIcon>
        ),
        iconColor: "#e38512",
        color: "black",
    },
    {
        name: "Orders",
        path: "/user/questrade/orders",
        icon: (iconProps) => (
            <ListItemIcon>
                <AvTimerIcon style={{ color: iconProps.color }} />
            </ListItemIcon>
        ),
        iconColor: "#7b85e3",
        color: "black",
    },
    {
        name: "QS Accounts",
        path: "/user/questrade/accounts",
        icon: (iconProps) => (
            <ListItemIcon>
                <AccountBalanceIcon style={{ color: iconProps.color }} />
            </ListItemIcon>
        ),
        iconColor: "#7b85e3",
        color: "black",
    },
    {
        name: "Settings",
        path: "/user/profileSettings",
        icon: (iconProps) => (
            <ListItemIcon>
                <SettingsIcon style={{ color: iconProps.color }} />
            </ListItemIcon>
        ),
        iconColor: "#b90ff2",
        color: "black",
    },
    {
        name: "Logout",
        icon: (iconProps) => (
            <ListItemIcon>
                <ExitToAppIcon style={{ color: iconProps.color }} />
            </ListItemIcon>
        ),
        iconColor: "#fc4800",
        color: "black",
    },
];

type INavProps = AbstractProps & {
    path: string;
};
const drawerWidth = 280;

const Nav: React.FC<INavProps> = (props: INavProps) => {
    const audio = new Audio(soundClip);
    audio.volume = 0.1;
    const dispatch = useDispatch();
    const classes = useStyles();
    const theme = useTheme();
    const [mobileOpen, setMobileOpen] = React.useState(false);
    const [navItemTextColor, setNavItemTextColor] = React.useState({} as any);
    const [currentHeading, setCurrentHeading] = React.useState(
        {
            dashboard: "Dashboard",
            profileSettings: "Settings",
            "tdata/positions": "Positions",
            "tdata/executions": "Executions",
            "tdata/orders": "Orders",
            "questrade/accounts": "QS Accounts",
        }[props.path || "dashboard"]
    );
    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const drawer = (
        <div>
            <div className={classes.toolbar} />
            <List className={classes.list}>
                {navItems.map((navItem, index) => (
                    <Link
                        to={navItem.path}
                        style={{ textDecoration: "none" }}
                        onClick={() => {
                            setCurrentHeading(navItem.name);
                            dispatch(
                                actions.setCurrentBrowserPath(navItem.path)
                            );
                            if (navItem.name === "Logout") {
                                const path = localStorage.getItem("path");
                                if (path && path.trim() === "") {
                                    localStorage.removeItem("path");
                                }
                                store.dispatch(_logout());
                            } else {
                                localStorage.setItem(
                                    "path",
                                    navItem.path.substring(6)
                                );
                            }
                        }}
                    >
                        <ListItem
                            className={
                                currentHeading === navItem.name
                                    ? classes.listItemOnClickClass
                                    : classes.listItem
                            }
                            button
                            key={navItem.name}
                            onMouseEnter={() => {
                                audio.play();

                                const newObj = {};
                                setNavItemTextColor({
                                    [navItem.name]: "black",
                                });
                            }}
                            onMouseLeave={() => {
                                audio.pause();
                                setNavItemTextColor({
                                    [navItem.name]: "black",
                                });
                            }}
                        >
                            {navItem.icon({ color: navItem.iconColor })}
                            <ListItemText
                                //primary={navItem.name}
                                style={{
                                    color: navItemTextColor[navItem.name]
                                        ? navItemTextColor[navItem.name]
                                        : "black",
                                }}
                            >
                                <Typography
                                    variant="h5"
                                    className={classes.listText}
                                >
                                    {navItem.name}
                                </Typography>
                            </ListItemText>
                        </ListItem>
                    </Link>
                ))}
            </List>
        </div>
    );

    return (
        <React.Fragment>
            <CssBaseline />
            <AppBar position="fixed" className={classes.appBar}>
                <Toolbar className={classes.flexToolbar}>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        className={classes.menuButton}
                    >
                        <MenuIcon className={classes.menuIcon} />
                    </IconButton>

                    <Typography variant="h1">{currentHeading}</Typography>
                </Toolbar>
            </AppBar>
            <nav className={classes.drawer} aria-label="mailbox folders">
                {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
                <Hidden smUp implementation="css">
                    <Drawer
                        variant="temporary"
                        anchor={theme.direction === "rtl" ? "right" : "left"}
                        open={mobileOpen}
                        onClose={handleDrawerToggle}
                        classes={{
                            paper: classes.drawerPaper,
                        }}
                        ModalProps={{
                            keepMounted: true, // Better open performance on mobile.
                        }}
                    >
                        {drawer}
                    </Drawer>
                </Hidden>
                <Hidden xsDown implementation="css">
                    <Drawer
                        classes={{
                            paper: classes.drawerPaper,
                        }}
                        variant="permanent"
                        open
                    >
                        {drawer}
                    </Drawer>
                </Hidden>
            </nav>
        </React.Fragment>
    );
};

export default Nav;
