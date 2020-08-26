import React, { Component } from "react";
import PropTypes from 'prop-types';
import CanvasJSReact from "../canvasjs.react"
var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;
class ChartComponent extends Component {
    constructor(props){
        super(props);
        
        this.state = {
            dataPoints: null,
            stripLines: [],
        }

        this._parseData = this._parseData.bind(this);
    }

    componentDidMount(){
        this._parseData();
    }

    hoverSections(sections) {
        let newStripLines = [];
        for (let index = 0; index < sections.length; index += 1) {
            newStripLines.push({startValue:sections[index].start, endValue:sections[index].end, color:"#d8d8d8"});
        }
       
        this.setState({stripLines:newStripLines});
    }

    _parseData() {
        const { data, start, secondData } = this.props;

        const parsedData = [];

        for (let index = 0; index < data.length; index +=1 ){
            const tuple = {x: index + start, y: data[index]};

            parsedData.push(tuple);
        }

        this.setState({
            dataPoints: parsedData,
        });

        if (secondData){
            const parsedData = [];
            for (let index = 0; index < secondData.length; index +=1 ){
                const tuple = {x: index + start, y: secondData[index]};
    
                parsedData.push(tuple);
            }
    
            this.setState({
                secondDataPoints: parsedData,
            });
        }
    }

	render() {

        const { dataPoints, secondDataPoints, stripLines } = this.state;
        const { title, yLegend, xLegend } = this.props;
        let options = {}

        if (secondDataPoints) {
            options = {
                animationEnabled: true,
                animationDuration: 3000,
                zoomEnabled: true,
                backgroundColor: "#FFF",
                title:{
                    text: title,
                    fontSize: 20,
                },
                axisX: {
                    stripLines: stripLines,
                    title: xLegend,
                },
                axisY: {
                    title: yLegend,
                    includeZero: false
                },
                data: [{
                    yValueFormatString: "#,###",
                    xValueFormatString: "#(s)",
                    type: "splineArea",
                    dataPoints: dataPoints,
                    showInLegend: true,
                    name: 'Señal filtrada',
                },
                {
                    yValueFormatString: "#,###",
                    xValueFormatString: "#(s)",
                    type: "splineArea",
                    dataPoints: secondDataPoints,
                    showInLegend: true,
                    name: 'Señal sin filtrar',
                }
            ]
            }
        } else {
            options = {
                animationEnabled: true,
                animationDuration: 3000,
                zoomEnabled: true,
                backgroundColor: "#FFF",
                title:{
                    text: title,
                    fontSize: 20,
                },
                axisX: {
                    stripLines: stripLines,
                    title: xLegend,
                },
                axisY: {
                    title: yLegend,
                    includeZero: false
                },
                data: [{
                    yValueFormatString: "#,###",
                    xValueFormatString: "#(s)",
                    type: "splineArea",
                    dataPoints: dataPoints
                }]
            }
        }
		return (
		<div>
			<CanvasJSChart options = {options} />
		</div>
		);
	}
}
export default ChartComponent;

ChartComponent.propTypes = {
    title: PropTypes.string.isRequired,
    yLegend: PropTypes.string,
    xLegend: PropTypes.string,
    data: PropTypes.array.isRequired,
    start: PropTypes.number,
    secondData: PropTypes.array,
}

ChartComponent.defaultProps = {
    start: 0,
    yLegend: 'Amplitud (µV)',
    xLegend: 'Tiempo (0.25s)',
}
