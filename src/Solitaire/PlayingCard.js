
export const CardSuit = {
	spades:"spades",
	hearts:"hearts",
	diamonds:"diamonds",
	clubs:"clubs"
}	


export const CardType = {
	one:1,
	two:2,
	three:3,
	four:4,
	five:5,
	six:6,
	seven:7,
	eight:8,
	nine:9,
	ten:10,
	jack:"J",
	queen:"Q",
	king:"K"
}

export const CardColor = {
	red:"red",
	black:"black"
}


export default class PlayingCard{
	constructor(cardSuit,cardType,faceUp=false,opened=false) {	
		this.cardSuit = cardSuit;
		this.cardType = cardType;
		this.faceUp = faceUp;
		this.opened = opened;
	}

	get cardColor(){
		return (this.cardSuit === "hearts" || this.cardSuit === "diamonds")?CardColor.red:CardColor.black
	}

	get cardNum(){
		let number;
		switch(this.cardType){
			case CardType.one:
				number = 1;
				break;
			case CardType.two:
				number = 2;
				break;
			case CardType.three:
				number = 3;
				break;
			case CardType.four:
				number = 4;
				break;
			case CardType.five:
				number = 5;
				break;
			case CardType.six:
				number = 6;
				break;
			case CardType.seven:
				number = 7;
				break;
			case CardType.eight:
				number = 8;
				break;
			case CardType.nine:
				number = 9;
				break;
			case CardType.ten:
				number = 10;
				break;
			case CardType.jack:
				number = 11;
				break;
			case CardType.queen:
				number = 12;
				break;
			case CardType.king:
				number = 13;
				break;
		}
		return number
	}
}