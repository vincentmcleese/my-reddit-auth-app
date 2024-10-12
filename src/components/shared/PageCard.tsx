import React from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";

interface PageCardProps {
  title: React.ReactNode;
  footer?: React.ReactNode;
  children: React.ReactNode;
}

export default function PageCard({ title, footer, children }: PageCardProps) {
  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-[#F2F2F7]">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">{title}</div>
        <Card className="overflow-hidden shadow-lg bg-white">
          <CardHeader>
            <div className="w-full h-1 bg-[#007AFF]"></div>
          </CardHeader>
          <CardContent>{children}</CardContent>
          {footer && (
            <CardFooter className="bg-[#F2F2F7] text-center text-sm text-[#8E8E93]">
              {footer}
            </CardFooter>
          )}
        </Card>
      </div>
    </div>
  );
}
