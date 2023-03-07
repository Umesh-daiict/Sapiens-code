import { useState } from "react";
import Sidebar from "./SideNav";
import { UnauthenticatedNav } from "./top";

export default function Layout({ children }: any) {
  const [isVisible, setIsVisible] = useState(false);

  const toggleSidebar = () => {
    setIsVisible(!isVisible);
  };
  return (
    <>
      <div className="d-flex">
        <Sidebar isVisible={isVisible} />
        <div className="flex-grow-1">
          <UnauthenticatedNav toggleSidebar={toggleSidebar} />
          <div className="p-md-3 p-sm-2" onClick={() => setIsVisible(false)}>
            {children}
          </div>
        </div>
      </div>
    </>
  );
}
