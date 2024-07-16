function initializeGame() {
    const xhr = new XMLHttpRequest();
    xhr.open("POST", "api.php", true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

    xhr.onreadystatechange = function() {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
                const response = JSON.parse(xhr.responseText);
                console.log(response);
            } else {
                console.error("AJAX request failed: " + xhr.status);
            }
        }
    };

    const data = "action=initializeGame";
    xhr.send(data);
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
var sum = 0;
var bonus = 0;
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

//dice.js api calls
function getRolls() {
    fetch('api.php?action=get_rolls')
        .then((response) => response.json()) // Parse JSON directly
        .then((data) => {
            console.log('API Response:', data); // Log the data to inspect the structure

            diceNum['1'] = data.d1;
            diceNum['2'] = data.d2;
            diceNum['3'] = data.d3;
            diceNum['4'] = data.d4;
            diceNum['5'] = data.d5;

            console.log(diceNum['1'], diceNum['2'], diceNum['3'], diceNum['4'], diceNum['5']);
        })
        .catch((error) => console.error('Error fetching rolls:', error));
}

function toggleDice1Activity() {
    fetch('api.php?action=toggle_dice_1')
        .then((response) => response.json())
        .then((data) => {
            console.log('Toggle Dice 1:', data); // Log the response
            
            active['1'] = data.d1;

            console.log(active['1']);
        })
        .catch(error => console.error('Error toggling activity:', error));
}

function toggleDice2Activity() {
    fetch('api.php?action=toggle_dice_2')
        .then((response) => response.json())
        .then((data) => {
            console.log('Toggle Dice 2:', data); // Log the response
            
            active['2'] = data.d2;

            console.log(active['2']);
        })
        .catch(error => console.error('Error toggling activity:', error));
}

function toggleDice3Activity() {
    fetch('api.php?action=toggle_dice_3')
        .then((response) => response.json())
        .then((data) => {
            console.log('Toggle Dice 3:', data); // Log the response
            
            active['3'] = data.d3;

            console.log(active['3']);
        })
        .catch(error => console.error('Error toggling activity:', error));
}

function toggleDice4Activity() {
    fetch('api.php?action=toggle_dice_4')
        .then((response) => response.json())
        .then((data) => {
            console.log('Toggle Dice 4:', data); // Log the response
            
            active['4'] = data.d4;

            console.log(active['4']);
        })
        .catch(error => console.error('Error toggling activity:', error));
}

function toggleDice5Activity() {
    fetch('api.php?action=toggle_dice_5')
        .then((response) => response.json())
        .then((data) => {
            console.log('Toggle Dice 5:', data); // Log the response
            
            active['5'] = data.d5;

            console.log(active['5']);
        })
        .catch(error => console.error('Error toggling activity:', error));
}

//yatzy_game.js api calls
function getRollCount() {
    fetch('api.php?action=get_roll_count')
        .then((response) => response.json())
        .then((data) => {
            console.log('Get Roll Count Response:', data); // Log the response
            
            currRoll = data;

            console.log(currRoll);
        })
        .catch(error => console.error('Error getting roll count:', error));
}

function resetTurnOnAPI() {
    fetch('api.php?action=reset_turn')
        .then((response) => response.json())
        .then((data) => {
            console.log('Reset Turn Response:', data); // Log the response

            console.log("reset turn");
        })
        .catch(error => console.error('Error resetting turn:', error));
}

function calcOnes() {
    fetch('api.php?action=calc_ones')
        .then((response) => response.json())
        .then((data) => {
            console.log('Score ones:', data); // Log the response
            
            scores['ones'] = data.score;

            console.log(scores['ones']);
        })
        .catch(error => console.error('Error calcing ones:', error));
}

function calcTwos() {
    fetch('api.php?action=calc_twos')
        .then((response) => response.json())
        .then((data) => {
            console.log('Score twos:', data); // Log the response
            
            scores['twos'] = data.score;

            console.log(scores['twos']);
        })
        .catch(error => console.error('Error calcing twos:', error));
}

function calcThrees() {
    fetch('api.php?action=calc_threes')
        .then((response) => response.json())
        .then((data) => {
            console.log('Score threes:', data); // Log the response
            
            scores['threes'] = data.score;

            console.log(scores['threes']);
        })
        .catch(error => console.error('Error calcing threes:', error));
}

