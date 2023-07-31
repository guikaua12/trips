import { useSelector } from 'react-redux';
import { UserState } from '@/redux/user/reducer';
import ActionTypes from '@/redux/user/actionTypes';
import { Dispatch } from 'redux';

function login(email: string, password: string, dispatch: Dispatch) {
    // api request
    dispatch({ type: ActionTypes.AUTH_STATUS, payload: { status: 'loading' } });
    return fetch(process.env.NEXT_PUBLIC_API_ENDPOINT + '/users/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            email,
            password,
        }),
    })
        .then((response) => response.json())
        .then((data) => {
            if (data && data.error) {
                dispatch({ type: ActionTypes.AUTH_STATUS, payload: { status: 'unauthenticated' } });
                return data;
            }

            dispatch({ type: ActionTypes.AUTH_STATUS, payload: { status: 'authenticated' } });

            return data;
        })
        .catch((err) => console.log(err));
}

export function useSession() {
    const { status, user }: UserState = useSelector((state: any) => state.userReducer);
    return { status, user, login };
}
