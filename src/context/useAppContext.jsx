import { useContext } from "react";
import { Context } from "../context/index";

const useAppContext = () => {
  return useContext(Context);
}

export default useAppContext;
