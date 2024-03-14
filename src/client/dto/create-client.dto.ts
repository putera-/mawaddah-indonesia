import { IsOptional, IsPhoneNumber, IsString, Length, MinLength} from "class-validator";

export class CreateClientDto {
    @IsString()
    @Length(1, 100)
    name: string;
    
    @IsString()
    @Length(1, 20)
    phone: string;

    @IsString()
    @MinLength(1)
    address: string;

    @IsString()
    @IsOptional()
    about: string;

    @IsString()
    @IsOptional()
    taaruf_muqoddimah: string;
    
    @IsString()
    @IsOptional()
    login_muqoddimah: string;
    
    @IsString()
    @IsOptional()
    signup_muqoddimah: string;
    
    @IsString()
    @IsOptional()
    youtube: string;

    @IsString()
    @IsOptional()
    facebook: string;
    
    @IsString()
    @IsOptional()
    twitter: string;
    
    @IsString()
    @IsOptional()
    tiktok: string;

    @IsString()
    @IsOptional()
    instagram: string;

    @IsString()
    @IsOptional()
    linkedin: string;
}
