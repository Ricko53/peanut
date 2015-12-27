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

const setTranslateX = function(node, amount) {
    node.style.webkitTransform =
    node.style.MozTransform =
    node.style.msTransform =
    node.style.transform = "translateX(" + Math.round(amount) + "px)";
};

let latestTilt,
    disableTilt,
    centerOffset,
    viewPort,
    imgAspectRatio,
    tiltBarWidth,
    tiltBarIndicatorWidth,
    tiltCenterOffset;

const NewList = React.createClass({
    getInitialState() {
      return {
        imagePosition: '',
        imgUrl: ' ',
        imageOpen: false,
        imageTran: false,
        imgNode: '',
        imgData: '',
        barNode: '',
        maxTilt: 20,
      };
    },

    componentDidMount() {
        initSkrollr();
    },

    handleImage(e) {
        this.setState({
            imgUrl: e.target.src,
            imagePosition: e.target.parentNode,
            imageOpen: true,
            //imageTran: true,
        });
        setTimeout(_ => {
            this.setState({
               imageTran: true,
           });
            // this.initMath();
            // this.startAnimat();
            // this.addEventListeners();
        },100);
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
        tiltBarWidth = viewPort.winWidth - tiltBarPadding;

        tiltBarIndicatorWidth = (viewPort.winWidth * tiltBarWidth) / this.state.imgData.width;
        this.state.barNode.style.width = tiltBarIndicatorWidth + 'px';

        tiltCenterOffset = ((tiltBarWidth / 2) - (tiltBarIndicatorWidth / 2));

        if (tiltCenterOffset > 0) {
            disableTilt = false;
        } else {
            disableTilt = true;
            latestTilt = 0;
        }

        this.photoTilt();
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

            window.requestAnimationFrame(this.photoTilt);

        }
    },

    photoTilt() {
        let tilt = latestTilt;
        let pxToMove;

        if (tilt > 0) {
            tilt = Math.min(tilt, this.state.maxTilt);
        } else {
            tilt = Math.max(tilt, this.state.maxTilt * -1);
        }

        pxToMove = (tilt * centerOffset) / this.state.maxTilt;

        this.updateImgPosition((centerOffset + pxToMove) * -1);

        this.updateTiltBar(tilt);

        window.requestAnimationFrame(this.photoTilt);
    },

    updateTiltBar(tilt) {
        let pxToMove = (tilt * ((tiltBarWidth - tiltBarIndicatorWidth) / 2)) / this.state.maxTilt;
        setTranslateX(this.state.barNode, (tiltCenterOffset + pxToMove) );
    },

    updateImgPosition(pxToMove) {
        setTranslateX(this.state.imgNode, pxToMove);
    },

    render() {
        let imagePos = this.state.imagePosition? this.state.imagePosition.getBoundingClientRect() : '';
        let dy = this.state.imageTran ? -1 * imagePos.top : 0;
        let cy = this.state.imageTran ?  '40vh' : '100vh';
        let contentStyle = {
            height: this.state.imageTran ? '50vh' : imagePos.height,
            width: this.state.imageTran ? '100vw' : imagePos.width,
            top: imagePos.top,
            left: 0,
            opacity: this.state.imageOpen? 1 : 0,
            transform: 'translate3d( 0, ' + dy + 'px, 0 )',
            WebkitTransform: 'translate3d( 0, ' + dy + 'px, 0 )',
        };
        let textStyle = {
            transform: 'translate3d( 0, ' + cy + ', 0 )',
            WebkitTransform: 'translate3d( 0, ' + cy + ', 0 )',
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
                        <img className="li-box-img" src={'./images/treats2.jpg'} 
                             data-bottom-top="transform: translate3d(0px, -30%, 0px);" 
                             data-top-bottom="transform: translate3d(0px, 0%, 0px);" />
                    </div>
                    <div className="li-box"></div>
                    <div className="li-box"></div>
                    <div className="li-box"></div>
                    <div className="li-box"></div>
                </Box>
                <div className={ this.state.imageTran ? "li-overlay show-content" : "li-overlay"}>
                    <div className= "li-over-content" style={contentStyle}>
                        <img ref="overImage" className="li-over-image" src={this.state.imgUrl} />
                        <div className="li-over-bar">
                            <div ref="overBar" className="li-bar-indicoter"></div>
                        </div>
                    </div>
                    <div className="li-over-text" style={textStyle}>
                        
                    </div>
                </div>
            </div>
        );
    },
});

module.exports = NewList;