// Componentes
import SignIn from "@/components/templates/signin";
import Welcome from "@/components/templates/signin/welcome";

export default function Home() {
  return (
    <div className="flex h-full">
      <Welcome />
      <SignIn />
    </div>
  );
}
