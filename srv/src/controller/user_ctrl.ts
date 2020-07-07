import User from "../entity/gogs/user"
import { getConnection } from "typeorm"

export async function GetUserByName(name: string) {
    let repo = getConnection('gogs').getRepository(User);

    let user = await repo.findOne({ lower_name: name });
    return user;
}