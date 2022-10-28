import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { publicRoutes } from '~/routes';
import { DefaultLayout } from './layouts';
import { createContext, Fragment, useCallback, useEffect } from 'react';
import { logOut } from "./actions/auth";
import AuthVerify from "./common/AuthVerify";
import eventBus from './common/EvenBus';

const RecipeContext = createContext();

function App() {
  // const { user: currentUser } = useSelector((state) => state.auth);
  // const dispatch = useDispatch();
  
  // useEffect(() => {
  //   if (currentUser) {
  //     setShowModeratorBoard(currentUser.roles.includes("ROLE_MODERATOR"));
  //     setShowAdminBoard(currentUser.roles.includes("ROLE_ADMIN"));
  //   } else {
  //     setShowModeratorBoard(false);
  //     setShowAdminBoard(false);
  //   }
  // }, [currentUser]);
  
  // const logOut = useCallback(() => {
  //   dispatch(logOut());
  // }, [dispatch]);

  // useEffect(() => {
  //   eventBus.on("logout", () => {
  //     logOut();
  //   });

  //   return () => {
  //     eventBus.remove("logout");
  //   };
  // }, [currentUser, logOut]);

  return (
    <Router>
      <div classNames="App">
        <Routes>
          {publicRoutes.map((route, index) => {
            const Page = route.component;

            let Layout = DefaultLayout;
            if (route.layout) {
              Layout = route.layout;
            } else if (route.layout === null) {
              Layout = Fragment;
            }

            return (
              <Route
                key={index}
                path={route.path}
                element={
                  <Layout sidebar={<route.sidebar />} col1md={route.col1md} col2md={route.col2md}>
                    <Page sidebar={route.sidebar}/>
                  </Layout>
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