function calcFours() {
    fetch('api.php?action=calc_fours')
        .then((response) => response.json())
        .then((data) => {
            console.log('Score fours:', data); // Log the response
            
            scores['fours'] = data.score;

            console.log(scores['fours']);
        })
        .catch(error => console.error('Error calcing fours:', error));
}

function calcFives() {
    fetch('api.php?action=calc_fives')
        .then((response) => response.json())
        .then((data) => {
            console.log('Score fives:', data); // Log the response
            
            scores['fives'] = data.score;

            console.log(scores['fives']);
        })
        .catch(error => console.error('Error calcing fives:', error));
}

function calcSixes() {
    fetch('api.php?action=calc_sixes')
        .then((response) => response.json())
        .then((data) => {
            console.log('Score sixes:', data); // Log the response
            
            scores['sixes'] = data.score;

            console.log(scores['sixes']);
        })
        .catch(error => console.error('Error calcing sixes:', error));
}

function calcOnePair() {
    fetch('api.php?action=calc_one_pair')
        .then((response) => response.json())
        .then((data) => {
            console.log('Score one pair:', data); // Log the response
            
            scores['onePair'] = data.score;

            console.log(scores['onePair']);
        })
        .catch(error => console.error('Error calcing one pair:', error));
}

function calcTwoPairs() {
    fetch('api.php?action=calc_two_pairs')
        .then((response) => response.json())
        .then((data) => {
            console.log('Score two pairs:', data); // Log the response
            
            scores['twoPairs'] = data.score;

            console.log(scores['twoPairs']);
        })
        .catch(error => console.error('Error calcing two pairs:', error));
}

function calcThreeOfAKind() {
    fetch('api.php?action=calc_three_of_a_kind')
        .then((response) => response.json())
        .then((data) => {
            console.log('Score three of a kind:', data); // Log the response
            
            scores['threeOfAKind'] = data.score;

            console.log(scores['threeOfAKind']);
        })
        .catch(error => console.error('Error calcing three of a kind:', error));
}

function calcFourOfAKind() {
    fetch('api.php?action=calc_four_of_a_kind')
        .then((response) => response.json())
        .then((data) => {
            console.log('Score four of a kind:', data); // Log the response
            
            scores['fourOfAKind'] = data.score;

            console.log(scores['fourOfAKind']);
        })
        .catch(error => console.error('Error calcing four of a kind:', error));
}

function calcSmallStraight() {
    fetch('api.php?action=calc_small_straight')
        .then((response) => response.json())
        .then((data) => {
            console.log('Score small straight:', data); // Log the response
            
            scores['smallStraight'] = data.score;

            console.log(scores['smallStraight']);
        })
        .catch(error => console.error('Error calcing small straight:', error));
}

function calcLargeStraight() {
    fetch('api.php?action=calc_large_straight')
        .then((response) => response.json())
        .then((data) => {
            console.log('Score large straight:', data); // Log the response
            
            scores['largeStraight'] = data.score;

            console.log(scores['largeStraight']);
        })
        .catch(error => console.error('Error calcing large straight:', error));
}

function calcFullHouse() {
    fetch('api.php?action=calc_full_house')
        .then((response) => response.json())
        .then((data) => {
            console.log('Score full house:', data); // Log the response
            
            scores['fullHouse'] = data.score;

            console.log(scores['fullHouse']);
        })
        .catch(error => console.error('Error calcing full house:', error));
}

function calcChance() {
    fetch('api.php?action=calc_chance')
        .then((response) => response.json())
        .then((data) => {
            console.log('Score chance:', data); // Log the response
            
            scores['chance'] = data.score;

            console.log(scores['chance']);
        })
        .catch(error => console.error('Error calcing chance:', error));
}

function calcYatzy() {
    fetch('api.php?action=calc_yatzy')
        .then((response) => response.json())
        .then((data) => {
            console.log('Score yatzy:', data); // Log the response
            
            scores['yatzy'] = data.score;

            console.log(scores['yatzy']);
        })
        .catch(error => console.error('Error calcing yatzy:', error));
}








