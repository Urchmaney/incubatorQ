import React, { useMemo } from 'react';
import {
    onAuthStateChanged,
    getAuth,
} from 'firebase/auth';
import firebase_app from '../../firebase.config';
import IAuth, { AppUser } from './IAuth';
import { FirebaseAuth } from './firebase/firebase.auth';

// const auth = getAuth(firebase_app);

export const AuthContext: React.Context<{ auth?: IAuth }> = React.createContext({});

export const useAuthContext = () => React.useContext(AuthContext);

export const AuthContextProvider = ({
    children,
}: { children: React.ReactNode }) => {
    
    const authInstance : IAuth = useMemo(() => new FirebaseAuth(), []);

    // const [user, setUser] = React.useState<User | null>(null);
    // const [loading, setLoading] = React.useState(true);

    // React.useEffect(() => {
    //     const unsubscribe = onAuthStateChanged(auth, (user) => {
    //         if (user) {
    //             setUser(user);
    //         } else {
    //             setUser(null);
    //         }
    //         setLoading(false);
    //     });

    //     return () => unsubscribe();
    // }, []);

    return (
        <AuthContext.Provider value={{ auth: authInstance }}>
          {children}
        </AuthContext.Provider>
    );
};