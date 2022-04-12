import {
    Btn,
    Label,
    SelectionMode,
    TableView,
    View
} from "mentatjs";
import {BorderSide, Bounds, Fill, generateV4UUID, NUConvertToPixel, NumberWithUnit, px} from "mentatjs";
import {Session} from "skeletjs";

export class TableViewEditColumnsPropertyView extends View {

    btnOK: Btn;
    tableView: TableView;
    Frame: View;
    label2: Label;
    labelTitle: Label;

    constructor() {
        super();
        this.fills = [{"active": true, "type": "color", "blendMode": "normal", "value": "rgba(249, 249, 249, 1)"}];
    }


    boundsForView(parentBounds: Bounds): Bounds
    {
        return {
            kind: "Bounds",
            x: px(NUConvertToPixel(parentBounds.width).amount / 2 - 640 / 2),
            y: px(0),
            width: px(640),
            height: px(423),
            unit: "px",
            position: "absolute",
            rotation: new NumberWithUnit(0, "deg"),
            elevation: new NumberWithUnit(0, "auto")
        };
    }


    viewWasAttached()
    {
        let Frame = new View();
        Frame.boundsForView = function (parentBounds: Bounds): Bounds {
            return {
                kind: "Bounds",
                x: px(0),
                y: px(0),
                width: px(550),
                height: px(65),
                position: 'absolute',
                unit: 'px',
                elevation: new NumberWithUnit(0, "auto"),
                rotation: new NumberWithUnit(0, "auto")
            };
        };
        Frame.visible = true;
        Frame.opacity = 100;
        Frame.blendingMode = 'normal';
        Frame.borderRadius = {"tl": px(0), "tr": px(0), "bl": px(0), "br": px(0)};
        Frame.fills = [{
            "active": true,
            "type": "color",
            "blendMode": "normal",
            "value": "rgb(255,255,255)"
        }];
        Frame.overflow = 'visible';
        Frame.shadows = [];
        Frame.extracss = '';
        Frame.cursor = 'default';
        Frame.userSelect = 'none';
        Frame.viewWasAttached = () => {
            let labelTitle = new Label();
            labelTitle.boundsForView = function () {
                return {
                    kind: "Bounds",
                    x: px(10),
                    y: px(3),
                    width: px(421),
                    height: px(30),
                    position: 'absolute',
                    unit: 'px',
                    rotation: new NumberWithUnit(0, "deg"),
                    elevation: new NumberWithUnit(0, "auto")
                };
            };
            labelTitle.visible = true;
            labelTitle.opacity = 100;
            labelTitle.blendingMode = 'normal';
            labelTitle.borderRadius = {"tl": px(0), "tr": px(0), "bl": px(0), "br": px(0)};
            labelTitle.fills = [{
                "active": false,
                "type": "color",
                "blendMode": "normal",
                "value": "rgb(255,255,255)",
            }];
            labelTitle.text = 'Table Columns';
            labelTitle.fontFamily = '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif';
            labelTitle.fontWeight = '300';
            labelTitle.fontSize = 14;
            labelTitle.fontColor = 'rgb(50,50,50)';
            labelTitle.textAlignment = 'left';
            labelTitle.fillLineHeight = true;
            labelTitle.overflow = 'visible';
            labelTitle.shadows = [];
            labelTitle.extracss = '';
            labelTitle.cursor = 'default';
            labelTitle.userSelect = 'none';
            labelTitle.anchor("top", false, "", "leading", 0);
            labelTitle.anchor("left", false, "", "leading", 0);
            labelTitle.anchor("right", false, "", "trailing", 0);
            labelTitle.anchor("bottom", false, "", "trailing", 0);
            labelTitle.anchor("width", false, "", "", 0);
            labelTitle.anchor("height", false, "", "", 0);
            labelTitle.anchor("centerh", false, "", "leading", 0);
            labelTitle.anchor("centerv", false, "", "leading", 0);
            labelTitle.initView('labelTitle');
            Frame.attach(labelTitle);
            this.labelTitle = labelTitle;

            let label2 = new Label();
            label2.boundsForView = function (parentBounds) {
                return {
                    kind: "Bounds",
                    x: px(10),
                    y: px(29),
                    width: px(478),
                    height: px(20),
                    position: 'absolute',
                    unit: 'px',
                    elevation: new NumberWithUnit(0, "auto"),
                    rotation: new NumberWithUnit(0, "deg")
                };
            };
            label2.visible = true;
            label2.opacity = 100;
            label2.blendingMode = 'normal';
            label2.borderRadius = {"tl": px(0), "tr": px(0), "bl": px(0), "br": px(0)};
            label2.fills = [{
                "active": false,
                "type": "color",
                "blendMode": "normal",
                "value": "rgb(255,255,255)",

            }];

            label2.text = 'Edit column info, specify a Cell to instantiate and required Width (-1 to stretch)';
            label2.fontFamily = '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif';
            label2.fontWeight = '300';
            label2.fontSize = 12;
            label2.fontColor = 'rgb(50,50,50)';
            label2.textAlignment = 'left';
            label2.fillLineHeight = true;
            label2.overflow = 'visible';
            label2.shadows = [];
            label2.extracss = '';
            label2.cursor = 'default';
            label2.userSelect = 'none';
            label2.anchor("top", false, "", "leading", 0);
            label2.anchor("left", false, "", "leading", 0);
            label2.anchor("right", false, "", "trailing", 0);
            label2.anchor("bottom", false, "", "trailing", 0);
            label2.anchor("width", false, "", "", 0);
            label2.anchor("height", false, "", "", 0);
            label2.anchor("centerh", false, "", "leading", 0);
            label2.anchor("centerv", false, "", "leading", 0);
            label2.initView('label2');
            Frame.attach(label2);
            this.label2 = label2;

        };
        Frame.anchor("top", false, "", "leading", 0);
        Frame.anchor("left", false, "", "leading", 0);
        Frame.anchor("right", false, "", "trailing", 0);
        Frame.anchor("bottom", false, "", "trailing", 0);
        Frame.anchor("width", false, "", "", 0);
        Frame.anchor("height", false, "", "", 0);
        Frame.anchor("centerh", false, "", "leading", 0);
        Frame.anchor("centerv", false, "", "leading", 0);
        Frame.initView('Frame');
        this.attach(Frame);
        this.Frame = Frame;

        let tableView = new TableView();
        tableView.boundsForView = function (parentBounds) {
            return {
                kind: "Bounds",
                x: px(0),
                y: px(65),
                width: px(640),
                height: px(300),
                position: 'absolute',
                unit: 'px',
                elevation: new NumberWithUnit(0, "auto"),
                rotation: new NumberWithUnit(0, "deg")
            };
        };
        tableView.visible = true;
        tableView.opacity = 100;
        tableView.blendingMode = 'normal';
        tableView.borderRadius = {"tl": px(0), "tr": px(0), "bl": px(0), "br": px(0)};
        tableView.overflow = 'visible';
        tableView.fills = [{
            "active": false,
            "type": "color",
            "blendMode": "normal",
            "value": "rgb(255,255,255)"
        }];
        tableView.borders = [{"active": false, side: BorderSide.all, "value": "", "thickness": 1, "pattern": "solid"}];
        tableView.shadows = [];
        tableView.cursor = 'default';
        tableView.userSelect = 'none';
        tableView.extracss = '';
        tableView.jsonColumns = [{
            "id": "ColumnID",
            "title": "Column ID",
            "defaultCell": "mentatjs_1.TextField",
            "width": 150,
            "field": null
        }, {
            "id": "ColumnTitle",
            "title": "Title",
            "defaultCell": "mentatjs_1.TextField",
            "width": -1,
            "field": null
        }, {
            "id": "DefaultCell",
            "title": "Cell",
            "width": 150,
            "defaultCell": "mentatjs_1.Dropdown",
            "field": null
        }, {
            "id": "Width",
            "title": "Width",
            "width": 75,
            "defaultCell": "mentatjs_1.TextField",
            "field": null
        }, {
            "id": "up",
            "title": "",
            "width": 30,
            "defaultCell": "mentatjs_1.Button",
            "field": null,
            properties: [{id: generateV4UUID(), property_id: "label.text", group: "property", type: 'string', value: 'up'}]
        },{
            "id": "down",
            "title": "",
            "width": 30,
            "defaultCell": "mentatjs_1.Button",
            "field": null,
            properties: [{id: generateV4UUID(), property_id: "label.text", group: "property", type: 'string', value: 'down'}]
        },{
                "id": "Supp",
                "title": "",
                "width": 30,
                "defaultCell": "mentatjs_1.Button",
                "field": null,
                properties: [{ id: generateV4UUID(), property_id: "label.text", group: "property", type: 'string', value: "DEL"}]
            }
    ];
        tableView.allowReorder = true;
        tableView.rowMargin = 10;
        tableView.separateRows = false;
        tableView.selectionMode = SelectionMode.noSelection;
        tableView.addRowLabel = "Add Column";


        tableView.anchor("top", false, "", "leading", 0);
        tableView.anchor("left", false, "", "leading", 0);
        tableView.anchor("right", false, "", "trailing", 0);
        tableView.anchor("bottom", false, "", "trailing", 0);
        tableView.anchor("width", false, "", "", 0);
        tableView.anchor("height", false, "", "", 0);
        tableView.anchor("centerh", false, "", "", 0);
        tableView.anchor("centerv", false, "", "", 0);
        tableView.initView('tableView');
        this.attach(tableView);
        this.tableView = tableView;

        let btnOK = new Btn();
        btnOK.boundsForView = function (parentBounds) {
            return {
                kind: "Bounds",
                x: px(443),
                y: px(382),
                width: px(100),
                height: px(30),
                position: 'absolute',
                unit: 'px',
                elevation: new NumberWithUnit(0, "auto"),
                rotation: new NumberWithUnit(0, "deg")
            };
        };
        btnOK.text = 'OK';
        btnOK.styles = Session.instance.theme.buttonStyle;
        btnOK.isEnabled = true;
        btnOK.visible = true;
        btnOK.anchor("top", false, "", "leading", 0);
        btnOK.anchor("left", false, "", "leading", 0);
        btnOK.anchor("right", false, "", "trailing", 0);
        btnOK.anchor("bottom", false, "", "trailing", 0);
        btnOK.anchor("width", false, "", "", 0);
        btnOK.anchor("height", false, "", "", 0);
        btnOK.anchor("centerh", false, "", "", 0);
        btnOK.anchor("centerv", false, "", "", 0);
        btnOK.initView('btnOK');
        this.attach(btnOK);
        this.btnOK = btnOK;


    }
}