import { MigrationInterface, QueryRunner } from "typeorm";

export class FinishDayEntity1663713256938 implements MigrationInterface {
    name = 'FinishDayEntity1663713256938'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "day" ALTER COLUMN "date" SET DEFAULT '"2022-09-20T22:34:19.004Z"'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "day" ALTER COLUMN "date" SET DEFAULT '2022-09-20 22:02:37.307'`);
    }

}
