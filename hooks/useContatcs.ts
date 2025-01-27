import { createClient } from "@/utils/supabase/client";
import { useCallback, useEffect, useState } from "react";

export const useContacts = () => {
  const [contacts, setContacts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const supabase = createClient();

  const fetchContacts = useCallback(async () => {
    setIsLoading(true);
    try {
      const { data } = await supabase.from("contacts").select("*");
      setContacts(data);
    } catch (error) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchContacts();
  }, []);

  return { contacts, isLoading, error, refetch: fetchContacts };
};
