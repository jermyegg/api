#!/usr/bin/env python2

import websocket
import thread
import time

print 'starting connection'

ws = websocket.WebSocket()
ws.connect("ws://localhost:8080")

ws.send('new-game');
print ws.recv();

print 'done'
