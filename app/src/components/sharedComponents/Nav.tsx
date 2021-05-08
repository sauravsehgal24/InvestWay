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
import Avatar from "@material-ui/core/Avatar";
import NotificationsIcon from "@material-ui/icons/Notifications";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import Box from "@material-ui/core/Box";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import SearchIcon from "@material-ui/icons/Search";
import EqualizerIcon from "@material-ui/icons/Equalizer";

const useStyles = makeStyles((theme) => ({
    appBar: {
        [theme.breakpoints.up("sm")]: {
            width: `calc(100% - ${drawerWidth}px)`,
            marginLeft: drawerWidth,
        },
        backgroundColor: "#f9f9f9",
        boxShadow: "none",
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
        boxShadow: "5px 0px 20px #888888",
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
        "&:hover": {
            color: "white",
        },
    },
    listItem: {
        backgroundColor: "#e8e8e8",
        height: "70px",
        transition: "width 0.5s, height 0.2s",
        "&:hover": {
            backgroundColor: "#9561ce",
            ".listText": { color: "white" },
            height: "100px",
            width: "100%",
        },
    },
    list: {
        marginTop: "20%",
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
        icon: (iconProps) => (
            <ListItemIcon>
                <EqualizerIcon style={{ color: iconProps.color }} />
            </ListItemIcon>
        ),
        iconColor: "#7b85e3",
        color: "black",
    },
];

type INavProps = AbstractProps & {};
const drawerWidth = 280;

const Nav: React.FC<INavProps> = (props: INavProps) => {
    const classes = useStyles();
    const theme = useTheme();
    const [mobileOpen, setMobileOpen] = React.useState(false);
    const [navItemTextColor, setNavItemTextColor] = React.useState({} as any);

    const logout = () => {
        //dispatch(userActions._auth());
        //props.history.push('/login/admin')
        //store.dispatch(actionCreator.logout("CONSUMER"));
    };
    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const drawer = (
        <div>
            <div className={classes.toolbar} />
            <Divider />
            <List className={classes.list}>
                {navItems.map((navItem, index) => (
                    <ListItem
                        className={classes.listItem}
                        button
                        key={navItem.name}
                        onMouseEnter={() => {
                            const newObj = {};
                            setNavItemTextColor({ [navItem.name]: "white" });
                        }}
                        onMouseLeave={() => {
                            setNavItemTextColor({ [navItem.name]: "black" });
                        }}
                    >
                        {navItem.icon({ color: navItem.iconColor })}
                        <ListItemText
                            primary={navItem.name}
                            style={{
                                color: navItemTextColor[navItem.name]
                                    ? navItemTextColor[navItem.name]
                                    : "black",
                            }}
                        ></ListItemText>
                    </ListItem>
                ))}
            </List>
            <Divider />
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
