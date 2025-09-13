import express from 'express';
import db from '@repo/db/client';
const app = express();

app.use(express.json());

app.post('/hdfcWebhook', async(req, res) => {
    const paymentinformation:{
        token: string,
        userId: string,
        //if facing any propblem use it as string
        amount: string
    } = {
        token: req.body.token,
        userId: req.body.userId,
        amount: req.body.amount,
    };
    try {
        await db.$transaction([
            db.balance.updateMany({
                where: {
                    userId: Number(paymentinformation.userId)
                },
                data: {
                    amount: {
                        increment: Number(paymentinformation.amount)
                    }
                }
            }),
            db.onRampTransaction.updateMany({
                where: {
                    token: paymentinformation.token
                },
                data: {
                    status: "Success",
                }
            })
        ]);
        res.json({
            message: "Captured"
        })
    }
    catch(e){
        console.error(e);
        res.status(411).json({
            message: "Error while processing webhook"
        })
    }
})

app.listen(3003);