import React from 'react'

interface SubmitButtonProps {
    title: string;
    buttonType?: boolean;
    buttonStyle?: 'confirm' | 'cancel';
    onClick?: () => void;
    desactive?: boolean;
}

const SubmitButton: React.FC<SubmitButtonProps> = ({title, buttonType, buttonStyle, onClick, desactive}) => {

    const conditionalBg = buttonStyle === 'confirm' ? 'bg-greenYellow' : 'bg-red-400'


    return (
        <>
            { !buttonType &&
                <input 
                    type="submit"
                    value={title}
                    className="w-full my-2 h-[36px] rounded bg-greenYellow text-center font-bold text-black cursor-pointer"
                />

            }
            { buttonType && !desactive && (
                <button 
                    onClick={onClick}
                    className={`w-full my-2 h-[36px] rounded ${conditionalBg} font-bold text-black cursor-pointer`}
                >
                    {title}
                </button>
            )}
            { buttonType && desactive && (
                <button 
                    onClick={onClick}
                    className={`w-full my-2 h-[36px] rounded ${conditionalBg} font-bold text-black opacity-50 cursor-not-allowed`}
                >
                    {title}
                </button>
            )}
        </>
    )
}

export default SubmitButton