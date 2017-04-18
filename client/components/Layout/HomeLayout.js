import React from "react";
import { Link } from "react-router";
import FooterSection from '../Pages/FooterSection';
import {Row} from 'react-materialize';

export default class HomeLayout extends React.Component {
	render(){		
		let yoel = {
			minHeight:"635px",
			height:"92vh",
		}
		let linkstyle = {
			color:"#67dbdb" , 
			border:"solid 1px #1f8484",
			textDecoration:"none",
			marginTop:"10px",
			padding:"11px 30px 15px 30px",
		}
		return(
			<div style = {{backgroundColor:"#292B2D"}}>
				<div style = {{color:"#ff7043",backgroundColor:"#292B2D",height:"40px",padding:"2px 0px 0px 75px",margin:"0px",fontSize:"13px",width:"100%"}}> 
						<i style = {{position:"relative",top:"6px",marginRight:"10px"}}className="material-icons">
							account_circle
						</i>

						<span className = "hide-on-small-only">
							Optimizing Hybridization AnalYsis Of Nucleotides Program
						</span>
				</div>

				<div style = {{backgroundColor:"#155151",minHeight:"90vh"}} > 
					<Row>
						<div className = "hide-on-small-only col m6 l4" style = {{padding:"0"}}>
							<img style = {yoel} src={'http://bestanimations.com/Science/Biology/DNA/dna/dna-rna-chromosomes-double-helix-rotating-animated-gif-8.gif'} alt="YOEL" className = "img-responsive"/>
						</div>

						<div className = "col s12 m6 l8">
							<div style = {{padding:"25vh 0px 50px 0px",textAlign:"center"}} className= "animated fadeIn row" >

								<h1 style = {{color:"#c3f7f7"}}> 
									OHAYON
								</h1>

								<div style = {{color:"#c3f7f7",padding:"12px 20px 0px 20px",fontSize:"18px"}}> 
									A user-friendly interface for analyzing and comparing sequences from single or multiple DNA strand sets.  
								</div>
							</div>

							<div className = "row" style = {{textAlign:"center", padding:"0px 60px 0px 60px"}}>
								<div className= "animated fadeInUp col m12 l4 offset-l2"> 
									
									<Link className = "hvr-grow" style = {linkstyle} to = "Project/Workspace">
										<i style = {{position:"relative",top:"6px",marginRight:"10px"}} className="material-icons">
											lightbulb_outline
										</i>

										MULTI-STRAND ANALYSIS

									</Link>  
								</div> 	

								 <div className= "animated fadeInUp col m12 l4"> 
								 	<Link className = "hvr-grow"  style = {linkstyle} to = "QuickAnalysis">
									 	<i style = {{position:"relative",top:"6px",marginRight:"10px"}}className="material-icons">
									 		polymer
									 	</i>

									  	QUICK ANALYSIS

									</Link>	
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
