import React, { useState } from "react";
import {
  Grid,
  CircularProgress,
  Typography,
  Button,
  Tabs,
  Tab,
  TextField,
  Fade,
} from "@material-ui/core";
import { withRouter } from "react-router-dom";
import classnames from "classnames";
import { GoogleLogin } from 'react-google-login';

// styles
import useStyles from "./styles";

// logo
import logo from "./logo.svg";
import google from "../../images/google.svg";

// context
import { useUserDispatch, loginUser, create_manager,GoogleSignIn} from "../../context/UserContext";

function Login(props) {
  var classes = useStyles();

  // global
  var userDispatch = useUserDispatch();

  // local
  var [isLoading, setIsLoading] = useState(false);
  var [error, setError] = useState(null);
  var [activeTabId, setActiveTabId] = useState(0);
  var [nameValue, setNameValue] = useState("");
  var [prenomValue, setprenomValue] = useState("");
  var [boutiqueValue, setboutiqueValue] = useState("");
  var [logoboutiqueValue, setlogoboutiqueValue] = useState("");
  var [imgmanerValue, setimgmanerValue] = useState("");
  var [loginValue, setLoginValue] = useState("");
  var [passwordValue, setPasswordValue] = useState("");
  var regex = /^[a-zA-Z0-9._-]+@[a-z0-9._-]{2,}\.[a-z]{2,4}$/;

  const responseGoogle = response => {
    console.log(response.profileObj);
    GoogleSignIn(userDispatch,
      response.profileObj,
      props.history,
      setIsLoading,
      setError)
  };


  return (
    <Grid container className={classes.container}>
     
      <div className={classes.formContainer}>
        <div className={classes.form}>
          <Tabs
            value={activeTabId}
            onChange={(e, id) => setActiveTabId(id)}
            indicatorColor="primary"
            textColor="primary"
            centered
          >
            <Tab label="Login" classes={{ root: classes.tab }} />
            <Tab label="New User" classes={{ root: classes.tab }} />
          </Tabs>
          {activeTabId === 0 && (
            <React.Fragment>
              <Typography variant="h1" className={classes.greeting}>
                Save Your Wardrobe
              </Typography>


              <Fade in={error}>
                <Typography color="secondary" className={classes.errorMessage}>
                  Something is wrong with your login or password :(
                </Typography>
              </Fade>
              <TextField
                id="email"
                InputProps={{
                  classes: {
                    underline: classes.textFieldUnderline,
                    input: classes.textField,
                  },
                }}
                value={loginValue}
                onChange={e => setLoginValue(e.target.value)}
                margin="normal"
                placeholder="Email Adress"
                type="email"
                fullWidth
              />
              <TextField
                id="password"
                InputProps={{
                  classes: {
                    underline: classes.textFieldUnderline,
                    input: classes.textField,
                  },
                }}
                value={passwordValue}
                onChange={e => setPasswordValue(e.target.value)}
                margin="normal"
                placeholder="Password"
                type="password"
                fullWidth
              />

              <div className={classes.formDividerContainer}>
                <div className={classes.formDivider} />
                <Typography className={classes.formDividerWord}>or</Typography>
                <div className={classes.formDivider} />
              </div>

              <GoogleLogin
                clientId="103958248803-0o2a27jtf0gderc5l4olj0stofd69d7a.apps.googleusercontent.com"
                buttonText="Sign in with google"
                onSuccess={responseGoogle}
                onFailure={responseGoogle}
                cookiePolicy={'single_host_origin'}
                size={'large'}
              />
              <div className={classes.formButtons}>
                {isLoading ? (
                  <CircularProgress size={26} className={classes.loginLoader} />
                ) : (
                  <Button
                    disabled={
                      loginValue.length === 0 || passwordValue.length === 0
                    }
                    onClick={() =>
                      loginUser(
                        userDispatch,
                        loginValue,
                        passwordValue,
                        props.history,
                        setIsLoading,
                        setError,
                      )
                    }
                    variant="contained"
                    color="primary"
                    size="large"
                  >
                    Login
                  </Button>
                )}
                <Button
                  color="primary"
                  size="large"
                  className={classes.forgetButton}
                >
                  Forget Password
                </Button>
              </div>
            </React.Fragment>
          )}
          {activeTabId === 1 && (
            <React.Fragment>
              <Typography variant="h1" className={classes.greeting}>
                Welcome!
              </Typography>
              <Typography variant="h2" className={classes.subGreeting}>
                Create your account
              </Typography>
              <Fade in={error}>
                <Typography color="secondary" className={classes.errorMessage}>
                  Consulter votre boite mail pour activer votre compte !!!
                </Typography>
              </Fade>
              <TextField
                id="name"
                InputProps={{
                  classes: {
                    underline: classes.textFieldUnderline,
                    input: classes.textField,
                  },
                }}
                value={nameValue}
                onChange={e => setNameValue(e.target.value)}
                margin="normal"
                placeholder="Full Name"
                type="text"
                fullWidth
              />
                {(nameValue.length < 4 )&&(nameValue.length>= 1  )? (
                  <span style={{ color: "red" , fontSize :10, }}>nom doit contenir au moins 4 carac</span>
                ) 
                : (
                  <span></span>
                )}
               <TextField
                id="prenom"
                InputProps={{
                  classes: {
                    underline: classes.textFieldUnderline,
                    input: classes.textField,
                  },
                }}
                value={prenomValue}
                onChange={e => setprenomValue(e.target.value)}
                margin="normal"
                placeholder="Prenom"
                type="text"
                fullWidth
              />
               {(prenomValue.length < 4 )&&(prenomValue.length>= 1  )? (
                  <span style={{ color: "red" , fontSize :10, }}>le prenom doit contenir au moins 4 carac</span>
                ) 
                : (
                  <span></span>
                )}
               <TextField
                id="boutique"
                InputProps={{
                  classes: {
                    underline: classes.textFieldUnderline,
                    input: classes.textField,
                  },
                }}
                value={boutiqueValue}
                onChange={e => setboutiqueValue(e.target.value)}
                margin="normal"
                placeholder="nom boutique"
                type="text"
                fullWidth
              />
               {(boutiqueValue.length < 4 )&&(boutiqueValue.length>= 1  )? (
                  <span style={{ color: "red" , fontSize :10, }}>nom du boutique doit contenir au moins 4 carac</span>
                ) 
                : (
                  <span></span>
                )}
              <TextField
                id="logoboutique"
                InputProps={{
                  classes: {
                    underline: classes.textFieldUnderline,
                    input: classes.textField,
                  },
                }}
                value={logoboutiqueValue}
                onChange={e => setlogoboutiqueValue(e.target.value)}
                margin="normal"
                placeholder="img boutique"
                type="file"
                fullWidth
              /> 
<TextField
                id="imgmanager"
                InputProps={{
                  classes: {
                    underline: classes.textFieldUnderline,
                    input: classes.textField,
                  },
                }}
                value={imgmanerValue}
                onChange={e => setimgmanerValue(e.target.value)}
                margin="normal"
                placeholder="image du manager"
                type="file"
                fullWidth
              />
              <TextField
                id="email"
                InputProps={{
                  classes: {
                    underline: classes.textFieldUnderline,
                    input: classes.textField,
                  },
                }}
                value={loginValue}
                onChange={e => setLoginValue(e.target.value)}
                margin="normal"
                placeholder="Email Adress"
                type="email"
                fullWidth
              />
               {
              (!regex.test(loginValue))&&(loginValue.length > 0 )? (
                  <span style={{ color: "red" , fontSize :10, }}>introduire une addresse valide</span>
                ) 
                : (
                  <span></span>
                )}
              <TextField
                id="password"
                InputProps={{
                  classes: {
                    underline: classes.textFieldUnderline,
                    input: classes.textField,
                  },
                }}
                value={passwordValue}
                onChange={e => setPasswordValue(e.target.value)}
                margin="normal"
                placeholder="Password"
                type="password"
                fullWidth
              />
               {(passwordValue.length < 8 )&&(passwordValue.length>= 1  )? (
                  <span style={{ color: "red" , fontSize :10, }}>mot de passe doit contenir au moins 8 carac</span>
                ) 
                : (
                  <span></span>
                )}
              <div className={classes.creatingButtonContainer}>
                {isLoading ? (
                  <CircularProgress size={26} />
                ) : (
                  <Button
                    onClick={() =>
                      create_manager(nameValue,prenomValue,loginValue,passwordValue,boutiqueValue,logoboutiqueValue,imgmanerValue, props.history,
                        setIsLoading,setError)
                    }
                    disabled={
                      loginValue.length === 0 ||
                      passwordValue.length === 0 ||
                      nameValue.length === 0
                      
                    }
                    size="large"
                    variant="contained"
                    color="primary"
                    fullWidth
                    className={classes.createAccountButton}
                  >
                    demandez-vous votre compte
                  </Button>
                )}
              </div>
              <div className={classes.formDividerContainer}>
                <div className={classes.formDivider} />
                <Typography className={classes.formDividerWord}>or</Typography>
                <div className={classes.formDivider} />
              </div>
              <GoogleLogin
                clientId="103958248803-0o2a27jtf0gderc5l4olj0stofd69d7a.apps.googleusercontent.com"
                buttonText="Sign in with google"
                onSuccess={responseGoogle}
                onFailure={responseGoogle}
                cookiePolicy={'single_host_origin'}
                size={'large'}
              />
            </React.Fragment>
          )}
         
        </div>
      </div>
    </Grid>
  );
}

export default withRouter(Login);
