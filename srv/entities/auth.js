async function verify() {
    // 用户验证
    // 返回用户信息
    return { "uid": 2222, "first_name": "f_1", "last_name": "l_1", "mail_addr": "f_1@test.com", "reg_from": "local", "accnt_state": "expired" }
}

module.exports={verify}