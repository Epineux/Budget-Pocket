"use client";

import { Card, CardContent } from "@/components/ui/card";
import clsx from "clsx";
import { useEffect, useState } from "react";
import {
  Cell,
  Label,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";


type BudgetItem = {
  name: string;
  maximum: number;
  theme: string;
};

export default function DonutChart({
  budgetsData,
}: {
  budgetsData: BudgetItem[];
}) {
  const pieData = budgetsData.map((budget) => ({
    name: budget.name,
    value: budget.maximum,
  }));
  const totalValue = budgetsData.reduce(
    (sum: number, entry: BudgetItem) => sum + entry.maximum,
    0,
  );

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload?.[0]) {
      const data = payload[0].payload;
      return (
        <div className="rounded-lg bg-white p-3 shadow-lg">
          <p className="text-sm font-medium">{data.name}</p>
          <p className="text-lg font-bold">${data.value.toLocaleString()}</p>
          <p className="text-muted-foreground text-xs">
            {((data.value / totalValue) * 100).toFixed(1)}% of total
          </p>
        </div>
      );
    }
    return null;
  };

  const CenterLabel = ({ viewBox }: any) => {
    const [isVisible, setIsVisible] = useState(false);
    useEffect(() => {
      setTimeout(() => {
        setIsVisible(true);
      }, 1500);
    }, []);

    if (!viewBox?.cx || !viewBox?.cy) return null;

    return (
      <text
        x={viewBox.cx}
        y={viewBox.cy}
        textAnchor="middle"
        dominantBaseline="middle"
        className={clsx("opacity-0 transition-opacity duration-1000 ease-in", {
          "opacity-100": isVisible,
        })}
      >
        <tspan
          x={viewBox.cx}
          dy="-0.5em"
          className="h2 font-bold"
          fill="#201f24"
        >
          $338
        </tspan>
        <tspan x={viewBox.cx} dy="1.8em" className="text-small" fill=" #696868">
          of ${totalValue} limit
        </tspan>
      </text>
    );
  };

  return (
    <Card className="col-span-3 border-none shadow-none">
      <CardContent className="flex justify-center p-0 xl:@[400px]:justify-start">
        <ResponsiveContainer width={240} height={305}>
          <PieChart>
            <Pie
              data={pieData}
              cx="50%"
              cy="55%"
              innerRadius={76}
              outerRadius={120}
              fill="#8884d8"
              paddingAngle={2}
              dataKey="value"
            >
              {budgetsData.map((category) => (
                <Cell
                  key={`cell-${category.name}`}
                  fill={category.theme}
                  className="border-0 hover:brightness-110"
                />
              ))}
              <Label content={CenterLabel} />
            </Pie>
            <Tooltip content={CustomTooltip} offset={10} />
          </PieChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
