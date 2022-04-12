

import {
    LayerLabel,
    LayerImageView,
    LayerTextField,
    LayerCheckBox,
    LayerButton,
    LayerRadioButton,
    LayerSegmentedButton,
    LayerSlider,
    LayerListView,
    LayerTableView, LayerTableViewPager, LayerCollectionView, LayerTreeView, LayerDropdown, LayerSVGView, LayerMenu,
    LayerNumericTxtDrp, LayerView
} from "skeletjs";

import {TableViewEditColumnsPropertyCell} from "./TableViewEditColumnsPropertyCell";
import {TableViewEditColumns_PropertyHandler} from "./TableViewEditColumns_PropertyHandler";
import {declareSkeletPlugin, SkeletControl, SkeletPlugin} from "skeletjs";



export class HTMLControls extends SkeletPlugin {

    id: string = "86e4883d-71ed-4bfc-8f41-b9d88a4af218";
    name: string = "MentatJS Controls";
    description: string = "";
    author: string = "Skelet";
    link: string = "https://skelet.app/plugins/86e4883d-71ed-4bfc-8f41-b9d88a4af218/HTMLControls";

    constructor() {
        super();



        let commonControls = [
            new SkeletControl("MentatJS.View", "View", LayerView),
            new SkeletControl("MentatJS.Label", "Label", LayerLabel),
            new SkeletControl("MentatJS.ImageView", "ImageView", LayerImageView),
            new SkeletControl("MentatJS.TextField", "TextField", LayerTextField),
            new SkeletControl("MentatJS.NumericTxtDrp", "NumericTxtDrp", LayerNumericTxtDrp),
            new SkeletControl("MentatJS.CheckBox", "CheckBox", LayerCheckBox),
            new SkeletControl("MentatJS.Button", "Button", LayerButton),
            new SkeletControl("MentatJS.RadioButton", "RadioButton", LayerRadioButton),
            new SkeletControl("MentatJS.Dropdown", "Dropdown", LayerDropdown),
            new SkeletControl("MentatJS.SegmentedButton", "SegmentedButton", LayerSegmentedButton),
            new SkeletControl("MentatJS.Slider", "Slider", LayerSlider),
            new SkeletControl("MentatJS.TableViewPager", "TableViewPager", LayerTableViewPager),
            new SkeletControl("MentatJS.SVGView", "SVG", LayerSVGView),
            new SkeletControl("MentatJS.Menu", "Menu", LayerMenu)

        ];

        let containerControls = [
            new SkeletControl("MentatJS.View", "View", LayerView),
            new SkeletControl("MentatJS.ListView", "ListView", LayerListView),
            new SkeletControl("MentatJS.TableView", "TableView", LayerTableView),
            new SkeletControl("MentatJS.CollectionView", "CollectionView", LayerCollectionView),
            new SkeletControl("MentatJS.TreeView", "TreeView", LayerTreeView)
        ];


        this.addControlsGroup("MentatJS Controls", commonControls);
        this.addControlsGroup("Containers", containerControls);

        this.addCustomPropertyType("tableView.editColumns", 44, TableViewEditColumnsPropertyCell, TableViewEditColumns_PropertyHandler());


    }




}






declareSkeletPlugin(HTMLControls);