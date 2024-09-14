import React from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Logo from "@/components/shared/logo";

interface PageCardProps {
  title: React.ReactNode;
  children: React.ReactNode;
  footer?: React.ReactNode;
}

export default function PageCard({ title, children, footer }: PageCardProps) {
  return (
    <div className="px-4 sm:px-6 md:px-8 py-8 w-full max-w-full">
      <Card className="w-full max-w-md mx-auto overflow-hidden">
        <CardHeader>
          <CardTitle className="text-2xl sm:text-3xl md:text-4xl font-bold text-center">
            {title}
          </CardTitle>
        </CardHeader>
        <CardContent className="text-center overflow-x-auto">
          <div className="break-words overflow-hidden">{children}</div>
        </CardContent>
        {footer && (
          <CardFooter className="flex justify-center">{footer}</CardFooter>
        )}
      </Card>
    </div>
  );
}
