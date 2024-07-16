// Function to fetch current game state from the server
function fetchGameState(callback) {
    $.ajax({
        type: "GET",
        url: "../server/api.php?action=getGameState",
        dataType: "json",
        success: function(response) {
            callback(response);
        }
    });
}

// Function to update game state on the server
function updateGameState(newState, callback) {
    $.ajax({
        type: "POST",
        url: "../server/api.php?action=updateGameState",
        data: JSON.stringify(newState),
        dataType: "json",
        success: function(response) {
            callback(response);
        }
    });
}


/**
 * 
 * Dice.js
 * 
 * 
 * 
 */

var active = {
    1: true,
    2: true,
    3: true,
    4: true,
    5: true
}
var diceNum = {
    1: 0,
    2: 0,
    3: 0,
    4: 0,
    5: 0
}
var rolls = [];


var currRoll = 0;
var noRollsLeft = false;



var total = 0;
var gameOver = false;
var selectedScores = {
    ones: false,
    twos: false,
    threes: false,
    fours: false,
    fives: false,
    sixes: false,
    onePair: false,
    twoPairs: false,
    threeOfAKind: false,
    fourOfAKind: false,
    smallStraight: false,
    largeStraight: false,
    fullHouse: false,
    chance: false,
    yatzy: false
};
var scores = {
    ones: 0,
    twos: 0,
    threes: 0,
    fours: 0,
    fives: 0,
    sixes: 0,
    onePair: 0,
    twoPairs: 0,
    threeOfAKind: 0,
    fourOfAKind: 0,
    smallStraight: 0,
    largeStraight: 0,
    fullHouse: 0,
    chance: 0,
    yatzy: 0
};


