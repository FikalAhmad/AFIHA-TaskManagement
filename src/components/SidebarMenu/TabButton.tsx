import Link from "next/link";
import { Button } from "../ui/button";
import { ReactNode } from "react";

type TabButtonType = {
  tabname: string;
  nametype: string;
  icon: ReactNode;
  isActive: string;
  onClick: () => void;
};

const TabButton = ({
  tabname,
  nametype,
  icon,
  isActive,
  onClick,
}: TabButtonType) => {
  return (
    <Button
      className={`${
        isActive === nametype
          ? "bg-[#EBEBEB] text-primary"
          : "bg-accent text-accent-foreground"
      } justify-normal gap-2 hover:bg-[#EBEBEB]`}
      asChild
      onClick={onClick}
    >
      <Link href={nametype}>
        {icon}
        {tabname.charAt(0).toUpperCase() + tabname.substring(1)}
      </Link>
    </Button>
  );
};

export default TabButton;
