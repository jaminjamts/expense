import { listdatas } from "@/datas/datas";
import { ListItem } from "../ListItem";

export const RightSide = () => {
  return (
    <main className="w-full flex flex-col gap-4 p-4">
      <div className="flex justify-between">
        <div className="flex gap-2">
          <button>prev</button>
          <h2>Last 30 Days</h2>
          <button>next</button>
        </div>
        <div>
          <select name="" id="" defaultValue={"new"} className="p-4 rounded-xl">
            <option value="new">Newest first</option>
            <option value="old">Oldest first</option>
          </select>
        </div>
      </div>

      <div className="flex flex-col gap-3">
        <h3>Today</h3>
        {listdatas.map((data, index) => {
          return (
            <div key={index}>
              <ListItem data={data} />
            </div>
          );
        })}
      </div>

      <div>
        <h3>Yesterday</h3>
        <div className="flex flex-col gap-2">
          {listdatas.map((data, index) => {
            return (
              <div key={index}>
                <ListItem data={data} />
              </div>
            );
          })}
        </div>
      </div>
    </main>
  );
};
