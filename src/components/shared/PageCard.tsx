import React from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";

interface PageCardProps {
  title: React.ReactNode;
  footer?: React.ReactNode;
  children: React.ReactNode;
}

export default function PageCard({ title, footer, children }: PageCardProps) {
  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-white sm:bg-transparent">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">{title}</div>
        <div className="sm:hidden w-full">
          <div className="w-full h-1 bg-[#007AFF]"></div>
          <div className="p-4">{children}</div>
          {footer && (
            <div className="bg-[#F2F2F7] text-center text-sm text-[#8E8E93] p-4">
              {footer}
            </div>
          )}
        </div>
        <Card className="hidden sm:block overflow-hidden shadow-lg bg-white">
          <CardHeader>
            <div className="w-full h-1 bg-[#007AFF]"></div>
          </CardHeader>
          <CardContent className="p-4">{children}</CardContent>
          {footer && (
            <CardFooter className="bg-[#F2F2F7] text-center text-sm text-[#8E8E93] p-4">
              {footer}
            </CardFooter>
          )}
        </Card>
        <div className="mt-4 mb-4 text-white text-sm text-center">
          <Link href="/privacy-policy" className="hover:underline">
            Privacy Policy
          </Link>
          <span className="mx-2">|</span>
          <Link href="/about" className="hover:underline">
            About 6degrees
          </Link>
          <span className="mx-2">|</span>
          <Link href="/contact" className="hover:underline">
            Contact
          </Link>
        </div>
        <div className="mt-8 flex justify-center">
          <Image src="/SecondaryLogo.png" alt="logo" width={100} height={100} />
        </div>
      </div>
    </div>
  );
}
