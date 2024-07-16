<?php
session_start();

header('Content-Type: application/json');

function initDice() {
    if (!isset($_SESSION['diceNums'])) {
        $_SESSION['diceNums'] = array(
            'd1' => rand(1, 6),
            'd2' => rand(1, 6),
            'd3' => rand(1, 6),
            'd4' => rand(1, 6),
            'd5' => rand(1, 6)
        );
    }
}

function initDiceStates() {
    if (!isset($_SESSION['diceActivity'])) {
        $_SESSION['diceActivity'] = array(
            'd1' => true,
            'd2' => true,
            'd3' => true,
            'd4' => true,
            'd5' => true
        );
    }
}

function initRollCount() {
    if (!isset($_SESSION['currRoll'])) {
        $_SESSION['currRoll'] = 0;
    }
}

function initSelectedScores() {
    if (!isset($_SESSION['selectedScores'])) {
        $_SESSION['selectedScores'] = array(
            'ones' => false,
            'twos' => false,
            'threes' => false,
            'fours' => false,
            'fives' => false,
            'sixes' => false,
            'onePair' => false,
            'twoPairs' => false,
            'threeOfAKind' => false,
            'fourOfAKind' => false,
            'smallStraight' => false,
            'largeStraight' => false,
            'fullHouse' => false,
            'chance' => false,
            'yatzy' => false
        );
    }
}

function initScores() {
    if (!isset($_SESSION['scores'])) {
        $_SESSION['scores'] = array(
            'ones' => 0,
            'twos' => 0,
            'threes' => 0,
            'fours' => 0,
            'fives' => 0,
            'sixes' => 0,
            'onePair' => 0,
            'twoPairs' => 0,
            'threeOfAKind' => 0,
            'fourOfAKind' => 0,
            'smallStraight' => 0,
            'largeStraight' => 0,
            'fullHouse' => 0,
            'chance' => 0,
            'yatzy' => 0
        );
    }
}

function initTotalScores() {
    if (!isset($_SESSION['totalScores'])) {
        $_SESSION['totalScores'] = array(
            'upperScore' => 0,
            'bonusScore' => 0,
            'lowerScore' => 0,
            'totalScore' => 0
        );
    }
}

if (!isset($_SESSION['leaderboard'])) {
    $_SESSION['leaderboard'] = [];
}

initDice();
initDiceStates();
initRollCount();
initSelectedScores();
initScores();
initTotalScores();


//dice.js into api

function rollDice() {
    foreach ($_SESSION['diceNums'] as $key => &$value) {
        if ($_SESSION['diceActivity'][$key]) {
            $value = rand(1, 6);
        }
    }
    $_SESSION['currRoll']++;
}

function toggleDiceActivity($die) {
    $_SESSION['diceActivity'][$die] = !$_SESSION['diceActivity'][$die];
}

function filterDiceActivity($activity) {
    return [
        'd1' => $activity['d1'],
        'd2' => $activity['d2'],
        'd3' => $activity['d3'],
        'd4' => $activity['d4'],
        'd5' => $activity['d5']
    ];
}


//yatzy_game.js into api

function resetTurn() {
    $_SESSION['currRoll'] = 0;
    $_SESSION['diceActivity']['d1'] = true;
    $_SESSION['diceActivity']['d2'] = true;
    $_SESSION['diceActivity']['d3'] = true;
    $_SESSION['diceActivity']['d4'] = true;
    $_SESSION['diceActivity']['d5'] = true;
}

function calculateOnesScore() {
    $rolls = $_SESSION['diceNums'];

    $onesCount = array_count_values($rolls)[1] ?? 0;
    return $onesCount * 1;
}

function calculateTwosScore() {
    $rolls = $_SESSION['diceNums'];
    $twosCount = array_count_values($rolls)[2] ?? 0;
    return $twosCount * 2;
}

function calculateThreesScore() {
    $rolls = $_SESSION['diceNums'];
    $threesCount = array_count_values($rolls)[3] ?? 0;
    return $threesCount * 3;
}

