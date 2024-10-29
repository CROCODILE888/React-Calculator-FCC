import { NumberButtonProps, OperatorButtonProps } from "./types"

export const NumberButton = ({ id, num, handleNumbers }: NumberButtonProps) => {
    return (
        <button
            id={id}
            onClick={() => handleNumbers(num)}>{num}</button>
    )
}

export const OperatorButton = ({ id, operator, handleOperators }: OperatorButtonProps) => {
    return (
        <button
            id={id}
            onClick={() => handleOperators(operator)}>{operator}</button>
    )
}
