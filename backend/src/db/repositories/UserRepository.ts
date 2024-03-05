import { User } from "../entities/UserEntity";
import dataSource from "../postgres.config";

const userRepo = dataSource.getRepository(User);

export const saveUser = async (user: User) => {
    return await userRepo.save(user);
};

export const isCredentialTaken = async (username: string, email: string) => {
    return await userRepo.findOne({
        where: [{ username: username }, { email: email }],
        select: ["email", "username"],
    });
};

export const isEmailTaken = async (email: string) => {
    return await userRepo.findOne({
        where: { email },
        relations: ["university"],
        select: ["userId"],
    });
};

export const findUserByEmail = async (email: string) => {
    return await userRepo.findOne({
        where: { email },
        relations: ["university"],
    });
};

export const findUserByUsername = async (username: string) => {
    return await userRepo.findOne({
        where: { username },
        select: ["username"],
    });
};

export const findUser = async (
    userId: string,
    username: string,
    email: string
) => {
    return await userRepo.findOne({
        where: [{ userId }, { username }, { email }],
        select: ["userId", "email", "username", "university"],
        relations: ["university"],
    });
};
