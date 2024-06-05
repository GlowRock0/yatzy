document.addEventListener('DOMContentLoaded', function() {
    const dice = document.getElementById('dice');
    updateDice(dice, 1); // Initialize the dice with the value 1

    document.getElementById('rollButton').addEventListener('click', function() {
        const result = Math.floor(Math.random() * 6) + 1;
        updateDice(dice, result);
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
