import { useSession } from "next-auth/react";
import { updateEmail } from "@/actions";
import { useRouter } from "next/navigation";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Logo from "@/components/shared/logo";
import { revalidatePath } from "next/cache";

export default function GetEmail() {
  const { update } = useSession();
  const router = useRouter();
  async function handleSubmit(formData: FormData) {
    console.log("Form data:", formData);
    try {
      const result = await updateEmail(formData);
      if (result === "success") {
        const email = formData.get("email") as string;
        await update({ email });
        console.log("Email updated on client session:", email);
        // Refresh the current route to trigger a re-render of the parent component
        revalidatePath("/");
        router.refresh();
      }
    } catch (error) {
      console.error("Error updating email:", error);
      // Handle error (e.g., show error message to user)
    }
  }

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle className="text-4xl font-bold text-center">
          <Logo />
        </CardTitle>
      </CardHeader>
      <CardContent className="text-center">
        <p className="text-lg text-gray-600 mb-6">
          Please provide your email to complete your account setup.
        </p>
        <form action={handleSubmit}>
          <Input
            type="email"
            name="email"
            required
            placeholder="Enter your email"
            className="mb-4"
          />
          <Button
            type="submit"
            className="w-full bg-[#FF4500] hover:bg-[#FF5722] text-white font-semibold py-2 px-4 rounded-full"
          >
            Submit Email
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
