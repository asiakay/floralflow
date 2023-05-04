import { useContext } from "react";
//
import { ChartContext } from "@/contexts/ChartContext";

export function useChart() {
const { data, options } = useContext(ChartContext); // Grab the context from ChartContext

console.log('data', data);
return { data, options }; // Return the data and optionseeeeee
}



//eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee