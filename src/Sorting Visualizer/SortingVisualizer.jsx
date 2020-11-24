import React from "react";
import {getMergeSortAnimations} from '../sortingAlgorithms/sortingAlgorithms.js'
import './Sorting Visualizer.css';

const ANIMATION_SPEED_MS = 1;

const SECONDARY_COLOR = 'rgba(163,173,56,.5)';

export default class SortingVisualizer extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            deck: [],
            dealSize: 10,
            visibleDeck: [],
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
    }
    componentDidMount(){
        this.dealCards();
    }
    dealCards (){
        let x = [];
        for(let i=0; i < this.state.dealSize; i++){
            x.push(this.state.deck[Math.floor(Math.random()*this.state.deck.length)]);
        }
        this.setState({visibleDeck: x});
    }
    mergeSort(){
        
    }

    quickSort(){

    }

    selectionSort(){

    }
    
    bubbleSort(){
        
    }

    render(){
        return (
            <div>
                <nav className="navbar navbar-expand md navbar-dark bg-dark fixed-top">
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarResponsive">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <p className="navbar-brand">Sorting Visualizer</p>
                    <div className="collapse navbar-collapse" id="navbarResponsive">
                        <ul className="navbar-nav ml-auto">
                            <li className="nav-item">
                                <button className="btn btn-secondary btn-md" type="button" onClick={() => this.dealCards()}>Shuffle Deck</button>
                            </li>
                            <li className="nav-item">
                                <button className="btn btn-secondary btn-md" type="button" onClick={() => this.mergeSort()}>Merge Sort</button> 
                            </li>
                            <li className="nav-item">
                                <button className="btn btn-secondary btn-md" type="button" onClick={() => this.quickSort()}>Quick Sort</button>
                            </li>
                            <li className="nav-item">
                                <button className="btn btn-secondary btn-md" type="button" onClick={() => this.selectionSort()}>Selection Sort</button>
                            </li>
                            <li className="nav-item">
                                <button className="btn btn-secondary btn-md" type="button" onClick={() => this.bubbleSort()}>Bubble Sort</button>
                            </li>
                        </ul>
                    </div>
                </nav>
                <div className="col-12 text-center">
                    <form className="sizeForm" onSubmit={this.handleSubmit}>
                        Cards Dealt
                        <br></br><input className="dealSize" type="number" value={this.state.dealSize} onChange={this.handleChange} min="1" max="52"/>
                        <br></br><input className="btn btn-secondary btn-sm" type="submit" value="Submit"></input>
                    </form>
                </div>
                <div className="row text-center">
                    {this.state.visibleDeck.map((Card, idx)=><div className="col-xs-2 text-center" key={idx} >{Card}</div>)}
                </div>
            </div>
        );
    }  
}
class Card extends React.Component{
    render(){
       let altVal = this.props.CardValue+this.props.CardSuite;
       let baseUrl = "/img/";
        return (<img className="Card" src={(process.env.PUBLIC_URL+baseUrl+this.props.CardImg)} alt={altVal}></img>
        );
    }
}
