import {
  SelectItem,
  Select,
  SelectContent,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const SelectItemColor = () => {
  return (
    <Select>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select List" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="red">Red</SelectItem>
        <SelectItem value="blue">Blue</SelectItem>
        <SelectItem value="green">Green</SelectItem>
        <SelectItem value="yellow">Yellow</SelectItem>
      </SelectContent>
    </Select>
  );
};

export default SelectItemColor;
