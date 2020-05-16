import React from "react";
import { View, Text, Image, StyleSheet, Dimensions } from "react-native"; 
import PropTypes from 'prop-types';
import PlayingCard,{CardSuit,CardType,CardColor} from "./PlayingCard";
import RenderCard from "./RenderCard";
import ColumnNode from "./ColumnNode";

import { Droppable } from "../components/Draggable";

const windowWidth = Dimensions.get('window').width;

const itemWidth = (windowWidth - 7*10 ) / 7 ;
const itemHeight = itemWidth/0.7;
const offsetTop = itemHeight * 0.4;

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
		let { cards,columnIndex } = value;
		let draggedCard = cards[0];
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
			height: itemHeight + offsetTop * (list.length-1),
		}
		return (
			<Droppable
				ID={"column" + columnIndex}
				onWillAccept = {this.onWillAccept.bind(this)}
				onAccept = {onCardsAdded}
				style={[styles.column,columnStyle]}
			>
				<ColumnNode cards={list} columnIndex={columnIndex} />
			</Droppable>
		)
	}
}


const styles = StyleSheet.create({
	column:{
		position:"relative",
	}
})