import CovidBar from "./CovidBar";
import CovidLine from "./CovidLine";
import CovidStackedBar from "./CovidStackedBar";


const Chart = () => {
  return (
    <div>
      <CovidBar />
      <CovidLine />
      <CovidStackedBar />
    </div>
  );
};

export default Chart;
