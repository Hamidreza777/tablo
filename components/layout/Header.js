"use client";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, useContext } from "react";
import { UserContext } from "../../context/Context";
import { HiMenu, HiX } from "react-icons/hi";

function Header() {
  const { accessToken } = useContext(UserContext);
  const [buttonText, setButtonText] = useState("ورود و ثبت نام");
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    setButtonText(accessToken ? "داشبورد" : "ورود و ثبت نام");
  }, [accessToken]);

  return (
    <header
      className="fixed top-0 left-0 w-full z-50 h-[72px]
      bg-gradient-to-r from-blue-900 via-blue-800 to-blue-900
      backdrop-blur-xl shadow-xl shadow-blue-900/40
      flex justify-between items-center px-6 sm:px-16"
      dir="rtl"
    >
      {/* Logo */}
      <Link href="/" className="flex items-center gap-3 group relative">
        <div className="relative">
          <div className="absolute inset-0 bg-blue-400/30 blur-2xl rounded-full opacity-0 group-hover:opacity-100 transition-all duration-500" />
          <Image src="/img/logo.png" height={48} width={48} alt="لوگو" className="relative z-10 text-white bg-white" />
        </div>
        <span className="hidden sm:inline-block text-xl font-extrabold tracking-wider text-white drop-shadow-md">
          انصاف تابلو
        </span>
      </Link>

      {/* Desktop Navigation */}
      <nav className="hidden sm:flex gap-8 text-sm font-medium text-blue-200">
        {[
          { href: "/", label: "صفحه اصلی" },
          { href: "/product", label: "همه محصولات" },
          { href: "/callus", label: "تماس با ما" },
          { href: "/about", label: "درباره ما" },
        ].map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="relative group hover:text-white transition-colors duration-300"
          >
            {item.label}
            <span className="absolute -bottom-1 right-0 w-0 h-[2px] bg-gradient-to-r from-blue-400 to-blue-500 group-hover:w-full transition-all duration-300 rounded-full" />
          </Link>
        ))}
      </nav>

      {/* Mobile Menu Button */}
      <div className="sm:hidden flex items-center">
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="text-white text-3xl focus:outline-none"
        >
          {menuOpen ? <HiX /> : <HiMenu />}
        </button>
      </div>

      {/* Action Button */}
      <Link
        href={accessToken ? "/dashboard" : "/auth"}
        className="relative hidden sm:inline-block px-6 py-2 rounded-xl text-sm font-semibold text-white
        bg-gradient-to-r from-blue-500 to-blue-600
        hover:from-blue-400 hover:to-blue-500
        shadow-xl shadow-blue-500/40
        transition-all duration-300
        hover:scale-105"
      >
        {buttonText}
      </Link>

      {/* Mobile Dropdown Menu */}
      {menuOpen && (
        <div className="absolute top-[72px] left-0 w-full bg-blue-900 text-white shadow-xl flex flex-col items-center gap-4 py-6 sm:hidden">
          {[
            { href: "/", label: "صفحه اصلی" },
            { href: "/product", label: "همه محصولات" },
            { href: "/callus", label: "تماس با ما" },
            { href: "/about", label: "درباره ما" },
          ].map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-lg font-semibold hover:text-blue-300 transition-colors duration-300"
              onClick={() => setMenuOpen(false)}
            >
              {item.label}
            </Link>
          ))}

          <Link
            href={accessToken ? "/dashboard" : "/auth"}
            className="mt-3 px-6 py-2 rounded-xl text-sm font-semibold text-white
            bg-gradient-to-r from-blue-500 to-blue-600
            hover:from-blue-400 hover:to-blue-500
            shadow-lg shadow-blue-500/30 transition-all duration-300 w-[80%] text-center"
            onClick={() => setMenuOpen(false)}
          >
            {buttonText}
          </Link>
        </div>
      )}
    </header>
  );
}

export default Header;
