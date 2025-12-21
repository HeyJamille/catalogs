// Componentes
import FormSignIn from "@/components/templates/signin";
import Welcome from "@/components/templates/signin/welcome";

export default function SiganIn() {
  return (
    <div className="flex h-full">
      <Welcome />
      <FormSignIn />
    </div>
  );
}
