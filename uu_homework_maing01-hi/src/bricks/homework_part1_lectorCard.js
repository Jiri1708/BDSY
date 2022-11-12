//@@viewOn:imports
import UU5 from "uu5g04";
import "uu5g04-bricks";
import { createVisualComponent } from "uu5g04-hooks";
import Config from "./config/config";
import image from "../assets/user.png";
import CSS from "./homework_part1_lectorCard.css";
//@@viewOff:imports

const LectorCard = createVisualComponent({
  //@@viewOn:statics
  displayName: Config.TAG + "LectorCard",
  //@@viewOff:statics

  render() {
    //@@viewOn:private

    function handleContact() {
      UU5.Environment.getPage().getAlertBus().addAlert({
        content: "Sorry our lines are busy",
      });
    }
    //@@viewOff:private

    //@@viewOn:render

    function renderBody() {
      return (
        <>
          <h1>Lektor Jakub</h1>
          <div>
            Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Class aptent taciti sociosqu ad litora torquent
            per conubia nostra, per inceptos hymenaeos. Proin mattis lacinia justo. In rutrum. Nam quis nulla. Fusce
            suscipit libero eget elit. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac
            turpis egestas. Nullam at arcu a est sollicitudin euismod. Nulla quis diam. Aliquam erat volutpat. Duis
            condimentum augue id magna semper rutrum. Maecenas fermentum, sem in pharetra pellentesque, velit turpis
            volutpat ante, in pharetra metus odio a lectus. Nulla est. Sed vel lectus. Donec odio tempus molestie,
            porttitor ut, iaculis quis, sem. Integer vulputate sem a nibh rutrum consequat.
          </div>
        </>
      );
    }

    function renderFooter() {
      return (
        <>
          <UU5.Bricks.Button onClick={handleContact} colorSchema="blue" className={CSS.button()}>
            <UU5.Bricks.Icon icon="uu5-person" />
            Contact
          </UU5.Bricks.Button>
        </>
      );
    }

    return (
      <>
        <h2 className={CSS.heading()}>Dnešní lektor</h2>
        <UU5.Bricks.Card className={CSS.main()}>
          <UU5.Bricks.Row>
            <UU5.Bricks.Column colWidth="xs-4 s-4">
              <UU5.Bricks.Image src={image} alt="logo" name="Image description" />
            </UU5.Bricks.Column>
            <UU5.Bricks.Column colWidth="xs-8 s-8">
              {renderBody()}
              <UU5.Bricks.Row>
                <UU5.Bricks.Column colWidth="xs-12 s-12">{renderFooter()}</UU5.Bricks.Column>
              </UU5.Bricks.Row>
            </UU5.Bricks.Column>
            <UU5.Bricks.Column colWidth="xs-12 s-4"></UU5.Bricks.Column>
          </UU5.Bricks.Row>
        </UU5.Bricks.Card>
      </>
    );
    //@@viewOff:render
  },
});

export default LectorCard;
