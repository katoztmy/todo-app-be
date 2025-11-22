import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1762961589064 implements MigrationInterface {
    name = 'Migration1762961589064'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE SCHEMA IF NOT EXISTS "todo"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP SCHEMA IF EXISTS "todo" CASCADE`);
    }

}

