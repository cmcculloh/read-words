define(function (require) {
	var _ = require('underscore');
	var $ = require('jquery');

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
