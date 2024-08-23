import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { BadRequestException } from "@nestjs/common";

import { GenresService } from "src/genres/services/genres.service";
import { PutGenderCommand } from "./put-gender.command";
import { ReadGenderDto } from "../dto/read-gender.dto";

@CommandHandler(PutGenderCommand)
export class PutGenderHandler implements ICommandHandler<PutGenderCommand> {
   
    constructor(private readonly genresService: GenresService) {}

    async execute(command: PutGenderCommand): Promise<ReadGenderDto> {
        const { uuid, updateGenderDto } = command;

        const gender = await this.genresService.putGender(uuid, updateGenderDto);

        if(!gender) {
            throw new BadRequestException("Gender Not Updated");
        }

        return <ReadGenderDto>{
            uuid: gender.uuid,
            description: gender.description,
            createAt: new Date(gender.createdAt).toISOString(),
            updatedAt: new Date(gender.updatedAt).toISOString(),
            deletedAt: new Date(gender.deletedAt).toISOString()
        }
    }
}