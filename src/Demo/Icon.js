import PhotoLibraryIcon from "@material-ui/icons/PhotoLibrary";
import FormatColorTextIcon from "@material-ui/icons/FormatColorText";
import PaletteIcon from "@material-ui/icons/Palette";
import ZoomOutMapIcon from "@material-ui/icons/ZoomOutMap";
import CropIcon from "@material-ui/icons/Crop";
import PhotoFilterIcon from "@material-ui/icons/PhotoFilter";
import UndoIcon from "@material-ui/icons/Undo";
import RedoIcon from "@material-ui/icons/Redo";

export default function Icon(props) {
  switch (props.icon) {
    case "photo":
      return <PhotoLibraryIcon />;
    case "text":
      return <FormatColorTextIcon />;
    case "color":
      return <PaletteIcon />;
    case "zoom":
      return <ZoomOutMapIcon />;
    case "cut":
      return <CropIcon />;
    case "layout":
      return <PhotoFilterIcon />;
    case "undo":
      return <UndoIcon />;
    case "redo":
      return <RedoIcon />;
    default:
      return "";
  }
}
