import { useState } from "react";
import {AxiosError} from "axios";
import {toast} from "react-toastify";

type FetchingFunction = (...args: any[]) => Promise<void>;

type FetchingResult = [
    FetchingFunction,
    boolean,
    string
];

export const useFetching = (callback: FetchingFunction): FetchingResult => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>("");

    const fetching: FetchingFunction = async (args,showToasty:boolean=true) => {
        setError('')
        try {
            console.log(args);
            setIsLoading(true);
            await callback(args);
        } catch (e) {
            const err = e as AxiosError
            if(showToasty){
                toast.error(`${err.message}!`, {
                    autoClose: 2000,
                    theme: "light",
                });
            }

            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    return [fetching, isLoading, error];
};