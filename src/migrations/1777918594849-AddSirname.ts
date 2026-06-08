import { MigrationInterface, QueryRunner } from "typeorm";

export class AddSirname1777918594849 implements MigrationInterface {
    name = 'AddSirname1777918594849'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ADD "sirname" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "sirname"`);
    }

}
