
import "@/app/globals.css"
import Providers from "@/components/Providers"
import NavBar from "@/components/NavBar"



export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="">
          <NavBar/>
        {children}
        </body>
    </html>
  )
}
