import { useEffect } from "react";
import { useDispatch } from "react-redux";

//Hook is used to clear associated redux state on unmount
const useClearState = (actionType) => {
  const dispatch = useDispatch();

  useEffect(() => {
    return () => {
      console.log("Clear state");
      dispatch({ type: actionType });
    };
  }, [dispatch, actionType]);
};

export default useClearState;
