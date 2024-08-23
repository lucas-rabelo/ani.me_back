import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { GetGenderByUuidQuery } from "./get-gender-by-uuid.query";
import { GenresService } from "src/genres/services/genres.service";
import { BadRequestException } from "@nestjs/common";
import { ReadGenderDto } from "../dto/read-gender.dto";

@QueryHandler(GetGenderByUuidQuery)
export class GetGenderByUuidHandler implements IQueryHandler<GetGenderByUuidQuery> {
    constructor(private readonly genresService: GenresService) {}

    async execute(query: GetGenderByUuidQuery): Promise<ReadGenderDto> {
        const { uuid } = query;

        const gender = await this.genresService.getGenderByUuid(uuid);

        if(!gender) {
            throw new BadRequestException("Gender Not Found");
        }

        return <ReadGenderDto>{
            uuid: gender.uuid,
            description: gender.description,
            createAt: new Date(gender.createdAt).toISOString(),
            updatedAt: new Date(gender.updatedAt).toISOString(),
            deletedAt: new Date(gender.deletedAt).toISOString()
        };
    }
}