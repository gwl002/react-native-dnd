import React from "react";
import { View, Text, Image, StyleSheet, Dimensions } from "react-native"; 
import PropTypes from 'prop-types';
import PlayingCard,{CardSuit,CardType,CardColor} from "./PlayingCard";
import RenderCard from "./RenderCard";

import { Droppable } from "../components/Draggable";

const windowWidth = Dimensions.get('window').width;

const itemWidth = (windowWidth - 7*10 ) / 7 ;
const itemHeight = itemWidth/0.7;

export default class CardColumn extends React.Component{
	static propTypes = {
		list: PropTypes.arrayOf(PropTypes.instanceOf(PlayingCard)),
		onCardsAdded: PropTypes.func,
		columnIndex:PropTypes.number
	}

	constructor(props) {
	  super(props);
	  this.state = {

	  };
	}

	onWillAccept(value){
		let { list } = this.props;
		let { card: draggedCard } = value;
		if(list.length === 0){
			return true;
		}
		let finalCard = list[list.length - 1];
		if(finalCard.cardColor !== draggedCard.cardColor && finalCard.cardNum === draggedCard.cardNum + 1){
			return true;
		}else{
			return false;
		}
	}

	render(){
		let {list,columnIndex,onCardsAdded} = this.props;
		let columnStyle = {
			width:itemWidth,
			height:200,
		}
		return (
			<Droppable
				ID={"column" + columnIndex}
				onWillAccept = {this.onWillAccept.bind(this)}
				onAccept = {onCardsAdded}
				style={[styles.column,columnStyle]}
			>
				{
					list.map((card,index) => {
						return (
							<RenderCard 
								columnIndex={columnIndex}
								playingCard={card} 
								itemWidth={itemWidth} 
								itemHeight={itemHeight} 
								index={index} 
								key={card.cardType + card.cardSuit}
							/>
						)
					})
				}
			</Droppable>
		)
	}
}


const styles = StyleSheet.create({
	column:{
		position:"relative",
	}
})