import { redirect } from "next/navigation";

// The Guide was reorganized into the multipage /learn section.
export default function GuideRedirect() {
  redirect("/learn");
}
