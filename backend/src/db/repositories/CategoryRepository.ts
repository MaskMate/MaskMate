import { PostCategories } from "@/constants/Categories";
import { Category } from "@/db/entities/CategoryEntity";
import dataSource from "@/db/postgres.config";

const categoryRepo = dataSource.getRepository(Category);

export const getCategory = async (category: PostCategories) => {
    return await categoryRepo.findOne({ where: { name: category } });
};
