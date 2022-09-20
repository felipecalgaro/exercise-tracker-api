import { MigrationInterface, QueryRunner } from "typeorm";

export class AddDateField1663707294977 implements MigrationInterface {
    name = 'AddDateField1663707294977'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "day" ADD "date" TIMESTAMP NOT NULL DEFAULT '1663707297381'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "day" DROP COLUMN "date"`);
    }

}
