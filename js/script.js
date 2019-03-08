/**
 * This makes sure to wait until the page has actually
 * loaded on the screen before executing the JavaScript
 */
$(document).ready(
function() {

	let overallGuessArray = [
		[-1, -1, -1, -1],
		[-1, -1, -1, -1],
		[-1, -1, -1, -1],
		[-1, -1, -1, -1],
		[-1, -1, -1, -1],
		[-1, -1, -1, -1],
		[-1, -1, -1, -1],
		[-1, -1, -1, -1],
		[-1, -1, -1, -1],
		[-1, -1, -1, -1]
	];

	let answerArray = makeAnswer();
	let guess = 0;
	let selectedColor = '';
	let bGround = 'rgba(0, 0, 0, 0) linear-gradient(rgb(0, 0, 119), rgb(102, 0, 255)) repeat scroll 0% 0% / auto padding-box border-box';
	let isSelected = false;

	/**
	 * This is to keep the Submit button hidden so long as any one
	 * particular entire row is still not completely filled in.
	 */
	$('.submit-btn').hide();
	let clickCount = 0;
	let guessBoxTempArray = $('.guess-pegs');
	let guessBoxArray = [];

	let nextGradeUp = ($($('.first-grade')[0]).parent()[0]);

	function getGradeBox() {
		/**
		 * This saves our location so that we can swap them around
		 * back and forth, so as to gradually move up the board
		 * one step at a time.
		 */
		let activeGrade = nextGradeUp.getElementsByClassName('grade-pegs')[0];
		nextGradeUp = $(nextGradeUp).prev()[0];

		return activeGrade;
	}

	function makeAnswer() {
		let arrayRightHere = [];
		for (let i = 0; i < 4; i++) {
			arrayRightHere.push((Math.floor(Math.random() * 6)));
		}
		return arrayRightHere;
	}

	for (let i = 9; i >= 0; i--) {
		guessBoxArray.push(guessBoxTempArray[i]);
	}

	/*
	rgb(255, 0, 0)		red
	rgb(17, 102, 34)	green
	rgb(255, 255, 255)	white
	rgb(0, 0, 0)		black
	rgb(255, 255, 0)	yellow
	rgb(237, 92, 13)	orange
	*/
	function makeColorANumber(color) {
		/**
		 * In the video series, Mike uses a series of If
		 * statements, which I personally found to be a little
		 * long, so I replaced it with a switch statement.
		 */
		switch (color) {
			case 'rgb(255, 0, 0)': return 0;		// red, thus, returns "red" in the selection array
				break;
			case 'rgb(17, 102, 34)': return 1;		// green, and does the same, etc.
				break;
			case 'rgb(255, 255, 255)': return 2;	// white
				break;
			case 'rgb(0, 0, 0)': return 3;			// black
				break;
			case 'rgb(255, 255, 0)': return 4;		// yellow
				break;
			case 'rgb(237, 92, 13)': return 5;		// orange
				break;
			default:
				return -1;
		}
	}

	function updateOverallGuessArray(color, xy) {
		let tempColorArray = xy.split('-');
		let x = parseInt(tempColorArray[1]);
		let y = parseInt(tempColorArray[2]);
		overallGuessArray[x][y] = makeColorANumber(color);
	}

	for (let i = 0; i < 10; i++) {
		/**
		 * The reason why we're just writing this particular line
		 * in just plain old regular, ordinary JavaScript instead of
		 * using jQuery (which would be "$('.guess-peg')" instead of
		 * the entire following line) is because this would search
		 * the entire document all at once if we were to use jQuery,
		 * it would fetch the very first class-name "guess-peg" it
		 * finds on the page and then go through all of the pegs all
		 * at once, which is not what we want. What we want is to
		 * fetch the particular "guess-peg" element in the particular
		 * peg array we're on at that particular moment, which is what
		 * we're looping for.
		 */
		let guessArray = guessBoxArray[i].getElementsByClassName('guess-peg');
		for (let j = 0; j < 4; j++) {
			/**
			 * The reason why this is only <arrayName>[j] instead of
			 * using <arrayName>[i][j] is because once we've defined
			 * "guessArray" above, we're only looping through each
			 * row of pegs individually, instead of each peg on the
			 * board all in one go. So, both [i] and [j] are available.
			 */
			$(guessArray[j]).attr('id', `g-${i}-${j}`);
		}
	}

	function getGrade() {
		let getGradeArrayHere = []; 
		//console.log(`The actual answer is ${answerArray}`);
		let correctArray = [];

		for (let i = 0; i < 4; i++) {
			correctArray.push(answerArray[i]);
		}

		// Black grade-peg check
		// i.e., the right colors in the right places
		for (let i = 0; i < 4; i++) {
			/**
			 * Only using "overallGuessArray[guess]" fetches the entire
			 * array, and we just want to compare the specific index
			 * of a particular given array. Thus, ...[guess][i]
			 */
			if (overallGuessArray[guess][i] == correctArray[i]) {
				getGradeArrayHere.push('black-peg');
				/**
				 * We push a negative 1 because, since there will never
				 * be a -1 in the guessArray, it can't possibly match;
				 * therefore, we can use this to skip previously-checked
				 * iterations so that we don't mess up the game.
				 */
				correctArray[i] = -1;
				overallGuessArray[guess][i] = -2;
			}
		}

		// White grade-peg check
		// i.e., the right colors in the wrong places
		for (let i = 0; i < 4; i++) {
			for (let j = 0; j < 4; j++) {
				if (overallGuessArray[guess][i] == correctArray[j]) {
					// pushing a "2" here to separate the black pegs from the white pegs
					getGradeArrayHere.push('white-peg');
					correctArray[j] = -1;
					overallGuessArray[guess][i] = -2;
				}
			}
		}

		return getGradeArrayHere;
	}

	function placePegs(localArray, localBox) {
		let pegArray = localBox.getElementsByClassName('grade-peg');
		//console.log(pegArray);

		for (let i = 0; i < localArray.length; i++) {
			$(pegArray[i]).addClass(`${localArray[i]}`);
		}

		$('.white-peg').css('background', 'none').css('background-color', 'white');
		$('.black-peg').css('background', 'none').css('background-color', 'black');
	}

	function checkWin(testArray) {
		let testArrayString = testArray.join();
		if (testArrayString == 'black-peg,black-peg,black-peg,black-peg') {
			$('.modal').fadeIn(700);
		}
	}

	$('.submit-btn').click(function() {
		$('.active').removeClass('active');
		let gradeArray = getGrade();
		checkWin(gradeArray);
		let gradeBox = getGradeBox();
		placePegs(gradeArray, gradeBox);
		//console.log(gradeBox);
		guess++;
		for (let i = 0; i < 4; i++) {
			$(`#g-${guess}-${i}`).addClass('active');
		}

		$('.submit-btn').hide();
	});

	$('.selector-inner').click(function() {
		isSelected = true;
		$('.selector-outer').css('background-color', 'purple');
		let peg = ($(this).parent())[0];
		selectedColor = $(this).css('background-color');
		$(peg).css('background-color', selectedColor);
	});

	$('.guess-peg').click(function() {
		/**
		 * This is to make sure that we can only start clicking guess pegs
		 * if we actually have a color chosen first. If we don't have a
		 * color, then we can't fill it in with nothing.
		 */
		if (isSelected) {
			if ($(this).hasClass('active')) {
				let number = parseInt($(this).css('border'));
				/**
				 * This is to check to see if a peg hasn't already been
				 * clicked yet.
				 */
				if (number < 2) {
					$(this).css('background', 'none');
					$(this).css('background-color', selectedColor);
					$(this).css('border', '2px solid black');
					let coordinate = $(this).attr('id');
					updateOverallGuessArray(selectedColor, coordinate);
					clickCount++;
					/**
					 * In the video series, Michael uses "if (clickCount === 4)",
					 * and then setting "clickCount" back to zero afterwards, but
					 * I opted to use the Mod operator because it's less code.
					 */
					if (!(clickCount%4)) {
						$('.submit-btn').show();
					}
				/**
				 * Continuing from line 213:
				 * i.e., if a peg has already been clicked, and now we're
				 * unclicking it. This way, the Submit button won't
				 * suddenly appear while we're still deciding on our current
				 * move and we've clicked four times while choosing.
				 */
				} else {
					$(this).css('background', bGround);
					$(this).css('border', '1px solid black');
					clickCount--;
					if (clickCount%4) {
						$('.submit-btn').hide();
					}
				}
				
			}
		}
	});



}
);


