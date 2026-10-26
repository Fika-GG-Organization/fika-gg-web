import { ISO_STRING_PATTERN } from "../config/constants";
import { apiClient } from "./axiosClient";

/**
 * Use this when calling server API for Events.
 * @see https://axios.rest/pages/advanced/request-config
 */
export const apiEventClient = apiClient.create({
	baseURL: apiClient.defaults.baseURL + "/events",
	headers: {
		Accept: "application/json",
		"Content-Type": "application/json",
	},
	maxBodyLength: 10 * 1024 * 1024, // Max body size = 10MB
	maxContentLength: 10 * 1024 * 1024, // Max content size = 10MB
	// maxRate: [10 * 1024 * 1024, 10 * 1024 * 1024], // Upload and download limit set to 10MB/s.
	parseReviver: (_, value, __) => {
		if (typeof value === "string") {
			tryParseToDateFromISO(value);
		}
	},
	redact: ["authorization"], // Header(s) will be censored for the user when showing errors.
	timeout: 10000, // Cancel request after X ms (1000 = 1 second).
});


/**
 * Tries to parse strings formatted in ISO 8601 (i.e. `"2016-07-13T18:46:01.933Z"`)
 * into a {@linkcode Date} object.
 *
 * @param obj - The object to try parse.
 * @returns A {@linkcode Date} on parse success; otherwise return {@linkcode obj} unchanged.
 * @see https://www.iso8601.com/
 */
function tryParseToDateFromISO(obj: string): Date | string {
	if (ISO_STRING_PATTERN.test(obj)) {
		return new Date(obj);
	}
	return obj;
}

