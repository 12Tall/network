import { Experiment } from "../../entity/hct/experiment";
import { getConnection } from "typeorm";


export default async function GetExprimentsByPage(size: number, page: number, keyword: string) {
    let repo = await getConnection('hct').getRepository(Experiment);
    await repo.save([{ name: "1" },{name:"12"}]);
    return await repo.createQueryBuilder("exp")
        .where('exp.specimen1 like :specimen', { specimen: `%${keyword}%` })
        .skip(size * (page - 1))
        .take(size)
        .getManyAndCount();
};