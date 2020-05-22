import socket
import select
import threading


src_port = ('0.0.0.0', 9999)
target_port = ('localhost', 3389)
BUFFER_SIZE = 8*1024


def main():
    # cli for public API
    cli = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    cli.setsockopt(socket.SOL_SOCKET, socket.SO_REUSEADDR, 1)
    cli.bind(src_port)

    # main srv
    server = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    server.setsockopt(socket.SOL_SOCKET, socket.SO_REUSEADDR, 1)
    server.bind(src_port)
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
        th_in.join()
        th_out.join()


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
