import { MigrationInterface, QueryRunner } from "typeorm";

export class AlterDateField1663709496352 implements MigrationInterface {
    name = 'AlterDateField1663709496352'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "day" ADD "date" integer NOT NULL DEFAULT '1663709498255'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "day" DROP COLUMN "date"`);
    }

}
