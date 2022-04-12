import {
    Btn,
    DataSource,
    FullScreenPane,
    TableView,
    TableViewDelegate,
    ViewController
} from "mentatjs";
import {Session} from "skeletjs";
//import * as path from "path";
import {TableViewEditColumnsPropertyView} from "./TableViewEditColumnsPropertyView";
import {Layer} from "skeletjs";
import {isDefined, LayerProperty} from "mentatjs";

export class TableViewEditColumnsPropertyViewController extends ViewController implements TableViewDelegate {

    fullscreenPane: FullScreenPane;
    nodeRef: Layer;
    propertyRef: LayerProperty;
    ds: any[];
    view: TableViewEditColumnsPropertyView;

    controlsList: any[];

    viewForViewController()
    {
        return new TableViewEditColumnsPropertyView();
    }

    viewWasPresented()
    {
        this.view.btnOK.setActionDelegate(this, "onOK");
        this.getListOfControls();
        this.load(this.nodeRef, this.propertyRef);

    }

    load(node, property)
    {

        let ds = [];
        let rows = property.value;

        for (let i = 0; i < rows.length; i += 1) {
            ds.push(rows[i]);
            console.dir(rows[i]);
        }
        this.ds = ds;
        this.view.tableView.dataSource = new DataSource();
        this.view.tableView.dataSource.initWithData({rows: ds});
        this.view.tableView.delegate = this;
        this.view.tableView.reloadData();

    }

    getListOfControls()
    {

        let hasLabel = false;
        let hasFrame = false;
        let hasImage = false;

        let dataArray = [];
        for (let i = 0; i < Session.instance.environment.Symbols[0].children.length; i += 1) {
            let s = Session.instance.environment.Symbols[0].children[i];
            dataArray.push({
                id: s.nodeRef.className,
                group: "Symbols",
                title: s.title,
                text: s.title,
                nodeRef: s
            });
        }
        for (let i = 0; i < Session.instance.environment.Symbols[1].children.length; i += 1) {
            let o = Session.instance.environment.Symbols[1].children[i];
            console.log(o.className);
            if (o.className === "MentatJS.Label") {
                hasLabel = true;
            }
            if (o.className === "MentatJS.View") {
                hasFrame = true;
            }
            if (o.className === "MentatJS.Image") {
                hasImage = true;
            }
            dataArray.push({
                id: o.className,
                group: o.group,
                title: o.title,
                text: o.title,
                nodeRef: o
            });
        }

        if (hasImage === false) {
            dataArray = [{
                id: "MentatJS.Image",
                group: "Basic",
                title: "Image",
                text: "Image",
                nodeRef: {className: "MentatJS.Image"}
            }, ...dataArray];
        }
        if (hasFrame === false) {
            dataArray = [{
                id: "MentatJS.View",
                group: "Basic",
                title: "Frame",
                text: "Frame",
                nodeRef: {className: "MentatJS.View"}
            }, ...dataArray];
        }
        if (hasLabel === false) {
            dataArray = [{
                id: "MentatJS.Label",
                group: "Basic",
                title: "Label",
                text: "Label",
                nodeRef: {className: "MentatJS.Label"}
            }, ...dataArray];
        }

        this.controlsList = dataArray;

    }


    tableViewControlCellWillInit(tableView, cell, control, item, col, path)
    {
        let value = "";

        if (col.id === "DefaultCell") {
            control.dataSource = this.controlsList;
        }
        if (col.id === "Supp" || col.id === "up" || col.id === "down") {
            (<Btn>control).styles = Session.instance.theme.buttonStyle;
            (<Btn>control).fontFamily = 'FontAwesome5ProRegular';

        }

        if (col.id === "Width") {
            control.isNumeric = true;
        }

    }

    tableViewUserAddedRow(tableView: TableView)
    {
        this.ds.push({
            id: "",
            title: "",
            defaultCell: "mentatjs_1.Label",
            width: 100
        });
        this.view.tableView.dataSource.initWithData({rows: this.ds});
        this.view.tableView.reloadData();
    }


