export class generateDiff{
    constructor(objectId, property, nextValue, prevValue){
        this.objectId = objectId;
        this.property = property;
        this.prevValue = prevValue;
        this.nextValue = nextValue;
    }
}