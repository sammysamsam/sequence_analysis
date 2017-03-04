
exports.compareStrands = function(strand1, strand2, callback)
{
	try{
		var result = []
		if (strand1.loop)
			strand1.sequence = strand1.sequence+strand1.sequence
		if (strand2.loop)
			strand2.sequence = strand2.sequence+strand1.sequence
		var result = mismatch(strand1, strand2, 4)

		//console.log(result.bestArrangement)
		//console.log(result.allArrangement.toString())
		callback(null,result)
	}catch(e){
		callback(e,null)
	}
}

exports.compareAllStrands = function(components, fullStrand, callback)
{
	try
	{
		//component vs component
		var componentResult = []
		for(var x = 0; x < components.length;x++)
		{
			for(var y = x; y <components.length;y++)
			{
				componentResult.push({
					header: (components[x].name + " vs " + components[y].name),
					result: mismatch(components[x],components[y]).bestArrangement
				})
			}
		}
		//full strand vs full strand
		var fullStrandResult = []
		for(var x = 0 ; x < fullStrand.length ; x++)
		{
			var fs1 = fullStrand[x]
			
			if(fs1.fiveprime == "3' to 5'")
				fs1.components = fs1.components.reverse()
			var seq = combine(components,fs1.components)

			if(fs1.fiveprime == "loop" && seq.length > 4)
				seq = seq + seq.substring(0,4)
			
			for(var y = x ; y < fullStrand.length ; y++)
			{

				var fs2 = fullStrand[y]
				if(fs2.fiveprime == "3' to 5'")
					fs2.components = fs2.components.reverse()
				var seq2 = combine(components,fs2.components)



				if(fs2.fiveprime == "loop" && seq2.length > 4)
					seq2 = seq2 + seq2.substring(0,4)

				fullStrandResult.push({
					header: (fs1.name + " vs " + fs2.name),
					result: mismatch( 
									  {name: fs1, sequence:seq, fiveprime:true},
									  {name: fs2, sequence:seq2, fiveprime:true}
									).bestArrangement
				})			

				//console.log(mismatch({name: fs1, sequence:seq, fiveprime:true},{name: fs2, sequence:seq2, fiveprime:true}).bestArrangement)				
			}
		}
		callback(null,{comp:componentResult, full: fullStrandResult})
	}
	catch(e)
	{
		callback(e,null)
	}

}


var combine = function(components, recipe)
{
	var combined_seq = ""
	for (var x = 0; x < recipe.length;x++)
	{
		var ingredient = recipe[x]
		for(var i = 0; i < components.length;i++)
		{
			var comp = components[i]

			//console.log("compname "+comp.name)
			//console.log("ingredient "+ingredient)
			if(comp.name == ingredient)
			{
				//always 5 prime
				if(comp.fiveprime == false)
					comp.sequence = comp.sequence.split("").reverse().join("");
				combined_seq += comp.sequence
				break;
			}
			if(comp.name+"'" == ingredient)
			{
				if(comp.fiveprime == false)
					comp.sequence = comp.sequence.split("").reverse().join("");
				combined_seq += complementmaker(comp.sequence)
				break;
			}
		}
	}
	return combined_seq
}




var mismatch = function(strand1, strand2, hitlimit){
	if(!strand1.fiveprime)
		strand1.sequence = strand1.sequence.split("").reverse().join("");
	if(strand2.fiveprime)
		strand2.sequence = strand2.sequence.split("").reverse().join("");
	
	var s1_len = strand1.sequence.length
	var s2_len = strand2.sequence.length
	var results_print_form = []
	var shiftA_best = []
	var shiftB = []

	for(var i = 4; i < s1_len+s2_len; i ++)
	{
		var shiftedbasearray = baseArrayMaker(strand1,strand2,i)
		var shiftA = shiftedbasearray[0]
		var shiftB = shiftedbasearray[1]
		var full_length = s1_len+s2_len*2
		var consecCounter = 0
		var hitScore = 0
		var highestscore = 0
		var singleMismatch = false
		for(var k = s2_len-1; k < s1_len+s2_len+1; k++)
		{
			if (canPair(shiftA[k],shiftB[k]))
			{
				consecCounter++
			}
			else
			{
				if(  singleMismatch == false &&
						k+2 < full_length && k-2 >= 0 &&
						canPair( shiftB[k - 2], shiftA[k - 2] ) && 
                        canPair( shiftB[k + 2], shiftA[k + 2] ) && 
                        canPair( shiftB[k - 1], shiftA[k - 1] ) && 
                        canPair( shiftB[k + 1], shiftA[k + 1] ) && 
                        consecCounter > 0)
				{
					singleMismatch = true
				}else{
					if(singleMismatch)
					{
						consecCounter --;
						singleMismatch = false;
					}
					if(consecCounter >= hitlimit)
						hitScore++
					if(consecCounter > hitlimit)
						hitScore = hitScore + (consecCounter - hitlimit)
					consecCounter = 0
				}
			}
		}
		results_print_form.push(bestHitStringMaker(strand1, strand2, shiftA,shiftB))

		if ((highestscore < hitScore) || i == 4)
		{
			highestscore = hitScore
			shiftA_best = shiftA
			shiftB = shiftB
		}
		//console.log(shiftA_best.toString())
		//console.log(shiftB.toString())
	}	
	return { 	bestArrangement:bestHitStringMaker(strand1,strand2,shiftA_best, shiftB), 
				allArrangement:results_print_form
			};
}


