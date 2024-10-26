export const RecordList = () => {
  const data = {
    iconId: "1",
    category: "Lending & Renting",
    hour: "3",
    amount: "1500",
  };
  return (
    <main className=" flex w-full justify-between items-center  bg-base-100 shadow-xl rounded-2xl bg-gray-500 p-4 text-slate-200">
      <div className="flex gap-4">
        <p className="p-2 text-3xl">{data.iconId}</p>
        <div className="">
          <p>{data.category}</p>
          <p>{data.hour} hours ago</p>
        </div>
      </div>
      <p className="text-3xl">{data.amount}$</p>
    </main>
  );
};
