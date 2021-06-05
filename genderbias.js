// Code derived from Thomas Forth's original at http://tomforth.co.uk/genderbias/
var maleWords = ["able", "accomplish\\w*"];
var femaleWords = ["accept\\w*", "accommodat\\w*"];
var examples = [];

function textChanged() {
	document.getElementById("foundFemaleWords").innerHTML = "";
	document.getElementById("foundMaleWords").innerHTML = "";
	var letterText = document.getElementById("recommendationLetter").value;
	var splitLetterText = letterText.split(" ");
	var score = {'male':0,'female':0};
	var words = {'male':{},'female':{}};
	var html = {'male':'','female':''};
	for (var i = 0; i < splitLetterText.length; i++) {
		letterWord = splitLetterText[i];
		letterWord = letterWord.replace(/\.$/g,'');
		for (var maleCounter = 0; maleCounter < maleWords.length; maleCounter++) {
			if(letterWord.toLowerCase().search(maleWords[maleCounter]) == 0) {
				if(!words.male[letterWord]) words.male[letterWord] = 0;
				words.male[letterWord]++;
				score.male++;
			}
		}
		for (var femaleCounter = 0; femaleCounter < femaleWords.length; femaleCounter++) {
			if(letterWord.toLowerCase().search(femaleWords[femaleCounter]) == 0) {
				if(!words.female[letterWord]) words.female[letterWord] = 0;
				words.female[letterWord]++;
				score.female++;
			}
		}
	}
	for(word in words.female) html.female += '<p>'+word+(words.female[word] > 1 ? ' &times;'+words.female[word] : '')+'</p>';
	document.getElementById("foundFemaleWords").innerHTML = html.female;
	for(word in words.male) html.male += '<p>'+word+(words.male[word] > 1 ? ' &times;'+words.male[word] : '')+'</p>';
	document.getElementById("foundMaleWords").innerHTML = html.male;

	function scoreIt(a,b){ return (100*(a-b)/(a+b)).toFixed(); }
	var html = "";
	if(score.male > score.female) html = "Agency-biased ("+scoreIt(score.male,score.female)+"%)";
	if(score.male < score.female) html = "Communion-biased ("+scoreIt(score.female,score.male)+"%)";
	if(score.male == score.female) html = "Neutral - Congratulations!";
	document.getElementById('score').innerHTML = html;
}

function example() {
	var v = "Melinda was one of the first users of my now widely-used and successful software, MetNetMaker. Her early bug reports and insightful suggestions were invaluable to making the product what it is today. I have not since worked with anyone so at ease communicating with those in other scientific fields.";
	if(examples.length > 0){
		var i = Math.floor(Math.random()*examples.length);
		v = parsePage(examples[i]);
	}
	document.getElementById("recommendationLetter").value = v;
	textChanged();
}

function parsePage(data){
	if(typeof data==="string") data = data.split(/[\n\r]/);
	// If it looks like YAML we remove it
	start = 0;
	if(data[0].indexOf('---')==0){
		for(var i = 1; i < data.length; i++){
			if(data[i].indexOf('---')==0){
				start = i+1;
				if(data[i+1]=="") start++;
				continue;
			}
		}
	}
	var out = "";
	for(var i = start; i < data.length; i++){
		out += data[i]+'\n';
	}
	// Replace HTML
	out = out.replace(/\<[^\>]+\>/g,'');
	return out;
}

function getExamples(data){
	// Split into an array by new line characters
	if(typeof data==="string") data = data.split(/[\n\r]/);
	var m,md,html;
	// Define the callback function for success
	var success = function(data,a){ if(data) examples.push(data); };

	for(var i = 0; i < data.length ; i++){
		m = data[i].match(/\* \[[^\]]+\]\(([^\)]+)\)/);
		if(m){
			md = m[1];
			html = md.replace(/\.md/,".html");
			// We will try to load an HTML version first because gh-pages converts the Markdown files to HTML
			loadFILE('examples/'+html,success,{error:function(){ loadFILE('examples/'+md,success); }});
		}
	}
}
// Load the examples
loadFILE('examples/README.md',getExamples);

// Function to load a file (same domain)
function loadFILE(file,fn,attrs){
	if(!attrs) attrs = {};
	attrs['_file'] = file;
	var error = "";
	var xhr = new XMLHttpRequest();
	if(attrs.error && typeof attrs.error==="function") error = function(e){ attrs.error.call((attrs.context ? attrs.context : this),e,attrs) }
	if(error){
		xhr.addEventListener("error", error, false);
		xhr.addEventListener("abort", error, false);
	}
	xhr.onreadystatechange = function(){
		if(xhr.readyState==4){
			if(typeof fn==="function"){
				fn.call((attrs.context ? attrs.context : this),xhr.responseText,attrs);
			}
		}
	}
	xhr.open("GET", file, true);
	try {
		xhr.send();
	} catch(e) {
		if(error) attrs.error.call((attrs.context ? attrs.context : this),e,attrs);
	}
}