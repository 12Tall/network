# LDAP 学习  

## 概览  

`ldapjs` 是纯JS 实现的，基于Node 的LDAP 客户端与服务端。适用于与http 交互与验证的开发人员？ 

```js  
// exp01.js
var ldap = require('ldapjs');
var server = ldap.createServer();
server.search('o=example', (req, res, next) => {
    var obj = {
        dn: req.dn.toString(),
        attributes: {
            objectclass: ['organization', 'top'],
            o: 'example'
        }
    };
    if (req.filter.matches(obj.attributes)) {
        res.send(obj);
    }
    res.end();
})

server.listen(1389, () => {
    console.log(`LDAP server listening at ${server.url}`);
});

/*
安装openldap2-client 并运行  
ldapsearch -H ldap://localhost:1389 -x -b o=example objectclass=*

# extended LDIF
#
# LDAPv3
# base <o=example> with scope subtree
# filter: objectclass=*
# requesting: ALL
#

# example
dn: o=example
objectclass: organization
objectclass: top
o: example

# search result
search: 2
result: 0 Success

# numResponses: 2
# numEntries: 1
*/
```  

### 特性  

ldapjs 实现了`LDAP v3 RFC(s)` 中的大多数常规操作，包括客户端与服务端。与LDAP 协议100% 兼容，并兼容其他LDAPv3 的实现。ldapjs 提供了强大的路由与拦截过滤器模式来实现服务器。可以基于自定义需求来构建LDAP 服务，而不仅仅是传统数据库。  

### 开始  

```bash
npm install ldapjs
```  

[新手指导](guide.md)，或者直接阅读API 文档  

章节|内容  
---|---  
[Sever API]()|实现LDAP 服务器的参考  
[Client API]()|实现LDAP 客户端的参考  
[DN API]()|DN 类的API 参考  
[Filter API]()|过滤器参考  
[Error API]()|异常列表  
[Examples]()|示例  

### 更多信息  

  - 许可：MIT  
  - 代码：[mcavage/node-ldapjs](https://github.com/mcavage/node-ldapjs)   
  - 版本要求： node >= 0.8  
  - 推特：[@pfmooney](http://twitter.com/pfmooney)  

### 未实现功能  

翻译不来了  

- LDIF
- Aliases
- Attributes by OID
- Extensible matching