document.addEventListener('DOMContentLoaded', function() {

    document.getElementById('roll-counter').textContent = "Current Roll: " + currRoll;

    //call api and return values
    diceNum['1'] = Math.floor(Math.random() * 6) + 1;
    diceNum['2'] = Math.floor(Math.random() * 6) + 1;
    diceNum['3'] = Math.floor(Math.random() * 6) + 1;
    diceNum['4'] = Math.floor(Math.random() * 6) + 1;
    diceNum['5'] = Math.floor(Math.random() * 6) + 1;

    const dice1 = document.getElementById('dice1');
    updateDice(dice1, diceNum['1']);
    const dice2 = document.getElementById('dice2');
    updateDice(dice2, diceNum['2']);
    const dice3 = document.getElementById('dice3');
    updateDice(dice3, diceNum['3']);
    const dice4 = document.getElementById('dice4');
    updateDice(dice4, diceNum['4']);
    const dice5 = document.getElementById('dice5');
    updateDice(dice5, diceNum['5']);
    rolls = [diceNum['1'], diceNum['2'], diceNum['3'], diceNum['4'], diceNum['5']];

    //call api -add delay for roll count
    document.getElementById('rollButton').addEventListener('click', function() {

        if (! noRollsLeft && ! gameOver) {

            if (active['1']) {

                diceNum['1'] = Math.floor(Math.random() * 6) + 1;
                const result1 = diceNum['1'];
                updateDice(dice1, result1);
            }
            if (active['2']) {

                diceNum['2'] = Math.floor(Math.random() * 6) + 1;
                const result2 = diceNum['2'];
                updateDice(dice2, result2);
            }
            if (active['3']) {

                diceNum['3'] = Math.floor(Math.random() * 6) + 1;
                const result3 = diceNum['3'];
                updateDice(dice3, result3);
            }
            if (active['4']) {

                diceNum['4'] = Math.floor(Math.random() * 6) + 1;
                const result4 = diceNum['4'];
                updateDice(dice4, result4);
            }
            if (active['5']) {

                diceNum['5'] = Math.floor(Math.random() * 6) + 1;
                const result5 = diceNum['5'];
                updateDice(dice5, result5);
            }
            rolls = [diceNum['1'], diceNum['2'], diceNum['3'], diceNum['4'], diceNum['5']];
        }
    });

    dice1.addEventListener('click', function() {

        if (currRoll != 0 && ! gameOver) {
            active['1'] = !active['1'];
            updateDiceActivity(dice1, active['1']);
        }
    });

    dice2.addEventListener('click', function() {

        if (currRoll != 0 && ! gameOver) {
            active['2'] = !active['2'];
            updateDiceActivity(dice2, active['2']);
        }
    });

    dice3.addEventListener('click', function() {

        if (currRoll != 0 && ! gameOver) {
            active['3'] = !active['3'];
            updateDiceActivity(dice3, active['3']);
        }
    });

    dice4.addEventListener('click', function() {

        if (currRoll != 0 && ! gameOver) {
            active['4'] = !active['4'];
            updateDiceActivity(dice4, active['4']);
        }
    });

    dice5.addEventListener('click', function() {

        if (currRoll != 0 && ! gameOver) {
            active['5'] = !active['5'];
            updateDiceActivity(dice5, active['5']);
        }
    });

    //remove
    document.getElementById('rollButton').addEventListener('click', function() {
        countRoll();
    });


    document.getElementById('OnesID').addEventListener('click', function() {
        
        if (currRoll != 0 && ! selectedScores['ones']) {

            this.classList.remove('greyed-out');
            this.classList.add('score');
            selectedScores['ones'] = true;
            total += scores['ones'];
            resetTurn();
            resetCardOnNewTurn();
            checkIfGameFinished();
        }
    });

    document.getElementById('TwosID').addEventListener('click', function() {
        
        if (currRoll != 0 && ! selectedScores['twos']) {

            this.classList.remove('greyed-out');
            this.classList.add('score');
            selectedScores['twos'] = true;
            total += scores['twos'];
            resetTurn();
            resetCardOnNewTurn();
            checkIfGameFinished();
        }
    });

    document.getElementById('ThreesID').addEventListener('click', function() {
        
        if (currRoll != 0 && ! selectedScores['threes']) {

            this.classList.remove('greyed-out');
            this.classList.add('score');
            selectedScores['threes'] = true;
            total += scores['threes'];
            resetTurn();
            resetCardOnNewTurn();
            checkIfGameFinished();
        }
    });

    document.getElementById('FoursID').addEventListener('click', function() {
        
        if (currRoll != 0 && ! selectedScores['fours']) {

            this.classList.remove('greyed-out');
            this.classList.add('score');
            selectedScores['fours'] = true;
            total += scores['fours'];
            resetTurn();
            resetCardOnNewTurn();
            checkIfGameFinished();

            resetCardOnNewTurn();
            checkIfGameFinished();
        }
    });

    document.getElementById('FivesID').addEventListener('click', function() {
        
        if (currRoll != 0 && ! selectedScores['fives']) {

            this.classList.remove('greyed-out');
            this.classList.add('score');
            selectedScores['fives'] = true;
            total += scores['fives'];
            resetTurn();
            resetCardOnNewTurn();
            checkIfGameFinished();
        }
    });

    document.getElementById('SixesID').addEventListener('click', function() {
        
        if (currRoll != 0 && ! selectedScores['sixes']) {

            this.classList.remove('greyed-out');
            this.classList.add('score');
            selectedScores['sixes'] = true;
            total += scores['sixes'];
            resetTurn();
            resetCardOnNewTurn();
            checkIfGameFinished();
        }
    });

    document.getElementById('OnePairID').addEventListener('click', function() {
        
        if (currRoll != 0 && ! selectedScores['onePair']) {

            this.classList.remove('greyed-out');
            this.classList.add('score');
            selectedScores['onePair'] = true;
            total += scores['onePair'];
            resetTurn();
            resetCardOnNewTurn();
            checkIfGameFinished();
        }
    });

    document.getElementById('TwoPairID').addEventListener('click', function() {
        
        if (currRoll != 0 && ! selectedScores['twoPairs']) {

            this.classList.remove('greyed-out');
            this.classList.add('score');
            selectedScores['twoPairs'] = true;
            total += scores['twoPairs'];
            resetTurn();
            resetCardOnNewTurn();
            checkIfGameFinished();
        }
    });

    document.getElementById('ThreeOfAKindID').addEventListener('click', function() {
        
        if (currRoll != 0 && ! selectedScores['threeOfAKind']) {

            this.classList.remove('greyed-out');
            this.classList.add('score');
            selectedScores['threeOfAKind'] = true;
            total += scores['threeOfAKind'];
            resetTurn();
            resetCardOnNewTurn();
            checkIfGameFinished();
        }
    });

    document.getElementById('FourOfAKindID').addEventListener('click', function() {
        
        if (currRoll != 0 && ! selectedScores['fourOfAKind']) {

            this.classList.remove('greyed-out');
            this.classList.add('score');
            selectedScores['fourOfAKind'] = true;
            total += scores['fourOfAKind'];
            resetTurn();
            resetCardOnNewTurn();
            checkIfGameFinished();
        }
    });

    document.getElementById('SmallStraightID').addEventListener('click', function() {
        
        if (currRoll != 0 && ! selectedScores['smallStraight']) {

            this.classList.remove('greyed-out');
            this.classList.add('score');
            selectedScores['smallStraight'] = true;
            total += scores['smallStraight'];
            resetTurn();
            resetCardOnNewTurn();
            checkIfGameFinished();
        }
    });

    document.getElementById('LargeStraightID').addEventListener('click', function() {
        
        if (currRoll != 0 && ! selectedScores['largeStraight']) {

            this.classList.remove('greyed-out');
            this.classList.add('score');
            selectedScores['largeStraight'] = true;
            total += scores['largeStraight'];
            resetTurn();
            resetCardOnNewTurn();
            checkIfGameFinished();
        }
    });

    document.getElementById('FullHouseID').addEventListener('click', function() {
        
        if (currRoll != 0 && ! selectedScores['fullHouse']) {

            this.classList.remove('greyed-out');
            this.classList.add('score');
            selectedScores['fullHouse'] = true;
            total += scores['fullHouse'];
            resetTurn();
            resetCardOnNewTurn();
            checkIfGameFinished();
        }
    });

    document.getElementById('ChanceID').addEventListener('click', function() {
        
        if (currRoll != 0 && ! selectedScores['chance']) {

            this.classList.remove('greyed-out');
            this.classList.add('score');
            selectedScores['chance'] = true;
            total += scores['chance'];
            resetTurn();
            resetCardOnNewTurn();
            checkIfGameFinished();
        }
    });

    document.getElementById('YatzyID').addEventListener('click', function() {
        
        if (currRoll != 0 && ! selectedScores['yatzy']) {

            this.classList.remove('greyed-out');
            this.classList.add('score');
            selectedScores['yatzy'] = true;
            total += scores['yatzy'];
            resetTurn();
            resetCardOnNewTurn();
            checkIfGameFinished();
        }
    });

    //add api
    document.getElementById('restartGame').addEventListener('click', function() {
        if (gameOver) {
            document.getElementById('gameOver').style.visibility = 'hidden';
            document.getElementById('restartGame').style.visibility = 'hidden';
            total = 0;

            for (let key in selectedScores) {               //reset selectedScores
                if (selectedScores.hasOwnProperty(key)) {
                    selectedScores[key] = false;
                }
            }

            for (let key in scores) {                       //reset scores
                if (scores.hasOwnProperty(key)) {
                    scores[key] = 0;
                }
            }

            resetTurn();
            
            //reset display
            document.getElementById('OnesID').classList.add('greyed-out');
            document.getElementById('OnesID').classList.remove('score');
            document.getElementById('OnesID').textContent = "";

            document.getElementById('TwosID').classList.add('greyed-out');
            document.getElementById('TwosID').classList.remove('score');
            document.getElementById('TwosID').textContent = "";

            document.getElementById('ThreesID').classList.add('greyed-out');
            document.getElementById('ThreesID').classList.remove('score');
            document.getElementById('ThreesID').textContent = "";

            document.getElementById('FoursID').classList.add('greyed-out');
            document.getElementById('FoursID').classList.remove('score');
            document.getElementById('FoursID').textContent = "";

            document.getElementById('FivesID').classList.add('greyed-out');
            document.getElementById('FivesID').classList.remove('score');
            document.getElementById('FivesID').textContent = "";

            document.getElementById('SixesID').classList.add('greyed-out');
            document.getElementById('SixesID').classList.remove('score');
            document.getElementById('SixesID').textContent = "";

            document.getElementById('SumID').textContent = "";
            document.getElementById('BonusID').textContent = "";

            document.getElementById('OnePairID').classList.add('greyed-out');
            document.getElementById('OnePairID').classList.remove('score');
            document.getElementById('OnePairID').textContent = "";

            document.getElementById('TwoPairID').classList.add('greyed-out');
            document.getElementById('TwoPairID').classList.remove('score');
            document.getElementById('TwoPairID').textContent = "";

            document.getElementById('ThreeOfAKindID').classList.add('greyed-out');
            document.getElementById('ThreeOfAKindID').classList.remove('score');
            document.getElementById('ThreeOfAKindID').textContent = "";

            document.getElementById('FourOfAKindID').classList.add('greyed-out');
            document.getElementById('FourOfAKindID').classList.remove('score');
            document.getElementById('FourOfAKindID').textContent = "";

            document.getElementById('SmallStraightID').classList.add('greyed-out');
            document.getElementById('SmallStraightID').classList.remove('score');
            document.getElementById('SmallStraightID').textContent = "";

            document.getElementById('LargeStraightID').classList.add('greyed-out');
            document.getElementById('LargeStraightID').classList.remove('score');
            document.getElementById('LargeStraightID').textContent = "";

            document.getElementById('FullHouseID').classList.add('greyed-out');
            document.getElementById('FullHouseID').classList.remove('score');
            document.getElementById('FullHouseID').textContent = "";

            document.getElementById('ChanceID').classList.add('greyed-out');
            document.getElementById('ChanceID').classList.remove('score');
            document.getElementById('ChanceID').textContent = "";

            document.getElementById('YatzyID').classList.add('greyed-out');
            document.getElementById('YatzyID').classList.remove('score');
            document.getElementById('YatzyID').textContent = "";

            document.getElementById('TotalID').textContent = "";

            gameOver = false;
        }
    });

});


