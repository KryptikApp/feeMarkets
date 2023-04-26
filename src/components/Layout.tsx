import Head from "next/head";
import { useRouter } from "next/router";
import { Toaster } from "react-hot-toast";
import Navbar from "./navbars/Navbar";
import { Inter, Roboto } from "next/font/google";
import { useEffect, useState } from "react";

const mainFont = Inter({ subsets: ["latin"] });

// TODO: Update to support dynamic headers
export default function Layout({ children }: any) {
  const router = useRouter();
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    if (window && window.matchMedia("(prefers-color-scheme: dark)").matches) {
      console.log("Dark mode detected");
      setIsDark(true);
    }
  }, []);

  return (
    <div className={`min-h-screen pb-20 ${isDark && "dark"} px-4`}>
      <Head>
        <title>Network Fees</title>
        <meta
          name="description"
          content="Privacy preserving face authentication on the browser."
        />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@kryptikApp" />
        <meta name="twitter:title" content="Faze ID" />
        <meta
          name="twitter:description"
          content="Privacy preserving face authentication on the browser."
        />
        <meta name="twitter:image" content="/fazeLogo.png" />
        <link rel="icon" href="/fazeLogo.png" />
      </Head>
      {/* add custom font */}
      <style jsx global>{`
        html {
          font-family: ${mainFont.style.fontFamily};
        }
      `}</style>
      <main className={``}>
        <Toaster position="top-left" />
        <div className="h-28" />
        {children}
      </main>
    </div>
  );
}
