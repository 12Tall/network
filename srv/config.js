module.exports = {
    ip_array:['localhost','192.168.142.1'],

    my_pool:{
        host:'localhost',
        port:3306,
        user:'usr',
        password:'password',
        database:'test',
        waitForConnections:true,
        connectionLimit:10,
        queueLimit:0
    }
}