import { useMutation } from "@apollo/client";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { DELETE_LEADS } from "../../components/queries/queries";
import { leadDeleted, LeadsState } from "../../components/slices/leadsReducer";
import { ButtonGroup, Dropdown, DropdownButton } from 'react-bootstrap';

const Card: React.FC<{ value: LeadsState, handleView: (id: string) => void }> = ({ value, handleView }) => {
    const [deleteLead] = useMutation(DELETE_LEADS);
    const dispatch = useDispatch();
    const history = useHistory();

    const handleDelete = () => {
        deleteLead({ variables: { id: value.id } }).then(() => {
            dispatch(leadDeleted({ id: value.id }))
        }).catch((e) => {
            console.error("error : ", e);
        });
    }

    return (
        <div className="col-lg-4 col-md-6 col-sm-12 mb-2 mt-4" key={value.id}>
            <div className="card h-100">
                <div className="card-header">
                    <h5 className="card-title">{value.attributes.Name}</h5>
                    <p className="card-text text-muted">{value.attributes.email}</p>
                </div>
                <div className="card-body">
                    <p className="card-text">Source : {value.attributes.Source}</p>
                    <p className="card-text">Status : {value.attributes.Status}</p>
                </div>
                <div className="btn-group" role="group" aria-label="Button group with nested dropdown">
                    <button type="button" className="btn btn-secondary" onClick={() => handleView(value.id)}>View</button>
                    <DropdownButton
                        as={ButtonGroup}
                        title="Options"
                        id="btnGroupDrop1"
                        variant="secondary"
                    >
                        <Dropdown.Item onClick={handleDelete}>Delete</Dropdown.Item>
                        <Dropdown.Item onClick={() => { history.push(`edit/${value.id}`) }}>Edit</Dropdown.Item>
                    </DropdownButton>
                </div>
                <div className="card-footer">
                    <small className="text-muted">{new Date(value.attributes.createdAt).toLocaleString('en-IN')}</small>
                </div>
            </div>
        </div>
    );
};

export default Card;
