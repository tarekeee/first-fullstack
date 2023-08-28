
import "@/app/globals.css"
import Providers from "@/components/Providers"



export default function RootLayout({ children }) {
  return (
    <html lang="en" className="h-full">
      <body className="h-full" >
        <Providers>
        {children}
        </Providers>
        </body>
    </html>
  )
}
