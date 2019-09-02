export class generateDiff{
    constructor(objectId, property, nextValue, prevValue){
        this.objectId = objectId;
        this.property = property;
        this.prevValue = prevValue;
        this.nextValue = nextValue;
    }
}

export const generateRandomizedArray = (size = 10) => {
    const lowVal = 10;
    const range = 300;
    const randomArr = [];
    while(randomArr.length < size) {
        randomArr.push(Math.floor(Math.random() * range + lowVal));
    }
    return randomArr;
}