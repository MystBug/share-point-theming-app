import axios from "axios";

import { themeType } from "../types/themeType";

const cleanUrl = (url: string) => url.replace(/\/{2,}/, "/");

export type RequestResponse = {
  data: {
    themePreviews: themeType[]
  };
  status: number;
  statusText: string;
};

const config = {
  headers: {
    "Content-Type": "application/json;charset=utf-8",
    ACCEPT: "application/json; odata.metadata=minimal",
    "ODATA-VERSION": "4.0",
  },
};

/**
 * from: https://learn.microsoft.com/en-us/sharepoint/dev/declarative-customization/site-theming/sharepoint-site-theming-rest-api#rest-commands-for-site-themes
 *
 * @param webBasedUrl The URL for theme management REST commands is based on `_api/thememanager`.
 * For example, the following are the endpoints for the commands:
 *  - `_api/thememanager/AddTenantTheme`
 *  - `_api/thememanager/DeleteTenantTheme`
 *  - `_api/thememanager/GetTenantThemingOptions`
 *  - `_api/thememanager/ApplyTheme`
 *  - `_api/thememanager/UpdateTenantTheme`
 * @returns Promise<void | {
    data: {};
    status: number;
    statusText: string;
}>
 */
export const getThemingOptions = () => 
  axios
    .post(
      cleanUrl("/_api/thememanager/GetTenantThemingOptions")
    )
    .then((response) => {
      const { status, statusText, data }: RequestResponse = response;
      if (status !== 200) {
        console.error("getThemingOptions: status is not 200", {
          status,
          data,
          statusText,
        });
      }
      return {
        data: data.themePreviews,
        status,
        statusText,
      };
    })
    .catch((error) => {
      console.error("getThemingOptions failed", error);
      throw error;
    });

export const postTheme = (params: themeType) =>
  axios
    .post(
      cleanUrl("/_api/thememanager/AddTenantTheme"),
      params
        ? JSON.stringify({
            name: params.name,
            themeJson: JSON.stringify(params.themeJson),
          })
        : void 0,
      config
    )
    .then((response) => {
      const { data, status, statusText }: RequestResponse = response;
      console.log("postTheme response", { data, status, statusText });
      if (status !== 200) {
        console.error("getThemingOptions: status is not 200", {
          status,
          data,
          statusText,
        });
      }
      return { data, status, statusText };
    })
    .catch((error) => {
      console.error("postTheme failed", error);
      throw error;
    });

export const updateTheme = async (params: themeType) =>
  axios
    .post(
      cleanUrl("/_api/thememanager/UpdateTenantTheme"),
      params
        ? JSON.stringify({
            name: params.name,
            themeJson: JSON.stringify(params.themeJson),
          })
        : void 0,
        config
    )
    .then((response) => {
      const { data, status, statusText }: RequestResponse = response;
      console.log("updateTheme response", { data, status, statusText });
      if (status !== 200) {
        console.error("getThemingOptions: status is not 200", {
          status,
          data,
          statusText,
        });
      }
      return { data, status, statusText };
    })
    .catch((error) => {
      console.error("updateTheme failed", error);
      throw error;
    });

export const deleteTheme = async (params: themeType) =>
  axios
    .post(
      cleanUrl("/_api/thememanager/DeleteTenantTheme"),
      params
        ? JSON.stringify({
            name: params.name,
          })
        : void 0,
      config
    )
    .then((response) => {
      const { data, status, statusText }: RequestResponse = response;
      console.log("deleteTheme response", { data, status, statusText });
      if (status !== 204) {
        console.error("deleteTheme: status is not 204", {
          status,
          data,
          statusText,
        });
      }
      return { data, status, statusText };
    })
    .catch((error) => {
      console.error("deleteTheme failed", error);
      throw error;
    });

