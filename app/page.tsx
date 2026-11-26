import { Site } from "@/components/Site";
import { localBusinessJsonLd } from "@/lib/schema";

export default function Home() {
  const jsonLd = JSON.stringify(localBusinessJsonLd).replace(/</g, "\\u003c");

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd }} />
      <Site />
    </>
  );
}
