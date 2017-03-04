import React from "react";
import ResultScreen from "./ResultScreen";
import Select from 'react-select';
import {Button,Row} from 'react-materialize';

//ACTION
import * as StrandAction from "../../Actions/StrandAction";

export default class StrandComparison extends React.Component {
	constructor()
	{
		super();
		this.deletecomparelist1 = this.deletecomparelist.bind(this,1);
		this.deletecomparelist2 = this.deletecomparelist.bind(this,2);
		this.callcomparelist = this.callcomparelist.bind(this);
		this.addComponentsToComparelist = this.addComponentsToComparelist.bind(this);
		this.addFullStrandToComparelist = this.addFullStrandToComparelist.bind(this);

		this.state = {
			comparelist:[],
		}
	}
	//

	addComponentsToComparelist(e)
	{
		StrandAction.ClearResults();		

		if(this.state.comparelist.length != 2){
			var temp = this.state.comparelist;
			temp.push( {name:e.label, components:e.value,fiveprime:"5' to 3'"} );		
			this.setState({comparelist : temp});
		}
	}
	addFullStrandToComparelist(e)
	{
		StrandAction.ClearResults();		

		if(this.state.comparelist.length != 2){
			var temp = this.state.comparelist;
			temp.push( {name:e.label, components:e.value.components,fiveprime: e.value.fiveprime} );		
			this.setState({comparelist : temp});
		}
	}
	//

	callcomparelist()
	{
		StrandAction.ClearResults();

		if(this.state.comparelist.length > 2 || this.state.comparelist.length == 0 )
			Materialize.toast("Please Select 1 or 2 Strands to Compare",2000);
		else 
		{
			if(this.state.comparelist.length == 1 )
				this.state.comparelist.push(this.state.comparelist[0]);
			StrandAction.CompareStrands(this.state.comparelist);
		}
	}
	//


	deletecomparelist(f)
	{
		StrandAction.ClearResults();		
		if(this.state.comparelist.length == 1){
			this.setState({comparelist:[]});
		}
		if(this.state.comparelist.length == 2){
			if(f == 1)
			{
				var a = this.state.comparelist[1];
				this.setState({comparelist:[a]});
			}
			if(f == 2)
			{
				var b = this.state.comparelist[0]
				this.setState({comparelist:[b]});
			}
		}
	}
	//


	componentsListProcessor()
	{
		let strandlist = [];
		for(let i = 0; i < this.props.componentlist.length;i ++)
		{
			let name = this.props.componentlist[i].name;
			strandlist.push({value:[name ],label:name});
			if(this.props.componentlist[i].complement){
				strandlist.push({value:[name +"'"],label:name+"'"});
			}
		}
		return strandlist;
	}

	fullStrandListProcessor()
	{ 
		let strandlist = [];
		for(let i = 0; i < this.props.fulllist.length;i ++)
		{
			let fullstrand = this.props.fulllist[i];
			strandlist.push({ value:fullstrand , label:fullstrand.name});
		}
		return strandlist;
	}


	//

	loadComparisonSet()
	{
		let clearButttonStyle = {
			verticalAlign:"top",
			margin:"0px 0px 0px 10px",
			fontSize:"10px",
			cursor:"pointer",
			width:"30px",
			textAlign:"center",
			height:"45px",
			color:"#ffa366"
		}

		if(this.state.comparelist.length == 1){
			return 	(
			<div style = {{display:"inline-block",margin:"-10px 0px 0px 15px"}}>
				<div className = "chip"> 
					<span  style = {{fontSize:"16px"}} >{this.state.comparelist[0].name} </span>
					<span className="hvr-grow" style = {clearButttonStyle} onClick = {this.deletecomparelist1}> 
						[clear]
					</span>
				</div>
			</div>
			)
		}
		if(this.state.comparelist.length == 2)
		{
			return(
				<div style = {{display:"inline-block",margin:"-10px 0px 0px 15px"}}>
					<div className = "chip"> 
						<span  style = {{fontSize:"16px"}} >{this.state.comparelist[0].name}</span>
						<span className="hvr-grow" style = {clearButttonStyle} onClick = {this.deletecomparelist1}> 
							[clear]
						</span>	
					</div>
					<span style = {{display:"inline-block",marginLeft:"10px",marginRight:"10px"}}> 
					vs 
					</span>
					
					<div className = "chip"  style = {{fontSize:"12px"}}> 
						<span  style = {{fontSize:"16px"}} > {this.state.comparelist[1].name} </span>
						<span className="hvr-grow" style = {clearButttonStyle} onClick = {this.deletecomparelist2}> 
							[clear]
						</span>
					</div>
				</div>
				)
		}
	}
	renderCompareWorkspace()
	{
		let strandsToCompareStyle = {
 	 		height:"75px",
 	 		padding:"25px 0px 5px 20px",
 	 		fontSize:"16px",
 	 		color:"#333333",
 	 	}
		let compareWorkspaceStyle = {
			background:"rgba(217, 217, 217,.95)",
			boxShadow:" 9px 0px 12px -4px rgba(0,0,0,0.56)"	,
			padding:"0px 20px 20px 20px"
		}
		let resultSectionStyle = {

		}

		return(
		<div>
			<div style = {compareWorkspaceStyle}>

 	 			<div style={strandsToCompareStyle}> 
					Select 1 or 2 Strands:
					{this.loadComparisonSet()}

				</div>
				<Row>
			 		<div className = "col s12 m6" >
			 			<Select 
			 				placeholder="Add Strand Component"
			 				name="form-field-name" 
			 				options={this.componentsListProcessor()}	
			 				onChange = {this.addComponentsToComparelist} 
			 			/>
					</div>
					
			 		<div className = "col s12 m6" >						
				 		<Select
						 	placeholder="Add Full Strand" 
							name="form-field-name" 
							options={this.fullStrandListProcessor()}	
							onChange = {this.addFullStrandToComparelist} 
						/>
					</div>
				</Row>
				<div style = {{width:"125px",margin:"auto"}}>
				<Button 
					style = {{fontSize:"11px"}}
					onClick = {this.callcomparelist}> 
					Compare
				</Button>
				</div>
			</div>

			<div style={resultSectionStyle}> 
 				<ResultScreen list = {this.state.comparelist} results = {this.props.results}/>
			</div>
		</div>
		)
	}


	render(){
		if(this.props.status)
		{
			return (
				<div> 
				</div>
			)
		}
		if(this.props.results[0] == "COMPARE")
			return this.renderCompareWorkspace();

		return(					
 			<ResultScreen list = {this.state.comparelist} results = {this.props.results}/>
			)
	}
}


