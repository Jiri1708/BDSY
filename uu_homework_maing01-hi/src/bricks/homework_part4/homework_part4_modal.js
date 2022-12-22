//@@viewOn:imports
import UU5 from "uu5g04";
import { createVisualComponentWithRef, useRef, useImperativeHandle } from "uu5g04-hooks";
import Config from "../config/config";
import ModalContent from "./homework_part4_modalContent";
//@@viewOff:imports

const Modal = createVisualComponentWithRef({
  //@@viewOn:statics
  displayName: Config.TAG + "Bazar",
  //@@viewOff:statics

  render(props, ref) {
    //@@viewOn:hooks
    const modalRef = useRef();

    useImperativeHandle(ref, () => ({
      open: () => {
        modalRef.current.open({
          header: "Filtr",
          content: <ModalContent />,
        });
      },
    }));
    //@@viewOff:hooks

    //@@viewOn:private
    //@@viewOff:private

    //@@viewOn:render
    return <UU5.Bricks.Modal ref_={modalRef} />;
    //@@viewOff:render
  },
});

export default Modal;
