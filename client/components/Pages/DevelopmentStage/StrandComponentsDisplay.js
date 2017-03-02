import React from "react";
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';


//ACTION
import * as StrandAction from "../../Actions/StrandAction";


export default class StrandComponentsDisplay extends React.Component {
	constructor()
	{
		super();
		this.updateStoreComponentList = this.updateStoreComponentList.bind(this);
	}
	updateStoreComponentList(deletedStrands)
	{
		let newList = [];
		for(let i = 0;i<this.props.Component_list.length;i++)
		{
			if(deletedStrands.indexOf(this.props.Component_list[i].name) == -1)
				newList.push(this.props.Component_list[i]);
		}
		StrandAction.Update_Component_Strandlist({complist:newList,deletedlist:deletedStrands});
	}

/*
	// table methods
	onAfterSaveCell(row, cellName, cellValue) {

	}
	onBeforeSaveCell(row, cellName, cellValue) {

	  return true;
	}

	//
*/
	render()
	{
		//  inline styles

		let tableHeaderStyle = {
			 color:"#757575",
			 textAlign:"center",
			 fontSize:"13px"
		}

		let tableBodyStyle ={
			height:"557px",
			paddingTop:"20px",
			marginTop:"1px"
		}
		
		//
		let selectRowProp = {
  			mode: "checkbox",
  			clickToSelect: true,
  			bgColor: "rgb(238, 193, 213)",
		}
		/*
		const cellEditProp = {
		  mode: 'click',
		  blurToSave: true,
		  beforeSaveCell: this.onBeforeSaveCell, // a hook for before saving cell
		  afterSaveCell: this.onAfterSaveCell  // a hook for after saving cell
		};

		//cellEdit={ cellEditProp }
		*/
		//

		return(
				<div>
 					<div style = {tableHeaderStyle}>  
 						<i style = {{position:"relative",top:"6px",marginRight:"10px"}}className="material-icons">view_quilt</i>
						Strand Components Table
					</div>
  					
  					<div style = { tableBodyStyle}>
						<BootstrapTable  
  							tableStyle = {{backgroundColor:"#f2f4f7",opacity:".95"}}	
  							data={this.props.Component_list}   
  							height="405px"
  							condensed = {true} 
  							pagination={true} 
  							striped={true} 
  							deleteRow={!this.props.status}
  							selectRow={selectRowProp}	
  							options={{onDeleteRow: this.updateStoreComponentList}} >
    			    
	    			    	<TableHeaderColumn 
	    			    		dataField="name" 
	    			    		isKey={true} 
	    			    		width = "200px"
	    			    		>
	    			    		Name
	    			    	</TableHeaderColumn>


	 			    		<TableHeaderColumn width = "110px" dataField="complement"> 
	 			    			Complement 
	 			    		</TableHeaderColumn>

 	 						<TableHeaderColumn 
	   			    			dataField="sequence"  
	   			    			>
	   			    			Sequence
	   			    		</TableHeaderColumn>						

 						</BootstrapTable>
 					</div>

				</div>
		)
	}
}
