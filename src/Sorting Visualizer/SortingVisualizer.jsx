import React from "react";
import {getBubbleSortAnimations, getMergeSortAnimations, getInsertionSortAnimations, getSelectionSortAnimations} from '../sortingAlgorithms/sortingAlgorithms.js'
import './Sorting Visualizer.css';

const ANIMATION_SPEED_MS = 5;

const PRIMARY_COLOR = '';
const SECONDARY_COLOR = 'rgba(163,173,56,.5)';

export default class SortingVisualizer extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            deck: [],
            dealSize: 10,
            visibleDeck: [],
            visibleImgs: [],
            img: [],
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        let tempVal = 0;
        let tempImg = 0;
        for(let i = 0; i<52; i++){
            switch(i%4){
                case 0:
                    tempVal = (i%13)+1;
                    tempImg = '/img/'+tempVal+"H.png";
                    this.state.deck.push(tempVal);
                    this.state.img.push(tempImg);
                    break;
                case 1:
                    tempVal = (i%13)+1;
                    tempImg = '/img/'+tempVal+"D.png";
                    this.state.deck.push(tempVal);
                    this.state.img.push(tempImg);
                    break;
                case 2:
                    tempVal = (i%13)+1;
                    tempImg = '/img/'+tempVal+"C.png";
                    this.state.deck.push(tempVal);
                    this.state.img.push(tempImg);
                    break;
                case 3:
                    tempVal = (i%13)+1;
                    tempImg = '/img/'+tempVal+"S.png";
                    this.state.deck.push(tempVal);
                    this.state.img.push(tempImg);
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
        let y = [];
        for(let i=0; i < this.state.dealSize; i++){
            let randomIndex = Math.floor(Math.random()*this.state.deck.length);
            x.push(this.state.deck[randomIndex]);
            y.push(this.state.img[randomIndex]);
        }
        this.setState({visibleDeck: x, visibleImgs: y});
    }
    doAnimations(animations){
        for (let i = 0; i < animations.length; i++) {
            const arrayCards = document.getElementsByClassName('Card');
            const isColorChange = i % 3 !== 2;
            if (isColorChange) {
                const [cardOneIdx, cardTwoIdx] = animations[i];
                const cardOneStyle = arrayCards[cardOneIdx].style;
                const cardTwoStyle = arrayCards[cardTwoIdx].style;
                const color = i % 3 === 0 ? SECONDARY_COLOR : PRIMARY_COLOR;
                setTimeout(() => {
                cardOneStyle.backgroundColor = color;
                cardTwoStyle.backgroundColor = color;
                }, i * ANIMATION_SPEED_MS);
            } else {
                setTimeout(() => {
                const [cardOneIdx, cardTwoIdx] = animations[i];
                const cardOneImg = this.state.img[cardOneIdx]
                let imgArr = this.state.visibleImgs;
                imgArr[cardTwoIdx] = cardOneImg;
                imgArr[cardOneIdx] = this.state.visibleImgs[cardTwoIdx];
                this.setState({visibleImgs: imgArr});
                }, i * ANIMATION_SPEED_MS);
            }
        }
    }
    mergeSort(){
        const animations = getMergeSortAnimations(this.state.visibleDeck);
        this.doAnimations(animations);
    }

    insertionSort(){
        const animations = getInsertionSortAnimations(this.state.visibleDeck);
        this.doAnimations(animations);
    }

    selectionSort(){
        const animations = getSelectionSortAnimations(this.state.visibleDeck);
        this.doAnimations(animations);
    }
    
    bubbleSort(){
        const animations = getBubbleSortAnimations(this.state.visibleDeck);
        this.doAnimations(animations);
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
                                <button className="btn btn-secondary btn-md" type="button" onClick={() => this.insertionSort()}>Insertion Sort</button>
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
                    {this.state.visibleDeck.map((idx)=> (
                                    <div className="col-xs-2 text-center">
                                        <img className="Card" 
                                            style={{backgroundColor: PRIMARY_COLOR}} 
                                            src={(process.env.PUBLIC_URL+this.state.img[idx])}>
                                        </img>
                                    </div>))};
                </div>
            </div>
        );
    }  
}

