export const FormatDate = (date: string): string => {
	if (date.includes("Date")) {
		const time = date.substring(date.indexOf("(") + 1, date.lastIndexOf(")"));
		const formatDate = new Date(Number(time));
		return `${formatDate.getDate()}/${formatDate.getMonth() + 1}`;
	}

	return date;
};

export const FormatTime = (date: string): string => {
	if (date.includes("Date")) {
		const time = date.substring(date.indexOf("(") + 1, date.lastIndexOf(")"));
		const formatDate = new Date(Number(time));
		return `${formatDate.getHours()}:${formatDate.getMinutes() + 1}`;
	}

	return date;
};
