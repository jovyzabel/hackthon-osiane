import Button from "@/components/Button";
import Card from "@/components/Cards";
import Header from "@/components/Header";
import Landing from "@/components/Landing";

export default function Home() {
  return (
    <>
      <Header />
      <Landing />
      <main className="container mx-auto p-4">
        <section className="my-8">
          <h2 className="text-2xl font-bold text-center mb-4">Bienvenue</h2>
          <p className="text-lg text-gray-700">
            Nous sommes une association dédiée à l'aide et au soutien des
            enfants vivant avec un handicap. Notre mission est de leur offrir un
            environnement inclusif et des opportunités pour s'épanouir.
          </p>
        </section>
        <section className="flex justify-center">
          <Button title="Commencer l'enquête" />
        </section>
        <section className="my-8">
          <h2 className="text-2xl font-bold text-center mb-4">
            Comment nous aider
          </h2>
          <p className="text-lg text-gray-700">
            Vous pouvez nous aider de différentes manières : en faisant un don,
            en devenant bénévole, ou en participant à nos événements. Chaque
            contribution compte et fait une différence dans la vie de ces
            enfants.
          </p>
        </section>
        <section>
          <div className="flex flex-row justify-center">
            <Card
              title="Evenement"
              description="Lorem ipsum"
              imageSrc="/images/img1.jpg"
            />
            <Card
              title="Evenement"
              description="Lorem ipsum"
              imageSrc="/images/img2.jpg"
            />
            <Card
              title="Evenement"
              description="Lorem ipsum"
              imageSrc="/images/img3.jpg"
            />
            <Card
              title="Evenement"
              description="Lorem ipsum"
              imageSrc="/images/img4.jpg"
            />
          </div>
        </section>
      </main>

      <footer className="bg-pink-600 text-white p-4 text-center">
        <p>
          &copy; 2023 Association pour l'Aide aux Enfants Handicapés. Tous
          droits réservés.
        </p>
      </footer>
    </>
  );
}
