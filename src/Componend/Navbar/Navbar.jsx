import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,

  DropdownItem,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  Avatar,
  Button,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle,
} from "@heroui/react";
import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import Profile from './../Profile/Profile';
import { contextToken } from "../Context/contextToken";

export default function MyNavbar() {
  const { token, settoken } = useContext(contextToken)
  const navigate = useNavigate()
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const loginyes = [
    "home",
    "Profile",
    "Log Out",
  ];
  const loginno = [
    "register",
    "login",

  ];
  function logOut() {
    localStorage.removeItem("userToken")

    settoken(null)
    navigate("/login")
  }

  return (

    <Navbar onMenuOpenChange={setIsMenuOpen}>
      <NavbarContent>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="sm:hidden"
        />
        <NavbarBrand>

          <p className="font-bold text-inherit"> <Link to="/">ACME</Link></p>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden sm:flex gap-4" justify="center">

        {token !== null && <>
          <NavbarItem >
            <Link color="foreground" to="/">
              Home
            </Link>
          </NavbarItem>
          <NavbarItem isActive>
            <Link aria-current="page"  color="secondary" to="/profile">
              profile
            </Link>
          </NavbarItem>

        </>}


      </NavbarContent>

      <NavbarContent as="div" justify="end">
        <NavbarContent className="" justify="end">
          {token === null ? <>
            <NavbarItem>
              <Button as={Link} color="primary" to="/register" variant="flat">
                Sign Up
              </Button>
            </NavbarItem>
            <NavbarItem  >
              <Button as={Link} color="primary" to="/login" variant="flat">
                logen
              </Button>
            </NavbarItem>

          </> : <NavbarItem >
            <Button onClick={() => logOut()} color="primary" to="/login" variant="flat">
              log out
            </Button>
          </NavbarItem>
          }

        </NavbarContent>

        <Dropdown placement="bottom-end">
          <DropdownTrigger>
            <Avatar
              isBordered
              as="button"
              className="transition-transform"
              color="secondary"
              name="Jason Hughes"
              size="sm"
              src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
            />


          </DropdownTrigger>


          <DropdownMenu aria-label="Profile Actions" variant="flat">
            {/* <DropdownItem key="profile" className="h-14 gap-2">
              <p className="font-semibold">Signed in as</p>
              <p className="font-semibold">zoey@example.com</p>
            </DropdownItem> */}
            <DropdownItem key="settings"><Link className="block" to="/">Home</Link></DropdownItem>
            <DropdownItem key="settings"><Link className="block" to="/Profile">Profile</Link></DropdownItem>
            <DropdownItem key="logout" color="danger">
              Log Out
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </NavbarContent>
      <NavbarMenu>
        {token === null ?
          loginno.map((item, index) => (
            <NavbarMenuItem key={`${item}-${index}`}>
              <Link
                
                className="w-full block"
                color={
                  index === 2 ? "primary" : index === loginno.length - 1 ? "danger" : "foreground"
                }
                to={`/${item}`}
                size="lg"
              >
                {item}
              </Link>
            </NavbarMenuItem>
          ))
          :


          loginyes.map((item, index) => (
            <NavbarMenuItem key={`${item}-${index}`}>
              <Link
              onClick={item === "Log Out" && function () { logOut() }}
                className="w-full block"
                color={
                  index === 2 ? "primary" : index === loginyes.length - 1 ? "danger" : "foreground"
                }
                to={`/${item==="Log Out"?"login":item}`}
                size="lg"
              >
                {item}
              </Link>
            </NavbarMenuItem>
          ))}
      </NavbarMenu>

    </Navbar>
  );
}
