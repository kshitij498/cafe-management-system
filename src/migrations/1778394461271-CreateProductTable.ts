import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateProductTable1778394461271 implements MigrationInterface {
    name = 'CreateProductTable1778394461271'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "product" ("productId" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(255) NOT NULL, "description" character varying(255) NOT NULL, "price" integer NOT NULL, "status" character varying NOT NULL, "categoryId" uuid NOT NULL, CONSTRAINT "PK_429540a50a9f1fbf87efd047f35" PRIMARY KEY ("productId"))`);
        await queryRunner.query(`ALTER TABLE "product" ADD CONSTRAINT "FK_ff0c0301a95e517153df97f6812" FOREIGN KEY ("categoryId") REFERENCES "category"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "product" DROP CONSTRAINT "FK_ff0c0301a95e517153df97f6812"`);
        await queryRunner.query(`DROP TABLE "product"`);
    }

}
