import { DepartureBoardsPkg } from "../departureBoards";

describe("Departure Boards Package", () => {
	const departureBoardsPkg = new DepartureBoardsPkg();

	test("departuresFor", async () => {
		const response = await departureBoardsPkg.departuresFor("LLBG");
		expect(response.length).toBeGreaterThan(1);
	});

	test("supportedAirports", () => {
		const response = departureBoardsPkg.supportedAirports();
		expect(response.length).toBe(1);
	});
});
