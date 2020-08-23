import React, { Component } from "react";
import PropTypes from 'prop-types';
import CanvasJSReact from "../canvasjs.react"
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

class ColumnComponent extends Component {
    constructor(props){
        super(props);
    }


	render() {

        const { title, data, yAxisTitle } = this.props;
        let options = 
        {
            animationEnabled: true,
            theme: "light2",
            title:{
                text: title,
                fontSize: 20,
            },
            axisY: {
                title: yAxisTitle,
            },
            data: [{        
                type: "column",  
                showInLegend: false, 
                legendMarkerColor: "grey",
                dataPoints: data,
            }]
        }

		return (
		<div>
			<CanvasJSChart options = {options} />
		</div>
		);
	}
}
export default ColumnComponent;

ColumnComponent.propTypes = {
    title: PropTypes.string.isRequired,
    data: PropTypes.array.isRequired,
    yAxisTitle: PropTypes.string.isRequired,
}
