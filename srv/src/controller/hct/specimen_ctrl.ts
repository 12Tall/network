
import { getConnection } from "typeorm";
import { Specimen } from "../../entity/hct/specimen";


export default async function GetSpecimentsByPage(size: number, page: number, keyword: string) {
    let repo = await getConnection('hct').getRepository(Specimen);

    return await repo.createQueryBuilder("spc")
        .where('spc.Partner_1 like :partner', { partner: `%${keyword}%` })
        .skip(size * (page - 1))
        .take(size)
        .getManyAndCount();
};