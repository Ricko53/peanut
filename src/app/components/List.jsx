import React from 'react'
import ReactDOM from 'react-dom'
import { Box, Item } from 'react-polymer-layout'
import Skrollr from 'skrollr'
import Snap from 'snapsvg'

const initSkrollr = function() {
    window.Skrollr = Skrollr.init({
        smoothScrolling: false,
        mobileDeceleration: 0.004,
    });
};

const bezier = function(x1, y1, x2, y2, epsilon) {
    let curveX = function(t){
        let v = 1 - t;
        return 3 * v * v * t * x1 + 3 * v * t * t * x2 + t * t * t;
    };
    let curveY = function(t){
        let v = 1 - t;
        return 3 * v * v * t * y1 + 3 * v * t * t * y2 + t * t * t;
    };
    let derivativeCurveX = function(t){
        let v = 1 - t;
        return 3 * (2 * (t - 1) * t + v * v) * x1 + 3 * (- t * t * t + 2 * v * t) * x2;
    };
    return function(t){
        let x = t, t0, t1, t2, x2, d2, i;
        // First try a few iterations of Newton's method -- normally very fast.
        for (t2 = x, i = 0; i < 8; i++){
            x2 = curveX(t2) - x;
            if (Math.abs(x2) < epsilon) return curveY(t2);
            d2 = derivativeCurveX(t2);
            if (Math.abs(d2) < 1e-6) break;
            t2 = t2 - x2 / d2;
        }

        t0 = 0, t1 = 1, t2 = x;

        if (t2 < t0) return curveY(t0);
        if (t2 > t1) return curveY(t1);

        // Fallback to the bisection method for reliability.
        while (t0 < t1){
            x2 = curveX(t2);
            if (Math.abs(x2 - x) < epsilon) return curveY(t2);
            if (x > x2) t0 = t2;
            else t1 = t2;
            t2 = (t1 - t0) * .5 + t0;
        }
        // Failure
        return curveY(t2);
    };
};

let latestTilt,
    centerOffset,
    viewPort,
    imgAspectRatio,
    tiltBarWidth,
    tiltBarIndicatorWidth,
    tiltCenterOffset;

const setTranslateX = function(node, amount) {
    node.style.webkitTransform =
    node.style.MozTransform =
    node.style.msTransform =
    node.style.transform = "translateX(" + Math.round(amount) + "px)";
};

