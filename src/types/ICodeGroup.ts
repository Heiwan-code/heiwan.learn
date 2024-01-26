interface ICodeGroup {
    hint: string,
    lines: {
        [key: string]: ICodeLine[]
    }
}