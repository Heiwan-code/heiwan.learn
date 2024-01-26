interface ICodeLine {
    slug: string,
    elementQ: string,
    property: string,
    prefix: string,
    desiredVal: string | string[],
    startValue: string,
    suffix: string,
    suggestions?: ISuggestion[],
    clearPrev?: boolean,
    cancels?: string,
    indicator?: boolean
}