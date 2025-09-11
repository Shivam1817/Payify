import express from 'express';
import db from '@repo/db/client';
const app = express();

app.use(express.json());

app.post('/hdfcWebhook', async(req, res) => {
    const paymentinformation:{
        token: string,
        userId: string,
        amount: number
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
                        increment: paymentinformation.amount
                    }
                }
            }),
            db.onRampTransaction.updateMany({
                where: {
                    userId: Number(paymentinformation.userId),
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