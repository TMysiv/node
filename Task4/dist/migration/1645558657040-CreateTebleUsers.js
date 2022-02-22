"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateTebleUsers1645558657040 = void 0;
class CreateTebleUsers1645558657040 {
    async up(queryRunner) {
        await queryRunner.query(`
            CREATE TABLE IF NOT EXISTS Users (
                id INT PRIMARY KEY AUTO_INCREMENT,
                firstName VARCHAR(250) NOT NULL,
                lastName VARCHAR(250) NOT NULL
            )
        `);
    }
    async down(queryRunner) {
        await queryRunner.query(`
                DROP TABLE IF EXISTS Users`);
    }
}
exports.CreateTebleUsers1645558657040 = CreateTebleUsers1645558657040;
//# sourceMappingURL=1645558657040-CreateTebleUsers.js.map