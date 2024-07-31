import { PrismaClient } from '@prisma/client';
import mysql from 'mysql2/promise'
import { user } from './data/user';

const new_db = new PrismaClient();

const parameters = process.argv;

// check runner parameter
const isTest = parameters.includes('test');

// Configure your old database connection
const oldDbConfig = {
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'mawaddah',
};

let old_db: mysql.Connection;

async function main() {
    old_db = await mysql.createConnection(oldDbConfig);

    await user(old_db, new_db)

}

main()
    .then(async () => {
        await new_db.$disconnect();
        await old_db.end();
    })
    .catch(async (e) => {
        console.error(e);
        await new_db.$disconnect();
        await old_db.end();
        process.exit(1);
    });
