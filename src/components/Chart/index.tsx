import { LineChart, Line, ResponsiveContainer } from "recharts";

const data = [
    { value: 60 },
    { value: 55 },
    { value: 50 },
    { value: 53 },
    { value: 49 },
    { value: 48 },
    { value: 50 },
];

export default function SmallChart() {
    return (
        <ResponsiveContainer width="100%" height={30}>
            <LineChart data={data}>
                <Line
                    type="monotone"
                    dataKey="value"
                    stroke="#009E60" // Зеленый цвет
                    strokeWidth={2}
                    dot={false} // Убираем точки
                />
            </LineChart>
        </ResponsiveContainer>
    );
}
