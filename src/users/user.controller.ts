import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    HttpCode,
    ValidationPipe,
    Request,
    UseInterceptors,
    UploadedFile,
    Query,
} from '@nestjs/common';
import { UsersService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Prisma, RoleStatus } from '@prisma/client';
import { User } from './user.interface';
import { Public } from 'src/auth/auth.metadata';
import { FileInterceptor } from '@nestjs/platform-express';
import path from 'path';
import { PhotosService } from 'src/photos/photos.service';
import { Roles } from 'src/roles/roles.decorator';
import { Role } from 'src/roles/role.enums';

@Controller('users')
export class UsersController {
    constructor(
        private readonly userService: UsersService,
        private readonly photoService: PhotosService,
    ) { }
@Public()
@Post()
async create(@Body(new ValidationPipe()) data: CreateUserDto) {
    try {
        await this.userService.validateNewUser(data);

        const user: User = await this.userService.create(data);

        // FORMAT/HIDE USER DATA
        this.userService.formatGray(user);

        return user;
    } catch (error) {
        throw error;
    }
}

    @Roles(Role.Superadmin, Role.Admin, Role.Member)
    @Get()
    async findAll(@Request() req: any, @Query() query: Record<string, any>) {
        try {
            const role = req.user.role;
            return await this.userService.findAll(role, query);
        } catch (error) {
            throw error;
        }
    }

    @Roles(Role.Superadmin, Role.Admin, Role.Member)
    @Get(':id')
    async findOne(@Param('id') id: string) {
        try {
            const user = await this.userService.findOne(id, 'MEMBER');
            this.userService.formatGray(user);
            return user;
        } catch (error) {
            throw error;
        }
    }

@Roles(Role.Superadmin, Role.Admin, Role.Member)
@Patch()
@UseInterceptors(FileInterceptor('avatar'))
async updateUser(
    @Request() req: any,
    @Body(new ValidationPipe()) data: UpdateUserDto,
    @UploadedFile() file: Express.Multer.File,
) {
    // for avatar
    const ext = file ? file.originalname.split('.').pop() : '';
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);

    // only can update belongs to auth user
    const { id } = req.user;
    // prevent change email
    if (data.email) delete data.email;
    try {
        if (file) {
            const avatarBuffer = file.buffer;

            // resize images to 600, 900, 1200
            const sizes = [
                { key: 'md', size: 900 },
                { key: 'lg', size: 1200 },
            ];
            await Promise.all(
                sizes.map(async (s) => {
                    const { key, size } = s;
                    const filename = `${uniqueSuffix}_${key}.${ext}`;
                    const filepath = path.join(
                        './public/avatar/' + filename,
                    );

                    await this.photoService.resize(
                        size,
                        avatarBuffer,
                        filepath,
                    );
                }),
            );

            data.avatar = `/avatar/${uniqueSuffix}_lg.${ext}`;
            data.avatar_md = `/avatar/${uniqueSuffix}_md.${ext}`;
        } else {
            data.avatar = '';
            data.avatar_md = '';
        }

        return this.userService.update(id, data);
    } catch (error) {
        // remove avatar
        if (file) {
            this.photoService.removeFile(
                `/uploads/photos/${uniqueSuffix}_lg.${ext}`,
            );
            this.photoService.removeFile(
                `/uploads/photos/${uniqueSuffix}_md.${ext}`,
            );
        }
        throw error;
    }
}
@Roles(Role.Superadmin, Role.Admin, Role.Member)
@Patch(':id')
update(@Param('id') id: string, @Body() data: UpdateUserDto) {
    try {
        return this.userService.update(id, data as Prisma.UserUpdateInput);
    } catch (error) {
        throw error;
    }
}
@Roles(Role.Admin, Role.Superadmin)
@Patch('activate/:id')
@HttpCode(204)
async activateUser(@Param('id') id: string): Promise < void> {
    try {
        await this.userService.activateUser(id);
    } catch(error) {
        throw error;
    }
}
@Roles(Role.Admin, Role.Superadmin)
@Patch('deactivate/:id')
@HttpCode(204)
async deactivateUser(@Param('id') id: string): Promise < void> {
    try {
        await this.userService.deactivateUser(id);
    } catch(error) {
        throw error;
    }
}
@Roles(Role.Admin, Role.Superadmin)
@Delete(':id')
@HttpCode(204)
remove(@Param('id') id: string, role: RoleStatus) {
    try {
        return this.userService.remove(id, role);
    } catch (error) {
        throw error;
    }
}
}
