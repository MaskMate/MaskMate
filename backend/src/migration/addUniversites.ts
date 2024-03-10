import { MigrationInterface, QueryRunner } from "typeorm";
import { University } from "@/db/entities/UniversityEntity";
import fs from "fs";

export class AddUniversites1709573535718 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        const requiredData = this.getRequiredData();
        const universities = requiredData.map(item => {
            const university = new University();
            university.name = item.name;
            university.domain = item.domain;
            return university;
        });
        await queryRunner.manager.save(universities);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DELETE FROM University`);
    }

    getRequiredData() {
        const universityDetailsFile = fs.readFileSync(
            "public/json/world_universities_and_domains.json",
            "utf8"
        );
        const universityDetailsData = JSON.parse(universityDetailsFile);
        const result: { name: string; domain: string; country: string }[] = [];

        for (const university of universityDetailsData) {
            for (const domain of university.domains) {
                result.push({
                    name: university.name,
                    domain: domain,
                    country: university.country,
                });
            }
        }

        return result;
    }
}
