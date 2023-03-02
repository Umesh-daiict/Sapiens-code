import { useMutation } from "@apollo/client";
import { FC } from "react";
import { CREATE_LEAD } from "../../components/queries/queries";
import { Form } from "@rjsf/bootstrap-4";
import { RJSFSchema } from "@rjsf/utils";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { leadAdded } from "../../components/slices/leadsReducer";

const uiSchema = {
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
    createdDate: {
      "ui:disabled": true,
    },
    textarea: {
      "ui:widget": "textarea",
      "ui:options": {
        rows: 5,
      },
    },
  },
};

const Add: FC = () => {
  const [createLead] = useMutation(CREATE_LEAD);
  const history = useHistory();
  // const id = uuidv4();

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
            default: "New",
          },
          source: {
            $ref: "#/definitions/sourceEnum",
            title: "Source",
            default: "website",
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
            default: "",
          },
          email: {
            type: "string",
            title: "Email",
            format: "email",
            default: "",
          },
          textarea: {
            type: "string",
            title: "Notes",
            default: "",
          },
          createdDate: {
            "type": "string",
            "format": "date-time",
            title: "Create Date",
            "default": new Date().toISOString().toString()
          },
        },
      },
    },
  };

  const dispatch = useDispatch();

  const handleSubmit = (form) => {
    const dateObj = new Date(form.leadDetails.createdDate);
    const timeStr = dateObj.toTimeString().slice(0, 8);
    const dateStr = dateObj.toISOString().slice(0, 10);
    createLead({
      variables: {
        Name: form.leadDetails.name,
        email: form.leadDetails.email,
        Notes: form.leadDetails.textarea,
        Source: form.stringFormats.source,
        Status: form.stringFormats.status,
        Date: dateStr,
        Time: timeStr
      },
    }).then(({ data }) => {

      dispatch(leadAdded({ lead: data.createLead.data }))
      history.push("/")

    }).catch(err => console.error("error: ", err))
  }
  return (
    <div
      className=""
      id="exampleModalCenter2"
      role="dialog"
      aria-labelledby="exampleModalCenterTitle"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLongTitle">
              Add Lead
            </h5>
            <button onClick={() => history.push("/")} type="button" className="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">
            <Form
              schema={schema}
              uiSchema={uiSchema}
              // formData={formData}
              onSubmit={(e) => handleSubmit(e.formData)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Add;
