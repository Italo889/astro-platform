-- CreateTable
CREATE TABLE "public"."Changelog" (
    "id" TEXT NOT NULL,
    "version" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "releaseDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "isPublished" BOOLEAN NOT NULL DEFAULT false,
    "changes" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdById" TEXT NOT NULL,

    CONSTRAINT "Changelog_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Changelog_version_key" ON "public"."Changelog"("version");

-- CreateIndex
CREATE INDEX "Changelog_releaseDate_idx" ON "public"."Changelog"("releaseDate");

-- CreateIndex
CREATE INDEX "Changelog_isPublished_idx" ON "public"."Changelog"("isPublished");

-- AddForeignKey
ALTER TABLE "public"."Changelog" ADD CONSTRAINT "Changelog_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
