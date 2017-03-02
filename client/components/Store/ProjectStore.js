import { EventEmitter } from "events";
import Dispatcher from "../Dispatcher";
import axios from "axios";

class ProjectStore extends EventEmitter{
	constructor(){
		super();

		this.component_StrandList = [];
		this.full_StrandList = [];
		this.conditions = {Salt:"Na", Concentration:1.0};

		this.workspaceDisplay = "1";
		this.dataAnalysis_Results = ["",""];

		this.backendStatus = false;  // false = backend is not running any calculations, endtime
		this.sequencerPrompt = "ready";	
		this.sequencerTimeLimit = 0;
		this.compressedProjectData;
	}


//  Getter Methods


	getStrandComponents()
	{
		return this.component_StrandList;
	}
	getFullStrands()
	{
		return this.full_StrandList;
	}
	getWorkspaceDisplay()
	{
		return this.workspaceDisplay;
	}
	getJSONProjectData()
	{
		let data = JSON.stringify({C:this.conditions,CL:this.component_StrandList,FSL:this.full_StrandList}); 
		return data;
	}
	
	getBackendStatus()
	{
		return this.backendStatus;
	}
	 getSequencerPrompt()
 	{
 		return this.sequencerPrompt;
 	}
 	getSequencerTimeLimit()
 	{
 		return this.sequencerTimeLimit;
 	}
	getDataAnalysisResults()
	{
		return this.dataAnalysis_Results;
	}
// PROJECT SAVE/LOAD

	loadProject(data)
	{
		this.component_StrandList = data.CL;
		this.full_StrandList = data.FSL;
		this.conditions = data.C;
	}

// 

 	clearResults()
 	{
 		if(this.dataAnalysis_Results[0] == "COMPARE")
  			 this.dataAnalysis_Results = ["COMPARE",""];
 		else 
 			this.dataAnalysis_Results = ["",""];
 	}


//   COMPONENT LIST


	print_Component_StrandList()
	{
		try
		{
			let finalresults = [];
			for(let i = 0 ; i < this.component_StrandList.length; i ++)
			{
				let component = this.component_StrandList[i];
				finalresults.push(component.name + " : " + component.sequence);
				if(this.component_StrandList[i].complement == "true")
					finalresults.push(component.name + " ' : " + this.complement_Maker(component.sequence));
			}
			this.dataAnalysis_Results = ["PRINT",finalresults];
		}catch(e)
		{
			console.log(e);
		}
	}

	update_Component_StrandList(data)
	{
		//update component list
		this.component_StrandList = data.complist;
		this.emit("Change_Component_Strandlist");

		//if any full strands contain deleted component, delete full strand 
		let updatedfulllist = [];
		for(let i = 0 ; i < this.full_StrandList.length; i ++)
		{
			let checkpoint = true;
			for (let y = 0; y < this.full_StrandList[i].components.length; y++)
			{
				if(data.deletedlist.indexOf(this.full_StrandList[i].components[y]) > -1)
				{
					checkpoint = false;
					break;
				}
			}			
			if(checkpoint == true)
				updatedfulllist.push(this.full_StrandList[i]);
		}
		if(this.full_StrandList.length != updatedfulllist.length)
		{
			this.update_Full_StrandList(updatedfulllist);
			this.emit("Change_Full_Strandlist");	
		}
		this.sequencerPrompt = "ready";	
	}

	add_Component_StrandList(NewStrand)
	{
		this.component_StrandList.push(NewStrand);
		this.sequencerPrompt = "ready";	
	}	


//   FULL STRAND LIST


	update_Full_StrandList(StrandlistUpdate2)
	{
		this.full_StrandList = StrandlistUpdate2;
		this.sequencerPrompt = "ready";	
	}

	add_Full_StrandList(NewStrand)
	{
		this.full_StrandList.push(NewStrand);
		this.sequencerPrompt = "ready";	
	}

