import "./globals.css";
import SubBanner from "@/components/SubBanner";
import Navbar from "@/components/Navbar";

export const metadata = {
  title: "Make Clone",
  description: "Make Clone",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`antialiased`}>
        <SubBanner />
        <Navbar />
        {children}
      </body>
    </html>
  );
}
