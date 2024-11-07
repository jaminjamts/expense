import { Icons } from "@/constants/Constants";

export const ListItem = ({ data }) => {
  if (data.transaction_type === "EXP") {
    return (
      <main className="flex w-full justify-between items-center bg-base-100 shadow-xl rounded-2xl bg-[#F54949] px-5 text-slate-200">
        <div className="flex gap-4">
          <p className="p-2 size-10 flex items-center justify-center">
            {Icons[2].icon}
          </p>
          <div>
            <p className="text-xl">{data.name}</p>
            <p className="text-sm">{data.hour} hours ago</p>
          </div>
        </div>
        <p className="text-base">-{data.amount}$</p>
      </main>
    );
  } else {
    return (
      <main className="flex w-full justify-between items-center bg-base-100 shadow-xl rounded-2xl bg-[#23E01F] px-5 text-slate-200">
        <div className="flex gap-4">
          <p className="p-2 size-10 flex items-center justify-center">
            {Icons[0].icon}
          </p>
          <div>
            <p className="text-xl">{data.name}</p>
            <p className="text-sm">{data.hour} hours ago</p>
          </div>
        </div>
        <p className="text-base">{data.amount}$</p>
      </main>
    );
  }
};
