import LoginForm from "@/components/Auth/LoginForm";
import Link from "next/link";

const page = () => {
  return (
    <div className="w-full rounded-xl bg-white px-md py-xl sm-490:w-4/5 sm-490:px-2xl sm-490:py-2xl md:w-[560px]">
      <h1 className="h1 text-grey-900">Login</h1>
      <LoginForm />
      <p className="text-standard mt-2xl text-center text-grey-500">
        Need to create an account ?{" "}
        <Link
          className="text-standard-bold ml-xs text-grey-900 underline hover:opacity-80"
          href={"/sign-up"}
        >
          Sign up
        </Link>
      </p>
    </div>
  );
};

export default page;
