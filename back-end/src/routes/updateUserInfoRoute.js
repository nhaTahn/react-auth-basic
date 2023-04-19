import jwt from 'jsonwebtoken'
import { ObjectID } from 'mongodb'
import { getDbConnection } from '../db'

export const updateUserInfoRoute = {
    path: '/api/users/:userId',
    method: 'put',
    handler: async (req, res) => {
        const { authorization } = req.headers;
        const { userId } = req.params;

        const updates = (body) => {
            const { favoriteFood, hairColor, bio } = body;
            return { favoriteFood, hairColor, bio };
        };

        const updatedInfo = updates(req.body);

        if (!authorization) return res.status(401).json({ message: 'Invalid authorization' })

        //Bearer dsd.dsdsds.fsdfs
        const token = authorization.split(' ')[1]
        // console.log(token)
        jwt.verify(token, process.env.JWT_KEY, async (err, decoded) => {
            if (err) return res.status(401).json({ message: "Unable to verify token" })

            const { id } = decoded;

            if (id !== userId) return res.status(403).json({ message: "Not allowed to update" })

            const db = getDbConnection('react-auth-db')
            const result = await db.collection('users').findOneAndUpdate(
                { _id: ObjectID(id) },
                { $set: { info: updatedInfo } },
                { returnOriginal: false },
            );
            console.log(result.value);
            const { email, isVerified, info } = result.value
            console.log(info);
            jwt.sign({ id, email, isVerified, info }, process.env.JWT_KEY, { expiresIn: "2d" }, (err, token) => {
                if (err) return res.status(200).json(err);
                console.log("good")
                res.status(200).json({ token })
            })

        })
    }
}