import { ReactElement, useEffect } from "react";

import {
	createBrowserRouter,
	createRoutesFromElements,
	Route,
	useNavigate 
} from "react-router-dom";

import { App } from "./App";
import { InfoPage, HomePage, SearchPage } from "../pages";
import { path } from "../constants";

export const appRouter = createBrowserRouter(
	createRoutesFromElements(
		<Route path={path.INDEX} element={<App />}>
			<Route index element={<HomePage />} />
			<Route path={path.INFO} element={<InfoPage />} />
			<Route path={path.SEARCH} element={<SearchPage />} />
            <Route path={path.UNKNOWN} element={<RouteToIndex />} />
		</Route>
	)
);

function RouteToIndex (): ReactElement {
	const navigate = useNavigate();
	useEffect(() => {
		navigate(path.INDEX);
	})
	return <></>
}