function updateDice(dice, number) {

    while (dice.firstChild) {
        dice.removeChild(dice.firstChild);
    }

    const dotPositions = getDotPositions(number);
    for (let i = 0; i < 9; i++) {
        const dot = document.createElement('div');
        dot.classList.add('dot');
        if (dotPositions.includes(i)) {
            dot.style.visibility = 'visible';
        } else {
            dot.style.visibility = 'hidden';
        }
        dice.appendChild(dot);
    }
}

function getDotPositions(number) {

    switch (number) {
        case 1:
            return [4];
        case 2:
            return [0, 8];
        case 3:
            return [0, 4, 8];
        case 4:
            return [0, 2, 6, 8];
        case 5:
            return [0, 2, 4, 6, 8];
        case 6:
            return [0, 2, 3, 5, 6, 8];
        default:
            return [];
    }
}

function updateDiceActivity(dice, isActive) {
    
    if (isActive) {
        dice.classList.remove('inactive');
        dice.classList.add('active');
    } else {
        dice.classList.remove('active');
        dice.classList.add('inactive');
    }
}


/**
 * 
 * yatzy_game.js
 * 
 * 
 * 
 */

//port logic
function countRoll() {
    setTimeout(() => {
        if (active['1'] || active['2'] || active['3'] || active['4'] || active['5']) {
            if (currRoll != 3) {
                currRoll++;
            }
            document.getElementById('roll-counter').textContent = "Current Roll: " + currRoll;
            if (currRoll == 3) {
                noRollsLeft = true;
            }
            if (!selectedScores['ones']) { calculateOnesScore(); }
            if (!selectedScores['twos']) { calculateTwosScore(); }
            if (!selectedScores['threes']) { calculateThreesScore(); }
            if (!selectedScores['fours']) { calculateFoursScore(); }
            if (!selectedScores['fives']) { calculateFivesScore(); }
            if (!selectedScores['sixes']) { calculateSixesScore(); }
            if (!selectedScores['onePair']) { calculateOnePairScore(); }
            if (!selectedScores['twoPairs']) { calculateTwoPairsScore(); }
            if (!selectedScores['threeOfAKind']) { calculateThreeOfAKindScore(); }
            if (!selectedScores['fourOfAKind']) { calculateFourOfAKindScore(); }
            if (!selectedScores['smallStraight']) { calculateSmallStraightScore(); }
            if (!selectedScores['largeStraight']) { calculateLargeStraightScore(); }
            if (!selectedScores['fullHouse']) { calculateFullHouseScore(); }
            if (!selectedScores['chance']) { calculateChanceScore(); }
            if (!selectedScores['yatzy']) { calculateYatzyScore(); }
        }
    }, 10);
}


