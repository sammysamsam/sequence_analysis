import React from "react";

import Overview from "../../Pages/DevelopmentStage/Overview";
import StrandComponentsDisplay from "../../Pages/DevelopmentStage/StrandComponentsDisplay";
import FullStrandDisplay from "../../Pages/DevelopmentStage/FullStrandDisplay";
import StrandComponentInput from "../../Pages/DevelopmentStage/StrandComponentInput";
import WorkspaceNav from "../../Pages/DevelopmentStage/WorkspaceNavigation";
import {Row} from 'react-materialize';
//STORE
import ProjectStore from "../../Store/ProjectStore";

export default class DevelopmentStageLayout extends React.Component {
	
	constructor(){
		super();
		this.updateWorkspaceNavigation = this.updateWorkspaceNavigation.bind(this);
		this.updateComponentlist = this.updateComponentlist.bind(this);
		this.updatefullstrandlist = this.updatefullstrandlist.bind(this);
		this.updatestatus = this.updatestatus.bind(this);

		this.state = {  
						activedisplay: ProjectStore.getWorkspaceDisplay(),
						Component_List: ProjectStore.getStrandComponents(),
						Full_List: ProjectStore.getFullStrands()
					}
	}
	componentWillMount() {
		ProjectStore.on("Change_Workspace_Display", this.updateWorkspaceNavigation);
		ProjectStore.on("Change_Full_Strandlist",this.updatefullstrandlist);
		ProjectStore.on("Change_Component_Strandlist",this.updateComponentlist);
	}
	componentWillUnmount() {
		ProjectStore.removeListener("Change_Workspace_Display",this.updateWorkspaceNavigation)
		ProjectStore.removeListener("Change_Component_Strandlist",this.updateComponentlist)
		ProjectStore.removeListener("Change_Full_Strandlist",this.updatefullstrandlist);
	}

	updatestatus(){
		this.setState({ backend_Status: ProjectStore.getBackendStatus() })
	}

	updateWorkspaceNavigation(){
		this.setState({ activedisplay: ProjectStore.getWorkspaceDisplay()});
	}

	updateComponentlist(){
		this.setState( {Component_List: ProjectStore.getStrandComponents()});
	}

	updatefullstrandlist(){
		this.setState( {Full_List: ProjectStore.getFullStrands() })
	}

	ComponentDisplay(){
		switch(this.state.activedisplay){
			case "1":{
				return <Overview  status = {this.state.backend_Status} strandlist = {this.state.Full_List} complist = {this.state.Component_List}/>
			}
			case "2":{
				return <div style = {{paddingLeft:"10px",}}>
					<StrandComponentInput  status = {this.state.backend_Status} Component_list = {this.state.Component_List} Salt = {this.state.Salt} Concentration = {this.state.Concentration}/>
				</div>
			}
			case "3":{
				return <div style = {{paddingLeft:"10px"}} >
					<FullStrandDisplay  status = {this.state.backend_Status} complist = {this.state.Component_List} strandlist = {this.state.Full_List}/>
				</div>
			}
		}
	}


	render(){
		let topstyle = {
			padding:"50px 0px 0px 65px",
			backgroundColor:"#4b626d",
			boxShadow:" 9px 0px 12px -4px rgba(0,0,0,0.56)",
			textAlign:"left",

		}	
		let bottomstyle = {
			background:"rgba(226,226,226,.9)",
			boxShadow:" 9px 9px 12px -4px rgba(0,0,0,0.56)",
			paddingTop:"30px",
			paddingBottom:"10px",
			marginTop:"1px"
		}

		return(		
		<Row>
			<div className = "col s1"> </div>
			
			<div className = "col s10">
				<div style = {topstyle} >
					<div style = {{color:"#f9ead1",fontSize:"37px",paddingRight:"65px"}}> 
						PROJECT WORKSPACE 
						<div style = {{color:"#f9ead1",paddingTop:"15px",fontSize:"14px",paddingBottom:"20px"}}>
							Use this space to input your desired strands components and put those components together to create your desired strands. 
						</div>
					</div>
					<WorkspaceNav activeDisplay = {this.state.activedisplay}/>
				</div>
				
				<div style  = {bottomstyle}>
					{this.ComponentDisplay()}
				</div>
			</div>
		</Row>
		);
	}
}
