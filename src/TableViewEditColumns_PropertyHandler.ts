import {TableViewEditColumnsPropertyCell} from "./TableViewEditColumnsPropertyCell";
import {
    Application,
    FullScreenPane,
    TreeLeaf,
    TreeView,
    View,
    ViewController
} from "mentatjs";
import {TableViewEditColumnsPropertyViewController} from "./TableViewEditColumnsPropertyViewController";
import {Bounds, NumberWithUnit, px} from "mentatjs";

export function TableViewEditColumns_PropertyHandler() {
    return (function (viewController: ViewController, treeView: TreeView, leafObject: TreeLeaf, leafCell: View,  node, property) {
        let propCell = new TableViewEditColumnsPropertyCell();
        propCell.boundsForView = function (parentBounds: Bounds): Bounds {
            return {
                kind: "Bounds",
                x: px(0),
                y: px(0),
                width: parentBounds.width,
                height: px(44),
                unit: 'px',
                position: 'absolute',
                elevation: new NumberWithUnit(0, "auto"),
                rotation: new NumberWithUnit(0, "deg")
            };
        };
        propCell.initView(property.id);
        leafCell.attach(propCell);

        propCell.btnEdit.setActionDelegate({
            nodeRef: node,
            propertyRef: property,
            onClick: function () {
                let loadDelegate = {
                    fullscreenPane: null,
                    nodeRef: node,
                    propertyRef: property,
                    viewControllerWasLoadedSuccessfully: function (vc) {
                        vc.fullscreenPane = this.fullscreenPane;
                        vc.nodeRef = this.nodeRef;
                        vc.propertyRef = this.propertyRef;
                        this.fullscreenPane.navigationController.present(vc, {animated: false});
                    },

                    fullscreenPaneDidClosed: function (pane, status) {
                        Application.instance.notifyAll(this, "noticeRedrawLayerList");
                        Application.instance.notifyAll(this, "noticeNodeSelected", this.nodeRef);

                    }

                };
                loadDelegate.fullscreenPane = new FullScreenPane();
                loadDelegate.fullscreenPane.initFullscreenPane(loadDelegate, {});

                loadDelegate.fullscreenPane.navigationController.instantiateViewController("TableViewEditColumnsPropertyViewController", TableViewEditColumnsPropertyViewController, loadDelegate);

            }
        }, "onClick");
    });
}