var baseArrayMaker = function(s1 ,s2 ,shift_len)
{
	var shift1 = []
	var shift2 = []
	var s1_len = s1.sequence.length
	var s2_len = s2.sequence.length

	for(var w = 0; w < s1_len+(s2_len*2);w++)
	{
		if(w >= shift_len && w < s2_len+shift_len)
			shift1.push(s2.sequence[w-shift_len])
		else
			shift1.push('o')

		if(w >= s2_len && w < s1_len+s2_len)
			shift2.push(s1.sequence[w-s2_len])
		else
			shift2.push('o')
	}
	return [shift1,shift2]
}


/////


var canPair = function(a_,b_)
{
	if((a_ == 'A' && b_ == 'T')||(a_ =='T' && b_ =='A'))
		return true
	if((a_ =='G' && b_ =='C')||(a_ =='C' && b_ =='G'))
		return true
	return false
}
var nonBase = function(b)
{
	if(b != 'A'||b != 'T'||b != 'C'||b != 'G')
		return false
	return true
}

var complementmaker = function(e)
{
	var input = e.split('');
	var comp = "";
	for(var i = 0 ; i < input.length ; i ++)
	{
		var string1 = input[i];
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




//////


var bestHitStringMaker = function(s1, s2, shift1, shift2)
	{	
		var hitmarker = "";
		var seq1 = "";
		var seq2 = "";
		var s1_len = s1.sequence.length
		var s2_len = s2.sequence.length

		for(var k = parseInt(s2_len*3/4); k < parseInt(s2_len+s1_len + s2_len/4); k ++)
        {
   			if(!nonBase(shift1[k])) 		
    			seq2 = seq2 + shift1[k];   	
    		else
    			seq2 = seq2 + " ";	

    		//Case: if Base Array of Strand This is a base instead of 'o'
   			if(!nonBase(shift2[k])) 	
            {
    			seq1 = seq1 + shift2[k];

    			if( canPair(shift2[k], shift1[k]) )
    				hitmarker = hitmarker + ":";
    			else
      				hitmarker = hitmarker + " ";
			}
			else
            {
				seq1 = seq1+" ";
				hitmarker = hitmarker + " ";
			}
		}		

		return " 5 "+seq1+" 3 " +"\n   "+hitmarker + "\n 3 "+seq2+" 5 ";		

	}



/*

test compare:
var s1 = { sequence:"AGTTATTTGCTAGCTAG",fiveprime:true}
var s2 = { sequence:"GGTTTGATCGTAGCTAA",fiveprime:true}

var f = baseArrayMaker(s1,s2,5)
console.log(f[0].toString())
console.log(f[1].toString())

var g = bestHitStringMaker(s1,s2,f[0],f[1])
console.log(g)

compareStrands(s1,s2,4)

test compareall:

var s1 = { name: "s1", sequence:"AGTTATTTGCTAGCTAG",fiveprime:true}
var s2 = { name: "s2", sequence:"GGTTTGATCGTAGCTAA",fiveprime:true}
var s3 = { name: "s3", sequence:"AGTTATTTGCTAGCTAG",fiveprime:true}
var s4 = { name: "s4", sequence:"GGTTTGATCGTAGCTAA",fiveprime:true}

var fs1 = {name: "fs1",components:["s1","s2"],fiveprime:"3' to 5'"}
var fs2 = {name: "fs2",components:["s2'"],fiveprime:"5' to 3'"}
var fs3 = {name: "fs3",components:["s1","s3'"],fiveprime:"loop"}
var complist = [s1,s2,s3,s4]
var fulllist = [fs1,fs2,fs3]

compareAllStrands(complist,fulllist)





*/
