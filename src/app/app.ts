import * as express from 'express';
import * as http from 'http';
import * as WebSocket from 'ws';

import * as environment from '../environments/environment.dev';
import { RequestHandler } from './request-handler/request-handler';

export class App {
  private _express: any;
  private _server: any;
  private _wss: any;
  private _handler: RequestHandler;

  constructor () {
    this._handler = new RequestHandler();

    this._express = express();
    this._server = http.createServer(this._express);
    this._wss = new WebSocket.Server({server: this._server});

    this._initWebsocket();
    this._initServer();
  }

  private _initWebsocket(): void {
    this._wss.on('connection', (ws: WebSocket) => {
      ws.on('message', (request: string) => {

        console.dir('args from connection: ', request);
        //log the received message and send it back to the client
        const response = this._handler.handle(request);

        console.log('new game id: ', response);
        ws.send(`game-id -> ${response}`);
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
