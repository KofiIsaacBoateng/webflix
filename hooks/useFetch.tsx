import { useState } from "react";

const useFetch = (fetch: any) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [result, setResult] = useState(null);

  try {
    setError(false);
    setLoading(true);
    fetch()
      .then((res: any) => res.json())
      .then((result: any) => setResult(result));
    console.log("try block");
  } catch (error) {
    console.log(error);
  } finally {
    setLoading(false);
  }

  return { loading, error, result };
};

export default useFetch;
