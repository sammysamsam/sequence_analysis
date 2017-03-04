import React from "react";
import { Link } from "react-router";

import StrandUtilities from '../Pages/ToolsAnalysis/StrandUtilities';

import StrandComparer from '../Pages/ToolsAnalysis/StrandComparer';

import StrandMeltingPt from '../Pages/ToolsAnalysis/StrandMeltingPt';

import FooterSection from '../Pages/FooterSection';

import {Row} from 'react-materialize';

import backgroundImage from '../../Images/appbackground.png'


export default class ToolsAnalysis extends React.Component {
	constructor(){
		super(); 
		this.state = {  display_status:'seq-man' }
	}
	update_display(e_){
		this.setState({display_status:e_});
	}
	render_display(){
		if(this.state.display_status == 'seq-man'){
			return (
				<div>
					<p style = {{color:"#ffab91",fontStyle:"italic",width:"250px",margin:"auto",textAlign:"center",fontSize:"13px"}}> 
						Manipulate/Analysis Any Given Sequence
					</p>
					<StrandUtilities/>
				</div>
				)
		}
		if(this.state.display_status == 'melt-pt'){
		  return(
		  		<div>
					<p style = {{color:"#ffab91",fontStyle:"italic",width:"350px",margin:"auto",textAlign:"center",fontSize:"13px"}}> 
						Find Melting Point For Any Given Sequence
					</p>
					<StrandMeltingPt/>
				</div>
				)	
		}
		else{
				return(
				<div>
					<p style = {{color:"#ffab91",fontStyle:"italic",textAlign:"center",fontSize:"13px",paddingTop:"20px"}}> 
						Find Full Analysis of Base Pairing Between Two Strands
					</p>
					<StrandComparer/>
				</div>
				)
		}
	}
	render_tab(){
		let tabStyle = {
			width:"220px",
			height:"45px",
			paddingTop:"14px",
			display:"inline-block",
			margin:"15px",
			textAlign:"center",
			fontFamily:"roboto",
			cursor:"pointer",
			border:"solid 1px grey"
		}
		let tabContainer = {
			textAlign:"center",
			paddingBottom:"40px",
			fontSize:"13px",
			color:"#607d8b",
		}
		if(this.state.display_status == 'seq-man'){
			return(
			<div style = {tabContainer}>
				<div style = {tabStyle} onClick = {() => {this.update_display('melt-pt')}}>Melting Point Calculator</div>
				<div style = {tabStyle} onClick = {() => {this.update_display('svs-comp')}}>Strand vs Strand Comparison</div>		
			</div>
				)
		}
		if(this.state.display_status == 'melt-pt'){
		  	return(
		  	<div style = {tabContainer}>
				<div style = {tabStyle} onClick = {() => {this.update_display('seq-man')}}>Sequence Analysis/Manipulator</div>
				<div style = {tabStyle} onClick = {() => {this.update_display('svs-comp')}}>Strand vs Strand Comparison</div>		
			</div>
				)	
		}
		else{
			return(
			<div style = {tabContainer}>
				<div style = {tabStyle} onClick = {() => {this.update_display('seq-man')}}>Sequence Analysis/Manipulator</div>
				<div style = {tabStyle} onClick = {() => {this.update_display('melt-pt')}}>Melting Point Calculator</div>
			</div>
				)
		}
	}

	render(){
		const backgroundstyle = {
			background:"rgba(255,255,255,.2)",
			padding:"50px 0px 50px 0px",
			verticalAlign:"top",
			minHeight:"100vh"
		}
		let headerStyle = {
			boxShadow:" 6px 9px 12px -4px rgba(0,0,0,0.56)",
			backgroundColor:"#546e7a",
			marginBottom:"0",
			padding:"35px",
			color:"white",
		}
		let bodyStyle = {
			boxShadow:" 6px 9px 12px -4px rgba(0,0,0,0.56)",
			padding:"25px",
			backgroundColor:"#eceff1",
		}

		return(
			<div style = {{overflow:"hidden",backgroundImage: 'url('+backgroundImage+')',backgroundSize:"100% 100%"}}>
				<div style = {{backgroundColor:"#292B2D",height:"40px",padding:"3px 0px 0px 75px",fontSize:"13px",width:"100%"}}> 
	
						<Link to="/" className = "hvr-grow" style = {{color:"#ff6600",display:"inline-block",cursor:"pointer"}}>
						
							<i style = {{textDecoration:"none",position:"relative",top:"6px",marginRight:"10px"}}className="material-icons">
								home
							</i>

							<span className = "hide-on-small-only">Optimizing Hybridization AnalYsis Of Nucleotides Program </span>
						
						</Link>
				</div>
				
				<div style = {backgroundstyle}>	
					<Row>
						<div className = "col s0 m1"></div>
						<div className = "col s12 m10">
							<h4 style = {headerStyle}>
								<i style = {{float:"left",margin:"-10px 20px 0px 0px"}}className=" medium material-icons">
									assignment
								</i>
								ANALYSIS & TOOLS

								<span className = "hide-on-med-and-down"style = {{color:"white",fontStyle:"italic",paddingLeft:"20px",fontSize:"13px"}}> 
									Analyze and manipulate your sequences. 
								</span>
							</h4>

							<div style = {bodyStyle}> 					

								{this.render_tab()}

								<div className = "z-depth-2" style = {{padding:"20px 15px 5px 15px"}}>	
									{this.render_display()}
								</div>
							</div>
						</div>
					</Row>
				</div>

				<FooterSection/>

			</div>
		  );
	}
}
						

