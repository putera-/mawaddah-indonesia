import { PrismaClient } from '@prisma/client';
import mysql from 'mysql2/promise';
import { user } from './data/user';
import { gambaran_keluarga } from './data/gambaran_keluarga';
import { harapan } from './data/harapan';
import { pendidikan } from './data/pendidikan';

const new_db = new PrismaClient();

const parameters = process.argv;

// check runner parameter
const isTest = parameters.includes('test');

// Configure your old database connection
const oldDbConfig = {
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'mawaddah333',
};

let old_db: mysql.Connection;

async function main() {
    old_db = await mysql.createConnection(oldDbConfig);

    await user(old_db, new_db);
    await gambaran_keluarga(old_db, new_db);
    await harapan(old_db, new_db);
    await pendidikan(old_db, new_db);

    /*
    -sumber dana acara pernikahan - 27791
    -gambaran acara pernikahan - 28736
    -sumber dana Walimah -  3529
    -gambaran Walimah - 3616
    -Usaha/Bisnis yang akan digeluti - 1
    -Impian - 1
    */

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
