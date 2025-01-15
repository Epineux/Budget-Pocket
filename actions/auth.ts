"use server";

import { createSession, deleteSession } from "@/lib/session";
import { loginSchema } from "@/schemas/authSchema";
import { redirect } from "next/navigation";

const testUser = {
  id: "1",
  email: "contact@cosdensolutions.io",
  password: "12345678",
};

export async function handleLogin(prevState: any, formData: FormData) {
  const result = loginSchema.safeParse(Object.fromEntries(formData));

  if (!result.success) {
    return {
      errors: result.error.flatten().fieldErrors,
    };
  }

  const { email, password } = result.data;

  if (email !== testUser.email || password !== testUser.password) {
    return {
      errors: {
        email: ["Invalid email or password"],
      },
    };
  }
  await createSession(testUser.id);

  redirect("/");
}

export async function logout() {
  await deleteSession();
  redirect("/login");
}
