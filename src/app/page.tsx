import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

const Home = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 items-center h-full p-5">
      <div className="hidden md:block">
        <Image
          src={
            "https://images.unsplash.com/photo-1535025183041-0991a977e25b?w=300&dpr=2&q=80"
          }
          alt=""
          width={410}
          height={852}
          className="rounded-md object-cover"
        />
      </div>
      <div className="w-[500px]">
        <h1 className="text-4xl font-semibold">Productive Mind</h1>
        <div className="my-5 text-sm">
          With only the features you need, Organic Mind is customized for
          individuals seeking a stress-free way to stay focused on their goals,
          projects, and tasks.
        </div>
        <Button className="w-full bg-yellow-400 text-black" asChild>
          <Link href={"/signin"}>Get Started</Link>
        </Button>
        <div className="text-sm text-center">
          Already have an account?
          <Button className="py-0 px-1 text-sm" variant={"link"} asChild>
            <Link href={"/signin"}>Sign in</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Home;
