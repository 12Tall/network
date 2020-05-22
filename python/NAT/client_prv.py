import socket
import select

from time import sleep


binf_info = ('0.0.0.0', 9999)
# cli for public API
cli = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
cli.setsockopt(socket.SOL_SOCKET, socket.SO_REUSEADDR, 1)

# main srv
server = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
server.setsockopt(socket.SOL_SOCKET, socket.SO_REUSEADDR, 1)
cli.bind(binf_info)
server.bind(binf_info)
server.listen(5)
print('app running...')


inputs = [server, cli]
outputs = []

# single connection
cli_in = None
cli_out = None
BUFFER_SIZE = 8*1024
while True:
    r, w, e = select.select(inputs, outputs, inputs)
    print('recv sth. ...')

    for s in r:
        if s is server:
            # create new conn for incoming
            if cli_in is not None:
                inputs.remove(cli_in)
                cli_in.close()
            print('new connection')
            cli_in, addr_in = s.accept()
            cli_in.setblocking(False)
            inputs.append(cli_in)

            # create a new cli for localhost:3389
            if cli_out is not None:
                inputs.remove(cli_out)
                cli_out.close()
            cli_out = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
            cli_out.connect(('localhost', 3389))
            cli_out.setblocking(False)
            inputs.append(cli_out)
            print('3389 connected...')

        elif s is cli_out:
            print('3389 --> cli')
            try:
                data = s.recv(BUFFER_SIZE)
                cli_in.send(data)
            except:
                print('A non-blocking 3389 --> cli')
                pass
        elif s is cli:
            try:
                data = s.recv(BUFFER_SIZE)
                print('get IP:%s', data)
            except:
                print('A non-blocking get IP')
                pass
        elif s is cli_in:
            # only cli_in is float
            print('cli --> 3389')
            try:
                data = s.recv(BUFFER_SIZE)
                while data != '':
                    # should be here!!!!!!!!!!!
                    print(len(data))
                    cli_out.send(data)
                    data = s.recv(BUFFER_SIZE)

            except:
                print('error when cli_in recv')
                pass
        else:
            print(s)

cli.close()
cli_in.close()
cli_out.close()
server.close()
