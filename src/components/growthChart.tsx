import { ArrowLeft, ArrowRight } from "lucide-react"; // you can also use any icons
import React from "react";
import {
    Bar,
    BarChart,
    Legend,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis
} from "recharts";

interface GrowthData {
    year: number;
    week: number;
    members: number;
}

const MembershipGrowthChart: React.FC<{ data: GrowthData[], weeksBack: number, setWeeksBack: React.Dispatch<React.SetStateAction<number>> }> = ({ data, weeksBack, setWeeksBack }) => {

    const formattedData = data.map(item => ({
        ...item,
        label: `${item.year}-W${item.week}`,
    }));

    return (
        <div className=" glass rounded-2xl shadow-md text-white my-6">
            <div className="flex flex-col-reverse gap-5 items-center justify-between mb-4">
                <h2 className="text-md md:text-xl font-semibold ">Membership Growth (Weekly)</h2>
                <div className="flex w-full justify-between items-end  space-x-2">
                    <button
                        onClick={() => setWeeksBack(prev => Math.min(prev + 1, 52))}
                        className="p-2 rounded-full bg-gray-200 hover:bg-gray-300 transition"
                    >
                        <ArrowLeft size={18} />
                    </button>
                    <button
                        onClick={() => setWeeksBack(prev => Math.max(prev - 1, 1))}
                        className="p-2 rounded-full bg-gray-200 hover:bg-gray-300 transition"
                    >
                        <ArrowRight size={18} />
                    </button>
                </div>
            </div>

            <div className="h-80 ">
                <ResponsiveContainer width="100%" height="100%" >
                    <BarChart data={formattedData}>
                        <XAxis dataKey="label" />
                        <YAxis allowDecimals={false} />
                        <Tooltip cursor={{ fill: "transparent" }} contentStyle={{
                            backgroundColor: "#1F2937",
                            border: "none",
                            borderRadius: "8px",
                            color: "white"
                        }} />
                        <Legend />
                        <Bar dataKey="members" fill="#F4C7C3" radius={[6, 6, 0, 0]} />
                    </BarChart>
                </ResponsiveContainer>
            </div>

            <p className="text-sm  mt-2 text-center">
                Showing last <span className="font-semibold">{weeksBack}</span> weeks
            </p>
        </div>
    );
};

export default MembershipGrowthChart;
