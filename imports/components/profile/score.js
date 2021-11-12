import React from 'react';
import PropTypes from 'prop-types';
import Gradient from 'javascript-color-gradient';

const Score = (props) => {
    const colorGradient = new Gradient();
    const color1 = "#ff0000";
    const color2 = "#c5b5f2";
    colorGradient.setGradient(color1, color2);
    colorGradient.setMidpoint(50);
    const currentColor = colorGradient.getColor(props.reputationScore);

    const normalizedRadius = _radius(props.viewSize) - _stroke(props.viewSize) * 2;
    const circumference = normalizedRadius * 2 * Math.PI;
    const strokeDashoffset = circumference - props.reputationScore / 100 * circumference;


    return (
        <svg            
            height={_radius(props.viewSize) * 2}
            width={_radius(props.viewSize) * 2}
        >
            <circle
                fill="transparent"
                stroke={currentColor}
                strokeWidth={_stroke(props.viewSize)}
                strokeDasharray={circumference + ' ' + circumference}
                style={{strokeDashoffset}}
                r={normalizedRadius}
                cx={_radius(props.viewSize)}
                cy={_radius(props.viewSize)}
            />
            <text
                x="50%"
                y="60%"
                textAnchor="middle"
                fontSize={_fontSize(props.viewSize)}
                stroke={currentColor}
                strokeWidth="2"
            >
                {props.reputationScore}
            </text>
        </svg>
    );
};
Score.propTypes = {
    reputationScore: PropTypes.number.isRequired,
    viewSize: PropTypes.string
};
export default Score;


const _radius = (viewSize) => {
    switch(viewSize){
        case "small":
            return 30;
            break;
        case "medium":
            return 40;
            break;
        case "large":
            return 50;
            break;
        default:
            return 50;
            break;
    }
};
const _stroke = (viewSize) => {
    switch(viewSize){
        case "small":
            return 6;
            break;
        case "medium":
            return 8;
            break;
        case "large":
            return 10;
            break;
        default:
            return 10;
            break;
    }
};
const _fontSize = (viewSize) => {
    switch(viewSize){
        case "small":
            return "0.96rem";
            break;
        case "medium":
            return "1.28rem";
            break;
        case "large":
            return "1.6rem";
            break;
        default:
            return "1.6rem";
            break;
    }
}
