# -*- coding: utf-8 -*-
import socket
import threading
import time

remote = ('192.168.243.1', 8341)
src = ('0.0.0.0', 9999)
dst = ('localhost', 3389)
BUFFER_SIZE = 4*1024


def main():
    # 1. （P2P 的成功率并不高）应该是运营商做了限制，NAT 穿透时入栈流量不能发现端口
    remote_cli = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    remote_cli.setsockopt(socket.SOL_SOCKET, socket.SO_REUSEADDR, 1)

    srv = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    srv.setsockopt(socket.SOL_SOCKET, socket.SO_REUSEADDR, 1)
    remote_cli.bind(src)
    srv.bind(src)
    #
    remote_cli.connect(remote)
    remote_cli.sendall('query ip of client'.encode('utf-8'))

    data = remote_cli.recv(BUFFER_SIZE)
    if data != "":
        print("remote port is %s" % data)
    data = data.decode('utf-8').split(':')
    target = (data[0], int(data[1]))
    print('ip info in public:%s:%d' % target)
    remote_cli.close()

    srv.listen(5)
    # 2. 还差心跳包的维持
    beat_cli = BeatThread_Cli(target)
    beat_cli.start()
    while True:
        conn_cli, addr = srv.accept()
        print(addr)
        data = conn_cli.recv(BUFFER_SIZE)
        print(data)
        if data == "PingPong".encode('utf-8'):
            conn_cli.send('PongPing'.encode('utf-8'))
            # 心跳
            beat_srv = BeatThread_Srv(conn_cli)
            beat_srv.start()
            pass
        else:
            cli_out = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
            cli_out.connect(dst)
            # 将流量转发出去先
            cli_out.send(data)
            th_in = TransThread(conn_cli, cli_out)
            th_out = TransThread(cli_out, conn_cli)
            th_in.start()
            th_out.start()
            pass

    pass


class BeatThread_Cli(threading.Thread):
    def __init__(self, target):
        threading.Thread.__init__(self)
        self.target = target

    def run(self):
        print('beat cli running')
        time.sleep(1)
        conn = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
        conn.setsockopt(socket.SOL_SOCKET, socket.SO_KEEPALIVE, True)
        conn.ioctl(socket.SIO_KEEPALIVE_VALS, (1, 25*1000, 5*1000))
        conn.connect(self.target)
        while True:
            conn.send("PingPong".encode('utf-8'))
            data = conn.recv(BUFFER_SIZE)
            print(data)
            time.sleep(5)


class BeatThread_Srv(threading.Thread):
    def __init__(self, conn):
        threading.Thread.__init__(self)
        self.conn = conn

    def run(self):
        print('beat srv running')
        while True:
            data = self.conn.recv(BUFFER_SIZE)
            print(data)
            self.conn.send("PingPong".encode('utf-8'))
            time.sleep(5)


class TransThread(threading.Thread):
    def __init__(self, cli_in, cli_out):
        threading.Thread.__init__(self)
        self.cli_in = cli_in
        self.cli_out = cli_out

    def run(self):
        # blocking socket would slow the start speed down
        while True:
            data = ''
            try:
                data = self.cli_in.recv(BUFFER_SIZE)
            except:
                self.cli_in.close()
            if data != '':
                try:
                    self.cli_out.send(data)
                except:
                    self.cli_out.close()
            else:
                break


if __name__ == "__main__":
    main()
