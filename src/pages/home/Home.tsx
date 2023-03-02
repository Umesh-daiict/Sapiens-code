import { useQuery } from "@apollo/client";
import { useCallback, useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { GET_LEADS } from "../../components/queries/queries";
import { loadLeads } from "../../components/slices/leadsReducer";
// import CardList from "../dashboard/CardList";
import Table from "react-bootstrap/Table";

import TableList from "../dashboard/TableList";
import ViewForm from "../forms/View";

export default function Home() {
  const dispatch = useDispatch();
  const [initialDataLoaded, setInitialDataLoaded] = useState(false);

  const { loading, error, data } = useQuery(GET_LEADS);

  const handleResponse = useCallback(
    (response) => {
      dispatch(loadLeads(response.leads.data));
    },
    [dispatch]
  );
  const [id, setId] = useState(null);

  useEffect(() => {
    if (data && !initialDataLoaded) {
      handleResponse(data);
      setInitialDataLoaded(true);
    }
  }, [data, handleResponse, initialDataLoaded]);

  if (loading && !initialDataLoaded) {
    return <code>Loading...</code>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  const showModel = (id) => {
    setId(id);
  };

  return (
    <>
      <div className="table-responsive">
        <Table responsive className="table table-hover w-75 mx-auto my-3">
          <thead>
            <tr>
              <th>Id</th>
              <th>Lead Date</th>
              <th>Name</th>
              <th>Email</th>
              <th>Source</th>
              <th>Last Updated</th>
              <th>Status</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <TableList showModel={showModel} />
          </tbody>
        </Table>
      </div>

      <Modal
        show={id !== null}
        onHide={() => setId(null)}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Modal title</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {id && <ViewForm id={id} handelClose={() => setId(null)} />}
        </Modal.Body>
      </Modal>
    </>
  );
}
