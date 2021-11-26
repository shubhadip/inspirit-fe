export function showLoader(type : string ) {
  return (dispatch : any) => {
    dispatch({
      type,
      payload: true,
    });
  };
}

export function hideLoader(type: string ) {
  return (dispatch : any) => {
    dispatch({
      type,
      payload: false,
    });
  };
}
