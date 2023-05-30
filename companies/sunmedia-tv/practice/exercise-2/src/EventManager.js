export default class EventManager {
	constructor(events) {
		this.events = events;
		this.currentSecond = 0;
	}

	printEvent(event) {
		console.table({
			"Second": event.second,
			"Type": event.type,
			"Message": event.message,
		});
	}

	run() {
		this.events.forEach((event) => {
			const delay = (event.second - this.currentSecond) * 1000;
			setTimeout(() => {
				this.printEvent(event);
				this.currentSecond = event.second;
			}, delay);
		});
	}
}
