export const copyToClipboard = (
    text: string | number | string[],
    toast: (options: { description: string, duration?: number}) => void) => {
    const strValue = text.toString();
    navigator.clipboard.writeText(strValue)
        .then(() => {
            console.log("Скопировано:", strValue);
            toast({
                description: `Скопировано: ${strValue}`,
                duration: 3000
            });
        })
        .catch((err) => console.error("Ошибка копирования:", err));
};
