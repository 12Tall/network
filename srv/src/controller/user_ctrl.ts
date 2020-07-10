import User from "../entity/gogs/user"
import { getConnection } from "typeorm"
import GetExprimentsByPage from "./hct/experiment_ctrl";

export async function GetUserByName(name: string) {
   
    let obj = await GetExprimentsByPage(10,1,"");

    let repo = getConnection('gogs').getRepository(User);

    let user = await repo.findOne({ lower_name: name });
    return user;
}