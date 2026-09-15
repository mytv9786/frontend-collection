import React, {
  createContext,
  useReducer,
  useEffect,
  useContext,
  useCallback,
} from 'react';
import { AuthContext } from './AuthContext';

export const ManagerContext = createContext();

const ManagerReducer = (state, action) => {
  switch (action.type) {
    case 'LOAD_MANAGERS':
      return Array.isArray(action.payload) ? action.payload : [action.payload];

    case 'ADD_MANAGER':
      // Match key name with the formatter (empId)
      const exists = state.find(m => m.emplId === action.payload.emplId);
      if (exists) return state;
      return [action.payload, ...state];

    case 'REMOVE_MANAGER':
      return state.filter(m => m.id !== action.payload);

    default:
      return state;
  }
};

export const ManagerContextProvider = ({ children }) => {
  const [managers, dispatch] = useReducer(ManagerReducer, []);
  const { token } = useContext(AuthContext);

  // Helper to format API response to UI state
  const formatUserData = useCallback(
    item => ({
      id: item.user_id,
      emplId: item.employee_id, // Changed from emplId to empId
      userName: item.username,
      fullName: `${item.first_name} ${item.last_name}`,
      mobile: item.mobile || 'N/A',
      email: item.email || 'N/A',
      role: item.role_name || 'No role',
    }),
    [],
  );

  // Initial Fetch
  useEffect(() => {
    const fetchManagers = async () => {
      if (!token) return;
      try {
        const response = await fetch('http://192.168.88.137:5000/api/users/', {
          method: 'GET', //  FIX 2: Method belongs here, outside the headers block!
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await response.json();

        if (response.ok) {
          console.log('data');
          const formatted = Array.isArray(data)
            ? data.map(formatUserData)
            : [formatUserData(data)];
          dispatch({ type: 'LOAD_MANAGERS', payload: formatted });
        }
      } catch (error) {
        console.error('Fetch Managers Failure', error);
      }
    };
    fetchManagers();
  }, [token, formatUserData]);

  async function addManager(formData) {
    console.log(formData);
    try {
      const response = await fetch(
        `http://192.168.88.137:5000/api/users/register`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            employee_id: formData.employeeId,
            username: formData.username,
            password: formData.password,
            first_name: formData.firstName,
            last_name: formData.lastName,
            email: formData.email,
            mobile: formData.mobile,
            role_id: formData.roleId, // FIXED: Sending ID, not Name
          }),
        },
      );

      const result = await response.json();

      if (response.ok) {
        const newUser = {
          id: result.userId || result.id,
          empId: formData.employeeId, // Matches reducer
          userName: formData.username,
          fullName: `${formData.firstName} ${formData.lastName}`,
          mobile: formData.mobile || 'N/A',
          email: formData.email || 'N/A',
          // Note: You might want to pass role_name from the UI for immediate display
          role: formData.roleName || 'Admin',
        };
        dispatch({ type: 'ADD_MANAGER', payload: newUser });
        return { success: true };
      }
      return { success: false, message: result.message };
    } catch (error) {
      return { success: false, message: 'Network Error' };
    }
  }

  function removeManager(id) {
    // Note: You should ideally call a DELETE API here as well
    dispatch({ type: 'REMOVE_MANAGER', payload: id });
  }

  return (
    <ManagerContext.Provider value={{ managers, addManager, removeManager }}>
      {children}
    </ManagerContext.Provider>
  );
};
