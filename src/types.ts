export interface NumberButtonProps extends Numbers{
    handleNumbers: (value: string) => void;
};

export interface OperatorButtonProps extends Operators {
    handleOperators: (operator: string) => void;
};

export interface Numbers {
    id: string;
    num: string;
}

export interface Operators {
    id: string;
    operator: string;
}