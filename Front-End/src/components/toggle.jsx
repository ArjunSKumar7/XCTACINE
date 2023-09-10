import { Switch } from "@material-tailwind/react";
 
export function ToggleButton() {
  return (
    <div className="flex w-max gap-4">
      <Switch color="blue" defaultChecked />
      
    </div>
  );
}