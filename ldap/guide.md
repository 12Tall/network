# 新手指南  

本文专为小白编写，因为大部分人对LDAP 的印象都停留在“一个可以保存密码的东东”，大神请左转。  
本文最后，我们会实现一个“真正的”简易LDAP 服务器。  

## 什么是LDAP  

在此之前，最好百度一哈。LDAP 是“轻量目录访问协议”(Lightweight Directory Access Protocol) 的简称。目录服务基本上可以分解为以下部分：  

- 实体的目录树：类似却不同于文件系统  
- 树上的每个实体都有独有的名字  
- 每个实体都是一组属性的集合  
- 每个属性都是一个键值对  

可视化能帮助我们理解：  

```txt
              o=example
              /       \
         ou=users     ou=groups
        /      |         |     \
    cn=john  cn=jane    cn=dudes  cn=dudettes
    /
keyid=foo
```  

如果我们想要查找记录`cn=john`：

```txt
dn: cn=john, ou=users, o=example
cn: john
sn: smith
email: john@example.com
email: john.smith@example.com
objectClass: person
```

注：  
- 目录树中的所有名称都是专有名称，简称DN(distinguished name)。dn 由指向该节点的属性组成，如上图的(foo=bar)  
- 树的根节点再dn 的最右方，与文件路径刚好相反  
- 每个实体都是一个对象类型的实例  
- 对象类型是一个模式概念，可以理解为传统的ORM 表  
- 对象类型定义了每个实体具有什么样的属性，属性就像数据库中的列  

因此，LDAP 是与目录树交互的协议，并且全面的规定了一般的操作：增删改查。LDAP 中的搜索比http 中的querystring 强大、却比sql 简单。所以也可以将LDAP 视为一种NoSQL 或文档存储语法。  

至于LDAP 为什么没有流行起来，是有历史包袱的，所以并不是那么轻量级。  

## ldapjs 的不同  

- ldapjs 不与LDAP 完全兼容  
- 对于目录系统需要什么没有强制性要求  
- 就是更灵活、可扩展性更强呗  
- 好像就是一个中间层、具体的后端实现可以由程序员自己决定  

## 安装  

参见[exp01](./exp/exp01.js)，但是如果查询结果为空的话：  
```bash
# extended LDIF
#
# LDAPv3
# base <o=example> with scope subtree
# filter: objectclass=123
# requesting: ALL
#

# search result
search: 2
result: 0 Success

# numResponses: 1
```  

## 绑定  

- 与http 不同，LDAP 是面向连接的，所以要进行身份验证  
- 并且所有后续操作都会按身份验证时建立的特权级进行操作  
- 可以在单个连接上更改身份  
- 支持匿名操作（不推荐）  


## 查询  

- 查询的过滤器是search  
- `server.search('o=myhost', pre, function(req, res, next)` 其中`var pre = [authorize, loadPasswdFile];` 是绑定和其他预处理的函数数组  

## 新增  

- 新增需要额外的进程：`var spawn = require('child_process').spawn;`  




