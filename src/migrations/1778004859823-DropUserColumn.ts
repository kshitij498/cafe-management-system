import { MigrationInterface, QueryRunner } from "typeorm";

export class DropUserColumn1778004859823 implements MigrationInterface {
    name = 'DropUserColumn1778004859823'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "sirname"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ADD "sirname" character varying NOT NULL`);
    }

}
