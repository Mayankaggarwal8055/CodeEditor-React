import { Fragment, useMemo } from "react";
import { Route, Routes } from "react-router-dom";
import { useSelector } from "react-redux";
import Home from "./pages/home";
import SignUpPage from "./pages/signUpPage/signUpPage";
import LoginPage from "./pages/loginPage/loginPage";
import CodeEditor from "./pages/codeEditor/codeEditor";

const App = () => {
  const { user } = useSelector((state) => state.user);

  const userData = useMemo(() => {
    if (!user) return null;
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
      projects: user.projects || [],
    };
  }, [user]);

  return (
    <Fragment>
      <Routes>
        <Route path="/" element={<Home projects={user?.projects || []} userData={userData} />} />
        <Route path="/signUp" element={<SignUpPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/editor" element={<CodeEditor D={userData} />} />
        <Route path="/editor/:id" element={<CodeEditor D={userData} />} />
      </Routes>
    </Fragment>
  );
};

export default App;
