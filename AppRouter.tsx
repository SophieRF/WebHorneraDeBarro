import { Route, Routes, useLocation } from "react-router-dom";
import CategoryScreen from "./src/screens/CategoryScreen.tsx"
import { Home } from "./src/screens/Home.tsx";
import { MainLayout } from "./src/layouts/MainLayout.tsx";
import { CartScreen } from "./src/screens/CartScreen.tsx";
import { AnimatePresence } from "framer-motion";
import { TransitionedPage } from "./src/TransitionedPage.tsx";
import { AdminLayout } from "./src/layouts/AdminLayout.tsx";
import { Login } from "./src/screens/Login.tsx";
import { AdminScreen } from "./src/screens/AdminScreen.tsx";
import { AdminProductsScreen } from "./src/screens/AdminProductsScreen.tsx";
import { AdminCategoriesScreen } from "./src/screens/AdminCategoriesScreen.tsx";
import { AdminRoute } from "./src/routes/AdminRoute.tsx";
import { ProductScreen } from "./src/screens/ProductScreen.tsx";
import { ShopScreen } from "./src/screens/ShopScreen.tsx";
import { SimpleLayout } from "./src/layouts/SimpleLayout.tsx";
import { AboutMe } from "./src/components/About/AboutMe.tsx";

export const AppRouter = () => {

    const location = useLocation();

    return (
        <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>

                {/*Pantalla con NavBar y Footer*/}
                <Route
                    element={
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
                        } />

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
                        } />

                    <Route
                        path="/products/:_id"
                        element={
                            <TransitionedPage>
                                <ProductScreen />
                            </TransitionedPage>
                        } />

                    <Route
                        path="/about"
                        element={
                            <TransitionedPage>
                                <AboutMe />
                            </TransitionedPage>
                        }
                    />
                </Route>

                {/*Pantalla con NavBar*/}
                <Route
                    element={
                        <TransitionedPage>
                            <SimpleLayout />
                        </TransitionedPage>
                    }
                >
                    <Route
                        path="/cart"
                        element={
                            <TransitionedPage>
                                <CartScreen />
                            </TransitionedPage>
                        }
                    />
                </Route>

                {/*Ruta login*/}
                <Route
                    element={
                        <TransitionedPage>
                            <Login />
                        </TransitionedPage>}
                    path="/login"
                />

                {/*Ruta compra*/}
                <Route
                    element={
                        <TransitionedPage>
                            <ShopScreen />
                        </TransitionedPage>}
                    path="/shop"
                />

                {/*Rutas Admin*/}
                <Route
                    element={<AdminRoute />}>
                    <Route
                        element={
                            <TransitionedPage>
                                <AdminLayout />
                            </TransitionedPage>}>

                        <Route
                            element={
                                <TransitionedPage>
                                    <AdminScreen />
                                </TransitionedPage>}
                            path="/admin" />

                        <Route
                            element={
                                <TransitionedPage>
                                    <AdminProductsScreen />
                                </TransitionedPage>}
                            path="/admin/products" />

                        <Route
                            element={
                                <TransitionedPage>
                                    <AdminCategoriesScreen />
                                </TransitionedPage>}
                            path="/admin/categories" />
                    </Route>
                </Route>

            </Routes>
        </AnimatePresence>
    )
}

export default AppRouter;