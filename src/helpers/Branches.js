import { GiCircuitry, GiElectric, GiFamilyHouse } from "react-icons/gi";
import { IoBuild } from "react-icons/io5";

export const Branches = [
  {
    name: "Mech",
    total_staff: "34",
    total_students: "200",
    total_approved: "20",
    icon: <IoBuild className="text-3xl" />,
  },
  {
    name: "EEE",
    total_staff: "34",
    total_students: "200",
    total_approved: "20",
    icon: <GiElectric className="text-3xl" />,
  },
  {
    name: "ECE",
    total_staff: "34",
    total_students: "200",
    total_approved: "20",
    icon: <GiCircuitry className="text-3xl" />,
  },
  {
    name: "Civil",
    total_staff: "34",
    total_students: "200",
    total_approved: "20",
    icon: <GiFamilyHouse className="text-3xl" />,
  },
];
