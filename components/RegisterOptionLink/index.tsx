import Link from "next/link";

interface RegisterOptionLinkProps {
    buttonData: ButtonData
    setPopUpState: React.Dispatch<React.SetStateAction<boolean>>
}

const RegisterOptionLink: React.FC<RegisterOptionLinkProps> = ({buttonData, setPopUpState}) => {

    const handleEvent = (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
        setPopUpState(false)
    }

    return (
    <>
        <Link  
            href={buttonData.href!} 
            onClick={handleEvent} 
            className="flex items-center justify-center w-full h-[36px] bg-mainGray rounded-md text-white">
            {buttonData.title}
        </Link>
    </>
    );
};

export default RegisterOptionLink