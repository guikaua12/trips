export type UserState = {
    status: 'authenticated' | 'unauthenticated' | 'loading';
    user?: {
        id: string;
        email: string;
    };
};

const initialState: UserState = {
    status: 'unauthenticated',
    user: undefined,
};

export default function userReducer(state: UserState = initialState, action: any) {
    if (action.type === ActionTypes.AUTH_STATUS) {
        return {
            ...state,
            status: action.payload.status,
        };
    }

    return state;
}
