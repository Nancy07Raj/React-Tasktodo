const initialState = {
  fetchdata: [],
  editData: "",
  userInfom: "",
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "Fetch_Tasks":
      return {
        ...state,
        fetchdata: action.payload,
      };
    case "Get_Edit_Data":
      return {
        ...state,
        editData: action.payload,
      };
    case "User_Info":
      return {
        ...state,
        userInfom: action.payload,
      };
    case "Logout":
      return {
        editData: "",
        userInfo: "",
        fetchdata: [],
      };
    case "Put_Task":
      return {
        ...state,
        editData: "",
      };
    default:
      return state;
  }
};

export default reducer;
