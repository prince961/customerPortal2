import { useState, useEffect } from "react";
import { useHttpClient } from "../hooks/useHttpClient";

const GetPincodeDetails = (pincode) => {
  const [data, setData] = useState(null);
  const [isPending, setIsPending] = useState(true);
  const [error, setError] = useState(null);

  //   const {
  // data: dataReceived,
  // error: newError,
  // isPending: newIsPending,
  //   } = useFetch("http://localhost:9000/pincode/" + pincode);
  //   setData(dataReceived);
  //   setIsPending(newIsPending);
  //   setError(newError);
  //   console.log(data);
  //   return { data, isPending, error };
  //   return {'Nitin'}
};

export default GetPincodeDetails;
