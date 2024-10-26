export const RecordPopup = () => {
  return (
    <div className="absolute top-20 left-0 flex-col w-screen h-screen flex items-center justify-center ">
      <div className="w-1/2 h-1/2 bg-cyan-500 p-4 rounded-2xl max-w-96">
        <h3 className="border-b">Add product</h3>
        <div className="flex flex-col gap-2 p-2  ">
          <input className="border" placeholder="₮ 000.00" type="text" />
          <input className="border" placeholder="" type="" />
          <input className="border" placeholder="" type="date" />
          <input className="border" placeholder="" type="text" />
          <input className="border" placeholder="" type="text" />
          <input className="border" placeholder="" type="textarea" />
        </div>
      </div>
    </div>
  );
};
