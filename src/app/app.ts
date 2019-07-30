/* Dependencies */
import * as hapi from 'hapi';
import * as socketIo from 'socket.io';

/* Local */
import * as environment from '../environments/environment.dev';

export class App {

  private _server: hapi.Server;
  private _io: any;

  constructor () {
    this._init();
  }

  private _init(): void {
    this._server = new hapi.Server({
      host: environment.routing.host,
      port: environment.routing.port,
    });
    this._start().then((v: any) => {
        this._startSocketIo();
        this._createRoutes();
      }
    );
  }

  private _createRoutes(): void {
    // add the route
    // this._server.route({
    //   method: 'GET',
    //   path: '/hello',
    //   handler: function (request, h) {
    //     return 'hello world';
    //   },
    // });

    this._io.on('connect', () => {
      console.log('connected');
    });

    this._io.on('message', (data) => {
      console.dir('message received: ', data);
    })

    this._io.on('disconnect', () => {
      console.log('disconnected');
    })
  }

  // start the server
  private async _start(): Promise<any> {
    try {
      await this._server.start()
    } catch (err) {
      console.log(err);
      process.exit(1);
    }
    console.log('Server running at:', this._server.info.uri);
  }

  private _startSocketIo(): void {
    this._io = socketIo(this._server.listener);
  }
}

const app: App = new App();
