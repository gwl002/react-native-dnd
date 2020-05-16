import React,{Fragment} from "react";
import {View,Text,Image,Dimensions,SafeAreaView,TouchableOpacity} from "react-native";

import RenderCard from "./RenderCard";

import CardColumn from "./CardColumn";

import PlayingCard,{CardSuit,CardType,CardColor} from "./PlayingCard";

import { Draggable } from "../components/Draggable";

const Images = {
	back: require("./images/back_side.png"),
	spades: require("./images/spades.png"),
	diamonds: require("./images/diamonds.png"),
	hearts: require("./images/hearts.png"),
	clubs: require("./images/clubs.png")
}


const windowWidth = Dimensions.get('window').width;

const itemWidth = (windowWidth - 7*10 ) / 7 ;
const itemHeight = itemWidth/0.7;

const initAllCards = () => {
	let allCards = [];
	Object.values(CardSuit).forEach((suit) => {
		Object.values(CardType).forEach((type) => {
			let card = new PlayingCard(suit,type);
			allCards.push(card);
		})
	})
	return allCards;
}

const swap = (arr,from,to) => {
	let temp = arr[to];
	arr[to] = arr[from];
	arr[from] = temp
}

const shuffle = (arr) => {
	for(let i=1;i<arr.length;i++){
		let random = Math.random();
		let swapIndex = Math.floor(arr.length*random);
		swap(arr,i,swapIndex);
	}
}

export default class Game extends React.Component{
	constructor(props) {
	  super(props);
	
	  // this.state = {
	  // 	list: [],
	  // 	cardDeckClosed:[],
	  // 	cardDeckOpened:[],
	  // 	finalSpadesDeck:[],
	  // 	finalHeartsDeck:[],
	  // 	finalDiamondsDeck:[],
	  // 	finalCubesDeck:[],
	  // 	cardColumn1:[],
	  // 	cardColumn2:[],
	  // 	cardColumn3:[],
	  // 	cardColumn4:[],
	  // 	cardColumn5:[],
	  // 	cardColumn6:[],
	  // 	cardColumn7:[]
	  // };
	  this.state = this.initState();
	}

	initState(){
		let cardDeckClosed=[];
	  	let cardDeckOpened=[];
	  	let finalSpadesDeck=[];
	  	let finalHeartsDeck=[];
	  	let finalDiamondsDeck=[];
	  	let finalCubesDeck=[];
	  	let cardColumn1=[];
	  	let cardColumn2=[];
	  	let cardColumn3=[];
	  	let cardColumn4=[];
	  	let cardColumn5=[];
	  	let cardColumn6=[];
	  	let cardColumn7=[];
		let allCards = initAllCards();
		shuffle(allCards);
		for(let i=0;i<allCards.length;i++){
			let card = allCards[i];
			if(i===0){
				card.faceUp = true;
				card.opened = true;
				cardColumn1.push(card);
			}else if(i>0 && i<3){
				if(i===2){
					card.faceUp = true;
					card.opened = true;
				}
				cardColumn2.push(card);
			}else if(i>2 && i<6){
				if(i===5){
					card.faceUp = true;
					card.opened = true;
				}
				cardColumn3.push(card);
			}
			else if(i>5 && i<10){
				if(i===9){
					card.faceUp = true;
					card.opened = true;
				}
				cardColumn4.push(card);
			}else if(i>9 && i<15){
				if(i===14){
					card.faceUp = true;
					card.opened = true;
				}
				cardColumn5.push(card);
			}else if(i>14 && i<21){
				if(i===20){
					card.faceUp = true;
					card.opened = true;
				}
				cardColumn6.push(card);
			}else if(i>20 && i <28){
				if(i===27){
					card.faceUp = true;
					card.opened = true;
				}
				cardColumn7.push(card);
			}else if(i===allCards.length-1){
				//最后一张翻开放在open里
				card.faceUp = true;
				card.opened = true;
				cardDeckOpened.push(card);
			}else{
				cardDeckClosed.push(card);
			}
		}

		return {
			cardColumn1,
			cardColumn2,
			cardColumn3,
			cardColumn4,
			cardColumn5,
			cardColumn6,
			cardColumn7,
			cardDeckOpened,
			cardDeckClosed,
			finalSpadesDeck,
			finalCubesDeck,
			finalDiamondsDeck,
			finalHeartsDeck
		}
	}

