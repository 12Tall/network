import socket
import time
import datetime

server = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
server.connect(("192.168.243.129", 8341))
server.setsockopt(socket.SOL_SOCKET, socket.SO_KEEPALIVE, True)
server.ioctl(socket.SIO_KEEPALIVE_VALS, (1, 25*1000, 5*1000))
server.setblocking(False)
while True:
    server.sendall("ip".encode('utf-8'))
    try:
        response = server.recv(4096)
        if response != "":
            print(datetime.datetime.now(), response)
        else:
            print('???')
    except:
        pass
    # sleep less than 5s
    time.sleep(60)
server.close()

# 09 32 54
