import socket
import select
import threading
import time


src_port = ('0.0.0.0', 9999)
target_port = ('localhost', 3389)
BUFFER_SIZE = 8*1024


def main():
    # # cli for public API
    cli = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    server = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    cli.setsockopt(socket.SOL_SOCKET, socket.SO_REUSEADDR, 1)
    server.setsockopt(socket.SOL_SOCKET, socket.SO_REUSEADDR, 1)
    cli.bind(src_port)
    server.bind(src_port)
    cli.connect(('192.168.243.127', 8341))
    th_cli = CliThread(cli)
    th_cli.start()

    # main srv
    server.listen(5)

    print('app running...')

    while True:
        cli_in, addr = server.accept()
        cli_out = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
        cli_out.connect(target_port)
        th_in = TransThread(cli_in, cli_out)
        th_out = TransThread(cli_out, cli_in)
        th_in.start()
        th_out.start()

        # waiting for thread exist
        th_in.join()
        th_out.join()
        th_cli.join()


class CliThread(threading.Thread):
    def __init__(self, cli):
        threading.Thread.__init__(self)
        self.cli = cli

    def run(self):
        while True:
            self.cli.send("ip".encode('utf-8'))
            response = self.cli.recv(4096)
            if response != "":
                print(response)
            else:
                # error, maybe remote closed the connection
                print('???')
            time.sleep(30)
        self.cli.close()


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
