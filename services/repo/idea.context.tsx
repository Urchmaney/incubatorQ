import React, { useMemo } from "react";
import IAppRepo, { Idea } from "./IAppRepo";
import { FirebaseIdeaRepo } from "./firebase/firebase.idea.repo";

export const IdeaContext: React.Context<{ ideaRepo?: IAppRepo, activeIdea?: Idea | null, setActiveIdea?: (idea: Idea) => void }> = React.createContext({});

export const useIdeaContext = () => React.useContext(IdeaContext);

export const IdeaContextProvider = ({
    children,
}: { children: React.ReactNode }) => {
    
    const ideaRepo : IAppRepo = useMemo(() => new FirebaseIdeaRepo(), []);

    const [activeIdea, setActiveIdea] = React.useState<Idea | null>(null);
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
        <IdeaContext.Provider value={{ ideaRepo, activeIdea, setActiveIdea }}>
          {children}
        </IdeaContext.Provider>
    );
};