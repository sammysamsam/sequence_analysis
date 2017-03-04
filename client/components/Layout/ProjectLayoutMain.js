import React from "react";
import { Link } from "react-router";

import ProjectNavigationBar from "../Pages/ProjectNavigationBar";
import LoadSave from "../Pages/LoadSave";
import backgroundImage from '../../Images/appbackground.png'
import {Modal,Button} from 'react-materialize';
import FooterSection from "../Pages/FooterSection";

export default class ProjectLayoutMain extends React.Component {
	render(){
		let stageContainerStyle = {
			padding:"5vh 0px 15vh 0px"
		}
		let headerStyle = {
			textDecoration:"none",
			backgroundColor:"#292B2D",
			height:"40px",
			padding:"2.5px 0px 0px 75px",
			margin:"0px",
			fontSize:"11px",
			width:"100%",
		}

		return(
		<div style = {{overflow:"hidden",backgroundImage: 'url('+backgroundImage+')',backgroundSize:"100% 100%"}}>
			<div style = {headerStyle}> 
					<Link to="/" style = {{color:"#ff8a65  ",display:"inline-block",cursor:"pointer"}}>
						<i style = {{position:"relative",top:"6px",marginRight:"10px"}}className="material-icons">
							home
						</i>
						<span className = "hide-on-small-only">
						Optimizing Hybridization AnalYsis Of Nucleotides Program 
						</span>
					</Link>

					<LoadSave/>
			</div>

			<div style = {{background:"rgba(255,255,255,.5)"}}>
					
				<ProjectNavigationBar/>

				<div style = {stageContainerStyle}>	
					{this.props.children}
				</div>
			</div>
				
			<FooterSection/>
		</div>
		);
	}
}