-- CreateTable
CREATE TABLE "public"."City" (
    "id" SERIAL NOT NULL,
    "geonameId" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "asciiName" TEXT NOT NULL,
    "latitude" DOUBLE PRECISION NOT NULL,
    "longitude" DOUBLE PRECISION NOT NULL,
    "countryCode" VARCHAR(2) NOT NULL,
    "admin1Code" VARCHAR(20),
    "population" BIGINT NOT NULL,

    CONSTRAINT "City_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "City_geonameId_key" ON "public"."City"("geonameId");

-- CreateIndex
CREATE INDEX "City_asciiName_idx" ON "public"."City"("asciiName");
