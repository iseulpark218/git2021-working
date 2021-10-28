import { ApexOptions } from "apexcharts";
import axios from "axios";
import { useEffect, useState } from "react";
import Chart from "react-apexcharts";

/*
	private String stdDay; // 수정일시분초
	private String gubun; // 시도명(한글)
	private int overFlowCnt; // 해외유입 수
 	private int localOccCnt; // 지역발생 수
	private int incDec; // 전일대비 증감수
	private int isolIngCnt; // 격리중 환자수
	private int isolClearCnt; // 격리 해제 수
	private int deathCnt; // 사망자 수
  private int defCnt; // 확진자 수
*/

const CovidBar = () => {
  const [chartData, setChartData] = useState<{
    options: ApexOptions;
    series: {
      name: string;
      data: number[];
    }[];
  }>();

  const getData = async () => {
    const result = await axios.get<
      {
        stdDay: string; // 수정일시분초
        gubun: string; // 시도명(한글)
        overFlowCnt: number; // 해외유입 수
        localOccCnt: number; // 지역발생 수
      }[]
    >(`http://localhost:8080/opendata/covid/gubun/current`);

    const data = result.data;

    // 차트의 옵션들, x축 문자열
    const options: ApexOptions = {
      title: {
        text: `코로나바이러스감염증_시도발생_현황 (${result.data[0].stdDay})`,
      },
      xaxis: {
        // 배열 -> 배열, 요소의 개수가 동일함, 요소의 형식은 다름
        // map함수를 사용함
        // ["강남구", ... , "중랑구"]
        categories: data.map((item) => item.gubun),
      },
      fill: {
        // colors: ["#D9534F", '#1A73E8', '#B32824' ..., "#D9534F"]
        // colors: [첫번째 시리즈값25개, 두번째시리즈값25개]
        colors: [
          ({ value, seriesIndex }: { value: number; seriesIndex: number }) => {
            // seriesIndex: 0, 해외유입
            // seriesIndex: 1, 국내발생
            // console.log(value);
            // console.log(seriesIndex);

            let color = "";

            /*
Blue : rgb(0, 122, 255)
Green : rgb(76, 217, 100)
Yellow : rgb(255, 204, 0)
Orange : rgb(255, 149, 0)
Red : rgb(255, 59, 48)
moreRed : rgb(255, 43, 31)
10/30/100/300/500
Teal Blue : rgb(90, 200, 250)
Blue : rgb(0, 122, 255)
Purple : rgb(88, 86, 214)
Pink : rgb(255, 45, 85)
*/

            if (seriesIndex === 0) {
              // 해외유입일 때
              if (value <= 10) color = "rgb(0, 122, 255)";
              else if (value > 10 && value <= 30) color = "rgb(76, 217, 100)";
              else if (value > 30 && value <= 100) color = "rgb(255, 204, 0)";
              else if (value > 100 && value <= 300) color = "rgb(255, 149, 0)";
              else if (value > 300 && value <= 500) color = "rgb(255, 59, 48)";
              else color = "rgb(255, 43, 31)";
            } else {
              // 국내발생일 때
              if (value <= 10) color = "rgb(0, 122, 255)";
              else if (value > 10 && value <= 30) color = "rgb(76, 217, 100)";
              else if (value > 30 && value <= 100) color = "rgb(255, 204, 0)";
              else if (value > 100 && value <= 300) color = "rgb(255, 149, 0)";
              else if (value > 300 && value <= 500) color = "rgb(255, 59, 48)";
              else color = "rgb(255, 43, 31)";
            }
            return color;
          },
        ],
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
        <Chart
          options={chartData?.options}
          series={chartData?.series}
          type="bar"
          width="1000"
          height="400"
        />
      )}
    </div>
  );
};

export default CovidBar;
