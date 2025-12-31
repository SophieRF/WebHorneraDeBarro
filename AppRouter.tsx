import { Route, Routes } from "react-router-dom";
import CategoryScreen from "./src/screens/CategoryScreen.tsx"
import { Home } from "./src/screens/Home.tsx";
import { MainLayout } from "./src/layouts/MainLayout.tsx";
import { CartScreen } from "./src/screens/CartScreen.tsx";

export const AppRouter = () => {
    return (
        <Routes>
            <Route element={<MainLayout />}>
                <Route
                    path="/"
                    element={<Home />}
                />
                <Route
                    path="/categories/:_id"
                    element={<CategoryScreen />} />
                <Route
                    path="/cart"
                    element={<CartScreen />} />
            </Route>
        </Routes>
    )
}

export default AppRouter;