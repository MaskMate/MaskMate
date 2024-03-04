import { University } from "../entities/UniversityEntity";
import dataSource from "../postgres.config";

const universityRepo = dataSource.getRepository(University);

export const findUniversityByDomain = async (domain: string) => {
    return await universityRepo.findOne({ where: { domain } });
};
