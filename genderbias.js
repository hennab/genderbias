// Code derived from Thomas Forth's original at http://tomforth.co.uk/genderbias/
var maleWords = ["able","accomplish\\w*","accurac\\w*","accurate\\w*","achiev\\w*","acquir\\w*","actualiz\\w*","adaptab\\w*","adept\\w*","ambition\\w*","ambitious\\w*","aptitude\\w*","aptly","aptness","aspiration\\w*","aspire\\w*","aspiring","assert\\w*","attain\\w*","authoritative\\w*","autonomous\\w*","autonomy","capab\\w*","careful\\w*","choice","choices","clever\\w*","compet\\w*","completion","confident","confidently","conquer\\w*","conscientious\\w*","contemplat\\w*","contend\\w*","contest\\w*","decid\\w*","decision\\w*","decisive\\w*","defeat\\w*","deliberat\\w*","dependable","determin\\w*","difficult\\w*","do","doable","doing","eager\\w*","earn","earned","earning","earns","easiness","easy","effective\\w*","efficien\\w*","effort\\w*","empowered","enact\\w*","endeavor\\w*","establish","established","establishes","establishing","exact\\w*","expert\\w*","fail\\w*","fluen\\w*","freedom\\w*","freely","goal","goal-oriented","goals","importan\\w*","independ\\w*","individualist","insight\\w*","intent\\w*","intuition","intuitive\\w*","keen\\w*","know\\w*","liberties","liberty","logic\\w*","loner\\w*","made","make","makes","making","mastered","masterful\\w*","mastering","mastery","motivat\\w*","need","needed","needing","needs","objectiv\\w*","obtain\\w*","opportun\\w*","overcame","overcome","overcomes","overcoming","persever\\w*","persist\\w*","persistent","pioneer\\w*","practic\\w*","pragmat\\w*","prevail\\w*","pride","prideful\\w*","priorit\\w*","proactive\\w*","productive\\w*","productivity","proficien\\w*","prosper\\w*","proud\\w*","purpose\\w*","pursu\\w*","rational\\w*","realiz\\w*","rebel\\w*","recog\\w*","reliab\\w*","reputation\\w*","resilien\\w*","resolute\\w*","resolution","resolv\\w*","responsib\\w*","reward\\w*","risk\\w*","savv\\w*","score","scored","scores","scoring","self","self-\\w*","should\\w*","significant\\w*","skill","skilled","skillful\\w*","skills\\w*","smart","smartly","steadfast\\w*","strive\\w*","striving\\w*","struggl\\w*","stubborn\\w*","succeed\\w*","success\\w*","sure","take","takes","taking","tenac\\w*","think\\w*","thought","took","tried","tries","triumph\\w*","trying","unaided","unyielding\\w*","vanquish\\w*","victor\\w*","will","willing\\w*","willpower","win","winner\\w*","winning\\w*","wins","wit","wits","witting\\w*","won","won’t","you","you’\\w*","your","yours","yourself"];
var femaleWords = ["accept\\w*","accommodat\\w*","accompan\\w*","accord","affab\\w*","affection\\w*","affiliat\\w*","affinity","agree\\w*","aid","aided","aiding","allegian\\w*","alliance\\w*","allies","ally","altruis\\w*","amenab\\w*","amiab\\w*","amicab\\w*","amigo\\w*","apolog\\w*","appreciat\\w*","assist\\w*","benevolen\\w*","buddies","buddy","care","cared","cares","caring\\w*","ceremon\\w*","charit\\w*","chat","chats","chatted","chatting","civic","civil\\w*","closeness","collab\\w*","colleague\\w*","collective\\w*","common good","common ground\\w*","commun\\w*","companion\\w*","compassion\\w*","compromis\\w*","concert\\w*","confer\\w*","congrat\\w*","consen\\w*","considerate\\w*","contribut\\w*","conversat\\w*","converse","conversed","converses","conversing","cooperat\\w*","counsel\\w*","courteous\\w*","crew","democr\\w*","dialogue\\w*","discuss\\w*","educat\\w*","empath\\w*","equitab\\w*","familial","families","family","familys’","family’s","fellow\\w*","festiv\\w*","forgave","forgiv\\w*","frat\\w*","friend\\w*","generos\\w*","generous\\w*","grateful\\w*","gregarious\\w*","group\\w*","guidanc\\w*","harmon\\w*","help\\w*","honest\\w*","hospitab\\w*","hospitality","human\\w*","impartial\\w*","interpersonal\\w*","intima\\w*","justice","justly","kin","kindly","kindness","kinship","law","lawful\\w*","laws","learn\\w*","love\\w*","loving\\w*","loyal\\w*","magnanimous\\w*","marriag\\w*","matrimon\\w*","member\\w*","middle ground","mingl\\w*","mutual\\w*","negotiat\\w*","neighbor\\w*","nurtur\\w*","offer\\w*","oneness","open-mind\\w*","our","ours","pal","pals","participat\\w*","partied","parties","partner\\w*","party\\w*","philanth\\w*","pluralis\\w*","polite\\w*","public","publicly","recipr\\w*","recommend\\w*","reconcil\\w*","relationship\\w*","request\\w*","respect\\w*","ritual\\w*","roommate\\w*","sacrific\\w*","selfless\\w*","servic\\w*","share","shared","shares","sharing","sincer\\w*","socia\\w*","societ\\w*","solidarity","soror\\w*","squad\\w*","suggest\\w*","support\\w*","sympath\\w*","talk\\w*","taught","teach\\w*","team\\w*","thank\\w*","together\\w*","tradition\\w*","treatise\\w*","treaty","tribe\\w*","trust\\w*","truth\\w*","unanim\\w*","unif\\w*","unite\\w*","uniting","unity","unselfish\\w*","us","volunt\\w*","we","welcom\\w*","welfare","inclusiv\\w*"];
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