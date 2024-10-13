import Image from "next/image";
export default function Logo() {
  return (
    <div className="mt-8 flex justify-center">
      <Image src="/SecondaryLogo.png" alt="logo" width={100} height={100} />
    </div>
    // <div className="text-4xl font-bold text-reddit-orange">
    //   Karm-a
    //   <span className="text-5xl">h</span>
    //   <span className="text-6xl">h</span>
    //   <span className="text-7xl">h</span>
    // </div>
  );
}
