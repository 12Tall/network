# coding=utf-8

import subprocess
import re

def get_local():
    sub_proc = subprocess.Popen("ifconfig",stdout=subprocess.PIPE)
    output = (sub_proc.stdout.read())
    ipv6_pattern='(([a-f0-9]{1,4}:){7}[a-f0-9]{1,4})'
    m = re.search(ipv6_pattern,str(output))
    if m is not None:
        return m.group()
    else:
        return None

print(get_local())