function activateOnes() {
    fetch('api.php?action=activate_ones')
        .then((response) => response.json())
        .then((data) => {
            console.log('Score ones:', data); // Log the response
            
            selectedScores['ones'] = data.active;

            console.log(selectedScores['ones']);
        })
        .catch(error => console.error('Error calcing ones:', error));
}

function activateTwos() {
    fetch('api.php?action=activate_twos')
        .then((response) => response.json())
        .then((data) => {
            console.log('Score twos:', data); // Log the response
            
            selectedScores['twos'] = data.active;

            console.log(selectedScores['twos']);
        })
        .catch(error => console.error('Error calcing twos:', error));
}

function activateThrees() {
    fetch('api.php?action=activate_threes')
        .then((response) => response.json())
        .then((data) => {
            console.log('Score threes:', data); // Log the response
            
            selectedScores['threes'] = data.active;

            console.log(selectedScores['threes']);
        })
        .catch(error => console.error('Error calcing threes:', error));
}

function activateFours() {
    fetch('api.php?action=activate_fours')
        .then((response) => response.json())
        .then((data) => {
            console.log('Score fours:', data); // Log the response
            
            selectedScores['fours'] = data.active;

            console.log(selectedScores['fours']);
        })
        .catch(error => console.error('Error calcing fours:', error));
}

function activateFives() {
    fetch('api.php?action=activate_fives')
        .then((response) => response.json())
        .then((data) => {
            console.log('Score fives:', data); // Log the response
            
            selectedScores['fives'] = data.active;

            console.log(selectedScores['fives']);
        })
        .catch(error => console.error('Error calcing fives:', error));
}

function activateSixes() {
    fetch('api.php?action=activate_sixes')
        .then((response) => response.json())
        .then((data) => {
            console.log('Score sixes:', data); // Log the response
            
            selectedScores['sixes'] = data.active;

            console.log(selectedScores['sixes']);
        })
        .catch(error => console.error('Error calcing sixes:', error));
}

function activateOnePair() {
    fetch('api.php?action=activate_one_pair')
        .then((response) => response.json())
        .then((data) => {
            console.log('Score one pair:', data); // Log the response
            
            selectedScores['onePair'] = data.active;

            console.log(selectedScores['onePair']);
        })
        .catch(error => console.error('Error calcing one pair:', error));
}

function activateTwoPairs() {
    fetch('api.php?action=activate_two_pairs')
        .then((response) => response.json())
        .then((data) => {
            console.log('Score two pairs:', data); // Log the response
            
            selectedScores['twoPairs'] = data.active;

            console.log(selectedScores['twoPairs']);
        })
        .catch(error => console.error('Error calcing two pairs:', error));
}

function activateThreeOfAKind() {
    fetch('api.php?action=activate_three_of_a_kind')
        .then((response) => response.json())
        .then((data) => {
            console.log('Score three of a kind:', data); // Log the response
            
            selectedScores['threeOfAKind'] = data.active;

            console.log(selectedScores['threeOfAKind']);
        })
        .catch(error => console.error('Error calcing three of a kind:', error));
}

function activateFourOfAKind() {
    fetch('api.php?action=activate_four_of_a_kind')
        .then((response) => response.json())
        .then((data) => {
            console.log('Score four of a kind:', data); // Log the response
            
            selectedScores['fourOfAKind'] = data.active;

            console.log(selectedScores['fourOfAKind']);
        })
        .catch(error => console.error('Error calcing four of a kind:', error));
}

function activateSmallStraight() {
    fetch('api.php?action=activate_small_straight')
        .then((response) => response.json())
        .then((data) => {
            console.log('Score small straight:', data); // Log the response
            
            selectedScores['smallStraight'] = data.active;

            console.log(selectedScores['smallStraight']);
        })
        .catch(error => console.error('Error calcing small straight:', error));
}

function activateLargeStraight() {
    fetch('api.php?action=activate_large_straight')
        .then((response) => response.json())
        .then((data) => {
            console.log('Score large straight:', data); // Log the response
            
            selectedScores['largeStraight'] = data.active;

            console.log(selectedScores['largeStraight']);
        })
        .catch(error => console.error('Error calcing large straight:', error));
}

