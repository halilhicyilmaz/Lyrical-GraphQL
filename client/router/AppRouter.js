import React from "react"
import { Navigate, Route, Routes, HashRouter } from "react-router-dom";
import SongCreate from "../pages/SongCreate";
import SongList from "../pages/SongList";
import { ROUTES } from "../utils/constants";


const AppRouter = () => {


    return <HashRouter >
        <Routes>
            <Route exact path={ROUTES.INDEX} element={<SongList />} />
            <Route exact path={ROUTES.SONGCREATE} element={<SongCreate />} />
            <Route
                path="*"
                element={<Navigate to="/" replace />}
            />
        </Routes>
    </HashRouter>
}

export default AppRouter
