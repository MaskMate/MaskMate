import { User } from "../entities/UserEntity";
import dataSource from "../postgres.config";

const userRepo = dataSource.getRepository(User);

export const saveUser = async (user: User) => {
    return await userRepo.save(user);
};

export const isEmailTaken = async (email: string) => {
    return await userRepo.findOne({
        where: { email },
        select: ["userId"],
    });
};

export const findUserByEmail = async (email: string) => {
    return await userRepo.findOne({
        where: { email },
    });
};
