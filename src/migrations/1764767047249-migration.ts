import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1764767047249 implements MigrationInterface {
    name = 'Migration1764767047249'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "todo"."todos" DROP COLUMN "dueDate"`);
        await queryRunner.query(`ALTER TABLE "todo"."todos" ADD "due_date" date`);
        await queryRunner.query(`ALTER TABLE "todo"."todos" ADD "created_at" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "todo"."todos" ADD "updated_at" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "todo"."todos" DROP COLUMN "description"`);
        await queryRunner.query(`ALTER TABLE "todo"."todos" ADD "description" text`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "todo"."todos" DROP COLUMN "description"`);
        await queryRunner.query(`ALTER TABLE "todo"."todos" ADD "description" character varying`);
        await queryRunner.query(`ALTER TABLE "todo"."todos" DROP COLUMN "updated_at"`);
        await queryRunner.query(`ALTER TABLE "todo"."todos" DROP COLUMN "created_at"`);
        await queryRunner.query(`ALTER TABLE "todo"."todos" DROP COLUMN "due_date"`);
        await queryRunner.query(`ALTER TABLE "todo"."todos" ADD "dueDate" TIMESTAMP`);
    }

}