    tableViewControlCellWasAttached(tableView, cell, control, item, col, path)
    {
        if (col.id === "ColumnID") {
            control.path = path;
            control.setText(item.id);
            control.setActionDelegate(this, "onChangeColumnID");
        }
        if (col.id === "ColumnTitle") {
            control.path = path;
            control.setText(item.title);
            control.setActionDelegate(this, "onChangeColumnTitle");
        }
        if (col.id === "DefaultCell") {
            control.path = path;
            control.setSelectedItem(item.defaultCell);
            control.setActionDelegate(this, "onChangeColumnDefaultCell");
        }

        if (col.id === "Width") {
            control.path = path;
            control.setText(item.width);
            control.setActionDelegate(this, "onChangeColumnWidth");
        }
        if (col.id === "up") {
            control.path = path;
            control.setText("&#xf062;");
            control.setActionDelegate(this, "onMoveColumnUp");
            if (path.row === 0) {
                control.setEnabled(false);
            }
        }
        if (col.id === "down") {
            control.path = path;
            control.setText("&#xf063;");
            control.setActionDelegate(this, "onMoveColumnDown");
            if (path.row === tableView.dataSource.numberOfItems-1) {
                control.setEnabled(false);
            }
        }
        if (col.id === "Supp") {
            control.path = path;
            control.setText("&#xf2ed;");
            control.setActionDelegate(this, "onDeleteColumn");
        }
    }


    onChangeColumnID(sender)
    {
        let row = this.ds[sender.path.row];
        row.id = sender.value;
    }
    onChangeColumnTitle(sender)
    {
        let row = this.ds[sender.path.row];
        row.title = sender.value;
    }
    onChangeColumnDefaultCell(sender)
    {
        let row = this.ds[sender.path.row];
        row.defaultCell = sender.selectedID;
    }
    onChangeColumnWidth(sender)
    {
        let row = this.ds[sender.path.row];
        row.width = parseInt(sender.value);
    }
    onMoveColumnUp(sender) {
        let row = sender.path.row;
        if (row-1 >= 0) {
            this.ds.splice(row - 1, 0, this.ds.splice(row, 1)[0]);
        }
        this.view.tableView.dataSource.initWithData({rows: this.ds});
        this.view.tableView.reloadData();
    }
    onMoveColumnDown(sender) {
        let row = sender.path.row;
        if (row+1 < this.ds.length) {
            this.ds.splice(row + 1, 0, this.ds.splice(row, 1)[0]);
        }
        this.view.tableView.dataSource.initWithData({rows: this.ds});
        this.view.tableView.reloadData();
    }

    onDeleteColumn(sender)
    {
        this.ds.splice(sender.path.row, 1);
        this.view.tableView.dataSource.initWithData({rows: this.ds});
        this.view.tableView.reloadData();
    }

    onOK()
    {

        console.log("Table DS IS ");
        console.dir(this.ds);

        let newColumns = [];
        for (let i = 0; i < this.ds.length; i += 1) {
            let col = this.ds[i];
            if (col.id === "") {
                continue;
            }
            console.log("Column " + col.id);


            let width = 0;
            width = parseInt(col.width);

            let newCol = {
                "id": col.id,
                "title": col.title,
                "defaultCell": col.defaultCell,
                "width": width,
                properties: []
            };

            // does the col exists already
            /*

            // DANGEROUS,
            // COL NEED TO BE OF THE SAME CELL TYPE

            let existingProps = this.propertyRef.value.find((elem) => { return elem.id === col.id; });
            if (isDefined(existingProps)) {
                console.log("FOUND EXISTING PROP IN TABLE NODE", existingProps.properties);
                newCol.properties = existingProps.properties;
            }
            */

            newColumns.push(newCol);
        }


        // update the sub-nodes
        while (this.nodeRef.children.length > 0) {
            this.nodeRef.removeChild(this.nodeRef.children[this.nodeRef.children.length - 1]);
        }

        for (let i = 0; i < newColumns.length; i += 1) {
            let newNode = Layer.create(newColumns[i].title, "object", newColumns[i].defaultCell);
            newNode.title = newColumns[i].id;
            newNode.dontInstantiate = true;
            newNode.linkName = newColumns[i].id;
            newNode.hideCommonActions = true;
            newNode.hideLayoutProperties = true;
            newNode.isDeletable = true;
            newNode.isLocked = true;

            try {
                this.nodeRef.adopt(newNode);
                newColumns[i].properties = JSON.parse(JSON.stringify(newNode.properties));
                console.log("ADDED NODE " + newNode.title);
                console.log("With Properties ", newNode.properties);
            } catch (eee) {
                console.warn(eee.message);
            }
        }


        // update the property
        this.propertyRef.value = newColumns;


        // find the viewRef
        let viewRef = Session.instance.getCurrentCanvas().findViewRef(this.nodeRef.id);
        if (isDefined(viewRef)) {
            viewRef.applyLayoutProperty(this.propertyRef.property_id, newColumns);
            viewRef.render();
        }

        this.fullscreenPane.closeWithStatus({valid: true});
    }
}