	refresh(){
		let newState = this.initState();
		this.setState(newState);
	}

	changeOpenCard(){
		let { cardDeckOpened, cardDeckClosed } = this.state;
		let newCardOpened = [];
		let newCardClosed = [];
		if(cardDeckClosed.length>0){
			let oldCard = cardDeckOpened[cardDeckOpened.length-1];
			let newCard = cardDeckClosed[cardDeckClosed.length-1];
			newCard.faceUp = true;
			newCard.opened = true;
			oldCard.faceUp = false;
			oldCard.opened = false;
			newCardOpened = [newCard];
			newCardClosed = [oldCard,...cardDeckClosed.slice(0,-1)];
		}else{
			// newCardOpened = cardDeckOpened;
		}
		this.setState({
			cardDeckOpened: newCardOpened,
			cardDeckClosed: newCardClosed
		})
	}

	renderClosedDeck(){
		let {cardDeckClosed} = this.state;
		return (
			<View style={{width:itemWidth,height:itemHeight}}>
				{
					cardDeckClosed.length !== 0 ? (
						<TouchableOpacity
							onPress={this.changeOpenCard.bind(this)}
						>
							<RenderCard 
								playingCard={cardDeckClosed[cardDeckClosed.length-1]}
								itemWidth={itemWidth}
								itemHeight={itemHeight}
								index={0}
							/>
						</TouchableOpacity>
					):(
						<View style={{width:itemWidth,height:itemHeight,backgroundColor:"lightblue",opacity:0.5}} />
					)
				}
			</View>
		)
	}

	renderDeckCard(card,type){
		if(card){
			return (
				<View style={{width:itemWidth,height:itemHeight}}>
					<RenderCard playingCard={card} itemWidth={itemWidth} itemHeight={itemHeight} index={0} />
				</View>
			)
		}else{
			return (
				<View style={{justifyContent:"center",alignItems:"center",width:itemWidth,height:itemHeight,backgroundColor:"rgba(255,255,255,0.7)"}} >
					<Image source={Images[type]} style={{width:itemWidth*0.5,height:itemWidth*0.5}} />
				</View>
			)
		}
		
	}

	renderOpenedDeck(){
		let {cardDeckOpened} = this.state;
		return (
			<View style={{width:itemWidth,height:itemHeight}}>
				{
					cardDeckOpened.length !== 0 ? (
						<Draggable
							value={{columnIndex:0,cards:cardDeckOpened.slice(-1)}}
						>
							<RenderCard 
								playingCard={cardDeckOpened[cardDeckOpened.length-1]}
								itemWidth={itemWidth}
								itemHeight={itemHeight}
							/>
						</Draggable>
					):(
						<View style={{width:itemWidth,height:itemHeight,backgroundColor:"lightblue",opacity:0.8}} />
					)
				}
			</View>
		)
	}

	renderFinalDecks(){
		const { finalHeartsDeck,finalSpadesDeck,finalDiamondsDeck,finalCubesDeck } = this.state;
		const spadesCard = finalSpadesDeck.length>0?finalSpadesDeck[finalSpadesDeck.length-1]:null;
		const heartsCard = finalHeartsDeck.length>0?finalHeartsDeck[finalHeartsDeck.length-1]:null;
		const diamondsCard = finalDiamondsDeck.length>0?finalDiamondsDeck[finalDiamondsDeck.length-1]:null;
		const cubesCard = finalCubesDeck.length>0?finalCubesDeck[finalCubesDeck.length-1]:null;
		return (
			<Fragment>
				{this.renderDeckCard(spadesCard,"spades")}
				{this.renderDeckCard(heartsCard,"hearts")}
				{this.renderDeckCard(diamondsCard,"diamonds")}
				{this.renderDeckCard(cubesCard,"clubs")}
			</Fragment>
		)
	}

