import React from "react";
import axios from 'axios'

var UserStateContext = React.createContext();
var UserDispatchContext = React.createContext();

function userReducer(state, action) {
  switch (action.type) {
    case "LOGIN_SUCCESS":
      return { ...state, isAuthenticated: true };
    case "SIGN_OUT_SUCCESS":
      return { ...state, isAuthenticated: false };
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
}

function UserProvider({ children }) {
  var [state, dispatch] = React.useReducer(userReducer, {
    isAuthenticated: !!localStorage.getItem("a") || !!localStorage.getItem('id_token'),

  });

  return (
    <UserStateContext.Provider value={state}>
      <UserDispatchContext.Provider value={dispatch}>
        {children}
      </UserDispatchContext.Provider>
    </UserStateContext.Provider>
  );
}

function useUserState() {
  var context = React.useContext(UserStateContext);
  if (context === undefined) {
    throw new Error("useUserState must be used within a UserProvider");
  }
  return context;
}

function useUserDispatch() {
  var context = React.useContext(UserDispatchContext);
  if (context === undefined) {
    throw new Error("useUserDispatch must be used within a UserProvider");
  }
  return context;
}

export { UserProvider, useUserState, useUserDispatch, loginUser, signOut ,  create_manager,GoogleSignIn};

// ###########################################################
function create_manager (nomm,prenomm,maill,mdpd,Boutique,logoboutiquee,imgmanagerr,history, setIsLoading,setError){
  setIsLoading(true);
var data ={
nom : nomm ,
prenom:prenomm,
mail: maill,
mdp : mdpd,
boutique: Boutique,
logoboutique :  logoboutiquee.substring(12, 50),
imgmanager: imgmanagerr.substring(12, 50),
etat: "D"

}
 console.log(data)
 axios.post('http://localhost:8080/managers/create',data)
        .then (response => {
            console.log(response)
            setError(true);
        })
        .catch(error => {
            console.log(error)
        });
        setIsLoading(false);
        history.push("/login");

}

function loginUser(dispatch, login, password, history, setIsLoading, setError) {
  setError(false);
  setIsLoading(true);
  axios.get(`http://localhost:8080/managers/login/${login}/${password}`) 
  .then(response => {
    console.log(response.data.length)
   // this.setState({posts: response.data})
   if(response.data.length ==1){
    localStorage.setItem('a',response.data[0]._id)
    setError(null)
    setIsLoading(false)
    dispatch({ type: 'LOGIN_SUCCESS' })
 
    history.push('/app/dashboard')
     
   }else{
    
    setError(true);
    setIsLoading(false);
     
   }

})
.catch(error =>{
    console.log(error)
})

 
}

function GoogleSignIn(dispatch, profile, history, setIsLoading, setError) {
  setError(false);
  setIsLoading(true);
  console.log(profile);

  axios.post('http://localhost:8080/users/googleLogin',profile).then(rep => {
    console.log(rep.data);
    console.log(rep.data._id);
    if (!rep.data.error) {
      setTimeout(() => {
        localStorage.setItem('id_token',rep.data._id);
        localStorage.setItem('email',rep.data.email);

        setError(null);
        setIsLoading(false);
        dispatch({ type: 'LOGIN_SUCCESS' });
        history.push('/app/dashboard');
      }, 1000);
    } else {

      setError(true);
      setIsLoading(false);
    }

  })
}

function signOut(dispatch, history) { 
  localStorage.removeItem("a");
  localStorage.removeItem("id_token");
  dispatch({ type: "SIGN_OUT_SUCCESS" });
  history.push("/login");
}
