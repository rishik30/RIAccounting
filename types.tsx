export type RootStackParamList = {
  Root: undefined;
  NotFound: undefined;
};

export type AuthStackParamList = {
  Login: undefined;
};

export type BottomTabParamList = {
  TabOne: undefined;
  TabTwo: undefined;
};

export type TabOneParamList = {
  TabOneScreen: undefined;
};

export type TabTwoParamList = {
  TabTwoScreen: undefined;
};

export interface IAuth {
  login?: (email: string, password: string) => void,
  logout?: () => void,
  register?: (email: string, password: string) => void
}

export interface IReducerAction {
  type: string,
  payload?: any
}

export interface IFetchOpts {
  method: 'GET' | 'POST' | 'PUT' | 'DELETE',
  body?: any,
  headers?: any
}
