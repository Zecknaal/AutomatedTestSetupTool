function AutomatedTestSetupTree(){
}

AutomatedTestSetupTree.prototype = {
	constructor: AutomatedTestSetupTree,
	
	createNewTree:function(positionToAdd){
		//create the Tree control
		this.oTree = new sap.ui.commons.Tree("tree");
		this.oTree.setTitle("Automated Test Configuration");
		this.oTree.setWidth("100%");
		this.oTree.setHeight("auto");
		this.oTree.setShowHeaderIcons(true);
		this.oTree.setShowHorizontalScrollbar(false);
		
		this.oTree.placeAt(positionToAdd);
	},
	
	addNodesToTree:function(){		
		a = this.getTestNodes();
		for(nodeIndex = 0; nodeIndex < a.length; nodeIndex++)
			this.oTree.addNode(a[nodeIndex]);
			
	},
	
	getTestNodes:function(){
		//create Tree Nodes
		var oNode1 = new sap.ui.commons.TreeNode("node1", {text:"Computer", icon:"images/system.gif", expanded: true});
		var oNode2 = new sap.ui.commons.TreeNode("node2", {text:"OSDisk (C:)", icon:"images/disk.gif", expanded: true});
		var oNode3 = new sap.ui.commons.TreeNode("node3", {text:"Program Files", icon:"images/folder.gif"});
		var oNode4 = new sap.ui.commons.TreeNode("node4", {text:"Windows", icon:"images/folder.gif"});
		var oNode5 = new sap.ui.commons.TreeNode("node5", {text:"Mass Storage (USB)", icon:"images/disk.gif"});
		var oNode6 = new sap.ui.commons.TreeNode("node6", {text:"Network", icon:"images/network.gif"});

		oNode1.addNode(oNode2);
		oNode1.addNode(oNode5);

		oNode2.addNode(oNode3);
		oNode2.addNode(oNode4);
		
		return [oNode1, oNode6];
	}
}