	print_Full_StrandList()
	{
		try
		{
			var finalresults = [];
			for(let i = 0 ; i < this.full_StrandList.length; i ++)
			{
				if(this.full_StrandList[i].fiveprime == "3' to 5'")
				{
					var display = this.full_StrandList[i].componentsDisplay.split(" - ").reverse();
					var components = this.fullStrandSequenceBuilder(display);
					display = display.join(" - ");

					finalresults.push(this.full_StrandList[i].name + " [ " + display + " ]:" + components);
				}
				else
				{
					finalresults.push(this.full_StrandList[i].name + " [ " + this.full_StrandList[i].componentsDisplay + " ]:" + this.fullStrandSequenceBuilder(this.full_StrandList[i].components));
				}
			}
			this.dataAnalysis_Results = ["PRINT",finalresults];
		}catch(e)
		{
			console.log(e);
		}
	}


 //   AXIOS POST METHODS
 
 	fullAnalysis()
 	{

		this.backendStatus = true;
		this.emit("Update_Backend_Status");

		try
		{
			let strandlistStoreReference = this;
	 		return axios.post('/DNASequenceProgram/CompareAll', {
	 			componentlist: this.component_StrandList,
	 			fullstrandlist: this.full_StrandList
	 		}).then(function(response){
	 			strandlistStoreReference.backendStatus = false;
				strandlistStoreReference.emit("Update_Backend_Status");

				strandlistStoreReference.dataAnalysis_Results = ["FULLANALYSIS",response.data.result1,response.data.result2];
				strandlistStoreReference.emit("Update_Results");	

	 		}).catch(function (error){
	 			strandlistStoreReference.backendStatus = false;
				strandlistStoreReference.emit("Update_Backend_Status");
	 			console.log(error);
	 		});
		}catch(e)
		{
			strandlistStoreReference.backendStatus = false;
			strandlistStoreReference.emit("Update_Backend_Status");
			console.log(e);
		}
 	}

	compareStrands(strandsToCompare)
	{
		try{
			var strandlistStoreReference = this;
			let name = strandsToCompare[0].name +" vs "+strandsToCompare[1].name;

			if(strandsToCompare[0].fiveprime ==  "3' to 5'")
				strandsToCompare[0].components.reverse();
			if(strandsToCompare[1].fiveprime ==  "3' to 5'")
				strandsToCompare[1].components.reverse();

			let strand1 = { 
				sequence:this.fullStrandSequenceBuilder(strandsToCompare[0].components),
				direction: strandsToCompare[0].fiveprime 
			}
			let strand2 = { 
				sequence:this.fullStrandSequenceBuilder(strandsToCompare[1].components),
				direction: strandsToCompare[1].fiveprime 
			}
			
			if(strandsToCompare[0].fiveprime ==  "3' to 5'")
				strandsToCompare[0].components.reverse();
			if(strandsToCompare[1].fiveprime ==  "3' to 5'")
				strandsToCompare[1].components.reverse();

			return axios.post('/DNASequenceProgram/Compare', {
				salt:this.conditions.Salt,
	 			concentration: this.conditions.Concentration ,
				strand1,strand2
	 		}).then(function(response){
	 			strandlistStoreReference.dataAnalysis_Results = ["COMPARE",response.data.data,name];
				strandlistStoreReference.emit("Update_Results");

	 		}).catch(function (error){
	 			console.log(error);
	 		});
		}catch(e)
		{
			console.log(e);
		}
	}


// Action Handler