	columnAccept(toIndex,fromIndex,cards){
		let fromColumn = this.state["cardColumn"+fromIndex];
		let toColumn = this.state["cardColumn"+toIndex];
		fromColumn =  fromColumn.slice(0,fromColumn.length-cards.length);
		if(fromColumn.length>0){
			let lastFromCard = fromColumn[fromColumn.length-1];
			lastFromCard.faceUp = true;
			lastFromCard.opened = true;
		}
		toColumn = [...toColumn,...cards];
		this.setState({
			["cardColumn"+fromIndex]:fromColumn,
			["cardColumn"+toIndex]:toColumn
		})
	}

	handleOpenDeckChange(toIndex,cards){
		let toColumn = this.state["cardColumn"+toIndex];
		toColumn = [...toColumn,...cards];
		let cardDeckOpened = this.state.cardDeckOpened;
		let cardDeckClosed = this.state.cardDeckClosed;
		let newCardClosed = [];
		let newCardOpended = [];
		if(cardDeckClosed.length > 0 ){
			let newCard = cardDeckClosed[cardDeckClosed.length-1];
			newCardClosed = cardDeckClosed.slice(0,-1);
			newCardOpended = cardDeckOpened.slice(0,-1);
			newCardOpended.push(newCard);
			newCard.opened = true;
			newCard.faceUp = true;
		}else{
			newCardOpended = cardDeckOpened.slice(0,-1);
		}
		this.setState({
			["cardColumn"+toIndex]:toColumn,
			cardDeckClosed: newCardClosed,
			cardDeckOpened: newCardOpended
		})
	}

	handleCardsAdded(toIndex,value){
		let { cards,columnIndex:fromIndex} = value;
		if(fromIndex !== 0){
			this.columnAccept(toIndex,fromIndex,cards);
		}else{
			this.handleOpenDeckChange(toIndex,cards);
		}
		
	}

	render(){
		return (
			<SafeAreaView style={{flex:1,backgroundColor:"lightgreen"}}>
				<View style={{marginBottom:20}}>
					<Text style={{fontSize:20,lineHeight:20,textAlign:"center",color:"white",fontWeight:"bold"}}>React Native Solitaire</Text>
					<TouchableOpacity onPress={this.refresh.bind(this)} style={{position:"absolute",right:20}}>
						<Image source={require("./images/refresh.png")} style={{width:20,height:20}} />
					</TouchableOpacity>
				</View>
				<View style={{flexDirection:"row",justifyContent:"space-between"}}>
					{this.renderClosedDeck()}
					{this.renderOpenedDeck()}
					<View style={{width:itemWidth,height:itemHeight}}/>
					{this.renderFinalDecks()}
				</View>
				<View style={{flex:1,flexDirection:"row",justifyContent:"space-between",marginTop:50}}>
					<CardColumn list={this.state.cardColumn1} columnIndex={1} onCardsAdded={this.handleCardsAdded.bind(this,1)} />
					<CardColumn list={this.state.cardColumn2} columnIndex={2} onCardsAdded={this.handleCardsAdded.bind(this,2)} />
					<CardColumn list={this.state.cardColumn3} columnIndex={3} onCardsAdded={this.handleCardsAdded.bind(this,3)} />
					<CardColumn list={this.state.cardColumn4} columnIndex={4} onCardsAdded={this.handleCardsAdded.bind(this,4)} />
					<CardColumn list={this.state.cardColumn5} columnIndex={5} onCardsAdded={this.handleCardsAdded.bind(this,5)} />
					<CardColumn list={this.state.cardColumn6} columnIndex={6} onCardsAdded={this.handleCardsAdded.bind(this,6)} />
					<CardColumn list={this.state.cardColumn7} columnIndex={7} onCardsAdded={this.handleCardsAdded.bind(this,7)} />
				</View>
			</SafeAreaView>
		)
	}
}