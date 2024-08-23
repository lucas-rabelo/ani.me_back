import { IQuery } from "@nestjs/cqrs";

export class GetGenderByUuidQuery implements IQuery {
    constructor(public readonly uuid: string) {}
}