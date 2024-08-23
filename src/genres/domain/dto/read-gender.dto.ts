import { IsString, IsUUID } from "class-validator";

export class ReadGenderDto {
    @IsUUID()
    uuid: string;

    @IsString()
    description: string;

    @IsString()
    createAt: string;
    
    @IsString()
    updatedAt: string;
    
    @IsString()
    deletedAt: string;
}