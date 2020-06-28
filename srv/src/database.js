import mysql from 'mysql2/promise'
import db from "./config/db"
import  './test/db'

const my_db = mysql.createPool(db.my_db)

export default my_db;