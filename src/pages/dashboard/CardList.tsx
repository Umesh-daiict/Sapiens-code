import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import { useSelector } from "react-redux";
import { RootState } from "../../store/LeadStore";
import ViewForm from "../forms/View";
import Card from "./Card";

const CardList = () => {
    const data = useSelector((state: RootState) => state.leads.data);
    const [id, setId] = useState(null);

    const showModel = (id) => {
        setId(id);
    }
    return (<div className="container">
        <div className="row">
            {data.map((value) => {
                return (
                    <Card value={value} key={value.id} handleView={showModel} />
                );
            })}
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
    </div>
    );

};
export default CardList;