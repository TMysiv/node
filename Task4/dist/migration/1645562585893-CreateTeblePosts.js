"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateTeblePosts1645562585893 = void 0;
const typeorm_1 = require("typeorm");
class CreateTeblePosts1645562585893 {
    async up(queryRunner) {
        await queryRunner.createTable(new typeorm_1.Table({
            name: 'Posts',
            columns: [
                {
                    name: 'id',
                    type: 'int',
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: 'increment',
                },
                {
                    name: 'title',
                    type: 'varchar',
                    width: 250,
                    isUnique: true,
                    isNullable: false,
                },
            ],
        }), true);
    }
    async down(queryRunner) {
        await queryRunner.query(`
                DROP TABLE IF EXISTS Posts`);
    }
}
exports.CreateTeblePosts1645562585893 = CreateTeblePosts1645562585893;
//# sourceMappingURL=1645562585893-CreateTeblePosts.js.map