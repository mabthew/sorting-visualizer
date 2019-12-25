import React from 'react';
import {Button} from 'react-bootstrap';
import FlipMove from 'react-flip-move';
import Bar from './bar';
import './histogram.css';
//import { fadeIn } from 'react-animations'
//import { motion } from 'framer-motion';

function enableSliders() {
  console.log('enabling sliders');
  document.getElementById("speedRange").disabled = false;
  document.getElementById("speedRange").disabled = false;
}

export default class Histogram extends React.Component {
  
  constructor(props) {
    super(props);

    this.state = {
      bars: [],
      swaps: [],
      comparisons: [],
      speed: 1050,
      size: 12
    };

    this.shuffle = this.shuffle.bind(this);
    this.compare = this.compare.bind(this);
    this.swap = this.swap.bind(this);
    this.sort = this.sort.bind(this);
    this.performSwaps = this.performSwaps.bind(this);
    this.bubbleSort = this.bubbleSort.bind(this);
    this.changeSpeed = this.changeSpeed.bind(this);
    this.changeSize = this.changeSize.bind(this);
  }

  
  
  componentDidMount() {
    this.resetArray();
  }

  resetArray() {
    var bars = [];
    this.setState({bars});
    
    for (let i = 0; i < this.state.size; i++) {
      var color= this.calculateColor(i);
      var height = (window.innerHeight - document.getElementById("options").offsetHeight) / this.state.size * (i + 1);
      var width = window.innerWidth / this.state.size;
      bars.push(<Bar key={i} width={width} height={height} color={color} n={this.state.size}></Bar>); 
    }
    this.setState({bars});
  }

  display(newHistogram) {
    this.setState({bars: newHistogram});
  }

  render() {
    return (
      <div id="visualizer">
        <div id="options">
          Speed: {this.state.speed} ms
          <input type="range" min="100" max="2000" defaultValue="1050" className="slider" id="speedRange" onChange={this.changeSpeed}></input>
          Size: {this.state.size} bars
          <input type="range" min="4" max="20" defaultValue="12" className="slider" id="sizeRange" onChange={this.changeSize}></input>
          <Button onClick={this.shuffle} variant="primary">Shuffle</Button>
          <Button onClick={this.sort} variant="secondary">Solve</Button>
          <Button onClick={this.move} variant="secondary">Swap</Button>
        </div>

        <div className="histogram">
        <FlipMove>
          {this.state.bars}
        </FlipMove>
        </div>
      </div>
    );
  }

  changeSpeed(newValue) {
    this.setState({speed: newValue.target.value})
  }

  changeSize(e) {
    var inputValue = e.target.value;
    setTimeout(() => {
      this.setState({size: inputValue})
      this.resetArray();
    }, 0);
  }

  // https://krazydad.com/tutorials/makecolors.php
  calculateColor(i) {
    let frequency = 5.75/this.state.size;
    let center = 128;
    let width = 127;

    var r = Math.floor(Math.sin(frequency * i + 1) * width + center);
    var g = Math.floor(Math.sin(frequency * i + 3) * width + center);
    var b = Math.floor(Math.sin(frequency * i + 5) * width + center);

    return `rgb(${r}, ${g}, ${b})`;
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

  compare() {
    let x = this.state.bars.slice();
    x[0] = <Bar width={x[0].props.width} height={x[0].props.height} color={`rgb(0, 0, 0)`}></Bar>

    // layout animation here

    this.setState({bars: x})

    console.log(x[0].props.color)
  }

  swap(x,i, j) {
      let temp = x[i];
      // x[i] = <Bar key={j} width={x[j].props.width} height={x[j].props.height} color={`rgb(0, 0, 0)`}></Bar>
      // x[j] = <Bar key={i} width={temp.props.width} height={temp.props.height} color={`rgb(0, 0, 0)`}></Bar>
      x[i] = x[j];
      x[j] = temp;
      this.setState({bars: x});
      
  }

  async performSwaps(swaps) {
    let x = this.state.bars.slice();
    for (let i = 0; i < swaps.length; i++) {
      setTimeout(() => {
        this.swap(x, swaps[i][0], swaps[i][1]);
      }, i* this.state.speed);
    }
  }

  async sort() {
    document.getElementById("speedRange").disabled = true;
    let swaps = this.bubbleSort();

    await this.performSwaps(swaps);

    enableSliders();
  }

  bubbleSort() {
    var swapping;
    var swaps = [];
    var n = this.state.bars.length-1;
    var x = this.state.bars.slice();
    do {
        swapping = false;
        for (let i=0; i < n; i++)
        {
          if (x[i].props.height > x[i+1].props.height)
          {
              let temp = x[i];
              x[i] = x[i+1];
              x[i+1] = temp;
              swaps.push([i, i+1]);
              swapping = true;
          }
        }
        n--;
    } while (swapping);
    return swaps;
  }
}