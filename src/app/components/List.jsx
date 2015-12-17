import React from 'react'
import ReactDOM from 'react-dom'
import { Box, Item } from 'react-polymer-layout'

const List = React.createClass({
	getInitialState() {
	  return {
	    imgX: 0,
	  };
	},

    componentDidMount() {
      	window.addEventListener( 'scroll', this.scrollImage );
    },

    scrollImage() {
    	window.requestAnimationFrame(this.updatePosition);
    },

    updatePosition() {
    	this.state.imgX = window.pageYOffset || window.document.documentElement.scrollTop;
    	let img = ReactDOM.findDOMNode(this.refs.image);
    	let amount = this.state.imgX/-5;
    	img.style.transform = "translateY(" + amount + "px)";

    	window.requestAnimationFrame(this.updatePosition);
    },

    render() {
      // let rollY = this.state.imgX/-5;
      // let scrollImageStyle = {
      // 	transform : 'translate3d(0, ' + rollY + 'px, 0)',
      // };
      return (
      	  <div className="li-main">
          <section className="li-header">About</section>
          <Box center vertical className="li-body">
          		<div className="li-box"></div>
          		<div className="li-box"></div>
          		<div className="li-box"></div>
          		<div className="li-box">
          			<img ref="image" className="li-box-img" src={'./images/green-goddess-sandwiches-31.jpg'} />
          		</div>
          		<div className="li-box"></div>
          		<div className="li-box">
          			<img className="li-box-img" src={'./images/green-goddess-sandwiches-41.jpg'} />
          		</div>
          		<div className="li-box"></div>
          		<div className="li-box"></div>
          		<div className="li-box"></div>
          </Box>
          </div>
      );
    },
});

module.exports = List;