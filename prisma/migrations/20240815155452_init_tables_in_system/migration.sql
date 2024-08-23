-- CreateTable
CREATE TABLE "anime_episodes" (
    "uuid" UUID NOT NULL,
    "anime_uuid" UUID NOT NULL,
    "number" INTEGER NOT NULL,
    "description" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "anime_episodes_pkey" PRIMARY KEY ("uuid")
);

-- CreateTable
CREATE TABLE "anime_seasons" (
    "uuid" UUID NOT NULL,
    "anime_uuid" UUID NOT NULL,
    "episodes" INTEGER NOT NULL,
    "description" VARCHAR(255) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "anime_seasons_pkey" PRIMARY KEY ("uuid")
);

-- CreateTable
CREATE TABLE "animes" (
    "uuid" UUID NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "banner_photo" TEXT NOT NULL,
    "studio" VARCHAR(255) NOT NULL,
    "sinopse" TEXT NOT NULL,
    "duration" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "animes_pkey" PRIMARY KEY ("uuid")
);

-- CreateTable
CREATE TABLE "anime_comments" (
    "uuid" UUID NOT NULL,
    "anime_uuid" UUID NOT NULL,
    "user_uuid" UUID NOT NULL,
    "description" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "anime_comments_pkey" PRIMARY KEY ("uuid")
);

-- CreateTable
CREATE TABLE "anime_genres" (
    "uuid" UUID NOT NULL,
    "anime_uuid" UUID NOT NULL,
    "gender_uuid" UUID NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "anime_genres_pkey" PRIMARY KEY ("uuid")
);

-- CreateTable
CREATE TABLE "anime_rating" (
    "uuid" UUID NOT NULL,
    "anime_uuid" UUID NOT NULL,
    "user_uuid" UUID NOT NULL,
    "rating" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "anime_rating_pkey" PRIMARY KEY ("uuid")
);

-- CreateTable
CREATE TABLE "genres" (
    "uuid" UUID NOT NULL,
    "description" VARCHAR(255) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "genres_pkey" PRIMARY KEY ("uuid")
);

-- CreateTable
CREATE TABLE "type_users" (
    "uuid" UUID NOT NULL,
    "description" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "type_users_pkey" PRIMARY KEY ("uuid")
);

-- CreateTable
CREATE TABLE "users" (
    "uuid" UUID NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "birth_date" VARCHAR(255),
    "password" VARCHAR(255),
    "type_user_uuid" UUID NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "users_pkey" PRIMARY KEY ("uuid")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "users_type_user_uuid_key" ON "users"("type_user_uuid");

-- AddForeignKey
ALTER TABLE "anime_episodes" ADD CONSTRAINT "anime_episodes_anime_uuid_fkey" FOREIGN KEY ("anime_uuid") REFERENCES "animes"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "anime_seasons" ADD CONSTRAINT "anime_seasons_anime_uuid_fkey" FOREIGN KEY ("anime_uuid") REFERENCES "animes"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "anime_comments" ADD CONSTRAINT "anime_comments_anime_uuid_fkey" FOREIGN KEY ("anime_uuid") REFERENCES "animes"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "anime_comments" ADD CONSTRAINT "anime_comments_user_uuid_fkey" FOREIGN KEY ("user_uuid") REFERENCES "users"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "anime_genres" ADD CONSTRAINT "anime_genres_anime_uuid_fkey" FOREIGN KEY ("anime_uuid") REFERENCES "animes"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "anime_genres" ADD CONSTRAINT "anime_genres_gender_uuid_fkey" FOREIGN KEY ("gender_uuid") REFERENCES "genres"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "anime_rating" ADD CONSTRAINT "anime_rating_anime_uuid_fkey" FOREIGN KEY ("anime_uuid") REFERENCES "animes"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "anime_rating" ADD CONSTRAINT "anime_rating_user_uuid_fkey" FOREIGN KEY ("user_uuid") REFERENCES "users"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_type_user_uuid_fkey" FOREIGN KEY ("type_user_uuid") REFERENCES "type_users"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;
