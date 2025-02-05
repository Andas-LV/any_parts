import { z } from "zod";

export const renderError = (error: z.ZodError | string | null, field?: string) => {
    if (!error) return null;

    if (typeof error === "string") {
        return <p style={{color: 'red', fontSize: '14px'}}>{error}</p>;
    }

    if (field) {
        const issue = error.issues.find((issue) => issue.path[0] === field);
        return issue ? <p style={{ color: 'red', fontSize: '14px' }}>{issue.message}</p> : null;
    }

    return null;
};

