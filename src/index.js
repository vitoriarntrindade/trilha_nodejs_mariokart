const player1 = {
    NAME: "Mario",
    SPEED: 4,
    MANEUVERABILITY: 3,
    POWER: 3,
    POINTS: 0,
}

const player2 = {
    NAME: "Luigi",
    SPEED: 3,
    MANEUVERABILITY: 4,
    POWER: 4,
    POINTS: 0,
}

const player3 = {
    NAME: "Peach",
    SPEED: 3,
    MANEUVERABILITY: 4,
    POWER: 3,
    POINTS: 0,
}

const player4 = {
    NAME: "Yoshi",
    SPEED: 2,
    MANEUVERABILITY: 4,
    POWER: 3,
    POINTS: 0,
}

const player5 = {
    NAME: "Bowser",
    SPEED: 5,
    MANEUVERABILITY: 2,
    POWER: 5,
    POINTS: 0,
}

const player6 = {
    NAME: "Donkey Kong",
    SPEED: 2,
    MANEUVERABILITY: 2,
    POWER: 5,
    POINTS: 0,
}

async function rollDice() {
    return Math.floor(Math.random() * 6) + 1;
}

async function getRandomBlock() {
    let random = Math.random()
    let result

    switch (true) {
        case random < 0.33:
            result = "STRAIGHT";
            break;

        case random < 0.66:
            result = "CURVE";
            break;
        default:
            result = "CONFRONTATION";
    }

    return result;
}

async function logRollResult(characterName, block, diceResult, attribute) {
    console.log(`${characterName}🎲Rolled a ${block} block ${diceResult} + ${attribute} = ${diceResult + attribute}`);
}

async function playRaceEngine(character1, character2) {
    for (let round = 1; round <= 5; round++) {
        console.log(`🏁Round ${round}`);

        // draw block
        let block = await getRandomBlock()
        console.log(`Block: ${block}`)

        // roll the dice
        let diceResult1 = await rollDice();
        let diceResult2 = await rollDice();

        // skill test
        let TotalTestSkill1 = 0;
        let TotalTestSkill2 = 0;

        if (block === "STRAIGHT") {
            TotalTestSkill1 = diceResult1 + character1.SPEED;
            TotalTestSkill2 = diceResult2 + character2.SPEED;

            await logRollResult(
                character1.NAME,
                "speed",
                diceResult1,
                character1.SPEED
            )

            await logRollResult(
                character2.NAME,
                "speed",
                diceResult2,
                character2.SPEED
            )
        }

        if (block === "CURVE") {
            TotalTestSkill1 = diceResult1 + character1.MANEUVERABILITY;
            TotalTestSkill2 = diceResult2 + character2.MANEUVERABILITY;

            await logRollResult(
                character1.NAME,
                "maneuverability",
                diceResult1,
                character1.MANEUVERABILITY
            )

            await logRollResult(
                character2.NAME,
                "maneuverability",
                diceResult2,
                character2.MANEUVERABILITY
            )
        }

        if (block === "CONFRONTATION") {
            let powerResult1 = diceResult1 + character1.POWER;
            let powerResult2 = diceResult2 + character2.POWER;

            console.log(`${character1.NAME} confronted ${character2.NAME}!🤼‍♂️🦾`);

            await logRollResult(
                character1.NAME,
                "power",
                diceResult1,
                character1.POWER
            )

            await logRollResult(
                character2.NAME,
                "power",
                diceResult2,
                character2.POWER
            );

            if (powerResult1 > powerResult2 && character2.POINTS > 0) {
                console.log(`${character1.NAME} won the confrontation! ${character2.NAME} lost 1 point🐢`)
                character2.POINTS--;
            }

            if (powerResult2 > powerResult1 && character1.POINTS > 0) {
                console.log(`${character2.NAME} won the confrontation! ${character1.NAME} lost 1 point🐢`)
                character1.POINTS--;
            }

            console.log(powerResult2 === powerResult1 ? "Draw! No points lost" : "")
        }

        // checking for a winner
        if (TotalTestSkill1 > TotalTestSkill2) {
            console.log(`${character1.NAME} scored a point`);
            character1.POINTS++;
        } else if (TotalTestSkill2 > TotalTestSkill1) {
            console.log(`${character2.NAME} scored a point`);
            character2.POINTS++;
        }

        console.log("_____________")
    }
}

async function declareWinner(character1, character2) {
    console.log("Final result:")
    console.log(`${character1.NAME}: ${character1.POINTS} point(s)`)
    console.log(`${character2.NAME}: ${character2.POINTS} point(s)`)

    if (character1.POINTS > character2.POINTS) {
        console.log(`\n${character1.NAME} won the race! Congratulations 🏆`)
    } else if (character2.POINTS > character1.POINTS) {
        console.log(`\n${character2.NAME} won the race! Congratulations 🏆`)
    } else {
        console.log("The race ended in a draw");
    }
}

(async function main() {
    console.log(
        `🏁🚨Race between ${player1.NAME} and ${player3.NAME} starting...\n`
    );

    await playRaceEngine(player1, player2);
    await declareWinner(player1, player2);
})();
