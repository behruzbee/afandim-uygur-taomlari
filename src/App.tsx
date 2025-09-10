// App.tsx
import { MantineProvider } from "@mantine/core";

import "@mantine/core/styles.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { BasketPage } from "./pages/basket";
import { HomePage } from "./pages/home";

const router = createBrowserRouter([
  {
    path: "/:id",
    element: <HomePage />,
  },
  {
    path: "/basket",
    element: <BasketPage />,
  },
]);

function App() {
  return (
    <MantineProvider>
      <RouterProvider router={router} />
    </MantineProvider>
  );
}

export default App;
