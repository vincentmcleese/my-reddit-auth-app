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
    <div className="px-4 sm:px-0">
      <Card className="w-full max-w-md mx-auto">
        <CardHeader>
          <CardTitle className="text-4xl font-bold text-center">
            {title}
          </CardTitle>
        </CardHeader>
        <CardContent className="text-center">{children}</CardContent>
        {footer && (
          <CardFooter className="flex justify-center">{footer}</CardFooter>
        )}
      </Card>
    </div>
  );
}
