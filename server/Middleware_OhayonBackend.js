import express from 'express';
import path from 'path';
import async from 'async';
import waterfall from 'async/waterfall';

import backend from './StrandAnalysis_OhayonBackend';


var AlgorithmRouter = express.Router();


AlgorithmRouter.post('/Compare',(req,res)=>{
	
	console.log("\n ** Comparison **\n");
	var s1 = req.body.strand1;
	var s2 = req.body.strand2;

	backend.compareStrands( s1,s2,function(err, data) {
    	res.json(data);
		res.end();

		if(err){
			res.send('Error During Comparison Calculations!');
			res.end();
		}
	});
});




AlgorithmRouter.post('/CompareAll',(req,res)=>{
	console.log("\n ** FullAnalysis **\n");

	var components =  req.body.componentlist;
	var fullstrands = req.body.fullstrandlist;

	backend.compareAllStrands( components, fullstrands , function(err, data) {
		res.json(data);
		res.end();
		if(err)
		{
			res.send('Error During Comparison Calculations!');
			res.end();
		}
	});
});


export default AlgorithmRouter;
		   		