function calculateFoursScore() {
    $rolls = $_SESSION['diceNums'];
    $foursCount = array_count_values($rolls)[4] ?? 0;
    return $foursCount * 4;
}

function calculateFivesScore() {
    $rolls = $_SESSION['diceNums'];
    $fivesCount = array_count_values($rolls)[5] ?? 0;
    return $fivesCount * 5;
}

function calculateSixesScore() {
    $rolls = $_SESSION['diceNums'];
    $sixesCount = array_count_values($rolls)[6] ?? 0;
    return $sixesCount * 6;
}

function calculateOnePairScore() {
    $rolls = $_SESSION['diceNums'];
    $counts = array_count_values($rolls);
    krsort($counts);
    foreach ($counts as $value => $count) {
        if ($count >= 2) {
            return $value * 2;
        }
    }
    return 0;
}

function calculateTwoPairsScore() {
    $rolls = $_SESSION['diceNums'];
    $counts = array_count_values($rolls);
    krsort($counts);
    $pairs = [];
    foreach ($counts as $value => $count) {
        if ($count >= 2) {
            $pairs[] = $value;
            if (count($pairs) == 2) {
                return array_sum($pairs) * 2;
            }
        }
    }
    return 0;
}

function calculateThreeOfAKindScore() {
    $rolls = $_SESSION['diceNums'];
    $counts = array_count_values($rolls);
    krsort($counts);
    foreach ($counts as $value => $count) {
        if ($count >= 3) {
            return $value * 3;
        }
    }
    return 0;
}

function calculateFourOfAKindScore() {
    $rolls = $_SESSION['diceNums'];
    $counts = array_count_values($rolls);
    krsort($counts);
    foreach ($counts as $value => $count) {
        if ($count >= 4) {
            return $value * 4;
        }
    }
    return 0;
}

function calculateSmallStraightScore() {
    $rolls = $_SESSION['diceNums'];
    $smallStraight = [1, 2, 3, 4, 5];
    if (!array_diff($smallStraight, $rolls)) {
        return 15;
    }
    return 0;
}

function calculateLargeStraightScore() {
    $rolls = $_SESSION['diceNums'];
    $largeStraight = [2, 3, 4, 5, 6];
    if (!array_diff($largeStraight, $rolls)) {
        return 20;
    }
    return 0;
}

function calculateFullHouseScore() {
    $rolls = $_SESSION['diceNums'];
    $counts = array_count_values($rolls);
    $hasThreeOfAKind = false;
    $hasPair = false;
    foreach ($counts as $count) {
        if ($count == 3) $hasThreeOfAKind = true;
        if ($count == 2) $hasPair = true;
    }
    if ($hasThreeOfAKind && $hasPair) {
        return array_sum($rolls);
    }
    return 0;
}

function calculateChanceScore() {
    $rolls = $_SESSION['diceNums'];
    return array_sum($rolls);
}

function calculateYatzyScore() {
    $rolls = $_SESSION['diceNums'];
    if (count(array_unique($rolls)) === 1) {
        return 50;
    }
    return 0;
}


//yatzy_engine.js into api

function calculateScore() {
    $_SESSION['totalScores']['upperScore'] = $_SESSION['scores']['ones'] + $_SESSION['scores']['twos'] + $_SESSION['scores']['threes'] +
    $_SESSION['scores']['fours'] + $_SESSION['scores']['fives'] + $_SESSION['scores']['sixes'];
    if ($_SESSION['totalScores']['upperScore'] >= 63) {
        $_SESSION['totalScores']['bonusScore'] = 50;
    }

    $_SESSION['totalScores']['lowerScore'] = $_SESSION['scores']['onePair'] + $_SESSION['scores']['twoPairs'] + $_SESSION['scores']['threeOfAKind'] +
    $_SESSION['scores']['fourOfAKind'] + $_SESSION['scores']['smallStraight'] + $_SESSION['scores']['largeStraight'] + $_SESSION['scores']['fullHouse'] + 
    $_SESSION['scores']['chance'] + $_SESSION['scores']['yatzy'];

    $_SESSION['totalScores']['totalScore'] = $_SESSION['totalScores']['upperScore'] + $_SESSION['totalScores']['bonusScore'] + $_SESSION['totalScores']['lowerScore'];
}

