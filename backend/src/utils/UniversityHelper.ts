import fs from "fs";
import {
    getUniversityCount,
    insertIntoDatabase,
} from "../db/repositories/UniversityRepository";

type UniversityData = {
    web_pages: string[];
    name: string;
    domains: string[];
    country: string;
};

export type RequiredData = {
    name: string;
    domain: string;
    country: string;
};

const getRequiredData = (jsonData: UniversityData[]): RequiredData[] => {
    let result: RequiredData[] = [];

    for (let university of jsonData) {
        for (let domain of university.domains) {
            result.push({
                name: university.name,
                domain: domain,
                country: university.country,
            });
        }
    }

    return result;
};

export const prepareDataForUniversityTable = () => {
    getUniversityCount()
        .then((count) => {
            if (count === 0) {
                const universityDetailsFile = fs.readFileSync(
                    "public/json/world_universities_and_domains.json",
                    "utf8"
                );
                let universityDetailsData = JSON.parse(universityDetailsFile);
                let requiredData = getRequiredData(universityDetailsData);
                insertIntoDatabase(requiredData)
                    .then(() =>
                        console.log("University data inserted successfully")
                    )
                    .catch((err) => console.error("An error occurred", err));
            }
        })
        .catch((err) => console.error("An error occurred", err));
};
