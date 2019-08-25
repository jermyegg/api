import { Game } from '../game/game';
import { IRequestType } from './request-handler.types';

export class RequestHandler {
  private _gameInstances: Game[];

  constructor() {

  }

  /**
  * Here we handle a request, and return a string as a response
  */
  public handle(request_string: string): string {
    let request: any;
    try {
      request = JSON.parse(request_string);
      console.dir('request: ', request);
    } catch(e) {
      console.error('oops: ', e);
      return 'error parsing to json';
    }

    return request_string;
  }
}
