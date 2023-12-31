import {Oval} from "react-loader-spinner";


const LoaderForm=() =>{


    return (
            <Oval
                height={'1.2rem'}
                width={'1.2rem'}
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