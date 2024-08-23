import { ICommand } from "@nestjs/cqrs";
import { CreateGenderDto } from "../dto/create-gender.dto";

export class PostGenderCommand implements ICommand {
    constructor(public readonly createGenderDto: CreateGenderDto) {}
}