import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
    {
        //element: <Layout />,
        children: [
            {
                path: "/",
                index: true,
                //element: <HomePage />,
            }
            
        ]
    }
]);

export default function AppRouter() {
    return <RouterProvider router={router} />
}