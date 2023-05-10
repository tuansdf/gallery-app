import Backdrop from "@/components/backdrop/backdrop";
import LoadingIcon from "@/features/icons/loading-icon";
import classes from "./screen-loader.module.css";

interface Props {
  show: boolean;
}

const ScreenLoader = ({ show }: Props) => {
  return (
    <Backdrop role="button" show={show} className={classes["container"]}>
      <LoadingIcon className={classes["icon"]} />
    </Backdrop>
  );
};

export default ScreenLoader;
