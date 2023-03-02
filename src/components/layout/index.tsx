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
          <div className="p-3">{children}</div>
        </div>
      </div>
      {/* <header>
        <UnauthenticatedNav />
      </header>
      <main>
        <div>
          <>{children}</>
        </div>
      </main> */}
    </>
  );
}
