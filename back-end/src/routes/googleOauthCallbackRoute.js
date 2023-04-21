import jwt from 'jsonwebtoken';
import { getGoogleUser } from '../utils/getGoogleUser';
import { updateOrCreateUserFromOauth } from '../utils/updateOrCreateUserFromOauth';

export const googleOauthCallbackRoute = {
    path: '/auth/google/callback',
    method: 'get',
    handler: async (req, res) => {
        const { code } = req.query;

        const oauthUserInfo = await getGoogleUser({ code });
        console.log(oauthUserInfo)
        const updatedUser = await updateOrCreateUserFromOauth({ oauthUserInfo });
        const { _id: id, isVerified, email, info } = updatedUser;

        jwt.sign({ id, isVerified, email, info }, process.env.JWT_KEY, { expiresIn: '2d' },
            (err, token) => {
                res.redirect(`http://localhost:3000/login?token=${token}`);
            });
    },
}