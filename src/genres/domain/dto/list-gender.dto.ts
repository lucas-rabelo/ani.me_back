import { IsArray, IsNumber } from "class-validator";
import { ReadGenderDto } from "./read-gender.dto";

export class ListGenderDto {
    @IsArray()
    data: ReadGenderDto[];

    @IsNumber()
    total: number;
}