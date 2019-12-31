import React from 'react';
import {Button} from 'react-bootstrap';
import bubbleSort from "../algorithms/bubbleSort";
import insertionSort from "../algorithms/insertionSort";
import selectionSort from "../algorithms/selectionSort";
import './histogram.css';

export default class Histogram extends React.Component {
  
  constructor(props) {
    super(props);

    this.state = {
      bars: [],
      swaps: [],
      comparisons: [],
      speed: 1000/5,
      size: 12,
      busy: false,
      displayStyles: [],
      selectedStyle: "Clear",
      algorithms: [],
      selectedAlgorithm: "bubbleSort"
    };

    this.shuffle = this.shuffle.bind(this);
    this.swap = this.swap.bind(this);
    this.sort = this.sort.bind(this);
    this.performSwaps = this.performSwaps.bind(this);
    this.changeSpeed = this.changeSpeed.bind(this);
    this.changeSize = this.changeSize.bind(this);
    this.changeStyle = this.changeStyle.bind(this);
    this.changeAlgorithm = this.changeAlgorithm.bind(this);
    this.setComparing = this.setComparing.bind(this);
  }
  
  componentDidMount() {
    this.populateDropdowns();
    this.createBars(this.state.selectedStyle);
  }

  populateDropdowns() {
    let displayStyles = []
    displayStyles.push({value: 'Clear', display: 'Clear'});
    displayStyles.push({value: 'Pretty', display: 'Pretty'});

    let algorithms = []
    algorithms.push({value: "bubbleSort", display: "Bubble Sort"});
    algorithms.push({value: "insertionSort", display: "Insertion Sort"});
    algorithms.push({value: "selectionSort", display: "Selection Sort"});

    this.setState({ displayStyles, algorithms});
  }

  createBars(displayStyle) {
    let bars = [];

    if (displayStyle === "Clear") {

      for (let i = 0; i < this.state.size; i++) {
      
        let color= `rgb(255,255,255)`;
        let height = (window.innerHeight - document.getElementById("options").offsetHeight) / this.state.size * (i + 1);
        let width = window.innerWidth / this.state.size / 2;
        let divStyle = {
          backgroundColor: color,
          height: height,
          width: width,
          margin: width / 4,
        };
        
  
        bars.push(<div className="bar" key={i} style={divStyle}></div>); 
      }
    } else {
      for (let i = 0; i < this.state.size; i++) {
        
        let color= calculateColor(i, this.state.bars.length);
        let height = (window.innerHeight - document.getElementById("options").offsetHeight) / this.state.size * (i + 1);
        let width = window.innerWidth / this.state.size;
        let divStyle = {
          backgroundColor: color,
          height: height,
          width: width
        };
        
  
        bars.push(<div className="bar" key={i} style={divStyle}></div>); 
      }
    }

    this.setState({bars});
  }

  changeAlgorithm(algorithm) {
    this.setState({selectedAlgorithm: algorithm})
  }

  changeSpeed(newValue) {
    this.setState({speed: 1000/newValue.target.value})
  }

  changeSize(e) {
    var inputValue = e.target.value;
    setTimeout(() => {
      this.setState({size: inputValue})
      this.createBars(this.state.selectedStyle);
    }, 0);
  }

  changeStyle(displayStyle) {

    this.setState({selectedStyle: displayStyle});

    let bars = [];
    let displayName;

    if (displayStyle === "Clear") {

      displayName="clearBar";
      for (let i = 0; i < this.state.size; i++) {
      
        let color= `rgb(255,255,255)`;
        let height = this.state.bars[i].props.style.height
        let width = window.innerWidth / this.state.size / 2;
        let divStyle = {
          backgroundColor: color,
          height: height,
          width: width,
          margin: width / 4,
        };
        
  
        bars[i] = <div className={displayName} key={i} style={divStyle}></div>; 
      }
    } else {
      displayName="prettyBar";
      for (let i = 0; i < this.state.size; i++) {
        
        let color= calculateColor(this.state.bars[i].key, this.state.bars.length);
        let height = this.state.bars[i].props.style.height;
        let width = window.innerWidth / this.state.size;
        let divStyle = {
          backgroundColor: color,
          height: height,
          width: width
        };
        
  
        bars[i] = <div className={displayName} key={i} style={divStyle}></div>; 
      }
    }

    this.setState({bars});
  }

