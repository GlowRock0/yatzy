<?php

?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Yatzy</title>
    <link rel="stylesheet" href="styles.php">
</head>
<body>
    <div class="roll-button">
        <div class="roll-counter" id="roll-counter"></div> 
        <button id="rollButton">Roll Dice</button>
        <div class="dice-container">           
            <div class="dice" id="dice1">
                <div class="dot one"></div>
            </div>
            <div class="dice" id="dice2">
                <div class="dot one"></div>
            </div>
            <div class="dice" id="dice3">
                <div class="dot one"></div>
            </div>
            <div class="dice" id="dice4">
                <div class="dot one"></div>
            </div>
            <div class="dice" id="dice5">
                <div class="dot one"></div>
            </div>
        </div>
        <div class="keeping-border">Keeping</div>

        <div class="game-over" id="gameOver"></div>
        <button class="restart-game-btn" id="restartGame">Restart Game</button>
    </div>

    <div class="scoreboard">
        <h1>Yatzy Scoreboard</h1>
        <table>
            <thead>
                <tr>
                    <th>Category</th>
                    <th>Player</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>Ones</td>
                    <td class="greyed-out" id="OnesID"></td>
                </tr>
                <tr>
                    <td>Twos</td>
                    <td class="greyed-out" id="TwosID"></td>
                </tr>
                <tr>
                    <td>Threes</td>
                    <td class="greyed-out" id="ThreesID"></td>
                </tr>
                <tr>
                    <td>Fours</td>
                    <td class="greyed-out" id="FoursID"></td>
                </tr>
                <tr>
                    <td>Fives</td>
                    <td class="greyed-out" id="FivesID"></td>
                </tr>
                <tr>
                    <td>Sixes</td>
                    <td class="greyed-out" id="SixesID"></td>
                </tr>
                <tr>
                    <td>Sum</td>
                    <td id="SumID"></td>
                </tr>
                <tr>
                    <td>Bonus</td>
                    <td id="BonusID"></td>
                </tr>
                <tr>
                    <td>One Pair</td>
                    <td class="greyed-out" id="OnePairID"></td>
                </tr>
                <tr>
                    <td>Two Pairs</td>
                    <td class="greyed-out" id="TwoPairID"></td>
                </tr>
                <tr>
                    <td>Three of a Kind</td>
                    <td class="greyed-out" id="ThreeOfAKindID"></td>
                </tr>
                <tr>
                    <td>Four of a Kind</td>
                    <td class="greyed-out" id="FourOfAKindID"></td>
                </tr>
                <tr>
                    <td>Small Straight</td>
                    <td class="greyed-out" id="SmallStraightID"></td>
                </tr>
                <tr>
                    <td>Large Straight</td>
                    <td class="greyed-out" id="LargeStraightID"></td>
                </tr>
                <tr>
                    <td>Full House</td>
                    <td class="greyed-out" id="FullHouseID"></td>
                </tr>
                <tr>
                    <td>Chance</td>
                    <td class="greyed-out" id="ChanceID"></td>
                </tr>
                <tr>
                    <td>Yatzy</td>
                    <td class="greyed-out" id="YatzyID"></td>
                </tr>
                <tr>
                    <td>Total Score</td>
                    <td id="TotalID"></td>
                </tr>
            </tbody>
        </table>
    </div>
    <div class="scoreboard">
        <h1>Yatzy Leaderboard</h1>
        <table>
            <thead>
                <tr>
                    <th>Position</th>
                    <th>Score</th>
                </tr>
            </thead>
                <tr>
                    <td>#1</td>
                    <td id="scorePos1"></td>
                </tr>
                <tr>
                    <td>#2</td>
                    <td id="scorePos2"></td>
                </tr>
                <tr>
                    <td>#3</td>
                    <td id="scorePos3"></td>
                </tr>
                <tr>
                    <td>#4</td>
                    <td id="scorePos4"></td>
                </tr>
                <tr>
                    <td>#5</td>
                    <td id="scorePos5"></td>
                </tr>
                <tr>
                    <td>#6</td>
                    <td id="scorePos6"></td>
                </tr>
                <tr>
                    <td>#7</td>
                    <td id="scorePos7"></td>
                </tr>
                <tr>
                    <td>#8</td>
                    <td id="scorePos8"></td>
                </tr>
                <tr>
                    <td>#9</td>
                    <td id="scorePos9"></td>
                </tr>
                <tr>
                    <td>#10</td>
                    <td id="scorePos10"></td>
                </tr>
            <tbody>
            </tbody>
        </table>
    </div>

    <script src="scripts.js"></script>
</body>
</html>