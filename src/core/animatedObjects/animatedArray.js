import cuid from 'cuid';
import * as d3 from 'd3';
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

	init() {
		const spacing = Math.ceil(300 / this.arr.length);

		d3.selectAll('svg')
			.remove();
		const graph = d3
			.select('.animation-container')
			.append('svg')
			.attr('width', 500)
			.attr('height', 500);

		this.bar = graph
			.selectAll('g')
			.data(this.arr)
			.enter()
			.append('g')
			.attr('transform', function(d, i) {
				return 'translate(' + i * spacing + ', 50)';
			})
			.attr('id', function() {
				return cuid();
			});

		this.bar.append('rect')
			.attr('height', function(d) {
				return d;
			})
			.attr('width', 9 * spacing / 10);

		const animationHistory = [];

		this.generatorRef = this.generatorFn(this.bar._groups[0], {
			activeColor: 'red',
			defaultColor: 'blue'
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
		switch (diff.type) {
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
			if (!diffs || diffs.length === 0) {
				resolve();
			}
			diffs.forEach(diff => {
				const obj = d3.select('#'+ diff.id);

				this.changeAttributes(obj, diff, key, animationSpeed)
					.on('end', resolve);
			});
		});
	}
}

export default AnimatedArray;