//calc scores
function calculateOnesScore() {

    let onesCount = rolls.filter(value => value === 1).length;
    scores['ones'] = onesCount * 1;
    document.getElementById('OnesID').textContent = scores['ones'];
}

function calculateTwosScore() {

    let twosCount = rolls.filter(value => value === 2).length;
    scores['twos'] = twosCount * 2;
    document.getElementById('TwosID').textContent = scores['twos'];
}

function calculateThreesScore() {

    let threesCount = rolls.filter(value => value === 3).length;
    scores['threes'] = threesCount * 3;
    document.getElementById('ThreesID').textContent = scores['threes'];
}

function calculateFoursScore() {

    let foursCount = rolls.filter(value => value === 4).length;
    scores['fours'] = foursCount * 4;
    document.getElementById('FoursID').textContent = scores['fours'];
}

function calculateFivesScore() {

    let fivesCount = rolls.filter(value => value === 5).length;
    scores['fives'] = fivesCount * 5;
    document.getElementById('FivesID').textContent = scores['fives'];
}

function calculateSixesScore() {

    let sixesCount = rolls.filter(value => value === 6).length;
    scores['sixes'] = sixesCount * 6;
    document.getElementById('SixesID').textContent = scores['sixes'];
}

function calculateOnePairScore() {
    let counts = new Array(6).fill(0);
    rolls.forEach(value => counts[value - 1]++);
    scores['onePair'] = 0;
    for (let i = 5; i >= 0; i--) {
        if (counts[i] >= 2) {
            scores['onePair'] = (i + 1) * 2;
            break;
        }
    }
    document.getElementById('OnePairID').textContent = scores['onePair'];
}

