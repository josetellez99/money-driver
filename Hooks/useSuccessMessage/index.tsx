import React from 'react'

const useSuccessMessage = () => {

    
    const [showSuccessMessage, setShowSuccessMessage] = React.useState<boolean>(false)
    const [successMessage, setSuccessMessage] = React.useState<string>('')
    
    console.log('useSuccessMessage')
    console.log(showSuccessMessage)
    return {
        showSuccessMessage,
        setShowSuccessMessage,
        successMessage,
        setSuccessMessage
    }
}

export default useSuccessMessage