  // https://javascript.info/task/shuffle
  // make the array an array of BARS instead of heights?
  shuffle() {
    const newBars = this.state.bars.slice();
    for (let i = this.state.size - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      // swap bars
      var temp = newBars[i];
      newBars[i] = newBars[j];
      newBars[j] = temp;
    }
    this.setState({bars: newBars});
  }

  setComparing(x,i, j) {
    console.log(x[i]);
    x[i].props = x[j].props;
    this.setState({bars: x});
  }
  
  swap(x,i, j) {
    let temp = x[i];
    x[i] = x[j];
    x[j] = temp;
    this.setState({bars: x});
  }

  performSwaps(swaps) {
    let x = this.state.bars.slice();
    const arrayBars = document.getElementsByClassName('bar');
    for (let i = 0; i < swaps.length; i++) {
      if (swaps[i][0] === "swap") {
        setTimeout(() => {
          arrayBars[swaps[i][1]].style.backgroundColor = `rgb(0, 255, 0)`;
          arrayBars[swaps[i][2]].style.backgroundColor = `rgb(0, 255, 0)`;
        }, (i-.66) * this.state.speed);
        setTimeout(() => {
          this.swap(x, swaps[i][1], swaps[i][2]);
        }, i * this.state.speed);
      } else if (swaps[i][0] === "compare") {
        var barOneColor = arrayBars[swaps[i][1]].style.backgroundColor;
        var barTwoColor = arrayBars[swaps[i][2]].style.backgroundColor;
        setTimeout(() => {
          arrayBars[swaps[i][1]].style.backgroundColor = `rgb(255, 0, 0)`;
          arrayBars[swaps[i][2]].style.backgroundColor = `rgb(255, 0, 0)`;
        }, (i - 1) * this.state.speed);
     } else if (swaps[i][0] === "uncompare") {
      setTimeout(() => {
        arrayBars[swaps[i][1]].style.backgroundColor = barOneColor;
        arrayBars[swaps[i][2]].style.backgroundColor = barTwoColor;
      }, (i) * this.state.speed); 
     }
      
    }
    setTimeout(() => {
      this.setState({busy: false});
    }, swaps.length * this.state.speed);
  }

  sort() {
    this.setState({busy: true});
    let arr = this.state.bars.slice();
    let swaps;

    let algorithm = this.state.selectedAlgorithm;

    if (algorithm === "bubbleSort") {
      swaps = bubbleSort(arr);
    } else if (algorithm === "insertionSort") {
      swaps = insertionSort(arr);
    } else if (algorithm === "selectionSort") {
      swaps = selectionSort(arr);
    }
    this.performSwaps(swaps);
  }

  render() {
    return (
      <div id="visualizer">
        {this.state.speed}
        <div id="options">
          Speed:
          <input type="range" min="1" max="1000" defaultValue={this.state.speed} className="slider" id="speedRange" onChange={this.changeSpeed} disabled={this.state.busy}></input>
          Histogram Size:
          <input type="range" min="4" max="250" defaultValue="12" className="slider" id="sizeRange" onChange={this.changeSize} disabled={this.state.busy}></input>
          <Button onClick={this.shuffle} variant="primary" disabled={this.state.busy}>Shuffle</Button>
          <Button onClick={this.sort} variant="secondary" disabled={this.state.busy}>Solve</Button>
          <div className="dropdown">
            Algorithm: 	&nbsp;
            <select onChange={(e) => this.changeAlgorithm(e.target.value)}>
            {this.state.algorithms.map((algorithm) => <option key={algorithm.value} value={algorithm.value}>{algorithm.display}</option>)}
            </select>
            &nbsp;&nbsp;&nbsp;
            Display style: 	&nbsp;
            <select onChange={(e) => this.changeStyle(e.target.value)}>
            {this.state.displayStyles.map((displayStyle) => <option key={displayStyle.value} value={displayStyle.value}>{displayStyle.display}</option>)}
            </select>
          </div>
        </div>
              
        <div className="histogram">
          {this.state.bars}
        </div>
      </div>
    );
  }
}

// https://krazydad.com/tutorials/makecolors.php
function calculateColor(i, histogramSize) {
  let frequency = 5.75/histogramSize;
  let center = 128;
  let width = 127;

  var r = Math.floor(Math.sin(frequency * i + 1) * width + center);
  var g = Math.floor(Math.sin(frequency * i + 3) * width + center);
  var b = Math.floor(Math.sin(frequency * i + 5) * width + center);

  return `rgb(${r}, ${g}, ${b})`;
}