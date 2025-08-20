import { useEffect, useState } from "react";
import type { RecordModel } from "pocketbase";

// const pb = new PocketBase(import.meta.env.VITE_POCKETBASE_URL);

const reportError = ({ message, collection }: { message: string; collection: string }) => {
  console.log(
    `Error occurred while fetching '${collection}' collection.`,
    message,
  );
};

function useCollection({ collection, method }: { collection: string; method: () => Promise<RecordModel | RecordModel[]> }) {
  const [data, setData] = useState<RecordModel | RecordModel[]>([]);
  const [authorized, setAuthorized] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;
    setLoading(true);
    setError(null);

    method()
      .then((records) => {
        if (!isMounted) return;
        setData(records);
        setAuthorized(true);
      })
      .catch((error: unknown) => {
        let message: string;
        let status: number;
        if (error instanceof Error) {
          message = error.message;
          status = error.message.includes("status")
            ? Number(error.message.split("status code ")[1])
            : 0;
          if (status === 403) {
            setAuthorized(false);
            setLoading(false);
            return;
          }
        } else {
          message = String(error);
        }
        reportError({ message, collection });
        setError(message);
      })
      .finally(() => {
        if (isMounted) setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, [collection, method]);

  return { data, authorized, loading, error };
}

export { useCollection };
