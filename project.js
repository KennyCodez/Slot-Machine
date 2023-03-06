// 1. Depost some money
// 2. Determine number of lines to bet on
// 3. Collect a bet amount
// 4. Spin the slot machine
// 5. Check if the user won
// 6. Give the user their winnings
// 7. Play Again

const prompt = require("prompt-sync")();

const ROWS = 3;
const COLS = 3;

const SYMBOLS_COUNT = {
    A: 2,
    B: 4,
    C: 6,
    D: 8
}

const SYMBOLS_VALUES = {
    A: 5,
    B: 4,
    C: 3,
    D: 2
}

const deposit = () => {
    while (true) { // Keep looping until a valid number is given
        const depositAmount = prompt("Enter a deposit amount: "); // Prompt the user for an amount
        const numberDepositAmount = parseFloat(depositAmount); // Parse the input from a string into a floating point integer
    
        if (isNaN(numberDepositAmount) || numberDepositAmount <= 0) { // isNaN() function checks if the input is a number
            console.log("Invalid depost amount, try again.") // If the conditions are met the print "invalid"
        } 
        else {
            return numberDepositAmount; // Return valid number 
        }
    }
};

const getNumberOfLines = () => {
    while (true) { // Keep looping until a valid number is given
        const lines = prompt("Enter the number of lines to bet on (1-3): "); // Prompt the user for an amount of lines to bet on
        const numberOfLines = parseFloat(lines); // Parse the input from a string into a floating point integer
    
        if (isNaN(numberOfLines) || numberOfLines <= 0 || numberOfLines > 3) { // isNaN() function checks if the input is a number
            console.log("Invalid number of lines, try again.") // If the conditions are met the print "invalid"
        } 
        else {
            return numberOfLines; // Return valid number 
        }
    }
};

const getBet = (balance, lines) => {
    while (true) { // Keep looping until a valid number is given
        const bet = prompt("Enter the total bet per line: "); // Prompt the user for an amount
        const numberBet = parseFloat(bet); // Parse the input from a string into a floating point integer
    
        if (isNaN(numberBet) || numberBet <= 0 || numberBet > balance / lines) { // isNaN() function checks if the input is a number
            console.log("Invalid bet, try again.") // If the conditions are met the print "invalid"
        } 
        else {
            return numberBet; // Return valid number 
        }
    }
};

const spin = () => {
    const symbols = []; // Array creation
    for (const [symbol, count] of Object.entries(SYMBOLS_COUNT)) { // Traverse or loop through all entries in SYMBOLS_COUNT and provide key, value
        for (let i = 0; i < count; i++) {
            symbols.push(symbol); // Insert element into array
        }
    }

    const reels = []; // reels Array
    for (let i = 0; i < COLS; i++){
        reels.push([]); // Push a nested array into array
        const reelSymbols = [...symbols]; // Copy contents of symbols array into reelSymbols
        for (let j = 0; j < ROWS; j++) {
            const randomIndex = Math.floor(Math.random() * reelSymbols.length);
            const selectedSymbol = reelSymbols[randomIndex];
            reels[i].push(selectedSymbol);
            reelSymbols.splice(randomIndex, 1); // Remove 1 element at the specified index
        }
    }
    return reels;
};

const transpose = (reels) => {
    const rows = [];
    for (let i = 0; i < ROWS; i++) {
        rows.push([]);
        for (let j = 0; j < COLS; j++) {
            rows[i].push(reels[j][i])
        }
    }
    return rows;
};

const printRows = (rows) => {
    for (const row of rows) {
        let rowString = "";
        for (const [i, symbol] of row.entries()) {
            rowString += symbol
            if ( i != row.length - 1) {
                rowString += " | "
            }
        }
        console.log(rowString)
    }
};

const getWinnings = (rows, bet, lines) => {
    let winnings = 0;
    for (let row = 0; row < lines; row++) {
        const symbols = rows[row];
        let allSame = true;

        for (const symbol of symbols) {
            if (symbol != symbols[0]) {
                allSame = false;
                break;
            }
        }

        if(allSame) {
            winnings += bet * SYMBOLS_VALUES[symbols[0]]
        }
    }

    return winnings
};

const game = () => {
    let balance = deposit(); // let will allow you to change the amount on stored in the variable

    while (true) {
        console.log("You have a balance of $" + balance);
        const numberOfLines = getNumberOfLines(); // Cannot change the value of a constant variable
        const bet = getBet(balance, numberOfLines);
        balance -= bet * numberOfLines;
        const reels = spin();
        const rows = transpose(reels);
        printRows(rows);
        const winnings = getWinnings(rows, bet, numberOfLines);
        balance += winnings;
        console.log("You won, $" + winnings.toString());

        if (balance <= 0) {
            console.log("You ran out of money!")
            break;
        }
        const playAgain = prompt("Do you want to play again? (y/n)? ")
        if(playAgain != "y") break;
    }
};

game();

