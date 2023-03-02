import React, { FC } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store/LeadStore";
import TableItem from "./TableItem";

const TableList: FC<{ showModel: (id: string) => void }> = ({ showModel }) => {
  const data = useSelector((state: RootState) => state.leads.data);

  return (
    <>
      {data.map((value) => {
        return <TableItem value={value} showModel={showModel} key={value.id} />;
      })}
    </>
  );
};
export default TableList;
