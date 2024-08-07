"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { SignupSchema } from ".";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";

const Signup = () => {
  const form = useForm<z.infer<typeof SignupSchema>>({
    resolver: zodResolver(SignupSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const handleSubmit = async (data: z.infer<typeof SignupSchema>) => {
    console.log(data);
  };

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
        <h1 className="text-4xl font-semibold mb-5">Sign up</h1>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-6"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder="Name" {...field} type="name" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder="Email" {...field} type="email" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder="Password" {...field} type="password" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full bg-yellow-400 text-black">
              Submit
            </Button>
          </form>
        </Form>
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

export default Signup;
