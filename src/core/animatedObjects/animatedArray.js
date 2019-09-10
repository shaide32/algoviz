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
		const spacing = Math.ceil(300 / arr.length);
		d3.selectAll('svg')
			.remove();
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
                return "translate(" + i * spacing + ", 50)";
            })
            .attr("id", function(d, i) {
                return cuid();
            });

        this.bar.append("rect")
            .attr("height", function(d) {
                return d;
            })
            .attr("width", 9 * spacing / 10);

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

	changeAttributes(obj, diff, key, animationSpeed) {
		switch(diff.type) {
			case 'position': 
				return obj.transition()
					.duration(100)
					.attr(diff.attr, diff[key]);
			case 'styles': 
				return obj.transition()
					.duration(animationSpeed)
					.style(diff.attr, diff[key]);
			default: return obj;
		}
	}

	animate(diffs, key, animationSpeed) {
		return new Promise((resolve) => {
			if(!diffs || diffs.length === 0)
				resolve();
			diffs.forEach(diff => {
				var obj = d3.select('#'+ diff.id);
				this.changeAttributes(obj, diff, key, animationSpeed)	
				.on("end", resolve);
			});
		});
		
	}
}

export default AnimatedArray;
