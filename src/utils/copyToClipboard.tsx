export const copyToClipboard = (
    text: string | number | string[],
    toast: (options: { done: boolean, description: string, duration?: number}) => void) => {
    const strValue = text.toString();
    navigator.clipboard.writeText(strValue)
        .then(() => {
            console.log("Скопировано:", strValue);
            toast({
                done: true,
                description: `Скопировано: ${strValue}`,
                duration: 3000
            });
        })
        .catch((err) => console.error("Ошибка копирования:", err));
};
