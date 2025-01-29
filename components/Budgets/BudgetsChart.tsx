"use client";
import { Budget } from "@/schemas/budgetsSchema";
import { Transaction } from "@/schemas/transactionsSchemas";
import { getTotalSpent } from "@/utils/getTotalSpent";
import { useEffect, useState } from "react";
import { Cell, Label, Pie, PieChart, Tooltip, TooltipProps } from "recharts";

type Props = {
  viewBox?: {
    x?: number;
    y?: number;
    width?: number;
    height?: number;
    cx?: number;
    cy?: number;
  };
};

export default function DonutChart({
  budgetsData,
  transactionsData,
}: {
  budgetsData: Budget[];
  transactionsData: Transaction[];
}) {
  const budgetCategories = new Set(budgetsData.map((b) => b.category));

  const currentDate = new Date();
  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();
  const totalSpent = getTotalSpent({
    transactionsData,
    budgetCategories,
    currentMonth,
    currentYear,
  });

  const [isClient, setIsClient] = useState(false);

  const totalValue = budgetsData.reduce(
    (sum: number, entry: Budget) => sum + entry.maximum,
    0,
  );

  const pieData = budgetsData.map((budget) => ({
    name: budget.category,
    value: budget.maximum,
  }));

  useEffect(() => {
    setIsClient(true);
  }, []);

  const CustomTooltip = ({ active, payload }: TooltipProps<number, string>) => {
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

  const CenterLabel = (props: Props) => {
    const { cx = 0, cy = 0 } = props.viewBox || {};

    return (
      <text
        x={cx}
        y={cy}
        textAnchor="middle"
        dominantBaseline="middle"
        className="animate-fade-in opacity-0 delay-1000"
      >
        <tspan
          x={cx}
          dy="-0.5em"
          className="h2 font-bold"
          fill={totalSpent > totalValue ? "#C94736" : "#201f24"}
        >
          ${totalSpent.toLocaleString()}
        </tspan>
        <tspan x={cx} dy="1.8em" className="text-small" fill="#696868">
          of ${totalValue.toLocaleString()} limit
        </tspan>
      </text>
    );
  };

  if (!isClient) {
    return (
      <div className="my-lg flex h-[240px] w-[240px] items-center justify-center"></div>
    );
  }

  if (!budgetsData.length) {
    return (
      <div className="text-small-bold mx-auto my-lg flex h-[240px] w-[240px] items-center justify-center rounded-full shadow-lg">
        <p>No current budgets, add some!</p>
      </div>
    );
  }

  return (
    <div className="my-lg flex items-center justify-center">
      <PieChart
        width={240}
        height={240}
        aria-label="Donut chart showing budget distribution"
      >
        <Pie
          data={pieData}
          cx="50%"
          cy="50%"
          innerRadius={76}
          outerRadius={120}
          fill="#8884d8"
          paddingAngle={2}
          dataKey="value"
          isAnimationActive={isClient}
          animationDuration={1500}
          animationEasing="ease-in-out"
          animationBegin={0}
        >
          {budgetsData.map((budget) => (
            <Cell
              key={`cell-${budget.category}`}
              fill={budget.theme}
              className="border-0 hover:brightness-110"
            />
          ))}
          <Label content={CenterLabel} />
        </Pie>
        <Tooltip content={CustomTooltip} offset={10} />
      </PieChart>
    </div>
  );
}
