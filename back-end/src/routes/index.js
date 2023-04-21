import { testRoute } from './testRoute';
import { signUpRoute } from './signUpRoute';
import { loginRoute } from './loginRoute';
import { updateUserInfoRoute } from './updateUserInfoRoute'
import { testEmailRoute } from './testEmailRoute';
import { getGoogleOauthUrlRoute } from './getGoogleOauthUrlRoute';
import { googleOauthCallbackRoute } from './googleOauthCallbackRoute';
export const routes = [
    loginRoute,
    updateUserInfoRoute,
    testEmailRoute,
    signUpRoute,
    testRoute,
    getGoogleOauthUrlRoute,
    googleOauthCallbackRoute,
];
