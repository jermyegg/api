#!/usr/bin/env python2

import json
import thread
import time
import websocket
import sys

game = {
    'gameId': 'hello',
    'currentQuestion': 'What is the answer to the ultimate question?',
    'players': [
        {
            'playerId': 'me',
            'hand': [
                {
                    'title': '42',
                },
            ],
            'answer': 'none',
        },
    ],
}

print 'starting connection'

ws = websocket.WebSocket()
def connect_to_server():
    print '\tshould connect'
    try:
        ws.connect("ws://localhost:8080")
        print 'connection successful'
    except:
        print 'connection unsuccessful'
        sys.exit()

def test_connection():
    print '\tshould send a response when called'
    ws.send('hello')
    if (ws.recv()):
        print 'server responsive'
    else:
        print 'server does not respond'
        sys.exit()

def test_handler():
    print '\tshould return a valid json object'
    j = json.dumps(game)
    print j
    ws.send(j)
    try:
        json.loads(ws.recv())
        print 'handler parse successful'
    except:
        print 'handler not working'
        sys.exit()

connect_to_server()
test_connection() # Causes server error
test_handler()
print 'done'
