import React from "react";
import { View, Text, Image, StyleSheet, Dimensions } from "react-native"; 
import PropTypes from 'prop-types';
import PlayingCard,{CardSuit,CardType,CardColor} from "./PlayingCard";
import RenderCard from "./RenderCard";

import { Droppable } from "../components/Draggable";

const windowWidth = Dimensions.get('window').width;

const itemWidth = (windowWidth - 7*10 ) / 7 ;
const itemHeight = itemWidth/0.7;

const Images = {
	back: require("./images/back_side.png"),
	spades: require("./images/spades.png"),
	diamonds: require("./images/diamonds.png"),
	hearts: require("./images/hearts.png"),
	clubs: require("./images/clubs.png")
}

export default class FinalCardDeck extends React.Component{
	static propTypes = {
		list: PropTypes.arrayOf(PropTypes.instanceOf(PlayingCard)),
		onCardsAdded: PropTypes.func,
		cardSuit: PropTypes.string
	}

	constructor(props) {
	  super(props);
	  this.state = {

	  };
	}

	onWillAccept(value){
		let { list, cardSuit } = this.props;
		let { cards,columnIndex } = value;
		if(cards.length>1){
			return false;
		}
		let card = cards[0];
		if(card.cardSuit === cardSuit){
			if(list.length === 0 && card.cardType === CardType.one){
				return true;
			}
			if(list.length>0){
				let lastCard = list[list.length-1];
				if(lastCard.cardType === card.cardType - 1){
					return true
				}
			}
		}
		return false;
	}

	renderDeckCard(){
		let { cardSuit, list } = this.props;
		if(list.length>0){
			let card = list[list.length-1];
			return (
				<View style={{width:itemWidth,height:itemHeight}}>
					<RenderCard playingCard={card} itemWidth={itemWidth} itemHeight={itemHeight} index={0} />
				</View>
			)
		}else{
			return (
				<View style={{justifyContent:"center",alignItems:"center",width:itemWidth,height:itemHeight,backgroundColor:"rgba(255,255,255,0.7)"}} >
					<Image source={Images[cardSuit]} style={{width:itemWidth*0.5,height:itemWidth*0.5}} />
				</View>
			)
		}
	}

	render(){
		let { cardSuit, onCardsAdded, list } = this.props;
		return (
			<Droppable
				ID={"column" + cardSuit}
				onWillAccept = {this.onWillAccept.bind(this)}
				onAccept = {onCardsAdded}
				style={styles.column}
			>
				{this.renderDeckCard()}
			</Droppable>
		)
	}
}


const styles = StyleSheet.create({
	column:{
		position:"relative",
	}
})