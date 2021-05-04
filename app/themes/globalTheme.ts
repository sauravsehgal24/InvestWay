import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
const defaultTheme = createMuiTheme();
const globalThemeObject= {
    globalLoading:false,
    globalTheme:{
        palette:{
            type:'light',
          },
          typography:{
            fontFamily: 'Righteous',
            h1:{
              [defaultTheme.breakpoints.up("xs")]: {
                fontSize: "1.5rem"
              },
              [defaultTheme.breakpoints.up("sm")]: {
                fontSize: "1.5rem"
              },
              [defaultTheme.breakpoints.up("md")]: {
                fontSize: "1.7rem"
              },
              [defaultTheme.breakpoints.up("lg")]: {
                fontSize: "1.9rem"
              },
              [defaultTheme.breakpoints.up("xl")]: {
                fontSize: "2.1rem"
              }
            },
            h2:{
              [defaultTheme.breakpoints.up("xs")]: {
                fontSize: "1.3rem"
              },
              [defaultTheme.breakpoints.up("sm")]: {
                fontSize: "1.3rem"
              },
              [defaultTheme.breakpoints.up("md")]: {
                fontSize: "1.5rem"
              },
              [defaultTheme.breakpoints.up("lg")]: {
                fontSize: "1.7rem"
              },
              [defaultTheme.breakpoints.up("xl")]: {
                fontSize: "1.8rem"
              }
            },
            h3:{
              [defaultTheme.breakpoints.up("xs")]: {
                fontSize: "1.1rem"
              },
              [defaultTheme.breakpoints.up("sm")]: {
                fontSize: "1.1rem"
              },
              [defaultTheme.breakpoints.up("md")]: {
                fontSize: "1.3rem"
              },
              [defaultTheme.breakpoints.up("lg")]: {
                fontSize: "1.5rem"
              },
              [defaultTheme.breakpoints.up("xl")]: {
                fontSize: "1.6rem"
              }
            },
            h4:{
              [defaultTheme.breakpoints.up("xs")]: {
                fontSize: "0.9rem"
              },
              [defaultTheme.breakpoints.up("sm")]: {
                fontSize: "0.9rem"
              },
              [defaultTheme.breakpoints.up("md")]: {
                fontSize: "1.2rem"
              },
              [defaultTheme.breakpoints.up("lg")]: {
                fontSize: "1.3rem"
              },
              [defaultTheme.breakpoints.up("xl")]: {
                fontSize: "1.4rem"
              }
            },
            h5:{
              [defaultTheme.breakpoints.up("xs")]: {
                fontSize: "0.7rem"
              },
              [defaultTheme.breakpoints.up("sm")]: {
                fontSize: "0.7rem"
              },
              [defaultTheme.breakpoints.up("md")]: {
                fontSize: "1.0rem"
              },
              [defaultTheme.breakpoints.up("lg")]: {
                fontSize: "1.1rem"
              },
              [defaultTheme.breakpoints.up("xl")]: {
                fontSize: "1.2rem"
              }
            },
            h6:{
              [defaultTheme.breakpoints.up("xs")]: {
                fontSize: "0.5rem"
              },
              [defaultTheme.breakpoints.up("sm")]: {
                fontSize: "0.5rem"
              },
              [defaultTheme.breakpoints.up("md")]: {
                fontSize: "0.8rem"
              },
              [defaultTheme.breakpoints.up("lg")]: {
                fontSize: "0.9rem"
              },
              [defaultTheme.breakpoints.up("xl")]: {
                fontSize: "1.0rem"
              }
            },
            button:{
              [defaultTheme.breakpoints.up("xs")]: {
                fontSize: "0.8rem"
              },
              [defaultTheme.breakpoints.up("sm")]: {
                fontSize: "0.9rem"
              },
              [defaultTheme.breakpoints.up("md")]: {
                fontSize: "1.1rem"
              },
              [defaultTheme.breakpoints.up("lg")]: {
                fontSize: "1.3rem"
              },
              [defaultTheme.breakpoints.up("xl")]: {
                fontSize: "1.4rem"
              }
            },
            body1:{
        
            }
          }
    }
}


export default globalThemeObject