function resetGame() {
    resetTurn();

    foreach ($_SESSION['selectedScores'] as $key => &$value) {
        if ($_SESSION['selectedScores'][$key]) {
            $value = false;
        }
    }

    foreach ($_SESSION['scores'] as $key => &$value) {
        if ($_SESSION['scores'][$key]) {
            $value = 0;
        }
    }

    $_SESSION['totalScores']['upperScore'] = 0;
    $_SESSION['totalScores']['bonusScore'] = 0;
    $_SESSION['totalScores']['lowerScore'] = 0;
    $_SESSION['totalScores']['totalScore'] = 0;
}


function postScore() {

    $currentScore = $_SESSION['totalScores']['totalScore'];
    $_SESSION['leaderboard'][] = $currentScore;
    rsort($_SESSION['leaderboard']);
    $_SESSION['leaderboard'] = array_slice($_SESSION['leaderboard'], 0, 10);
}

function getLeaderboard() {
    return $_SESSION['leaderboard'];
}



$method = $_SERVER['REQUEST_METHOD'];
$response = [];

switch ($method) {
    case 'GET':

        //dice.js api calls
        if (isset($_GET['action']) && $_GET['action'] == 'get_rolls') {
            rollDice();
            $response = $_SESSION['diceNums'];

            echo json_encode($response);
            exit;
        } elseif (isset($_GET['action']) && $_GET['action'] == 'toggle_dice_1') {
            toggleDiceActivity('d1');
            $filteredActivity = filterDiceActivity($_SESSION['diceActivity']);

            echo json_encode($filteredActivity);
            exit;
        } elseif (isset($_GET['action']) && $_GET['action'] == 'toggle_dice_2') {
            toggleDiceActivity('d2');
            $filteredActivity = filterDiceActivity($_SESSION['diceActivity']);

            echo json_encode($filteredActivity);
            exit;
        } elseif (isset($_GET['action']) && $_GET['action'] == 'toggle_dice_3') {
            toggleDiceActivity('d3');
            $filteredActivity = filterDiceActivity($_SESSION['diceActivity']);

            echo json_encode($filteredActivity);
            exit;
        } elseif (isset($_GET['action']) && $_GET['action'] == 'toggle_dice_4') {
            toggleDiceActivity('d4');
            $filteredActivity = filterDiceActivity($_SESSION['diceActivity']);

            echo json_encode($filteredActivity);
            exit;
        } elseif (isset($_GET['action']) && $_GET['action'] == 'toggle_dice_5') {
            toggleDiceActivity('d5');
            $filteredActivity = filterDiceActivity($_SESSION['diceActivity']);

            echo json_encode($filteredActivity);
            exit;
        } elseif (isset($_GET['action']) && $_GET['action'] == 'get_roll_count') {
            $response = $_SESSION['currRoll'];

            echo json_encode($response);
            exit;
        }

        //yatzy_game.js api calls
        elseif (isset($_GET['action']) && $_GET['action'] == 'reset_turn') {
            resetTurn();
            $response = "reset turn";

            echo json_encode($response);
            exit;
        } elseif (isset($_GET['action']) && $_GET['action'] == 'calc_ones') {

            $_SESSION['scores']['ones'] = calculateOnesScore();

            echo json_encode(['score' => calculateOnesScore()]);
            exit;
        } elseif (isset($_GET['action']) && $_GET['action'] == 'calc_twos') {

            $_SESSION['scores']['twos'] = calculateTwosScore();

            echo json_encode(['score' => calculateTwosScore()]);
            exit;
        } elseif (isset($_GET['action']) && $_GET['action'] == 'calc_threes') {

            $_SESSION['scores']['threes'] = calculateThreesScore();

            echo json_encode(['score' => calculateThreesScore()]);
            exit;
        } elseif (isset($_GET['action']) && $_GET['action'] == 'calc_fours') {

            $_SESSION['scores']['fours'] = calculateFoursScore();

            echo json_encode(['score' => calculateFoursScore()]);
            exit;
        } elseif (isset($_GET['action']) && $_GET['action'] == 'calc_fives') {

            $_SESSION['scores']['fives'] = calculateFivesScore();

            echo json_encode(['score' => calculateFivesScore()]);
            exit;
        } elseif (isset($_GET['action']) && $_GET['action'] == 'calc_sixes') {

            $_SESSION['scores']['sixes'] = calculateSixesScore();

            echo json_encode(['score' => calculateSixesScore()]);
            exit;
        } elseif (isset($_GET['action']) && $_GET['action'] == 'calc_one_pair') {

            $_SESSION['scores']['onePair'] = calculateOnePairScore();

            echo json_encode(['score' => calculateOnePairScore()]);
            exit;
        } elseif (isset($_GET['action']) && $_GET['action'] == 'calc_two_pairs') {

            $_SESSION['scores']['twoPairs'] = calculateTwoPairsScore();

            echo json_encode(['score' => calculateTwoPairsScore()]);
            exit;
        } elseif (isset($_GET['action']) && $_GET['action'] == 'calc_three_of_a_kind') {

            $_SESSION['scores']['threeOfAKind'] = calculateThreeOfAKindScore();

            echo json_encode(['score' => calculateThreeOfAKindScore()]);
            exit;
        } elseif (isset($_GET['action']) && $_GET['action'] == 'calc_four_of_a_kind') {

            $_SESSION['scores']['fourOfAKind'] = calculateFourOfAKindScore();

            echo json_encode(['score' => calculateFourOfAKindScore()]);
            exit;
        } elseif (isset($_GET['action']) && $_GET['action'] == 'calc_small_straight') {

            $_SESSION['scores']['smallStraight'] = calculateSmallStraightScore();

            echo json_encode(['score' => calculateSmallStraightScore()]);
            exit;
        } elseif (isset($_GET['action']) && $_GET['action'] == 'calc_large_straight') {

            $_SESSION['scores']['largeStraight'] = calculateLargeStraightScore();

            echo json_encode(['score' => calculateLargeStraightScore()]);
            exit;
        } elseif (isset($_GET['action']) && $_GET['action'] == 'calc_full_house') {

            $_SESSION['scores']['fullHouse'] = calculateFullHouseScore();

            echo json_encode(['score' => calculateFullHouseScore()]);
            exit;
        } elseif (isset($_GET['action']) && $_GET['action'] == 'calc_chance') {

            $_SESSION['scores']['chance'] = calculateChanceScore();

            echo json_encode(['score' => calculateChanceScore()]);
            exit;
        } elseif (isset($_GET['action']) && $_GET['action'] == 'calc_yatzy') {

            $_SESSION['scores']['yatzy'] = calculateYatzyScore();

            echo json_encode(['score' => calculateYatzyScore()]);
            exit;
        } 
        
        elseif (isset($_GET['action']) && $_GET['action'] == 'activate_ones') {

            $_SESSION['selectedScores']['ones'] = true;
            echo json_encode(['active' => $_SESSION['selectedScores']['ones']]);
            exit;
        } elseif (isset($_GET['action']) && $_GET['action'] == 'activate_twos') {

            $_SESSION['selectedScores']['twos'] = true;
            echo json_encode(['active' => $_SESSION['selectedScores']['twos']]);
            exit;
        } elseif (isset($_GET['action']) && $_GET['action'] == 'activate_threes') {

            $_SESSION['selectedScores']['threes'] = true;
            echo json_encode(['active' => $_SESSION['selectedScores']['threes']]);
            exit;
        } elseif (isset($_GET['action']) && $_GET['action'] == 'activate_fours') {

            $_SESSION['selectedScores']['fours'] = true;
            echo json_encode(['active' => $_SESSION['selectedScores']['fours']]);
            exit;
        } elseif (isset($_GET['action']) && $_GET['action'] == 'activate_fives') {

            $_SESSION['selectedScores']['fives'] = true;
            echo json_encode(['active' => $_SESSION['selectedScores']['fives']]);
            exit;
        } elseif (isset($_GET['action']) && $_GET['action'] == 'activate_sixes') {

            $_SESSION['selectedScores']['sixes'] = true;
            echo json_encode(['active' => $_SESSION['selectedScores']['sixes']]);
            exit;
        } elseif (isset($_GET['action']) && $_GET['action'] == 'activate_one_pair') {

            $_SESSION['selectedScores']['onePair'] = true;
            echo json_encode(['active' => $_SESSION['selectedScores']['onePair']]);
            exit;
        } elseif (isset($_GET['action']) && $_GET['action'] == 'activate_two_pairs') {

            $_SESSION['selectedScores']['twoPairs'] = true;
            echo json_encode(['active' => $_SESSION['selectedScores']['twoPairs']]);
            exit;
        } elseif (isset($_GET['action']) && $_GET['action'] == 'activate_three_of_a_kind') {

            $_SESSION['selectedScores']['threeOfAKind'] = true;
            echo json_encode(['active' => $_SESSION['selectedScores']['threeOfAKind']]);
            exit;
        } elseif (isset($_GET['action']) && $_GET['action'] == 'activate_four_of_a_kind') {

            $_SESSION['selectedScores']['fourOfAKind'] = true;
            echo json_encode(['active' => $_SESSION['selectedScores']['fourOfAKind']]);
            exit;
        } elseif (isset($_GET['action']) && $_GET['action'] == 'activate_small_straight') {

            $_SESSION['selectedScores']['smallStraight'] = true;
            echo json_encode(['active' => $_SESSION['selectedScores']['smallStraight']]);
            exit;
        } elseif (isset($_GET['action']) && $_GET['action'] == 'activate_large_straight') {

            $_SESSION['selectedScores']['largeStraight'] = true;
            echo json_encode(['active' => $_SESSION['selectedScores']['largeStraight']]);
            exit;
        } elseif (isset($_GET['action']) && $_GET['action'] == 'activate_full_house') {

            $_SESSION['selectedScores']['fullHouse'] = true;
            echo json_encode(['active' => $_SESSION['selectedScores']['fullHouse']]);
            exit;
        } elseif (isset($_GET['action']) && $_GET['action'] == 'activate_chance') {

            $_SESSION['selectedScores']['chance'] = true;
            echo json_encode(['active' => $_SESSION['selectedScores']['chance']]);
            exit;
        } elseif (isset($_GET['action']) && $_GET['action'] == 'activate_yatzy') {

            $_SESSION['selectedScores']['yatzy'] = true;
            echo json_encode(['active' => $_SESSION['selectedScores']['yatzy']]);
            exit;
        }

        elseif (isset($_GET['action']) && $_GET['action'] == 'calcScore') {

            calculateScore();

            echo json_encode(['score' => $_SESSION['totalScores']['totalScore']]);
            exit;
        } elseif (isset($_GET['action']) && $_GET['action'] == 'getSum') {

            echo json_encode(['score' => $_SESSION['totalScores']['upperScore']]);
            exit;
        } elseif (isset($_GET['action']) && $_GET['action'] == 'getBonus') {

            echo json_encode(['score' => $_SESSION['totalScores']['bonusScore']]);
            exit;
        } elseif (isset($_GET['action']) && $_GET['action'] == 'reset_game') {
            postScore();
            resetGame();
            $response = getLeaderboard();

            echo json_encode(['leaderboard' => $response]);
            exit;
        } elseif (isset($_GET['action']) && $_GET['action'] == 'get_leaderboard') {

            $response = getLeaderboard();

            echo json_encode(['leaderboard' => $response]);
            exit;
        }

        break;

    case 'POST':
        $input = json_decode(file_get_contents('php://input'), true);
        break;

    default:
        $response = ['status' => 'error', 'message' => 'Invalid request method'];
        break;
}

echo json_encode($response);
?>
