export default function ScratchComplete({ outcome }: { outcome: boolean }) {
  return (
    <div className="p-4">
      {outcome
        ? "You win! We'll contact you via the e-mail you provided us on next steps."
        : "Not today! Try again tomorrow at 17:00 UTC "}
    </div>
  );
}
