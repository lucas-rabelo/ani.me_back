import { Module } from "@nestjs/common";

import { PrismaService } from "src/prisma/services/prisma.service";

import { GenresController } from "../controllers/genres.controller";
import { GenresService } from "../services/genres.service";

@Module({
    imports: [PrismaService],
    controllers: [GenresController],
    providers: [GenresService]
})
export class GenresModule {}