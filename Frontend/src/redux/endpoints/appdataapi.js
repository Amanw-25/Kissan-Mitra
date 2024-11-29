import { Apiservices } from "../middlewares/apiservices";

const headers = {
  "content-type": "application/json",
};

const Appdataendpoints = Apiservices.injectEndpoints({
  endpoints: (build) => ({
    getweatherData: build.query({
      query: ({ latitude, longitude }) => ({
        url: `/weather/${latitude}/${longitude}`,
        method: "GET",
        headers,
      }),
    }),
    getStateData: build.query({
      query: () => ({
        url: `/market/state-data`,
        method: "GET",
        headers,
      }),
      transformResponse: (response) => response?.data,
    }),
    getLocalMarketName: build.mutation({
      query: (state_dist) => ({
        url: "/market/marketname-data",
        method: "POST",
        headers,
        body: state_dist,
        credentials: "include",
      }),
    }),
    getMarketData: build.mutation({
      query: (loactioninfo) => ({
        url: `/market/market-data`,
        method: "POST",
        headers,
        body: loactioninfo,
        credentials: "include",
      }),
    }),
    sendMailtoOrganization: build.mutation({
      query: (msgs) => ({
        url: `/mail/send-message`,
        method: "POST",
        headers,
        body: msgs,
        credentials: "include",
      }),
    }),
    getallMessages: build.query({
      query: () => ({
        url: `/community/messages`,
        method: "GET",
        headers,
      }),
      transformResponse: (response) => response?.data,
    }),
    getCropPredictoinData: build.mutation({
      query: (info) => ({
        url: `/predict/crop-predict`,
        method: "POST",
        headers,
        body: info,
        credentials: "include",
      }),
    }),
    getFertilizerPredictionData: build.mutation({
      query: (info) => ({
        url: `/predict/fertilizer-predict`,
        method: "POST",
        headers,
        body: info,
        credentials: "include",
      }),
    }),
    getDieasePredictionData: build.mutation({
      query: (file) => ({
        url: `/predict/disease-predict`,
        method: "POST",
        body: file,
        credentials: "include",
      }),
    }),
    getYeildPredictionData: build.mutation({
      query: (info) => ({
        url: `/predict/yield-predict`,
        method: "POST",
        headers,
        body: info,
        credentials: "include",
      }),
    }),
    getFirstFiveProfilePhotosDat: build.query({
      query: () => ({
        url: `/user/five/profile-photos`,
        headers,
        credentials: "include",
      }),
      transformResponse: (resp) => resp.data,
    }),
  }),
});

export const {
  useGetweatherDataQuery,
  useGetStateDataQuery,
  useGetLocalMarketNameMutation,
  useGetMarketDataMutation,
  useGetallMessagesQuery,
  useSendMailtoOrganizationMutation,
  useGetCropPredictoinDataMutation,
  useGetFertilizerPredictionDataMutation,
  useGetFirstFiveProfilePhotosDatQuery,
  useGetYeildPredictionDataMutation,
  useGetDieasePredictionDataMutation,
} = Appdataendpoints;
