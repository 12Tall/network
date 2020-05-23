import socket
import time
import datetime

server = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
server.connect(("5.199.243.66", 8341))
server.setblocking(False)
while True:
    server.send("ip".encode('utf-8'))
    try:
        response = server.recv(4096)
        if response != "":
            print(datetime.datetime.now(),response)
        else:
            print('???')
    except:
        pass
    # sleep less than 5s
    time.sleep(5)
server.close()
