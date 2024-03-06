export interface Props {
    className?: string
}

export interface AuthContextInterface {
    token: string
    //
    setToken: (token: string) => void
    removeToken: () => void
}