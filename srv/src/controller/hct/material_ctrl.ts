
import { getConnection } from "typeorm";
import { Material } from "../../entity/hct/material";


export default async function GetMaterialsByPage(size: number, page: number, keyword: string) {
    let repo = await getConnection('hct').getRepository(Material);

    return await repo.createQueryBuilder("mat")
        .where('mat.Composition1 like :composition', { composition: `%${keyword}%` })
        .skip(size * (page - 1))
        .take(size)
        .getManyAndCount();
};