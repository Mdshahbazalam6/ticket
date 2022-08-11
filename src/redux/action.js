export const GET_USER = 'GET_USER';
export const SEARCHED_DATA = 'SEARCHED_DATA'; 
export const BOOK = 'BOOK'; 

export const getUser = ( payload ) => {
    return{
      type:GET_USER,
      payload,
    }
}

export const SearchData = ( payload ) => {
  return{
    type:SEARCHED_DATA,
    payload,
  }
}

export const BookTicket = ( payload ) => {
  return{
    type:BOOK,
    payload,
  }
}
