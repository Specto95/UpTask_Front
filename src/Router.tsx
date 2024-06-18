import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AppLayout } from "./layouts/AppLayout";
import { DashboardView } from "./views/DashboardView";
import { CreateProjectView } from "./views/projects/CreateProjectView";
import { EditProjectView } from "./views/projects/EditProjectView";
import { ProjectDetailsView } from "./views/projects/ProjectDetailsView";
import { AuthLayout } from "./layouts/AuthLayout";
import { Login } from "./views/auth/Login";
import { Register } from "./views/auth/Register";
import { ConfirmAccount } from "./views/auth/ConfirmAccount";
import { ResendCode } from "./views/auth/ResendCode";
import { ForgotPassword } from "./views/auth/ForgotPassword";
import { NewPassword } from "./views/auth/NewPassword/NewPassword";
import { ProjectTeam } from "./views/projects/ProjectTeamView";
import { Profile } from "./views/profile/Profile";
import { ChangePassword } from "./views/profile/ChangePassword";
import { ProfileLayout } from "./layouts/ProfileLayout";
import { NotFound } from "./views/404/NotFound";

export function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppLayout />}>
          <Route path="/" element={<DashboardView />} index />
          <Route path="/projects/create" element={<CreateProjectView />} />
          <Route
            path="/projects/:projectId/edit"
            element={<EditProjectView />}
          />
          <Route path="/projects/:projectId/team" element={<ProjectTeam />} />
          <Route
            path="/projects/:projectId/"
            element={<ProjectDetailsView />}
          />
          <Route element={<ProfileLayout />}>
            <Route path="/profile" element={<Profile />} />
            <Route
              path="/profile/change-password"
              element={<ChangePassword />}
            />
          </Route>
        </Route>

        <Route element={<AuthLayout />}>
          <Route path="/auth/login" element={<Login />} />
          <Route path="/auth/register" element={<Register />} />
          <Route path="/auth/confirm-account" element={<ConfirmAccount />} />
          <Route path="/auth/resend-code" element={<ResendCode />} />
          <Route path="/auth/forgot-password" element={<ForgotPassword />} />
          <Route path="/auth/new-password" element={<NewPassword />} />
        </Route>

        <Route element={<AuthLayout />}>
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
