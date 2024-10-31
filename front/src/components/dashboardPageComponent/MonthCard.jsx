import { lastmonth } from "@/datas/datas";
import { DecreaseIcon, DotIcon, IncreaseIcon } from "@/icons";

export const MonthCard = ({ data }) => {
  return data.type === "income" ? (
    <main className=" bg-[#EFEFE9] bg-gradient-to-tr from-inherit to-[#c7c7c3] shadow-xl rounded-2xl min-h-56 h-full">
      <div className="flex flex-col justify-between h-full">
        <div className="flex items-center gap-2  border-b border-[#c3c3c3] p-4 pb-0 h-1/4">
          <DotIcon color={"#84CC16"} />
          <h2 className=" text-base font-semibold">Your INCOME</h2>
        </div>
        <div className="flex flex-col gap-4 px-4 py-8 ">
          <div>
            <h1 className="text-4xl font-semibold">{data.total}$</h1>
            <p className="text-[#aaa]">Your INCOME Amount</p>
          </div>
          <div className="flex gap-2">
            <IncreaseIcon />
            {data.percentage}% from LAST month
          </div>
        </div>
      </div>
    </main>
  ) : (
    <main className=" bg-[#EFEFE9] shadow-xl rounded-2xl min-h-56 h-full">
      <div className="flex flex-col justify-between h-full">
        <div className="flex items-center gap-2 border-b border-[#c3c3c3] p-4 pb-0 h-1/4">
          <DotIcon color={"#0166FF"} />

          <h2 className=" text-base font-semibold">Your EXPENCE</h2>
        </div>
        <div className="flex flex-col gap-4 px-4 py-8 ">
          <div>
            <h1 className="text-4xl font-semibold">{data.total}$</h1>
            <p className="text-[#aaa]">Your EXPENCE Amount</p>
          </div>
          <div className="flex gap-2">
            <DecreaseIcon />
            {data.percentage}% from LAST month
          </div>
        </div>
      </div>
    </main>
  );
};
