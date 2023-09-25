import { User, UserContext} from "../context/UserContext";
import { useState } from "react";

type UserProviderProps = {
    children: React.ReactNode;
}

export function UserProvider( { children }: UserProviderProps) {
    const [user, setUser] = useState<User | undefined>(undefined);

    const login = (username: string) => setUser( {username} )
    const logout = () => setUser(undefined)

    return (
        <UserContext.Provider value ={{ user, login, logout}}>
            {children}
        </UserContext.Provider>
    )   
}