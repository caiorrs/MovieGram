export const Types = {
  SET_SERVICES: 'USER/SET_SERVICES',
};

const initialStreamingServices = [
  {
    name: 'Netflix',
    selected: false,
    id: 0,
  },
  {
    name: 'Disney+',
    selected: false,
    id: 1,
  },
  {
    name: 'Amazon Prime',
    selected: false,
    id: 2,
  },
  {
    name: 'HBO',
    selected: false,
    id: 3,
  },
  {
    name: 'Globoplay',
    selected: false,
    id: 4,
  },
];

const initialState = {
  streamingServices: initialStreamingServices,
};

export const setServices = (serviceId) => ({
  type: Types.SET_SERVICES,
  serviceId,
});

const UserInformationReducer = (state = initialState, action) => {
  switch (action.type) {
    case Types.SET_SERVICES:
      return {
        ...state,
        streamingServices: state.streamingServices.map((service) => {
          if (service.id === action.serviceId) {
            return {...service, selected: !service.selected};
          }
          return service;
        }),
      };
    default:
      return state;
  }
};

export default UserInformationReducer;
