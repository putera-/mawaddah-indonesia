import { applyDecorators } from "@nestjs/common";
import { ApiBody, ApiOperation } from "@nestjs/swagger";
import { SignInDto } from "./dto/sign-in.dto";

export function LoginDoc() {
    return applyDecorators(
        ApiOperation({
            summary: "Login user",
        }),
        ApiBody({
            type: SignInDto
        })
    );
}

export function LoginAdminDoc() {
    return applyDecorators(
        ApiOperation({
            summary: "Login for Admin & Superadmin",
        }),
        ApiBody({
            type: SignInDto
        })
    );
}
