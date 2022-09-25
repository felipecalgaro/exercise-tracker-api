import { MigrationInterface, QueryRunner } from "typeorm";

export class AddOnDeleteRelationBehavior1664111716552 implements MigrationInterface {
    name = 'AddOnDeleteRelationBehavior1664111716552'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "day" ALTER COLUMN "date" SET DEFAULT '"2022-09-25T13:15:28.691Z"'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "day" ALTER COLUMN "date" SET DEFAULT '2022-09-25 13:13:02.581'`);
    }

}
