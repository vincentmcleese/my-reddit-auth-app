import { useState } from "react";
import { useSession } from "next-auth/react";
import { updateEmail } from "@/actions";
import { useRouter } from "next/navigation";

export default function GetEmail() {
  const [email, setEmail] = useState("");
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
        router.refresh();
      }
    } catch (error) {
      console.error("Error updating email:", error);
      // Handle error (e.g., show error message to user)
    }
  }

  return (
    <form action={handleSubmit}>
      <input
        type="email"
        name="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        placeholder="Enter your email"
      />
      <button type="submit">Submit</button>
    </form>
  );
}
