import cuid from 'cuid';
import * as d3 from 'd3';
window.d3 = d3;

class proxyArray extends Array {
	constructor(arr, animationHistory) {
		arr.forEach(arrObj => {
			arrObj.position = arrObj.getAttribute('transform');
		});
		super(...arr);
		this.animationHistory = animationHistory;
	}

	highlight(indices) {
		const diffs = indices.map(index => {
			return {
				type: 'styles',
				id: this[index].id,
				attr: 'fill',
				nextValue: 'tomato',
				prevValue: 'cornflowerblue'
			};
		});

		this.animationHistory.push(diffs);
	}

	unhighlight(indices) {
		const diffs = indices.map(index => {
			return {
				type: 'styles',
				id: this[index].id,
				attr: 'fill',
				nextValue: 'cornflowerblue',
				prevValue: 'tomato'
			};
		});

		this.animationHistory.push(diffs);
	}

	shiftArray(index1, index2) {
		// moves index2 to the index1 postion and shifts the array
		if (index1 >= index2) {
			return;
		}
		let index = index2;
		while (index > index1) {
			this.swap(index, index-1);
			index--;
		}
	}

	swap(index1, index2) {
		let temp = this[index1];

		this[index1] = this[index2];
		this[index2] = temp;
		temp = this[index1].position;
		this[index1].position = this[index2].position;
		this[index2].position = temp;
		const diff = [
			{
				type: 'position',
				id: this[index1].id,
				attr: 'transform',
				nextValue: this[index1].position,
				prevValue: this[index2].position
			},
			{
				type: 'position',
				id: this[index2].id,
				attr: 'transform',
				nextValue: this[index2].position,
				prevValue: this[index1].position
			}
		];

		this.animationHistory.push(diff);
	}
}

class AnimatedArray {
	constructor(x, y, defaultColor, activeColor, generatorFn, arr) {
		this.x = x;
		this.y = y;
		this.activeColor = activeColor;
		this.defaultColor = defaultColor;
		this.animatedObjects = [];
		this.arr = arr;
		this.generatorFn = generatorFn;
		this.animationHistory = [];
		this.animateNext = this.animateNext.bind(this);
		this.animatePrev = this.animatePrev.bind(this);
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

		const AnimatedArrayProxy = new proxyArray(this.bar._groups[0], this.animationHistory);

		this.generatorRef = this.generatorFn(AnimatedArrayProxy, {
			activeColor: 'tomato',
			defaultColor: 'cornflowerblue'
		});
		let gen = this.generatorRef.next();
		while (!gen.done) {
			if (gen.value) {
				this.animationHistory.push(gen.value);
			}

			gen = this.generatorRef.next();
		}

		return this.animationHistory.length;
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

	calculateDiffs(firstIndex, lastIndex) {
		const diffsArr = this.animationHistory.slice(firstIndex, lastIndex);
		const diffsMap = {};

		diffsArr.forEach(diffs => {
			diffs.forEach(diff => {
				if (!diff.id) {
					return;
				}
				const key = diff.id + diff.type;
				if (Object.prototype.hasOwnProperty.call(diffsMap, key)) {
					diffsMap[key] = Object.assign({}, diffsMap[key], diff);
				} else {
					diffsMap[key] = diff;
				}
			});
		});

		return Object.values(diffsMap);
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

	animateNext({
		currentIndex,
		nextIndex,
		animationSpeed
	}) {
		const diffs = this.calculateDiffs(currentIndex, nextIndex);

		return this.animate(diffs, 'nextValue', animationSpeed);
	}

	animatePrev({
		currentIndex,
		nextIndex,
		animationSpeed
	}) {
		const diffs = this.calculateDiffs(currentIndex, nextIndex);

		return this.animate(diffs, 'prevValue', animationSpeed);
	}
}

export default AnimatedArray;