function calculateTwoPairsScore() {
    let counts = new Array(6).fill(0);
    rolls.forEach(value => counts[value - 1]++);
    let pairs = [];
    for (let i = 5; i >= 0; i--) {
        if (counts[i] >= 2) {
            pairs.push(i + 1);
            if (pairs.length === 2) break;
        }
    }
    scores['twoPairs'] = pairs.length === 2 ? pairs.reduce((acc, value) => acc + value * 2, 0) : 0;
    document.getElementById('TwoPairID').textContent = scores['twoPairs'];
}

function calculateThreeOfAKindScore() {
    let counts = new Array(6).fill(0);
    rolls.forEach(value => counts[value - 1]++);
    scores['threeOfAKind'] = 0;
    for (let i = 5; i >= 0; i--) {
        if (counts[i] >= 3) {
            scores['threeOfAKind'] = (i + 1) * 3;
            break;
        }
    }
    document.getElementById('ThreeOfAKindID').textContent = scores['threeOfAKind'];
}

function calculateFourOfAKindScore() {
    let counts = new Array(6).fill(0);
    rolls.forEach(value => counts[value - 1]++);
    scores['fourOfAKind'] = 0;
    for (let i = 5; i >= 0; i--) {
        if (counts[i] >= 4) {
            scores['fourOfAKind'] = (i + 1) * 4;
            break;
        }
    }
    document.getElementById('FourOfAKindID').textContent = scores['fourOfAKind'];
}

function calculateSmallStraightScore() {
    let smallStraight = [1, 2, 3, 4, 5];
    let isSmallStraight = smallStraight.every(value => rolls.includes(value));
    scores['smallStraight'] = isSmallStraight ? 15 : 0;
    document.getElementById('SmallStraightID').textContent = scores['smallStraight'];
}

function calculateLargeStraightScore() {
    let largeStraight = [2, 3, 4, 5, 6];
    let isLargeStraight = largeStraight.every(value => rolls.includes(value));
    scores['largeStraight'] = isLargeStraight ? 20 : 0;
    document.getElementById('LargeStraightID').textContent = scores['largeStraight'];
}

function calculateFullHouseScore() {
    let counts = new Array(6).fill(0);
    rolls.forEach(value => counts[value - 1]++);
    let hasThreeOfAKind = false;
    let hasPair = false;
    scores['fullHouse'] = 0;
    counts.forEach((count, index) => {
        if (count === 3) hasThreeOfAKind = true;
        if (count === 2) hasPair = true;
    });
    if (hasThreeOfAKind && hasPair) {
        scores['fullHouse'] = rolls.reduce((acc, value) => acc + value, 0);
    }
    document.getElementById('FullHouseID').textContent = scores['fullHouse'];
}

