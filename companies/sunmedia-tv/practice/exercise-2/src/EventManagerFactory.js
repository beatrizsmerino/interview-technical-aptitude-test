import EventManager from "./EventManager";
import Event from "./Event";

export default class EventManagerFactory {
	static create(events, types) {
		const eventObjects = events.map((eventData) => new Event(eventData.second, eventData.type, eventData.message));

		return new EventManager(eventObjects);
	}
}
