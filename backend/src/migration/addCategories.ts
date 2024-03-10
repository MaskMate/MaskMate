import { MigrationInterface, QueryRunner } from "typeorm";
import Category from "@/db/entities/CategoryEntity";

export default class AddCategories1709573550000 implements MigrationInterface {
    categories = [
        {
            name: "EXAM",
            logo: "https://cdn-icons-png.freepik.com/512/1946/1946087.png",
        },
        {
            name: "PROJECT",
            logo: "https://cdn-icons-png.freepik.com/512/1946/1946087.png",
        },
        {
            name: "LEETCODE",
            logo: "https://cdn-icons-png.freepik.com/512/1946/1946087.png",
        },
        {
            name: "JOB",
            logo: "https://cdn-icons-png.freepik.com/512/1946/1946087.png",
        },
        {
            name: "HACKATHON",
            logo: "https://cdn-icons-png.freepik.com/512/1946/1946087.png",
        },
        {
            name: "INTERVIEW",
            logo: "https://cdn-icons-png.freepik.com/512/1946/1946087.png",
        },
        {
            name: "TUTORIAL",
            logo: "https://cdn-icons-png.freepik.com/512/1946/1946087.png",
        },
        {
            name: "CULTURAL",
            logo: "https://cdn-icons-png.freepik.com/512/1946/1946087.png",
        },
        {
            name: "SYMPOSIUM",
            logo: "https://cdn-icons-png.freepik.com/512/1946/1946087.png",
        },
        {
            name: "WORKSHOP",
            logo: "https://cdn-icons-png.freepik.com/512/1946/1946087.png",
        },
    ];

    public async up(queryRunner: QueryRunner): Promise<void> {
        const categories = this.categories.map(item => {
            const category = new Category();
            category.name = item.name;
            category.logo = item.logo;
            return category;
        });
        await queryRunner.manager.save(categories);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DELETE FROM Category`);
    }
}
