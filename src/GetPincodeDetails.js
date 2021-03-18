import { useState, useEffect } from 'react';
import useFetch from "./useFetch";

const GetPincodeDetails = (pincode) => {
    const [data, setData] = useState(null);
    const [isPending, setIsPending] = useState(true);
    const [error, setError] = useState(null);

    const { data: dataReceived, error: newError, isPending: newIsPending } = useFetch('http://localhost:9000/pincode/' + pincode);
    setData(dataReceived);
    setIsPending(newIsPending);
    setError(newError);
    console.log(data);
    return { data, isPending, error };
}

export default GetPincodeDetails;
