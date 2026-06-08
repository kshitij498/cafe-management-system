import { MigrationInterface, QueryRunner } from "typeorm";

export class BillTable1778412634288 implements MigrationInterface {
    name = 'BillTable1778412634288'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "bill" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "email" character varying NOT NULL, "contactNo" character varying NOT NULL, "paymentMethod" character varying NOT NULL, "total" integer NOT NULL, "productDetails" jsonb NOT NULL, "createdBy" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_683b47912b8b30fe71d1fa22199" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "bill"`);
    }

}
