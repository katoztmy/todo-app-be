import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1764769506984 implements MigrationInterface {
    name = 'Migration1764769506984'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "todo"."todos" DROP COLUMN "due_date"`);
        await queryRunner.query(`ALTER TABLE "todo"."todos" ADD "due_date" TIMESTAMP`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "todo"."todos" DROP COLUMN "due_date"`);
        await queryRunner.query(`ALTER TABLE "todo"."todos" ADD "due_date" date`);
    }

}
