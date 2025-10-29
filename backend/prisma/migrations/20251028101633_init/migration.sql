-- CreateTable
CREATE TABLE "UserRecord" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "UserRecord_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProjectData" (
    "id" TEXT NOT NULL,
    "html" TEXT NOT NULL,
    "css" TEXT NOT NULL,
    "js" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" TEXT NOT NULL,

    CONSTRAINT "ProjectData_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "UserRecord_name_key" ON "UserRecord"("name");

-- CreateIndex
CREATE UNIQUE INDEX "UserRecord_email_key" ON "UserRecord"("email");

-- AddForeignKey
ALTER TABLE "ProjectData" ADD CONSTRAINT "ProjectData_userId_fkey" FOREIGN KEY ("userId") REFERENCES "UserRecord"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
