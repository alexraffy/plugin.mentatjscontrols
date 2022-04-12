import {
    Btn,
    View,
    Label
} from "mentatjs";
import {Bounds, NumberWithUnit, px, PXBounds} from "mentatjs";
import {Session} from "skeletjs";

export class TableViewEditColumnsPropertyCell extends View {


    btnEdit: Btn;
    label: Label;

    boundsForView(parentBounds: Bounds): Bounds {
        return {
            kind: "Bounds",
            x: px(0),
            y: px(0),
            width: parentBounds.width,
            height: px(44),
            unit: "px",
            position: "absolute",
            elevation: new NumberWithUnit(0, "auto"),
            rotation: new NumberWithUnit(0, "deg")
        };
    }


    viewWasAttached() {

        this.label = new Label();
        this.label.pxBoundsForView = function (parentBounds: PXBounds): PXBounds {
            return {
                "x": 0,
                "y": 0,
                "width": 90,
                "height": 40,
                "unit": "px",
                "position": "absolute"
            };
        };
        this.label.anchor('top', false, "", "leading", 0);
        this.label.anchor('left', false, "", "leading", 0);
        this.label.anchor('right', false, "", "trailing", 0);
        this.label.anchor('bottom', false, "", "trailing", 0);
        this.label.anchor('width', false, "", "leading", 0);
        this.label.anchor('height', false, "", "leading", 0);
        this.label.fontColor = "rgb(150,150,150)";
        this.label.fontFamily = '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif';
        this.label.fontWeight = "400";
        this.label.fontSize = 14;
        this.label.text = "Columns";
        this.label.fillLineHeight = true;
        this.label.textAlignment = "right";
        this.label.initView(this.id + ".Label");
        this.attach(this.label);


        let btnEdit = new Btn();
        btnEdit.boundsForView = function (parentBounds: Bounds): Bounds {
            return {
                kind: "Bounds",
                x: px(100),
                y: px(5),
                width: px(100),
                height: px(30),
                position: 'absolute',
                unit: 'px',
                elevation: new NumberWithUnit(0, "auto"),
                rotation: new NumberWithUnit(0, "deg")
            };
        };
        btnEdit.styles = Session.instance.theme.buttonStyle;
        btnEdit.text = 'Edit';
        btnEdit.visible = true;
        btnEdit.isToggle = false;
        btnEdit.isEnabled = true;
        btnEdit.buttonGroup = '';
        btnEdit.isToggled = false;

        btnEdit.anchor("top", false, "", "leading", 0);
        btnEdit.anchor("left", false, "", "leading", 0);
        btnEdit.anchor("right", false, "", "trailing", 0);
        btnEdit.anchor("bottom", false, "", "trailing", 0);
        btnEdit.anchor("width", false, "", "", 0);
        btnEdit.anchor("height", false, "", "", 0);
        btnEdit.anchor("centerh", false, "", "", 0);
        btnEdit.anchor("centerv", false, "", "", 0);
        btnEdit.initView('btnEdit');
        this.attach(btnEdit);
        this.btnEdit = btnEdit;


    }
}