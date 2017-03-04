import React from "react";
import {Input,Button,Row} from 'react-materialize'

import StrandComponentsDisplay from './StrandComponentsDisplay';

//ACTION
import * as StrandAction from "../../Actions/StrandAction";

export default class StrandComponentInput extends React.Component {
 
	constructor()
	{
		super();
		this.handleName = this.handleName.bind(this);
		this.tokenprocessor = this.tokenprocessor.bind(this);
		this.handleSequence = this.handleSequence.bind(this);
		this.handleComplement = this.handleComplement.bind(this);
		this._handleKeyPress = this._handleKeyPress.bind(this);
		this.state = {	name: "", 
						complement: "true",
						sequence: "",


					};
	}

	//


	handleName(input)
	{
		this.setState({name : input.target.value});
	}

	handleSequence(input)
	{
		this.setState({sequence:input.target.value});
	}
	handleComplement(input) // true or false
	{
		this.setState({ complement : input.target.value });
	}
//

	validatesequence()
	{
		if(this.state.sequence.length == 0)
		{
			Materialize.toast("Unfufilled Requirement: Sequence contain at least one base!",4000);
			return "invalid"		
		}
		// check sequence (remove all - and spaces)
		let sequenceTemp = ""
		let bases = this.state.sequence.toUpperCase().split("");
		for(let x = 0; x<bases.length; x++)
		{
			if( (bases[x] == "O") )
				sequenceTemp = sequenceTemp + 'o';
			else if((bases[x] == "A") || 
				(bases[x] == "T") || 	
				(bases[x] == "C") || 
				(bases[x] == "G"))
				sequenceTemp = sequenceTemp + bases[x];

			else
			{
				Materialize.toast("Unfufilled Requirement: Sequence contains invalid character!",4000);
				return "invalid"
			}
		}
		return sequenceTemp;
	}
	validatename()
	{
		//check name contains requirements
		if( this.state.name.length > 30 || !/\S/.test(this.state.name) || this.state.name.includes("'") || this.state.name.includes("-"))
		{
			Materialize.toast("Unfufilled Requirement: Name field must contain 1-30 characters and not include restricted character: semicolon ( ' ) or dash ( - )!",4000);
			return false;
		}
		//check repeat name
		for(let i = 0; i < this.props.Component_list.length;i++)
		{
			if(this.props.Component_list[i].name.replace(/ /g,"") == this.state.name.replace(/ /g,""))
			{
				Materialize.toast("Unfufilled Requirement: Name already exists in Component List",4000);
				return false;
			}
		}	
		return true;
	}
//

	tokenprocessor()
	{
		let processSequence = this.validatesequence();

		if(!this.validatename() || processSequence == "invalid")
			return;
		Materialize.toast(this.state.name+" was added successfully",2000);
		StrandAction.Add_Component_StrandList(
			{	
				name: this.state.name, 
				complement: this.state.complement, 
				sequence: processSequence,
			}
		);
	}
//
	_handleKeyPress(input) 
	{
		if (input.key == 'Enter' && !this.props.status) 
			this.tokenprocessor();
	}
//

	renderButton()
	{
		if(!this.props.status)
			return(
				<Button 
					style = {{width:"150px" , marginTop:"5px"}}
					onClick = {this.tokenprocessor}> 
					Submit 
				</Button>
			);
		else
			return(	
				<Button 
					style = {{width:"150px" , marginTop:"5px"}}
					disabled
					onClick = {this.tokenprocessor}> 
					Submit 
				</Button>
				);
	}
	render()
	{
		let bodyStyle = {
			padding:"15px 15px 20px 15px",
			marginTop:"1px",
			color:"#37474f",
		}
		let headerStyle = {
			height:"20px",
			textAlign:"center",
			textDecoration:"underline",
			fontSize:"16px",
			color:"#37474f",
		}

		let inputcontainer = {
			margin:"10px",
			border:"solid 1px grey",
			background:"#cfd8dc",
			padding:"20px",
			textAlign:"center"

		}
		return(			
		<Row>
			<div className = " col s0 m1"></div>

			<div className = "animated fadeIn col s12 m10">			
				<div style = {headerStyle}> 
					<i style = {{position:"relative",top:"6px",marginRight:"10px"}}className="material-icons">input</i>	
					Strand Component Input
				</div>
				<div style = {bodyStyle}>
					<div style = {inputcontainer}>
						<Row>
							<Input 
								label = "Name"
								s = {10}
								type = "text"
								className="validate"
								onKeyPress={this._handleKeyPress} 
								onChange = {this.handleName} 
							/>

							<div name = "rad" className = "col s12 m6 l2">
								<p  style = {{color:"#9e9e9e",paddingLeft:"10px",whiteSpace:"nowrap",fontSize:"10px"}}> 
									Complement Exists:
								</p>
								<Input 					
									name="YesNo" 		
									defaultChecked = {(this.state.complement== "true")}  
									value={"true"}  
									type="radio"
									label = "Yes"
									onClick = {this.handleComplement} 
								/>
								<Input
									name="YesNo" 
									label = "No"
									value={"false"} 
									type="radio" 
									onClick = {this.handleComplement}
								/> 
							</div>
						</Row>

						<Input
							value = {this.state.sequence} 
							onKeyPress={this._handleKeyPress} 
							label = 'Sequence i.e. ATCGo ( "o": blank base):'
							s = {12}
							onChange = {this.handleSequence} 
						/>

						{this.renderButton()}
					</div>							
				</div>

				<StrandComponentsDisplay status = {this.props.status} Component_list = {this.props.Component_list}/>

			</div>
		</Row>
		);
	}


}
