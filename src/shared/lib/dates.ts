export {};

declare global {
	interface Date {
		/**
		 * Gets every weekdays as Date objects, using local timezone.
		 * @returns An array with 7 elements, each representing every weekday from Monday to Sunday.
		 * @remarks How to use: `new Date().getWeekFromDate();`
		 */
		getWeekFromDate(): Date[];
		
		/**
		 * Gets every weekdays as Date objects, using UTC/GMT timezone.
		 * @returns An array with 7 elements, each representing every weekday from Monday to Sunday.
		 * @remarks How to use: `new Date().getUTCWeekFromDate();`
		 */
		getUTCWeekFromDate(): Date[];
	}
}

// https://stackoverflow.com/a/4156516
Date.prototype.getWeekFromDate = function (): Date[] {
	const d = this;
	const day = d.getDay(); // Gets a number between 0 - 6 (0 = sunday, 1 = monday, ..., 6 = saturday)

	// Calculates the difference between "this" to get monday's Date value.
	const monday = new Date(d.setDate(d.getDate() - day + (day == 0 ? -6 : 1)));

	// Create an array named "week" that has 7 elements.
	// Date objects representing Monday to Sunday are mapped to element 0 - 6.
	const week = Array.from(Array(7).keys()).map((value) => {
		const m = new Date(monday.setHours(0, 0, 0, 0));
		m.setDate(m.getDate() - m.getDay() + (value + 1));
		return m;
	});

	const sunday = week[week.length - 1];
	week[week.length - 1] = new Date(sunday.setHours(23, 59, 59, 999));
	return week;
};

// Same as above but using UTC/GMT timezone instead of local timezone.
Date.prototype.getUTCWeekFromDate = function (): Date[] {
	const d = this;
	const day = d.getUTCDay(); 
	const monday = new Date(d.setUTCDate(d.getUTCDate() - day + (day == 0 ? -6 : 1)));
	const week = Array.from(Array(7).keys()).map((value) => {
		const m = new Date(monday.setUTCHours(0, 0, 0, 0));
		m.setUTCDate(m.getUTCDate() - m.getUTCDay() + (value + 1));
		return m;
	});
	const sunday = week[week.length - 1].setUTCHours(23, 59, 59, 999);
	week[week.length - 1] = new Date(sunday);
	return week;
};

// const time = new Date().getWeekFromDate();
// for (let i = 0; i < time.length; i++) {
// 	console.log("Local: " + time[i]);
// }
// const timeUTC = new Date().getUTCWeekFromDate();
// for (let i = 0; i < timeUTC.length; i++) {
// 	console.log("  UTC: " + timeUTC[i]);
// }
