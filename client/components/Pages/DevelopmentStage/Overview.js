import React from "react";
import {Input,Row,Button} from 'react-materialize';

//ACTION
import * as StrandAction from "../../Actions/StrandAction";

export default class Overview extends React.Component {

	printComponentList()		
	{	
		let componentList = "";		

		if(this.props.complist.length > 0){
			componentList = this.props.complist[0].name;

			for(let i = 1;i < this.props.complist.length; i++)
			{
				componentList = componentList+" , "+ this.props.complist[i].name;
			}
		}
		return(<span style = {{fontSize:"17px"}}>{componentList}</span>)
	}

	printStrandList()
	{
		return this.props.strandlist.map(function(listValue,index){
			
			let data = listValue.name + " [ "+listValue.componentsDisplay + " ] ";
			let number =  index +"."
			return( 
				<div key = {listValue.name + "-fullstrand"} >
					<span style = {{display:"inline-block",color:"#e3e4e5",fontSize:"9px",paddingRight:"8px"}}>
						{number}
					</span>
					<h6 style = {{width:"380px",textOverflow:"ellipsis",display:"inline-block"}}> 
						{data}
					</h6>
				</div>
			)
		})
	}


	render()
	{

		const bodyStyle = {
			background:"#cfd8dc",
			padding:"12px 30px 15px 30px",
			marginTop:"1px"
		}
		const headerStyle = {
			color:"#37474f",
			background:"rgba(139, 179, 218,0.5)",
			padding:"10px 0px 0px 30px",
			height:"53px",
			fontSize:"16px"
		}

		const componentPosition = {
			display:"inline-block",
			marginLeft:"3%",
			minWidth:"448px",
			width:"45%"
		}
		const fullStrandPosition = {
			display:"inline-block",
			verticalAlign:"top",
			marginLeft:"3%",
			minWidth:"448px",
			width:"45%"
		}


		return(
			<Row>

				<div className= "animated fadeInUp col s12 m12 l6">
					<div style = {headerStyle}> 
						<i style = {{position:"relative",top:"6px",marginRight:"10px"}}className="material-icons">toc</i>
						Strand Component Overview: 
					</div>						
					<div style = {bodyStyle}>
						<h6 > 
							Number of Components: {this.props.complist.length}
						</h6>
						<h6 style = {{paddingTop:"5px",paddingBottom:"10px"}}> 
							Components: 
						</h6>
						<div style = {{height:"450px",overflow:"auto",background:"#dce2e5" ,padding:"20px"}}> 
							{this.printComponentList()} 
						</div>
					</div>
				</div>

				<div className= "animated fadeInUp col s12 m12 l6">
					<div style = {headerStyle}> 
						<i style = {{position:"relative",top:"6px",marginRight:"10px"}}className="material-icons">toc</i>
						Full Strand Overview:
					</div>		
					<div style = {bodyStyle}>
						
						<h6 > 
							Number of Strands: {this.props.strandlist.length} 
						</h6>

						<h6 style = {{paddingTop:"5px",paddingBottom:"10px"}}> 
							Strands: 
						</h6>

						<div style = {{height:"450px",overflow:"auto",background:"#dce2e5",padding:"20px"}}> 
							{this.printStrandList()} 
						</div>			
					</div>
				</div>

			</Row>
		)
	}
}