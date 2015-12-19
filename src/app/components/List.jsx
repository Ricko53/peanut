import React from 'react'
import ReactDOM from 'react-dom'
import { Box, Item } from 'react-polymer-layout'

const List = React.createClass({
	getInitialState() {
	  return {
	    imgX: 0,
	  };
	},

    // componentDidMount() {
    //   	window.addEventListener( 'scroll', this.scrollImage );
    // },

    // scrollImage() {
    // 	window.requestAnimationFrame(this.updatePosition);
    // },

    componentDidMount() {
    	//window.requestAnimationFrame(this.updatePosition);
    },

    updatePosition() {
    	//this.state.imgX = window.pageYOffset || document.documentElement.scrollTop;
    	//let moveY = window.pageYOffset;

    	let img = ReactDOM.findDOMNode(this.refs.image);

    	//let moveY = window.skrollr.getScrollTop(img);

    	let moveY = img.getBoundingClientRect().top;

    	let amount = moveY/-10;
    	img.style.transform = "translateY(" + amount + "px)";

    	window.requestAnimationFrame(this.updatePosition);
    },

    // componentDidMount() {
    // 	window.addEventListener('touchstart', this.touchStart);
    //   	window.addEventListener( 'touchmove', this.handleMove );
    // },

    // touchStart(evt) {
    // 	evt.preventDefault();
    // 	let touchobj = ev.changedTouches[0];
    // 	this.state.imgX = parseInt(touchobj.pageY);
    // },

    // handleMove(evt) {
    // 	let touches = evt.changedTouches;
    // 	let img = ReactDOM.findDOMNode(this.refs.image);
    // 	let moveY = 0;

    // 	moveY = this.state.imgX - touches[0].pageY;

    // 	console.log(moveY);

    // 	let amount = moveY/10;
    // 	img.style.transform = "translateY(" + amount + "px)";
    // },

    render() {
      // let rollY = this.state.imgX/-5;
      // let scrollImageStyle = {
      // 	transform : 'translate3d(0, ' + rollY + 'px, 0)',
      // };
      return (
      	  <div className="li-main">
          <Box id="skrollr-body" center vertical className="li-body">
          		<div className="li-box"></div>
          		<div className="li-box">
          			<img ref="image" className="li-box-img" src={'./images/green-goddess-sandwiches-31.jpg'} />
          		</div>
          		<div className="li-box">
                    <img className="li-box-img" src={'./images/green-goddess-sandwiches-31.jpg'} data-bottom-top="transform: translate3d(0px, -30%, 0px);" data-top-bottom="transform: translate3d(0px, 0%, 0px);" />
                </div>
          		<div className="li-box"></div>
          		<div className="li-box"></div>
          		<div className="li-box"></div>
          		<div className="li-box"></div>
          		<div className="li-box"></div>
          		<div className="li-box"></div>
          </Box>
          </div>
      );
    },
});

module.exports = List;