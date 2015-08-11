define(function (require) {
	var _ = require('underscore');
	var $ = require('jquery');
	var words = [
		{
			"name": "boy",
			"img": "http://images.clipartpanda.com/boy-20clip-20art-RiAykqLLT.jpeg"
		},
		{
			"name": "bee",
			"img": "http://bee-stings.net/bee_logo2.jpg"
		},
		{
			"name": "baby",
			"img": "http://www.eonline.com/resize/500/500//eol_images/Entire_Site/2015021/rs_300x300-150121185511-600.New-Gerber-Baby.ms.012115.jpg"
		},
		{
			"name": "girl",
			"img": "https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcSLd6-BygSC-wYEDcoDcz7JW5eJ8MSKFkew4zuIdPoJqunKf_-P"
		},
		{
			"name": "goo",
			"img": "http://heidelblog.net/wp-content/uploads/2014/06/goo.jpg"
		},
		{
			"name": "God",
			"img": "http://old.rejesus.co.uk/expressions/faces_jesus/facesj_media/b_sinai.jpg"
		},
		{
			"name": "green",
			"img": "http://homemadehalloween.org/wp-content/uploads/2012/10/minecraft-creeper2.png"
		},
		{
			"name": "creeper",
			"img": "http://img3.wikia.nocookie.net/__cb20131206161228/minecraft/images/d/da/Minecraft_creeper.jpg"
		},
		{
			"name": "egg",
			"img": "http://upload.wikimedia.org/wikipedia/commons/0/02/Fried_egg,_sunny_side_up.jpg"
		},
		{
			"name": "tree",
			"img": "https://farm5.staticflickr.com/4007/5075169756_d51008b274_q_d.jpg"
		},
		{
			"name": "train",
			"img": "https://farm4.staticflickr.com/3098/2295150040_186e240d4f_q_d.jpg"
		},
		{
			"name": "sea",
			"img": "https://farm7.staticflickr.com/6184/6088463794_1a8409bd33_q_d.jpg"
		},
		{
			"name": "boat",
			"img": "https://farm5.staticflickr.com/4077/4908578013_4f30104156_q_d.jpg"
		},
		{
			"name": "box",
			"img": "https://farm4.staticflickr.com/3390/3192570552_9f362cde65_q_d.jpg"
		},
		{
			"name": "car",
			"img": "https://farm3.staticflickr.com/2147/2157448457_d4788673b3_q_d.jpg"
		},
		{
			"name": "dark",
			"img": "https://farm1.staticflickr.com/92/333816710_0623edf1da_q_d.jpg"
		},
		{
			"name": "eat",
			"img": "https://farm4.staticflickr.com/3931/15381527766_b10eb0b9d4_q_d.jpg"
		},
		{
			"name": "eggs",
			"img": "https://farm4.staticflickr.com/3101/2735689978_949e3a02b1_q_d.jpg"
		},
		{
			"name": "fox",
			"img": "https://farm8.staticflickr.com/7456/11100243363_d804107fae_q_d.jpg"
		},
		{
			"name": "goat",
			"img": "https://farm9.staticflickr.com/8356/8280907415_0ec381b29d_q_d.jpg"
		},
		{
			"name": "ham",
			"img": "https://farm5.staticflickr.com/4119/4873400550_c1fa7f5172_q_d.jpg"
		},
		{
			"name": "house",
			"img": "https://farm2.staticflickr.com/1105/1189776958_8bc7c2113c_q_d.jpg"
		},
		// {
		// 	"name": "in",
		// 	"img": ""
		// },
		{
			"name": "mouse",
			"img": "https://farm3.staticflickr.com/2928/14614923808_d3c7fc58c9_q_d.jpg"
		},
		// {
		// 	"name": "not",
		// 	"img": ""
		// },
		// {
		// 	"name": "on",
		// 	"img": ""
		// },
		{
			"name": "rain",
			"img": "https://farm7.staticflickr.com/6182/6132260807_8f2acff010_q_d.jpg"
		}
		// {
		// 	"name": "Sam",
		// 	"img": ""
		// },
		// {
		// 	"name": "say",
		// 	"img": ""
		// },
	];

	var numCards = 3;
	var chooseWords = function chooseWords() {
		var chosenWords = _.sample(words, numCards);
		$challengeWord.text(_.sample(chosenWords, 1)[0].name);
		populateCards(chosenWords);
		return chosenWords;
	}

	var populateCards = function populateCards(words) {
		$('#choices').empty();


		for(var i = 0; i<words.length; i++){
			// if (i % 3 === 0) {
			if(i===0){
				$('#choices').prepend('<div class="row"></div>');
			}

			var html = '<div class="wordImg"><img data-name="' + words[i].name + '" src="' + words[i].img + '" /></div>'
			$('#choices .row:first').append(html);
		}
		$('img').on('click', doScore);
	}

	var init = function init() {
		chooseWords();
	}

	var $challengeWord = $('#word');
	var score = 1;
	var penalty = 3;
	var $score = $('#score');
	var scoreIncrement = 10;
	var lastWord = '';
	var medals = 0;
	var totalScore = 0;
	var doScore = function doScore(e) {
		var choice = $(e.currentTarget).data('name');
		if (choice === $challengeWord.text()) {
			$score.addClass('progress-bar-success').removeClass('progress-bar-danger');
			score += scoreIncrement;
			totalScore += scoreIncrement;
			penalty = 3;
			playSuccess();

			if(score >= 100){
				score = 0;
				scoreIncrement = Math.floor(scoreIncrement*.9);
				addMedal();
				numCards++;
			}

			$('#score').width(score + "%");



			chooseWords();
		} else {
			$score.removeClass('progress-bar-success').addClass('progress-bar-danger');
			score -= penalty;
			totalScore -= penalty;
			penalty = penalty * 2;
			playError();
			if (score < 1) {
				score = 1;
			}

			$('#score').width(score + "%");
		}

		$('#score').text(totalScore);
	};

	var medals = [
		'https://farm9.staticflickr.com/8011/7315871276_d9e6773eb1_q_d.jpg',
		'https://farm8.staticflickr.com/7094/7268561194_950c53b257_q_d.jpg',
		'https://farm9.staticflickr.com/8006/7268561274_9e43b68420_q_d.jpg',
		'https://farm9.staticflickr.com/8151/7268561188_6590168fe9_q_d.jpg'
	]
	var addMedal = function addMedal() {

		$('#medals').append('<img src="' + medals[Math.floor(Math.random() * medals.length)] + '" />');

	};

	var playSuccess = function playSuccess() {
		play_multi_sound('success');
	}

	var playError = function playError() {
		play_multi_sound('error');
	}

	var channel_max = 10;// number of channels
	audiochannels = new Array();
	for (a = 0; a < channel_max; a++) {// prepare the channels
		audiochannels[a] = new Array();
		audiochannels[a]['channel'] = new Audio();// create a new audio object
		audiochannels[a]['finished'] = -1;// expected end time for this channel
	}
	function play_multi_sound(s) {
		for (a = 0; a < audiochannels.length; a++) {
			thistime = new Date();
			if (audiochannels[a]['finished'] < thistime.getTime()) {// is this channel finished?
				audiochannels[a]['finished'] = thistime.getTime() + document.getElementById(s).duration * 1000;
				audiochannels[a]['channel'].src = document.getElementById(s).src;
				audiochannels[a]['channel'].load();
				audiochannels[a]['channel'].play();
				break;
			}

		}
	}

	init();
});
