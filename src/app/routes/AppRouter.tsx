import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "../../shared/components/layouts/Layout";
import HomePage from "../../pages/HomePage";

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
				// Add more routes here
			}

		]
	}
]);

export default function AppRouter() {
  return <RouterProvider router={router} />
}