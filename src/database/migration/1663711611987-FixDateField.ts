import { MigrationInterface, QueryRunner } from "typeorm";

export class FixDateField1663711611987 implements MigrationInterface {
    name = 'FixDateField1663711611987'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "day" ALTER COLUMN "date" SET DEFAULT '"2022-09-20T22:06:54.114Z"'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "day" ALTER COLUMN "date" SET DEFAULT '2022-09-20 22:02:37.307'`);
    }

}
