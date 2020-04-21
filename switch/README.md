# 交换机配置  

摘自 *[Cisco PT模拟实验系列](https://blog.51cto.com/microdq/category1.html)*  

## 命令行模式  

- 用户模式：`Switch>`  
- 特权模式：`Switch#`  
- 全局配置：`Switch(config)`  
- 端口配置：`Switch(gonfig-if)`  

## 常用命令  

- 进入特权模式：`'en' / 'enable'`  
- 进入全局配置：`'conf t' / 'configure terminal'`  
- **设置密码**：`'enable password cisco1' / 'enable secret cisco2'` 同时设置只有后者生效  
- 进入端口配置：`'int f0/1' / 'interface fastEthernet 0/1'` 也可以用来设置vlan  
- 设置IP：  
  - 默认网关：`ip default-gateway 192.168.1.254` 为了便于跨网段访问交换机  

    ```bash  
    # 在vlan1 下就可以跨网段管理交换机
    # 参考：https://blog.51cto.com/jh391546079/981845  
    conf t
    int vlan 1 
    ip add 192.168.0.101 255.255.255.0
    no sh
    exit
    ip default-gateway 192.168.0.254
    ```

  - 域名：`ip domain-name cisco.com`  
  - 域名服务器：`ip name-server 200.0.0.1`  

    ```bash  
    ip name-server # 添加一个DNS 服务器地址，这个可以在vlan 中设置
    ip domain-name # 给路由器设置一个域名，类似于将交换机加入一个域
    ```

  - 禁止域名解析：`no ip domain-lookup` 禁止错误的解析，否则会等好久  

- 接口速率协商：`'int f0/24'`  
  - 速率：`speed 100`  
  - 双工：`duplex full`  
- 进入线路配置模式：`line`  
  - 串口：`line console 0`  
  - vty：`line vty [0~15]`  
  - 设置密码：`password cisco`  
  - 启用密码登录：`login`  
  - 全局密码加密：`service password-encryption`  

- 显示运行配置：`show r` 显示配置的密码  
- 进入vty 线路：`line vty 0 [4]`  
  - 设置登录密码：`password ...`  
  - 设置权限级别：`privilege level 15`  
  - 似乎是：***只要输入相对应的密码，就可以直接进入相应的特权级控制台***  
- 显示正在使用中的控制台和所有连接中的vty 线路：`show users`  
- 显示vlan 信息：`show vlan brief`  
- vtp 配置：`vlan database`  
  - 设置为服务器/客户端：`'vtp server' / 'vtp client'`  
  - 设置域名：`vtp domain ...`  
  - 显示vtp 型芯：`show vtp status`  
  - [VTP 域](https://www.cnblogs.com/cker/p/9626859.html)：缺省方式下，所有Cisco Catalyst交换机都被配置为 VTP 服务器。


## CMD 命令  

```bash
ping 192.168.1.1  
telnet 192.168.1.1
```