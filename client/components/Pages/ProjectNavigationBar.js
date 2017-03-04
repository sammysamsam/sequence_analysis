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
			padding:"10px 50px 10px 10px",
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
						<span style = {{color:"white",padding:"6px 10px 6px 10px",border:"solid 1px white"}}>Workspace </span>	
						<img className = "hide-on-small-only" src = {image1} style = {{height:"35px",width:"35px",marginLeft:"20px"}}/>  
					</Link>
				</div>

				<div style = {{width:"70px",display:"inline-block"}}></div>

				<div style = {liStyle}>  

					<Link to = "Project/Analysis" style = {linkstyle} className = "hvr-grow" >    
						
						<span style = {{color:"white",padding:"6px 14px 6px 14px",border:"solid 1px white"}}> 
							Analysis
						</span> 

						<img src = {image3} className = "hide-on-small-only" style = {{height:"35px",width:"35px",marginLeft:"20px"}}/>  

					</Link> 
				</div> 
			</div>
		);
	}
}