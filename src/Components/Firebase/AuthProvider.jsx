import React, { createContext, useEffect, useState } from "react";
import { GithubAuthProvider, GoogleAuthProvider, createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";
import app from "../Firebase/firebase.config";



export const authContext = createContext(null);

const provider = new GoogleAuthProvider();
const Gitprovider = new GithubAuthProvider();


const auth = getAuth(app);

const AuthProvider = ({ children }) => {
  const [user, setuser] = useState(null);

  const createUser = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password)
  }

  const googleLogin=()=>{
    return signInWithPopup(auth, provider)
  }
  const githubLogin=()=>{
    return signInWithPopup(auth, Gitprovider)
  }

  const updateProfilec=(name,photoUrl )=>{
    return updateProfile (auth.currentUser, {
      displayName: name, photoURL: photoUrl
    })
  }

  const login=(email, password)=>{
    return signInWithEmailAndPassword(auth, email, password)
  }

  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, (user) => {
      setuser(user);
    });
    return () => {
      unSubscribe();
    };
  }, []);

  const logout =()=>{
    return signOut(auth)
  }

  const AuthInfo = {
    user,
    createUser,
    updateProfilec,
    login,
    googleLogin,
    logout,
    githubLogin
    };
  return (
    <div>
      <authContext.Provider value={AuthInfo} >{children}</authContext.Provider>
    </div>
  );
};

export default AuthProvider;