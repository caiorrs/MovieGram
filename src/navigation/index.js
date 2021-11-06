import * as Screens from '~/screens';

import {FeedIcon, ProfileIcon, RecommendedIcon} from '~/assets/icons';

import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import {stackFromBottomOverlay} from './styles';
import theme from '~/assets/theme';
import {useSelector} from 'react-redux';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const RecommendedStack = () => (
  <Stack.Navigator
    screenOptions={{
      headerStyle: {
        backgroundColor: theme.colors.background,
      },
      headerTintColor: theme.colors.accent,
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    }}>
    <Stack.Screen
      name="Home"
      component={Screens.Home}
      options={({route}) => ({title: route?.params?.name || 'Recomendados'})}
    />
    <Stack.Screen
      name="Details"
      component={Screens.Details}
      options={({route}) => ({title: route?.params?.name || 'Detalhes'})}
    />
  </Stack.Navigator>
);

const ModalStack = () => {
  const {isLogged} = useSelector((state) => state.AppReducer);

  return (
    <Stack.Navigator
      headerMode="none"
      initialRouteName={isLogged ? 'TabNav' : 'SignIn'}>
      {isLogged ? <Stack.Screen name="TabNav" component={TabNav} /> : null}
      {!isLogged ? (
        <>
          <Stack.Screen name="SignIn" component={Screens.SignIn} />
          <Stack.Screen name="SignUp" component={Screens.SignUp} />
        </>
      ) : null}
      <Stack.Screen name="SignUpSuccess" component={Screens.SignUpSuccess} />
      <Stack.Screen name="SearchStack" component={SearchStack} />
    </Stack.Navigator>
  );
};

const SearchStack = () => {
  return (
    <Stack.Navigator mode="modal">
      <Stack.Screen
        name="Search"
        component={Screens.Search}
        options={{...stackFromBottomOverlay()}}
      />
    </Stack.Navigator>
  );
};

const TabNav = () => {
  return (
    <Tab.Navigator
      tabBarOptions={{
        activeTintColor: theme.colors.accent,
        inactiveTintColor: theme.colors.text,
        tabStyle: {
          backgroundColor: theme.colors.tabBar,
        },
      }}>
      <Tab.Screen
        name="RecommendedStack"
        component={RecommendedStack}
        options={{
          tabBarLabel: 'Recomendados',
          tabBarIcon: ({color, size}) => (
            <RecommendedIcon color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="FeedStack"
        component={FeedStack}
        options={{
          tabBarLabel: 'Feed',
          tabBarIcon: ({color, size}) => <FeedIcon color={color} size={size} />,
        }}
      />
      <Tab.Screen
        name="ProfileStack"
        component={ProfileStack}
        options={{
          tabBarLabel: 'Perfil',
          tabBarIcon: ({color, size}) => (
            <ProfileIcon color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const FeedStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: theme.colors.background,
        },
        headerTintColor: theme.colors.accent,
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}>
      <Stack.Screen name="Feed" component={Screens.Feed} />
    </Stack.Navigator>
  );
};

const ProfileStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: theme.colors.background,
        },
        headerTintColor: theme.colors.accent,
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}>
      <Stack.Screen name="Profile" component={Screens.Profile} />
      <Stack.Screen name="Services" component={Screens.ServicesSettings} />
      <Stack.Screen name="Friends" component={Screens.FriendsSettings} />
    </Stack.Navigator>
  );
};

export default ModalStack;
