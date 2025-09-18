import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
const prisma = new PrismaClient();

async function main() {
    const shivam = await prisma.user.upsert({
        where:{
            number: '9999999999'
        },
        update:{
            password: await bcrypt.hash('shivam', 10),
            Balance: {
                updateMany: {
                    where: {
                        userId: 2
                    },
                    data: {
                        amount: 20000
                    }
                }
            }
        },
        create:{
            number: '9999999999',
            password: await bcrypt.hash('shivam', 10),
            name: 'Shivam',
            Balance: {
                create: {
                    amount: 20000,
                    locked: 0,
                }
            },
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
        update:{
            password: await bcrypt.hash('kammo_ji', 10)
        },
        create:{
            number: '8888888888',
            password: await bcrypt.hash('kammo_ji', 10),
            name: 'Kammo Ji',
            Balance: {
                create: {
                    amount: 2000,
                    locked: 0,
                }
            },
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
