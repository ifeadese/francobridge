import Link from "next/link";
import { SITE_NAME } from "@/lib/constants";

const Header = () => {
  return (
    <h2 className="font-heading font-semibold text-navy text-2xl md:text-4xl tracking-tight leading-tight mb-20 mt-8 flex items-center">
      <Link href="/" className="hover:underline">
        {SITE_NAME}
      </Link>
      .
    </h2>
  );
};

export default Header;
