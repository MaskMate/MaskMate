import { PostCategories } from "../../constants/Categories";
import { Category } from "../entities/CategoryEntity";
import dataSource from "../postgres.config";

const categoryRepo = dataSource.getRepository(Category);

export const getCategory = async (category: PostCategories) => {
    return await categoryRepo.findOne({ where: { name: category } });
};
