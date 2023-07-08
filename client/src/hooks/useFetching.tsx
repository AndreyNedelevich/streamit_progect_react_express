

import { useState } from "react";
import {AxiosError} from "axios";

type FetchingFunction = (...args: any[]) => Promise<void>;

type FetchingResult = [
    FetchingFunction,
    boolean,
    string
];

export const useFetching = (callback: FetchingFunction): FetchingResult => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>("");

    const fetching: FetchingFunction = async (...args) => {
        try {
            setIsLoading(true);
            await callback(...args);
        } catch (e) {
            const err = e as AxiosError
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    return [fetching, isLoading, error];
};