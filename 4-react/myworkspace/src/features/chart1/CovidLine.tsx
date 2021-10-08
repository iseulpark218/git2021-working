import { ApexOptions } from "apexcharts";
import { useEffect, useRef, useState } from "react";
import Chart from "react-apexcharts";
// import lineData from "./covidLineData";
import barData from "./covidBarData";
import axios from "axios";

const CovidLine = () => {
  const [chartData, setChartData] = useState<{
    options: ApexOptions;
    series: {
      name: string;
      data: number[];
    }[];
  }>();

  const cityRef = useRef<HTMLSelectElement>(null);

  const getData = async () => {
    const result = await axios.get<
      {
      stdDay : string; // 수정일시분초
      gubun : string; // 시도명(한글)
      overFlowCnt : number; // 해외유입 수
      localOccCnt : number; // 지역발생 수
      }[]
    >(
      `http://localhost:8080/opendata/covid/gubun/current/${cityRef.current?.value}`
    );

    const data = result.data;
    // const data = lineData;

    const options: ApexOptions = {
      xaxis: {
        // 배열 -> 배열, 요소의 개수가 동일함, 요소의 형식은 다름
        // map함수를 사용함
        // ["2021-10-05 23:00", ... , "2021-10-06 10:00"]
        categories: data
          .map((item) => item.stdDay)
          .sort()
          .map((item) => item.substr(11, 5)),
      },
    };

    // 실제 값들
    const series = [
      {
        name: "해외유입",
        data: data.map((item) => item.overFlowCnt),
      },
      {
        name: "지역발생",
        data: data.map((item) => item.localOccCnt),
      },
    ];

    setChartData({ options, series });
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div>
      {chartData && (
        <>
          <div
            style={{ width: "1000px" }}
            className="d-flex justify-content-end"
          >
            <select
              className="form-select form-select-sm me-2"
              style={{ width: "110px" }}
              onChange={() => {
                getData();
              }}
              ref={cityRef}
            >
              {barData
                .map((item) => item.gubun)
                .map((city) => (
                  <option key={`sel-${city}`} value={city}>
                    {city}
                  </option>
                ))}
            </select>
          </div>
          <Chart
            options={chartData.options}
            series={chartData.series}
            type="line"
            width="1000"
            height="300"
          />
        </>
      )}
    </div>
  );
};

export default CovidLine;
