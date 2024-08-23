import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { BadRequestException } from "@nestjs/common";

import { GenresService } from "src/genres/services/genres.service";
import { PostGenderCommand } from "./post-gender.command";
import { ReadGenderDto } from "../dto/read-gender.dto";

@CommandHandler(PostGenderCommand)
export class PostGenderHandler implements ICommandHandler<PostGenderCommand> {
   
    constructor(private readonly genresService: GenresService) {}

    async execute(command: PostGenderCommand): Promise<ReadGenderDto> {
        const { createGenderDto } = command;

        const gender = await this.genresService.postGender(createGenderDto);

        if(!gender) {
            throw new BadRequestException("Gender Not Created");
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