import User from "../../entity/gogs/user"
import { getConnection } from "typeorm"
import GetExprimentsByPage from "../hct/experiment_ctrl";

export async function GetUserByName(name: string) {
    let repo = getConnection('gogs').getRepository(User);
    let user = await repo.findOne({ lower_name: name });
    return user;
}

export async function ChangePassword(name: string, old_password: string, new_password: string) {
    let repo = getConnection('gogs').getRepository(User);
    let user = await repo.findOne({ lower_name: name });
    if (user && user?.ValidatePassword(old_password)) {
        user.passwd = new_password;
        user.EncodePassword();
        let builder = await getConnection('gogs');
        await builder.createQueryBuilder()
            .update(User)
            .set({ passwd: user.passwd })
            .where("id=:id", { id: user.id })
            .execute();
        return true;
    }
    return false;
}

export async function GetActivedUsers() {
    let repo = getConnection('gogs').getRepository(User);
    let users = await repo.createQueryBuilder("user").select(["user.lower_name", "user.full_name", "user.is_active", "user.email"]).where("user.is_active=1").getMany();
    return users;
}