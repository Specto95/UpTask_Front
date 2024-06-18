import { Outlet } from "react-router-dom";
import Tabs from "../components/profile/Tabs";

export function ProfileLayout() {
  return (
    <>
      <Tabs />
      <Outlet />
    </>
  );
}
