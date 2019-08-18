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
      ws.on('message', (args?: any) => {

        console.dir('args from connection: ', args);
        //log the received message and send it back to the client
        const id: string = Math.random().toString(36).substring(7);
        console.log('new game id: ', id);
        ws.send(`game-id -> ${id}`);
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
