import React from "react";
import './Sorting Visualizer.css'

function SortingVisualizer(){
    return(
        <div className="offset">
            <Navigation></Navigation>
        </div>
    );
}

class Navigation extends React.Component{
    constructor(props){
        super(props);
        this.state = {value: 10};
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleChange(event){
        this.setState({value: event.target.value});
    }
    handleSubmit(event){
        alert('A size was submitted: '+this.state.value);
        event.preventDefault();
    }
    render(){
        return(
            <div>
                <nav className="navbar navbar-expand md navbar-dark bg-dark fixed-top">
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarResponsive">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <a className="navbar-brand" href="#">Sorting Visualizer</a>
                    <div className="collapse navbar-collapse" id="navbarResponsive">
                        <ul className="navbar-nav ml-auto">
                            <li className="nav-item">
                                <form id="sizeForm" onSubmit={this.handleSubmit}>
                                    <label>
                                        Size:
                                        <input type="number" value={this.state.value} onChange={this.handleChange} placeholder={this.state.value}/>
                                    </label>
                                    <input className="btn btn-secondary btn-md" type="submit" value="Submit"></input>
                                </form>
                            </li>
                            <li className="nav-item">
                                <button className="btn btn-secondary btn-md" type="button" >Shuffle Deck</button>
                            </li>
                            <li className="nav-item">
                                <button className="btn btn-secondary btn-md" type="button">Merge Sort</button> 
                            </li>
                            <li className="nav-item">
                                <button className="btn btn-secondary btn-md" type="button">Quick Sort</button>
                            </li>
                            <li className="nav-item">
                                <button className="btn btn-secondary btn-md" type="button">Selection Sort</button>
                            </li>
                            <li className="nav-item">
                                <button className="btn btn-secondary btn-md" type="button">Bubble Sort</button>
                            </li>
                        </ul>
                    </div>
                </nav>
                <div className="row text-center">
                    <Deck dealSize={this.state.value}></Deck>
                </div>
            </div>
        )
    }
}
class Card extends React.Component{
    render(){
       let altVal = this.props.CardValue+this.props.CardSuite;
       let baseUrl = "/img/";
        return <div className="col-xs-2">
                    <img className="Card" src={(process.env.PUBLIC_URL+baseUrl+this.props.CardImg)} alt={altVal} width="300px" height="400px"></img>
                </div>
    }
}

class Deck extends React.Component{
    constructor(){
        super();
        this.state = {
            cardDeck: new Array(52),
            dealSize: 10,
            visibleDeck: new Array(52)
        }
        let tempVal = 0;
        let tempImg = 0;
        for(let i = 0; i<52; i++){
            switch(i%4){
                case 0:
                    tempVal = (i%13)+1;
                    tempImg = tempVal+"H.png";
                    this.state.cardDeck.push(<Card CardSuite="H" CardValue={tempVal} CardImg={tempImg}></Card>);
                    break;
                case 1:
                    tempVal = (i%13)+1;
                    tempImg = tempVal+"D.png";
                    this.state.cardDeck.push(<Card CardSuite="D" CardValue={tempVal} CardImg={tempImg}></Card>);
                    break;
                case 2:
                    tempVal = (i%13)+1;
                    tempImg = tempVal+"C.png";
                    this.state.cardDeck.push(<Card CardSuite="C" CardValue={tempVal} CardImg={tempImg}></Card>);
                    break;
                case 3:
                    tempVal = (i%13)+1;
                    tempImg = tempVal+"S.png";
                    this.state.cardDeck.push(<Card CardSuite="S" CardValue={tempVal} CardImg={tempImg}></Card>);
                    break;
                default:
                    break;
            }
        }
    }
    render(){
        
        return (
            <div>
                {this.state.visibleDeck = dealCards(this.state.dealSize, this.state.cardDeck)}
                {this.state.visibleDeck.map((Card)=><div>{Card}</div>)};
            </div>
        )
    }  
}
function dealCards (size, cardArray){
    let x = new Array(size-1);
    for(let i=0; i< size-1; i++){
        x[i]= cardArray[~~(cardArray.length * Math.random())];
    }
    return x;
}
export default SortingVisualizer;
