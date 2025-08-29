import { useState } from "react";
import {
    Bar,
    BarChart,
    CartesianGrid,
    Legend,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
    LegendProps,
} from "recharts";

const data = [
    { time: "12:00pm", "Jun 24": 26, "Jun 25": 0 },
    { time: "01:00pm", "Jun 24": 0, "Jun 25": 18 },
    { time: "02:00pm", "Jun 24": 25, "Jun 25": 0 },
    { time: "03:00pm", "Jun 24": 26, "Jun 25": 0 },
    { time: "04:00pm", "Jun 24": 0, "Jun 25": 34 },
    { time: "05:00pm", "Jun 24": 0, "Jun 25": 25 },
    { time: "06:00pm", "Jun 24": 28, "Jun 25": 0 },
];

const COLORS = {
    "Jun 24": "#999999",
    "Jun 25": "#F4C7C3",
};

// Custom Legend renderer
const CustomLegend: any = (props: LegendProps): any => {
    const { payload }: any = props;
    if (!payload) return null;

    return (
        <ul
            style={{
                color: "white",
                listStyle: "none",
                padding: 0,
                margin: 0,
                display: "flex",
                gap: 20,
            }}
        >
            {payload.map((entry: any, index: any) => (
                <li
                    key={`legend-item-${index}`}
                    style={{ display: "flex", alignItems: "center", gap: 6 }}
                >
                    <div
                        style={{
                            width: 12,
                            height: 12,
                            backgroundColor: entry.color ?? "gray",
                            borderRadius: 2,
                        }}
                    />
                    <span>{entry.value}</span>
                </li>
            ))}
        </ul>
    );
};

export default function OrdersBarChart() {
    const [activeDate, setActiveDate] = useState("Jun 25");

    return (
        <div className=" p-6 rounded-lg text-white w-full max-w-4xl mx-auto">
            <div className="flex justify-between mb-4">
                <div>
                    <div className="font-semibold">Total Users</div>
                    <div>645 Orders on Jun 24</div>
                    <div>472 Orders on Jun 25</div>
                </div>
                <div>
                    <select
                        className="text-black p-1 rounded"
                        value={activeDate}
                        onChange={(e) => setActiveDate(e.target.value)}
                    >
                        <option value="Jun 24">Jun 24</option>
                        <option value="Jun 25">Jun 25</option>
                    </select>
                </div>
            </div>
            <ResponsiveContainer width="100%" height={300}>
                <BarChart
                    data={data}
                    margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
                    barCategoryGap={2}
                >
                    <CartesianGrid strokeDasharray="3 3" stroke="#444" />
                    <XAxis dataKey="time" tick={{ fill: "white" }} />
                    <YAxis tick={{ fill: "white" }} />
                    <Tooltip
                        cursor={{ fill: "rgba(255, 255, 255, 0.1)" }}
                        content={({ active, payload, label }) => {
                            if (active && payload && payload.length) {
                                const date = payload[0].name;
                                return (
                                    <div className="bg-gray-800 p-2 rounded text-white">
                                        <p>
                                            <strong>{payload[0].value} Orders</strong>
                                        </p>
                                        <p>
                                            {date}, {label}
                                        </p>
                                    </div>
                                );
                            }
                            return null;
                        }}
                    />
                    <Legend content={CustomLegend} />
                    <Bar
                        dataKey="Jun 24"
                        fill={COLORS["Jun 25"]}
                        radius={[5, 5, 0, 0]}
                        isAnimationActive={false}
                        opacity={activeDate === "Jun 24" ? 1 : 0.5}
                        barSize={40}
                    />
                    <Bar
                        dataKey="Jun 25"
                        fill={COLORS["Jun 25"]}
                        radius={[5, 5, 0, 0]}
                        isAnimationActive={false}
                        opacity={activeDate === "Jun 25" ? 1 : 0.5}
                        barSize={40}
                    />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
}
