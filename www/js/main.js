define(function (require) {
    var _ = require('underscore');
    var $ = require('jquery');
var words = [
    {
        "name": "boy",
        "img": "http://images.clipartpanda.com/boy-20clip-20art-RiAykqLLT.jpeg",
        "tries": 0
    },
    {
        "name":"bee",
        "img": "http://bee-stings.net/bee_logo2.jpg",
        "tries": 0
    },
    {
        "name":"baby",
        "img": "http://www.eonline.com/resize/500/500//eol_images/Entire_Site/2015021/rs_300x300-150121185511-600.New-Gerber-Baby.ms.012115.jpg",
        "tries": 0
    },
    {
        "name":"girl",
        "img":"https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcSLd6-BygSC-wYEDcoDcz7JW5eJ8MSKFkew4zuIdPoJqunKf_-P",
        "tries": 0
    },
    {
        "name": "goo",
        "img":"http://heidelblog.net/wp-content/uploads/2014/06/goo.jpg",
        "tries": 0
    },
    {
        "name": "God",
        "img": "http://old.rejesus.co.uk/expressions/faces_jesus/facesj_media/b_sinai.jpg",
        "tries": 0
    },
    {
        "name": "green",
        "img":"http://homemadehalloween.org/wp-content/uploads/2012/10/minecraft-creeper2.png",
        "tries": 0
    },
    {
        "name": "creeper",
        "img":"http://img3.wikia.nocookie.net/__cb20131206161228/minecraft/images/d/da/Minecraft_creeper.jpg",
        "tries": 0
    },
    { "name": "egg", "img":"http://upload.wikimedia.org/wikipedia/commons/0/02/Fried_egg,_sunny_side_up.jpg", tries:0},
];

_.each(words, function(word, i, words){
    var html = '';
    console.log(i%3);
    if(i%3 === 0){$('#choices').prepend('<div class="row"></div>');}
    html += '<div class="wordImg col-xs-4"><img data-name="' + word.name + '" src="' + word.img + '" /></div>'
    $('#choices .row:first').append(html);
});
var $challengeWord = $('#word');
var score = 1;
var penalty = 3;
var $score = $('#score');
var lastWord = '';
$('img').on('click', function(e) {
    var choice = $(e.currentTarget).data('name');
    if(choice === $challengeWord.text()){
        $score.addClass('progress-bar-success').removeClass('progress-bar-danger');
        score+=10;
        penalty = 3;
        playSuccess();
        $('#score').width(score + "%");
         chooseWord();
    }else{
        $score.removeClass('progress-bar-success').addClass('progress-bar-danger');
        score-=penalty;
        penalty = penalty * 2;
        playError();
        if(score < 1){
            score = 1;
        }
        $('#score').width(score + "%");
    }

});

var chooseWord = function chooseWord() {
    var nextWord = _.shuffle(words)[0].name;

    if(nextWord === lastWord){
        chooseWord();
    }else{
        lastWord = nextWord;
        $challengeWord.text(lastWord);
    }
}
chooseWord();

var playSuccess = function playSuccess() {
    play_multi_sound('success');
}

var playError = function playError() {
    play_multi_sound('error');
}

	var channel_max = 10;										// number of channels
	audiochannels = new Array();
	for (a=0;a<channel_max;a++) {									// prepare the channels
		audiochannels[a] = new Array();
		audiochannels[a]['channel'] = new Audio();						// create a new audio object
		audiochannels[a]['finished'] = -1;							// expected end time for this channel
	}
	function play_multi_sound(s) {
		for (a=0;a<audiochannels.length;a++) {
			thistime = new Date();
			if (audiochannels[a]['finished'] < thistime.getTime()) {			// is this channel finished?
				audiochannels[a]['finished'] = thistime.getTime() + document.getElementById(s).duration*1000;
				audiochannels[a]['channel'].src = document.getElementById(s).src;
				audiochannels[a]['channel'].load();
				audiochannels[a]['channel'].play();
				break;
			}
		}
	}
});