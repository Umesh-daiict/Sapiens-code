import { useMutation } from "@apollo/client";
import { FC } from "react";
import { UPDATE_LEAD } from "../../components/queries/queries";
import { Form } from "@rjsf/bootstrap-4";
import { RJSFSchema } from "@rjsf/utils";
import { useHistory, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/LeadStore";
import { leadUpdated } from "../../components/slices/leadsReducer";

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
    modifiedDate: {
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

const Edit: FC = () => {
  const [updateLead] = useMutation(UPDATE_LEAD);
  const { id } = useParams<{ id: string }>();
  const user = useSelector((state: RootState) => state.leads.data.find((user) => user.id === id));
  const history = useHistory();
  const dispatch = useDispatch();

  if (!user) {
    return <p>No User</p>
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
            "type": "string",
            "format": "date-time",
            title: "Modified Date",
            "default": new Date().toISOString()
          },

        },
      },
    },
  };
  const handleSubmit = (form) => {
    const dateObj = new Date(form.leadDetails.modifiedDate);
    const timeStr = dateObj.toTimeString().slice(0, 8);
    const dateStr = dateObj.toISOString().slice(0, 10);
    updateLead({
      variables: {
        id: id,
        Name: form.leadDetails.name,
        Date: dateStr,
        email: form.leadDetails.email,
        Notes: form.leadDetails.textarea,
        Source: form.stringFormats.source,
        Status: form.stringFormats.status,
        Time: timeStr
      },
    }).then(({ data }) => {
      dispatch(leadUpdated({
        updates: {
          ...data.updateLead.data
        }
      }))
      history.push("/")

    }).catch(err => console.error("error: ", err))
  }

  return (
    <div
      className=" "
      id="exampleModalCenter"
      role="dialog"
      aria-labelledby="exampleModalCenterTitle"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLongTitle">
              Edit Content
            </h5>
          </div>
          <div className="modal-body">
            <Form
              schema={schema}
              uiSchema={uiSchema}
              onSubmit={(e) => handleSubmit(e.formData)}
            />
          </div>

        </div>
      </div>
    </div>
  );
};
export default Edit;