	handleActions(action)
	{
		switch(action.type){
			case "OPEN_PROJECT":{
				this.loadProject(action.data);
				this.clearResults();	
				this.emit("Change_Component_Strandlist");
				this.emit("Change_Full_Strandlist");
				this.emit("Open_Project");
				break;
			}
//

			case "EDIT_WORKSPACE_DISPLAY": {
				this.workspaceDisplay = action.Display1;
				this.emit("Change_Workspace_Display");
				break;
			}
//
			case "UPDATE_BACKEND_STATUS":{
				this.backendStatus = action.status1;
 				this.emit("Update_Backend_Status");
				break;
			}
			case "SEQUENCE_STRANDLIST":{
				this.runSequencer(action.time);
				break;
			}
			case "FULL_ANALYSIS":{
				this.fullAnalysis();
				break;
			}
			case "COMPARE_STRANDS":{
				if(action.strands.length == 0)
				{
					this.dataAnalysis_Results = ["COMPARE",""];
					this.emit("Update_Results");
				}
				else
					this.compareStrands(action.strands);
				break;
			}

//
			case "CLEAR_RESULT":{
				this.clearResults();
				this.emit("Update_Results");
				break;
			}
//
			case "PRINT_COMPONENT_STRANDLIST":{
				this.print_Component_StrandList();
				this.emit("Update_Results");
				break;
			}
			case "ADD_COMPONENT_STRANDLIST" : {
				this.add_Component_StrandList(action.StrandAdd);
				this.emit("Change_Component_Strandlist");
				break;
			}
			case "UPDATE_COMPONENT_STRANDLIST" : {
				this.update_Component_StrandList(action.StrandlistUpdate);
				this.emit("Change_Component_Strandlist");
				break;
			}
//
			case "PRINT_FULL_STRANDLIST":{
				this.print_Full_StrandList();
				this.emit("Update_Results");
				break;
			}
			case "ADD_FULL_STRANDLIST" : {
				this.add_Full_StrandList(action.StrandAdd2);
				this.emit("Change_Full_Strandlist");
				break;
			}
			case "UPDATE_FULL_STRANDLIST" : {
				this.update_Full_StrandList(action.StrandlistUpdate2);
				this.emit("Change_Full_Strandlist");
				break;
			}

		}
	}


	// 		STRAND METHODS

	fullStrandSequenceBuilder(componentlist)
	{
		let finalresults = "";

		for (let h = 0 ; h < componentlist.length; h ++)
		{
			//account for complements
			let componentname = componentlist[h];
			let complement = false;
			
			if(componentname.includes("'"))
			{
				complement = true
				componentname = componentname.replace("'", "");
			}

			//find complement sequence and add it to 
			for(let g = 0 ; g < this.component_StrandList.length; g++)
			{

				if(componentname == this.component_StrandList[g].name)
				{
					if(complement == false)
					{
						finalresults = finalresults + this.component_StrandList[g].sequence
					}
					else
					{
						finalresults = finalresults + this.complement_Maker(this.component_StrandList[g].sequence);
					}
					break;
				}
			}
		}

		return finalresults;
	}



	// Utility functions
 	random_Sequence_Generator(length,blue)
 	{
 		var sequence = "";
 		var blueprint = blue.split("");
 		for(var i = 0; i < length;i ++)
 		{
			var random = Math.ceil(Math.random() * 4);
			if(blueprint[i] == 'A' || blueprint[i] == 'T'|| blueprint[i] == 'C'|| blueprint[i]=='G')
				sequence = sequence + blueprint[i];
			else if(random == 1)
				sequence = sequence + "A";
			else if(random == 2) 
				sequence = sequence + "T";
			 else if(random == 3)
				sequence = sequence + "C";
			else
				sequence = sequence + "G";
 		}
 		return sequence; 
 	}

 	complement_Maker(sequence){
		let input = sequence.split('');
		let comp = "";
		for(let i = 0 ; i < input.length ; i ++)
		{
			let string1 = input[i];
			if(string1.toUpperCase() == "A")
			{
				string1 = "T";
			}
			else if(string1.toUpperCase() == "T")
			{
				string1 = "A";
			}
			else if(string1.toUpperCase() == "C")
			{
				string1 = "G";
			}
			else if(string1.toUpperCase() == "G")
			{
				string1 = "C";
			}
			comp = comp + string1;
		}
		//reverse 
		let reverse = comp.split("").reverse();
		reverse = reverse.join("");
		return reverse;  // 5 prime to 3 prime complement
 	}
	//
}


const projectStore = new ProjectStore;
	
Dispatcher.register(projectStore.handleActions.bind(projectStore));

export default projectStore;



