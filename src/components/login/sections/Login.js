import React from "react";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import getFirebase from "../../../utils/firebase";
import { fromFirebase } from "../../../api/user.service"
import { setUser } from "../../../utils/Auth"

const firebase = getFirebase();

// Configure FirebaseUI.
const Login = () => {

  function getUiConfig() {
        return {
        signInFlow: "popup",
        signInSuccessUrl: "/",
        signInOptions: [
            firebase.auth.GoogleAuthProvider.PROVIDER_ID,
            firebase.auth.FacebookAuthProvider.PROVIDER_ID,
        ],
      callbacks: {
        signInSuccessWithAuthResult: () => {
          const user = fromFirebase();
          setUser(user);
          window.location.reload()
        },
      },
    };
  }

  return (
    <React.Fragment>
          {firebase && (
            <StyledFirebaseAuth
              uiConfig={getUiConfig()}
              firebaseAuth={firebase.auth()}
            />
          )}
      
    </React.Fragment>
  );
};

export default Login;
