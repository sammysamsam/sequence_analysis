import React from "react";
import { Link } from "react-router";
import FooterSection from '../Pages/FooterSection';
import Spinner from 'react-spinkit';
import {Row} from 'react-materialize';

export default class HomeLayout extends React.Component {
	render(){		

		let yoel = {
			minHeight:"615px",height:"90vh",
			width:"400px",
			float:"left"
		}
		let linkstyle = {
			paddingTop:"11px",
			color:"white" , 
			backgroundColor:"#ff7043",
			textAlign:"center",
			width:"270px",
			height:"60px",
			display:"inline-block",
			textDecoration:"none",
			border:"solid",
			borderColor:"white",
			borderWidth:"1px",
			borderRadius:"10px"
		}
		return(
			<div style = {{overflow:"hidden"}}>
				<div style = {{color:"#ff7043",backgroundColor:"#292B2D",height:"40px",padding:"2px 0px 0px 75px",margin:"0px",fontSize:"13px",width:"100%"}}> 
						<i style = {{position:"relative",top:"6px",marginRight:"10px"}}className="material-icons">
							account_circle
						</i>
						Optimizing Hybridization AnalYsis Of Nucleotides Program
				</div>

				<div style = {{backgroundColor:"#155151",minHeight:"615px",height:"90vh",width:"100%"}} > 

					<img style = {yoel} src={'http://bestanimations.com/Science/Biology/DNA/dna/dna-rna-chromosomes-double-helix-rotating-animated-gif-8.gif'} alt="YOEL" className="img-responsive"/>
					
					<div style = {{padding:"100px 0px 100px 20px",textAlign:"center"}} className= "animated fadeInUp" >

						<h1 style = {{color:"#ff7043",padding:"8px 20px 0px 20px"                   }}> 
							OHAYON
						</h1>
						<p style = {{color:"#ff7043",padding:"8px 20px 0px 20px"}}> 
							A user-friendly interface for analyzing existing sequences from single or multiple strand sets.  
						</p>
					</div>

					<div style = {{textAlign:"center"}}>
						 <div className= "animated fadeInUp" style = {{display:"inline-block",padding:"20px"}}> 
							
							<Link className = "z-depth-1 hvr-grow" style = {linkstyle} to = "Project/Workspace">
								<i style = {{position:"relative",top:"6px",marginRight:"10px"}} className="material-icons">
									lightbulb_outline
								</i>
								MULTI-STRAND ANALYSIS
							</Link>  
						</div> 	

						 <div className= "animated fadeInUp" style = {{display:"inline-block",padding:"20px"}}> 
						 	<Link className = " z-depth-1 hvr-grow"  style = {linkstyle} to = "QuickAnalysis">
							 	<i style = {{position:"relative",top:"6px",marginRight:"10px"}}className="material-icons">
							 		polymer
							 	</i>
							  	QUICK ANALYSIS
							</Link>	
						</div>
					</div>

				</div>

				<FooterSection/>
			</div>

		);
	}
}