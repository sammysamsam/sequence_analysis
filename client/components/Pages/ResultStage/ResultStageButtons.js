import React from "react";


//ACTION
import * as StrandAction from "../../Actions/StrandAction";

export default class ResultStageButtons extends React.Component {
	constructor()
	{
		super();
		this.callcomparelist = this.callcomparelist.bind(this);
		this.callfullcomparelist = this.callfullcomparelist.bind(this);
		this.callprintfullstrands = this.callprintfullstrands.bind(this);
		this.callprintcomponents = this.callprintcomponents.bind(this);
	}

	callprintfullstrands()
	{
		StrandAction.ClearResults();	
		StrandAction.PrintStrandList();
	}

	callprintcomponents()
	{
		StrandAction.ClearResults();	
		StrandAction.PrintComponentList();
	}

	callcomparelist(){
		StrandAction.ClearResults();
		StrandAction.CompareStrands([]);
	}

	callfullcomparelist()
	{
		StrandAction.ClearResults();
		StrandAction.FullCompareAnalysis();
	}

	render()
	{
		let analysisButtonStyle = {
			fontFamily:"'Roboto',serif",
			cursor:"pointer",
			width:"20%",
			paddingTop:"7px",
			paddingBottom:"9px",
			textAlign:"center",
			color:"#4e4e4f",
			fontSize:"13px",
			display:"inline-block"
		}
		let analysisButtonOffStyle = {
			fontFamily:"'Roboto',serif",
			width:"20%",
			paddingTop:"7px",
			paddingBottom:"9px",
			textAlign:"center",
			color:"#c6c6c6",
			fontSize:"13px",
			display:"inline-block"
		}
		let iconStyle = {
			position:"relative",
			top:"6px",
			paddingRight:"10px",
			fontSize:"22px",
			color:"#e2914a"
		}
		let containerStyle  = {
			background:"rgba(255,255,255,.9)",

		}
		if(this.props.status)
			return (	
				<div style = {containerStyle}>
					<div style = {analysisButtonOffStyle} >  
						<i style = {iconStyle} className="material-icons">compare</i>
						<span className = "hide-on-small-only">Complete Analysis</span>
					</div>

					<div style = {analysisButtonOffStyle}>  
						<i style = {iconStyle} className="material-icons">compare </i>
						<span className = "hide-on-small-only">2 Strand Comparison</span>
					</div>
					<div style = {analysisButtonOffStyle} >  
						<i style = {iconStyle} className="material-icons">print</i>
						<span className = "hide-on-small-only">Print Full Strands</span>
					</div>
					<div style = {analysisButtonOffStyle} >  
						<i style = {iconStyle} className="material-icons">print</i>
						<span className = "hide-on-small-only">Print Components</span>
					</div>
					<div style = {analysisButtonOffStyle}  >  
						<i style = {iconStyle} className="material-icons">invert_colors</i>
						<span className = "hide-on-small-only">Melting Point</span>
					</div>
				</div>
			)
		else
			return (	
				<div style = {containerStyle} className = "animated fadeIn">
					
					<div style = {analysisButtonStyle} className= "hvr-underline-from-center" onClick = {this.callfullcomparelist}>  
						
						<i style = {iconStyle} className="material-icons">
							compare
						</i>
						<span className = "hide-on-small-only">Complete Analysis</span>
					</div>

					<div style = {analysisButtonStyle} className= "hvr-underline-from-center" onClick = {this.callcomparelist}>  
						
						<i style = {iconStyle} className="material-icons">
							compare
						</i>
						<span className = "hide-on-small-only">2 Strand Comparison</span>
					</div>
					<div style = {analysisButtonStyle}  className= "hvr-underline-from-center" onClick = {this.callprintfullstrands}>  
						
						<i style = {iconStyle} className="material-icons">
							print
						</i>
						<span className = "hide-on-small-only">Print Full Strands</span>
					</div>
					<div style = {analysisButtonStyle}  className= "hvr-underline-from-center" onClick = {this.callprintcomponents}>  
						
						<i style = {iconStyle} className="material-icons">
							print
						</i>
						<span className = "hide-on-small-only">Print Components</span>
					</div>
					<div style = {analysisButtonStyle}  className= "hvr-underline-from-center" >  
						
						<i style = {iconStyle} className="material-icons">
							invert_colors
						</i>
						<span className = "hide-on-small-only">Melting Point</span>
					</div>
				</div>
			)
	}
}


