import Image from "next/image";

export default function Logo() {
  return (
    <div className="flex justify-center">
      {/* Primary logo for small screens */}
      <div className="sm:hidden">
        <Image
          src="/PrimaryLogo_1.png"
          alt="Primary logo"
          width={150}
          height={150}
        />
      </div>

      {/* Secondary logo for larger screens */}
      <div className="hidden sm:block">
        <Image
          src="/SecondaryLogo.png"
          alt="Secondary logo"
          width={100}
          height={100}
        />
      </div>
    </div>
  );
}
