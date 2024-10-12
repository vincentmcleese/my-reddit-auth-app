import { useSession } from "next-auth/react";
import { updateEmail } from "@/actions";
import { useRouter } from "next/navigation";
import PageCard from "@/components/shared/PageCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Logo from "@/components/shared/logo";

export default function GetEmail({
  onEmailUpdated,
}: {
  onEmailUpdated: (email: string) => void;
}) {
  const { update } = useSession();
  const router = useRouter();

  async function handleSubmit(formData: FormData) {
    try {
      const result = await updateEmail(formData);
      if (result === "success") {
        const email = formData.get("email") as string;
        await update({ email });
        onEmailUpdated(email);
        router.refresh();
      }
    } catch (error) {
      console.error("Error updating email:", error);
      // Handle error (e.g., show error message to user)
    }
  }

  return (
    <PageCard
      title={<Logo />}
      footer={
        <Button
          type="submit"
          form="email-form"
          className="w-full bg-[#FF4500] hover:bg-[#FF5722] text-white font-semibold py-2 px-4 rounded-full"
        >
          Submit Email
        </Button>
      }
    >
      <p className="text-lg text-gray-600 mb-6">
        Please provide your email so we can send you information on your prize
        if you win.
      </p>
      <form id="email-form" action={handleSubmit}>
        <Input
          type="email"
          name="email"
          required
          placeholder="Enter your email"
          className="mb-4"
        />
      </form>
    </PageCard>
  );
}
