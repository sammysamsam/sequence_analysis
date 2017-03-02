import express from 'express';
import path from 'path';
import java from 'java';
import async from 'async';
import waterfall from 'async/waterfall';

var AlgorithmRouter = express.Router();


AlgorithmRouter.post('/Compare',(req,res)=>{
	
	console.log("Comparison");
	//instanciate node-java and get Middleware

	java.classpath.push(path.resolve(__dirname, './java'));
	java.import('OhayonMiddleware');
	var middleware = java.newInstanceSync("OhayonMiddleware");			
	var strand1 = req.body.strand1;
	var strand2 = req.body.strand2;

	let direction1 = false;
	let direction2 = false;
	if(strand1.direction == "loop")
		direction1 = true;
	if(strand2.direction == "loop")
		direction2 = true;

	middleware.compareStrands( strand1.sequence , direction1, strand2.sequence, direction2 ,function(err, data) {
    	res.json({data:data});
		res.end();
	
		if(err)
		{
			res.send('Error During Comparison Calculations!');
			res.end();
		}
	});

});

AlgorithmRouter.post('/CompareAll',(req,res)=>{
	console.log("Full Analysis");
	res.setTimeout(60000*(10), function(){
    	console.log('Request has timed out.');
        res.send(408);
    });
	//instanciate node-java and get Middleware

	java.classpath.push(path.resolve(__dirname, './java'));
	java.import('OhayonMiddleware');
	var middleware = java.newInstanceSync("OhayonMiddleware");	

	var components =  processComponents(req.body.componentlist);
	var fullstrands = processFullStrands(req.body.fullstrandlist);
	

	let data =  middleware.compareAll( components, fullstrands ,function(err, data) {
		res.json({ result1 : data[0] , result2 : data[1] });
		res.end();
		if(err)
		{
			res.send('Error During Comparison Calculations!');
			res.end();
		}
	});
});




//


var processComponents = function(componentData){//name,length,complement,mismatch,self,blueprint,meltingpoint
	var list = java.newInstanceSync("java.util.ArrayList");
	for(var i = 0; i < componentData.length; i ++)
	{
		var parsedData = java.newArray("java.lang.String", 
						[componentData[i].name,
						String(componentData[i].complement),
						componentData[i].sequence,]
					);
		list.addSync(parsedData);
	}
	return list;
}

var processFullStrands = function(fullStrandData){ //components,name,fiveprime,componentsDisplay
	var list = java.newInstanceSync("java.util.ArrayList");
	for(var i = 0; i < fullStrandData.length; i ++)
	{
		//add name to end of component list
		let data = fullStrandData[i];
		if(data.fiveprime == "3' to 5'")
			data.components.reverse();

		let unparsedData = data.components;
		unparsedData.push(data.name)
		unparsedData.push(data.fiveprime);

		//add this string[] to arraylist
		var parsedData = java.newArray("java.lang.String",unparsedData );
		list.addSync(parsedData);
	}
	return list;
}




export default AlgorithmRouter;
		   		
