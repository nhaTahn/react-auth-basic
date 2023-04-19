import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { UserInfoPage } from './pages/UserInfoPage';
import { LoginPage } from './pages/LoginPage';
import { SignUpPage } from './pages/SignupPage';

import { PrivateRouter } from './auth/PriveRoute';
export const Routes = () => {
    return (
        <Router>
            <Switch>
                <PrivateRouter path="/" exact>
                    <UserInfoPage />
                </PrivateRouter>
                <Route path="/login" >
                    <LoginPage />
                </Route>
                <Route path="/signup" >
                    <SignUpPage />
                </Route>
            </Switch>
        </Router>
    );
}