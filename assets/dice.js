let active1 = true;
let active2 = true;
let active3 = true;
let active4 = true;
let active5 = true;

document.addEventListener('DOMContentLoaded', function() {
    const dice1 = document.getElementById('dice1');
    updateDice(dice1, Math.floor(Math.random() * 6) + 1); // Initialize the dice with the value 1
    const dice2 = document.getElementById('dice2');
    updateDice(dice2, Math.floor(Math.random() * 6) + 1);
    const dice3 = document.getElementById('dice3');
    updateDice(dice3, Math.floor(Math.random() * 6) + 1);
    const dice4 = document.getElementById('dice4');
    updateDice(dice4, Math.floor(Math.random() * 6) + 1);
    const dice5 = document.getElementById('dice5');
    updateDice(dice5, Math.floor(Math.random() * 6) + 1);

    document.getElementById('rollButton').addEventListener('click', function() {
        if (active1) {
            const result1 = Math.floor(Math.random() * 6) + 1;
            updateDice(dice1, result1);
        }
        if (active2) {
            const result2 = Math.floor(Math.random() * 6) + 1;
            updateDice(dice2, result2);
        }
        if (active3) {
            const result3 = Math.floor(Math.random() * 6) + 1;
            updateDice(dice3, result3);
        }
        if (active4) {
            const result4 = Math.floor(Math.random() * 6) + 1;
            updateDice(dice4, result4);
        }
        if (active5) {
            const result5 = Math.floor(Math.random() * 6) + 1;
            updateDice(dice5, result5);
        }
    });

    dice1.addEventListener('click', function() {
        active1 = !active1;
        updateDiceActivity(dice1, active1);
    });

    dice2.addEventListener('click', function() {
        active2 = !active2;
        updateDiceActivity(dice2, active2);
    });

    dice3.addEventListener('click', function() {
        active3 = !active3;
        updateDiceActivity(dice3, active3);
    });

    dice4.addEventListener('click', function() {
        active4 = !active4;
        updateDiceActivity(dice4, active4);
    });

    dice5.addEventListener('click', function() {
        active5 = !active5;
        updateDiceActivity(dice5, active5);
    });
});

function updateDice(dice, number) {
    // Clear existing dots
    while (dice.firstChild) {
        dice.removeChild(dice.firstChild);
    }

    // Create dots based on the rolled number
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
        console.log("Dice is active");
    } else {
        dice.classList.remove('active');
        dice.classList.add('inactive');
        console.log("Dice is inactive");
    }
}