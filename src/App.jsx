import { Routes, Route } from "react-router-dom";
import AuthRestricted from "./auth/components/AuthRestricted";
import Layout from "./components/Layout/Layout";
import Dashboard from "./pages/Dashboard/Dashboard";
import CreateProduct from "./pages/Products/CreateProduct/CreateProduct";
import Inventory from "./pages/Products/Inventory/Inventory";
import Login from "./pages/Login/Login";
import CreateUser from "./pages/Users/CreateUser/CreateUser";
import ViewUsers from "./pages/Users/ViewUsers/ViewUsers";
import EditUser from "./pages/Users/EditUser/EditUser";
import ViewCategories from "./pages/Categories/ViewCategories/ViewCategories";
import CreateCategory from "./pages/Categories/CreateCategory/CreateCategory";
import ViewOrders from "./pages/Orders/ViewOrders/ViewOrders";
import MainContent from "./components/MainContent/MainContent";
import { ToastContainer } from "react-toastify";
import PersistLogin from "./auth/components/PersistLogin";
import OrderDetails from "./pages/Orders/OrderDetails/OrderDetails";

import {
  productsNavData,
  usersNavData,
  categoriesNavData,
  ordersNavData,
  dashboardNavData,
} from "./data/navData";

function App() {
  return (
    <>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<PersistLogin />}>
          <Route path="" element={<AuthRestricted />}>
            <Route path="" element={<Layout />}>
              <Route
                path=""
                element={<MainContent navData={dashboardNavData} />}
              >
                <Route index element={<Dashboard />} />
              </Route>
              <Route
                path="products"
                element={<MainContent navData={productsNavData} />}
              >
                <Route index element={<Inventory />} />
                <Route path="create" element={<CreateProduct key="create" />} />
                <Route
                  path=":id"
                  element={<CreateProduct isEditMode={true} key="edit" />}
                />
              </Route>
              <Route
                path="users"
                element={<MainContent navData={usersNavData} />}
              >
                <Route index element={<ViewUsers />} />
                <Route path="create" element={<CreateUser />} />
                <Route path=":id" element={<EditUser />} />
              </Route>

              <Route
                path="orders"
                element={<MainContent navData={ordersNavData} />}
              >
                <Route index element={<ViewOrders />} />
                <Route path=":id" element={<OrderDetails />} />
              </Route>
              <Route
                path="categories"
                element={<MainContent navData={categoriesNavData} />}
              >
                <Route path="" element={<ViewCategories />} />
                <Route path="create" element={<CreateCategory />} />
                <Route
                  path=":id"
                  element={<CreateCategory isEditMode={true} key="edit" />}
                />
              </Route>
            </Route>
          </Route>
        </Route>
        <Route path="/login" element={<Login />} />
      </Routes>
    </>
  );
}

export default App;
