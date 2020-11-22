import React from "react";
import './Sorting Visualizer.css';

export default class SortingVisualizer extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            deck: new Array(52),
            dealSize: 10,
            visibleDeck: new Array(52),
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        let tempVal = 0;
        let tempImg = 0;
        for(let i = 0; i<52; i++){
            switch(i%4){
                case 0:
                    tempVal = (i%13)+1;
                    tempImg = tempVal+"H.png";
                    this.state.deck.push(<Card CardSuite="H" CardValue={tempVal} CardImg={tempImg}></Card>);
                    break;
                case 1:
                    tempVal = (i%13)+1;
                    tempImg = tempVal+"D.png";
                    this.state.deck.push(<Card CardSuite="D" CardValue={tempVal} CardImg={tempImg}></Card>);
                    break;
                case 2:
                    tempVal = (i%13)+1;
                    tempImg = tempVal+"C.png";
                    this.state.deck.push(<Card CardSuite="C" CardValue={tempVal} CardImg={tempImg}></Card>);
                    break;
                case 3:
                    tempVal = (i%13)+1;
                    tempImg = tempVal+"S.png";
                    this.state.deck.push(<Card CardSuite="S" CardValue={tempVal} CardImg={tempImg}></Card>);
                    break;
                default:
                    break;
            }
        }
    }
    handleChange(event){
        this.setState({dealSize: event.target.value})
    }
    handleSubmit(event){
        alert('Deal: '+this.state.dealSize);
        event.preventDefault();
        this.dealCards();
        this.render();
    }
    componentDidMount(){
        this.dealCards();
    }
    dealCards (){
        if(this.state.dealSize <= 1){
            x = this.state.deck[~~(this.state.deck.length*Math.random())];
            return;
        }
        let x = new Array(this.state.dealSize-1);
        for(let i=0; i< this.state.dealSize-1; i++){
            x[i]= this.state.deck[~~(this.state.deck.length * Math.random())];
        }
        this.setState({visibleDeck: x});
    }
    render(){
        return (
            <div>
                <form id="sizeForm" onSubmit={this.handleSubmit}>
                    <label>
                        Size:
                        <input type="number" value={this.state.dealSize} onChange={this.handleChange}/>
                    </label>
                    <input className="btn btn-secondary btn-sm" type="submit" value="Submit"></input>
                </form>
                <div className="row text-center">
                    {this.state.visibleDeck.map((Card)=><div className="col-xs-2">{Card}</div>)};
                </div>
            </div>
        );
    }  
}
class Card extends React.Component{
    render(){
       let altVal = this.props.CardValue+this.props.CardSuite;
       let baseUrl = "/img/";
        return (<div>
                    <img className="Card" src={(process.env.PUBLIC_URL+baseUrl+this.props.CardImg)} alt={altVal} width="300px" height="400px"></img>
                </div>
        );
    }
}
