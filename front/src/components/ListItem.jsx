export const ListItem = ({ data }) => {
  if (data.type === "EXP") {
    return (
      <main className=" flex w-full justify-between items-center  bg-base-100 shadow-xl rounded-2xl bg-[#F54949] px-5 text-slate-200">
        <div className="flex gap-4">
          <p className="p-2 size-10 flex items-center justify-center">
            {data.iconId}
          </p>
          <div className="">
            <p className="text-xl">{data.category}</p>
            <p className="text-sm">{data.hour} hours ago</p>
          </div>
        </div>
        <p className="text-base">-{data.amount}$</p>
      </main>
    );
  } else {
    return (
      <main className=" flex w-full justify-between items-center  bg-base-100 shadow-xl rounded-2xl bg-[#23E01F] px-5 text-slate-200">
        <div className="flex gap-4">
          <p className="p-2 size-10 flex items-center justify-center">
            {data.iconId}
          </p>
          <div className="">
            <p className="text-xl">{data.category}</p>
            <p className="text-sm">{data.hour} hours ago</p>
          </div>
        </div>
        <p className="text-base">{data.amount}$</p>
      </main>
    );
  }
};
