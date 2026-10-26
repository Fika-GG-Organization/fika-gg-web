/**
 * Represents the ISO 8601 date & time format.
 * @remarks ISO 8601 is the **standard** internet date time format as declared by
 * {@link https://www.rfc-editor.org/info/rfc3339/#section-5.8 RFC3339}.
 * 
 * JSON do not have a dedicated DateTime format, so any JSON values that are intended to 
 * be {@linkcode Date} types. 
 * 
 * This RegExp will match the following patterns (all have the same UTC/GMT timezone):
 * - `2016-12-30T11:46:56.933Z`
 * - `2016-12-30T11:46:56.9333333Z`
 * - `2016-12-30T11:46:56+00:00`
 *
 * @see https://www.rfc-editor.org/info/rfc3339/#section-5.8
 * @see https://www.iso8601.com/
 */
const ISO_STRING_PATTERN =
	/\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d(|\.\d+)([+-][0-2]\d:[0-5]\d|Z)/;

export { ISO_STRING_PATTERN };