function activateFullHouse() {
    fetch('api.php?action=activate_full_house')
        .then((response) => response.json())
        .then((data) => {
            console.log('Score full house:', data); // Log the response
            
            selectedScores['fullHouse'] = data.active;

            console.log(selectedScores['fullHouse']);
        })
        .catch(error => console.error('Error calcing full house:', error));
}

function activateChance() {
    fetch('api.php?action=activate_chance')
        .then((response) => response.json())
        .then((data) => {
            console.log('Score chance:', data); // Log the response
            
            selectedScores['chance'] = data.active;

            console.log(selectedScores['chance']);
        })
        .catch(error => console.error('Error calcing chance:', error));
}

function activateYatzy() {
    fetch('api.php?action=activate_yatzy')
        .then((response) => response.json())
        .then((data) => {
            console.log('Score yatzy:', data); // Log the response
            
            selectedScores['yatzy'] = data.active;

            console.log(selectedScores['yatzy']);
        })
        .catch(error => console.error('Error calcing yatzy:', error));
}

function calculateTotalScore() {
    fetch('api.php?action=calcScore')
    .then((response) => response.json())
    .then((data) => {
        console.log('Total score:', data); // Log the response
        
        total = data.score;

        console.log(total);
    })
    .catch(error => console.error('Error calcing total score:', error));
}

function getSumScore() {
    fetch('api.php?action=getSum')
    .then((response) => response.json())
    .then((data) => {
        console.log('Sum score:', data); // Log the response
        
        sum = data.score;

        console.log(total);
    })
    .catch(error => console.error('Error getting sum score:', error));
}

function getBonusScore() {
    fetch('api.php?action=getBonus')
    .then((response) => response.json())
    .then((data) => {
        console.log('Bonus score:', data); // Log the response
        
        bonus = data.score;

        console.log(total);
    })
    .catch(error => console.error('Error getting bonus score:', error));
}

function updateLeaderboard(leaderboard) {
    for (let i = 0; i < 10; i++) {
        const elementId = `scorePos${i + 1}`;
        const score = leaderboard[i] !== undefined ? leaderboard[i] : "";
        const element = document.getElementById(elementId);
        if (element) {
            element.textContent = score;
        } else {
            console.error(`Element with ID ${elementId} not found`);
        }
    }
}
function resetGameOnAPI() {
    fetch('api.php?action=reset_game')
    .then((response) => response.json())
    .then((data) => {
        console.log('Reset game:', data); // Log the response
        if (data.leaderboard) {
            updateLeaderboard(data.leaderboard);
        }
    })
    .catch(error => console.error('Error resetting the game:', error));  
}

function getLeaderboard() {
    fetch('api.php?action=get_leaderboard')
    .then((response) => response.json())
    .then((data) => {
        console.log('Reset game:', data); // Log the response
        if (data.leaderboard) {
            updateLeaderboard(data.leaderboard);
        }
    })
    .catch(error => console.error('Error resetting the game:', error)); 
}
















