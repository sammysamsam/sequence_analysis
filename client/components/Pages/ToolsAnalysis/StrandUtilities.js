import React from "react";
import {Input,Row} from 'react-materialize';
export default class StrandUtilities extends React.Component {

	constructor()
	{
		super();
		this.handleinput = this.handleinput.bind(this)
		this.outputpicker = this.outputpicker.bind(this)

		this.state = {
					output:"", 
					input:"", 
					conversiontype:"comp",
				};
	}
	handleinput(input)
	{
		let sequence = input.target.value;
		this.setState({input:sequence});
	}
	outputpicker(input)
	{
		this.setState({conversiontype:input.target.value});
	}
	complementmaker(e)
	{
		let input = e.split('');
		let comp = "";
		for(let i = 0 ; i < input.length ; i ++)
		{
			let string1 = input[i];
			if(string1.toUpperCase() == "A")
				string1 = "T";
			else if(string1.toUpperCase() == "T")
				string1 = "A";
			else if(string1.toUpperCase() == "C")
				string1 = "G";
			else if(string1.toUpperCase() == "G")
				string1 = "C";
			comp = comp + string1;
		}
		return comp
	}
	reversemaker(e)
	{

		let reverse = e.split("").reverse();
		reverse = reverse.join("");
		return reverse
	}

	AT_CG_content(e)
	{
		let AT = 0
		let GC = 0
		if(e == "")
			return [0,0]
		for(let i = 0 ; i < e.length; i ++)
		{	
			let string1 = e[i];
			if((string1.toUpperCase() == "A") || (string1.toUpperCase() == "T" ))
				AT ++
			if((string1.toUpperCase() == "C") || (string1.toUpperCase() == "G" ))
				GC ++
		}	
		
		AT = ((AT/e.length)*100).toFixed(2)
		GC = ((GC/e.length)*100).toFixed(2)
		return [AT,GC]
	}

	palindromeFinder(str){
		var i, j, result = [];

		for (i = 0; i < str.length; i++) {
		    for (j = i + 3; j < str.length + 1; j++) {
		        let curr_substring = str.slice(i, j)
		    	if (curr_substring == this.reversemaker(this.complementmaker(curr_substring)))
		    		result.push(curr_substring)
		    }
		}
		return result;
	}
	//  RENDER METHODS

	renderPercentage(){
		let content = this.AT_CG_content(this.state.input)

		let labelStyle = {
			padding:"10px",
			fontFamily: "'Anaheim', serif " ,
			fontSize:"12px",
			color:"#9e9e9e"
		}
		return(
			<div style = {labelStyle} className = "col s12"> 
				GC content: {content[0]}% <br/> AT content: {content[1]}%
			</div>
			)
	}

	renderPalindromes(){
		if (this.state.input.length < 3)
			return (<div>No Palindromes Present</div>)
		let palindromeList = this.palindromeFinder(this.state.input)
		return(
			<div> {palindromeList.toString()} </div>
			)
	}

	renderPolyPurine(bases){
		let highlightedBase = {
			color:"red"
		}

		let prev_type = ""
		let poly_array = []
		let count = 0
		for(let i = 0; i < bases.length;i++){
		
			let b = bases[i]
			if((b == 'A' && prev_type != 'A') || (b == 'G' && prev_type != 'G')){
				count = 1
			}

			if( b == "A" && prev_type =="A"){
				count++
				if(count == 4)
				{
					poly_array.push(i)
					poly_array.push(i-1)
					poly_array.push(i-2)
					poly_array.push(i-3)
				}
				if(count > 4)
					poly_array.push(i)
			}

			if( b == "G" && prev_type =="G" )
			{
				count++
				if(count == 3)
				{
					poly_array.push(i)
					poly_array.push(i-1)
					poly_array.push(i-2)
				}
				if(count>3)
					poly_array.push(i)
			}

			prev_type = b

		}
		return (bases.map((base,index) => {
			if(poly_array.includes(index))
				return(<span id = {index} style = {highlightedBase}>{base}</span>)
			else
				return (<span id = {index} >{base}</span>)
		}))
	}
	renderAlternatingPP(bases){
		let highlightedBase = {
			color:"red"
		}

		let prev_type = ""
		let alt_array = []
		let count = 0
		for(let i = 0; i < bases.length;i++){
		
			let b = bases[i]
			let curr_type

			if(b == "A" || b == 'G')
				curr_type = 'purine'
			if(b == 'T' || b == 'C')
				curr_type = 'pyrimidine'

			if ( (curr_type == 'purine' && prev_type == 'pyrimidine') || (curr_type == 'pyrimidine' && prev_type == 'purine') )
			{

				count++
				if(count == 6)
				{
					alt_array.push(i)
					alt_array.push(i-1)
					alt_array.push(i-2)
					alt_array.push(i-3)
					alt_array.push(i-4)
					alt_array.push(i-5)					
				}
				if(count > 6)
					alt_array.push(i)					
			}
			else{
				count = 1
			}
			prev_type = curr_type

		}
		return (bases.map((base,index) => {
			if(alt_array.includes(index))
				return(<span key = {index} style = {highlightedBase}>{base}</span>)
			else
				return (<span key = {index} >{base}</span>)
		}))
	}
	renderOutput(){
		if(this.state.conversiontype == 'comp')
			return (this.complementmaker(this.state.input))

		if(this.state.conversiontype == 'rev')
			return (this.reversemaker(this.state.input))

		if(this.state.conversiontype == 'palin')
			return (this.renderPalindromes())

		let bases = this.state.input.split("")

		if(this.state.conversiontype == 'poly')
			return (this.renderPolyPurine(bases))

		if(this.state.conversiontype == 'alt')	
			return (this.renderAlternatingPP(bases))


	}


	render(){
		let bodyStyle = { 
		    padding:"25px",
		    backgroundColor:"#eceff1"
		}
		let labelStyle = {
			padding:"10px",
			fontFamily: "'Anaheim', serif " , 

		}
			return (
				<div style = {bodyStyle}>
				<Row>
					<Input
						s={12}
						value = {this.state.blueprint} 
						label="Strand Sequence (i.e.) ATCG"
						type = "text"
						onChange = {this.handleinput}
					/>
					{this.renderPercentage()}
					<div style = {labelStyle} className = "col s12"> 
						<Input 					
							name="comp/rev" 		
							defaultChecked = {false} 
							value="rev"  
							type="radio"
							label = "Reverse"
							onClick = {this.outputpicker} 
						/>
						<Input 					
							name="comp/rev" 		
							defaultChecked = {true} 
							value="comp" 
							type="radio"
							label = "Complement"
							onClick = {this.outputpicker} 
						/>
						<Input 					
							name="comp/rev" 		
							defaultChecked = {false}
							value="palin"  
							type="radio"
							label = "Palindrome"
							onClick = {this.outputpicker} 
						/>
						<Input 					
							name="comp/rev" 		
							defaultChecked = {false} 
							value="poly"  
							type="radio"
							label = "Highlight Poly-Purine"
							onClick = {this.outputpicker} 
						/>
						<Input 					
							name="comp/rev" 		
							defaultChecked = {false}
							value="alt"  
							type="radio"
							label = "Highlight Alternating Purine-Pyrimidine"
							onClick = {this.outputpicker} 
						/>

					</div>

					<div className = "col s12" style = {{background:"rgba(0, 0, 0,.15)",padding:"15px",minHeight:"250px",overflowWrap:"break-word",fontSize:"19px"}}> 
						{this.renderOutput()}
					</div>
				</Row>
				</div>

			)
	}
}