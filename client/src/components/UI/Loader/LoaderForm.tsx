import {Oval} from "react-loader-spinner";


import  './Loader.css'

const LoaderForm=() =>{


    return (
            <Oval
                height={25}
                width={25}
                color="#FFFFFF"
                wrapperStyle={{}}
                wrapperClass=""
                visible={true}
                ariaLabel='oval-loading'
                secondaryColor="#FFFFFF"
                strokeWidth={5}
                strokeWidthSecondary={5}
            />
    );
}

export { LoaderForm}