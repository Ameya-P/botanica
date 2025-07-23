import { Outlet } from "react-router-dom"
import SideBar from "../components/SideBar"
import Toggle from "../components/Toggle"

function Layout(){
  return (
    <div className="app-container">
        <nav className="menu">
            <Toggle />
            <SideBar />
        </nav>
        <Outlet />
    </div>
  )
}

export default Layout

