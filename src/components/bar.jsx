import React, { Component } from "react";
import './histogram.css';
import { motion } from "framer-motion";

export default class Bar extends Component{
    constructor(props) {
        super();
        this.width = props.width;
        this.height = props.height;
        this.color = props.color;
        this.originalColor = props.color
        this.bars = props.n;
        this._previousCanvasHeight = window.innerHeight;
        this.shuffledIdx = null;
        this.isComparing = false;
        console.log('in bar constructor:');
    }
  
    recalculate(i) {
        this.height = (window.innerHeight) / this.numberOfLines * (this.i + 1);
        this.width = window.innerWidth / this.numberOfLines;
        this.x = this.width * i;
        this.y = (window.innerHeight) - this.height;
    }
  
    mark() {
        this.isComparing = true;
        this.color = `rgb(0, 0, 0)`;
    }
  
    unmark() {
        this.isComparing = false;
        this.color = this.originalColor;
    }

    render() {
        return (
            <motion.div className="bar" transition={{ type: "spring", stiffness: 10 }} whileHover={{ scale: 1.1}}
                style={{
                    backgroundColor: this.color,
                    height: `${this.height}px`,
                    width: `${this.width}px`
                 }}>
            </motion.div>
        )
    }
  }