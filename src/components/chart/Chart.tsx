import { useCallback } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { useSelector } from "react-redux";
import { RootState } from "../../reducer";
import moment from "moment";
import { Skeleton } from "@chakra-ui/react";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: "top" as const,
    },
  },
};

export function Chart({ unit }: { unit: string }) {
  const state = useSelector((state: RootState) => state.weather);
  const convertTemp = useCallback(
    (temp: number) => {
      if (unit === "celsius") {
        return (temp - 273.15).toFixed(2);
      } else {
        return (((temp - 273.15) * 9) / 5 + 32).toFixed(2);
      }
    },
    [unit]
  );
  const data = {
    labels: state.data?.list.map(({ date }: { date: string }) =>
      moment(date).format("dddd DD/MM/YYYY")
    ),
    datasets: [
      {
        label: "Température en " + unit.toUpperCase(),
        data: state.data?.list.map((el: any) =>
          convertTemp(el.timestamps[0]?.main?.temp)
        ),
        backgroundColor: "rgba(255,255,255,0.5)",
      },
    ],
  };

  if (state.isLoading) {
    return (
      <Skeleton
        rounded={"0.8rem"}
        w="full"
        h="16"
        maxW={"md"}
        my="8"
        startColor="blackAlpha.100"
        endColor="blackAlpha.500"
      />
    );
  }

  return <Bar options={options} data={data} height="250px" width={"50px"} />;
}
