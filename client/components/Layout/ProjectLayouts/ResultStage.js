import React from "react";
import StrandComparison from "../../Pages/ResultStage/StrandComparison";
import ResultStageButtons from "../../Pages/ResultStage/ResultStageButtons";
import {Row} from 'react-materialize';

//STORE
import ProjectStore from "../../Store/ProjectStore";

export default class ResultStateLayout extends React.Component {

	constructor(){
		super()
		this.updateComponentlist = this.updateComponentlist.bind(this);
		this.updatefullstrandlist = this.updatefullstrandlist.bind(this);
		this.updateBackendStatus = this.updateBackendStatus.bind(this);
		this.updateresults = this.updateresults.bind(this);
		this.state = {  
				Results:ProjectStore.getDataAnalysisResults(),
				Component_List: ProjectStore.getStrandComponents(),
				Full_List: ProjectStore.getFullStrands(),
				Backend_Status:  ProjectStore.getBackendStatus()
			}
	};

	componentWillMount() {
		ProjectStore.on("Update_Results",this.updateresults);
		ProjectStore.on("Update_Backend_Status",this.updateBackendStatus);
		ProjectStore.on("Change_Full_Strandlist",this.updatefullstrandlist);
		ProjectStore.on("Change_Component_Strandlist",this.updateComponentlist);
	}
	componentWillUnmount() {
		ProjectStore.removeListener("Update_Results",this.updateresults);
		ProjectStore.removeListener("Update_Backend_Status",this.updateBackendStatus)
		ProjectStore.removeListener("Change_Component_Strandlist",this.updateComponentlist)
		ProjectStore.removeListener("Change_Full_Strandlist",this.updatefullstrandlist);
	}
	updateComponentlist(){
		this.setState( {Component_List: ProjectStore.getStrandComponents()});
	}
	updatefullstrandlist(){
		this.setState( {Full_List: ProjectStore.getFullStrands() })
	}
	updateBackendStatus(){
		this.setState( {Backend_Status: ProjectStore.getBackendStatus()})
	}
	updateresults(){
		this.setState({	Results:ProjectStore.getDataAnalysisResults() });
	}
	render(){
		let topstyle = {
			paddingTop:"21px",
			backgroundColor:"#4b626d",
			boxShadow:" 9px 0px 12px -4px rgba(0,0,0,0.56)",	
		}
		let bottomstyle = {
			background:"rgba(230, 230, 230,.9)",
			display:"block",
			marginTop:"2px",
			minHeight:"588px",
			borderWidth:"7px 0px 0px 0px",
			boxShadow:" 9px 0px 12px -4px rgba(0,0,0,0.56)",	
			zIndex:"10"
		}
		return(
		<Row>

			<div className = "col s1"> </div>
			
			<div className = "col s10">
				<div style = {topstyle}>
					<div style = {{color:"#f9ead1",fontSize:"45px",padding:"20px 75px 25px 75px"}}> 
					
							DATA ANALYSIS 
						
						<div style = {{color:"#f9ead1",paddingTop:"15px",fontSize:"16px",paddingBottom:"15px"}}>
							Calculate base-pair matching between two strands or all strands (components vs components / full strand vs full strand) and printing out your strands.  
						</div>
					</div>
					<div style = {{marginTop:"10px"}}>
						<ResultStageButtons status = {this.state.Backend_Status}/>
					</div>
				</div>

				<div style = {bottomstyle} className= "animated fadeIn">
					<StrandComparison fulllist = {this.state.Full_List} componentlist = {this.state.Component_List} results = {this.state.Results} status = {this.state.Backend_Status}/>
				</div>
			</div>
		</Row>
		);
	}
}