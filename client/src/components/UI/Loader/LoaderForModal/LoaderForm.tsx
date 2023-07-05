import {Oval} from "react-loader-spinner";


const LoaderForm=() =>{


    return (
            <Oval
                height={20}
                width={20}
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