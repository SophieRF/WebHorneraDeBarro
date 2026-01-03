import { Route, Routes, useLocation } from "react-router-dom";
import CategoryScreen from "./src/screens/CategoryScreen.tsx"
import { Home } from "./src/screens/Home.tsx";
import { MainLayout } from "./src/layouts/MainLayout.tsx";
import { CartScreen } from "./src/screens/CartScreen.tsx";
import { AnimatePresence } from "framer-motion";
import { TransitionedPage } from "./src/TransitionedPage.tsx";

export const AppRouter = () => {

    const location = useLocation();

    return (
        <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
                <Route element={
                    <TransitionedPage>
                        <MainLayout />
                    </TransitionedPage>
                }>
                    <Route
                        path="/"
                        element={
                            <TransitionedPage>
                                <Home />
                            </TransitionedPage>
                        }
                    />
                    <Route
                        path="/categories/:_id"
                        element={
                            <TransitionedPage>
                                <CategoryScreen />
                            </TransitionedPage>
                        } />
                    <Route
                        path="/categories/all"
                        element={
                            <TransitionedPage>
                                <CategoryScreen />
                            </TransitionedPage>
                        }
                    />
                    <Route
                        path="/cart"
                        element={
                            <TransitionedPage>
                                <CartScreen />
                            </TransitionedPage>
                        } />
                </Route>
            </Routes>
        </AnimatePresence>
    )
}

export default AppRouter;