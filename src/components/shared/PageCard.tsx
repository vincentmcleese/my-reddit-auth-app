import React from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface PageCardProps {
  title: React.ReactNode;
  children: React.ReactNode;
  footer?: React.ReactNode;
}

export default function PageCard({ title, children, footer }: PageCardProps) {
  return (
    <div className="w-full px-4 sm:px-4 md:px-6 py-2 sm:py-4 md:py-6">
      <Card className="w-full max-w-full mx-auto overflow-hidden p-2 sm:p-4">
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
