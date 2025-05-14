import { auto } from "@popperjs/core";
import Image from "next/image";
export default function Landing(){

    return (
      <div className="relative w-full h-screen">
        <Image
          src="/images/landing.jpg" // Assurez-vous d'avoir une image nommée `landing-image.jpg` dans le dossier `public`
          alt="Landing Page Image"
          layout="fill"
          objectFit="cover"
          quality={100}
        />
      </div>
    );
}