import { useEffect, useState } from "react";

interface UseFetch {
  loading: boolean;
  error: Error | null;
  data: [any] | [];
  reset: () => void;
  reFetch: () => any;
}
const useFetch = (fetchFunc: any, autoFetch = true): UseFetch => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState([]);

  const fetch = async () => {
    try {
      setError(null);
      setLoading(true);
      const result = await fetchFunc();
      setData(result);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const reset = () => {
    setLoading(false);
    setError(null);
    setData([]);
  };

  useEffect(() => {
    if (autoFetch) fetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return { loading, error, data, reset, reFetch: () => fetch() };
};

export default useFetch;
