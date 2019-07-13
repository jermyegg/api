import * as hapi from 'Hapi';
import {environment} from '../environments/environment.dev';
//test comment

export class App {
  public server: hapi.Server;
  public io: any;

  start = async () => {
    try {
      await this.server.start();
      await this.init();
    } catch(err) {
      throw new Error(err);
      process.exit(1);
    }
  }

  constructor() {
    //first we set the environment configurations for the server
    this.server = new hapi.Server(
      environment.host,
      environment.port,
    );

    //then we initiate the server
    this.io = require('socket.io')(this.server.listener);
  }

  public init(): void {
    console.log('game api listening on port: ', this.server.info.port);
    this.startSocketIO();
  }

  public startSocketIO(): void {
    this.io.on('connection', (socket: any) => {
      socket.emid('socket_connected', {status: 'connected'});
      socket.on('sendSocketMessage', (data: any) => {
        socket.emit('angular_request', {status: 'hello'});
      })
    })
  }
}
