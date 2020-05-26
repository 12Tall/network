import socket
import threading

bind_info = ('0.0.0.0', 8341)


def main():
    server = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    server.bind(bind_info)

    server.listen(5)

    print("[*] Listening on %s:%d" % bind_info)

    while True:
        client, addr = server.accept()
        print("[*] Accepted connection from %s:%d" % addr)
        client.setsockopt(socket.SOL_SOCKET, socket.SO_KEEPALIVE, True)
        client.ioctl(socket.SIO_KEEPALIVE_VALS, (1, 25*1000, 5*1000))
        client.setblocking(False)
        handler = threading.Thread(target=client_handler, args=(client, addr))
        handler.start()

    return 0


def client_handler(client, addr):
    while True:
        try:
            response = client.recv(4096)
            if response != "":
                print(response)
            else:
                print('???')
                break
            client.sendall(("%s:%d" % addr).encode('utf-8'))
        except:
            pass
        # sleep less than 5s
    client.close()


if __name__ == '__main__':
    main()
