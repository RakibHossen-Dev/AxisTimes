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
import ArticlesDetails from "../pages/ArticlesDetails/ArticlesDetails";
import UpdateMyArticle from "../pages/UpdateMyArticle/UpdateMyArticle";
import PremiumArticles from "../pages/PremiumArticles/PremiumArticles";
import Subscription from "../pages/Subscription/Subscription";
import Payment from "../pages/Payment/Payment";
import About from "../pages/About";
import NotFound from "../pages/NotFound";

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
        path: "*",
        element: <NotFound></NotFound>,
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
        path: "/payment",
        element: (
          <PrivateRoute>
            <Payment></Payment>,
          </PrivateRoute>
        ),
      },
      {
        path: "/updateArticle/:id",
        element: (
          <PrivateRoute>
            <UpdateMyArticle></UpdateMyArticle>,
          </PrivateRoute>
        ),
        loader: ({ params }) =>
          fetch(`https://axistimes-server.vercel.app/article/${params.id}`),
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
        path: "/subscription",
        element: (
          <PrivateRoute>
            <Subscription></Subscription>,
          </PrivateRoute>
        ),
      },
      {
        path: "/premiumArticles",
        element: (
          <PrivateRoute>
            <PremiumArticles></PremiumArticles>,
          </PrivateRoute>
        ),
      },
      {
        path: "/articles",
        element: <Articles></Articles>,
      },
      {
        path: "/about",
        element: <About></About>,
      },
      {
        path: "/articleDetails/:id",
        element: <ArticlesDetails></ArticlesDetails>,
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
        path: "myProfile",
        element: (
          <PrivateRoute>
            <MyProfile></MyProfile>,
          </PrivateRoute>
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
