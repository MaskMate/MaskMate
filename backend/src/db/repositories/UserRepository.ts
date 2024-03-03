import { User } from "../entities/UserEntity";
import dataSource from "../postgres.config";

const userRepo = dataSource.getRepository(User);

export const saveUser = async (user: User) => {
    return await userRepo.save(user);
};

export const isCredentialTaken = async (username: string, email: string) => {
    return await userRepo.findOne({
        where: [{ username: username }, { email: email }],
    });
};

export const findUserByEmail = async (email: string) => {
    return await userRepo.findOne({ where: { email } });
};

export const findUserByUsername = async (username: string) => {
    return await userRepo.findOne({ where: { username } });
};
