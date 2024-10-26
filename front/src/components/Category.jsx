export const Categories = ({ name, icon }) => {
  return (
    <main className="flex gap-4">
      <div className="flex px-2 gap-2 ">
        <input type="radio" value={icon} id="" />
        <div>{name}</div>
      </div>
    </main>
  );
};
