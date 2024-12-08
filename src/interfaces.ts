export type Departure = {
	// Airline name
	airline: string;
	// Destination city
	destinationCity: string;
	// Flight code such as "LY 001"
	flightCode: string;
	// Schedule date DD/MM (e.g. 01/01)
	scheduleDate: string;
	// Schedule time HH:MM (e.g. 13:00)
	scheduleTime: string;
	// Last update date DD/MM (e.g. 01/01)
	updateDate: string;
	// Last update time HH:MM (e.g. 13:00)
	updateTime: string;
};

export interface DepartureBoards {
	/*
	 * Returns a list of supported airport codes
	 */
	supportedAirports(): string[];
	/*
	 * Returns a list of departures for the given airport
	 * @param airport the airport code
	 * @returns a list of departures
	 * @throws an error if the airport is not supported
	 */
	departuresFor(airport: string): Promise<Departure[]>;
}

interface airportResponse {
	// The sub catagory the departures are in the response
	subTo: string | undefined;
	airline: string;
	destinationCity: string;
	flightCode: string;
	scheduleDate: string;
	scheduleTime: string;
	updateDate: string;
	updateTime: string;
}

interface airportRequest {
	url: string;
	body: {
		[key: string]: string;
	};
}

// The structure of the airlines configuration map
export interface airlineData {
	[key: string]: {
		request: airportRequest;
		response: airportResponse;
	};
}
