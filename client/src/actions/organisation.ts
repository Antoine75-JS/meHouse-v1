export const CREATE_NEW_ORGANISATION = 'CREATE_NEW_ORGANISATION';
export const SET_ORGANISATION_DETAILS = 'SET_ORGANISATION_DETAILS';
export const GET_ORGANISATION_DETAILS = 'GET_ORGANISATION_DETAILS';

export type OrganisationsActionTypes =
  | {
      type: typeof CREATE_NEW_ORGANISATION;
      payload: INewOrganisationPayload;
    }
  | {
      type: typeof GET_ORGANISATION_DETAILS;
      payload: string;
    }
  | {
      type: typeof SET_ORGANISATION_DETAILS;
      payload: IOrganisation;
    };

export const createNewOrganisation = (
  payload: INewOrganisationPayload,
): OrganisationsActionTypes => ({
  type: CREATE_NEW_ORGANISATION,
  payload,
});

export const getOrganisationDetails = (payload: string): OrganisationsActionTypes => ({
  type: GET_ORGANISATION_DETAILS,
  payload,
});

export const setOrganisationDetails = (payload: IOrganisation): OrganisationsActionTypes => ({
  type: SET_ORGANISATION_DETAILS,
  payload,
});