import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
    const shivam = await prisma.user.upsert({
        where:{
            number: '9999999999'
        },
        update:{},
        create:{
            number: '9999999999',
            password: 'shivam',
            name: 'Shivam',
            OnRampTransaction: {
                create: {
                    startTime: new Date(),
                    status: "Success",
                    amount: 20000,
                    token: "122",
                    provider: "HDFC Bank",
                },
            },
        },
    })
    const kammo_ji = await prisma.user.upsert({
        where:{
            number: '8888888888'
        },
        update:{},
        create:{
            number: '8888888888',
            password: 'kammo_ji',
            name: 'Kammo Ji',
            OnRampTransaction: {
                create: {
                    startTime: new Date(),
                    status: "Failed",
                    amount: 2000,
                    token: "123",
                    provider: "HDFC Bank",
                },
            },
        },
    })
    console.log({shivam, kammo_ji});
}
main()
    .then(async() => {
        await prisma.$disconnect();
    })
    .catch(async(e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    });