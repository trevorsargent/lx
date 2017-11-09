const { Observable, Scheduler } = require('rxjs/Rx')

const levelInput = document.getElementById('input-level')
const outputLevel = document.getElementById('output-level')
const outputText = document.getElementById('output-text')
let output = 0;

// let channel

const sanitizeLevelInput = x => {
	if (x > 100) return 100
	if (x < 0) return 0
	if (x.length === 0) return 0
	return x
}

const msEllapsed = (scheduler = Scheduler.animationFrame) =>
	Observable.defer(() => {
		const start = scheduler.now()
		return Observable.interval(0, scheduler).map(() => scheduler.now() - start)
	})

const prevAndCurrent = (initialValue) => ($source) =>
	$source.startWith(initialValue)
		.map(x => {
			return [output, x]
		})

//emits a stream from 0 to 1 over the milliseconds specified.
const duration = (ms) =>
	msEllapsed()
		.map(msel => msel / ms)
		.takeWhile(x => x <= 1.0)

// maps distance and time in decimal (from duration()) 
const distance = (d) => (t) => d * t

const tween = (ms) => ($source) =>
	$source
		.let(prevAndCurrent(0))
		.switchMap(([p, n]) => {
			const next = Number.parseInt(n)
			const prev = Number.parseInt(p)
			return duration(ms)
				.map(distance(next - prev))
				.map(v => prev + v)
		}
		)

const channel = Observable.fromEvent(levelInput, 'change')
	.map(x => x.target.value)
	.map(sanitizeLevelInput)
	.let(tween(5000))
	.do(x => {
		outputLevel.style.width = x * 10
		outputText.innerHTML = x
		output = x
	})



channel.subscribe()