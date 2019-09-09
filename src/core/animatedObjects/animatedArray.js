import animatedRect from "./animatedRectangle";
import { generateDiff } from "../../utils";
import cuid from "cuid";
import * as d3 from "d3";
window.d3 = d3;
class AnimatedArray {
    constructor(x, y, defaultColor, activeColor, generatorFn, arr) {
        this.x = x;
        this.y = y;
        this.activeColor = activeColor;
        this.defaultColor = defaultColor;
        this.animatedObjects = [];
        this.arr = arr;
        this.generatorFn = generatorFn;
    }

    init(arr) {
        const graph = d3
            .select(".animation-container")
            .append("svg")
            .attr("width", 600)
            .attr("height", 600);
        this.bar = graph
            .selectAll("g")
            .data(arr)
            .enter()
            .append("g")
            .attr("transform", function(d, i) {
                return "translate(" + i * 35 + ", 50)";
            })
            .attr("id", function(d, i) {
                return cuid();
            });

        this.bar.append("rect")
            .attr("height", function(d) {
                return d * 2;
            })
            .attr("width", 30);

        let animationHistory = [];
        this.generatorRef = this.generatorFn(this.bar._groups[0], {
            activeColor: "red",
            defaultColor: "blue"
        });
        let gen = this.generatorRef.next();
        while (!gen.done) {
            if (gen.value) {
                animationHistory.push(gen.value);
            }

            gen = this.generatorRef.next();
        }
        return animationHistory;
    }

	findAnimatedBars(id) {
		return this.bar._groups[0].find(bar => bar.id === id);

	}
	animate(diffs) {
		return new Promise((resolve) => {
			if(!diffs || diffs.length === 0)
				resolve();
			diffs.forEach(diff => {
				var obj = this.findAnimatedBars(diff.id);
				obj.setAttribute(diff.attr, diff.value);
			});
			resolve();
		});
		
	}
}

export default AnimatedArray;
