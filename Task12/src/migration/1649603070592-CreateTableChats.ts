import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTableChats1649603070592 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE IF NOT EXISTS Chats(
            id INT PRIMARY KEY AUTO_INCREMENT,
            user VARCHAR(250) NOT NULL,
            text VARCHAR(250) NOT NULL,
            chat VARCHAR(250) NOT NULL,
            createdAt TIMESTAMP DEFAULT(UTC_TIMESTAMP()) NOT NULL,
            deletedAt TIMESTAMP
            )
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
        DROP TABLE IF EXISTS Chats
        `);
    }
}
