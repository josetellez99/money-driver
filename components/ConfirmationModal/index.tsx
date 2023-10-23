import React from 'react';
import PopUpLayer from '@/components/PopupLayer';
import BorderDiv from '@/components/BorderDiv';
import RegularButtonList from '@/components/RegularButtonList';
import RegularButton from '@/components/RegularButton';

interface ConfirmationModalProps {
    message: string;
    buttonsData: ButtonData[]
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({message, buttonsData}) => {

    return (
        <>
            <PopUpLayer>
                <div className='flex justify-center items-center'>
                    <BorderDiv>
                        <div className='flex flex-col justify-center items-center gap-4'>
                            <span>{message}</span>
                            <RegularButtonList>
                                {
                                    buttonsData.map((buttonOption) => {
                                        return (
                                            <RegularButton
                                                key={buttonOption.title}
                                                title={buttonOption.title}
                                                onClick={buttonOption.onClick}
                                            />
                                        )
                                    })
                                }
                            </RegularButtonList>
                        </div>
                    </BorderDiv>
                </div>
            </PopUpLayer>
        </>
    )
}

export default ConfirmationModal