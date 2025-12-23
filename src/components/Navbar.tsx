// src/components/Navbar.tsx
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import logo from "../assets/logo.svg";
import useLogout from "../hooks/useLogout";

export default function Navbar() {
  const logout = useLogout();
  return (
    <nav className="w-full h-16 bg-white flex items-center justify-between px-6 shadow-md sticky top-0 z-50 ">
      {/* Logo */}
      <div className="flex items-center space-x-2">
        <img src={logo} alt="Logo" className="h-30 w-30 object-contain" />
      </div>

      {/* User avatar */}
      <DropdownMenu>
        <DropdownMenuTrigger>
          <Avatar className="w-10 h-10 cursor-pointer">
            <AvatarImage src="/avatar.png" alt="User Avatar" />
            <AvatarFallback>U</AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>

        <DropdownMenuContent
          align="end"
          className="bg-white rounded-md shadow-lg"
        >
          <DropdownMenuItem onClick={logout}>Logout</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </nav>
  );
}
