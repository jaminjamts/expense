import { Icons } from "@/constants/Constants";
import { format } from "date-fns";

export const ListItem = ({ data }) => {
  if (data.transaction_type === "EXP") {
    return (
      <main className="flex w-full justify-between items-center bg-base-100 shadow-xl rounded-2xl bg-[#F54949] px-5 text-slate-200">
        <div className="flex gap-4 items-center">
          <div
            className={`p-2 size-10 rounded-full flex items-center justify-center bg-[${data.icon_color}]`}
          >
            {Icons.find((icon) => data.category_icon == icon.id).icon}
          </div>
          <div>
            <p className="text-xl">{data.description}</p>
            <p className="text-sm">
              {format(data.updatedat, "yyyy-LL-dd HH:mm ")}
            </p>
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
            {Icons.find((icon) => data.category_icon == icon.id).icon}
          </p>
          <div>
            <p className="text-xl">{data.description}</p>
            <p className="text-sm">
              {format(data.updatedat, "yyyy-LL-dd HH:mm ")}
            </p>
          </div>
        </div>
        <p className="text-base">{data.amount}$</p>
      </main>
    );
  }
};
