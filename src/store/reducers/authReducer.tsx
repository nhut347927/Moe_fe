// Defining types for state and action
interface AuthState {
  isAuthenticated: boolean;
  isAdmin: boolean;
}

interface AuthAction {
  type: string;
  payload?: { isAdmin: boolean };
}

const initialState: AuthState = {
  isAuthenticated: true,
  isAdmin: true,
};

const authReducer = (state = initialState, action: AuthAction): AuthState => {
  switch (action.type) {
    case 'LOGIN':
      return {
        ...state,
        isAuthenticated: true,
        isAdmin: action.payload?.isAdmin || false,
      };
    case 'LOGOUT':
      return {
        ...state,
        isAuthenticated: false,
        isAdmin: false,
      };
    default:
      return state;
  }
};

export default authReducer;
