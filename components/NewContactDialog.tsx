"use client";

import { z } from "zod";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { contactAvatarsUrl } from "@/constants/contactAvatarsUrl";
import { createClient } from "@/utils/supabase/client";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "./ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

type NewContactDialogProps = {
  onContactCreated?: () => void;
};

const formSchema = z.object({
  name: z.string().min(1).max(25),
  avatar: z.string().min(1),
});

const contactAvatars = contactAvatarsUrl;

const NewContactDialog = ({ onContactCreated }: NewContactDialogProps) => {
  const [open, setOpen] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      avatar: "",
    },
  });

  const handleSubmit = async (
    values: z.infer<typeof formSchema>,
    { setOpen }: { setOpen: (open: boolean) => void },
  ) => {
    const supabase = createClient();
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      const userId = user?.id;

      if (!userId) {
        alert("User not authenticated");
        return;
      }

      const { error } = await supabase.from("contacts").insert([
        {
          name: values.name,
          avatar: values.avatar,
          user_id: userId,
        },
      ]);

      if (error) {
        if (error.code === "23505") {
          console.error("Error: A contact with this name already exists.");
          alert(
            "A contact with this name already exists. Please choose a different name.",
          );
        } else {
          console.error("Error inserting contact:", error);
        }
        return false;
      } else {
        form.reset();
        setOpen(false);
        onContactCreated?.();
        return true;
      }
    } catch (error) {
      console.error(error);
      return false;
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="text-standard ml-auto mt-auto h-12 rounded-lg bg-grey-900 text-white">
          + Add New Contact
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="h1 text-grey-900">
            Add New Contact
          </DialogTitle>
          <DialogDescription className="text-standard py-sm text-grey-500">
            Add a new Contact to your account. You can then make transactions
            with this contact.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              e.stopPropagation();
              form.handleSubmit((values) => handleSubmit(values, { setOpen }))(
                e,
              );
            }}
            className="space-y-8"
          >
            <div className="flex gap-lg">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel className="!text-small-bold text-grey-500">
                      Contact Name
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="text"
                        className="text-standard h-12 border border-beige-500 focus-visible:ring-1 focus-visible:ring-grey-900 focus-visible:ring-offset-1"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="avatar"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="!text-small-bold text-grey-500">
                      Contact Avatar
                    </FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <SelectTrigger className="h-12 border border-beige-500 focus:ring-1 focus:ring-grey-900 focus:ring-offset-1 data-[placeholder]:text-neutral-500 [&>svg]:hidden">
                          <div className="text-standard mx-xs flex w-full justify-between gap-md">
                            <SelectValue placeholder="Select Contact" />
                            <Image
                              src={"/assets/images/icon-caret-down.svg"}
                              alt="Dropdown"
                              width={11}
                              height={6}
                              className="w-auto"
                            />
                          </div>
                        </SelectTrigger>
                        <SelectContent>
                          <div className="grid grid-cols-5">
                            {contactAvatars.map((avatar, index) => (
                              <SelectItem key={index} value={avatar as string}>
                                <Image
                                  src={avatar}
                                  alt="Contact Avatar"
                                  width={32}
                                  height={32}
                                  className="rounded-full"
                                />
                              </SelectItem>
                            ))}
                          </div>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <Button className="!mt-2xl h-12 w-full" type="submit">
              Add Contact
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default NewContactDialog;
