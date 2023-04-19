import { sendEmail } from "../utils/sendEmail";

export const testEmailRoute = {
    path: '/api/test-email',
    method: 'post',
    handler: async (req, res) => {
        try {
            await sendEmail({
                to: 'khoa.nguyen022527@hcmut.edu.vn',
                from: 'tan.lamcs1001@hcmut.edu.vn',
                subject: 'Testing',
                text: 'Hello from me',
                html: '<strong>and easy to do anywhere, even with Node.js</strong>',
            })
            res.status(200)
        }
        catch (err) {
            console.log(err)
            res.status(500)
        }
    }
};