const List = React.createClass({
    getInitialState() {
      return {
        imagePosition: '',
        imgUrl: ' ',
        imageOpen: false,
        imageTran: false,
        imgNode: '',
        imgData: '',
        barNode: '',
      };
    },

    componentDidMount() {
        initSkrollr();
    	//window.requestAnimationFrame(this.updatePosition);
    },

    updatePosition() {
    	//let moveY = window.pageYOffset || document.documentElement.scrollTop;

    	let img = ReactDOM.findDOMNode(this.refs.image);

    	//let moveY = window.skrollr.getScrollTop(img);

    	let moveY = img.getBoundingClientRect().top;

    	let amount = moveY/-10;

    	img.style.transform = "translateY(" + amount + "px)";

    	window.requestAnimationFrame(this.updatePosition);
    },

    handleImage(e) {
        this.state.imgUrl = e.target.src;
        this.state.imagePosition = e.target.parentNode;
        this.setState({
            imgUrl: e.target.src,
            imagePosition: e.target.parentNode,
            imageOpen: true,
        });
        setTimeout(_ => {this.setState({
            imageTran: true,
        });}, 1000);
    },

    initMath() {
        this.state.imgNode = ReactDOM.findDOMNode(this.refs.overImage);
        this.state.barNode = ReactDOM.findDOMNode(this.refs.overBar);
        viewPort = {
            winHeight: parseInt(window.innerHeight, 10),
            winWidth: parseInt(window.innerWidth, 10),
        };
        this.state.imgData = this.state.imgNode.getBoundingClientRect();
        imgAspectRatio = this.state.imgData.width / this.state.imgData.height; 
    },

    startAnimat() {
        let tiltBarPadding = 20;
        centerOffset = (this.state.imgData.width - viewPort.winWidth) / 2;
        tiltBarWidth = viewport.winWidth - tiltBarPadding;

        tiltBarIndicatorWidth = (viewport.winWidth * tiltBarWidth) / this.state.imgData.width;
        this.state.barNode.style.width = = tiltBarIndicatorWidth + 'px';

        tiltCenterOffset = ((tiltBarWidth / 2) - (tiltBarIndicatorWidth / 2));
    },

    addEventListeners() {
        if (window.DeviceOrientationEvent) {

            let averageGamma = [];

            window.addEventListener('deviceorientation', function(eventData) {

                if (!disableTilt) {

                    if (averageGamma.length > 8) {
                        averageGamma.shift();
                    }

                    averageGamma.push(eventData.gamma);

                    latestTilt = averageGamma.reduce(function(a, b) { return a+b; }) / averageGamma.length;

                }

            }, false);

            window.requestAnimationFrame(photoTilt);

        }
    },

    photoTilt() {

    },



    render() {
        let imagePos = this.state.imagePosition? this.state.imagePosition.getBoundingClientRect() : '';
        let contentStyle = {
            height: this.state.imageTran ? "100%" : imagePos.height,
            width: this.state.imageTran ? "100%" : imagePos.width,
            top: this.state.imageTran ? 0 : imagePos.top,
            left: this.state.imageTran ? 0 : imagePos.left,
            opacity: this.state.imageOpen? 1 : 0,
        };
        return (
          	<div className="li-main">
                <Box id="skrollr-body" center vertical className="li-body">
              		<div className="li-box">
                    </div>
              		<div className="li-box">
              			<img ref="image" className="li-box-img" src={'./images/green-goddess-sandwiches-31.jpg'} />
              		</div>
              		<div onClick={e => this.handleImage(e)} className="li-box">
                        <img className="li-box-img" src={'./images/green-goddess-sandwiches-31.jpg'} data-bottom-top="transform: translate3d(0px, -30%, 0px);" data-top-bottom="transform: translate3d(0px, 0%, 0px);" />
                    </div>
              		<div className="li-box"></div>
              		<div className="li-box"></div>
              		<div className="li-box"></div>
              		<div className="li-box"></div>
                </Box>
                <div className="li-overlay">
                    <div className= "li-over-content" style={contentStyle}>
                        <img ref="overImage" className="li-over-image" src={this.state.imgUrl} />
                        <div className="li-over-bar">
                            <div ref="overBar" className="li-bar-indicoter"></div>
                        </div>
                    </div>
                </div>
            </div>
        );
    },
    // componentDidMount() {
    //  window.addEventListener('touchstart', this.touchStart);
    //      window.addEventListener( 'touchmove', this.handleMove );
    // },

    // touchStart(evt) {
    //  evt.preventDefault();
    //  let touchobj = ev.changedTouches[0];
    //  this.state.imgX = parseInt(touchobj.pageY);
    // },

    // handleMove(evt) {
    //  let touches = evt.changedTouches;
    //  let img = ReactDOM.findDOMNode(this.refs.image);
    //  let moveY = 0;
    //  moveY = this.state.imgX - touches[0].pageY;
    //  let amount = moveY/10;
    //  img.style.transform = "translateY(" + amount + "px)";
    // },

    // handleSnap() {
    //     let shzSVGEl = ReactDOM.findDOMNode(this.refs.svg);
    //     let snap = Snap(shzSVGEl);
    //     let shzPathEl = snap.select('path');

    //     let path = "M290,40c0,0.13-0.001,380.26-0.003,380.39c-0.002,0.134,0.006,24.479,0.003,24.609 c0,3.095-2.562,5.001-5,5.001h-27.125H41.625H15c-1.875,0-5-1.25-5-5.001c-0.003-0.13,0.004-24.509,0.003-24.641 C10.001,420.239,10,40.119,10,40l0,0c0-0.141-0.002-24.859,0-25c0,0,0-5,5-5h26.625h216.25H285c2.438,0,5,1.906,5,5 C290.002,15.13,290,39.869,290,40L290,40z";

    //     let duration = 450;

    //     let epsilon = (1000 / 60 / duration) / 4;

    //     shzPathEl.stop().animate({'path' : path}, duration, bezier(0.7, 0, 0.3, 1, epsilon));

    //     <svg ref="svg" id="li-svg" width="450" height="750">
    //         <path className="li-path" d="M280,466c0,0.13-0.001,0.26-0.003,0.39c-0.002,0.134-0.004,0.266-0.007,0.396
    //         C279.572,482.992,266.307,496,250,496h-2.125H51.625H50c-16.316,0-29.592-13.029-29.99-29.249c-0.003-0.13-0.006-0.261-0.007-0.393
    //         C20.001,466.239,20,466.119,20,466l0,0c0-0.141,0.001-0.281,0.003-0.422C20.228,449.206,33.573,436,50,436h1.625h196.25H250
    //         c16.438,0,29.787,13.222,29.997,29.608C279.999,465.738,280,465.869,280,466L280,466z"></path>
    //     </svg>
    // },
});

module.exports = List;