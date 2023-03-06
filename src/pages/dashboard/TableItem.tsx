import { useMutation } from "@apollo/client";
import { useMemo } from "react";
import { DropdownButton, Dropdown } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { DELETE_LEADS } from "../../components/queries/queries";
import { leadDeleted, LeadsState } from "../../components/slices/leadsReducer";
const TableItem: React.FC<{
  value: LeadsState;
  showModel: (id: string) => void;
}> = ({ value, showModel }) => {
  const [deleteLead] = useMutation(DELETE_LEADS);
  const dispatch = useDispatch();
  const history = useHistory();

  const handleDelete = () => {
    deleteLead({ variables: { id: value.id } })
      .then(() => {
        dispatch(leadDeleted({ id: value.id }));
      })
      .catch((e) => {
        console.log("error : ", e);
      });
  };
  const width = useMemo(() => (window.innerWidth > 0) ? window.innerWidth : window.screen.width, [window.innerWidth, window.screen.width])
  console.log("widt", width)
  return (
    <tr>
      <td>{value.id}</td>
      <td className="d-none d-md-table-cell" >{new Date(value.attributes.createdAt).toLocaleString("en-IN")}</td>
      <td className="d-none d-md-table-cell" >{value.attributes.Name}</td>
      <td>{value.attributes.email}</td>
      <td className="d-none d-md-table-cell" >{value.attributes.Source}</td>
      <td className="d-none d-md-table-cell" >{new Date(value.attributes.updatedAt).toLocaleString("en-IN")}</td>
      <td className="d-none d-md-table-cell" >{value.attributes.Status}</td>
      <td>
        <DropdownButton
          variant={"light"}
          id="dropdown-basic-button"
          title={width > 700 ? "More Options" : ""}
        >
          <Dropdown.Item
            onClick={(e) => {
              history.push(`edit/${value.id}`);
            }}
          >
            Edit
          </Dropdown.Item>
          <Dropdown.Item onClick={() => showModel(value.id)}>
            View
          </Dropdown.Item>
          <Dropdown.Item
            onClick={() => {
              handleDelete();
            }}
          >
            Delete
          </Dropdown.Item>
        </DropdownButton>
      </td>
    </tr>
  );
};
export default TableItem;
