import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import LoginPage from "./admin/features/auth/presentation/ui/LoginPage.tsx";
import DashboardPage from "./admin/features/dashboard/presentation/ui/DashboardPage.tsx";
import NotFoundPage from "./admin/common/pages/errors/NotFoundPage.tsx";
import { AdminLayout } from "./admin/common/components";
import ProtectedRoute from "./core/route/ProtectedRoute.tsx";
import PublicRoute from "./core/route/PublicRoute.tsx";
import UserRolePage from "./admin/features/role/presentation/ui/RolePage.tsx";
import MembersPage from "./admin/features/member/presentation/ui/MembersPage.tsx";
import { GuildPage } from "./admin/features/guild/presentation/ui/GuildPage.tsx";
import { MemberDetailPage } from "./admin/features/member/presentation/ui/MemberDetailPage.tsx";
import MembersListPage from "./admin/features/member/presentation/ui/MemberListPage.tsx";
import AuthChecker from "./admin/common/components/AuthChecker.tsx";
import PrivacyPolicyPage from "./admin/features/privacy-policy/presentation/ui/PrivacyPolicyPage.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <AdminLayout />,
    errorElement: <NotFoundPage />,
    children: [
      {
        element: <AuthChecker />,
        children: [
          {
            element: <ProtectedRoute />, // Protect the dashboard route
            children: [
              {
                path: "dashboard",
                element: <DashboardPage />,
                errorElement: <NotFoundPage />,
                children: [
                  //Redirect from /dashboard to /dashboard/users
                  {
                    // default component  - This will match the exact /dashboard path
                    index: true,
                    // Redirects to /dashboard/users
                    element: <Navigate to="members" replace={true} />,
                  },
                  {
                    path: "members",
                    element: <MembersPage />,
                    errorElement: <NotFoundPage />,
                    children: [
                      {
                        index: true, // default component
                        element: <MembersListPage />,
                      },
                      {
                        path: ":id",
                        element: <MemberDetailPage />,
                        errorElement: <NotFoundPage />,
                      },
                    ],
                  },
                  {
                    path: "roles",
                    element: <UserRolePage />,
                    errorElement: <NotFoundPage />,
                  },
                  {
                    path: "guilds",
                    element: <GuildPage />,
                    errorElement: <NotFoundPage />,
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        // Prevent logged-in users from visiting login page
        element: <PublicRoute />, 
        children: [
          {
            path: "login",
            element: <LoginPage />,
            errorElement: <NotFoundPage />,
            children: [],
          },
        ],
      },
      // Publicly accessible route for Privacy Policy
      {
        path: "privacy-policy",
        element: <PrivacyPolicyPage />,
        errorElement: <NotFoundPage />,
      },
      {
        path: "*",
        element: <NotFoundPage />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
