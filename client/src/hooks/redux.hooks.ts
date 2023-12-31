import {useDispatch,useSelector,TypedUseSelectorHook} from "react-redux";


import {AppDispatch,RootState} from "../redux";




const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
const useAppDispatch = () => useDispatch<AppDispatch>()


export {
    useAppDispatch,
    useAppSelector
}