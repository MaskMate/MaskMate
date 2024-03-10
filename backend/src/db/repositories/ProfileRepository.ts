import Profile from "@/db/entities/ProfileEntity";
import dataSource from "@/db/postgres.config";

const profileRepo = dataSource.getRepository(Profile);

export const saveProfile = async (profile: Profile) => {
    return await profileRepo.save(profile);
};

export const isCredentialTaken = async (username: string, email: string) => {
    return await profileRepo.findOne({
        where: [{ username: username }, { email: email }],
        select: ["email", "username"],
    });
};

export const isUsernameTaken = async (username: string) => {
    return await profileRepo.findOne({
        where: { username },
        select: ["username"],
    });
};

export const findProfile = async (
    profileId: string,
    username: string,
    email: string
) => {
    return await profileRepo.findOne({
        where: [{ profileId }, { username }, { email }],
        relations: ["university"],
    });
};

export const findProfileByEmail = async (email: string) => {
    return await profileRepo.findOne({
        where: { email },
        relations: ["university"],
    });
};
