var ldap = require('ldapjs');
var client = ldap.createClient({
    url: 'ldap://192.168.137.254:389'
});
client.bind('cn=usr1,dc=12tall,dc=com', 'nopswd?', function (err) {
    // assert.ifError(err);
    console.log(err)
});