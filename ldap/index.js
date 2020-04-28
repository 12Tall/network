var ldap = require('ldapjs');
var client = ldap.createClient({
    url: 'ldap://192.168.243.127:389'
});
// 组织单位是ou
// 组是group?
client.bind('cn=u01,ou=hr,dc=test,dc=com', 'Test123', function (err) {
    // assert.ifError(err);
    console.log(err)
});