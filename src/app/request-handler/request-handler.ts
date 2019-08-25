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
    let request: IRequestType;
    try {
      request = JSON.parse(request_string);
      console.dir('request: ', request);
    } catch(e) {
      console.error('oops: ', e);
      return 'error parsing to json';
    }
    if (request.gameId) {
      // game exists, search it and do the rest
    } else {
      // game doesn't exist. create one
    }

    return request_string;
  }
}
