import "@/app/globals.css";
import Providers from "@/components/Providers";
import { Comfortaa } from "next/font/google";

const font = Comfortaa({
  weight: "variable",
  subsets: ["latin"],
});
export default function RootLayout({ children }) {
  return (
    <html lang="en" className="h-full w-full">
      <body className={font.className + " h-full w-full"}>
        <Providers>{children}</Providers></body>
    </html>
  );
}
