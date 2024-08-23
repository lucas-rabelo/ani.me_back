import { 
    Body, 
    Controller, 
    Get, 
    Param, 
    ParseIntPipe, 
    ParseUUIDPipe, 
    Post, 
    Put, 
    Query
} from "@nestjs/common";

import { 
    QueryBus,
    CommandBus 
} from '@nestjs/cqrs';

import { CreateGenderDto } from "../domain/dto/create-gender.dto";
import { ReadGenderDto } from "../domain/dto/read-gender.dto";
import { UpdateGenderDto } from "../domain/dto/update-gender.dto";
import { ListGenderDto } from "../domain/dto/list-gender.dto";

import { PostGenderCommand } from "../domain/commands/post-gender.command";
import { PutGenderCommand } from "../domain/commands/put-gender.command";

import { ListAndSearchGenderQuery } from "../domain/queries/list-and-search-gender.query";
import { GetGenderByUuidQuery } from "../domain/queries/get-gender-by-uuid.query";

@Controller('genres')
export class GenresController {
    constructor(
        private readonly commandBus: CommandBus,
        private readonly queryBus: QueryBus,
    ) {}

    @Post()
    async create(@Body() createGenderDto: CreateGenderDto): Promise<ReadGenderDto> {
        return await this.commandBus.execute(
            new PostGenderCommand(createGenderDto)
        );
    }

    @Put(':uuid')
    async update(
        @Param('uuid', ParseUUIDPipe) uuid: string,
        @Body() updateGenderDto: UpdateGenderDto, 
    ) {
        return await this.commandBus.execute(
            new PutGenderCommand(uuid, updateGenderDto)
        );
    }

    @Get()
    async list(
        @Query('page', ParseIntPipe) page: number,
        @Query('itemsPerPage', ParseIntPipe) itemsPerPage: number,
        @Query('search') search?: string
    ): Promise<ListGenderDto> {
        return await this.queryBus.execute<ListAndSearchGenderQuery, ListGenderDto>(
            new ListAndSearchGenderQuery(page, itemsPerPage, search)
        )
    }

    @Get(':uuid')
    async getGender(@Param('uuid', ParseUUIDPipe) uuid: string): Promise<ReadGenderDto> {
        return await this.queryBus.execute<GetGenderByUuidQuery, ReadGenderDto>(
            new GetGenderByUuidQuery(uuid)
        )
    }
}