import { HomeIcon, HouseLineIcon, LeapIcon } from "@/icons";

export const Icons = [
  { id: 1, icon: <HomeIcon color={"#c3c3c3"} /> },
  {
    id: 2,
    icon: <HouseLineIcon color={"#c3c3c3"} />,
  },
  { id: 3, icon: <LeapIcon color={"#c3c3c3"} /> },
];

export const Colors = [
  { id: 1, code: "blue", value: "#0166FF" },
  { id: 2, code: "cyan", value: "#01B3FF" },
  { id: 3, code: "green", value: "#41CC00" },
  { id: 4, code: "yellow", value: "#f9D100" },
  { id: 5, code: "orange", value: "#FF7B01" },
  { id: 6, code: "purple", value: "#AE01FF" },
  { id: 7, code: "red", value: "#FF0101" },
];

export const BACKEND_ENDPOINT = process.env.API_URL;
