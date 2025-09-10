// App.tsx
import { MantineProvider } from "@mantine/core";

import "@mantine/core/styles.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { BasketPage } from "./pages/basket";
import { HomePage } from "./pages/home";
import { HistoryPage } from "./pages/history";

const router = createBrowserRouter([
  {
    path: "/:id",
    element: <HomePage />,
  },
  {
    path: "/basket",
    element: <BasketPage />,
  },
  {
    path: "/history",
    element: <HistoryPage />,
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
