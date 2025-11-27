// src/index.tsx

import React from 'react';
import { createRoot } from "react-dom/client";
import { Provider } from 'react-redux';
import store from './redux/store';
import './index.css';
import {
  createBrowserRouter,
  Outlet,
  RouterProvider,
} from "react-router-dom";
import HomePage from './HomePage';
import Message from './route/message/Message';
import AllMessage from './route/message/AllMessage';
import AddArticle from './route/article/AddArticle';
import AllArticle from './route/article/AllArticle';
import Dashboard from './route/home/Dashboard';
// import DefaulPage from './route/home/DefaulPage';
import TableMember from './route/member/TableMember';
import Banner from './route/banner/Banner';
// import ActiveMember from './route/member/ActiveMember';
// import DeActiveMember from './route/member/DeActiveMember';
import AppConfig from './route/setting/AppConfig';
import Language from './route/language/Language';
import About from './route/about/About';
import Term from './route/term/Term';
import GuideBook from './route/guide/GuideBook';
import User from './route/user/User';
import Contact from './route/setting/contact/Contact';
import PushNotif from './route/push/PushNotif';
import BrandOffice from './route/brand/BrandOffice';
// import BukuPanduan from './route/panduan/BukuPanduan';
import ProductInfo from './route/product/ProductInfo';
import Claim from './route/claim/Claim';
import MaxClaim from './route/claim/MaxClaim';
import DynamicMenu from './route/menu/DynamicMenu';
import Faq from './route/faq/Faq';
import AddProduct from './route/product/AddProduct';
// import AddDynamicMenu from './route/menu/AddDynamicMenu';
import AddFaq from './route/faq/AddFaq';
import AddDynMenu from './route/menu/AddDynMenu';
// import { BrowserRouter } from 'react-router-dom';
import Telemedicine from './route/telemedicine/Telemedicine';
import SetupKey from './route/tag/SetupKey';
import Parameters from './route/tag/Parameters';
import Rules from './route/tag/Rules';
import AddRules from './route/tag/AddRules';
import EditRules from './route/tag/EditRules';
import ActionRule from './route/tag/ActionRule';
import EditAction from './route/tag/EditAction';
import AddAction from './route/tag/AddAction';
import Logging from './route/logging/Logging';
import Pdp from './route/pdp/Pdp';

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
    errorElement: <div>Error Page</div>,
    children: [
      {
        path: "/",
        element: <Dashboard />,
      },
      {
        path: "/dashboard",
        element: <Dashboard />,
      },
      {
        path: "/article",
        element: <Outlet />,
        errorElement: <div>Error Page</div>,
        children: [
          {
            path: "/article/add-article",
            element: <AddArticle key={"add"} />,
          },
          {
            path: "/article/edit-article/:id",
            element: <AddArticle key={"edit"} />,
          },
          {
            path: "/article/all-article",
            element: <AllArticle key={"all"} />,
          },
        ],
      },
      {
        path: "/member",
        element: <Outlet />,
        errorElement: <div>Error Page</div>,
        children: [
          {
            path: "/member/all-member",
            element: <TableMember key={"all"} type="all" />,
          },
          {
            path: "/member/active-member",
            element: <TableMember key={"active"} type="active" />,
          },
          {
            path: "/member/deactive-member",
            element: <TableMember key={"inactive"} type="inactive" />,
          },
        ],
      },
      {
        path: "/faq",
        element: <Outlet />,
        errorElement: <div>Error Page</div>,
        children: [
          {
            path: "/faq/add-faq/",
            element: <AddFaq key="add" />,
          },
          {
            path: "/faq/edit-faq/:id",
            element: <AddFaq key="edit" />,
          },
          {
            path: "/faq/all",
            element: <Faq />,
          },
        ],
      },
      {
        path: "/banner",
        element: <Banner />,
        errorElement: <div>Error Page</div>,
      },
      {
        path: "/dynamicmenu",
        element: <DynamicMenu />,
        errorElement: <div>Error Page</div>,
      },
      {
        path: "/dynamicmenu-add",
        element: <AddDynMenu key={"add-menu"} />,
        errorElement: <div>Error Page</div>,
      },
      {
        path: "/dynamicmenu-edit",
        element: <AddDynMenu key={"edit-menu"} />,
        errorElement: <div>Error Page</div>,
      },
      {
        path: "/pushnotification",
        element: <PushNotif />,
        errorElement: <div>Error Page</div>,
      },
      {
        path: "/brandoffice",
        element: <BrandOffice />,
        errorElement: <div>Error Page</div>,
      },
      {
          path: "/telemedicine",
          element: <Telemedicine />,
          errorElement: <div>Error Page</div>,
      },
      {
        path: "/manualbook",
        element: <GuideBook />,
        errorElement: <div>Error Page</div>,
      },
      {
        path: "/productinfo",
        element: <ProductInfo />,
        errorElement: <div>Error Page</div>,
      },
      {
        path: "/add-product",
        element: <AddProduct key={"add"} />,
        errorElement: <div>Error Page</div>,
      },
      {
        path: "/edit-product",
        element: <AddProduct key={"edit"} />,
        errorElement: <div>Error Page</div>,
      },
      {
        path: "/claim",
        element: <Claim />,
        errorElement: <div>Error Page</div>,
      },
      {
        path: "/setting/maxclaim",
        element: <MaxClaim />,
        errorElement: <div>Error Page</div>,
      },
      {
        path: "/about",
        element: <About />,
        errorElement: <div>Error Page</div>,
      },
      {
        path: "/pdp",
        element: <Pdp />,
        errorElement: <div>Error Page</div>,
      },
      {
        path: "/term",
        element: <Term />,
        errorElement: <div>Error Page</div>,
      },
      {
        path: "/guidebook",
        element: <GuideBook />,
        errorElement: <div>Error Page</div>,
      },
      {
        path: "/user",
        element: <User />,
        errorElement: <div>Error Page</div>,
      },
      {
        path: "/message",
        element: <Message />,
        errorElement: <div>Error Page</div>,
        children: [
          {
            path: "/message/all-message",
            element: <AllMessage />,
            children: [
              {
                path: "/message/all-message/open-message",
                element: <div>Add Message</div>,
              },
              {
                path: "/message/all-message/new-message",
                element: <div>Add Message</div>,
              },
            ],
          },
        ],
      },
      {
        path: "/tagManager",
        element: <Outlet />,
        errorElement: <div>Error Page</div>,
        children: [
          {
            path: "/tagManager/addAction",
            element: <AddAction />,
          },
          {
            path: "/tagManager/editAction",
            element: <EditAction />,
          },
          {
            path: "/tagManager/editRules",
            element: <EditRules />,
          },
          {
            path: "/tagManager/rules",
            element: <Rules />,
          },
          {
            path: "/tagManager/addRules",
            element: <AddRules />,
          },
          {
            path: "/tagManager/actionRules",
            element: <ActionRule />,
          },
          {
            path: "/tagManager/setupKey",
            element: <SetupKey />,
          },
          {
            path: "/tagManager/setupParameters",
            element: <Parameters />,
          },
        ],
      },
      {
        path: "/setting",
        element: <Outlet />,
        errorElement: <div>Error Page</div>,
        children: [
          {
            path: "/setting/app-config",
            element: <AppConfig />,
          },
          {
            path: "/setting/language",
            element: <Language />,
          },
          {
            path: "/setting/contact",
            element: <Contact />,
          },
        ],
      },
      {
        path: "/logging",
        element: <Logging />,
        errorElement: <div>Error Page</div>,
      },
    ],
  },
]);
// ], { basename: "/tmmin-cms" });


const rootElement = document.getElementById("root") as HTMLElement;
const root = createRoot(rootElement);
root.render(
  <Provider store={store}>
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  </Provider>
);

