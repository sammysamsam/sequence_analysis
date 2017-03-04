import React from "react";
import { Link } from "react-router";

import image3 from "../../Images/Icons/AnalysisIcon.png";
import image2 from "../../Images/Icons/SequencerIcon.png";
import image1 from "../../Images/Icons/WorkspaceIcon.png";

export default class ProjectNagivationBar extends React.Component {	
	render()
	{
		const ulStyle = {
			listStyleType:"none",
			padding:"10px",
			backgroundColor:"#292B2D",
			textAlign:"right"
		}
		const liStyle = {
			padding:"10px",
			textAlign:"center",
			display:"inline-block",
		}
		const linkstyle = {
			fontFamily: "'Raleway', serif " , 
			textDecoration:"none",
		}
		return(
			<div style = {ulStyle}>

				<div style = {liStyle}>   
					<Link to="Project/Workspace" style = {linkstyle} className = "hvr-grow" > 
						<span style = {{color:"white",paddingRight:"20px"}}>Workspace </span>	
						<img src = {image1} style = {{height:"35px",width:"35px"}}/>  
					</Link>
				</div>

				<div style = {{width:"70px",display:"inline-block"}}></div>

				<div style = {liStyle}>  

					<Link to = "Project/Analysis" style = {linkstyle} className = "hvr-grow" >    
						
						<span style = {{color:"white",paddingRight:"20px"}}> Analysis</span> 
						<img src = {image3} style = {{height:"35px",width:"35px"}}/>  

					</Link> 
				</div> 
			</div>
		);
	}
}