import {providers} from '~/assets/mocks/providers';

export const Types = {
  SET_SERVICES: 'USER/SET_SERVICES',
  FOLLOW_USER: 'USER/FOLLOW_USER',
  UNFOLLOW_USER: 'USER/UNFOLLOW_USER',
};

const initialStreamingServices = providers.map((provider, index) => ({
  id: index,
  name: provider,
  selected: false,
}));

const initialFollowingUsers = [
  {
    username: 'Caio',
    ratings: 97,
  },
  {
    username: 'Rodrigo',
    ratings: 98,
  },
  {
    username: 'Rafael',
    ratings: 99,
  },
];

const initialState = {
  streamingServices: initialStreamingServices,
  followingUsers: initialFollowingUsers,
};

export const setServices = (serviceId) => ({
  type: Types.SET_SERVICES,
  serviceId,
});

export const unfollowUser = (username) => ({
  type: Types.UNFOLLOW_USER,
  username,
});

export const followUser = (user) => ({
  type: Types.FOLLOW_USER,
  user,
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
    case Types.FOLLOW_USER:
      return {
        ...state,
        followingUsers: [...state.followingUsers, action.user],
      };
    case Types.UNFOLLOW_USER:
      return {
        ...state,
        followingUsers: [
          ...state.followingUsers.filter(
            (user) => user.username !== action.username,
          ),
        ],
      };
    default:
      return state;
  }
};

export default UserInformationReducer;
