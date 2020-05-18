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

        handler = threading.Thread(target=client_handler, args=(client, addr))
        handler.start()

    return 0


def client_handler(client, addr):
    req = client.recv(1024)
    client.send(bytes('%s:%d' % addr, encoding='utf-8'))
    client.close()


if __name__ == '__main__':
    main()
