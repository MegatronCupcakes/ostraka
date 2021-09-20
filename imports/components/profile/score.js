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

    const radius = 50;
    const stroke = 10;
    const normalizedRadius = radius - stroke * 2;
    const circumference = normalizedRadius * 2 * Math.PI;
    const strokeDashoffset = circumference - props.reputationScore / 100 * circumference;


    return (
        <svg
            height={radius * 2}
            width={radius * 2}
        >
            <circle
                fill="transparent"
                stroke={currentColor}
                strokeWidth={stroke}
                strokeDasharray={circumference + ' ' + circumference}
                style={{strokeDashoffset}}
                r={normalizedRadius}
                cx={radius}
                cy={radius}
            />
            <text
                x="50%"
                y="60%"
                textAnchor="middle"
                fontSize="1.6rem"
                stroke={currentColor}
                strokeWidth="2"
            >
                {props.reputationScore}
            </text>
        </svg>
    );
};
Score.propTypes = {
    reputationScore: PropTypes.number.isRequired
};
export default Score;
