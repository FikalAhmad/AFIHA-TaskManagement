import { Plus } from "lucide-react";
import { Badge } from "../ui/badge";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import SelectItemColor from "@/app/task/_components/SelectItemColor";

const Tags = () => {
  return (
    <>
      <div className="font-semibold text-xs mt-5 mb-2">TAGS</div>
      <div className="flex flex-wrap gap-2">
        <Badge>Tag 1</Badge>
        <Badge>Tag 2</Badge>
        <Badge>Tag 3</Badge>
        <Popover>
          <PopoverTrigger>
            <Badge className="flex gap-1 bg-red-500">
              <Plus size={15} strokeWidth={4} /> Add Tag
            </Badge>
          </PopoverTrigger>
          <PopoverContent side="right" className="w-80">
            <div className="grid gap-4">
              <div className="space-y-2">
                <h4 className="font-medium leading-none">Add New Tag</h4>
                <p className="text-sm text-muted-foreground">
                  Set the dimensions for the layer.
                </p>
              </div>
              <div className="grid gap-2">
                <div className="grid grid-cols-3 items-center gap-4">
                  <Label htmlFor="width">Tag Name</Label>
                  <Input id="width" className="col-span-2 h-8" />
                </div>
                <div className="grid grid-cols-3 items-center gap-4">
                  <Label htmlFor="width">Tag Color</Label>
                  <SelectItemColor />
                </div>
                <Button>Add Tag</Button>
              </div>
            </div>
          </PopoverContent>
        </Popover>
      </div>
    </>
  );
};

export default Tags;
