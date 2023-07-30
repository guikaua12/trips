import { useSelector } from 'react-redux';
import { UserState } from '@/redux/user/reducer';
import { useDispatch } from 'react-redux';
import { use } from 'react';

function login(email: string, password: string) {
    // api request
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
        .catch((err) => console.log(err));
}

export function useSession() {
    const { loggedIn, user }: UserState = useSelector((state: any) => state.userReducer);
    return { loggedIn, user, login };
}
