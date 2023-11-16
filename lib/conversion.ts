// this file needs documentation

export function kelvinToFahrenheit(kelvin: number) {
    return Math.ceil(1.8 * (kelvin - 273) + 32);
}

export function getFormattedLocalTime(currentTime: number, offset: number) {
    return formatDate(new Date(currentTime + offset));
}

export function formatDate(date: Date) {
	let hours = date.getUTCHours();
    

	let isPm = false;
    // for am/pm 
	if (hours > 12) {
		hours -= 12;
		isPm = true;
    // if it's midnight, set to 12:xx instead of 0:xx
	} else if (hours === 0) {
        hours += 12;
    }

    // https://stackoverflow.com/questions/8513032/less-than-10-add-0-to-number
	let minutes = ('0' + date.getMinutes()).slice(-2);
	const seconds = date.getSeconds();

	const timeString = `${hours}:${minutes} ${isPm ? 'PM' : 'AM'}`;
    return timeString;
}