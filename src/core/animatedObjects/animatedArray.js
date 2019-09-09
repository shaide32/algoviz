import animatedRect from './animatedRectangle';
import { generateDiff } from '../../utils';

import * as d3 from 'd3';

class AnimatedArray {
    constructor(x, y, defaultColor, activeColor) {
        this.x = x;
        this.y = y;
        this.activeColor = activeColor;
        this.defaultColor = defaultColor;
        this.animatedObjects = [];
    }

    init(arr) {
        const graph = d3.select("animation-container")
            .append("svg")
            .attr("width", 600)
            .attr("height", 600);
        const bar = graph.selectAll('g')
        .data(arr)
        .enter()
        .append("g")
        .attr("transform", function(d, i) {
            return "translate(0," + i * 100 + ")";
        })
        .attr("id", function(d, i) {
            return i;
        })

        arr.forEach((ele, index) => {
            this.animatedObjects.push(new animatedRect(this.x + index * 30, this.y, ele, 20, this.defaultColor));
        })
        return this.animatedObjects;
    }

    insert(index, item) {
        this.animatedObjects.splice(index, 0, new animatedRect(this.x + index * 30, this.y, item, 20, this.defaultColor));
        this.rearrange();
    }

    remove(index) {
        this.animatedObjects.splice(index, 1);
        this.rearrange();
    }

    rearrange(animationHistory) {
        const diffArr = [];
        this.animatedObjects.forEach((ele, index) => {
            //checking position
            let diff = this._checkDiff(ele.id, 'x', this.x + index * 30, ele.x);
            if(diff)
                diffArr.push(diff);
            //checking color
            diff = this._checkDiff(ele.id, 'color', ele.color, ele.lastColor);
            if(diff)
                diffArr.push(diff);
        });
        if(diffArr.length > 0){
            animationHistory.push(diffArr);
            return true;
        }
        return false;
    }

    _checkDiff(id, prop, nextValue, prevValue) {
        if(nextValue !== prevValue) {
            return new generateDiff(
                id,
                prop,
                nextValue,
                prevValue  
            );
        }
        return null;
    }

    draw(ctx, animationHistory) {
        this.rearrange(animationHistory);
        ctx.clearRect(0, 0, 500, 500);
        this.animatedObjects.forEach(ele => {
            ele.draw(ctx);
        });
    }

}

export default AnimatedArray;