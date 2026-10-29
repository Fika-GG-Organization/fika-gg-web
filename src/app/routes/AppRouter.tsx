import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "../../shared/components/layouts/Layout";
import HomePage from "../../pages/HomePage";
import LoginPage from "../../pages/LoginPage";
import RegisterPage from "../../pages/RegisterPage";
import TempPage from "../../pages/TempPage";
import ProtectedRoute from "./ProtectedRoute";
import DesignDumpPage from "../../pages/DesignDumpPage";
import GamesPage from "../../pages/GamesPage";
// import NotFoundPage from "../../pages/NotFoundPage";

const router = createBrowserRouter([
	{
		element: <Layout />,
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
						path: "/temp",
						element: <TempPage />,
					},
					{
						path: "/games",
						element: <GamesPage />,
					},
					{
						// Add any more logged in routes here
					}
				],
			},
			{
				path: "*",
				// element: <NotFoundPage />,
			}
		]
	}
]);

export default function AppRouter() {
  return <RouterProvider router={router} />
}