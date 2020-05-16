import React from "react";
import { View, Text, Image, StyleSheet, Dimensions } from "react-native"; 
import PropTypes from 'prop-types';
import PlayingCard,{CardSuit,CardType,CardColor} from "./PlayingCard";
import RenderCard from "./RenderCard";

import { Draggable } from "../components/Draggable";

const windowWidth = Dimensions.get('window').width;

const itemWidth = (windowWidth - 7*10 ) / 7 ;
const itemHeight = itemWidth/0.7;
const offsetTop = itemHeight*0.4;

export default class ColumnNode extends React.Component{
	static propTypes = {
		cards: PropTypes.array,
		columnIndex: PropTypes.number
	}

	constructor(props) {
	  super(props);
	  this.state = {

	  };
	}

	render(){
		let {cards,columnIndex} = this.props;
		if(cards.length === 0 ) return null;
		let [firstCard,...restCards] = cards;
		return (
			<Draggable
				value={{columnIndex:columnIndex,cards:cards}}
			>
				<RenderCard playingCard={firstCard} itemWidth={itemWidth} itemHeight={itemHeight} />
				<View style={{position:"absolute",top:offsetTop}}>
					<ColumnNode cards={restCards} columnIndex={columnIndex} />
				</View>
			</Draggable>
		)
	}
}


const styles = StyleSheet.create({
	column:{
		position:"relative",
	}
})