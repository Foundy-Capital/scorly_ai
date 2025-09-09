/*
  Warnings:

  - The primary key for the `scored_assets` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `scored_assets` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "public"."scored_assets" DROP CONSTRAINT "scored_assets_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "scored_assets_pkey" PRIMARY KEY ("id");
