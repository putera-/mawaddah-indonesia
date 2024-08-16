import { LifeGoal, Prisma, PrismaClient, Question } from "@prisma/client";
import mysql from 'mysql2/promise'
import { create_dummy_user_biodata } from "./helper/create_user_biodata";
import { get_superadmin } from "./helper/get_superadmin";

const parameters = process.argv;

// check runner parameter
// isTest, gunakan variable ini untuk membuat data dummy
// misal untuk create dummy user
const isTest = parameters.includes('test');

/*
migrasi table gazwah.harapan > rq.;ifeGoals
*/
export async function questions(old_db: mysql.Connection, new_db: PrismaClient) {
    const [questions_data]: any[] = await old_db.execute("SELECT * FROM questions");

    const admin = await get_superadmin(new_db);

    const question_list: Question[] = [];


    let count = 0;
    for (const _question of questions_data) {
        // IN TEST MODE, STOP AT 1000 DATA
        if (isTest) {
            if (count >= 1000) {
                process.stdout.write('STOP AT 1000 DATA: USERS');
                break;
            }
            count++;
        }

        process.stdout.write('.');

        let question_value = _question.tanya.trim().charAt(0).toUpperCase() + _question.tanya.trim().slice(1); let question = question_list.find(q => q.question == question_value);
        if (question_value == '') {
            question_value = 'Saling terbuka dengan pasangan?';
        }


        // get question by tanya, then save to question_list
        // this prevent multiple query to get existing question
        if (!question) {
            let check_question = await new_db.question.findFirst({
                where: {
                    question: question_value
                }
            });

            if (!check_question) {
                check_question = await new_db.question.create({
                    data: {
                        question: question_value,
                        createdBy: { connect: { id: admin.id } }
                    }
                });
            }

            question_list.push(check_question);

            question = check_question;
        }

        const answer = _question.jawab;
        const user = await create_dummy_user_biodata(_question.user_id, new_db);
        console.log({ user })
        if (user.biodata) {
            await new_db.answer.upsert({
                where: {
                    questionId_biodataId: {
                        biodataId: user.biodata.id,
                        questionId: question.id
                    }
                },
                create: {
                    question: { connect: { id: question.id } },
                    biodata: { connect: { id: user.biodata.id } },
                    answer: answer
                },
                update: {
                    answer: answer
                }
            });
        }

    }
    console.log('\nDone migration: Questions')
}
