import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";

import { GenresService } from "src/genres/services/genres.service";
import { ListAndSearchGenderQuery } from "./list-and-search-gender.query";
import { ListGenderDto } from "../dto/list-gender.dto";

@QueryHandler(ListAndSearchGenderQuery)
export class ListAndSearchGenderHandler implements IQueryHandler<ListAndSearchGenderQuery> {
    constructor(private readonly genresService: GenresService) {}

    async execute(query: ListAndSearchGenderQuery): Promise<ListGenderDto> {
        const { page, itemsPerPage, search } = query;

        const [genres, total] = await this.genresService.listAndSearchGender(page, itemsPerPage, search);

        return <ListGenderDto>{
            data: genres.length ? 
                genres.map(gender => ({
                    uuid: gender.uuid,
                    description: gender.description,
                    createAt: new Date(gender.createdAt).toISOString(),
                    updatedAt: new Date(gender.updatedAt).toISOString(),
                    deletedAt: new Date(gender.deletedAt).toISOString()
                }))
                : [],
            total
        };
    }
}