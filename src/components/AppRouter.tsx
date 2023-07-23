import React from 'react';
import {Route, Routes, Navigate} from "react-router-dom";
import {privateRoutes, publicRoutes} from "../router";
import {useTypedSelector} from "../hooks/useTypedSelector";


const AppRouter = () => {
    const {isAuth} = useTypedSelector(state => state.auth)
    return (
        isAuth ?
            <Routes>
                {privateRoutes.map(route =>
                    <Route
                        path={route.path}
                        element={<route.element/>}
                        key={route.path}
                    />
                )}
                <Route
                    path="*"
                    element={<Navigate to='/' replace/>}
                />
            </Routes>
            :
            <Routes>
                {publicRoutes.map(route =>
                    <Route
                        path={route.path}
                        element={<route.element/>}
                        key={route.path}
                    />
                )}
                <Route path="/"
                       element={<Navigate to='/login' replace/>}/>
                <Route path="*"
                       element={<Navigate to='/' replace/>}/>
            </Routes>
    );
};

export default AppRouter;