 


const mysql = require('mysql2/promise');



async function a(){
    var pool = await mysql.createPool({
        host: 'localhost',
        port: 3306,
        user: 'root',
        database: 'test',
        password: 'hhhh125**',
        connectionLimit: 20
    });
    var conn = await pool.getConnection();
    await conn.beginTransaction();
    const [rows, fields] = await conn.query("select ?;",[[1,'test']]);
    await conn.commit();
    conn.release();
    console.log(rows);
}

a();