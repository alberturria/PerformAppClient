import React, { Component } from "react";
import PropTypes from 'prop-types';
import CanvasJSReact from "../canvasjs.react";
var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

class GroupSignalChartComponent extends Component {
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
        const { data, start } = this.props;

        const parsedData = [];
        for(let signalsIndex=0; signalsIndex < data.length; signalsIndex+=1){
            const localParsedData = [];
            for (let index = 0; index < data[signalsIndex].length; index +=1 ){
                const tuple = {x: index + start, y: data[signalsIndex][index]};

                localParsedData.push(tuple);
            }
            parsedData.push(localParsedData);
        }
        this.setState({
            dataPoints: parsedData,
        });

    }

	render() {

        const { dataPoints, stripLines } = this.state;
        const { title, names } = this.props;
        let options = {}

        if (dataPoints) {
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
                    stripLines: stripLines
                },
                axisY: {
                    title: "Amplitud (µV)",
                    includeZero: false
                },
                data: [{
                    yValueFormatString: "#,###",
                    xValueFormatString: "#(s)",
                    type: "splineArea",
                    dataPoints: dataPoints[0],
                    showInLegend: true,
                    name: names[0],
                },
                {
                    yValueFormatString: "#,###",
                    xValueFormatString: "#(s)",
                    type: "splineArea",
                    dataPoints: dataPoints[1],
                    showInLegend: true,
                    name: names[1],
                },
                {
                    yValueFormatString: "#,###",
                    xValueFormatString: "#(s)",
                    type: "splineArea",
                    dataPoints: dataPoints[2],
                    showInLegend: true,
                    name: names[2],
                },
                {
                    yValueFormatString: "#,###",
                    xValueFormatString: "#(s)",
                    type: "splineArea",
                    dataPoints: dataPoints[3],
                    showInLegend: true,
                    name: names[3],
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
                    text: title
                },
                axisX: {
                    stripLines: stripLines
                },
                axisY: {
                    title: "Amplitud (µV)",
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
export default GroupSignalChartComponent;

GroupSignalChartComponent.propTypes = {
    title: PropTypes.string.isRequired,
    data: PropTypes.arrayOf(PropTypes.array).isRequired,
    names: PropTypes.arrayOf(PropTypes.string).isRequired,
    start: PropTypes.number,
}

GroupSignalChartComponent.defaultProps = {
    start: 0,
}
