function fishFruitCollision() {
    for (let i = 0; i < fruit.num; i++) {
        if (fruit.active[i]) {
            let l = calLength2(fruit.x[i], fruit.y[i], fish.x, fish.y);
            if (l < 900) {
                fruit.dead(i)
                fish.bodyIndex++
                fish.eatTimer = 0
                if (fish.bodyIndex > 7) {
                    fish.bodyIndex = 7
                }
                data.double = 1
                if (fruit.fruitType[i] === 'blue') {
                    data.double = 2
                }
                num()
            }
        }
    }
}

function num() {
    data.addScore()
    data.fruitNum = 0
}