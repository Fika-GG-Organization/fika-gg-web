import { createContext, useContext } from "react";
import type { EventCalendarContextType } from "../models/eventCalendarContextType";
import EventCalendar from "./EventCalendar";

/**
 * A context component created by {@linkcode React.createContext} that implements {@linkcode EventCalendarContextType}. 
 * 
 * Should only be used at the top of the {@linkcode EventCalendar} component to provide values to its child
 * components.
 * @example 
 * const EventCalendar = () => {
 *   const [data, setData] = useState();
 *   return (
 *     <EventCalendarContext.Provider value={{data: data}}>
 *       <ChildComponent /> 
 *       <AnotherChildComponent />
 *     </EventCalendarContext.Provider>
 *   );
 * };
 * @remarks To allow child components use the provided values, call {@linkcode useEventCalendar}.
 * @see https://www.w3schools.com/react/react_usecontext.asp
 */
export const EventCalendarContext = createContext<EventCalendarContextType | undefined>(undefined);

/**
 * This is a hook which returns a context that lets child components access values inside 
 * {@linkcode EventCalendarContext}.
 * 
 * @returns An {@linkcode EventCalendarContext} via {@linkcode React.useContext}.
 * @example 
 * const ChildComponent = () => {
 *   const context = useEventCalendar();
 *   return (
 *     <div>{context.data}</div>
 *   );
 * };
 * @see https://www.w3schools.com/react/react_usecontext.asp
 */
export function useEventCalendar() {
	const context = useContext(EventCalendarContext);
	if (!context) {
		throw new Error();
	}
	return context;
}
