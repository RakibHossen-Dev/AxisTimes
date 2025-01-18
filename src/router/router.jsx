import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layout/MainLayout";
import Home from "../pages/Home/Home";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import MyProfile from "../pages/MyProfile/MyProfile";
import AddArticle from "../pages/AddArticle/AddArticle";
import DashboardLayout from "../layout/DashboardLayout";
import AdminHome from "../pages/Dashboard/AdminHome/AdminHome";
import AllUsers from "../pages/Dashboard/AllUsers/AllUsers";
import AllArticles from "../pages/Dashboard/AllArticles/AllArticles";
import AddPublisher from "../pages/Dashboard/AddPublisher/AddPublisher";
import PrivateRoute from "./PrivetRoute";
import AdminRoute from "./AdminRoute";
import MyArticles from "../pages/MyArticles/MyArticles";
import Articles from "../pages/Articles/Articles";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout></MainLayout>,
    children: [
      {
        index: true,
        element: <Home></Home>,
      },
      {
        path: "/myProfile",
        element: (
          <PrivateRoute>
            <MyProfile></MyProfile>,
          </PrivateRoute>
        ),
      },
      {
        path: "/myArticles",
        element: (
          <PrivateRoute>
            <MyArticles></MyArticles>,
          </PrivateRoute>
        ),
      },
      {
        path: "/articles",
        element: (
          <PrivateRoute>
            <Articles></Articles>,
          </PrivateRoute>
        ),
      },
      {
        path: "/addArticle",
        element: <AddArticle></AddArticle>,
      },
      {
        path: "/login",
        element: <Login></Login>,
      },
      {
        path: "/register",
        element: <Register></Register>,
      },
    ],
  },
  {
    path: "dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout></DashboardLayout>,
      </PrivateRoute>
    ),

    children: [
      {
        path: "adminHome",
        element: (
          <AdminRoute>
            <AdminHome></AdminHome>,
          </AdminRoute>
        ),
      },
      {
        path: "allUsers",
        element: (
          <AdminRoute>
            <AllUsers></AllUsers>,
          </AdminRoute>
        ),
      },
      {
        path: "allArticles",
        element: (
          <AdminRoute>
            <AllArticles></AllArticles>,
          </AdminRoute>
        ),
      },
      {
        path: "addPublisher",
        element: (
          <AdminRoute>
            <AddPublisher></AddPublisher>,
          </AdminRoute>
        ),
      },
    ],
  },
]);
