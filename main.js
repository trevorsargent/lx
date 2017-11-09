const { Observable, Scheduler, Subject } = require('rxjs/Rx')

const levelInput = document.getElementById('input-level')
const outputLevel = document.getElementById('output-level')
const outputText = document.getElementById('output-text')
const timeInput = document.getElementById('input-time')

const time$ = Observable.fromEvent(timeInput, 'change')
	.map(x => x.target.value)
	.startWith(1)

let state$ = new Subject
state$.startWith(0)

// maps distance and time in decimal (from duration()) 
const distance = (d) => (t) => d * t

//emits a stream from 0 to 1 over the milliseconds specified.
const duration = (ms) =>
	msEllapsed()
		.map(msel => msel / ms)
		.takeWhile(x => x <= 1.0)

const msEllapsed = (scheduler = Scheduler.animationFrame) =>
	Observable.defer(() => {
		const start = scheduler.now()
		return Observable.interval(0, scheduler).map(() => scheduler.now() - start)
	})

const sanitizeLevelInput = x => {
	if (x > 100) return 100
	if (x < 0) return 0
	if (x.length === 0) return 0
	return x
}

const commands$ = Observable.fromEvent(levelInput, 'change')
	.map(x => x.target.value)
	.map(sanitizeLevelInput)
	.withLatestFrom(time$, (level, time) => ({ value: level, time }))



// takes a stream of values to animate to and emits tweened values

const combine = (src, state) => ({ state, next: src })

const tween = (state$) => (source$) =>
	source$.withLatestFrom(state$, combine)
		// .do(x => console.log(x))
		.switchMap(({ state, next }) => {
			return duration(next.time * 1000)
				.map(distance(next.value - state))
				.map(v => state + v)
		}
		)

const animator = commands$
	.let(tween(state$.startWith(0)))
	.do(x => {
		outputLevel.style.width = x * 10
		outputText.innerHTML = x
		state$.next(x)
	})

animator.subscribe()
