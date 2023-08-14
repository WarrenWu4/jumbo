interface BoxData {
    box1: number[];
    box2: number[];
    box3: number[];
    box4: number[];
    box5: number[];
}

export default function LeitnerRandomize(amountStudied:number, boxes:BoxData) {

    // always include box1
    console.log(boxes)
    let randomized:number[] = boxes.box1

    // if (amountStudied%2 === 0) {
    //     randomized.push(...boxes.box2)
    // }
    // if (amountStudied%3 === 0) {
    //     randomized.push(...boxes.box3)
    // }
    // if (amountStudied%4 === 0) {
    //     randomized.push(...boxes.box4)
    // }
    // if (amountStudied%5 === 0) {
    //     randomized.push(...boxes.box5)
    // }

    // // shuffle array
    // let currentIndex = randomized.length
    // let randomIndex;

    // while (currentIndex!=0) {
    //     randomIndex = Math.floor(Math.random() * currentIndex)
    //     currentIndex--
    //     [randomized[currentIndex], randomized[randomIndex]] = [randomized[randomIndex], randomized[currentIndex]];
    // }
    return {status: "200 SUCCESS", order:randomized}
}