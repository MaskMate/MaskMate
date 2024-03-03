import { RequiredData } from "../../utils/UniversityHelper";
import { University } from "../entities/UniversityEntity";
import dataSource from "../postgres.config";

const universityRepo = dataSource.getRepository(University);

export const getUniversityCount = async () => {
    return await universityRepo.count();
};

export const insertIntoDatabase = async (data: RequiredData[]) => {
    const universities = data.map((item) => {
        const university = new University();
        university.name = item.name;
        university.domain = item.domain;
        university.country = item.country;
        return university;
    });
    await universityRepo.save(universities);
};

export const findUniversityByDomain = async (domain: string) => {
    return await universityRepo.findOne({ where: { domain } });
};
