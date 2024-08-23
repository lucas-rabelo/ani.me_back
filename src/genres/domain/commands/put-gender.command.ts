import { ICommand } from "@nestjs/cqrs";
import { UpdateGenderDto } from "../dto/update-gender.dto";

export class PutGenderCommand implements ICommand {
    constructor(
        public readonly uuid: string,
        public readonly updateGenderDto: UpdateGenderDto
    ) {}
}