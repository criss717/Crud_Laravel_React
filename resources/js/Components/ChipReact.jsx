import { Chip } from "@material-tailwind/react";
 
export default function ChipReact() {
  return (
    <div className="flex flex-col gap-2 text-end">     
      <Chip className="hover:bg-blue-gray-400 hover:text-black" variant="gradient" value="Kg parcela Abono => 555" />
      <Chip  className="hover:bg-blue-gray-400 hover:text-black"variant="gradient" value="Kg/ha Abono => 555" />
      <Chip className="hover:bg-blue-gray-400 hover:text-black" variant="gradient" value="Kg planta => 555" />
      
    </div>
  );
}