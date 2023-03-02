import { gql } from "@apollo/client";

export const GET_FAQS = gql`
  query fetchFAQ {
    faqsSapiensystems {
      data {
        id
        attributes {
          Question
          Answer
        }
      }
    }
  }
`;

export const GET_LEADS = gql`
	query {
		leads {
			data {
				id
				attributes {
					Name
					email
					date
					Source
					updatedAt
					Notes
					Status
					createdAt
				}
			}
		}
	}
`;

export const DELETE_LEADS = gql`
	mutation deleteLead($id: ID!) {
		deleteLead(id: $id) {
			data {
				id
			}
		}
	}
`;

export const CREATE_LEAD = gql`
	mutation createLead(
		$Name: String!
		$email: String!
		$Source: ENUM_LEAD_SOURCE!
		$Status: ENUM_LEAD_STATUS!
		$Notes: String!
		$Date: Date!
		$Time: Time!
	) {
		createLead(
			data: {
				Name: $Name
				email: $email
				Source: $Source
				Status: $Status
				Notes: $Notes
				date: $Date
				Time: $Time
			}
		) {
			data {
				id
				attributes {
					Name
					email
					date
					Source
					updatedAt
					Notes
					Status
					createdAt
				}
			}
		}
	}
`;

export const UPDATE_LEAD = gql`
	mutation updateLead(
		$id: ID!
		$Name: String!
		$email: String!
		$Source: ENUM_LEAD_SOURCE!
		$Status: ENUM_LEAD_STATUS!
		$Notes: String!
		$Date: Date!
		$Time: Time!
	) {
		updateLead(
			id: $id
			data: {
				Name: $Name
				email: $email
				Source: $Source
				Status: $Status
				Notes: $Notes
				date: $Date
				Time: $Time
			}
		) {
			data {
	   			id
				attributes {
					Name
					email
					date
					Source
					updatedAt
					Notes
					Status
					createdAt
							}
			}
		}
	}
`;
