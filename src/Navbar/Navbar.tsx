"use client";
import countryEg from "@/assets/imgs/egypt.png";
import countryUK from "@/assets/imgs/kingdom.png";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import Image from "next/image";
export default function Navbar() {
  // for open menu and close it when the Screens on mobile
  const t = useTranslations("Navbar");
  const local = useLocale();
  //i use pathname for make active and i see where the user go so i can change active for every linek
  const pathName = usePathname();
  return (
      <nav className=" gap-52 bg-blue-300 text-white p-8">
        <div className="pe-10">
          Welcome
        </div>
        <ul className=" flex gap-3">
          <li
            className={`px-4 ${
              pathName === "ar" || "en" ? "text-mainColor" : ""
            }`}
          >
            <Link href="/">{t("home")}</Link>
          </li>
          <li
            className={`navLink ${
              pathName === "/categories" ? "text-mainColor" : ""
            }`}
          >
            <Link href="/">{t("Categories")}</Link>
          </li>
          <li
            className={`navLink ${
              pathName === "/contact" ? "text-mainColor" : ""
            }`}
          >
            <Link href="/"> {t("Contact us")}</Link>
          </li>
          <li
            className={`navLink ${
              pathName === "/about" ? "text-mainColor" : ""
            }`}
          >
            <Link href="/">{t("About")}</Link>
          </li>
        </ul>

        <div className="ps-10  ">
          <Link href={`/${local === "ar" ? "en" : "ar"}`} className={`flex`}>
            <span className={"me-2 "}>{t("language")}</span>
            <Image
              src={local === "ar" ? countryUK : countryEg}
              width={20}
              height={20}
              alt="Egypt Flag"
              className="rounded-full size-5"
            />
          </Link>
        </div>
      </nav>
  );
}
