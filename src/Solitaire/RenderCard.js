import PlayingCard,{CardSuit,CardType,CardColor} from "./PlayingCard";
import React from "react";
import { View, Text, Image, StyleSheet } from "react-native"; 
import PropTypes from 'prop-types';

const Images = {
	back: require("./images/back_side.png"),
	spades: require("./images/spades.png"),
	diamonds: require("./images/diamonds.png"),
	hearts: require("./images/hearts.png"),
	clubs: require("./images/clubs.png")
}

export default class RenderCard extends React.Component{
	static propTypes = {
		itemWidth:PropTypes.number,
		itemHeight:PropTypes.number,
		playingCard:PropTypes.object
	}

	constructor(props) {
	  super(props);
	}

	getImageSource(){
		let playingCard = this.props.playingCard
		return Images[playingCard.cardSuit];
	}

	getCardNum(){
		let playingCard = this.props.playingCard;
		return playingCard.cardType;
	}

	buildFaceUpCard(){
		let { itemWidth,itemHeight } = this.props;
		const cardStyle = {width:itemWidth,height:itemHeight}
		const imgStyle = {width:itemWidth*0.3,height:itemWidth*0.3};
		const largeImgStyle = {width:itemWidth*0.5,height:itemWidth*0.5,alignSelf:"flex-end"}
		return (
			<View style={[styles.card,cardStyle]}>
				<View style={styles.cardRow}>
					<Text style={styles.text}>{this.getCardNum()}</Text>
					<Image source={this.getImageSource()} style={imgStyle} />
				</View>
				<Image source={this.getImageSource()} style={largeImgStyle}/>
			</View>
		)
	}

	buildFaceDownCard(){
		let { itemWidth,itemHeight } = this.props;
		const cardStyle = {width:itemWidth,height:itemHeight};
		return (
			<View style={{width:itemWidth,borderRadius:4,height:itemHeight,borderColor:"black",borderWidth:1,backgroundColor:"lightblue"}}>
				{/*<Image source={Images.back} style={[styles.card,cardStyle]} resizeMode={"stretch"} />*/}
			</View>
		)
	}

	render(){
		const { playingCard } = this.props;
		const { faceUp } = playingCard;
		if(!faceUp){
			return this.buildFaceDownCard()
		}else{
			return this.buildFaceUpCard()
		}
	}
}


const styles = StyleSheet.create({
	card:{
		padding:6,
		backgroundColor:"white",
		borderRadius:4,
		justifyContent:"space-between",
		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.34,
		shadowRadius: 2,
	},
	cardRow:{
		flexDirection:"row",
		justifyContent:"space-between",
		alignItems:"center"
	},
	text:{
		fontSize:16,
		fontWeight:"bold"
	}
})