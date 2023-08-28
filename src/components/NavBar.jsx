import Image from "next/image";
import LoginBtn from "./LoginBtn";
import logo from "@/../public/logo.png";

export default function NavBar() {
  return (
    <nav className="p-2 xl:px-[20%] sm:px-[12%] overflow-hidden border-b-2  flex  w-full items-center ">
      <Image src={logo} alt="logo" width={50} height={50} className="mx-3"/>
      <LoginBtn />
    </nav>
  );
}
