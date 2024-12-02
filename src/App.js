import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Fragment } from "react";

import { publicRoutes } from "./routes";
import DefaultLayout from "./layouts/DefaultLayout/DefaultLayout";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          {publicRoutes.map((route, index) => {
            const Layouts = route.layout === null ? Fragment : DefaultLayout;
            const Page = route.component;
            return (
              <Route
                key={index}
                path={route.path}
                element={
                  <Layouts>
                    <Page />
                  </Layouts>
                }
              />
            );
          })}
        </Routes>
      </div>
    </Router>
  );
}
export default App;
