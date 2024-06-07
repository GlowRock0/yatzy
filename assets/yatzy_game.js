var currRoll = 0;
var turnOver = false;

function countRoll() {
    setTimeout(() => {
        currRoll++;
        if (currRoll == 3) {
            turnOver = true;
            console.log("turn over");
        }
    }, 10);
}

document.getElementById('rollButton').addEventListener('click', function() {
    countRoll();
});