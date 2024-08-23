import { BadRequestException, Injectable } from "@nestjs/common";
import { Genres } from "@prisma/client";
import { PrismaService } from "src/prisma/services/prisma.service";
import { UpdateGenderDto } from "../domain/dto/update-gender.dto";
import { CreateGenderDto } from "../domain/dto/create-gender.dto";

@Injectable()
export class GenresService {
    constructor(private readonly prismaService: PrismaService) {}

    async postGender(data: CreateGenderDto): Promise<Genres> {
        try {
            return this.prismaService.genres.create({
                data
            })
        } catch(error) {
            throw new BadRequestException(error);
        }
    }

    async putGender(uuid: string, data: UpdateGenderDto): Promise<Genres> {
        try {
            return this.prismaService.genres.update({
                where: {
                    uuid
                },
                data
            })
        } catch(error) {
            throw new BadRequestException(error);
        }
    }

    async getGenderByUuid(uuid: string): Promise<Genres> {
        try {
            return this.prismaService.genres.findUnique({
                where: {
                    uuid
                }
            })
        } catch(error) {
            throw new BadRequestException(error);
        }
    }

    async listAndSearchGender(
        page: number,
        itemsPerPage: number,
        search?: string
    ): Promise<[Genres[], number]> {
        const skip = Number((page - 1) * itemsPerPage);
        const take = Number(itemsPerPage);

        const query = this.prismaService.genres;
        try {
            const total = await query.count({
                where: {
                    OR: [
                        { description: { contains: search || '', mode: 'insensitive' } },
                    ],
                }
            });

            const genres = await query.findMany({
                orderBy: [
                    {
                        createdAt: 'desc'
                    }
                ],
                where: {
                    OR: [
                        { description: { contains: search || '', mode: 'insensitive' } },
                    ],
                },
                skip,
                take
            });

            return [ genres, total ];
        } catch(error) {
            throw new BadRequestException(error)
        }
    }
}