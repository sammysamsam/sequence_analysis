//import Backend from './StrandAnalysis_OhayonBackend.js'

var x = require('./StrandAnalysis_OhayonBackend')


var s1 = { name: "s1", sequence:"AGTTATTTGCTAGCTAG",fiveprime:true}
var s2 = { name: "s2", sequence:"GGTTTGATCGTAGCTAA",fiveprime:true}
var s3 = { name: "s3", sequence:"AGTTATTTGCTAGCTAG",fiveprime:true}
var s4 = { name: "s4", sequence:"GGTTTGATCGTAGCTAA",fiveprime:true}

var fs1 = {name: "fs1",components:["s1","s2"],fiveprime:"3' to 5'"}
var fs2 = {name: "fs2",components:["s2'"],fiveprime:"5' to 3'"}
var fs3 = {name: "fs3",components:["s1","s3'"],fiveprime:"loop"}
var complist = [s1,s2,s3,s4]
var fulllist = [fs1,fs2,fs3]


x.compareAllStrands(complist,fulllist)
