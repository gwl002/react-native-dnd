import React,{Fragment} from "react";
import {View,Text,Image,Dimensions,SafeAreaView,TouchableOpacity} from "react-native";

import RenderCard from "./RenderCard";

import CardColumn from "./CardColumn";

import PlayingCard,{CardSuit,CardType,CardColor} from "./PlayingCard";

import { Draggable } from "../components/Draggable";

import FinalCardDeck from "./finalCardDeck";

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
	  this.getListFromIndex = this.getListFromIndex.bind(this);
	}

	initState(){
		let cardDeckClosed=[];          //index  -1
	  	let cardDeckOpened=[];			//index  0
	  	let finalSpadesDeck=[];			//index  8
	  	let finalHeartsDeck=[];         //index  9
	  	let finalDiamondsDeck=[];       //index  10
	  	let finalCubesDeck=[];          //index  11
	  	let cardColumn1=[];             //index  1
	  	let cardColumn2=[];             //index  2
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
			let newCard = cardDeckClosed[cardDeckClosed.length-1];
			newCard.faceUp = true;
			newCard.opened = true;
			newCardOpened = [...cardDeckOpened,newCard];
			newCardClosed = cardDeckClosed.slice(0,-1);
		}else{
			newCardClosed = cardDeckOpened.map(card => {
				card.opened = false;
				card.faceUp = false;
				return card;
			})
			newCardOpened = []
		}
		this.setState({
			cardDeckOpened: newCardOpened,
			cardDeckClosed: newCardClosed
		})
	}

	renderClosedDeck(){
		let {cardDeckClosed} = this.state;
		return (
			<TouchableOpacity
				onPress={this.changeOpenCard.bind(this)}
			>
				<View style={{width:itemWidth,height:itemHeight}}>
					{
						cardDeckClosed.length !== 0 ? (
							<RenderCard 
								playingCard={cardDeckClosed[cardDeckClosed.length-1]}
								itemWidth={itemWidth}
								itemHeight={itemHeight}
								index={0}
							/>
						):(
							<View style={{width:itemWidth,height:itemHeight,backgroundColor:"lightblue",opacity:0.5}} />
						)
					}
				</View>
			</TouchableOpacity>
		)
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
				<FinalCardDeck 
					list={finalSpadesDeck} 
					onCardsAdded={
						this.handleCardsAdded.bind(this,8)
					} 
					cardSuit={CardSuit.spades}
				/>
				<FinalCardDeck 
					list={finalHeartsDeck} 
					onCardsAdded={
						this.handleCardsAdded.bind(this,9)
					} 
					cardSuit={CardSuit.hearts} 
				/>
				<FinalCardDeck 
					list={finalCubesDeck} 
					onCardsAdded={
						this.handleCardsAdded.bind(this,10)
					} 
					cardSuit={CardSuit.clubs} 
				/>
				<FinalCardDeck 
					list={finalDiamondsDeck} 
					onCardsAdded={
						this.handleCardsAdded.bind(this,11)
					} 
					cardSuit={CardSuit.diamonds} 
				/>
			</Fragment>
		)
	}

	handleCardsAdded(toIndex,value){
		let { cards,columnIndex:fromIndex} = value;
		let {key:toKey,list:toList} = this.getListFromIndex(toIndex);
		let {key:fromKey,list:fromList} = this.getListFromIndex(fromIndex);
		fromList = fromList.slice(0,fromList.length-cards.length);
		this.setState({
			[toKey]: [...toList,...cards],
			[fromKey]: fromList
		},()=>{
			this.refreshList(fromIndex);
		})
	}

	getListFromIndex(index){
		let result = {};
		switch(index){
			case 0:
				result = {
					list: this.state.cardDeckOpened,
					key: "cardDeckOpened"
				}
				break;
			case 1:
				result = {
					list: this.state.cardColumn1,
					key: "cardColumn1"
				}
				break;
			case 2:
				result = {
					list: this.state.cardColumn2,
					key: "cardColumn2"
				}
				break;
			case 3:
				result = {
					list: this.state.cardColumn3,
					key: "cardColumn3"
				}
				break;
			case 4:
				result = {
					list: this.state.cardColumn4,
					key: "cardColumn4"
				}
				break;
			case 5:
				result = {
					list: this.state.cardColumn5,
					key: "cardColumn5"
				}
				break;
			case 6:
				result = {
					list: this.state.cardColumn6,
					key: "cardColumn6"
				}
				break;
			case 7:
				result = {
					list: this.state.cardColumn7,
					key: "cardColumn7"
				}
				break;
			case 8:
				result = {
					list: this.state.finalSpadesDeck,
					key: "finalSpadesDeck"
				}
				break;
			case 9:
				result = {
					list: this.state.finalHeartsDeck,
					key: "finalHeartsDeck"
				}
				break;
			case 10:
				result = {
					list: this.state.finalCubesDeck,
					key: "finalCubesDeck"
				}
				break;
			case 11:
				result = {
					list: this.state.finalDiamondsDeck,
					key: "finalDiamondsDeck"
				}
				break;
			default:
				break;
		}
		return result;
	}

	refreshList(index){
		let {key,list} = this.getListFromIndex(index);
		if(index>0 && index <8){
			if(list.length > 0){
				let lastCard = list[list.length-1];
				lastCard.faceUp = true;
				lastCard.opened = true;
			}
			this.setState({});
		}else if(index === 0){
			//如果 openList为空
			if(list.length ===0){
				if(this.state.cardDeckClosed.length >0){
					let closedList = this.state.cardDeckClosed;
					let newCard = closedList[closedList.length-1];
					newCard.faceUp = true;
					newCard.opened = true;
					this.setState({
						cardDeckOpened:[newCard],
						cardDeckClosed:closedList.slice(0,-1)
					})
				}
			}else{
				let lastCard = list[list.length-1];
				lastCard.faceUp = true;
				lastCard.opened = true;
				this.setState({});
			}
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