function calculateChanceScore() {
    scores['chance'] = rolls.reduce((acc, value) => acc + value, 0);
    document.getElementById('ChanceID').textContent = scores['chance'];
}

function calculateYatzyScore() {
    let isYatzy = rolls.every(value => value === rolls[0]);
    if (isYatzy) {
        scores['yatzy'] = 50;
    }
    document.getElementById('YatzyID').textContent = scores['yatzy'];
}


/**
 * 
 * 
 * yatzy_engine.js
 * 
 * 
 */

//reset turn
function resetTurn() {

    active['1'] = true;
    active['2'] = true;
    active['3'] = true;
    active['4'] = true;
    active['5'] = true;
    updateDiceActivity(dice1, active['1']);
    updateDiceActivity(dice2, active['2']);
    updateDiceActivity(dice3, active['3']);
    updateDiceActivity(dice4, active['4']);
    updateDiceActivity(dice5, active['5']);
    currRoll = 0;
    noRollsLeft = false;
    document.getElementById('roll-counter').textContent = "Current Roll: " + currRoll;
}

function resetCardOnNewTurn() {
    if (!selectedScores['ones']) { document.getElementById('OnesID').textContent = ""; }
    if (!selectedScores['twos']) { document.getElementById('TwosID').textContent = ""; }
    if (!selectedScores['threes']) { document.getElementById('ThreesID').textContent = ""; }
    if (!selectedScores['fours']) { document.getElementById('FoursID').textContent = ""; }
    if (!selectedScores['fives']) { document.getElementById('FivesID').textContent = ""; }
    if (!selectedScores['sixes']) { document.getElementById('SixesID').textContent = ""; }
    if (!selectedScores['onePair']) { document.getElementById('OnePairID').textContent = ""; }
    if (!selectedScores['twoPairs']) { document.getElementById('TwoPairID').textContent = ""; }
    if (!selectedScores['threeOfAKind']) { document.getElementById('ThreeOfAKindID').textContent = ""; }
    if (!selectedScores['fourOfAKind']) { document.getElementById('FourOfAKindID').textContent = ""; }
    if (!selectedScores['smallStraight']) { document.getElementById('SmallStraightID').textContent = ""; }
    if (!selectedScores['largeStraight']) { document.getElementById('LargeStraightID').textContent = ""; }
    if (!selectedScores['fullHouse']) { document.getElementById('FullHouseID').textContent = ""; }
    if (!selectedScores['chance']) { document.getElementById('ChanceID').textContent = ""; }
    if (!selectedScores['yatzy']) { document.getElementById('YatzyID').textContent = ""; }
}

//calcing bonus score
function calculateBonus() {
    let upperBonus = scores['ones'] + scores['twos'] + scores['threes'] + scores['fours'] + scores['fives'] + scores['sixes'];
    document.getElementById('SumID').textContent = upperBonus;      //currently the sum of the upper section
    upperBonus = upperBonus >= 63 ? 50 : 0;                         
    document.getElementById('BonusID').textContent = upperBonus;    //now the bonus for the upper section
    return upperBonus; 
}

//game finished logic
function checkIfGameFinished() {
    if (selectedScores['ones'] && selectedScores['twos'] && selectedScores['threes'] &&
        selectedScores['fours'] && selectedScores['fives'] && selectedScores['sixes'] &&
        selectedScores['onePair'] && selectedScores['twoPairs'] && selectedScores['threeOfAKind'] &&
        selectedScores['fourOfAKind'] && selectedScores['smallStraight'] && selectedScores['largeStraight'] &&
        selectedScores['fullHouse'] && selectedScores['chance'] && selectedScores['yatzy']) {

            gameOver = true;
            total += calculateBonus();
            document.getElementById('TotalID').textContent = total;

            document.getElementById('gameOver').style.visibility = 'visible';
            document.getElementById('gameOver').textContent = "Game Over! Your total score is: " + total;
            document.getElementById('restartGame').style.visibility = 'visible';
    }
}