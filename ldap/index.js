var ldap = require('ldapjs');
var client = ldap.createClient({
    url: 'ldap://192.168.243.127:389'
});
// 组织单位是ou
// 组是group?
client.bind('cn=u01,ou=hr,dc=test,dc=com', 'Test123', function (err) {
    // assert.ifError(err);

    client.search('dc=test,dc=com', {scope:'sub',filter:'(cn=u01)' }, (err, res) => {
        console.log(err)
        res.on('searchEntry', function (entry) {
            console.log('entry: ' + JSON.stringify(entry.object));
        });
        res.on('searchReference', function (referral) {
            console.log('referral: ' + referral.uris.join());
        });
        res.on('error', function (err) {
            console.error('error: ' + err.message);
        });
        res.on('end', function (result) {
            console.log('status: ' + result.status);
        });
    });
    console.log(err)
});