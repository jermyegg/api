export interface ICard {
  title: string;
}

export interface IAnswerCard extends ICard {

}

export interface IQuestionCard extends ICard {

}

export interface IPlayer {
  playerId: string | null;
  hand: IAnswerCard[];
  answer: IAnswerCard;
}
export interface IRequestType {
  gameId: string | null;
  players: IPlayer[];
  currentQuestion: IQuestionCard;
}
