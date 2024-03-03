import { User } from "../entities/UserEntity";
import dataSource from "../postgres.config";

const userRepo = dataSource.getRepository(User);

export const findUserByEmail = async (email: string) => {
    return await userRepo.findOne({ where: { email } });
};
