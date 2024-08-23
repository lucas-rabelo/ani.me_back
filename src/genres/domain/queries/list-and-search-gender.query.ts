import { IQuery } from "@nestjs/cqrs";

export class ListAndSearchGenderQuery implements IQuery {
    constructor(
        public readonly page: number,
        public readonly itemsPerPage: number,
        public readonly search: string,
    ) {}
}