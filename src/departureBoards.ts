import { airlineData, Departure, DepartureBoards } from "./interfaces";
import axios from "axios";
import { FormatDate, FormatTime } from "./utils";

export class DepartureBoardsPkg implements DepartureBoards {
	// Import all the configuration for the airlines API contract
	private config: airlineData = require("./airlines.map.json").airlines;

	supportedAirports = (): string[] => {
		return Object.keys(this.config);
	};

	departuresFor = async (airport: string): Promise<Departure[]> => {
		if (!this.config.hasOwnProperty(airport)) {
			throw Error(`No support for airport ${airport}`);
		}

		// Fetch the current airline configuration
		const currentConfig = this.config[airport];
		const response = await axios.post(
			currentConfig.request.url,
			currentConfig.request.body
		);

		// Fetch the airline departures
		const sourceData = currentConfig.response.subTo
			? response.data[currentConfig.response.subTo]
			: response.data;

		// Map the airline departure to the standart contract.
		return sourceData.map((departure: any) => {
			return {
				airline: departure[currentConfig.response.airline],
				destinationCity: departure[currentConfig.response.destinationCity],
				flightCode: departure[currentConfig.response.flightCode],
				scheduleDate: FormatDate(
					departure[currentConfig.response.scheduleDate]
				),
				scheduleTime: FormatTime(
					departure[currentConfig.response.scheduleTime]
				),
				updateDate: FormatDate(departure[currentConfig.response.updateDate]),
				updateTime: FormatTime(departure[currentConfig.response.updateTime]),
			};
		});
	};
}
