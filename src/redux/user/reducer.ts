export type UserState = {
    loggedIn: boolean;
    user?: {
        id: string;
        email: string;
    };
};

const initialState: UserState = {
    loggedIn: false,
    user: undefined,
};

export default function userReducer(state: UserState = initialState, action: any) {
    return state;
}
