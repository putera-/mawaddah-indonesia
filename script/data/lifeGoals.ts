import { PrismaClient } from "@prisma/client";
import mysql from 'mysql2/promise'


const tujuanHidup = [
    {
        title: 'Saya ingin mencapai keseimbangan antara kehidupan kerja dan pribadi yang harmonis',
    },
    {
        title: 'Saya berharap bisa menjalani kehidupan dengan penuh rasa syukur dan kebahagiaan',
    },
    {
        title: 'Saya bertekad untuk terus belajar dan mengembangkan diri sepanjang hidup',
    },
    {
        title: 'Saya ingin berkontribusi positif bagi masyarakat dan membantu mereka yang membutuhkan',
    },
    {
        title: 'Saya berharap bisa menjalani hidup dengan penuh kesehatan dan energi',
    },
    {
        title: 'Saya ingin membangun hubungan yang bermakna dan mendalam dengan keluarga dan teman',
    },
    {
        title: 'Saya berencana untuk mengeksplorasi dan memahami berbagai budaya dunia melalui perjalanan',
    },
    {
        title: 'Saya berharap bisa mencapai stabilitas finansial dan hidup tanpa beban hutang',
    },
    {
        title: 'Saya bertekad untuk mengejar dan mewujudkan impian karier saya',
    },
    {
        title: 'Saya ingin menciptakan sesuatu yang memiliki dampak positif dan tahan lama',
    },
    {
        title: 'Saya berharap bisa hidup secara mandiri dan otonom'
    },
    {
        title: 'Saya ingin membangun keluarga yang bahagia dan harmonis'
    },
    {
        title: 'Saya bertekad untuk menjaga lingkungan dan menjalani gaya hidup yang ramah lingkungan',
    },
    {
        title: 'Saya berharap bisa menjadi sumber inspirasi dan motivasi bagi orang lain',
    },
    {
        title: 'Saya ingin mengejar passion saya dan menjalani hidup dengan penuh semangat',
    },
    {
        title: 'Saya berharap bisa menikmati setiap momen dalam hidup dengan penuh kesadaran dan kehadiran',
    },
    {
        title: 'Saya berkomitmen untuk menjaga kesehatan mental dan emosional saya',
    },
    {
        title: 'Saya ingin terus mengejar pendidikan dan memperoleh pengetahuan baru',
    },
    {
        title: 'Saya berharap bisa mencapai perdamaian batin dan kesejahteraan spiritual',
    },
    {
        title: 'Saya ingin mengembangkan keterampilan baru dan terus tumbuh sebagai individu',
    },
];

const parameters = process.argv;

// check runner parameter
// isTest, gunakan variable ini untuk membuat data dummy
// misal untuk create dummy user
const isTest = parameters.includes('test');

/*
migrasi table gazwah.gambaran_keluarga > rq.family_member
*/
export async function harapan(old_db: mysql.Connection, new_db: PrismaClient) {
    const [lifeGoals]: any[] = await old_db.execute("SELECT * FROM gambaran_keluarga");

    for (let i = 0; i < lifeGoals.length; i++) {

        }
    }

