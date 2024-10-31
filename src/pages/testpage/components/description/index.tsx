import { useState } from 'react'
import './styles.css'

interface OTPInputProps {
    numInputs: number
}

const OTPInput: React.FC<OTPInputProps> = ({ numInputs }) => {
    const [otp, setOtp] = useState<string[]>(Array(numInputs).fill(''))

    const handleChange = (index: number, value: string) => {
        if (!/^\d*$/.test(value)) return

        const newOtp = [...otp]
        newOtp[index] = value.slice(-1)
        setOtp(newOtp)

        if (value && index < numInputs - 1) {
            document.getElementById(`otp-input-${index + 1}`)?.focus()
        } else if (index === numInputs - 1) {
            document.getElementById(`otp-input-${index}`)?.blur()
        }
    }

    const handleKeyDown = (
        index: number,
        event: React.KeyboardEvent<HTMLInputElement>,
    ) => {
        if (event.key === 'Backspace') {
            const newOtp = [...otp]

            if (otp[index]) {
                newOtp[index] = ''
                setOtp(newOtp)
            } else if (index > 0) {
                newOtp[index - 1] = ''
                setOtp(newOtp)
                document.getElementById(`otp-input-${index - 1}`)?.focus()
            }
        }
    }

    const handlePaste = (event: React.ClipboardEvent<HTMLInputElement>) => {
        event.preventDefault()
        const pastedData = event.clipboardData
            .getData('Text')
            .slice(0, numInputs)

        if (/^\d*$/.test(pastedData)) {
            const newOtp = Array(numInputs).fill('')
            for (let i = 0; i < pastedData.length; i++) {
                newOtp[i] = pastedData[i]
            }
            setOtp(newOtp)
        }

        event.currentTarget.blur()
    }

    return (
        <div className="otp-container">
            {Array.from({ length: numInputs }, (_, index) => (
                <input
                    key={index}
                    id={`otp-input-${index}`}
                    type="text"
                    value={otp[index]}
                    onChange={(e) => handleChange(index, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(index, e)}
                    onPaste={handlePaste}
                    maxLength={1}
                    className="otp-input"
                />
            ))}
        </div>
    )
}

const TestDescription = () => {
    return (
        <div>
            <h3>This is test page</h3>
            <div>OTP input</div>
            <OTPInput numInputs={5} />
        </div>
    )
}

export default TestDescription
