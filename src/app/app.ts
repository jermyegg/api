import * as express from 'express';
import * as http from 'http';
import * as WebSocket from 'ws';

import * as environment from '../environments/environment.dev';

export class App {
  private _express: any;
  private _server: any;
  private _wss: any;

  constructor () {
    this._express = express();
    this._server = http.createServer(this._express);
    this._wss = new WebSocket.Server({server: this._server});

    this._initWebsocket();
    this._initServer();
  }

  private _initWebsocket(): void {
    this._wss.on('connection', (ws: WebSocket) => {
      ws.on('message', (message: string) => {

        //log the received message and send it back to the client
        console.log('received: %s', message);
        ws.send(`Hello, you sent -> ${message}`);
      });
    });
  }

  private _initServer(): void {
    this._server.listen(8080, () => {
      console.log('hello world');
    })
  }
}

const app: App = new App();
