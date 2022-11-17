//@@viewOn:imports
import UU5 from "uu5g04";
import { createComponent } from "uu5g04-hooks";
import Config from "../config/config";
//@@viewOff:imports

let data = [
  {
    id: 1,
    name: "Karlos Vemola",
    bio: "Nadejny programator z Prahy",
    rating: 98,
  },
  {
    id: 2,
    name: "Hanz Heinz",
    bio: "Nadejny programator z Prahy",
    rating: 98,
  },
  {
    id: 3,
    name: "Alfons Bobolka",
    bio: "Nadejny programator z Prahy",
    rating: 94,
  },
  {
    id: 4,
    name: "Klara Fojtu",
    bio: "Beznadejna programatorka z Liberce",
    rating: 5,
  },
  {
    id: 5,
    name: "Aneta Velika",
    bio: "Nadejna designerka z HK",
    rating: 99,
  },
];

const TableDataProvider = createComponent({
  //@@viewOn:statics
  displayName: Config.TAG + "TableDataProvider",
  //@@viewOff:statics

  render({ children }) {
    //@@viewOn:private

    //@@viewOff:private

    //@@viewOn:render
    return children({ data });
    //@@viewOff:render
  },
});

export default TableDataProvider;
