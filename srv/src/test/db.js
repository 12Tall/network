import my_db from '../database';

async function test(){
    const [rows, fields] = await my_db.execute("select * from user");
    console.log(rows)
}

export default test;