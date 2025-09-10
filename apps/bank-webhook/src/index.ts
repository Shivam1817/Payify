import express from 'express';

const app = express();

app.post('/hdfcWebhook', (req, res) => {
    const paymentinformation = {
        token: req.body.token,
        userId: req.body.userId,
        amount: req.body.amount,
    }
})

app.listen(3003);