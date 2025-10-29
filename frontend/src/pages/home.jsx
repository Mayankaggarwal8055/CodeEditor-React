import { useDispatch } from "react-redux";
import Dashboard from "../components/dashboard/dashboard";
import Navbar from "../components/navbar/navbar";
import { useEffect } from "react";
import { fetchUser } from "../redux/userSlice";


const Home = ({ projects = [], userData }) => {

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchUser());
  }, [dispatch]);

  return <div>
    <Navbar userData ={userData} />
    <Dashboard projects={projects} />
  </div>;
};

export default Home;
