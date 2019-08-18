export class Game {
  private _players: string[];

  constructor(
    private _gameId: string,
  ) {}

  /**
  * Expects a new user. If it doesn't work, it returns false. Otherwise, true
  * TODO: Find a better way to display errors using interfaces
  */
  public addNewUser(userName: string): boolean {
    if (this._players.indexOf(userName) > -1) {
      return false;
    } else {
      this._players.push(userName);
      return true;
    }
  }
}
