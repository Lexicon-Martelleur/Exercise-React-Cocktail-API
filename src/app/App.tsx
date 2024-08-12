import { ReactElement } from "react";
import { Outlet } from "react-router-dom";

import { BaseLayout } from "../layouts";

export const App = (): ReactElement => {
    return (
		<BaseLayout>
		  	<Outlet />  
		</BaseLayout>
    );
}

