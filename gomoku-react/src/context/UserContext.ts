import { createContext } from 'react';

export type User = {
    username: string
}

type UserContextType = {
    user?: User
    login: (username: string) => void
    logout: () => void
}

export const UserContext = createContext<UserContextType>({} as UserContextType);
