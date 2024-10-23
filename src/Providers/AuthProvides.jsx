import { createContext, useEffect, useState } from "react";
import { createUserWithEmailAndPassword, getAuth, GithubAuthProvider, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import { app } from "../Firebase/firebase.config";
import useAxiosPublic from './../Hooks/useAxiosPublic';

const auth = getAuth(app);

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setloading] = useState(true)
    const axiosPublic = useAxiosPublic()
    const googleprovider = new GoogleAuthProvider();
    const githubprovider = new GithubAuthProvider();

    const googlesignin = () => {
        setloading(true)
        return signInWithPopup(auth, googleprovider)



    }

    const githubsignin = () => {
        setloading(true)
        return signInWithPopup(auth, githubprovider)
    }

    const SignUpUser = async (email, password) => {
        setloading(true)
        const result = await createUserWithEmailAndPassword(auth, email, password);
        const user = result.user;
        setUser(user);
        return result;
    };

    const updateuserprofile = (name, photo) => {
        return updateProfile(auth.currentUser, {
            displayName: name,
            photo: photo

        })
    }

    const LoginUser = async (email, password) => {
        const result = await signInWithEmailAndPassword(auth, email, password)
        const user = result.user;
        setloading(true)
        setUser(user);
        return result;
    }
    const logout = () => {
        return signOut(auth)
    }

    useEffect(() => {
        const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser)
            if (currentUser) {
                const userinfo = { email: currentUser.email }
                axiosPublic.post('/jwt', userinfo)
                    .then(res => {
                        if (res.data.token) {
                            localStorage.setItem('access-token', res.data.token)
                            setloading(false)
                        }
                    })

            }


        });

        return () => {
            unSubscribe();
        }



    }, [axiosPublic])

    const AuthInfo = {
        user,
        loading,
        SignUpUser,
        LoginUser,
        updateuserprofile,
        googlesignin,
        githubsignin,
        logout
    };

    return (
        <AuthContext.Provider value={AuthInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider; // Fixed the component name
