import { getConnection } from "typeorm";
import { Department } from "../../entity/my_db/department";

export async function GetDepartmentById(id: number) {
    const repo = await getConnection("my_db").getTreeRepository(Department);
    let tree = await repo.findOne(id);
    return tree;
}

export async function InsertDepartment(name: string, parentId: number) {
    const repo = await getConnection("my_db").getTreeRepository(Department);
    const parent = await repo.findOne(parentId);
    const dept = new Department();
    dept.parent = parent;
    dept.name = name;
    await repo.save(dept);
    return await repo.findTrees();
}

export async function InsertRootDepartment(name: string) {
    const repo = await getConnection("my_db").getTreeRepository(Department);
    const root = new Department();
    root.name = "Weichai Power(DE)Science & Technology Innovation Center";
    await repo.save(root);
    return await repo.findTrees();
}
export async function GetAllDepartments() {
    const repo = await getConnection("my_db").getTreeRepository(Department);

    return await repo.findTrees();
}

export async function RemoveDepartment(id: number) {
    // 移除闭包表不能用自带的remove 方法，好像跟外键的设置有关
    const repo = await getConnection("my_db").getTreeRepository(Department);
    await repo.createQueryBuilder("dept")
        .where("id=:id", { id: id }).delete().execute()

    return await repo.findTrees();
}