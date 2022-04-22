-- CreateEnum
CREATE TYPE "ProgressType" AS ENUM ('DONE', 'SKIPPED', 'MISSED');

-- AlterTable
ALTER TABLE "DailyHabit" ALTER COLUMN "howManyTimes" SET DEFAULT 1;

-- AlterTable
ALTER TABLE "HabitProgress" ADD COLUMN     "type" "ProgressType" NOT NULL DEFAULT E'DONE';

-- AlterTable
ALTER TABLE "WeeklyHabit" ALTER COLUMN "howManyDays" SET DEFAULT 1,
ALTER COLUMN "howManyTimesPerDay" SET DEFAULT 1;
