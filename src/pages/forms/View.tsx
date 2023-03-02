import { FC } from "react";
import { Form } from "@rjsf/bootstrap-4";
import { RJSFSchema } from "@rjsf/utils";
// import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../store/LeadStore";

const uiSchema = {
    stringFormats: {
        status: {
            "ui:disabled": true,
        },
        source: {
            "ui:disabled": true,
        },
    },
    leadDetails: {
        name: {
            "ui:autofocus": true,
            "ui:emptyValue": "",
            "ui:autocomplete": "family-name",
        },
        email: {
            "ui:options": {
                inputType: "email",

            },
        },
        modifiedDate: {
            "ui:disabled": true,
        },
        createdDate: {
            "ui:disabled": true,
        },

        textarea: {
            "ui:widget": "textarea",
            "ui:options": {
                rows: 5,
            },
        },
        "ui:options": {
            classNames: "btn btn-secondary",
        },
    },
};

const ViewForm: FC<{ id: string, handelClose: () => void }> = ({ id, handelClose }) => {
    const user = useSelector((state: RootState) => state.leads.data.find((user) => user.id === id));

    if (!user) {
        return <p className="alert alert-info" role="alert" >No User</p>
    }

    const schema: RJSFSchema = {
        definitions: {
            statusEnum: {
                type: "string",
                enum: ["", "New", "Enrolled", "Interested", 'Follow_up', 'Negative'],
            },
            sourceEnum: {
                type: "string",
                enum: ["", "website", "word_of_mouth", "my_app", "google"],
            },
        },
        type: "object",
        "ui:options": {
            submitButtonOptions: {
                norender: false,
                submitText: "Close",
            },
        },
        properties: {
            stringFormats: {
                type: "object",
                title: "Lead",
                properties: {
                    status: {
                        $ref: "#/definitions/statusEnum",
                        title: "Status",
                        default: user.attributes.Status,
                    },
                    source: {
                        $ref: "#/definitions/sourceEnum",
                        title: "Source",
                        default: user.attributes.Source,
                    },
                },
            },
            leadDetails: {
                type: "object",
                title: "Lead Details",
                properties: {
                    name: {
                        type: "string",
                        title: "Name",
                        default: user.attributes.Name,
                    },
                    email: {
                        type: "string",
                        title: "Email",
                        format: "email",
                        default: user.attributes.email,
                    },
                    textarea: {
                        type: "string",
                        title: "Notes",
                        default: user.attributes.Notes,
                    },
                    modifiedDate: {
                        type: "string",
                        format: "date-time",
                        title: "Modified Date",
                        default: user.attributes.updatedAt,
                    }, createdDate: {
                        type: "string",
                        format: "date-time",
                        title: "created Date",
                        default: user.attributes.createdAt,
                    },

                },
            },
        },
    };

    return (
        <div
            className=" "
            id="exampleModalCenter"
            // tabIndex="-1"
            role="dialog"
            aria-labelledby="exampleModalCenterTitle"
            aria-hidden="true"
        >
            <div className="modal-dialog modal-dialog-centered" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLongTitle">
                            View Content
                        </h5>
                    </div>
                    <div className="modal-body">
                        <Form
                            schema={schema}
                            uiSchema={uiSchema}
                            readonly
                        >
                            <button onClick={handelClose} type="submit" className="btn btn-secondary">
                                Close
                            </button>
                        </Form>
                    </div>

                </div>
            </div>
        </div>
    );
};
export default ViewForm;
