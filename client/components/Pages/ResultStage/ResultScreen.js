import React from "react";
import {Row,Input,Table} from 'react-materialize';
export default class ResultScreen extends React.Component {
	constructor()
	{
		super();
		this.handleDisplayUpdate = this.handleDisplayUpdate.bind(this);
		this.state = {
			fullAnalysisDisplay:0
		}
	}

	//

	loadprintscreen(){
		let printedStrandsContainerStyle = {
			fontFamily:"'Anaheim',serif",
			padding:"25px",
			fontWeight:"bold"
		}
    	let results = this.props.results[1];
		return (
			<div style = {printedStrandsContainerStyle}>
				<h6 style = {{textAlign:"center",textDecoration:"underline",marginBottom:"10px"}}>
					Strand Order [5' to 3']
				</h6>
				<div style = {{overflowWrap: "break-word"}}>
					<Table className = "responsive-table">
				        <thead>
				          <tr>
				              <th data-field="id">Name</th>
				              <th data-field="name">Sequence</th>
				          </tr>
				        </thead>
					    <tbody>
							{results.map(function(listValue,index){	
								let values = listValue.split(":");
								return     (<tr  key = {index} >
										      <td>{values[0]}</td>
										      <td style = {{fontFamily:"'Share Tech Mono',serif"}}>{values[1]}</td>
										    </tr>)
							})}
			        	</tbody>
			      	</Table>
			    </div>
			</div>
			)
	}

	//


	loadcomparescreen()
	{
		let resultsContainer = {
    		background:"rgba(255,255,255,.5)",
    		fontFamily:"'Share Tech Mono',serif", 
      		whiteSpace:"pre",
      	    overflowX:"scroll",
    	}
    	let bestArrangementStyle = {
    		height:"130px",
    		padding:"10px",
    	}
    	let allArrangementStyle = {
     		padding:"5px",
    		fontSize:"13px",
    	}
    	let bestarrangementItemStyle = {
    		display: "inline-block",
    		marginLeft: "50%",
    		transform: "translate(-50%, 0%)",
    		fontSize:"14px"
    	}

    	let result = this.props.results[1]
    	if(result.data != null)  
	 		return  (
			<div style = {resultsContainer}> 
				<div style = {bestArrangementStyle}>
					<div style = {{textDecoration:"underline",textAlign:"center",fontSize:"17px",padding:"5px"}}>
						Strongest Base Pairing Arrangement:  {result.name}
					</div>
					<div style = {bestarrangementItemStyle}>
						{result.data.bestArrangement}
					</div>

				</div>
	 			<div style = {allArrangementStyle }>
					<Table 
							stripped = {true} 
							bordered = {true}
							hoverable = {true}>
				        <thead>
				          <tr>
				              <th data-field="id">All Arrangements</th>
				          </tr>
				        </thead>
					    <tbody>
							{result.data.allArrangement.map(function(listValue,index){	
									return (<tr key = {index} >
										      <td>{listValue} </td>
										    </tr>
									)
							})}
			        	</tbody>
			      	</Table>
				</div>
			</div>
			)
		else
		{
			return(<div></div>)
		}
	}


	//

	handleDisplayUpdate(e)
	{
		this.setState({fullAnalysisDisplay:e.target.value});
	}

	loadfullanalysis()
	{
		let resultsContainer = {
      		fontFamily:"'Share Tech Mono',serif", 
      		whiteSpace:"pre",
      		marginTop:"-1px",
      		padding:"40px",

    	}
    	let bodyStyle = {
     		padding:"10px",
     	    overflow:"scroll"
    	}
    	let results = [];
    	let title = "";

    	if(this.props.results[1].comp_list.length > 0 && this.state.fullAnalysisDisplay == 0){ //components
    		title = "Components Analysis/Comparison"
    		results = this.props.results[1].comp_list;
    	}

    	if(this.props.results[1].full_list.length > 0 && this.state.fullAnalysisDisplay == 1){ //fullstrand
    		title = "Full Strands Analysis/Comparison";
    		results = this.props.results[1].full_list;
    	}

		return  (
			<div style = {resultsContainer}> 
				<div style = {{textAlign:"right"}}>
					<Row >
						<Input 		
							name="display" 
							value = {0} 
							defaultChecked={true}
							label = "Components Analysis" 
							type="radio"  
							onClick = {this.handleDisplayUpdate}
							 className='with-gap'
							/>   
						<Input 
							name="display" 
							value = {1} 
							label = "Full Strands Analysis" 
							type="radio"  
							 className='with-gap'
							onClick = {this.handleDisplayUpdate} 
						/>  
					</Row>
				</div>
	 
	 			<div style = {bodyStyle }>
					<Table 
							stripped = {true} 
							bordered = {true}
							hoverable = {true}>
					<thead>
			          <tr>
			              <th data-field="id">{title}</th>
			          </tr>
			        </thead>
					    <tbody style = {{fontSize:"15px"}}>
							{results.map(function(listValue,index){	
									return (<tr key = {index} >
										      <td>
										      {listValue.header+"\n"}
										      {listValue.result}
										      </td>
										    </tr>
									)
							})}
			        	</tbody>
			      	</Table>
				</div>
			</div>
			)

	}



	loadresults()
	{		
		let status = this.props.results[0];

		if(status == "PRINT")
			return this.loadprintscreen();
		if(status == "COMPARE")
			return this.loadcomparescreen();
		if(status == "FULLANALYSIS")
			return this.loadfullanalysis();
	}
	
	render()
	{
		return(
			<div> {this.loadresults()} </div>
		)
	}
}





