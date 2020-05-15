import socket
import threading

bind_ip = "0.0.0.0"
bind_port = 9991

server = socket.socket(socket.AF_INET, socket.SOCK_STREAM)

server.bind((bind_ip,bind_port))




server.connect(("www.baidu.com",80))
server.send(b"GET / HTTP/1.1\r\nHost:baidu.com\r\n\r\n")
response = server.recv(4096)
print(response)
server.listen(5)
