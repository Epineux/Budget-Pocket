import { useState, useEffect } from "react";
import { createClient } from "@/utils/supabase/client";
import { Contact } from "@/schemas/transactionsSchemas";

export const useFetchContacts = () => {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchContacts = async () => {
    setIsLoading(true);
    const supabase = createClient();
    try {
      const { data, error } = await supabase
        .from("contacts")
        .select("*")
        .order("name", { ascending: true });
      if (error) throw error;
      setContacts(data);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  return { contacts, isLoading, refreshContacts: fetchContacts };
};
