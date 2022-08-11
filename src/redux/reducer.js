import { GET_USER,SEARCHED_DATA ,BOOK} from "./action"; 

const initState = {
  user:"",
  search:'',
  Book:''
};
export const reducer = (state = initState, { type, payload }) => {
  switch (type) {
    case GET_USER: {
      return {
        ...state,
        user: payload,
      };
    }
    case SEARCHED_DATA: {
      return{
        ...state,
        search:payload
      }
    }
    case BOOK: {
      return{
        ...state,
        Book:payload
      }
    }
    default:
      return state;
  }
};
