# coding=utf-8

import socket

addr_port = ('0.0.0.0',9999)

srv1 = socket.socket(socket.AF_INET,socket.SOCK_STREAM)
srv2 = socket.socket(socket.AF_INET,socket.SOCK_STREAM)

srv1.setsockopt(socket.SOL_SOCKET,socket.SO_REUSEADDR,1)
srv2.setsockopt(socket.SOL_SOCKET,socket.SO_REUSEADDR,1)

srv1.bind(addr_port)
# 所有套接字都能发送消息，但只有绑定的最后一个套接字能收到消息
srv2.bind(addr_port)

srv1.connect(('www.baidu.com',80))
srv1.send(b"GET / HTTP/1.1\r\nHost:baidu.com\r\n\r\n")
response = srv1.recv(4096)
print(response)
print('\n')
srv2.listen(5)

while True:
    cli,addr = srv2.accept()
    print('srv2 %s,%s',addr[0],addr[1])

srv1.close()
srv2.close()