import { useCallback, useEffect, useState } from "react";

async function sendHttpRequest(url, config) {
  const res = await fetch(url, config);

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "something went wrong");
  }

  return data;
}

export default function useHttp(url, config, initialData) {
  const [data, setData] = useState(initialData);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();

  function clearData(){
    setData(initialData);
  }

  const sendRequest = useCallback(
    async function sendRequest(data) {
       setLoading(true); 
      try {
        const resData = await sendHttpRequest(url,{...config, body: data});
        setData(resData);
      } catch (error) {
        setError(error.message || "something went wrong");
      }
      setLoading(false);
    },
    [url, config],
  );

  useEffect(() => {
    if((config && (config.method==='GET' || !config.method)) || !config){
        sendRequest();
    }
  }, [sendRequest, config]);

  return {
    data,
    loading,
    error,
    sendRequest,
    clearData,
  };
}