document.addEventListener('DOMContentLoaded', function() {

    // Call the fetchGameState function and pass the callback
    initializeGame();
    resetTurnOnAPI();
    getLeaderboard();

    document.getElementById('roll-counter').textContent = "Current Roll: " + currRoll;

    //call api
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

    document.getElementById('rollButton').addEventListener('click', function() {

        if (! noRollsLeft && !gameOver) {
            getRolls();
            setTimeout(() => {
                getRollCount();
                console.log("after rolls");
                if (! noRollsLeft && ! gameOver) {

                    if (active['1']) {

                        const result1 = diceNum['1'];
                        updateDice(dice1, result1);
                    }
                    if (active['2']) {

                        const result2 = diceNum['2'];
                        updateDice(dice2, result2);
                    }
                    if (active['3']) {

                        const result3 = diceNum['3'];
                        updateDice(dice3, result3);
                    }
                    if (active['4']) {

                        const result4 = diceNum['4'];
                        updateDice(dice4, result4);
                    }
                    if (active['5']) {

                        const result5 = diceNum['5'];
                        updateDice(dice5, result5);
                    }
                    rolls = [diceNum['1'], diceNum['2'], diceNum['3'], diceNum['4'], diceNum['5']];
                }
            }, 50);
        }
    });

    document.getElementById('rollButton').addEventListener('click', function() {
        countRoll();
    });


    dice1.addEventListener('click', function() {

        if (currRoll != 0 && ! gameOver) {

            toggleDice1Activity();

            setTimeout(() => {
                updateDiceActivity(dice1, active['1']);
            }, 100);
        }
    });

    dice2.addEventListener('click', function() {

        if (currRoll != 0 && ! gameOver) {

            toggleDice2Activity();

            setTimeout(() => {
                updateDiceActivity(dice2, active['2']);
            }, 100);
        }
    });

    dice3.addEventListener('click', function() {

        if (currRoll != 0 && ! gameOver) {
            
            toggleDice3Activity();

            setTimeout(() => {
                updateDiceActivity(dice3, active['3']);
            }, 100);
        }
    });

    dice4.addEventListener('click', function() {

        if (currRoll != 0 && ! gameOver) {
            
            toggleDice4Activity();

            setTimeout(() => {
                updateDiceActivity(dice4, active['4']);
            }, 100);
        }
    });

    dice5.addEventListener('click', function() {

        if (currRoll != 0 && ! gameOver) {
            
            toggleDice5Activity();

            setTimeout(() => {
                updateDiceActivity(dice5, active['5']);
            }, 100);
        }
    });

    document.getElementById('OnesID').addEventListener('click', function() {
        
        if (currRoll != 0 && ! selectedScores['ones']) {

            this.classList.remove('greyed-out');
            this.classList.add('score');
            selectedScores['ones'] = true;
            activateOnes();
            resetTurnOnAPI();
            setTimeout(() => {
                resetTurn();
            }, 100);
            resetCardOnNewTurn();
            checkIfGameFinished();
        }
    });

    document.getElementById('TwosID').addEventListener('click', function() {
        
        if (currRoll != 0 && ! selectedScores['twos']) {

            this.classList.remove('greyed-out');
            this.classList.add('score');
            selectedScores['twos'] = true;
            activateTwos();
            resetTurnOnAPI();
            setTimeout(() => {
                resetTurn();
            }, 100);
            resetCardOnNewTurn();
            checkIfGameFinished();
        }
    });

    document.getElementById('ThreesID').addEventListener('click', function() {
        
        if (currRoll != 0 && ! selectedScores['threes']) {

            this.classList.remove('greyed-out');
            this.classList.add('score');
            selectedScores['threes'] = true;
            activateThrees();
            resetTurnOnAPI();
            setTimeout(() => {
                resetTurn();
            }, 100);
            resetCardOnNewTurn();
            checkIfGameFinished();
        }
    });

    document.getElementById('FoursID').addEventListener('click', function() {
        
        if (currRoll != 0 && ! selectedScores['fours']) {

            this.classList.remove('greyed-out');
            this.classList.add('score');
            selectedScores['fours'] = true;
            activateFours();
            resetTurnOnAPI();
            setTimeout(() => {
                resetTurn();
            }, 100);
            resetCardOnNewTurn();
            checkIfGameFinished();
        }
    });

    document.getElementById('FivesID').addEventListener('click', function() {
        
        if (currRoll != 0 && ! selectedScores['fives']) {

            this.classList.remove('greyed-out');
            this.classList.add('score');
            selectedScores['fives'] = true;
            activateFives();
            resetTurnOnAPI();
            setTimeout(() => {
                resetTurn();
            }, 100);
            resetCardOnNewTurn();
            checkIfGameFinished();
        }
    });

    document.getElementById('SixesID').addEventListener('click', function() {
        
        if (currRoll != 0 && ! selectedScores['sixes']) {

            this.classList.remove('greyed-out');
            this.classList.add('score');
            selectedScores['sixes'] = true;
            activateSixes();
            resetTurnOnAPI();
            setTimeout(() => {
                resetTurn();
            }, 100);
            resetCardOnNewTurn();
            checkIfGameFinished();
        }
    });

    document.getElementById('OnePairID').addEventListener('click', function() {
        
        if (currRoll != 0 && ! selectedScores['onePair']) {

            this.classList.remove('greyed-out');
            this.classList.add('score');
            selectedScores['onePair'] = true;
            activateOnePair();
            resetTurnOnAPI();
            setTimeout(() => {
                resetTurn();
            }, 100);
            resetCardOnNewTurn();
            checkIfGameFinished();
        }
    });

    document.getElementById('TwoPairID').addEventListener('click', function() {
        
        if (currRoll != 0 && ! selectedScores['twoPairs']) {

            this.classList.remove('greyed-out');
            this.classList.add('score');
            selectedScores['twoPairs'] = true;
            activateTwoPairs();
            resetTurnOnAPI();
            setTimeout(() => {
                resetTurn();
            }, 100);
            resetCardOnNewTurn();
            checkIfGameFinished();
        }
    });

    document.getElementById('ThreeOfAKindID').addEventListener('click', function() {
        
        if (currRoll != 0 && ! selectedScores['threeOfAKind']) {

            this.classList.remove('greyed-out');
            this.classList.add('score');
            selectedScores['threeOfAKind'] = true;
            activateThreeOfAKind();
            resetTurnOnAPI();
            setTimeout(() => {
                resetTurn();
            }, 100);
            resetCardOnNewTurn();
            checkIfGameFinished();
        }
    });

    document.getElementById('FourOfAKindID').addEventListener('click', function() {
        
        if (currRoll != 0 && ! selectedScores['fourOfAKind']) {

            this.classList.remove('greyed-out');
            this.classList.add('score');
            selectedScores['fourOfAKind'] = true;
            activateFourOfAKind();
            resetTurnOnAPI();
            setTimeout(() => {
                resetTurn();
            }, 100);
            resetCardOnNewTurn();
            checkIfGameFinished();
        }
    });

    document.getElementById('SmallStraightID').addEventListener('click', function() {
        
        if (currRoll != 0 && ! selectedScores['smallStraight']) {

            this.classList.remove('greyed-out');
            this.classList.add('score');
            selectedScores['smallStraight'] = true;
            activateSmallStraight();
            resetTurnOnAPI();
            setTimeout(() => {
                resetTurn();
            }, 100);
            resetCardOnNewTurn();
            checkIfGameFinished();
        }
    });

    document.getElementById('LargeStraightID').addEventListener('click', function() {
        
        if (currRoll != 0 && ! selectedScores['largeStraight']) {

            this.classList.remove('greyed-out');
            this.classList.add('score');
            selectedScores['largeStraight'] = true;
            activateLargeStraight();
            resetTurnOnAPI();
            setTimeout(() => {
                resetTurn();
            }, 100);
            resetCardOnNewTurn();
            checkIfGameFinished();
        }
    });

    document.getElementById('FullHouseID').addEventListener('click', function() {
        
        if (currRoll != 0 && ! selectedScores['fullHouse']) {

            this.classList.remove('greyed-out');
            this.classList.add('score');
            selectedScores['fullHouse'] = true;
            activateFullHouse();
            resetTurnOnAPI();
            setTimeout(() => {
                resetTurn();
            }, 100);
            resetCardOnNewTurn();
            checkIfGameFinished();
        }
    });

    document.getElementById('ChanceID').addEventListener('click', function() {
        
        if (currRoll != 0 && ! selectedScores['chance']) {

            this.classList.remove('greyed-out');
            this.classList.add('score');
            selectedScores['chance'] = true;
            activateChance();
            resetTurnOnAPI();
            setTimeout(() => {
                resetTurn();
            }, 100);
            resetCardOnNewTurn();
            checkIfGameFinished();
        }
    });

    document.getElementById('YatzyID').addEventListener('click', function() {
        
        if (currRoll != 0 && ! selectedScores['yatzy']) {

            this.classList.remove('greyed-out');
            this.classList.add('score');
            selectedScores['yatzy'] = true;
            activateYatzy();
            resetTurnOnAPI();
            setTimeout(() => {
                resetTurn();
            }, 100);
            resetCardOnNewTurn();
            checkIfGameFinished();
        }
    });


    document.getElementById('restartGame').addEventListener('click', function() {
        if (gameOver) {

            resetGameOnAPI();

            setTimeout(() => {

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
            }, 100);
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

function countRoll() {
    setTimeout(() => {
        if (active['1'] || active['2'] || active['3'] || active['4'] || active['5']) {
            if (currRoll != 3 && !gameOver) {
                currRoll++;
            }
            document.getElementById('roll-counter').textContent = "Current Roll: " + currRoll;
            setTimeout(() => {
                if (currRoll == 3) {
                    noRollsLeft = true;
                }
            }, 50);
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



function calculateOnesScore() {

    calcOnes();
    setTimeout(() => {
        document.getElementById('OnesID').textContent = scores['ones'];
    }, 100);   
}

function calculateTwosScore() {

    calcTwos();
    setTimeout(() => {
        document.getElementById('TwosID').textContent = scores['twos'];
    }, 100);  
}

function calculateThreesScore() {

    calcThrees();
    setTimeout(() => {
        document.getElementById('ThreesID').textContent = scores['threes'];
    }, 100);  
}

function calculateFoursScore() {

    calcFours();
    setTimeout(() => {
        document.getElementById('FoursID').textContent = scores['fours'];
    }, 100);  
}

function calculateFivesScore() {

    calcFives();
    setTimeout(() => {
        document.getElementById('FivesID').textContent = scores['fives'];
    }, 100); 
}

function calculateSixesScore() {

    calcSixes();
    setTimeout(() => {
        document.getElementById('SixesID').textContent = scores['sixes'];
    }, 100); 
}

function calculateOnePairScore() {

    calcOnePair();
    setTimeout(() => {
        document.getElementById('OnePairID').textContent = scores['onePair'];
    }, 100); 
}

function calculateTwoPairsScore() {

    calcTwoPairs();
    setTimeout(() => {
        document.getElementById('TwoPairID').textContent = scores['twoPairs'];
    }, 100); 
}

function calculateThreeOfAKindScore() {

    calcThreeOfAKind();
    setTimeout(() => {
        document.getElementById('ThreeOfAKindID').textContent = scores['threeOfAKind'];
    }, 100); 
}

function calculateFourOfAKindScore() {

    calcFourOfAKind();
    setTimeout(() => {
        document.getElementById('FourOfAKindID').textContent = scores['fourOfAKind'];
    }, 100); 
}

function calculateSmallStraightScore() {

    calcSmallStraight();
    setTimeout(() => {
        document.getElementById('SmallStraightID').textContent = scores['smallStraight'];
    }, 100); 
}

function calculateLargeStraightScore() {

    calcLargeStraight();
    setTimeout(() => {
        document.getElementById('LargeStraightID').textContent = scores['largeStraight'];
    }, 100); 
}

function calculateFullHouseScore() {

    calcFullHouse();
    setTimeout(() => {
        document.getElementById('FullHouseID').textContent = scores['fullHouse'];
    }, 100); 
}

function calculateChanceScore() {

    calcChance();
    setTimeout(() => {
        document.getElementById('ChanceID').textContent = scores['chance'];
    }, 100); 
}

function calculateYatzyScore() {

    calcYatzy();
    setTimeout(() => {
        document.getElementById('YatzyID').textContent = scores['yatzy'];
    }, 100); 
}


/**
 * 
 * 
 * yatzy_engine.js
 * 
 * 
 */


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

function checkIfGameFinished() {
    if (selectedScores['ones'] && selectedScores['twos'] && selectedScores['threes'] &&
        selectedScores['fours'] && selectedScores['fives'] && selectedScores['sixes'] &&
        selectedScores['onePair'] && selectedScores['twoPairs'] && selectedScores['threeOfAKind'] &&
        selectedScores['fourOfAKind'] && selectedScores['smallStraight'] && selectedScores['largeStraight'] &&
        selectedScores['fullHouse'] && selectedScores['chance'] && selectedScores['yatzy']) {

            gameOver = true;
            calculateTotalScore();
            setTimeout(() => {

                getSumScore();
                getBonusScore();

                setTimeout(() => {

                    document.getElementById('TotalID').textContent = total;

                    document.getElementById('SumID').textContent = sum;
                    document.getElementById('BonusID').textContent = bonus;
                    document.getElementById('gameOver').style.visibility = 'visible';
                    document.getElementById('gameOver').textContent = "Game Over! Your total score is: " + total;
                    document.getElementById('restartGame').style.visibility = 'visible';
                }, 100);
            }, 100);

    }
}