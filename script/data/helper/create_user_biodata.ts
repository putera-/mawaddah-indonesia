import { faker } from "@faker-js/faker";
import { Gender, ManhajStatus, MarriagePermission, MarriageStatus, Prisma, PrismaClient } from "@prisma/client";
import { User } from "src/users/user.interface";
import * as bcrypt from 'bcrypt';
import { get_user_by_old_id } from "./get_user_by_old_id";

export async function create_dummy_user_biodata(old_id: number, new_db: PrismaClient, index = 0): Promise<User> {
    const firstname = faker.person.firstName('male') + index;
    const lastname = faker.person.lastName('male');
    const email = faker.internet.email({ firstName: firstname, lastName: lastname }).toLowerCase();

    let user: User = await get_user_by_old_id(old_id, new_db);

    // return user if already exist
    if (user) { return user; }

    const data_user: Prisma.UserCreateInput = {
        firstname,
        lastname,
        email,
        active: true,
        verified: true,
        backup_detail: {
            create: {
                old_id
            }
        },
        password: {
            create: {
                password: await bcrypt.hash('rahasia', 10)
            }
        },
        biodata: {
            create: {
                bio: "-",
                phone: "08112345678",
                dob: new Date().toISOString(),
                birth_order: 1,
                birth_place: "Jakarta",
                address: "-",
                address_town: "-",
                address_province: "-",
                address_zip_code: 0,
                hometown_province: "-",
                poligami_opinion: "-",
                ethnic: "cina",
                manhaj: ManhajStatus.NON_SALAF,
                gender: Gender.PRIA,
                marriage_status: MarriageStatus.LAJANG,
                marriage_permission: MarriagePermission.NON_POLIGAMI,
            }
        }
    }

    user = await new_db.user.create({
        data: data_user,
        include: {
            backup_detail: true,
            biodata: true
        }

    });

    return user;
}
