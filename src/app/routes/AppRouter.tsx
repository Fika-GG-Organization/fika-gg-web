import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "../../shared/components/layouts/Layout";
import HomePage from "../../pages/HomePage";
import LoginPage from "../../pages/LoginPage";
import RegisterPage from "../../pages/RegisterPage";
import DashboardPage from "../../pages/DashboardPage";
import ProtectedRoute from "./ProtectedRoute";
import UserPage from "@/pages/UserPage";
import DesignDumpPage from "../../pages/DesignDumpPage";
import GamesPage from "../../pages/GamesPage";
import DiscoverPage from "../../pages/DiscoverPage";
import NotFoundPage from "../../pages/NotFoundPage";
import CreateEventPage from '../../pages/CreateEventPage';
import EventPage from "@/pages/EventPage";
import EventCalendarPage from "@/pages/EventCalendarPage";
import GuestRoute from "./GuestRoute";
import AboutPage from '@/pages/AboutPage';
import PrivacyPage from '@/pages/PrivacyPage';
import ContactPage from '@/pages/ContactPage';
import UserSettingsPage from "@/pages/UserSettingsPage";

const router = createBrowserRouter([
	{
		element: <Layout />,
		children:
		[
			{
				// Routes that are only accessible to guests
				element: <GuestRoute />,
				children:
				[
					{
						path: "/",
						index: true,
						element: <HomePage />,
					},
					{
						path: "/login",
						element: <LoginPage />,
					},
					{
						path: "/register",
						element: <RegisterPage />,
					}
				],
			},
			{
				path: '/about',
				element: <AboutPage />,
			},
			{
				path: '/privacy',
				element: <PrivacyPage />,
			},
			{
				path: '/contact',
				element: <ContactPage />,
			},
			{
				path: "/event/:eventId",
				element: <EventPage />,
			},
			{
				path: "/calendar",
				element: <EventCalendarPage />,
			},
			{
				// Add more routes here
			},
			// only in dev so it never ends up on the real site
			...(import.meta.env.DEV ? [{ path: "/design", element: <DesignDumpPage /> }] : []),
			{
				element: <ProtectedRoute />,
				children:
				[

					{
						path: "/home",
						element: <DashboardPage />,
					},
					{
						path: "/profile",
						element: <UserPage />,
					},
					{
						path: "/games",
						element: <GamesPage />,
					},
					{
						path: "/discover",
						element: <DiscoverPage />,
					},
					{
						path: '/events/new',
						element: <CreateEventPage />,
					},
					{
						path: '/settings',
						element: <UserSettingsPage/>
					},
					{
						// Add any more logged in routes here
					}
				],
			},
			{
				path: "*",
				element: <NotFoundPage />,
			}
		]
	}
]);

export default function AppRouter() {
  return <RouterProvider router={router} />
}
