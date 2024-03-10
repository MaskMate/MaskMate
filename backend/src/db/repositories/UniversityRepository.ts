import University from "@/db/entities/UniversityEntity";
import dataSource from "@/db/postgres.config";

const universityRepo = dataSource.getRepository(University);

export const saveUniversity = async (university: University) => {
    return await universityRepo.save(university);
};

export const findUniversityByDomain = async (domain: string) => {
    return await universityRepo.findOne({ where: { domain } });
};
