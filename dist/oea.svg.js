// Oea.svg 0.1.0
//
// Copyright (c) 2004 – 2015 Web Semantics,Inc. All rights reserved.
//
// http://www.opensource.org/licenses/mit-license.php
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
//
// build: 2015-04-29

/**
 * Oea.svg
 *
 * @author    Adnan Sagar, PhD <adnan@websemantics.ca>
 * @copyright 2004-2015 Web Semantics, Inc. (http://websemantics.ca)
 * @license   http://www.opensource.org/licenses/mit-license.php MIT
 * @since     6th January 2004
 * @package   websemantics/oea
 */

/**
 * Initlialise the Swing.svg Package
 *
 * @return void
 */

/* Env Constants */
var Batik       = 0;
var ASV         = 1;
var Native      = 2;

/**
 * Current Env variable to indicate whether this script code is 
 * working under SVG (Batik / ASV) or HTML environment (Native) 
 * functions. 
 */
var viewerMode  = -1;

/**
 * Ref to the document object
 */
var svgDocument = document;
var svgObjectId = 'svgObject';

function initialise() {

    // Find out which SVG viewer is running? (Batik or ASV)
    if (svgDocument.documentElement.viewport) {
        viewerMode = Batik;
        // Correct a bug []
        VK_ENTER = 10; // for ASV it is 13!
        // Fix some shortages of Batik [ set variables innerWidth and innerHeight and define function printNode]
        // window.innerWidth=svgDocument.documentElement.viewport.getWidth();
        // window.innerHeight=svgDocument.documentElement.viewport.getHeight();
        window.contextMenu = null;
        window.printNode = printXMLNode // (find it at: src/svgDraw2d/FClasses/SVG/SvgUtilities.js);
    } else
        viewerMode = ASV;
   
    // Added on 29 April 2015, assume SVG native browser support!
    viewerMode = Native;

    // If running in html document, get the SVG Object
    if(viewerMode == Native){
        var graphic = document.getElementById(svgObjectId);
        svgDocument = graphic.contentDocument;
    }

    initDraw2D();
    initSwing();
}

/**
 * Draw2D.svg
 *
 * @author    Adnan Sagar, PhD <adnan@websemantics.ca>
 * @copyright 2004-2015 Web Semantics, Inc. (http://websemantics.ca)
 * @license   http://www.opensource.org/licenses/mit-license.php MIT
 * @since     17th November 2005
 * @package   websemantics/oea/draw2d.svg
 */

/**
 * Initlialise the Draw2D Package
 *
 * @return void
 */

function initDraw2D(){
	ds_initDesktop();
	pg_createDefualtPage();
	ly_createDefualtLayer();
	df_createDefs();
} 



/**
 * Swing.svg
 *
 * @author    Adnan Sagar, PhD <adnan@websemantics.ca>
 * @copyright 2004-2015 Web Semantics, Inc. (http://websemantics.ca)
 * @license   http://www.opensource.org/licenses/mit-license.php MIT
 * @since     17th November 2004
 * @package   websemantics/oea/swing.svg
 */

/**
 * Initlialise the Swing.svg Package
 *
 * @return void
 */

function initSwing(){

	// Microsoft Windows Look & Feel
	var node1=createSVGNode("linearGradient",{id:"WinG1"});
	node1.appendChild(createSVGNode("stop",{offset:"0%",'stop-color':'rgb(10,36,106)'}));
	node1.appendChild(createSVGNode("stop",{offset:"100%",'stop-color':'rgb(166,202,240)'}));

	var node2=createSVGNode("linearGradient",{id:"WinG2"});
	node2.appendChild(createSVGNode("stop",{offset:"0%",'stop-color':'rgb(127,127,127)'}));
	node2.appendChild(createSVGNode("stop",{offset:"100%",'stop-color':'rgb(192,192,192)'}));

	df_addToDefs(node1);
	df_addToDefs(node2);

	windowLayer=ly_createLayer(pg_getDefualtPage(),0);
	menuLayer=ly_createLayer(pg_getDefualtPage(),1);
	toolTipLayer=ly_createLayer(pg_getDefualtPage(),2);

} 

/**
 * Minimal implementation for a Clipboard class.
 * 
 */

function Clipboard() {
        var argv = Clipboard.arguments;
        var argc = Clipboard.length;
        this.className = "Clipboard";

        /* String */
        this.data = "";

        if (argv.length > 0) 
            this.initClipboard();
    }

Clipboard.prototype.initClipboard = function() {}

Clipboard.prototype.clearData = function() {

        this.data = "";

        if (viewerMode == ASV)
            return window.clipboardData.setData("text", this.data);
    }

Clipboard.prototype.setData = function( /* String */ data) {

        this.data = data;

        if (viewerMode == ASV)
            window.clipboardData.setData("text", data);
    }

Clipboard.prototype.getData = function() {

    if (viewerMode == ASV)
        return window.clipboardData.getData("text");
    else
        return this.data;
}

/**
 * Global Variables
 *
 */

var menuLayer;
var toolTipLayer;
var clipboard = new Clipboard();

/**
 * Draw2D.svg : Point
 *
 * @author    Adnan Sagar, PhD <adnan@websemantics.ca>
 * @copyright 2004-2015 Web Semantics, Inc. (http://websemantics.ca)
 * @license   http://www.opensource.org/licenses/mit-license.php MIT
 * @since     8th November 2005
 * @package   websemantics/oea/draw2d.svg/fclasses/graphical
 */

function Point(x,y){
    var argv = Point.arguments;
    var argc = Point.length;
    this.className = "Point";
    
		this.x=0;
		this.y=0;
}

/**
 * setX, setY, getX and getY functions are avoided for performance.
 * direct access to x and y is allowed 
 */

Point.prototype.setX = function(x) {
    this.x = x;
}

Point.prototype.setY = function(y) {
    this.y = y;
}

Point.prototype.getX = function() {
    return this.x;
}

Point.prototype.getY = function(y) {
    return this.y;
}

/**
 * Draw2D.svg : Rect
 *
 * @author    Adnan Sagar, PhD <adnan@websemantics.ca>
 * @copyright 2004-2015 Web Semantics, Inc. (http://websemantics.ca)
 * @license   http://www.opensource.org/licenses/mit-license.php MIT
 * @since     8th November 2005
 * @package   websemantics/oea/draw2d.svg/fclasses/graphical
 */

/**
 * Class Rect
 *
 * GET methods are ignored for performance reasons,... 
 * direct access to class properties is allowed 
 *
 * X,Y Origin:
 * Both coordinate are local to the object,..
 * X=0 & Y=0, rotate, scale around top left corner
 * X=W/2 & Y=H/2, rotate, scale around middle
 * X=W & Y=H, rotate, scale around bottom right corner
 * 
 */

function Rect(x, y, w, h) {
        var argv = Rect.arguments;
        var argc = Rect.length;
        this.className = "Rect";

        if (argv.length == 0)
            this.initRect(0, 0, 0, 0);
        else this.initRect(x, y, w, h);
    }

Rect.prototype.initRect = function(x, y, w, h) {
        /* int/float */
        this.x = x; // x coordinate
        /* int/float */
        this.y = y; // y coordinate 
        /* int/float */
        this.xo = 0; // x origin
        /* int/float */
        this.yo = 0; // y origin
        /* int/float */
        this.w = w; // width
        /* int/float */
        this.h = h; // height
        /* float     */
        this.s = 1; // scale factor
        /* float     */
        this.r = 0; // rotation factor
    }

Rect.prototype.setCoord = function(x, y) {
        this.x = x;
        this.y = y;
    }

Rect.prototype.getCoord = function() {
        return (new Point(this.x, this.y));
    }

Rect.prototype.setOrigin = function(xo, yo) {
        this.xo = xo;
        this.yo = yo;
    }

Rect.prototype.getOrigin = function() {
        return (new Point(this.xo, this.yo));
    }

Rect.prototype.setOriginToCenter = function() {
        this.setOrigin(this.w / 2, this.h / 2);
    }

Rect.prototype.setWidth = function(w) {
        this.w = w;
        this.onResize();
    }

Rect.prototype.getWidth = function() {
        return this.w;
    }

Rect.prototype.setHeight = function(h) {
        this.h = h;
        this.onResize();
    }

Rect.prototype.getHeight = function() {
        return this.h;
    }

Rect.prototype.setSize = function(w, h) {
        this.w = w;
        this.h = h;
        this.onResize();
    }

Rect.prototype.setRotate = function(r) {
        this.r = r;
    }

Rect.prototype.getRotate = function() {
        return this.r;
    }

Rect.prototype.setScale = function(s) {
        this.s = s;
    }

Rect.prototype.getScale = function() {
        return this.s;
    }

Rect.prototype.translate = function(x, y) {
        this.setCoord(x, y);
        this.onMove();
    }

Rect.prototype.moveBy = function(dx, dy) {
        this.translate(this.x + dx, this.y + dy);
    }

Rect.prototype.rotate = function(r) {
        this.r = r;
        this.onRotate();
    }

Rect.prototype.scale = function(s) {
        this.s = s;
        this.onScale();
    }

Rect.prototype.onMove = function() {;
    }

Rect.prototype.onRotate = function() {;
    }

Rect.prototype.onScale = function() {;
    }

Rect.prototype.onResize = function() {;
}

/**
 * Draw2D.svg : Palette
 * 
 * Colors used to draw 3D objects (i.e. windows, buttons , etc)
 *
 * @author    Adnan Sagar, PhD <adnan@websemantics.ca>
 * @copyright 2004-2015 Web Semantics, Inc. (http://websemantics.ca)
 * @license   http://www.opensource.org/licenses/mit-license.php MIT
 * @since     5th November 2005
 * @package   websemantics/oea/draw2d.svg
 */

var pal0=["rgb(64,64,64)","rgb(128,128,128)","rgb(212,212,212)","rgb(255,255,255)"];
var pal1=["rgb(97,29,99)","rgb(196,56,199)","rgb(235,189,236)","rgb(255,255,255)"];
var pal2=["rgb(128,0,3)","rgb(255,0,6)","rgb(255,170,172)","rgb(255,255,255)"];
var pal3=["rgb(55,85,43)","rgb(111,170,85)","rgb(207,226,199)","rgb(255,255,255)"];
var pal4=["rgb(32,18,109)","rgb(64,36,219)","rgb(191,182,243)","rgb(255,255,255)"];
var pal5=["rgb(117,112,11)","rgb(234,223,21)","rgb(248,244,177)","rgb(255,255,255)"];
var pal6=["rgb(120,72,7)","rgb(239,145,16)","rgb(250,218,175)","rgb(255,255,255)"];
var pal7=["rgb(122,5,119)","rgb(245,10,239)","rgb(252,173,250)","rgb(255,255,255)"];

// Currently used, ... 
var pal=pal0;

/**
 * Draw2D.svg : SVGNode
 *
 * @author    Adnan Sagar, PhD <adnan@websemantics.ca>
 * @copyright 2004-2015 Web Semantics, Inc. (http://websemantics.ca)
 * @license   http://www.opensource.org/licenses/mit-license.php MIT
 * @since     8th November 2005
 * @package   websemantics/oea/draw2d.svg/fclasses/svg
 */

SVGNode.prototype = new Rect();

function SVGNode() {
        var argv = SVGNode.arguments;
        var argc = SVGNode.length;
        this.className = "SVGNode";
        
        this.Node = null;

        this.initSVGNode();
    }

SVGNode.prototype.initSVGNode = function(Node) {
        
        if (Node != undefined) 
        	this.Node = Node;
        else 
        	this.Node = null;

        this.parentNode = null;
        this.cursorType = null;
    }

SVGNode.prototype.setId = function(val) {
        return this.setAttribute('id', val);
    }

SVGNode.prototype.getId = function() {
        return this.getAttribute('id');
    }

SVGNode.prototype.getNode = function() {
        return this.Node;
    }

SVGNode.prototype.setNode = function(Node) {
        this.Node = Node;
    }

SVGNode.prototype.hasAttribute = function(attr) {
        if (this.Node == null) return false;
        return this.Node.hasAttribute(attr);
        //return this.Node.hasAttributeNS("http://www.w3.org/2000/svg",attr);
    }

SVGNode.prototype.setAttribute = function(attr, val) {
        if (this.Node == null) return false;
        this.Node.setAttribute(attr, val);
        //this.Node.setAttributeNS("http://www.w3.org/2000/svg",attr,val);
        return true;
    }

SVGNode.prototype.getAttribute = function(attr) {
        if (this.Node == null) return null;
        return this.Node.getAttribute(attr);
        //return this.Node.getAttributeNS("http://www.w3.org/2000/svg",attr);
    }

SVGNode.prototype.removeAttribute = function(attr) {
        if (this.Node == null) return null;
        return this.Node.removeAttribute(attr);
    }

SVGNode.prototype.addEventListener = function(eventType, function_name, useCapture) {
        
        if (this.Node == null) 
        	return false;

        this.Node.addEventListener(eventType, function_name, useCapture);
        return true;
    }

SVGNode.prototype.removeEventListener = function(eventType, function_name, useCapture) {
        if (this.Node == null) 
        	return false;

        this.Node.removeEventListener(eventType, function_name, useCapture);
        return true;
    }

SVGNode.prototype.setVisibility = function(flag) {
        if (flag)
            this.setAttribute('visibility', "visible");
        else
            this.setAttribute('visibility', "hidden");
    }

SVGNode.prototype.getVisibility = function() {
        if (this.getAttribute('visibility') == "visible") return true;
        return false;
    }

SVGNode.prototype.setOpacity = function(op) {
        this.setAttribute('opacity', op);
    }

SVGNode.prototype.getOpacity = function() {
        return this.getAttribute('opacity');
    }

SVGNode.prototype.addChild = function(node) {
        if (node.getNode != undefined) 
        	node = node.getNode();
        if (this.Node != null && this.Node.addChild == undefined) 
        	this.Node.appendChild(node);
        else this.Node.addChild(node); // <= does not work with older plug-in (ver 3)
    }

SVGNode.prototype.setParent = function( /* SVGNode or SvgElement */ parentNode) {
        if (parentNode != undefined && parentNode != null)
            if (parentNode.getNode != undefined && this.getNode != undefined)
                parentNode.getNode().appendChild(this.getNode());
            else
                parentNode.appendChild(this.getNode());
    }

SVGNode.prototype.dispose = function() {
        if (this.Node == null) return null;
        cv_removeAllEventListeners(this);
        var ret = deleteSVGNode(this.Node);
        this.Node = null;
        return ret;
        //delete this;
    }

SVGNode.prototype.setCursor = function(cursor) {
				// Summary:
				// 
				// setCursor: this feature does not work on Batik,..only ASV6 

				// auto :The UA determines the cursor to display based on the current context. 
				// crosshair :A simple crosshair (e.g., short line segments resembling a "+" sign). 
				// default :The platform-dependent default cursor. Often rendered as an arrow. 
				// pointer : The cursor is a pointer that indicates a link. 
				// move : Indicates something is to be moved. 
				// e-resize, ne-resize, nw-resize, n-resize, se-resize, sw-resize, 
				// s-resize, w-resize : 
				// Indicate that some edge is to be moved. For example, the 'se-resize' 
				// cursor is used when the movement starts from the south-east corner of 
				// the box. 
				// text : Indicates text that can be selected. Often rendered as an I-bar. 
				// wait : Indicates that the program is busy. Often rendered as a watch or 
				// hourglass. 
				// help : Help is available for the object under the cursor. Often rendered 
				// as a question mark or a balloon. 
				// <uri> : The user agent retrieves the cursor from the resource designated 
				// by the URI. If the user agent cannot handle the first cursor of a list of cursors, it shall attempt to handle the second, etc. If the user agent cannot handle any user-defined cursor, it must use the generic cursor at the end of the list. 
				// P { cursor : url("mything.cur"), url("second.csr"), text; }
        this.cursorType = cursor;
        
        if (viewerMode == Batik) return;
        if (!cursor || cursor == null) return;
        
        // Check to see if this is an Cursor object!
        if (cursor instanceof Cursor)
            this.setAttribute('cursor', 'url(#' + cursor.getId() + ')');
        else
            this.setAttribute('cursor', cursor); // ex. shp.setCursor('crosshair');
    }

SVGNode.prototype.getCursor = function() {
        return this.cursorType;
    }

SVGNode.prototype.setToolTipText = function(text) {
        tp_setToolTipText(text, this);
    }

SVGNode.prototype.changeToolTipText = function(text) {
				// Summary:
				// Change the displayed text by delete the old one and creating a new one.
        tp_disposeToolTipNode();
        tp_setToolTipText(text, this);
    }

SVGNode.prototype.toString = function() {
    return (printNode(this.getNode()));
}
/**
 * Draw2D.svg : SVG Utility Functions
 *
 * @author    Adnan Sagar, PhD <adnan@websemantics.ca>
 * @copyright 2004-2015 Web Semantics, Inc. (http://websemantics.ca)
 * @license   http://www.opensource.org/licenses/mit-license.php MIT
 * @since     8th November 2005
 * @package   websemantics/oea/draw2d.svg/fclasses/svg
 */

/**
 * SVG utility functions:
 *
 * Low-level SVG utility functions used to manipulate SVG nodes
 *  
 */

/**
 * External APIs:
 */

function createSVGNode(nodeType, nodeAttributes, parentNode, namespace) {
				// Summary:
				// Create and return an SVG node.
				// Attach to parent node if given!
        return createDOMNode(nodeType, nodeAttributes, parentNode, namespace);
    }

function createDOMNode(nodeType, nodeAttributes, parentNode, namespace) {
				// Summary:
				// Create and return a DOM node. Attach to parent node if given!
				// Check if parentNode is an object of type NODE [use getNode()]

        if (namespace == undefined || namespace == null) 
        	namespace = "http://www.w3.org/2000/svg";

        // Delete the node if it already exists
        if (nodeAttributes['id']) deleteSVGNodeById(nodeAttributes['id']);

        // Selete ROOT element if parentNode is not given ,.. check if parent node of type Node,..
        if (parentNode == undefined || parentNode == null)
            parentNode = svgDocument.documentElement;
        else
        if (parentNode.getNode) parentNode = parentNode.getNode();

        // Create the SVG node of type nodeType
        //var node = svgDocument.createElement(nodeType);
        var node = svgDocument.createElementNS(namespace, nodeType);

        // Create attributes of the new node
        for (var attribute in nodeAttributes)
            node.setAttribute(attribute, nodeAttributes[attribute]);
        // Attach the node to its parent 
        // (nodeType!="flowRoot") is added to fix a problem with Batik,...flowRoot can not be attached to a parent unless it has all required children,..
        if (nodeType != "flowRoot" && parentNode != undefined && parentNode != null) parentNode.appendChild(node);

        return node;
    }

function createSVGTextNode(text, nodeAttributes, parentNode, nodeType, namespace) {
				// Summary:
				// Create and return an SVG text node. Attach to parent node if given!
        return createDOMTextNode(text, nodeAttributes, parentNode, nodeType, namespace);
    }

function createDOMTextNode(text, nodeAttributes, parentNode, nodeType, namespace) {
				// Summary:
				// Create and return a DOM text node. Attach to parent node if given!
        if (text == undefined || text == null) return false;

        if (nodeType == undefined || nodeType == null) nodeType = "text"; // else, it could be 'tspan'!

        var node = createSVGNode(nodeType, nodeAttributes, parentNode, namespace);

        // Create the text node and attach it,..
        node.appendChild(svgDocument.createTextNode(text));

        return node;
    }

function deleteSVGNode(node) {
    	// Summary:
    	// Delete an SVG node
        
        if (!node || node == null) return false;
            node.parentNode.removeChild(node);
        return true;
    }

function deleteSVGNodeById(id) {
				// Summary:
				// Delete an SVG node. Get node by its SVG id attribute 

        if (!id || id == null) return false;

        return deleteSVGNode(svgDocument.getElementById(id));
    }

function printXMLNode(element, text, spaces) {

    if (element == undefined || element.tagName == undefined) {
        return null;
    }
    if (spaces == undefined) spaces = 0;
    if (text == undefined || text == null) text = "";

    var sInc = "  ";
    var spacesString = "";

    for (var j = 0; j < spaces; j++) spacesString += sInc;

    text += spacesString + "<" + element.tagName;
    if (element.hasAttributes())
        for (var k = 0; k < element.attributes.length; k++) {
            var attr = element.attributes.item(k);
            text += " " + attr.name + "=\"" + attr.value + "\"";
        }
    text += ">\n";

    spaces++;

    var children = element.childNodes;
    for (var i = 0; i < children.length; i++) {
        var child = children.item(i);
        if (child.firstChild && child.firstChild.nodeType == 3)
            text += spacesString + sInc + "<" + child.tagName + ">" + child.firstChild.data + "</" + child.tagName + ">\n";
        else {
            var temp = printXMLNode(child, null, spaces);
            if (temp != null) text += temp;
        }
    }

    spaces--;
    spacesString = "";
    for (var j = 0; j < spaces; j++) spacesString += sInc;
    text += spacesString + "</" + element.tagName + ">\n";

    return text;
}
/**
 * Draw2D.svg : SvgDefs
 *
 * @author    Adnan Sagar, PhD <adnan@websemantics.ca>
 * @copyright 2004-2015 Web Semantics, Inc. (http://websemantics.ca)
 * @license   http://www.opensource.org/licenses/mit-license.php MIT
 * @since     22nd November 2005
 * @package   websemantics/oea/draw2d.svg/fclasses/svg
 */

var defsNode=null;

/**
 * APIs Summary
 *
 * Low-level SVG utility functions used to manipulate Defs node
 * 
 */

function df_createDefs(){
	// Summary:
	// Create a defs node
	defsNode=createSVGNode("defs",{});
}

function df_addToDefs(node){
	// Summary:
	// Add a node to the defs node
	
	// Support of [Node] type (i.e. shapes, graphics, etc)
	if(node.getNode)
		node=node.getNode(); 

	if(defsNode != null && !defsNode.addChild) 
		defsNode.appendChild(node);
	 else 
	 defsNode.addChild(node); // <= does not work with older plug-in (ver 3)
}

/**
 * Draw2D.svg : RectNode
 *
 * @author    Adnan Sagar, PhD <adnan@websemantics.ca>
 * @copyright 2004-2015 Web Semantics, Inc. (http://websemantics.ca)
 * @license   http://www.opensource.org/licenses/mit-license.php MIT
 * @since     8th November 2005
 * @package   websemantics/oea/draw2d.svg/fclasses/graphical
 */

RectNode.prototype = new SVGNode();

function RectNode(x, y, w, h, r, s) {

	    var argv = RectNode.arguments;
	    var argc = RectNode.length;
	    this.className = "RectNode";

        if (argv.length == 0) 
        	this.initRectNode(0, 0, 0, 0, 0, 1);
        else 
        	this.initRectNode(x, y, w, h, r, s);
    }

RectNode.prototype.initRectNode = function(x, y, w, h, r, s) {
        this.initSVGNode();
        this.initRect(x, y, w, h);
        this.setRotate(r);
        this.setScale(s);
    }

RectNode.prototype.onMove = function() {
        return this.transform();
    }

RectNode.prototype.onRotate = function() {
        return this.transform();
    }

RectNode.prototype.onScale = function() {
        return this.transform();
    }

RectNode.prototype.transform = function() {
        this.transformRectNode();
    }

RectNode.prototype.transformRectNode = function() {
    if (this.Node == null) return false;
    this.y = this.y || 0;
    this.x = this.x || 0;
    var attr = " translate(" + this.x + " , " + this.y + ")";

    if (this.r > 0 || this.s != 1) {
        attr += " translate(" + this.xo + " , " + this.yo + ")" +
            " rotate(" + this.r + ")" +
            " scale(" + this.s + ")" +
            " translate(-" + this.xo + " , -" + this.yo + ")";
    }
    this.Node.setAttribute('transform', attr);
    return true;
}
/**
 * Draw2D.svg : Node
 *
 * @author    Adnan Sagar, PhD <adnan@websemantics.ca>
 * @copyright 2004-2015 Web Semantics, Inc. (http://websemantics.ca)
 * @license   http://www.opensource.org/licenses/mit-license.php MIT
 * @since     8th November 2005
 * @package   websemantics/oea/draw2d.svg/fclasses/node
 */

/**
 * Class Node
 *
 */

Node.prototype = new RectNode();

function Node(x, y, w, h, r, s) {
        var argv = Node.arguments;
        var argc = Node.length;
    		this.className = "Node";
				
				// Some would need to set this to false before enable/disable SVG events!
        this.useCapture = true; 

        if (argv.length == 0) 
        	this.initNode(0, 0, 0, 0, 0, 1);
        else 
        	this.initNode(x, y, w, h, r, s);
    }

Node.prototype.initNode = function(x, y, w, h, r, s) {
        this.initRectNode(x, y, w, h, r, s);
        
        // Objects can add internal observers/methods to listen on an event,..
        this.internalEventsListeners = new Array();
        this.internalEventsListeners["mousedown"] = new Array();
        this.internalEventsListeners["mouseup"] = new Array();
        this.internalEventsListeners["mouseout"] = new Array();
        this.internalEventsListeners["mouseover"] = new Array();
        this.internalEventsListeners["mousemove"] = new Array();
        this.internalEventsListeners["clcik"] = new Array();
        this.internalEventsListeners["keydown"] = new Array();
        this.internalEventsListeners["keyup"] = new Array();
        this.internalEventsListeners["keypress"] = new Array();
    }

Node.prototype.addInternalEventListener = function(eventType, method) {
				// Summary:
				// 
				// Since no real inheritance is supported in Javascript, 
				// those method will allow to have multiple events handlers
				// for any subclass of type Node (this) [each subclass will have
				// its own events handling methods for any eventType],..
				// 
				// All events are local to the object ['real' svg event listeners 
				// attached to this.Node attribute]  
				
        var iel = this.internalEventsListeners[eventType];
        var last = iel.length;
        // Check if this is the first listener to the event then add 'real' svg event listener to DOM 
        if (last == 0) this.addEventListener(eventType, this, this.useCapture);
        iel[last] = method;
    }

Node.prototype.removeInternalEventListener = function(eventType, method) {
        
        var iel = this.internalEventsListeners[eventType];
        
        // remove the 'real' svg event listener if there is no more internal listeners!
        var noMorelisteners = true;
        for (i in iel) {
            if (iel[i] == method) iel[i] = null;
            if (iel[i] != null) noMorelisteners = false;
        }
        if (noMorelisteners) this.removeEventListener(eventType, this, this.useCapture);
    }

Node.prototype.addGlobalEventListener = function(eventType, callbackMethod) {
				// Summary:
				// 
				// The object can listen to all global events through the Desktop
				// For instance if we add a listener to the 'global' mousemove event
				// we will be acknowledged whenever the mouse moves, supplied with the 
				// mouse location and other information as long as the mouse pointer
				// is on top of the svg document.mouseout event will be triggered every
				// time the mouse is out of an svg node [filled area].
				// 
				// * Subclasses of this (Node) could only have one Global Event Listener
				// unlike Internal Listener mechanism!! [that may change in future]
				// 
				// * Attribute id has to be set before using this method,..
        ds_addEventListener(this, eventType, callbackMethod);
    }

Node.prototype.removeGlobalEventListener = function(eventType) {
        ds_removeEventListener(this, eventType);
    }
    
Node.prototype.handleEvent = function(evt) {
        // evt.stopPropagation(); // <--- Stop bubbling!!
        // example: iel = internalEventsListeners["mousedown"]
        var iel = this.internalEventsListeners[evt.type];
        // iel[counter] is the cell that saves the method name => this[""method"](evt)
        for (i in iel)
            if (iel[i] && iel[i] != null) this[iel[i]](evt);
    }

Node.prototype.enableSVGMouseEvents = function(up, down, move, over, out, click) {
				// Warning:
				// [DON'T USE] use addInternalEventListener instead 
        if (up) this.addEventListener("mouseup", this, this.useCapture);
        if (down) this.addEventListener("mousedown", this, this.useCapture);
        if (move) this.addEventListener("mousemove", this, this.useCapture);
        if (over) this.addEventListener("mouseover", this, this.useCapture);
        if (out) this.addEventListener("mouseout", this, this.useCapture);
        if (click) this.addEventListener("click", this, this.useCapture);
    }

Node.prototype.disableSVGMouseEvents = function(up, down, move, over, out, click) {
				// Warning:
				// [DON'T USE] use addInternalEventListener instead 
        if (up) this.removeEventListener("mouseup", this, this.useCapture);
        if (down) this.removeEventListener("mousedown", this, this.useCapture);
        if (move) this.removeEventListener("mousemove", this, this.useCapture);
        if (over) this.removeEventListener("mouseover", this, this.useCapture);
        if (out) this.removeEventListener("mouseout", this, this.useCapture);
        if (click) this.removeEventListener("click", this, this.useCapture);
    }

Node.prototype.enableSVGKeyEvents = function(up, down, press) {
				// Warning:
				// [DON'T USE] use addInternalEventListener instead 

        // Key Events are not supported by Adobe Plugin
        if (up) this.addEventListener("keyup", this, this.useCapture);
        if (down) this.addEventListener("keydown", this, this.useCapture);
        if (press) this.addEventListener("keypress", this, this.useCapture);
    }

Node.prototype.disableSVGKeyEvents = function(up, down, press) {
				// Warning:
				// [DON'T USE] use removeInternalEventListener instead

        // Key Events are not supported by Adobe Plugin
        if (up) this.removeEventListener("keyup", this, this.useCapture);
        if (down) this.removeEventListener("keydown", this, this.useCapture);
        if (press) this.removeEventListener("keypress", this, this.useCapture);
    }

Node.prototype.enableAllMouseEvents = function() {
				// Warning:
				// [DON'T USE]
        this.enableSVGMouseEvents(true, true, true, true, true, true);
    }
    
Node.prototype.disableAllMouseEvents = function() {
				// Warning:
				// [DON'T USE]
		    this.disableSVGMouseEvents(true, true, true, true, true, true);
		}
/**
 * Draw2D.svg : Layer
 *
 * @author    Adnan Sagar, PhD <adnan@websemantics.ca>
 * @copyright 2004-2015 Web Semantics, Inc. (http://websemantics.ca)
 * @license   http://www.opensource.org/licenses/mit-license.php MIT
 * @since     10th November 2004
 * @package   websemantics/oea/draw2d.svg
 */

/**
 * Global Variables
 */

var common_layer_id = "layer_";
var layers_counter = 0;
var layer_Register=new Array();

// This is the default layer to be used by everyone (if not otherwise stated) !
var defualt_layer = null; 

/**
 * External Layer APIs :
 */

function ly_createLayer(page,zOrder,layerId){return (new Layer(page,zOrder,layerId));}

function ly_createDefualtLayer(){defualt_layer=ly_createLayer();}

function ly_getDefualtLayer(){return defualt_layer;}

/**
 * Internal Layer APIs :
 */

function ly_int_getLayerId(){return (common_layer_id+(layers_counter++));}

function ly_int_registerLayer(layer){layer_Register[layer.id]=layer;}

/**
 * Class Layer.
 * 
 * This class serves as a host to any graphical objects
 * (e.g. Graphics contextes, GUI component, etc).
 * It has a z-order that define its relative location 
 * on the z coordinate   
 */

function Layer(page, zOrder, layerId) {
        var argv = Layer.arguments;
        var argc = Layer.length;
    	  this.className = "Layer";

        if (argv.length > 0)
        	this.initLayer(page, zOrder, layerId);
    }

Layer.prototype.initLayer = function(page, zOrder, layerId) {
        if (!page || page == null) this.page = pg_getDefualtPage();
        else this.page = page;
        this.setZOrder(zOrder);
        if (!layerId || layerId == null) this.id = ly_int_getLayerId();
        else this.id = layerId;
        ly_int_registerLayer(this);
        this.create();
    }

Layer.prototype.create = function() {
				// Summary:
				// Create the SVG 'g' element for the Layer object
				
        // Do not redraw if the SVG node for this object exists
        if (svgDocument.getElementById(this.getId()) != null) return false;
        this.Node = createSVGNode("g", {
            id: this.getId()
        }, this.getPage().getNode());
        
        //this.Node=createSVGNode("g",{id: this.getId()}); 
    }

Layer.prototype.addGraphics = function(/* Node or svgNode*/ node) {
        this.addChild(node);
    }

Layer.prototype.addChild = function(/* Node or svgNode*/ node) {
        if (node.Node) node = node.Node;
        this.Node.appendChild(node);
    }

Layer.prototype.setZOrder = function(zOrder) {
        if (!zOrder || zOrder == null) zOrder = 0;
        this.zOrder = zOrder;
    }

Layer.prototype.getPage = function() {
        return this.page;
    }

Layer.prototype.getNode = function() {
        return this.Node;
    }

Layer.prototype.getId = function() {
        return this.id;
    }

Layer.prototype.show = function() {
        this.Node.setAttribute('display', "inline");
    }

Layer.prototype.hide = function() {
        this.Node.setAttribute('display', "none");
    }

Layer.prototype.isShown = function() {
        return (this.Node.getAttribute('display') == "inline");
    }

Layer.prototype.isHidden = function() {
    return (this.Node.getAttribute('display') == "none");
}
/**
 * Draw2D.svg : Page
 *
 * @author    Adnan Sagar, PhD <adnan@websemantics.ca>
 * @copyright 2004-2015 Web Semantics, Inc. (http://websemantics.ca)
 * @license   http://www.opensource.org/licenses/mit-license.php MIT
 * @since     10th November 2004 
 * @package   websemantics/oea/draw2d.svg
 */

/**
 * Global Variables
 */

var page_counter = 0;
var common_page_id = "page_";
var page_Register=new Array();

// This is the default page to be used by everything (if not otherwise stated)!
var defualt_page = null; 

/**
 * Page External APIS:
 */

function pg_createPage(pageNumber, pageId) {
        return (new Page(pageNumber, pageId));
    }

function pg_createDefualtPage() {
        defualt_page = pg_createPage();
    }

function pg_getDefualtPage() {
        return defualt_page;
    }

/**
 * Page Internal APIS:
 */

function pg_int_getPageId() {
				// Summary:
				// pg_getPageId: returns a unique Id for a Page object 
        return (common_page_id + (page_counter++));
    }

function pg_int_registerPage(page) {
				// Summary:
				// pg_registerPage: save Page in an array 
        page_Register[page.id] = page;
    }

/**
 * Class Page
 *
 * This class serve as host to layers
 * 
 */

function Page(pageNumber, pageId) {
        var argv = Page.arguments;
        var argc = Page.length;
        this.className = "Page";

        if (argv.length > 0)
            this.initPage(pageNumber, pageId);
    }

Page.prototype.initPage = function(pageNumber, pageId) {
        if (pageNumber) this.pageNumber = pageNumber;
        else this.pageNumber = 0;
        if (!pageId || pageId == null) this.id = pg_int_getPageId();
        else this.id = pageId;
        pg_int_registerPage(this);
        //this.create();
    }

Page.prototype.create = function() {
				// Summary:
				// Create the SVG 'g' element for the Page object
				// Returns, (this) Page if successful or 'false' if not successful 
	
        // Do not redraw if the SVG node for this object exists
        if (svgDocument.getElementById(this.getId()) != null) return false;
        this.Node = createSVGNode("g", {
            id: this.getId()
        });
    }

Page.prototype.setVisibility = function(/* true or false*/flag) {
        if (flag)
            this.Node.setAttribute('visibility', "show");
        else
            this.Node.setAttribute('visibility', "hidden");
    }

Page.prototype.getNode = function() {
        return this.Node;
    }

Page.prototype.getId = function() {
		    return this.id;
		}
/**
 * Draw2D.svg : Desktop
 *
 * @author    Adnan Sagar, PhD <adnan@websemantics.ca>
 * @copyright 2004-2015 Web Semantics, Inc. (http://websemantics.ca)
 * @license   http://www.opensource.org/licenses/mit-license.php MIT
 * @since     23rd Sept 2004
 * @package   websemantics/oea/draw2d.svg
 */

var desktop;

/*
 * Internal Desktop APIs:
 *
 */

function ds_initDesktop() {
        desktop = new Desktop();
    }

function ds_getDesktop() {
        return desktop;
    }

function ds_addEventListener(node, eventType, callback) { 
        if (desktop != null)
            desktop.registerNode(node, eventType, callback);
    }

function ds_removeEventListener(node, eventType) {
        if (desktop != null)
            desktop.unregisterNode(node, eventType);
    }

function cv_removeAllEventListeners(node) {
        if (desktop != null)
            desktop.unregisterNodeFromAll(node);
    }

function ds_handleKey(evt) {
    // Summary:
    // Because key listeners do not work with AVS then we used the attributes approach
    // then this function routes it back to the desktop object for processing.
    desktop.processEvents(evt);
}

/**
 * Class Desktop
 * 
 * @param int x Coordinate X
 * @param int y Coordinate Y
 * @param Shape shape 
 */

function Desktop() {
        var argv = Desktop.arguments;
        var argc = Desktop.length;
        this.className = "Desktop";

        /* object */
        this.draggedObject = null;
        this.init();
    }

Desktop.prototype.init = function() {
        // For registered objects to route out global events,.. [it only makes sence to route out mousemove event to other objects since it's useful to tract the mouse while it is moving over the svg document]
        /* array */
        this.eventListeners = new Array();
        /* Vector */
        this.eventListeners["mousedown"] = new Vector();
        /* Vector */
        this.eventListeners["mouseup"] = new Vector();
        /* Vector */
        this.eventListeners["click"] = new Vector();
        /* Vector */
        this.eventListeners["mouseout"] = new Vector();
        /* Vector */
        this.eventListeners["mouseover"] = new Vector();
        /* Vector */
        this.eventListeners["mousemove"] = new Vector();
        /* Vector */
        this.eventListeners["keydown"] = new Vector();
        /* Vector */
        this.eventListeners["keyup"] = new Vector();
        /* Vector */
        this.eventListeners["keypress"] = new Vector();
        // The Graphics Object of the Desktop
        this.g = new Graphics(-32767, -32767, 65535, 65535, "desktop");
        //this.g=new Graphics(0,0,innerWidth,innerHeight,"desktop");
        this.g.setBackground("white");
        var svg = svgDocument.documentElement;
        //
        // Enable svg events to the graphics object of the desktop
        //
        // Phases of SVG mouse events:
        // ===========================
        // Phase 1:  If the last argument of addEventListener is TRUE the event handler 
        //           is set for the capturing phase [ from the root of the document down to the target]
        // Phase 3:  if it is set to FALSE, the event handler is set for the bubbling 
        //           phase [ form the target up to the document root]
        // 
        // More info : http://www.quirksmode.org/js/events_order.html
        svg.addEventListener("mousedown", this, true);
        svg.addEventListener("mouseover", this, true);
        svg.addEventListener("mouseup", this, true);
        svg.addEventListener("click", this, true);
        svg.addEventListener("mouseout", this, true);
        svg.addEventListener("mousemove", this, true);
        if (viewerMode == ASV) { // Adobe mode
            svg.setAttribute("onkeydown", "ds_handleKey(evt);");
            svg.setAttribute("onkeyup", "ds_handleKey(evt);");
            svg.setAttribute("onkeypress", "ds_handleKey(evt);");
        } else { // Batik mode
            svg.addEventListener("keydown", this, true);
            svg.addEventListener("keyup", this, true);
            svg.addEventListener("keypress", this, true);
        }
        this.processEvents = this.defaultProcessEvents;
    }

Desktop.prototype.getGraphics = function() {
        if (this.g && this.g != null) return this.g;
        return null;
    }

Desktop.prototype.setColor = function(color) {
        this.g.setBackground(color);
    }

Desktop.prototype.setVisibility = function(flag) {
        this.g.setVisibility(flag);
    }

Desktop.prototype.registerNode = function(node, eventType, callback) {
  // Summary:
  // Register Node: Allows Javascript object to recieve Desktop events,..

        if (eventType != "click" && eventType != "mousedown" && eventType != "mouseover" && eventType != "mouseup" && eventType != "mouseout" && eventType != "mousemove" && eventType != "keydown" && eventType != "keyup" && eventType != "keypress") return false;
        this.eventListeners[eventType].addElement(new Node_Callback(node, callback));
        return true;
    }

Desktop.prototype.unregisterNodeFromAll = function(node) {
  // Summary:
  // Unregister Node from all events
        this.unregisterNode(node, "click");
        this.unregisterNode(node, "mousedown");
        this.unregisterNode(node, "mouseover");
        this.unregisterNode(node, "mouseup");
        this.unregisterNode(node, "mouseout");
        this.unregisterNode(node, "mousemove");
        this.unregisterNode(node, "keydown");
        this.unregisterNode(node, "keyup");
        this.unregisterNode(node, "keypress");
    }

Desktop.prototype.unregisterNode = function(node, eventType) {
  // Summary:
  // Unregister Node : Stop Javascript object receiving events from the Desktop

        if (eventType != "click" && eventType != "mousedown" && eventType != "mouseover" && eventType != "mouseup" && eventType != "mouseout" && eventType != "mousemove" && eventType != "keydown" && eventType != "keyup" && eventType != "keypress") return false;

        if (this.eventListeners != null) {
            var k = new Enumerator(this.eventListeners[eventType]);
            while (k.hasMoreElements()) {
                var nc = k.nextElement();
                if (nc.node == node) this.eventListeners[eventType].removeElement(nc);
            }
        }
        return true;
    }

Desktop.prototype.handleEvent = function(evt) {
        this.processEvents(evt);
    }

Desktop.prototype.processEvents = function(evt) {}

Desktop.prototype.defaultProcessEvents = function(evt) {

        var v = this.eventListeners[evt.type];
        var s = v.size();

        for (var i = 0; i < s; i++) {
            var nc = v.elementAt(i);
            nc.invokeCallback(evt);
        }

    }

Desktop.prototype.draggModeProcessEvents = function(evt) {
        evt.stopPropagation();
        this.draggedObject.dragModeEventHandler(evt);
    }

Desktop.prototype.startDragMode = function( /* object */ obj) {
        var svg = svgDocument.documentElement;
        // Listen only to mousemove and mouseup
        svg.removeEventListener("mousedown", this, true);
        svg.removeEventListener("mouseover", this, true);
        svg.removeEventListener("mouseout", this, true);
        svg.removeEventListener("click", this, true);
        //
        this.processEvents = this.draggModeProcessEvents;
        this.draggedObject = obj;
    }

Desktop.prototype.endDragMode = function() {
        var svg = svgDocument.documentElement;
        // Listen to all 
        svg.addEventListener("mousedown", this, true);
        svg.addEventListener("mouseover", this, true);
        svg.addEventListener("mouseout", this, true);
        svg.addEventListener("click", this, true);
        //
        this.processEvents = this.defaultProcessEvents;
        this.draggedObject = null;
    }

Desktop.prototype.toString = function() {
        return "svgDraw2D:Desktop";
    }

/**
 * Class Node_Callback
 *
 * Used to save pair of node / callback function 
 *
 * @param Dom node
 * @param Function callback
 */

function Node_Callback(node, callback) {
        this.node = node;
        this.callback = callback;
    }

Node_Callback.prototype.invokeCallback = function(evt) {
        this.node[this.callback](evt);
    }

Node_Callback.prototype.toString = function() {
        return "(Node:" + this.node + ", Callback:" + this.callback + ")";
    }

/**
 * Draw2D.svg : Font
 *
 * @author    Adnan Sagar, PhD <adnan@websemantics.ca>
 * @copyright 2004-2015 Web Semantics, Inc. (http://websemantics.ca)
 * @license   http://www.opensource.org/licenses/mit-license.php MIT
 * @since     4th Septemebr 2002
 * @package   websemantics/oea/draw2d.svg
 */

function Font(name, style, size) {
        
        var argv = Font.arguments;
        var argc = Font.length;
        this.className = "Font";

        this.PLAIN = 0;
        this.BOLD = 1;
        this.ITALIC = 2;

        if (argv.length > 0)
        	this.initFont(name, style, size);
    }

Font.prototype.initFont = function(name, style, size) {
        if (name == undefined) name = "Helvetica";
        if (style == undefined) style = "Normal";
        if (size == undefined) size = "16pt";
        this.setName(name);
        this.setStyle(style);
        this.setSize(size);
    }

Font.prototype.getSize = function() {
        return this.size;
    }

Font.prototype.getSizeValue = function() {
        var ind = this.size.indexOf('pt');
        if (ind != -1) return parseFloat(this.size.substring(0, ind));
        return this.size;
    }

Font.prototype.getStyle = function() {
        return this.style;
    }

Font.prototype.getNamedStyle = function() {
        if (this.style == this.PLAIN || this.style == "normal") return "Normal";
        if (this.style == this.BOLD || this.style == "bold") return "Bold";
        if (this.style == this.ITALIC || this.style == "italic") return "Italic";
        return "Normal";
    }

Font.prototype.getName = function() {
        return this.name;
    }

Font.prototype.setSize = function(size) {
        this.size = size;
    }

Font.prototype.setStyle = function(style) {
        this.style = style;
    }

Font.prototype.setName = function(name) {
        this.name = name;
    }

Font.prototype.getFont = function() {
        return this;
    }

Font.prototype.setFont = function(font) {
        this.init(font.name, font.style, font.size);
    }

Font.prototype.getFontMetrics = function() {
        return (new FontMetrics(this));
    }

Font.prototype.clone = function( /* String */ format) {
        return new Font(this.name, this.Style, this.size);
    }

Font.prototype.toString = function() {
    return "Name = " + this.name + ", Style = " + this.getNamedStyle() + ", Size = " + this.size;
}
/**
 * Draw2D.svg : FontMetrics
 *
 * @author    Adnan Sagar, PhD <adnan@websemantics.ca>
 * @copyright 2004-2015 Web Semantics, Inc. (http://websemantics.ca)
 * @license   http://www.opensource.org/licenses/mit-license.php MIT
 * @since     4th Septemebr 2002
 * @package   websemantics/oea/draw2d.svg
 */

function FontMetrics(font) {

        var argv = FontMetrics.arguments;
        var argc = FontMetrics.length;
        this.className = "FontMetrics";

        // From pt to px [ by Experiments ;-) ]
        this.pt2px = 1.60; 

        // Ratio between the height and baseline!
        this.h2bl = 0.80; 
        
        if (argv.length > 0)
        	this.initFontMetrics(font);
    }

FontMetrics.prototype.initFontMetrics = function(font) {
        this.setFont(font);
    }

FontMetrics.prototype.setFont = function(font) {
        this.font = font;
    }

FontMetrics.prototype.getAscent = function() {
        return 0;
    }

FontMetrics.prototype.getDescent = function() {
        return 0;
    }

FontMetrics.prototype.getLeading = function() {
        return 0;
    }

FontMetrics.prototype.getHeight = function() {
        return this.font.getSizeValue() * this.pt2px;
    }

FontMetrics.prototype.getBaseline = function() {
        return this.getHeight() * this.h2bl;
    }

FontMetrics.prototype.getFontMetrics = function() {
        return this;
    }

FontMetrics.prototype.getFontMetrics = function(font) {
        return new FontMetrics(font);
    }

FontMetrics.prototype.getStringWidth = function(text) {
        var node = createSVGTextNode(text, {
            x: 0,
            y: 0,
            'font-family': this.font.getName(),
            'font-style': this.font.getStyle(),
            'font-size': this.font.getSize(),
            fill: 'none'
        });
        var len = node.getComputedTextLength(); // [does not work with avs 6 ]
        deleteSVGNode(node);
        return len;
    }

FontMetrics.prototype.toString = function() {
    return "FontMetrics : font [ " + this.font.toString() + " ]";
}
/**
 * Draw2D.svg : Graphics
 *
 * @author    Adnan Sagar, PhD <adnan@websemantics.ca>
 * @copyright 2004-2015 Web Semantics, Inc. (http://websemantics.ca)
 * @license   http://www.opensource.org/licenses/mit-license.php MIT
 * @since     4th Septemebr 2002 -> 5th November 2004 -> 18th July 2005
 * @package   websemantics/oea/draw2d.svg
 */

/**
 * Global Variables
 */

var common_graphics_id = "Graphics_";
var graphics_counter = 0;

var defaultWidth = 400 ;
var defaultHeight = 400;

/**
 * Graphics External APIs
 */

function createGraphics(x,y,w,h,id,layer){return (new Graphics(x,y,w,h,id,layer));}

function getGraphicsId(){return (common_graphics_id+(graphics_counter++));}

/**
 * Class Graphics Context.
 * 
 * This class work similarly to Windows Device Context
 */

Graphics.prototype= new Node(); 

function Graphics(x, y, w, h, id, layer) {
        var argv = Graphics.arguments;
        var argc = Graphics.length;
        
        this.id = null;
        this.font = null;
        this.color = null;
        this.strokeWidth = null;
        this.backgroundColor = null;
        this.strokeColor = null;
        this.backgroundRect = null;
        this.clipRect = null;
        this.clipNode = null;
        
        // Call initilize ,.. 
        if (argv.length == 0)
            this.initGraphics(0, 0, defaultWidth, defaultHeight, null, null);
        else this.initGraphics(x, y, w, h, id, layer);
    }

Graphics.prototype.initGraphics = function(x, y, w, h, id, layer) {
        if (!id || id == null) 
          this.id = getGraphicsId();
        else this.id = id;

        this.initNode(x, y, w, h, 0, 1);
        this.setOriginToCenter();
        
        // The element in the SVG document that has this object as a child!!!
        if (!layer || layer == null) this.layer = ly_getDefualtLayer();
        else this.layer = layer;
        
        // initialise color, backgroundColor, font and other stuff 
        this.setColor("black");
        this.setStrokeColor(null);
        this.setStrokeWidth(0);
        this.font = new Font("Helvetica", "normal", "10pt");
        this.create();
    }

Graphics.prototype.create = function() {
        // Summary:
        // Create the SVG 'g' element for the Graphics context object 

        if (svgDocument.getElementById(this.id) != null) return false;
        this.Node = createSVGNode("g", {
            id: this.id
        }, this.layer);
        this.translate(this.x, this.y);
    }

Graphics.prototype.setColor = function(color) {
        this.color = color;
    }

Graphics.prototype.getColor = function() {
        if (this.color == null) return "none";
        return this.color;
    }

Graphics.prototype.setStrokeColor = function(strokeColor) {
        this.strokeColor = strokeColor;
    }

Graphics.prototype.getStrokeColor = function() {
        var strokeColor = this.strokeColor;
        if (this.strokeColor == null) strokeColor = "none";
        return strokeColor;
    }

Graphics.prototype.setStrokeWidth = function(stroke) {
        this.strokeWidth = stroke;
    }

Graphics.prototype.getStrokeWidth = function() {
        return this.strokeWidth;
    }

Graphics.prototype.setFont = function(font) {
        this.font = font;
    }

Graphics.prototype.getFont = function() {
        return this.font;
    }

Graphics.prototype.getFontMetrics = function() {
        return (new FontMetrics(this.font));
    }

Graphics.prototype.addGraphics = function(g) {
        this.addChild(g.getNode());
    }

Graphics.prototype.drawLine = function(x1, y1, x2, y2) {
        return (new Line(x1, y1, x2, y2, this));
    }

Graphics.prototype.drawRect = function(x, y, w, h) {
        return (new Rectangle(x, y, w, h, this));
    }

Graphics.prototype.drawRoundRect = function(x, y, w, h, rx, ry) {
        return (new RRectangle(x, y, w, h, rx, ry, this));
    }

Graphics.prototype.drawCircle = function(x, y, r) {
        return (new Circle(x, y, r, this));
    }

Graphics.prototype.drawOval = function(x, y, rx, ry) {
        return (new Oval(x, y, rx, ry, this));
    }

Graphics.prototype.drawPath = function(x, y, d) {
        return (new Path(x, y, d, this));
    }

Graphics.prototype.drawPolygon = function(x, y, xx, yy) {
        return (new Polygon(x, y, xx, yy, this));
    }

Graphics.prototype.drawImage = function(x, y, w, h, path) {
        return (new Image(x, y, w, h, path, this));
    }

Graphics.prototype.drawText = function(x, y, string, nodeType, parentSvgNode) {
        return (new Text(x, y, string, this, nodeType, parentSvgNode));
    }

Graphics.prototype.drawTextView = function(x, y, w, h, string, regionShape) {
        if (regionShape == undefined) regionShape = null;
        return (new TextView(x, y, w, h, string, regionShape, this));
    }

Graphics.prototype.drawWinBorder = function(x, y, w, h) {
        return (new WinBorder(x, y, w, h, this));
    }

Graphics.prototype.drawStepBorder = function(x, y, w, h) {
        return (new StepBorder(x, y, w, h, this));
    }

Graphics.prototype.drawBoxBorder = function(x, y, w, h, depth) {
        return (new BoxBorder(x, y, w, h, depth, this));
    }

Graphics.prototype.removeBackground = function() {
        if (this.backgroundRect != null) {
            this.backgroundRect.dispose();
            this.backgroundRect = null;
        }
    }

Graphics.prototype.setBackground = function(backgroundColor) {
        this.backgroundColor = backgroundColor;
        if (this.backgroundRect == null) {
            this.backgroundRect = this.drawRect(0, 0, this.w, this.h);
            this.backgroundRect.setId(this.id + "_BackgroundColor");
        }
        this.backgroundRect.setColor(this.getBackground());
    }

Graphics.prototype.getBackground = function() {
        // return 'none' if backgroundColor color = null 
        
        if (this.backgroundColor == null) return "none";
        else return this.backgroundColor;
    }

Graphics.prototype.setClipOn = function() {
        if (this.clipRect == null) {
            this.clipRect = this.drawRect(0, 0, this.w, this.h, this);
            this.clipRect.setId(this.id + "-clip-rect");
        }
        this.clipNode = createSVGNode("clipPath", {
            id: this.id + "-clip"
        });
        this.clipNode.appendChild(this.clipRect.getNode());
        this.setAttribute('clip-path', 'url(#' + this.id + '-clip)');
    }

Graphics.prototype.setClipOff = function() {
        this.removeAttribute('clip-path');
        deleteSVGNode(this.clipNode);
        this.clipRect.dispose();
        this.clipRect = null;
        this.clipNode = null;
    }

Graphics.prototype.onResize = function() {
        if (this.clipRect != null) this.clipRect.setSize(this.w, this.h);
        if (this.backgroundRect != null) this.backgroundRect.setSize(this.w, this.h);
    }

Graphics.prototype.clear = function() {
        // Summary:
        // Clear all nodes (remove)
        var children = this.getNode().childNodes;
        for (var i = 0; i < children.length; i++) deleteSVGNode(children.item(i));
    }

Graphics.prototype.oldClear = function() {
    this.setId("graphics_temp");
    deleteSVGNode(this.Node);
    this.create();
}

/**
 * Draw2D.svg : Shape
 *
 * @author    Adnan Sagar, PhD <adnan@websemantics.ca>
 * @copyright 2004-2015 Web Semantics, Inc. (http://websemantics.ca)
 * @license   http://www.opensource.org/licenses/mit-license.php MIT
 * @since     5th November 2005
 * @package   websemantics/oea/draw2d.svg/shapes
 */

Shape.prototype = new Node();

function Shape() {
        var argv = Shape.arguments;
        var argc = Shape.length;
        this.className = "Shape";

        this.initShape();
    }

Shape.prototype.initShape = function() {
        this.color = null;
        this.strokeColor = null;
        this.strokeWidth = null;
    }

Shape.prototype.copyProperties = function(graphics) {
				// Summary:
				// Copy graphics context color, strokeColor and strokeWidth 
				// properties to this object 
        this.setColor(graphics.getColor());
        this.setStrokeColor(graphics.getStrokeColor());
        this.setStrokeWidth(graphics.getStrokeWidth());
    }

Shape.prototype.setColor = function(color) {
        this.color = color;
        this.setAttribute('fill', this.getColor());
    }

Shape.prototype.getColor = function() {
        if (this.color == null) return "none";
        return this.color;
    }

Shape.prototype.setStrokeColor = function(color) {
        this.strokeColor = color;
        this.setAttribute('stroke', this.getStrokeColor());
    }

Shape.prototype.getStrokeColor = function() {
        if (this.strokeColor == null) return "none";
        return this.strokeColor;
    }

Shape.prototype.setStrokeWidth = function(strokeWidth) {
        this.strokeWidth = strokeWidth;
        this.setAttribute('stroke-width', this.getStrokeWidth());
    }

Shape.prototype.getStrokeWidth = function() {
    return this.strokeWidth;
}

/**
 * Draw2D.svg : Line
 *
 * @author    Adnan Sagar, PhD <adnan@websemantics.ca>
 * @copyright 2004-2015 Web Semantics, Inc. (http://websemantics.ca)
 * @license   http://www.opensource.org/licenses/mit-license.php MIT
 * @since     25th November 2005
 * @package   websemantics/oea/draw2d.svg/shapes
 */
Line.prototype = new Shape();

function Line(x1, y1, x2, y2, graphics) {
        var argv = Line.arguments;
        var argc = Line.length;
        this.className = "Line";

        if (argv.length > 0)
        	this.initLine(x1, y1, x2, y2, graphics);
    }

Line.prototype.initLine = function(x1, y1, x2, y2, graphics) {
        this.setPoint1(x1, y1);
        this.setPoint2(x2, y2);
        this.copyProperties(graphics);
        this.create(graphics);
    }

Line.prototype.create = function(graphics) {
        this.Node = createSVGNode("line", {
            x1: 0,
            y1: 0,
            x2: 0,
            y2: 0,
            'fill': this.getColor(),
            stroke: this.getStrokeColor(),
            'stroke-width': this.getStrokeWidth()
        }, graphics.getNode());
        this.update();
    }

Line.prototype.update = function() {
    this.setAttribute("x2", this.x2 - this.x);
    this.setAttribute("y2", this.y2 - this.y);
    this.transform();
}

Line.prototype.setPoint1 = function(/* Point or int */ x1, y1) {
        
        if (x1 instanceof Point) {
            var p = x1;
            this.setPoint1(p.x, p.y);
            return;
        }

        this.setCoord(x1, y1);
        this.update();
    }

Line.prototype.setPoint2 = function(/* Point or int */ x2, y2) {
        if (x2 instanceof Point) {
            var p = x2;
            this.setPoint2(p.x, p.y);
            return;
        }
        this.x2 = x2;
        this.y2 = y2;
        this.update();
    }

Line.prototype.onResize = function() {

}

/**
 * Draw2D.svg : Oval
 *
 * @author    Adnan Sagar, PhD <adnan@websemantics.ca>
 * @copyright 2004-2015 Web Semantics, Inc. (http://websemantics.ca)
 * @license   http://www.opensource.org/licenses/mit-license.php MIT
 * @since     8th November 2005
 * @package   websemantics/oea/draw2d.svg/shapes
 */

Oval.prototype = new Shape();

function Oval(x, y, rx, ry, graphics) {
        var argv = Oval.arguments;
        var argc = Oval.length;
        this.className = "Oval";

        this.radiusX = 0;
        this.radiusY = 0;
        
        if (argv.length > 0)
        	this.initOval(x, y, rx, ry, graphics);
    }

Oval.prototype.initOval = function(x, y, rx, ry, graphics) {
        this.initNode(x, y, rx * 2, ry * 2, 0, 1);
        this.setRadius(rx, ry);
        this.copyProperties(graphics);
        this.create(graphics);
    }

Oval.prototype.create = function(graphics) {
        // cx and cy attributes of 'circle' are ignored and 'transform' is used insteade 
        this.Node = createSVGNode("ellipse", {
            cx: 0,
            cy: 0,
            rx: this.radiusX,
            ry: this.radiusY,
            'fill': this.getColor(),
            stroke: this.getStrokeColor(),
            'stroke-width': this.strokeWidth
        }, graphics.getNode());
        this.transform();
    }

Oval.prototype.setRadius = function(rx, ry) {
        this.radiusX = rx;
        this.radiusY = ry;
        this.setAttribute("rx", this.radiusX);
        this.setAttribute("ry", this.radiusY);
        this.transform();
    }

Oval.prototype.getRadius = function() {
        return (new Point(this.getAttribute("rx"), this.getAttribute("ry")));
    }

Oval.prototype.onResize = function() {
        this.setRadius(this.w / 2, this.h / 2);
    }

Oval.prototype.onMove = function() {
        return this.transform();
    }

Oval.prototype.transformRectNode = function() {
        if (this.Node == null) return false;
        this.Node.setAttribute('transform', " translate(" + (this.x + this.radiusX) + " , " + (this.y + this.radiusY) + ")" +
            " translate(" + this.xo + " , " + this.yo + ")" +
            " rotate(" + this.r + ")" +
            " scale(" + this.s + ")" +
            " translate(-" + this.xo + " , -" + this.yo + ")");
        return true;
    }

Oval.prototype.clone = function( /* */ parent) {
    var oval = new Oval(this.x, this.y, this.radiusX, this.radiusY, parent);
    oval.copyProperties(this);
    return oval;
}

/**
 * Draw2D.svg : Circle
 *
 * @author    Adnan Sagar, PhD <adnan@websemantics.ca>
 * @copyright 2004-2015 Web Semantics, Inc. (http://websemantics.ca)
 * @license   http://www.opensource.org/licenses/mit-license.php MIT
 * @since     8th November 2005
 * @package   websemantics/oea/draw2d.svg/shapes
 */
Circle.prototype = new Shape();

function Circle(x, y, r, graphics) {
        var argv = Circle.arguments;
        var argc = Circle.length;
        this.className = "Circle";

        this.radius = 0;

        if (argv.length > 0)
            this.initCircle(x, y, r, graphics);
    }

Circle.prototype.initCircle = function(x, y, r, graphics) {
    this.initNode(x, y, r * 2, r * 2, 0, 1);
    this.setRadius(r);
    this.copyProperties(graphics);
    this.create(graphics);
}

Circle.prototype.create = function(graphics) {
        // cx and cy attributes of 'circle' are ignored and 'transform' is used insteade 
        this.Node = createSVGNode("circle", {
            cx: 0,
            cy: 0,
            r: this.radius,
            'fill': this.getColor(),
            stroke: this.getStrokeColor(),
            'stroke-width': this.getStrokeWidth()
        }, graphics.getNode());
        this.transform();
    }

Circle.prototype.setRadius = function(r) {
        this.radius = r;
        this.setAttribute("r", this.radius);
        this.transform();
    }

Circle.prototype.onResize = function() {
        if (this.w > this.h) this.setRadius(this.w / 2);
        else this.setRadius(this.h / 2);
    }

Circle.prototype.transformRectNode = function() {
    if (this.Node == null) return false;
    this.Node.setAttribute('transform', " translate(" + (this.x + this.radius) + " , " + (this.y + this.radius) + ")" +
        " translate(" + this.xo + " , " + this.yo + ")" +
        " rotate(" + this.r + ")" +
        " scale(" + this.s + ")" +
        " translate(-" + this.xo + " , -" + this.yo + ")");
    return true;
}

/**
 * Draw2D.svg : Polygon
 *
 * @author    Adnan Sagar, PhD <adnan@websemantics.ca>
 * @copyright 2004-2015 Web Semantics, Inc. (http://websemantics.ca)
 * @license   http://www.opensource.org/licenses/mit-license.php MIT
 * @since     17th November 2005
 * @package   websemantics/oea/draw2d.svg/shapes
 */

Polygon.prototype = new Shape();

function Polygon(x, y, xx, yy, graphics) {
        var argv = Polygon.arguments;
        var argc = Polygon.length;
        this.className = "Polygon";

        if (argv.length > 0)
            this.initPolygon(x, y, xx, yy, graphics);
    }

Polygon.prototype.initPolygon = function(x, y, xx, yy, graphics) {
        this.initNode(x, y, 0, 0, 0, 1);
        this.copyProperties(graphics);
        this.create(xx, yy, graphics);
    }

Polygon.prototype.create = function(xx, yy, graphics) {
        this.Node = createSVGNode("polygon", {
            'fill': this.getColor(),
            stroke: this.getStrokeColor(),
            'stroke-width': this.getStrokeWidth()
        }, graphics.getNode());
        if (xx != undefined && yy != undefined && xx != null && yy != null)
            this.setXYPoints(xx, yy);
        this.transform();
    }

Polygon.prototype.setXYPoints = function(xx, yy) {
        var points = xx[0] + "," + yy[0] + " ";
        for (var i = 1; i < xx.length; i++)
            points += xx[i] + "," + yy[i] + " ";
        this.setAttribute("points", points);
    }

Polygon.prototype.clone = function( /* */ parent) {
    var polygon = new Polygon(this.x, this.y, null, null, parent);
    polygon.copyProperties(this);
    polygon.setAttribute("points", this.getAttribute("points"));
    return polygon;
}
/**
 * Draw2D.svg : Path
 *
 * @author    Adnan Sagar, PhD <adnan@websemantics.ca>
 * @copyright 2004-2015 Web Semantics, Inc. (http://websemantics.ca)
 * @license   http://www.opensource.org/licenses/mit-license.php MIT
 * @since     26th November 2005
 * @package   websemantics/oea/draw2d.svg/shapes
 */

Path.prototype = new Shape();

function Path(x, y, d, graphics) {
        var argv = Path.arguments;
        var argc = Path.length;
        this.className = "Path";

        if (argv.length > 0)
        	this.initPath(x, y, d, graphics);
    }

Path.prototype.initPath = function(x, y, d, graphics) {
        this.initNode(x, y, 0, 0, 0, 1);
        this.d = d;
        this.copyProperties(graphics);
        this.create(graphics);
    }

Path.prototype.create = function(graphics) {
        this.Node = createSVGNode("path", {
            d: this.d,
            'fill': this.getColor(),
            stroke: this.getStrokeColor(),
            'stroke-width': this.getStrokeWidth()
        }, graphics.getNode());
        this.transform();
    }

Path.prototype.setPath = function(d) {
        this.setAttribute("d", d);
    }

Path.prototype.setXYPoints = function(xx, yy) {
    var d = "M " + xx[0] + "," + yy[0] + " ";
    for (var i = 1; i < xx.length; i++)
        d += "L " + xx[i] + "," + yy[i] + " ";
    this.setAttribute("d", d);
}

/**
 * Draw2D.svg : WinBorder
 *
 * @author    Adnan Sagar, PhD <adnan@websemantics.ca>
 * @copyright 2004-2015 Web Semantics, Inc. (http://websemantics.ca)
 * @license   http://www.opensource.org/licenses/mit-license.php MIT
 * @since     25th November 2005
 * @package   websemantics/oea/draw2d.svg/shapes
 */

WinBorder.prototype = new Shape();

function WinBorder(x, y, w, h, graphics) {
        var argv = WinBorder.arguments;
        var argc = WinBorder.length;
        this.className = "WinBorder";

        if (argv.length > 0)
            this.initWinBorder(x, y, w, h, graphics);
    }

WinBorder.prototype.initWinBorder = function(x, y, w, h, graphics) {
        this.initNode(x, y, w, h, 0, 1);
        this.copyProperties(graphics);
        this.edge1 = null;
        this.edge2 = null;
        this.edge3 = null;
        this.edge4 = null;
        //this.bgk=null;
        this.create(graphics);
    }

WinBorder.prototype.create = function(graphics) {
        var g = new Graphics(0, 0, this.w, this.h);
        //g.setColor(pal[2]);
        //this.bgk=g.drawRect(2,2,this.w-4,this.h-4);
        this.edge1 = g.drawPolygon(0, 0);
        this.edge2 = g.drawPolygon(0, 0);
        this.edge3 = g.drawPolygon(0, 0);
        this.edge4 = g.drawPolygon(0, 0);
        this.update();
        graphics.addGraphics(g);
        this.setFaceUp();
        this.Node = g.getNode();
        this.transform();
        delete g;
    }

WinBorder.prototype.update = function() {
        var w = this.w;
        var h = this.h;
        var xx = new Array();
        var yy = new Array();
        
        // Edge 1 
        xx[0] = w;
        xx[1] = w - 1;
        xx[2] = w - 1;
        xx[3] = 1;
        xx[4] = 0;
        xx[5] = w;
        yy[0] = 0;
        yy[1] = 1;
        yy[2] = h - 1;
        yy[3] = h - 1;
        yy[4] = h;
        yy[5] = h;
        this.edge1.setXYPoints(xx, yy);
        
        // Edge 2
        xx[0] = w - 1;
        xx[1] = w - 2;
        xx[2] = w - 2;
        xx[3] = 2;
        xx[4] = 1;
        xx[5] = w - 1;
        yy[0] = 1;
        yy[1] = 2;
        yy[2] = h - 2;
        yy[3] = h - 2;
        yy[4] = h - 1;
        yy[5] = h - 1;
        this.edge2.setXYPoints(xx, yy);
        
        // Edge 3
        xx[0] = w - 1;
        xx[1] = w - 2;
        xx[2] = 2;
        xx[3] = 2;
        xx[4] = 1;
        xx[5] = 1;
        yy[0] = 1;
        yy[1] = 2;
        yy[2] = 2;
        yy[3] = h - 2;
        yy[4] = h - 1;
        yy[5] = 1;
        this.edge3.setXYPoints(xx, yy);
        
        // Edge 4
        xx[0] = w;
        xx[1] = w - 1;
        xx[2] = 1;
        xx[3] = 1;
        xx[4] = 0;
        xx[5] = 0;
        yy[0] = 0;
        yy[1] = 1;
        yy[2] = 1;
        yy[3] = h - 1;
        yy[4] = h;
        yy[5] = 0;
        this.edge4.setXYPoints(xx, yy);
        
        // background 
        //this.bgk.setSize(w-2,h-2);
    }

WinBorder.prototype.setFaceUp = function() {
        c1 = pal[0];
        c2 = pal[1];
        c3 = pal[2];
        c4 = pal[3];
        this.edge1.setColor(c1);
        this.edge2.setColor(c2);
        this.edge3.setColor(c3);
        this.edge4.setColor(c4);
    }

WinBorder.prototype.setFaceDown = function() {
        c3 = pal[0];
        c4 = pal[1];
        c1 = pal[2];
        c2 = pal[3];
        this.edge1.setColor(c1);
        this.edge2.setColor(c2);
        this.edge3.setColor(c3);
        this.edge4.setColor(c4);
    }

WinBorder.prototype.onResize = function() {
		    this.update();
		}
/**
 * Draw2D.svg : StepBorder
 *
 * @author    Adnan Sagar, PhD <adnan@websemantics.ca>
 * @copyright 2004-2015 Web Semantics, Inc. (http://websemantics.ca)
 * @license   http://www.opensource.org/licenses/mit-license.php MIT
 * @since     17th November 2005
 * @package   websemantics/oea/draw2d.svg/shapes
 */

StepBorder.prototype = new Shape();

function StepBorder(x, y, w, h, graphics) {
        var argv = StepBorder.arguments;
        var argc = StepBorder.length;
        this.className = "StepBorder";

        if (argv.length > 0)
            this.initStepBorder(x, y, w, h, graphics);
    }

StepBorder.prototype.initStepBorder = function(x, y, w, h, graphics) {

        this.initNode(x, y, w, h, 0, 1);
        this.copyProperties(graphics);
        this.edge1 = null;
        this.edge2 = null;
        this.create(graphics);
    }

StepBorder.prototype.create = function(graphics) {
        var g = new Graphics(0, 0, this.w, this.h);
        this.edge1 = g.drawPolygon(0, 0);
        this.edge2 = g.drawPolygon(0, 0);
        this.update();
        graphics.addGraphics(g);
        this.setFaceUp();
        this.Node = g.getNode();
        this.transform();
        delete g;
    }

StepBorder.prototype.update = function() {

        var w = this.w;
        var h = this.h;
        var xx = new Array();
        var yy = new Array();
        // Edge 1 
        xx[0] = w;
        xx[1] = w - 1;
        xx[2] = w - 1;
        xx[3] = 1;
        xx[4] = 0;
        xx[5] = w;
        yy[0] = 0;
        yy[1] = 1;
        yy[2] = h - 1;
        yy[3] = h - 1;
        yy[4] = h;
        yy[5] = h;
        this.edge1.setXYPoints(xx, yy);
        // Edge 2
        xx[0] = w;
        xx[1] = w - 1;
        xx[2] = 1;
        xx[3] = 1;
        xx[4] = 0;
        xx[5] = 0;
        yy[0] = 0;
        yy[1] = 1;
        yy[2] = 1;
        yy[3] = h - 1;
        yy[4] = h;
        yy[5] = 0;
        this.edge2.setXYPoints(xx, yy);
    }

StepBorder.prototype.setFaceUp = function() {
        c1 = pal[0];
        c2 = pal[3];
        this.edge1.setColor(c1);
        this.edge2.setColor(c2);
    }

StepBorder.prototype.setFaceDown = function() {
        c1 = pal[3];
        c2 = pal[0];
        this.edge1.setColor(c1);
        this.edge2.setColor(c2);
    }

StepBorder.prototype.onResize = function() {
    this.update();
}

/**
 * Draw2D.svg : BoxBorder
 *
 * @author    Adnan Sagar, PhD <adnan@websemantics.ca>
 * @copyright 2004-2015 Web Semantics, Inc. (http://websemantics.ca)
 * @license   http://www.opensource.org/licenses/mit-license.php MIT
 * @since     17th November 2005
 * @package   websemantics/oea/draw2d.svg/shapes
 */

/**
 * Class BoxBorder
 *
 * This is a complex class uses internal graphics Context to draw 
 * other shapes (i.e. polygon)
 * 
 */

BoxBorder.prototype = new Shape();

function BoxBorder(x, y, w, h, depth, graphics) {
        var argv = BoxBorder.arguments;
        var argc = BoxBorder.length;
        this.className = "BoxBorder";

        if (argv.length > 0)
            this.initBoxBorder(x, y, w, h, depth, graphics);
    }

BoxBorder.prototype.initBoxBorder = function(x, y, w, h, depth, graphics) {
        this.initNode(x, y, w, h, 0, 1);
        this.copyProperties(graphics);
        this.edge1 = null;
        this.edge2 = null;
        this.depth = depth;
        this.create(graphics);
    }

BoxBorder.prototype.create = function(graphics) {
        var g = new Graphics(0, 0, this.w, this.h);
        this.edge1 = g.drawPolygon(0, 0);
        this.edge2 = g.drawPolygon(0, 0);
        this.edge3 = g.drawPolygon(0, 0);
        this.edge4 = g.drawPolygon(0, 0);
        this.update();
        graphics.addGraphics(g);
        this.setFaceUp();
        this.Node = g.getNode();
        this.transform();
        delete g;
    }

BoxBorder.prototype.update = function() {
        var w = this.w;
        var h = this.h;
        var t = this.depth;
        var xx = new Array();
        var yy = new Array();

        c1 = pal[3];
        c2 = pal[0];
        this.edge1.setColor(c1);
        this.edge2.setColor(c2);
        this.edge3.setColor(c1);
        this.edge4.setColor(c2);
        
        // Edge 1 
        xx[0] = 0;
        xx[1] = t;
        xx[2] = t;
        xx[3] = 0;
        yy[0] = 0;
        yy[1] = t;
        yy[2] = h;
        yy[3] = h;
        this.edge1.setXYPoints(xx, yy);
        
        // Edge 2
        xx[0] = 0;
        xx[1] = w;
        xx[2] = w;
        xx[3] = t;
        yy[0] = 0;
        yy[1] = 0;
        yy[2] = t;
        yy[3] = t;
        this.edge2.setXYPoints(xx, yy);
        
        // Edge 3 
        xx[0] = w - t;
        xx[1] = w - t;
        xx[2] = w;
        xx[3] = w;
        yy[0] = 0;
        yy[1] = h - t;
        yy[2] = h;
        yy[3] = t;
        this.edge3.setXYPoints(xx, yy);
        
        // Edge 4
        xx[0] = 0;
        xx[1] = w - t;
        xx[2] = w;
        xx[3] = t;
        yy[0] = h - t;
        yy[1] = h - t;
        yy[2] = h;
        yy[3] = h;
        this.edge4.setXYPoints(xx, yy);
    }

BoxBorder.prototype.setFaceUp = function() {
        this.edge1.setVisibility(false);
        this.edge2.setVisibility(false);
        this.edge3.setVisibility(true);
        this.edge4.setVisibility(true);
    }

BoxBorder.prototype.setFaceDown = function() {
        this.edge1.setVisibility(true);
        this.edge2.setVisibility(true);
        this.edge3.setVisibility(false);
        this.edge4.setVisibility(false);
    }

BoxBorder.prototype.onResize = function() {
    this.update();
}
/**
 * Draw2D.svg : RRectangle
 *
 * @author    Adnan Sagar, PhD <adnan@websemantics.ca>
 * @copyright 2004-2015 Web Semantics, Inc. (http://websemantics.ca)
 * @license   http://www.opensource.org/licenses/mit-license.php MIT
 * @since     9th November 2005
 * @package   websemantics/oea/draw2d.svg/shapes
 */

RRectangle.prototype = new Shape();

function RRectangle(x, y, w, h, rx, ry, graphics) {
        var argv = RRectangle.arguments;
        var argc = RRectangle.length;
        this.className = "RRectangle";
        
        if (argv.length > 0)
            this.initRRectangle(x, y, w, h, rx, ry, graphics);
    }

RRectangle.prototype.initRRectangle = function(x, y, w, h, rx, ry, graphics) {
        if (w == undefined) w = 0;
        if (h == undefined) h = 0;
        this.initNode(x, y, w, h, 0, 1);
        this.setRadius(rx, ry);
        this.copyProperties(graphics);
        this.create(graphics);
    }

RRectangle.prototype.create = function(graphics) {
        this.Node = createSVGNode("rect", {
            x: 0,
            y: 0,
            rx: this.rx,
            ry: this.ry,
            width: this.w,
            height: this.h,
            'fill': this.getColor(),
            stroke: this.getStrokeColor(),
            'stroke-width': this.strokeWidth
        }, graphics);
        this.transform();
    }

RRectangle.prototype.setRadius = function(rx, ry) {
        this.rx = rx;
        this.ry = ry;
        this.setAttribute("rx", this.rx);
        this.setAttribute("ry", this.ry);
    }

RRectangle.prototype.onResize = function() {
        this.setAttribute("width", this.w);
        this.setAttribute("height", this.h);
    }

RRectangle.prototype.clone = function( /* */ parent) {
    var rrect = new RRectangle(this.x, this.y, this.w, this.h, this.rx, this.ry, parent);
    rrect.copyProperties(this);
    return rrect;
}
/**
 * Draw2D.svg : Rectangle
 *
 * @author    Adnan Sagar, PhD <adnan@websemantics.ca>
 * @copyright 2004-2015 Web Semantics, Inc. (http://websemantics.ca)
 * @license   http://www.opensource.org/licenses/mit-license.php MIT
 * @since     9th November 2005
 * @package   websemantics/oea/draw2d.svg/shapes
 */

Rectangle.prototype = new RRectangle();

function Rectangle(x, y, w, h, graphics) {
        var argv = Rectangle.arguments;
        var argc = Rectangle.length;
        this.className = "Rectangle";

        if (argv.length > 0) 
        	this.initRectangle(x, y, w, h, graphics);
    }

Rectangle.prototype.initRectangle = function(x, y, w, h, graphics) {
        this.initRRectangle(x, y, w, h, 0, 0, graphics);
    }

Rectangle.prototype.setCornersRadius = function(rx, ry) {}

Rectangle.prototype.clone = function( /* */ parent) {
    var rect = new Rectangle(this.x, this.y, this.w, this.h, parent);
    rect.copyProperties(this);
    return rect;
}

/**
 * Draw2D.svg : Text
 *
 * @author    Adnan Sagar, PhD <adnan@websemantics.ca>
 * @copyright 2004-2015 Web Semantics, Inc. (http://websemantics.ca)
 * @license   http://www.opensource.org/licenses/mit-license.php MIT
 * @since     22nd November 2005
 * @package   websemantics/oea/draw2d.svg/shapes
 */

var common_text_path_id = "text-path-";
var text_path_counter = 0;

/**
 * Internal Text Path APIs:
 */
function tp_int_getTextPathId(){return (common_text_path_id+(text_path_counter++));}

/**
 * Class Text
 */

Text.prototype = new Shape();

function Text(x, y, str, graphics, nodeType, parentSvgNode) {
        var argv = Text.arguments;
        var argc = Text.length;
        this.className = "Text";

        if (argv.length > 0)
            this.initText(x, y, str, graphics, nodeType, parentSvgNode);
    }

Text.prototype.initText = function(x, y, str, graphics, nodeType, parentSvgNode) {
    this.textPath == null;
    if (nodeType == undefined) nodeType = "text";
    this.nodeType = nodeType; // 'text' ot 'tspan'
    this.copyProperties(graphics);
    this.font = graphics.getFont();
    var fm = new FontMetrics(this.font);
    this.initNode(x, y, fm.getStringWidth(str), fm.getHeight(), 0, 1);
    this.create(str, graphics, parentSvgNode);
}

Text.prototype.create = function(str, graphics, parentSvgNode) {
				// Summary:
				// nodeType: 'text' or 'tspan' : 'text' is Default
				// if 'tspan' is used then connect it to the previous 'text'
				// element and that by provide the 'text element' as parentSvgNode
				// this is useful when user wants to select all the text drawn
				//
				//  Font Style is: PLAIN, BOLD or ITALIC
				// =======================================:
				// 
				// SVG properties :
				// ================
				// 'font-family' : Initial:    depends on user agent  
				// 'font-style' :  normal | italic | oblique | inherit  
				// 'font-variant' : normal | small-caps | inherit  
				// 'font-weight' :    normal | bold | bolder | lighter | 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900 | inherit  
				// 'font-stretch':    normal | wider | narrower |
				// 'font-size' :    <absolute-size> | <relative-size> |
				
        if (parentSvgNode == undefined || parentSvgNode == null) 
        	parentSvgNode = graphics;

        var style = this.font.getNamedStyle();
        var attr = 'font-style';
        if (style == "bold")
            attr = 'font-weight';
        this.Node = createSVGTextNode(str, {
            x: 0,
            y: 0,
            'font-family': this.font.getName(),
            'font-size': this.font.getSize(),
            fill: this.getColor()
        }, parentSvgNode, this.nodeType);
        //this.Node=createSVGTextNode(str,{x: 0, y:0,'font-family':this.font.getName(),attr: style,'font-size':this.font.getSize(), fill: this.getColor()},parentSvgNode,this.nodeType);
        this.transform();
    }

Text.prototype.setTextColor = function(color) {
        this.setAttribute('fill', color);
    }

Text.prototype.getTextColor = function() {
        return this.getAttribute('fill');
    }

Text.prototype.setToBaseLine = function() {
        // this.setAttribute('baseline-shift',"-100%"); // [does not work with Batik 1.6]
        this.setAttribute('baseline-shift', -this.getBaseline());
    }

Text.prototype.setText = function(string) {
        if (this.textPath != null) this.textPath.firstChild.data = string;
        else
            this.Node.firstChild.textContent = string;
    }

Text.prototype.getText = function() {
        if (this.textPath != null) return (this.textPath.firstChild.data);
        else
            return (this.Node.firstChild.data)
    }

Text.prototype.insertText = function(charPos, text) {
        this.Node.firstChild.insertData(charPos, text);
    }

Text.prototype.replaceText = function(charPos, count, text) {
        this.Node.firstChild.replaceData(charPos, count, text);
    }

Text.prototype.deleteText = function(charPos, count) {
        this.Node.firstChild.deleteData(charPos, count);
    }

Text.prototype.setFontSize = function(fontSize) {
        this.font.setSize(fontSize);
        this.setFont(this.font);
    }

Text.prototype.setFont = function(font) {
        this.font = font;
        var style = font.getStyle();
        var attr = 'font-style';
        
        if (style == "bold") 
        	attr = 'font-weight';
        
        this.setAttribute('font-family', font.getName());
        this.setAttribute(attr, style);
        this.setAttribute('font-size', font.getSize());
        
        // update baseline-shift attribute
        if (this.hasAttribute('baseline-shift')) this.setAttribute('baseline-shift', -this.getBaseline());
    }

Text.prototype.setTextPath = function(path) {
        var xlinkns = "http://www.w3.org/1999/xlink";
        var textPathId = tp_int_getTextPathId();
        path.setId(textPathId);
        df_addToDefs(path);
        this.textPath = createSVGNode("textPath", {});
        this.textPath.setAttributeNS(xlinkns, "xlink:href", "#" + textPathId);
        this.textPath.appendChild(this.Node.firstChild);
        this.addChild(this.textPath);
    }

Text.prototype.getStringWidth = function() {
        if (this.Node == null) return 0;
        return this.Node.getComputedTextLength();
    }

Text.prototype.getStringHeight = function() {
        var fm = new FontMetrics(this.font);
        return fm.getHeight();
    }

Text.prototype.getBaseline = function() {
        var fm = new FontMetrics(this.font);
        return fm.getBaseline();
    }

Text.prototype.onResize = function() {}

/**
 * Draw2D.svg : Line
 *
 * Support: SVG 1.2 only
 *
 * @author    Adnan Sagar, PhD <adnan@websemantics.ca>
 * @copyright 2004-2015 Web Semantics, Inc. (http://websemantics.ca)
 * @license   http://www.opensource.org/licenses/mit-license.php MIT
 * @since     22th November 2005
 * @package   websemantics/oea/draw2d.svg/shapes
 */

var common_region_id = "region_";
var region_counter = 0;

/**
 * Internal region APIs
 */

function rg_int_getRegionId(){return (common_region_id+(region_counter++));}

/**
 * Class FlowParagraph
 */

FlowParagraph.prototype = new Shape();

function FlowParagraph(textView, flowDivNode, text) {
        var argv = FlowParagraph.arguments;
        var argc = FlowParagraph.length;
        this.className = "FlowParagraph";

        if (argv.length > 0)
            this.initFlowParagraph(textView, flowDivNode, text);
    }

FlowParagraph.prototype.initFlowParagraph = function(textView, flowDivNode, text) {
        this.textView = textView; // Parent shape
        this.Node = null;
        this.create(flowDivNode, text);
    }

FlowParagraph.prototype.create = function(flowDivNode, text) {
        this.Node = createSVGNode("flowPara", {}, flowDivNode);
        if (text != undefined)
            this.Node.appendChild(svgDocument.createTextNode(text));
    }

FlowParagraph.prototype.addFlowSpan = function(text) {
        var flowSpan = createSVGNode("flowSpan", {
            fill: "red"
        }, this.getNode());
        flowSpan.appendChild(svgDocument.createTextNode(text));
        this.textView.refresh();
    }

FlowParagraph.prototype.addColoredFlowSpan = function(text, color) {
        var flowSpan = createSVGNode("flowSpan", {
            fill: color
        }, this.getNode());
        flowSpan.appendChild(svgDocument.createTextNode(text));
        this.textView.refresh();
    }

FlowParagraph.prototype.setFont = function(font) {
        var style = font.getStyle();
        var attr = 'font-style';
        if (style == "bold") attr = 'font-weight';
        this.Node.setAttribute('font-family', font.getName());
        this.Node.setAttribute(attr, style);
        this.Node.setAttribute('font-size', font.getSize());
    }

FlowParagraph.prototype.getText = function() {

        var ret = "";

        if (this.Node.firstChild.data != undefined)
            ret += this.Node.firstChild.data + "\n";

        var flowSpans = this.getNode().getElementsByTagName("flowSpan");

        for (var i = 0; i < flowSpans.length; i++) {
            if (flowSpans.item(i).firstChild.data != undefined)
                ret += flowSpans.item(i).firstChild.data + "\n";
        }

        if (flowSpans.length == 0) return this.Node.firstChild.data;

        return ret;
    }

FlowParagraph.prototype.setText = function(text) {
        this.Node.firstChild.data = text;
    }

FlowParagraph.prototype.insertText = function(charPos, text) {
        this.Node.firstChild.insertData(charPos, text);
    }

FlowParagraph.prototype.replaceText = function(charPos, count, text) {
        this.Node.firstChild.replaceData(charPos, count, text);
    }

FlowParagraph.prototype.deleteText = function(charPos, count) {
        this.Node.firstChild.deleteData(charPos, count);
    }

FlowParagraph.prototype.selectAll = function() {
        var len = this.Node.firstChild.data.length;
        this.Node.selectSubString(0, len);
    }

FlowParagraph.prototype.getNode = function() {
    return this.Node;
}

/**
 * Class TextView
 */

TextView.prototype = new Text();

function TextView(x, y, w, h, text, regionShape, graphics) {
        var argv = TextView.arguments;
        var argc = TextView.length;
        this.className = "TextView";

        if (argv.length > 0)
          this.initTextView(x, y, w, h, text, regionShape, graphics);
    }

TextView.prototype.initTextView = function(x, y, w, h, text, regionShape, graphics) {
        this.paraCounter = 0;
        this.initNode(x, y, w, h, 0, 1);
        this.regionShape = regionShape;
        
        // To save flowDiv node [used by addParagraph)
        this.flowDiv = null; 
        
        // To save all slowParagraphs objects 
        this.flowPara = new Array(); 
        this.copyProperties(graphics);
        this.font = graphics.getFont();
        this.create(text, graphics);
    }

TextView.prototype.create = function(text, graphics) {
        var xlinkns = "http://www.w3.org/1999/xlink";

        this.Node = createSVGNode("g", {}, graphics);

        // Get id of the region shape 
        var regionId = rg_int_getRegionId();

        if (this.regionShape == undefined || this.regionShape == null)
            this.regionShape = graphics.drawRect(0, 0, this.getWidth(), this.getHeight());
        else this.regionShape = this.regionShape.clone(graphics);

        this.regionShape.setId(regionId);
        this.regionShape.setVisibility(false);
        // Create needed nodes
        var style = this.font.getStyle();
        var attr = 'font-style';
        if (style == "bold") attr = 'font-weight';

        var flowNodeName = "flow"; // <== Name of the flow element is different in Batik and ASV
        if (viewerMode == Batik) flowNodeName = "flowRoot";
        this.flow = createSVGNode(flowNodeName, {
            'font-family': this.font.getName(),
            attr: style,
            'font-size': this.font.getSize(),
            fill: this.getColor()
        }, this.getNode());
        this.flowRegion = createSVGNode("flowRegion", {}, this.flow);

        // Batik does not support element 'region',...
        if (viewerMode == Batik)
            this.regionShape.setParent(this.flowRegion);
        else {
            var region = createSVGNode("region", {}, this.flowRegion);
            region.setAttributeNS(xlinkns, "xlink:href", '#' + regionId);
            this.regionShape.setParent(this.Node);
        }

        this.flowDiv = createSVGNode("flowDiv", {}, this.flow);

        if (text != undefined || text != null) this.addParagraph(text);

        this.transform();

        if (viewerMode == Batik) this.refresh();
    }

TextView.prototype.changeRegionShape = function( /* Shape */ shape) {

        var regionId = this.regionShape.getId();
        var oldRegionShape = this.regionShape;
        oldRegionShape.setId("xxxxxyyyyyzzzzz");

        this.regionShape = shape;
        this.regionShape.setId(regionId);

        if (viewerMode == Batik) {
            // this.flowRegion.replaceChild(this.regionShape.getNode(),oldRegionShape.getNode()); // Does not work rightly
            // oldRegionShape.dispose();
        } else {
            this.regionShape.setParent(this.getNode());
            oldRegionShape.dispose();
        }

        this.updateRegionShape();
    }

TextView.prototype.updateRegionShapeProperties = function( /* Shape */ shape) {

        if (shape instanceof RRectangle) {
            this.regionShape.setSize(shape.w, shape.h);
            this.regionShape.setRadius(shape.rx, shape.ry);
            this.regionShape.translate(shape.x, shape.y);
        }
        if (shape instanceof Oval) {
            this.regionShape.setRadius(shape.radiusX, shape.radiusY);
            this.regionShape.translate(shape.x, shape.y);
        }
        if (shape instanceof Polygon) {
            this.regionShape.setAttribute("points", shape.getAttribute("points"));
            this.regionShape.translate(shape.x, shape.y);
        }
    }

TextView.prototype.updateRegionShape = function() {

        if (this.regionShape instanceof Oval) {
            this.regionShape.setRadius(this.getWidth() / 2, this.getHeight() / 2);
        }

        if (this.regionShape instanceof Rectangle || this.regionShape instanceof RRectangle) {
            this.regionShape.setSize(this.getWidth(), this.getHeight());
        }
    }

TextView.prototype.addParagraph = function(text) {
        var len = parseInt(this.flowPara.length);
        this.flowPara[len] = new FlowParagraph(this, this.flowDiv, text);
        this.flowPara[len].setFont(this.font);

        if (viewerMode == Batik) this.refresh();

        return this.flowPara[len];
    }

TextView.prototype.insertParagraph = function(text) {
        var len = parseInt(this.flowPara.length);

        this.addParagraph(text);

        for (var i = len; i > 0; i--)
            this.flowPara[i].setText(this.flowPara[i - 1].getText());

        this.flowPara[0].setText(text);

        if (viewerMode == Batik) this.refresh();

        return this.flowPara[0];
    }

TextView.prototype.getParagraph = function() {
        var len = parseInt(this.flowPara.length);
        this.flowPara[len] = new FlowParagraph(this, this.flowDiv);
        this.flowPara[len].setFont(this.font);
        return this.flowPara[len];
    }

TextView.prototype.refresh = function() {
        // Notice:
        // Careful,..with Batik 1.6 don't attempt to add to a parent unless the 
        // structure of the flowRoot is complete,..have at least one flowPara
        var len = parseInt(this.flowPara.length);
        if (len == 0) return;
        this.getNode().appendChild(this.flow); // A Fix to a Batik bug: Refresh the current view of the TextView
    }

TextView.prototype.setTextAlign = function(ta) {
        this.setAttribute('style', "text-align:" + ta);
    }

TextView.prototype.setFont = function(font) {
        this.font = font;
        for (var i = 0; i < this.flowPara.length; i++) this.flowPara[i].setFont(font);
        if (viewerMode == Batik) this.refresh();
    }

TextView.prototype.setColor = function(color) {
        this.color = color;
        for (var i = 0; i < this.flowPara.length; i++) this.flowPara[i].setColor(color);
        if (viewerMode == Batik) this.refresh();
    }

TextView.prototype.selectAll = function() {
        for (var i = 0; i < this.flowPara.length; i++) this.flowPara[i].selectAll(); // Does not work!!
    }

TextView.prototype.getText = function() {
        var ret = "";
        for (var i = 0; i < this.flowPara.length; i++)
            ret += this.flowPara[i].getText() + "\n";

        return ret;
    }

TextView.prototype.clear = function() {
        for (var i = 0; i < this.flowPara.length; i++) {
            this.flowPara[i].dispose();
            delete this.flowPara[i];
        }
        this.flowPara = new Array();
    }

TextView.prototype.onResize = function() {
        this.updateRegionShape();
        return this.transform();
    }

/**
 * Draw2D.svg : Image
 *
 * @author    Adnan Sagar, PhD <adnan@websemantics.ca>
 * @copyright 2004-2015 Web Semantics, Inc. (http://websemantics.ca)
 * @license   http://www.opensource.org/licenses/mit-license.php MIT
 * @since     25th November 2005
 * @package   websemantics/oea/draw2d.svg/shapes
 */

Image.prototype = new Shape();

function Image(x, y, w, h, path, graphics) {
        var argv = Image.arguments;
        var argc = Image.length;
        this.className = "Image";
        
        if (argv.length > 0)
        	this.initImage(x, y, w, h, path, graphics);
    }

Image.prototype.initImage = function(x, y, w, h, path, graphics) {
        this.initNode(x, y, w, h, 0, 1);
        this.create(path, graphics);
    }

Image.prototype.create = function(path, graphics) {
        this.Node = svgDocument.createElementNS("http://www.w3.org/2000/svg", "image");
        this.Node.setAttributeNS("http://www.w3.org/1999/xlink", "href", path);
        this.Node.setAttribute("x", 0);
        this.Node.setAttribute("y", 0);
        this.Node.setAttribute("width", this.w);
        this.Node.setAttribute("height", this.h);
        graphics.getNode().appendChild(this.Node);
        this.transform();
    }

Image.prototype.changeHref = function( /* String */ href) {
        if (this.Node == null) return;
        this.Node.setAttributeNS("http://www.w3.org/1999/xlink", "href", href);
    }

Image.prototype.onResize = function() {
    this.setAttribute("width", this.w);
    this.setAttribute("height", this.h);
}
/**
 * Draw2D.svg : Cursor
 *
 * Cursor SVG type:
 * ----------------
 * 
 * auto : crosshair : default : pointer : move : e-resize : ne-resize : nw-resize
 * n-resize : se-resize : sw-resize : s-resize : w-resize : text ; wait : help  
 * OR dynamic elements (cursors) =< not supported in Batik yet.
 *
 * @author    Adnan Sagar, PhD <adnan@websemantics.ca>
 * @copyright 2004-2015 Web Semantics, Inc. (http://websemantics.ca)
 * @license   http://www.opensource.org/licenses/mit-license.php MIT
 * @since     18th November 2005
 * @package   websemantics/oea/draw2d.svg
 */

var common_cursor_id = "cursor_";
var cursor_counter = 0;

/*
 * Internal Cursor APIs:
 *
 * (1) Internal Only : cr_int_getCursorId: returns a unique Id for a Cursor object 
 * 
 */

function cr_int_getCursorId() {
    return (common_cursor_id + (cursor_counter++));
}

/**
 * Class Cursor
 * 
 * @param int x Coordinate X
 * @param int y Coordinate Y
 * @param Shape shape 
 */

Cursor.prototype = new Shape();

function Cursor(x, y, shape) {
        var argv = Cursor.arguments;
        var argc = Cursor.length;
        this.initCursor(x, y, shape);
    }

Cursor.prototype.initCursor = function(x, y, shape) {
        this.create(x, y, shape);
    }

Cursor.prototype.create = function(x, y, shape) {
    this.id = cr_int_getCursorId();
    this.Node = createSVGNode("cursor", {
        id: this.id,
        x: x,
        y: y
    });
    shape.translate(0, 0);
    this.addChild(shape.getNode());
    
    // Add the current mouse to the defs section in the SVG doc.
    df_addToDefs(this);
}
/**
 * Draw2D.svg : Tooltip
 *
 * Tooltip only supports immediate svg nodes (circle, rect, path, etc) or
 * grouped nodes (alternative text is attached to the group element:
 *  <g class="text"><rect /><circle/></g>)
 * Tooltip uses the 'class' attribute to attaches the alternative text to,..
 *
 * @author    Adnan Sagar, PhD <adnan@websemantics.ca>
 * @copyright 2004-2015 Web Semantics, Inc. (http://websemantics.ca)
 * @license   http://www.opensource.org/licenses/mit-license.php MIT
 * @since     24th December 2004
 * @package   websemantics/oea/draw2d.svg
 */

 /**
  * Global Variables
  */

// A refernce to the Graphics of the Tooltip 'g'
var toolTipNode=null;              
var toolTipNodeId="ToolTip";
var toolTipFontSize=9;
var toolTipFontSizeUnit='pt';
var toolTipFontName='Aril';
var toolTipFontStyle='normal';
var toolTipTextColor='Black';
var toolTipBorderColor='black';
var toolTipBorderWidth=1;
var toolTipBackgroundColor='rgb(255,255,225)';

// Don't delete the tooltip as long as the mouse is over the node  
var toolTipMouseOverFlag=false; 

// Turn off/on the toolTip completely [true = on, false = off ]
var toolTipOnOffFlag=true;      

// Graphics Context of the toolTip
var toolTipGraphics=null;       

/*
 * Internal ToolTip APIs:
 *
 */

function tp_int_getToolTipFontSize() {
        var scale = (document.rootElement.currentScale);
        return ((toolTipFontSize / scale) + toolTipFontSizeUnit);
    }

function tp_int_getToolTipNode() {
        return (svgDocument.getElementById(toolTipNodeId));
    }

function tp_int_disposeToolTipNode() {
        deleteSVGNodeById(toolTipNodeId);
    }

/*
 * External ToolTip APIs:
 *
 */

function tp_setToolTipFont(font) {
        toolTipFontSize = font.getSize();
        toolTipFontName = font.getName();
        toolTipFontStyle = font.getStyle();
    }

function tp_getToolTipFont() {
        return (new Font(toolTipFontName, toolTipFontStyle, toolTipFontSize));
    }

function tp_setToolTipTextColor(color) {
        toolTipTextColor = color;
    }

function tp_getToolTipTextColor() {
        return toolTipTextColor;
    }

function tp_setToolTipBorderColor(color) {
        toolTipBorderColor = color;
    }

function tp_getToolTipBorderColor() {
        return toolTipBorderColor;
    }

function tp_setToolTipBackgroundColor(color) {
        toolTipBackgroundColor = color;
    }

function tp_getToolTipBackgroundColor() {
        return toolTipBackgroundColor;
    }

function tp_setToolTipBorderWidth(width) {
        toolTipBorderWidth = width;
    }

function tp_getToolTipBorderWidth() {
        return toolTipBorderWidth;
    }

function tp_turnToolTipOn() {
				// Summary:
				// Turn off/on the toolTip completely [true = on, false = off ]
        toolTipOnOffFlag = true; 
    }

function tp_turnToolTipOff() {
				// summary:
				// Turn off/on the toolTip completely [true = on, false = off ]
        toolTipOnOffFlag = false;
    }

function tp_setToolTipText(string, node) {
				// Note:the 'class' attribute of the node is being used 
			  //          to save the text of the ToolTip text
        if (node == undefined || node == null) return;
        node.addEventListener("mousemove", tp_int_mouse_over, false);
        node.addEventListener("mouseover", tp_int_mouse_over, false);
        node.addEventListener("mouseout", tp_int_mouse_out, false);
        node.setAttribute("class", string);
    }

function tp_removeToolTipText(node) {
        if (node == undefined || node == null) return;
        node.removeEventListener("mousemove", tp_int_mouse_over, false);
        node.removeEventListener("mouseover", tp_int_mouse_over, false);
        node.removeEventListener("mouseout", tp_int_mouse_out, false);
        tp_disposeToolTipNode();
    }

function tp_int_createToolTip(evt) {
        
        var scale = (document.rootElement.currentScale);
        var g = new Graphics(0, 0, 0, 0, toolTipNodeId);
        
        g.setAttribute("pointer-events", "none");
        g.setFont(new Font(toolTipFontName, toolTipFontStyle, tp_int_getToolTipFontSize()));
        
        var fm = g.getFontMetrics();
        var toolTipText = evt.target.getAttribute('class');
        
        // If the tooltip text is not found on the node itself try its parent! [in case of group]
        if (toolTipText == null || toolTipText == "") {
            toolTipText = evt.target.parentNode.getAttribute('class');
            if (toolTipText == null || toolTipText == 'null' || toolTipText == "") return;
        }
        
        var w = (fm.getStringWidth(toolTipText) + (7 / scale));
        var h = (fm.getHeight() + (4 / scale));
        var xd = 4 / scale;
        var yd = 2 / scale;
        
        // Draw the shadow  
        g.setColor('black');
        var shw = g.drawRect(3 / scale, 3 / scale, w, h);
        shw.setOpacity(0.5);
        
        // Draw the border 
        g.setColor(toolTipBackgroundColor);
        g.setStrokeWidth(toolTipBorderWidth / scale);
        g.setStrokeColor(toolTipBorderColor);
        g.drawRect(0, 0, w, h);
        
        // Print the text 
        g.setColor(toolTipTextColor);
        var text = g.drawText(xd, yd, toolTipText);
        
        text.moveBy(0, 11 / scale); // OR text.setToBaseLine(); <== [ Supported by Adobe but not with Batik! ]
        // you can turn anti-aliasing off on particular objects (or on the whole drawing) 
        // by setting property 'shape-rendering' to 'crispEdges'
        // shape-rendering ( auto | optimizeSpeed | crispEdges | geometricPrecision | nherit ) 
        g.setAttribute('shape-rendering', 'crispEdges');
        toolTipLayer.addGraphics(g);
        return g;
    }

function tp_int_mouse_over(evt) {

        var scale = (document.rootElement.currentScale);

        // Create the toolTip node once,..
        if (!toolTipMouseOverFlag) {
            toolTipMouseOverFlag = true;
            tp_int_disposeToolTipNode();
            toolTipGraphics = tp_int_createToolTip(evt);
        }
        
        // If the Graphics Contect of the toolTip is not defined, exit.
        if (toolTipGraphics == null) return;
        
        // Don't show the toolTip if the 'toolTipOnOffFlag' is turned off
        toolTipGraphics.setVisibility(toolTipOnOffFlag);
        
        // Otherwise move the toolTip
        var tx = document.rootElement.currentTranslate.x;
        var ty = document.rootElement.currentTranslate.y;
        var x = ((evt.clientX - tx + 13));
        var y = ((evt.clientY - ty));
        toolTipGraphics.translate(x / scale, y / scale);
    }

function tp_int_mouse_out(evt) {
        tp_disposeToolTipNode();
    }

function tp_disposeToolTipNode() {
    toolTipNode = tp_int_getToolTipNode();
    if (toolTipNode == null) return;
    toolTipNode.setAttribute('visibility', 'hidden');
    toolTipMouseOverFlag = false;
    if (toolTipGraphics != null) {
        toolTipGraphics.dispose();
        toolTipGraphics = null;
    }
}
/**
 * Java.js : Vactor
 *
 * @author    Adnan Sagar, PhD <adnan@websemantics.ca>
 * @copyright 2004-2015 Web Semantics, Inc. (http://websemantics.ca)
 * @license   http://www.opensource.org/licenses/mit-license.php MIT
 * @since     6th January 2005
 * @package   websemantics/oea/java.js/util
 */

/**
 * Class Vactor 
 * 
 * Utility class used as Linked List (from JAVA)
 * 
 */

function Vector(initialCapacity) {
        var argv = Vector.arguments;
        var argc = Vector.length;
        this.className = "Vector";

        this.elementData = new Array(); // Virtually unlimited capacity,..
        this.elementCount = 0;
        this.initialCapacity = 10;

        if (argv.length > 0) 
        	this.initVector(initialCapacity);
    }

Vector.prototype.initVector = function(initialCapacity) {
        this.initialCapacity = initialCapacity;
    }

Vector.prototype.setSize = function(newSize) {
    // Summary:
    // Sets the size of this vector. If the new size is greater than the current size, new null items 
    // are added to the end of the vector. If the new size is less than the current size, all 
    // components at index newSize and greater are discarded.

        /* NOT IMPLEMENTED
        	if (newSize > this.elementCount) {
        	    for (var i = this.elementCount  ; i < newSize ; i++) {
        		    this.elementData[i] = null;
        	   } else {
        	    for (var i = newSize ; i < this.elementCount ; i++) {
        		 this.elementData[i] = null;
        	    }
        	}
        	this.elementCount = newSize;*/
    }

Vector.prototype.size = function() {
    // Summary:
    // Returns the number of components in this vector.
        return this.elementCount;
    }

Vector.prototype.capacity = function() {
    // Summary:
    // Returns the current capacity of this vector.
        return this.elementData.length;
    }

Vector.prototype.isEmpty = function() {
        return this.elementCount == 0;
    }

Vector.prototype.elements = function() {
    // Summary:
    // This method create an implementation of Enumeration interface specially for Vecotr class,..

        var enumra = new Enumeration();
        // Attributes
        enumra.className = "Enumeration{Vector}";
        enumra.count = 0;
        enumra.container = this.clone();
        // Methods
        enumra.hasMoreElements = function() {
            return (this.count < this.container.size());
        };

        enumra.nextElement = function() {
            if (this.hasMoreElements())
                return (this.container.elementAt(this.count++));
            else
                return null;
        };
        return enumra;
    }

Vector.prototype.contains = function( /* Object */ elem) {
    // Summary:
    // Tests if the specified object is a component in this vector.
        return this.indexOf(elem) >= 0;
    }

Vector.prototype.indexOf = function( /* Object */ elem, /* int */ index) {
    // Summary:
    // Searches for the first occurence of the given argument beginning the search at index
    // Forms:
    //======
    // (1) indexOf(Object elem)
    // (2) indexOf(Object elem,int index)

        if (index == undefined) index = 0;

        if (elem == null) {
            for (var i = index; i < this.size(); i++)
                if (this.elementData[i] == null)
                    return i;
        } else {
            for (var i = index; i < this.size(); i++) {
                if (elem == this.elementData[i]) return i; // Original => if (elem.equals(this.elementData[i]))
            }
        }
        return -1;
    }

Vector.prototype.elementAt = function(i) {
    // Summary:
    // Returns the component at the specified index.
        if (i >= this.elementCount) return null;
        return this.elementData[i];
    }

Vector.prototype.removeElementAt = function(i) {
    // Summary:
    // Deletes the component at the specified index. Each component in this vector with an index greater or 
    // equal to the specified index is shifted downward to have an index one smaller than the value it had previously. 

        if (i >= this.elementCount || i < 0) return null;

        var temp = new Array();
        var cnt = 0;

        for (var j = 0; j < this.elementCount; j++) {
            if (j != i) {
                temp[cnt] = this.elementData[j];
                cnt++;
            }
        }
        delete this.elementData;
        this.elementCount--;
        this.elementData = temp;
    }

Vector.prototype.addElement = function(obj) {
        this.elementData[this.elementCount++] = obj;
        return obj;
    }

Vector.prototype.removeElement = function(obj) {
        var i = this.indexOf(obj);
        if (i >= 0) {
            this.removeElementAt(i);
            return true;
        }
        return false;
    }

Vector.prototype.removeAllElements = function() {
    // Summary:
    // Removes all components from this vector and sets its size to zero.
        this.clear();
    }

Vector.prototype.insertElementAt = function(obj, i) {
        if (i >= this.elementCount) return null;

        this.elementCount++;
        var temp = new Array();
        var cnt = 0;

        for (var j = 0; j < this.elementCount; j++) {
            if (j != i) {
                temp[j] = this.elementData[cnt];
                cnt++;
            } else {
                temp[j] = obj;
            }
        }
        delete this.elementData;
        this.elementData = temp;
    }

Vector.prototype.setElementAt = function(obj, i) {
    // Summary:
    // Sets the component at the specified index of this vector to be the specified object.
        if (i >= this.elementCount) return null;
        this.elementData[i] = obj;
    }

Vector.prototype.clear = function() {
        delete this.elementData;
        this.elementData = new Array();
        this.elementCount = 0;
    }

Vector.prototype.clone = function() {
        var cloneVector = new Vector();
        for (i in this.elementData)
            cloneVector.elementData[i] = this.elementData[i];
        cloneVector.elementCount = this.elementCount;
        return cloneVector;
    }

Vector.prototype.toString = function() {
    var ret = this.className + " (noe = " + this.size() + ") [ ";
    for (i = 0; i < this.size() - 1; i++) ret += this.elementData[i] + ", ";
    ret += this.elementData[i] + " ]";
    return ret;
}

/**
 * Java.js : Hashtable
 *
 * @author    Adnan Sagar, PhD <adnan@websemantics.ca>
 * @copyright 2004-2015 Web Semantics, Inc. (http://websemantics.ca)
 * @license   http://www.opensource.org/licenses/mit-license.php MIT
 * @since     11th January 2005
 * @package   websemantics/oea/java.js/util
 */

/**
 * Class Hashtable [ NEEDS OPTIMIZING ]
 */

function Hashtable( /* String */ deserializeString, chr1, chr2) {
        var argv = Hashtable.arguments;
        var argc = Hashtable.length;
        this.className = "Hashtable";

        this.buffer = new Array();

        if (argv.length > 0) 
          this.initHashtable(deserializeString, chr1, chr2);
    }

Hashtable.prototype.initHashtable = function( /* String */ deserializeString, chr1, chr2) {
        this.deserialize(deserializeString, chr1, chr2);
    }

Hashtable.prototype.clear = function() {
        this.buffer = new Array();
    }

Hashtable.prototype.containsKey = function(key) {
        var exists = false;
        for (var i in this.buffer) {
            if (i == key && this.buffer[i] != null) {
                exists = true;
                break;
            }
        }
        return exists;
    }

Hashtable.prototype.containsValue = function(value) {
        var contains = false;
        if (value != null) {
            for (var i in this.buffer) {
                if (this.buffer[i] == value) {
                    contains = true;
                    break;
                }
            }
        }
        return contains;
    }

Hashtable.prototype.get = function(key) {
        return this.buffer[key];
    }

Hashtable.prototype.isEmpty = function() {
        return (this.size == 0) ? true : false;
    }

Hashtable.prototype.keys = function() {
        var keys = new Array();
        for (var i in this.buffer) {
            if (this.buffer[i] != null)
                keys.push(i);
        }
        return keys;
    }

Hashtable.prototype.put = function(key, value) {

        if (key == undefined || value == undefined) return;

        if (key == null || value == null) {
            throw "NullPointerException {" + key + "},{" + value + "}";
        } else {
            this.buffer[key] = value;
        }
    }

Hashtable.prototype.remove = function(key) {
        //var rtn = this.buffer[key];
        this.buffer[key] = null;
        // return rtn;
    }

Hashtable.prototype.size = function() {
        var size = 0;
        for (var i in this.buffer) {
            if (this.buffer[i] != null)
                size++;
        }
        return size;
    }

Hashtable.prototype.values = function() {
        var values = new Array();
        for (var i in this.buffer) {
            if (this.buffer[i] != null)
                values.push(this.buffer[i]);
        }
        return values;
    }

Hashtable.prototype.clone = function() {
        var ret = new Hashtable();
        for (i in this.buffer)
            ret.buffer[i] = this.buffer[i];
        return ret;
    }

Hashtable.prototype.serialize = function( /* String*/ chr1, chr2) {
    // Summary:
    // Returns the content of the Hashtable as a string: ( key1:value1;key2:value2,..)

        if (chr1 == undefined) chr1 = ":";
        if (chr2 == undefined) chr2 = ";";
        var result = "";
        for (var i in this.buffer)
            if (this.buffer[i] != null) {
                // Ensure that all instances of the char ":" is replaced by char "^" for the serialization to succeed
                var para1 = (i + "").replace(/:/g, "^");
                var para2 = (this.buffer[i] + "").replace(/:/g, "^");
                result += para1 + chr1 + para2 + chr2;
            }
        return result;
    }

Hashtable.prototype.deserialize = function( /* String */ str, /* String*/ chr1, chr2) {
    // Summary:
    // Adds values to the Hastable from a string,..

        if (chr1 == undefined) chr1 = ":";
        if (chr2 == undefined) chr2 = ";";

        if (str == undefined || str == null) return;

        var s = str.split(chr2);

        for (var i = 0; i < s.length; i++) {
            var m = s[i].split(chr1);
            // Ensure that all instances of the char "^" is replaced by char ":" for the deserialization to succeed
            if (m[0] != undefined && m[1] != undefined) {
                var para1 = (m[0] + "").replace(/\^/g, ":");
                var para2 = (m[1] + "").replace(/\^/g, ":");
                this.put(para1, para2);
            }
        }

    }

Hashtable.prototype.toString = function() {
    var result = this.className + " [";
    for (var i in this.buffer) {
        if (this.buffer[i] != null)
            result += "{" + i + "},{" + this.buffer[i] + "}\n";
    }
    result += "]";
    return result;
}              
/**
 * Java.js : EventListener
 *
 * @author    Adnan Sagar, PhD <adnan@websemantics.ca>
 * @copyright 2004-2015 Web Semantics, Inc. (http://websemantics.ca)
 * @license   http://www.opensource.org/licenses/mit-license.php MIT
 * @since     5th January 2005
 * @package   websemantics/oea/java.js/util
 */

/**
 * Class EventListener
 */

// A tagging interface that all event listener interfaces must extend.

function EventListener(){
	var argv = EventListener.arguments;
	var argc = EventListener.length;
	this.className="EventListener";

	if(argv.length>0)
		this.initEventListener();
}

EventListener.prototype.initEventListener = function(){}

/**
 * Java.js : EventObject
 *
 * @author    Adnan Sagar, PhD <adnan@websemantics.ca>
 * @copyright 2004-2015 Web Semantics, Inc. (http://websemantics.ca)
 * @license   http://www.opensource.org/licenses/mit-license.php MIT
 * @since     5th January 2005
 * @package   websemantics/oea/java.js/util
 */

/**
 * Class EventObject
 * 
 * The root class from which all event state objects shall be derived.
 * All Events are constructed with a reference to the object, the "source",
 * that is logically deemed to be the object upon which the Event in question
 * initially occurred upon.
 * 
 */

// A tagging interface that all event listener interfaces must extend.
// 
function EventObject( /* Object */ source) { /* implements Serializable */
        var argv = EventObject.arguments;
        var argc = EventObject.length;
        this.className = "EventObject";

        /* Object */
        this.source = null;

        if (argv.length > 0) 
        	this.initEventObject(source);
    }

EventObject.prototype.initEventObject = function(source) {
        if (!source || source == null) return; // throw new IllegalArgumentException("null source");
        this.source = source;
    }

EventObject.prototype.getSource = function() {
		// Summary:
		// The object on which the Event initially occurred
        return this.source;
    }

EventObject.prototype.toString = function() {
		// Summary:
    // Returns a String representation of this EventObject.
    return this.className + " [source=" + this.source + "]";
}
/**
 * Java.js : Enumeration
 *
 * @author    Adnan Sagar, PhD <adnan@websemantics.ca>
 * @copyright 2004-2015 Web Semantics, Inc. (http://websemantics.ca)
 * @license   http://www.opensource.org/licenses/mit-license.php MIT
 * @since     5th January 2005
 * @package   websemantics/oea/java.js/util
 */

/** 
 * Class Enumeration {interface}
 * 
 * An object that implements the Enumeration interface generates a
 * series of elements, one at a time. Successive calls to the
 * nextElement method return successive elements of the series.
 *
 */

// A tagging interface that all event listener interfaces must extend.

function Enumeration(obj){
	var argv = Enumeration.arguments;
	var argc = Enumeration.length;
	this.className="Enumeration";

	if(argv.length>0)
		this.initEnumeration(obj);
}

/* void */ Enumeration.prototype.initEnumeration = function(obj){;}

/* boolean */ Enumeration.prototype.hasMoreElements = function(){}

/* Object */ Enumeration.prototype.nextElement = function(){}
 
/* String */ Enumeration.prototype.toString = function(){return this.className;}

/**
 * Java.js : Enumerator
 *
 * @author    Adnan Sagar, PhD <adnan@websemantics.ca>
 * @copyright 2004-2015 Web Semantics, Inc. (http://websemantics.ca)
 * @license   http://www.opensource.org/licenses/mit-license.php MIT
 * @since     15th Feb 2005
 * @package   websemantics/oea/java.js/util
 */

/**
 * Class Enumerator [implementation of Enumeration interface]
 * 
 * An Enumeration for a Vector of Objects.
 * 
 */

Enumerator.prototype = new Enumeration();

function Enumerator( /* Vector */ v) { /* implements Enumeration */
        var argv = Enumerator.arguments;
        var argc = Enumerator.length;
        this.className = "Enumerator";

        /* Vector -Instead of -Enumeration */
        this.fEnumeration = null;;
        
        if (argv.length > 0) 
        	this.initEnumerator(v);
    }

Enumerator.prototype.initEnumerator = function(v) {
        if (v == null) return false;
        this.fEnumeration = v.elements();
    }

Enumerator.prototype.hasMoreElements = function() {
		// Summary:
		// Returns true if the enumeration contains more elements; false if its empty
        return this.fEnumeration.hasMoreElements();
    }

Enumerator.prototype.nextElement = function() {
		// Summary:
    // Returns the next element of the enumeration. Calls to this method will enumerate successive elements.
    return this.fEnumeration.nextElement();
}
/**
 * Java.js : ReverseEnumerator
 *
 * @author    Adnan Sagar, PhD <adnan@websemantics.ca>
 * @copyright 2004-2015 Web Semantics, Inc. (http://websemantics.ca)
 * @license   http://www.opensource.org/licenses/mit-license.php MIT
 * @since     5th January 2005
 * @package   websemantics/oea/java.js/util
 */

/** 
 * Class ReverseEnumerator [implementation of Enumeration interface]
 *
 * An Enumeration that enumerates a vector of elemenets back (size-1) to front (0).
 */

ReverseEnumerator.prototype = new Enumeration();

function ReverseEnumerator( /* Vector */ v) { /* implements Enumeration */
        var argv = ReverseEnumerator.arguments;
        var argc = ReverseEnumerator.length;
        this.className = "ReverseEnumerator";

        /* ReverseVectorEnumerator */
        this.fEnumeration = null;;

        if (argv.length > 0) 
        	this.initReverseEnumerator(v);
    }

ReverseEnumerator.prototype.initReverseEnumerator = function(v) {
        this.fEnumeration = new ReverseVectorEnumerator(v);
    }

ReverseEnumerator.prototype.hasMoreElements = function() {
    // Summary
    // Returns true if the enumeration contains more elements; false if its empty.
        return this.fEnumeration.hasMoreElements();
    }

ReverseEnumerator.prototype.nextElement = function() {
    // Summary
    // Returns the next element of the enumeration. Calls to this method will enumerate successive elements.
    return this.fEnumeration.nextElement();
}

/**
 * Java.js : Point2D
 *
 * @author    Adnan Sagar, PhD <adnan@websemantics.ca>
 * @copyright 2004-2015 Web Semantics, Inc. (http://websemantics.ca)
 * @license   http://www.opensource.org/licenses/mit-license.php MIT
 * @since     6th January 2005
 * @package   websemantics/oea/java.js/awt/geom
 */

/** 
 * Class Point2D
 *
 * The Point2D class defines a point representing a location in (x, y) coordinate space.
 * 
 */

function Point2D(x, y) { /* implements Cloneable */

        this.className = "Point2D";

        /* double, float or integer */
        this.x = x;

        /* double, float or integer */
        this.y = y;
    }

Point2D.prototype.getX = function() {
        return this.x;
    }

Point2D.prototype.getY = function() {
        return this.y;
    }

Point2D.prototype.setLocation = function(x, y) {
        this.x = x;
        this.y = y;
    }

Point2D.prototype.toString = function() {
        return this.className + " [" + this.x + ", " + this.y + "]";
    }

Point2D.prototype.distanceSq = function(x1, y1, x2, y2) {
    // Summary
    // 
    // Returns the square of the distance between two points.  
    // OR 
    // Returns the square of the distance between this point and another point.
    //
    // Forms:
    // ======
    // (1) distanceSq(Point2D pt)
    // (2) distanceSq(x1,y1)
    // (3) distanceSq(x1,y1,x2,y2)

        /* (1) */
        if (x1 instanceof Point2D) {
            var pt = x1;
            x1 = pt.getX();
            y1 = pt.getY();
        }
        /* (2) */
        if (!x2 && !y2) {
            x2 = this.getX();
            y2 = this.getY();
        }
        x1 -= x2;
        y1 -= y2;
        return (x1 * x1 + y1 * y1);
    }

Point2D.prototype.distance = function(x1, y1, x2, y2) {
    // Summary
    // 
    // Returns the distance between two points.  
    // OR 
    // Returns the distance between this point and another point.
    // 
    // Forms:
    // ======
    // (1) distance(Point2D pt)
    // (2) distance(x1,y1)
    // (3) distance(x1,y1,x2,y2)

        /* (1) */
        if (x1 instanceof Point2D) {
            var pt = x1;
            x1 = pt.getX();
            y1 = pt.getY();
        }
        /* (2) */
        if (!x2 && !y2) {
            x2 = this.getX();
            y2 = this.getY();
        }
        x1 -= x2;
        y1 -= y2;
        return Math.sqrt(x1 * x1 + y1 * y1);
    }

Point2D.prototype.clone = function() {
    // Summary
    // Creates a new object of the same class and with the same contents as this object.  
        return this;
    }

Point2D.prototype.equals = function(obj) {
    // Summary
    // Determines whether or not two points are equal.  
    //
    // Two instances of Point2D are equal if the values of their x and y member fields,
    // representing their position in the coordinate space, are the same.

    if (obj instanceof Point2D)
        if (obj.getX() == this.getX() && obj.getY() == this.getY()) return true;
    return false;
}
/**
 * Java.js : Point
 *
 * @author    Adnan Sagar, PhD <adnan@websemantics.ca>
 * @copyright 2004-2015 Web Semantics, Inc. (http://websemantics.ca)
 * @license   http://www.opensource.org/licenses/mit-license.php MIT
 * @since     6th January 2005
 * @package   websemantics/oea/java.js/awt/geom
 */

Point.prototype = new Point2D();

function Point(x, y) { /* implements Serializable */
	// Forms:
	// (1) Point();
	// (2) Point(x,y);
	// (3) Point(Point pt);

        this.className = "Point";

        if (!x && !y) {
            x = 0;
            y = 0;
        }

        if (x instanceof Point) {
            var pt = x;
            x = pt.getX();
            y = pt.getY();
        }

        /* int */
        this.x = x;
        /* int */
        this.y = y;
    }

Point.prototype.getLocation = function() {
        return new Point(this.x, this.y);
    }

Point.prototype.setLocation = function(/* Point or int */ x, y) {
        if (x instanceof Point) {
            var pt = x;
            x = pt.getX();
            y = pt.getY();
        }
        this.move(x, y);
    }

Point.prototype.move = function(x, y) {
        this.x = Math.floor(x + 0.5);
        this.y = Math.floor(y + 0.5);
    }

Point.prototype.translate = function(dx, dy) {
		// Summary:
		// Translates this point, at location x,y, by dx and dy
        this.x += dx;
        this.y += dy;
    }

Point.prototype.equals = function(obj) {
		// Summary:
    // Determines whether or not two points are equal.  
    //
    // Two instances of Point are equal if the values of their x and y member fields,
    // representing their position in the coordinate space, are the same.

    if (obj instanceof Point)
        if (obj.getX() == this.getX() && obj.getY() == this.getY()) return true;
    return false;
}

/**
 * Java.js : Dimension2D
 *
 * @author    Adnan Sagar, PhD <adnan@websemantics.ca>
 * @copyright 2004-2015 Web Semantics, Inc. (http://websemantics.ca)
 * @license   http://www.opensource.org/licenses/mit-license.php MIT
 * @since     6th January 2005
 * @package   websemantics/oea/java.js/awt/geom
 */

/**
 * Class Dimension2D
 * 
 * The Dimension2D class is to encapsulate a width and a height dimension.
 * 
 */

function Dimension2D() { /* implements Cloneable */

        this.className = "Dimension2D";

    }

Dimension2D.prototype.getWidth = function() {
        // Abstract class 
    }

Dimension2D.prototype.getHeight = function() {
        // Abstract class 
    }

Dimension2D.prototype.setSize = function(width, height) {
    // Summary
    // Sets the size to a specified width and height 
    //
    // Forms:
    // (1) setSize(width,height)
    // (2) setSize(Dimension2D d)

        // Abstract class 
        if (width instanceof Dimension2D) {
            var d = width;
            width = d.getWidth();
            height = d.getHeight();
            this.setSize(width, height);
        }
    }

Dimension2D.prototype.clone = function() {
    // Abstract class 
}
/**
 * Java.js : Dimension2D
 *
 * @author    Adnan Sagar, PhD <adnan@websemantics.ca>
 * @copyright 2004-2015 Web Semantics, Inc. (http://websemantics.ca)
 * @license   http://www.opensource.org/licenses/mit-license.php MIT
 * @since     6th January 2005
 * @package   websemantics/oea/java.js/awt/geom
 */

/**
 * Class Dimension2D
 *
 * The Dimension class encapsulates the width and height of a component 
 * (in integer precision) in a single object.
 *  
 */

Dimension.prototype = new Dimension2D();

function Dimension(width, height) { /* implements Serializable */
	// Forms:
	// (1) Dimension();
	// (2) Dimension(width,height);
	// (3) Dimension(Dimension d);

        this.className = "Dimension";

        if (!width && !height) {
            width = 0;
            height = 0;
        }

        if (width instanceof Dimension) {
            var d = width;
            width = d.getWidth();
            height = d.getHeight();
        }

        /* int */
        this.width = width;
        /* int */
        this.height = height;
    }

Dimension.prototype.getWidth = function() {
        return this.width;
    }

Dimension.prototype.getHeight = function() {
        return this.height;
    }

Dimension.prototype.setSize = function(width, height) {
        if (width instanceof Dimension) {
            var d = width;
            width = d.getWidth();
            height = d.getHeight();
        }
        this.width = Math.ceil(width);
        this.height = Math.ceil(height);
    }

Dimension.prototype.getSize = function() {
        return new Dimension(this);
    }

Dimension.prototype.equals = function(obj) {
		// Summary:
		// Checks whether two dimension objects have equal values. 
        if (obj instanceof Dimension)
            if (obj.getWidth() == this.getWidth() && obj.getHeight() == this.getHeight()) return true;
        return false;
    }

Dimension.prototype.hashCode = function() {
		// Summary:
		// Returns the hash code for this <code>Dimension</code>. 
        var sum = this.width + this.height;
        return sum * (sum + 1) / 2 + this.width;
    }

Dimension.prototype.toString = function() {
    return this.className + " [width=" + this.width + ",height=" + this.height + "]";
}
/**
 * Java.js : Rectangle2D
 *
 * NOT FULLY IMPLEMENTED
 *
 * @author    Adnan Sagar, PhD <adnan@websemantics.ca>
 * @copyright 2004-2015 Web Semantics, Inc. (http://websemantics.ca)
 * @license   http://www.opensource.org/licenses/mit-license.php MIT
 * @since     6th January 2005
 * @package   websemantics/oea/java.js/awt/geom
 */

function Rectangle2D() { /* extends RectangularShape */

        this.className = "Rectangle2D";

        this.MIN_VALUE = -2147483648;
        this.MAX_VALUE = 2147483647;
        this.OUT_LEFT = 1; // The bitmask that indicates that a point lies to the left of this Rectangle2D<
        this.OUT_TOP = 2; // The bitmask that indicates that a point lies above this Rectangle2D<
        this.OUT_RIGHT = 4; // The bitmask that indicates that a point lies to the right of this Rectangle2D<
        this.OUT_BOTTOM = 8; // The bitmask that indicates that a point lies below this Rectangle2D<

        /* float */
        this.x = 0;
        /* float */
        this.y = 0;
        /* float */
        this.width = 0;
        /* float */
        this.height = 0;
    }

Rectangle2D.prototype.toString = function() {
		// Summary:
		// Checks whether two rectangles are equal
    return this.className + " [x=" + this.x + ",y=" + this.y + ",width=" + this.width + ",height=" + this.height + "]";
}
	


/**
 * Java.js : gRectangle
 *
 * @author    Adnan Sagar, PhD <adnan@websemantics.ca>
 * @copyright 2004-2015 Web Semantics, Inc. (http://websemantics.ca)
 * @license   http://www.opensource.org/licenses/mit-license.php MIT
 * @since     6th January 2005
 * @package   websemantics/oea/java.js/awt/geom
 */

/** 
 * Class gRectangle [ This was named gRectangle becuase of naming comnfilc 
 *                 Rectangle from Draw2D.svg ]
 */

gRectangle.prototype = new Rectangle2D();

function gRectangle(x, y, width, height) { /* implements Shape, Serializable */
    // Forms:
    // =====
    // (1) gRectangle();
    // (2) gRectangle(gRectangle r);
    // (3) gRectangle(x,y,width,height);
    // (4) gRectangle(width,height);
    // (5) gRectangle(Point p, Dimension d) 
    // (6) gRectangle(Point p) 
    // (7) gRectangle(Dimension d) 

    this.className = "gRectangle";

    /* No parameters */
    if (x == undefined && y == undefined && width == undefined && height == undefined) {
        x = 0;
        y = 0;
        width = 0;
        height = 0;
    }

    // Two parameters */
    if (x != undefined && y != undefined && width == undefined && height == undefined) {
        if (x instanceof Point && y instanceof Dimension) {
            var p = x;
            var d = y;
            x = p.getX();
            y = p.getY();
            width = d.getWidth();
            height = d.getHeight();
        } else {
            width = x;
            height = y;
            x = 0;
            y = 0;
        }
    }

    /* One parameter */
    if (x instanceof gRectangle) {
        var r = x;
        x = r.getX();
        y = r.getY();
        width = r.getWidth();
        height = r.getHeight();
    } else
    if (x instanceof Point) {
        var p = x;
        x = p.getX();
        y = p.getY();
        width = 0;
        height = 0;
    } else
    if (x instanceof Dimension) {
        var d = x;
        x = 0;
        y = 0;
        width = d.getWidth();
        height = d.getHeight();
    }

    /* Four parameters or one of the above */
    /* int */
    this.x = x;
    /* int */
    this.y = y;
    /* int */
    this.width = width;
    /* int */
    this.height = height;
}


gRectangle.prototype.getX = function() {
        return this.x;
    }

gRectangle.prototype.getY = function() {
        return this.y;
    }

gRectangle.prototype.getWidth = function() {
        return this.width;
    }

gRectangle.prototype.getHeight = function() {
        return this.height;
    }

gRectangle.prototype.getBounds = function() {
		// Summary:
		// Gets the bounding gRectangle of this gRectangle.
        return new gRectangle(this.x, this.y, this.width, this.height);
    }

gRectangle.prototype.getBounds2D = function() {
		// Summary:
		// Return the high precision bounding box of this rectangle
        return new gRectangle(this.x, this.y, this.width, this.height);
    }

gRectangle.prototype.setBounds = function(x, y, width, height) {
		// Summary:
    // Sets the bounding gRectangle of this gRectangle  
    // 
    // Forms:
    // ======
    // (1) setBounds(gRectangle r);
    // (2) setBounds(x,y,width,height);

        if (x instanceof gRectangle) {
            var r = x;
            this.setBounds(r.getX(), r.getY(), r.getWidth(), r.getHeight());
            return;
        }
        this.reshape(x, y, width, height);
    }

gRectangle.prototype.setRect = function( /* double */ x, /* double */ y, /* double */ width, /* double */ height) {
		// Summary:
    // Sets the bounds of this gRectangle to the specified x, y, width,and height.  

        /* int */
        var x0 = Math.floor(x);
        /* int */
        var y0 = Math.floor(y);
        /* int */
        var x1 = Math.ceil(x + width);
        /* int */
        var y1 = Math.ceil(y + height);
        this.setBounds(x0, y0, x1 - x0, y1 - y0);
    }

gRectangle.prototype.reshape = function( /* int */ x, /* int */ y, /* int */ width, /* int */ height) {
		// Summary:
    // Sets the bounding gRectangle of this gRectangle to the specified x, y, width, and height.  

        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }

gRectangle.prototype.getLocation = function() {
		// Summary:
    // Returns the location of this gRectangle.  
        return new Point(this.x, this.y);
    }

gRectangle.prototype.setLocation = function(x, y) {
		// Summary:
    // Moves this gRectangle to the specified location.  
    //
    // Forms:
    // ======
    // (1) setLocation(x,y)
    // (2) setLocation(Point p)

        if (x instanceof Point) {
            var p = x;
            this.setLocation(p.getX(), p.getY());
            return;
        }
        this.move(x, y);
    }

gRectangle.prototype.move = function(x, y) {
		// Summary:
    // Moves this gRectangle to the specified location.  
        this.x = x;
        this.y = y;
    }

gRectangle.prototype.translate = function(dx, dy) {
		// Summary:
    // Translates this point, at location x,y, by dx and dy 
        this.x += dx;
        this.y += dy;
    }

gRectangle.prototype.getSize = function() {
		// Summary:
    // Gets the size of this gRectangle, represented by the returned Dimension. 
        return new Dimension(this.width, this.height);
    }

gRectangle.prototype.setSize = function(width, height) {
		// Summary:
    // Sets the size of this gRectangle  
    //
    // Forms:
    // ======
    // (1) setSize(width,height)
    // (2) setSize(Dimension d)

        if (width instanceof Dimension) {
            var d = width;
            this.setSize(d.getWidth(), d.getHeight());
            return;
        }
        this.resize(width, height);
    }

gRectangle.prototype.resize = function(width, height) {
		// Summary:
    // Sets the size of this gRectangle to the specified width and height. 
        this.width = width;
        this.height = height;
    }

gRectangle.prototype.contains = function(x, y, width, height) {
		// Summary:
    // Checks whether or not this gRectangle contains the specified Point.
    //
    // Forms:
    // ======
    // (1) contains(x,y)
    // (2) contains(Point p) 
    // (3) contains(x,y,width,height) 
    // (3) contains(gRectangle r) 

        if (x == undefined) return false;

        // One parameters 
        if (x instanceof Point) {
            var p = x;
            return this.contains(p.getX(), p.getY());
        }
        if (x instanceof gRectangle) {
            var r = x;
            return this.contains(r.getX(), r.getY(), r.getWidth(), r.getHeight());
        }
        // Two parameters 
        if (x && y && !width && !height) return this.inside(x, y);
        // Four parameters 
        // Checs whether this gRectangle entirely contains the gRectangle at the specified location
        var X = x;
        var Y = y;
        var W = width;
        var H = height;
        var x = this.x;
        var y = this.y;
        var w = this.width;
        var h = this.height;

        if ((w | h | W | H) < 0) {
            return false;
        } // At least one of the dimensions is negative...

        if (X < x || Y < y) {
            return false;
        } // Note: if any dimension is zero, tests below must return false...
        w += x;
        W += X;
        if (W <= X) {
            // X+W overflowed or W was zero, return false if...
            // either original w or W was zero or
            // x+w did not overflow or
            // the overflowed x+w is smaller than the overflowed X+W
            if (w >= x || W > w) {
                return false;
            }
        } else {
            // X+W did not overflow and W was not zero, return false if...
            // original w was zero or
            // x+w did not overflow and x+w is smaller than X+W
            if (w >= x && W > w) {
                return false;
            }
        }
        h += y;
        H += Y;
        if (H <= Y) {
            if (h >= y || H > h) {
                return false;
            }
        } else {
            if (h >= y && H > h) {
                return false;
            }
        }
        return true;
    }

gRectangle.prototype.inside = function(X, Y) {
		// Summary:
    // Checks whether or not this gRectangle contains the point at the specified location 
        var x = this.x;
        var y = this.y;
        var w = this.width;
        var h = this.height;
        if ((w | h) < 0) {
            return false;
        } // At least one of the dimensions is negative...
        if (X < x || Y < y) {
            return false;
        } // Note: if either dimension is zero, tests below must return false...
        w += x;
        h += y;
        //    overflow || intersect
        return ((w < x || w > X) && (h < y || h > Y));
    }

gRectangle.prototype.intersects = function( /* gRectangle */ r) {
		// Summary:
    // Determines whether or not this gRectangle and the specified gRectangle intersect.
    //
    // Two rectangles intersect if their intersection is nonempty.
        var tw = this.width;
        var th = this.height;
        var rw = r.width;
        var rh = r.height;
        if (rw <= 0 || rh <= 0 || tw <= 0 || th <= 0) {
            return false;
        }
        var tx = this.x;
        var ty = this.y;
        var rx = r.x;
        var ry = r.y;
        rw += rx;
        rh += ry;
        tw += tx;
        th += ty;
        //      overflow || intersect
        return ((rw < rx || rw > tx) && (rh < ry || rh > ty) && (tw < tx || tw > rx) && (th < ty || th > ry));
    }

gRectangle.prototype.intersection = function( /* gRectangle */ r) {
		// Summary:
    // Computes the intersection of this gRectangle with the specified gRectangle.
    //
    //Returns a new gRectangle that represents the intersection of the two rectangles.
    //If the two rectangles do not intersect, the result will be an empty rectangle.

        var tx1 = this.x;
        var ty1 = this.y;
        var rx1 = r.x;
        var ry1 = r.y;
        var tx2 = tx1;
        tx2 += this.width;
        var ty2 = ty1;
        ty2 += this.height;
        var rx2 = rx1;
        rx2 += r.width;
        var ry2 = ry1;
        ry2 += r.height;
        if (tx1 < rx1) tx1 = rx1;
        if (ty1 < ry1) ty1 = ry1;
        if (tx2 > rx2) tx2 = rx2;
        if (ty2 > ry2) ty2 = ry2;
        tx2 -= tx1;
        ty2 -= ty1;
        // tx2,ty2 will never overflow (they will never be
        // larger than the smallest of the two source w,h)
        // they might underflow, though...
        if (tx2 < this.MIN_VALUE) tx2 = this.MIN_VALUE;
        if (ty2 < this.MIN_VALUE) ty2 = this.MIN_VALUE;
        return new gRectangle(tx1, ty1, tx2, ty2);
    }

gRectangle.prototype.union = function( /* gRectangle */ r) {
		// Summary:
    // Computes the union of this gRectangle with the specified gRectangle.
    //
    // Returns a new gRectangle that represents the union of the two rectangles

        var x1 = Math.min(this.x, r.x);
        var x2 = Math.max(this.x + this.width, r.x + r.width);
        var y1 = Math.min(this.y, r.y);
        var y2 = Math.max(this.y + this.height, r.y + r.height);
        return new gRectangle(x1, y1, x2 - x1, y2 - y1);
    }

gRectangle.prototype.add = function(newx, newy, newwidth, newheight) {
		// Summary:
    // Adds a point, specified by the integer arguments newx and newy, to this gRectangle. 
    // OR
    // Adds a gRectangle to this gRectangle.
    //
    // The resulting gRectangle is the smallest gRectangle that contains both the original 
    // gRectangle and the specified point OR The resulting gRectangle is the union of the two rectangles.
    //
    // After adding a point/rectangle, a call to contains with the added point as an argument does 
    // not necessarily return true. 
    // The contains method does not return true for points on the right or bottom edges of a gRectangle. 
    // Therefore, if the added point falls on the right or bottom edge of the enlarged gRectangle, 
    // contains returns false for that point.
    //
    // Forms:
    // ======
    // (1) add(point pt)
    // (2) add(newx, newy)
    // (3) add(gRectangle r)

        if (newx instanceof Point) {
            var pt = newx;
            this.add(pt.getX(), pt.getY(), 0, 0);
            return;
        }
        if (newx instanceof gRectangle) {
            var r = newx;
            this.add(r.getX(), r.getY(), r.getWidth(), r.getHeight());
            return;
        }
        var x1 = Math.min(this.x, newx);
        var x2 = Math.max(this.x + this.width, newx + newwidth);
        var y1 = Math.min(this.y, newy);
        var y2 = Math.max(this.y + this.height, newy + newheight);

        this.x = x1;
        this.y = y1;
        this.width = x2 - x1;
        this.height = y2 - y1;
    }

gRectangle.prototype.grow = function(h, v) {
		// Summary:
    // Resizes the gRectangle both horizontally and vertically.
    //
    // This method modifies the gRectangle so that it is h units larger on both the left and right side,
    // and v units larger at both the top and bottom. 

        this.x -= h;
        this.y -= v;
        this.width += h * 2;
        this.height += v * 2;
    }

gRectangle.prototype.isEmpty = function(h, v) {
		// Summary:
    // Determines whether or not this gRectangle is empty. 
    //
    // A gRectangle is empty if its width or its height is less than or equal to zero.
        return (this.width <= 0) || (this.height <= 0);
    }

gRectangle.prototype.outcode = function( /* double */ x, /* double */ y) {
		// Summary:
    // Determines where the specified coordinates lie with respect to this gRectangle. 
    //
    // This method computes a binary OR of the appropriate mask values indicating, for each side of this 
    // gRectangle, whether or not the specified coordinates are on the same side of the edge as the rest of this gRectangle.

        /*
         * Note on casts to double below.  If the arithmetic of
         * x+w or y+h is done in int, then we may get integer
         * overflow. By converting to double before the addition
         * we force the addition to be carried out in double to
         * avoid overflow in the comparison.
         */

        var out = 0;
        if (this.width <= 0) {
            out |= this.OUT_LEFT | this.OUT_RIGHT;
        } else if (x < this.x) {
            out |= this.OUT_LEFT;
        } else if (x > this.x + this.width) {
            out |= this.OUT_RIGHT;
        }
        if (this.height <= 0) {
            out |= this.OUT_TOP | this.OUT_BOTTOM;
        } else if (y < this.y) {
            out |= this.OUT_TOP;
        } else if (y > this.y + this.height) {
            out |= this.OUT_BOTTOM;
        }
        return out;
    }

gRectangle.prototype.createIntersection = function( /* Rectangle2D */ r) {
		// Summary:
    // Returns a new Rectangle2D object representing the intersection of this gRectangle with the specified Rectangle2D. 
    //
    // A gRectangle is empty if its width or its height is less than or equal to zero.

        if (r instanceof gRectangle) {
            return this.intersection(r);
        }
        /*
          NOT IMPLEMENTED 
        	Rectangle2D  var dest = new Rectangle2D.Double();
        	Rectangle2D.intersect(this, r, dest);
        	return dest;
        */

    }

gRectangle.prototype.createUnion = function( /* Rectangle2D */ r) {
		// Summary:
    // Returns a new Rectangle2D object representing the union of this gRectangle with the specified Rectangle2D. 

        if (r instanceof gRectangle) {
            return this.union(r);
        }
        /*
          NOT IMPLEMENTED 
          Rectangle2D dest = new Rectangle2D.Double();
        	Rectangle2D.union(this, r, dest);
        	return dest;
         */
        return false; // [Remove]
    }

gRectangle.prototype.equals = function( /* Object */ obj) {
		// Summary:
    // Checks whether two rectangles are equal. 
    //
    // The result is true if and only if the argument is not null and is a gRectangle 
    // object that has the same top-left corner, width, and height as this gRectangle. 
    // 
    // Forms:
    // ======
    // (1) equals(gRectangle r)
    // (2) equals(Rectangle2D r)

    if (obj instanceof gRectangle) {
        var r = obj;
        return ((x == r.x) && (y == r.y) && (width == r.width) && (height == r.height));
    }
    /*
     NOT IMPLEMENTED 
     return super.equals(obj);	
    */
    return false; // [Remove]
}

/**
 * Java.js : gPolygon
 *
 * @author    Adnan Sagar, PhD <adnan@websemantics.ca>
 * @copyright 2004-2015 Web Semantics, Inc. (http://websemantics.ca)
 * @license   http://www.opensource.org/licenses/mit-license.php MIT
 * @since     7th August 2005
 * @package   websemantics/oea/java.js/awt/geom
 */

/**
 * Class gPolygon
 * The gPolygon class encapsulates a description of a closed, two-dimensional 
 * region within a coordinate space. This region is bounded by an arbitrary 
 * number of line segments, each of which is one side of the polygon. 
 * Internally, a polygon comprises of a list of x, y coordinate pairs, where each
 * pair defines a vertex of the polygon, and two successive pairs are the 
 * endpoints of a line that is a side of the polygon. The first and final
 * pairs of x, y points are joined by a line segment that closes the polygon.  
 * This gPolygon is defined with an even-odd winding rule.  
 * See {@link java.awt.geom.PathIterator#WIND_EVEN_ODD WIND_EVEN_ODD}
 *
 *
 * New: 
 * (1) Smooth() function that take smoothness level to smooth the polygon by using the averge method
 * (2) decimationPath() function for tessellating the curve of a path to a polygon
 * 
 */

function gPolygon( /* int[] */ xpoints, /* int[] */ ypoints, /* int[] */ npoints) { // implements Shape
        var argv = gPolygon.arguments;
        var argc = gPolygon.length;
        this.className = "gPolygon";

        // The total number of points.  The value of npoints represents the number of 
        // valid points in this gPolygon and might be less than the number of elements in 
        // xpoints ypoints
        /* int */
        this.npoints = 0;
        // The array of x coordinates.  The number of elements in this array might be 
        // more than the number of x coordinates in this gPolygon.  The extra elements 
        // allow new points to be added to this gPolygon without re-creating this array.
        /* int[] */
        this.xpoints = null;
        // The array of y coordinates.  The number of elements in this array might be 
        // more than the number of y coordinates in this gPolygon.  The extra elements 
        // allow new points to be added to this gPolygon without re-creating this array.
        /* int[] */
        this.ypoints = null;
        /* gRectangle */
        this.bounds = null;
        
        if (argv.length == 1) 
        	this.initgPolygon();
        else
        if (argv.length > 0) 
        	this.initgPolygon(xpoints, ypoints, npoints);

    }

gPolygon.prototype.initgPolygon = function(xpoints, ypoints, npoints) {
    // Forms
    // ======
    // (1) initgPolygon()
    // (2) initgPolygon(xpoints,ypoints,npoints)
        if (xpoints != undefined) this.xpoints = xpoints;
        else this.xpoints = new Array();
        if (ypoints != undefined) this.ypoints = ypoints;
        else this.ypoints = new Array();
        if (npoints != undefined) this.npoints = npoints;
        else this.npoints = 0;
    }

gPolygon.prototype.reset = function() {
		// Summary
    // Resets this gPolygon object to an empty polygon. The coordinate arrays and 
    // the data in them are left untouched but the number of points is reset to 
    // zero to mark the old vertex data as invalid and to start accumulating new 
    // vertex data at the beginning.

        this.npoints = 0;
        this.bounds = null;
    }

gPolygon.prototype.invalidate = function() {
		// Summary
    // Invalidates or flushes any internally-cached data that depends on the vertex 
    // coordinates of this gPolygon. This method should be called after any direct 
    // manipulation of the coordinates in the xpoints or ypoints arrays to avoid 
    // inconsistent results from methods such as getBounds or contains that might 
    // cache data from earlier computations relating to the vertex coordinates.

        this.bounds = null;
    }

gPolygon.prototype.translate = function( /* int */ deltaX, /* int */ deltaY) {
		// Summary
    // Translates the vertices of the gPolygon by deltaX along the x axis and by 
    // deltaY along the y axis.

        for (var i = 0; i < this.npoints; i++) {
            this.xpoints[i] += deltaX;
            this.ypoints[i] += deltaY;
        }
        if (this.bounds != null) {
            this.bounds.translate(deltaX, deltaY);
        }
    }

gPolygon.prototype.calculateBounds = function( /*int[]*/ xpoints, /*int[]*/ ypoints, /*int[]*/ npoints) {
		// Summary
    // Calculates the bounding box of the points passed to the constructor.

        var boundsMinX = -32767; // 0x7fffffff;// Integer.MAX_VALUE;
        var boundsMinY = -32767; // 0x7fffffff;//Integer.MAX_VALUE;
        var boundsMaxX = 65535; // 0x80000000;//Integer.MIN_VALUE;
        var boundsMaxY = 65535; // 0x80000000;//Integer.MIN_VALUE;

        for (var i = 0; i < npoints; i++) {
            var x = xpoints[i];
            boundsMinX = Math.min(boundsMinX, x);
            boundsMaxX = Math.max(boundsMaxX, x);
            var y = ypoints[i];
            boundsMinY = Math.min(boundsMinY, y);
            boundsMaxY = Math.max(boundsMaxY, y);
        }
        this.bounds = new gRectangle(boundsMinX, boundsMinY, boundsMaxX - boundsMinX, boundsMaxY - boundsMinY);
    }

gPolygon.prototype.updateBounds = function( /* int */ x, /* int */ y) {
		// Summary
    // Resizes the bounding box to accomodate the specified coordinates.

        if (x < this.bounds.x) {
            this.bounds.width = this.bounds.width + (this.bounds.x - x);
            this.bounds.x = x;
        } else {
            this.bounds.width = Math.max(this.bounds.width, x - this.bounds.x);
            // bounds.x = bounds.x;
        }

        if (y < this.bounds.y) {
            this.bounds.height = this.bounds.height + (this.bounds.y - y);
            this.bounds.y = y;
        } else {
            this.bounds.height = Math.max(this.bounds.height, y - this.bounds.y);
            // bounds.y = bounds.y;
        }
    }

gPolygon.prototype.addPoint = function( /* int */ x, /* int */ y) {
		// Summary
    // Appends the specified coordinates to this gPolygon. If an operation that 
    // calculates the bounding box of this gPolygon has already been performed, such as  
    // getBounds or contains, then this method updates the bounding box. 

        this.xpoints[this.npoints] = x;
        this.ypoints[this.npoints] = y;
        this.npoints++;

        if (this.bounds != null) {
            this.updateBounds(x, y);
        }

    }

gPolygon.prototype.findPoint = function( /* int */ x, /* int */ y) {
        for (var i = 0; i < this.npoints; ++i)
            if (this.xpoints[i] == x && this.ypoints[i] == y) return i;

        return null;
    }

gPolygon.prototype.remove = function( /* int */ x, /* int */ y) {

        var i = this.findPoint(x, y);

        if (i == null) return;

        var n = --this.npoints;

        for (var j = i; j < n; ++j) {
            this.xpoints[j] = this.xpoints[j + 1];
            this.ypoints[j] = this.ypoints[j + 1];
        }

    }

gPolygon.prototype.getBounds = function() {
    // Summary
    // Gets the bounding box of this gPolygon. The bounding box is the smallest {@link Rectangle} whose
    // sides are parallel to the x and y axes of the coordinate space, and can completely contain the gPolygon.
        return this.getBoundingBox();
    }

gPolygon.prototype.getBoundingBox = function() {
    // Summary
    // Returns the bounds of this gPolygon.
        if (this.npoints == 0) {
            return new gRectangle();
        }
        if (this.bounds == null) {
            this.calculateBounds(this.xpoints, this.ypoints, this.npoints);
        }
        return this.bounds.getBounds();
    }

gPolygon.prototype.inside = function( /* int or Point */ x, /* int */ y) {
		// Summary:
		// Determines whether the specified Point is inside this gPolygon.
        return this.contains(x, y);
    }

gPolygon.prototype.contains = function( /* int or Point */ x, /* int */ y, /* int */ w, /* int */ h) {
    // Summary: 
    // 
    // Determines whether the specified Point is inside this gPolygon.
    //  - OR -
    // Tests if the interior of this gPolygon entirely contains the specified set of rectangular coordinates.
    //
    // Forms:
    // (1) contains(Point p)
    // (2) contains(Rectangle2D r)
    // (3) contains(int x, int y);
    // (4) contains(int x,int y,int w,int h);

        if (x instanceof Point) {
            var p = x;
            return this.contains(p.x, p.y);
        }

        if (x instanceof Rectangle2D) {
            var r = x;
            return this.contains(r.getX(), r.getY(), r.getWidth(), r.getHeight());
        }

        if (x != undefined && y != undefined && w == undefined && h == undefined) {

            if (this.npoints <= 2 || !this.getBoundingBox().contains(x, y)) {
                return false;
            }
            var hits = 0;

            var lastx = this.xpoints[this.npoints - 1];
            var lasty = this.ypoints[this.npoints - 1];
            var curx, cury;

            // Walk the edges of the polygon
            for (var i = 0; i < this.npoints; lastx = curx, lasty = cury, i++) {
                curx = this.xpoints[i];
                cury = this.ypoints[i];

                if (cury == lasty) {
                    continue;
                }

                var leftx;
                if (curx < lastx) {
                    if (x >= lastx) {
                        continue;
                    }
                    leftx = curx;
                } else {
                    if (x >= curx) {
                        continue;
                    }
                    leftx = lastx;
                }

                var test1, test2;
                if (cury < lasty) {
                    if (y < cury || y >= lasty) {
                        continue;
                    }
                    if (x < leftx) {
                        hits++;
                        continue;
                    }
                    test1 = x - curx;
                    test2 = y - cury;
                } else {
                    if (y < lasty || y >= cury) {
                        continue;
                    }
                    if (x < leftx) {
                        hits++;
                        continue;
                    }
                    test1 = x - lastx;
                    test2 = y - lasty;
                }

                if (test1 < (test2 / (lasty - cury) * (lastx - curx))) {
                    hits++;
                }
            }
            return ((hits & 1) != 0);
        } // contains(x,y)

        if (x != undefined && y != undefined && w != undefined && h != undefined) {
            if (this.npoints <= 0 || !this.getBoundingBox().intersects(x, y, w, h)) {
                return false;
            }
            /* Crossings */
            var cross = getCrossings(x, y, x + w, y + h);
            return (cross != null && cross.covers(y, y + h));

        } // contains(x,y,w,h)

    }

gPolygon.prototype.getBounds2D = function() {
	    // Summary: 
			// Returns the high precision bounding box of the Shape.
			// [NOT IMPLEMENTED]
        return this.getBounds();
    }

gPolygon.prototype.getCrossings = function( /* double */ xlo, /* double */ ylo, /* double */ xhi, /* double */ yhi) {
        /*
        Crossings cross = new Crossings.EvenOdd(xlo, ylo, xhi, yhi);
        	int lastx = xpoints[npoints - 1];
        	int lasty = ypoints[npoints - 1];
        	int curx, cury;

        	// Walk the edges of the polygon
        	for (int i = 0; i < npoints; i++) {
        	    curx = xpoints[i];
        	    cury = ypoints[i];
        	    if (cross.accumulateLine(lastx, lasty, curx, cury)) {
        		return null;
        	    }
        	    lastx = curx;
        	    lasty = cury;
        	}

        	return cross;
        */
    }

gPolygon.prototype.intersects = function( /* double */ x, /* double */ y, /* double */ w, /* double */ h) {
    // Summary
    // Tests if the interior of this gPolygon intersects the interior of a specified 
    // set of rectangular coordinates.
        if (this.npoints <= 0 || !this.getBoundingBox().intersects(x, y, w, h)) {
            return false;
        }

        /* Crossings */
        var cross = this.getCrossings(x, y, x + w, y + h);
        return (cross == null || !cross.isEmpty());
    }

gPolygon.prototype.getPathIterator = function( /* AffineTransform */ at) {
    // Summery
    // Returns an iterator object that iterates along the boundary of this gPolygon and 
    // provides access to the geometry of the outline of this gPolygon.
        return new gPolygonPathIterator(this, at);
    }

gPolygon.prototype.serialize = function() {
        var str = "";

        for (var i = 0; i < this.npoints; i++)
            str += parseInt(this.xpoints[i]) + "," + parseInt(this.ypoints[i]) + " ";

        return str;
    }

gPolygon.prototype.deserialize = function( /* String */ str) {
        this.initgPolygon();

        //if(str == undefined || str == "" || str == null) return;

        var s = str.split(' ');
        for (var i = 0; i < s.length; i++) {
            var m = s[i].split(",");
            if (m != undefined && m != null && m.length > 1) {
                var x = parseFloat(m[0]);
                var y = parseFloat(m[1]);
                if (!isNaN(x) && !isNaN(y)) this.addPoint(x, y);
            }
        }

    }

gPolygon.prototype.smooth = function( /* int */ level) { // level of smoothness (point to be averged including the current one), only odd numbers 3,5,7,9
				// Summary
				// Takes smoothness level to smooth the polygon by using the averge method
        
        var n = this.npoints;
        var xx = this.xpoints;
        var yy = this.ypoints;

        var nx = new Array();
        var ny = new Array();

        for (var i = 0; i < n; i++) {
            var xSum = 0;
            var ySum = 0;
            for (var j = 0; j < level; j++) {
                var ind = i + j - ((level - 1) / 2);
                if (ind < 0) ind += n;
                else if (ind >= n) ind = ind % n;
                xSum += xx[ind];
                ySum += yy[ind];
            }
            nx[i] = xSum / level;
            ny[i] = ySum / level;
        }

        this.xpoints = nx;
        this.ypoints = ny;

    }

gPolygon.prototype.decimationPath = function( /* int */ npoints, /* SVGPathElement*/ path, /* float */ viewBoxX, viewBoxY, viewBoxW, viewBoxH, viewPortX, viewPortY, viewPortW, viewPortH) {
    // Summary:
    // decimationPath: tessellating the curve of a path to a polygon
    // this function considers the viewBox and ViewPort of an SVG segment

        if (viewBoxX == undefined) viewBoxX = 0;
        if (viewBoxY == undefined) viewBoxY = 0;
        if (viewBoxW == undefined) viewBoxW = innerWidth;
        if (viewBoxH == undefined) viewBoxH = innerHeight;

        if (viewPortX == undefined) viewPortX = 0;
        if (viewPortY == undefined) viewPortY = 0;
        if (viewPortW == undefined) viewPortW = innerWidth;
        if (viewPortH == undefined) viewPortH = innerHeight;

        var ratioX = viewPortW / viewBoxW;
        var ratioY = viewPortH / viewBoxH;

        // Convert a path to Polygon
        var d = path.getTotalLength() / npoints;
        for (var i = 0; i < npoints; i++) {
            p = path.getPointAtLength(i * d);
            this.addPoint((p.x - viewBoxX) * ratioX, (p.y - viewBoxY) * ratioY);
        }

    }

gPolygon.prototype.getPathData = function( /* float */ viewBoxX, viewBoxY, viewBoxW, viewBoxH, viewPortX, viewPortY, viewPortW, viewPortH) {
    // Summary:
    // convert polygon to path data
    // this function considers the viewBox and ViewPort of an SVG segment

        var pathData = null;

        if (viewBoxX == undefined) viewBoxX = 0;
        if (viewBoxY == undefined) viewBoxY = 0;
        if (viewBoxW == undefined) viewBoxW = innerWidth;
        if (viewBoxH == undefined) viewBoxH = innerHeight;

        if (viewPortX == undefined) viewPortX = 0;
        if (viewPortY == undefined) viewPortY = 0;
        if (viewPortW == undefined) viewPortW = innerWidth;
        if (viewPortH == undefined) viewPortH = innerHeight;

        var ratioX = viewPortW / viewBoxW;
        var ratioY = viewPortH / viewBoxH;


        for (var i = 0; i < this.npoints; i++)
            if (pathData == null)
                pathData = "M " + (parseInt(this.xpoints[i]) / ratioX + viewBoxX) + " " + (parseInt(this.ypoints[i]) / ratioY + viewBoxY) + " ";
            else
                pathData += "L " + (parseInt(this.xpoints[i]) / ratioX + viewBoxX) + " " + (parseInt(this.ypoints[i]) / ratioY + viewBoxY) + " ";

        return pathData;
    }

gPolygon.prototype.toString = function() {
    var ret = "";
    for (var i = 0; i < this.npoints; i++)
        ret += this.xpoints[i] + "," + this.ypoints[i] + " "; // for double

    return this.className + "[nPoints = " + this.npoints + "]\n" + "X: " + this.xpoints + "\nY: " + this.ypoints;
}
/**
 * Java.js : Insets
 *
 * @author    Adnan Sagar, PhD <adnan@websemantics.ca>
 * @copyright 2004-2015 Web Semantics, Inc. (http://websemantics.ca)
 * @license   http://www.opensource.org/licenses/mit-license.php MIT
 * @since     5th January 2005
 * @package   websemantics/oea/java.js/awt
 */

/**
 * Class Insets [comments are taken from java]
 * 
 * An Insets object is a representation of the borders of a container.
 * It specifies the space that a container must leave at each of its edges.
 * The space can be a border, a blank space, or a title. 
 * 
 */

function Insets(top, left, bottom, right) { /* implements Cloneable, Serializable */
        var argv = Insets.arguments;
        var argc = Insets.length;
        this.className = "Insets";

        if (argv.length > 0) 
        	this.initInsets(top, left, bottom, right);
    }

Insets.prototype.initInsets = function(top, left, bottom, right) {
        this.top = top;
        this.left = left;
        this.bottom = bottom;
        this.right = right;
    }

Insets.prototype.equals = function( /* Object */ obj) {
		// Summary:
		// Checks whether two insets objects are equal.
        if (obj instanceof Insets) {
            var insets = obj;
            return ((this.top == insets.top) && (this.left == insets.left) &&
                (this.bottom == insets.bottom) && (this.right == insets.right));
        }
        return false;
    }

Insets.prototype.hashCode = function() {
		// Summary:
		// Returns the hash code for this Insets.
        var sum1 = this.left + this.bottom;
        var sum2 = this.right + this.top;
        var val1 = sum1 * (sum1 + 1) / 2 + this.left;
        var val2 = sum2 * (sum2 + 1) / 2 + this.top;
        var sum3 = val1 + val2;
        return sum3 * (sum3 + 1) / 2 + val2;
    }

Insets.prototype.toString = function() {
        return this.className + " [top=" + this.top + ",left=" + this.left + ",bottom=" + this.bottom + ",right=" + this.right + "]";
    }

Insets.prototype.clone = function() {
    // Create a copy of this object
    // Not Implemented 
}
/**
 * Java.js :Color
 *
 * @author    Adnan Sagar, PhD <adnan@websemantics.ca>
 * @copyright 2004-2015 Web Semantics, Inc. (http://websemantics.ca)
 * @license   http://www.opensource.org/licenses/mit-license.php MIT
 * @since     11th January 2005
 * @package   websemantics/oea/java.js/awt
 */

/**
 * Class Color
 *
 * Also, see cColor class (bellow ) for constants,..use CColor object for access
 * 
 */

function Color( /*float*/ r, /*float*/ g, /*float*/ b, /*float*/ a) { /* implements Paint, Serializable  */
        var argv = Color.arguments;
        var argc = Color.length;
        this.className = "Color";

        /* long */
        this.pData = 0;
        /* int */
        this.value - 0;
        // The color value in the default sRGB ColorSpace as float components (no alpha).
        /* float */
        this.frgbvalue = new Array();
        // The color value in the native ColorSpace as float components (no alpha).
        /* float */
        this.fvalue = new Array();
        // The alpha value as a float component. If frgbvalue is null, this is not valid data, so compute from the int color value.
        /* float */
        this.falpha = 0.0;
        // The ColorSpace.  If null, then it's default is sRGB.
        /* ColorSpace */ // cs = null; [ NOT IMPLEMENTED ]
        
        if (argv.length > 0) 
        	this.initColor(r, g, b, a);
    }

Color.prototype.ifFloat = function(num) {
        var str = "n" + num;
        if (str.indexOf(".") == -1) return false;
        return true;
    }

Color.prototype.initColor = function(r, g, b, a) {
		    // Forms
		    // ======
		    // (1) initColor(int r,int g,int b)
		    // (2) initColor(int r,int g,int b,int a)
		    // (3) initColor(float r,float g,float b,float a) : Between 0:0.9999 [ 1.0 is not supported ]
		    // (4) initColor(int rgb)

        // One parameter
        if (r && !g && !b && !a) {
            var rgb = r;
            this.value = 0xff000000 | rgb;
            return;
        }

        if (!a) a = 255;

        if (this.ifFloat(r)) r = Math.round((r * 255 + 0.5));
        if (this.ifFloat(g)) g = Math.round((g * 255 + 0.5));
        if (this.ifFloat(b)) b = Math.round((b * 255 + 0.5));
        if (this.ifFloat(a)) a = Math.round((a * 255 + 0.5));

        this.value = ((a & 0xFF) << 24) | ((r & 0xFF) << 16) | ((g & 0xFF) << 8) | ((b & 0xFF) << 0);
        this.frgbvalue[0] = r / 255;
        this.frgbvalue[1] = g / 255;
        this.frgbvalue[2] = b / 255;
        this.falpha = a / 255;
        this.fvalue = this.frgbvalue;
    }

Color.prototype.getRGB = function() {
		// Summary:
		// Returns the RGB value representing the color in the default sRGB
        return this.value;
    }

Color.prototype.getRed = function() {
		// Summary
		// Returns the red component in the range 0-255 in the default sRGB space.
        return (this.getRGB() >> 16) & 0xFF;
    }

Color.prototype.getGreen = function() {
		// Summary
		// Returns the green component in the range 0-255 in the default sRGB space.
        return (this.getRGB() >> 8) & 0xFF;
    }

Color.prototype.getBlue = function() {
		// Summary
		// Returns the blue component in the range 0-255 in the default sRGB space.
        return (this.getRGB() >> 0) & 0xFF;
    }

Color.prototype.getRGBAsString = function() {
        return "rgb(" + this.getRed() + "," + this.getGreen() + "," + this.getBlue() + ")";
    }

Color.prototype.toString = function() {
    return this.className + " [r=" + this.getRed() + ",g=" + this.getGreen() + ",b=" + this.getBlue() + "]";
}


/**
 * Class cColor
 *
 * Constant Colors
 * 
 */

function cColor() {
        this.className = "cColor";

        this.white = new Color(255, 255, 255);
        this.WHITE = this.white;
        this.lightGray = new Color(192, 192, 192);
        this.LIGHT_GRAY = this.lightGray;
        this.gray = new Color(128, 128, 128);
        this.GRAY = this.gray;
        this.darkGray = new Color(64, 64, 64);
        this.DARK_GRAY = this.darkGray;
        this.black = new Color(0, 0, 0);
        this.BLACK = this.black;
        this.red = new Color(255, 0, 0);
        this.RED = this.red;
        this.pink = new Color(255, 175, 175);
        this.PINK = this.pink;
        this.orange = new Color(255, 200, 0);
        this.ORANGE = this.orange;
        this.yellow = new Color(255, 255, 0);
        this.YELLOW = this.yellow;
        this.green = new Color(0, 255, 0);
        this.GREEN = this.green;
        this.magenta = new Color(255, 0, 255);
        this.MAGENTA = this.magenta;
        this.cyan = new Color(0, 255, 255);
        this.CYAN = this.cyan;
        this.blue = new Color(0, 0, 255);
        this.BLUE = this.blue;
        this.white = new Color(255, 255, 255);
        this.WHITE = this.white;
        this.white = new Color(255, 255, 255);
        this.WHITE = this.white;

    }

cColor.prototype.toString = function() {
    return this.className;
}

var CColor = new cColor();
/**
 * Java.js : MouseListener
 *
 * @author    Adnan Sagar, PhD <adnan@websemantics.ca>
 * @copyright 2004-2015 Web Semantics, Inc. (http://websemantics.ca)
 * @license   http://www.opensource.org/licenses/mit-license.php MIT
 * @since     8th January 2005
 * @package   websemantics/oea/java.js/awt/event
 */

/**
 * Class MouseListener {Interface}
 *
 * The listener interface for receiving "interesting" mouse events 
 * (press, release, click, enter, and exit) on a component.
 * 
 */

MouseListener.prototype= new EventListener(); 
function MouseListener( ){;}

// Invoked when the mouse button has been clicked (pressed and released) on a component.
MouseListener.prototype.mouseClicked = function(/* MouseEvent */ e){;}

// Invoked when a mouse button has been pressed on a component.
MouseListener.prototype.mousePressed = function(/* MouseEvent */ e){;}

// Invoked when a mouse button has been released on a component.
MouseListener.prototype.mouseReleased = function(/* MouseEvent */ e){;}

// Invoked when the mouse enters a component.
MouseListener.prototype.mouseEntered = function(/* MouseEvent */ e){;}

// Invoked when the mouse exits a component.
MouseListener.prototype.mouseExited = function(/* MouseEvent */ e){;}

/**
 * Java.js : MouseMotionListener
 *
 * @author    Adnan Sagar, PhD <adnan@websemantics.ca>
 * @copyright 2004-2015 Web Semantics, Inc. (http://websemantics.ca)
 * @license   http://www.opensource.org/licenses/mit-license.php MIT
 * @since     8th January 2005
 * @package   websemantics/oea/java.js/awt/event
 */

/**
 * Class MouseMotionListener {Interface}
 * 
 * Invoked when a mouse button is pressed on a component and then dragged.
 * MOUSE_DRAGGED events will continue to be delivered to the component where 
 * the drag originated until the mouse button is released (regardless of 
 * whether the mouse position is within the bounds of the component).
 * 
 */

MouseMotionListener.prototype= new EventListener(); 

function MouseMotionListener( ){;}

MouseMotionListener.prototype.mouseDragged = function(/* MouseEvent */ e){;}

// Invoked when the mouse cursor has been moved onto a component but no buttons have been pushed.
MouseMotionListener.prototype.mouseMoved = function(/* MouseEvent */ e){;}

/**
 * Java.js : MouseEvent
 *
 * @author    Adnan Sagar, PhD <adnan@websemantics.ca>
 * @copyright 2004-2015 Web Semantics, Inc. (http://websemantics.ca)
 * @license   http://www.opensource.org/licenses/mit-license.php MIT
 * @since     12th January 2005
 * @package   websemantics/oea/java.js/awt/event
 */

/**
 * Class MouseEvent [comments are taken from java]
 *
 * An event which indicates that a mouse action occurred in a component.
 * A mouse action is considered to occur in a particular component if and only
 * if the mouse cursor is over the unobscured part of the component's bounds
 * when the action happens.
 * Component bounds can be obscurred by the visible component's children or by a
 * menu or by a top-level window.
 * This event is used both for mouse events (click, enter, exit) and mouse 
 * motion events (moves and drags). 
 *
 */

var NOBUTTON = 0;
var BUTTON1 = 1;
var BUTTON2 = 2;
var BUTTON3 = 3;
		
/* extends InputEvent 
 * MouseEvent.prototype= new InputEvent(); 
 */

function MouseEvent( /* Component */ source, /* svgMouseEvent */ evt, /* int */ x, /* int */ y) {
        var argv = MouseEvent.arguments;
        var argc = MouseEvent.length;
        this.className = "MouseEvent";

        this.source = null;
        /* float */
        this.x = 0;
        /* float */
        this.y = 0;
        /* float */
        this.screenX = 0;
        /* float */
        this.screenY = 0;
        /* int */
        this.clickCount = 0; // Indicates which, if any, of the mouse buttons has changed state.
        /* int */
        this.button = 0; //The only legal values are the following constants: NOBUTTON, BUTTON1, BUTTON2, BUTTON3
        /* boolean */
        this.ctrlKey = false;
        /* boolean */
        this.shiftKey = false;
        /* boolean */
        this.altKey = false;
        /* boolean */
        this.metaKey = false;

        if (argv.length > 0) 
        	this.initMouseEvent(source, x, y, evt);
    }

MouseEvent.prototype.initMouseEvent = function(source, x, y, evt) {
        this.source = source;
        this.x = x;
        this.y = y;
        this.clickCount = evt.detail;
        var button = evt.button;
        if (button < NOBUTTON || button > BUTTON3) {
            alert("Invalid button value");
        }
        this.button = button;
        this.ctrlKey = evt.ctrlKey;
        this.shiftKey = evt.shiftKey;;
        this.altKey = evt.altKey;
        this.metaKey = evt.metaKey;
        // New 13-11-2005
        this.screenX = evt.clientX;
        this.screenY = evt.clientY;
    }

MouseEvent.prototype.getX = function() {
        return this.x;
    }

MouseEvent.prototype.getY = function() {
        return this.y;
    }

MouseEvent.prototype.getScreenX = function() {
        return this.screenX;
    }

MouseEvent.prototype.getScreenY = function() {
        return this.screenY;
    }

MouseEvent.prototype.getPoint = function() {
		// Summary:
		// Returns the x,y position of the event relative to the source component.
        return new Point(this.x, this.y);
    }

MouseEvent.prototype.translatePoint = function(x, y) {
		// Summary:
    // Translates the event's coordinates to a new position by adding specified x> (horizontal) and y (vertical) offsets.
        this.x += x;
        this.y += y;
    }

MouseEvent.prototype.getButton = function() {
		// Summary:
    // Returns which, if any, of the mouse buttons has changed state
        return this.button;
    }

MouseEvent.prototype.isShiftDown = function() {
		// Summary:
    // Returns whether or not the Shift modifier is down on this event.
        return this.shiftKey;
    }

MouseEvent.prototype.isControlDown = function() {
		// Summary:
    // Returns whether or not the Control modifier is down on this event.
        return this.ctrlKey;
    }

MouseEvent.prototype.isMetaDown = function() {
		// Summary:
    // Returns  whether or not the Meta modifier is down on this event.
        return this.metaKey;
    }

MouseEvent.prototype.isAltDown = function() {
		// Summary:
    // Returns whether or not the Alt modifier is down on this event.
        return this.altKey;
    }

MouseEvent.prototype.getClickCount = function() {

        return this.clickCount;
    }

MouseEvent.prototype.toString = function() {
    return this.className + "[x=" + this.x + ", y=" + this.y + ", button=" + this.button + ", clickCount=" + this.clickCount + ", altKey=" + this.altKey + ", ctrlKey=" + this.ctrlKey + ", shiftKey=" + this.shiftKey + ", metaKey=" + this.metaKey + ", source=" + this.source + "]";
}

/**
 * Java.js : KeyEvent
 *
 * @author    Adnan Sagar, PhD <adnan@websemantics.ca>
 * @copyright 2004-2015 Web Semantics, Inc. (http://websemantics.ca)
 * @license   http://www.opensource.org/licenses/mit-license.php MIT
 * @since     19th November 2005
 * @package   websemantics/oea/java.js/awt/event
 */

/**
 * Class KeyEvent [comments are taken from java]
 *
 * An event which indicates that a keystroke occurred in a component.
 * 
 */

// Virtual key codes. 
var VK_ENTER = 0x0D;
var VK_BACK_SPACE = 0x08;
var VK_TAB = '\t';
//var VK_ENTER          = '\n';
//var VK_BACK_SPACE     = '\b';
var VK_CANCEL = 0x03;
var VK_CLEAR = 0x0C;
var VK_SHIFT = 0x10;
var VK_CONTROL = 0x11;
var VK_ALT = 0x12;
var VK_PAUSE = 0x13;
var VK_CAPS_LOCK = 0x14;
var VK_ESCAPE = 0x1B;
var VK_SPACE = 0x20;
var VK_PAGE_UP = 0x21;
var VK_PAGE_DOWN = 0x22;
var VK_END = 0x23;
var VK_HOME = 0x24;
// Constant for the non-numpad <b>left</b> arrow key. @see #VK_KP_LEFT
var VK_LEFT = 0x25;
// Constant for the non-numpad <b>up</b> arrow key. @see #VK_KP_UP
var VK_UP = 0x26;
// Constant for the non-numpad <b>right</b> arrow key.  @see #VK_KP_RIGHT
var VK_RIGHT = 0x27;
// Constant for the non-numpad <b>down</b> arrow key. @see #VK_KP_DOWN
var VK_DOWN = 0x28;
var VK_COMMA = 0x2C;
// Constant for the "-" key.
var VK_MINUS = 0x2D;
var VK_PERIOD = 0x2E;
var VK_SLASH = 0x2F;
// VK_0 thru VK_9 are the same as ASCII '0' thru '9' (0x30 - 0x39) 
var VK_0 = 0x30;
var VK_1 = 0x31;
var VK_2 = 0x32;
var VK_3 = 0x33;
var VK_4 = 0x34;
var VK_5 = 0x35;
var VK_6 = 0x36;
var VK_7 = 0x37;
var VK_8 = 0x38;
var VK_9 = 0x39;

var VK_SEMICOLON = 0x3B;
var VK_EQUALS = 0x3D;

// VK_A thru VK_Z are the same as ASCII 'A' thru 'Z' (0x41 - 0x5A) 
var VK_A = 0x41;
var VK_B = 0x42;
var VK_C = 0x43;
var VK_D = 0x44;
var VK_E = 0x45;
var VK_F = 0x46;
var VK_G = 0x47;
var VK_H = 0x48;
var VK_I = 0x49;
var VK_J = 0x4A;
var VK_K = 0x4B;
var VK_L = 0x4C;
var VK_M = 0x4D;
var VK_N = 0x4E;
var VK_O = 0x4F;
var VK_P = 0x50;
var VK_Q = 0x51;
var VK_R = 0x52;
var VK_S = 0x53;
var VK_T = 0x54;
var VK_U = 0x55;
var VK_V = 0x56;
var VK_W = 0x57;
var VK_X = 0x58;
var VK_Y = 0x59;
var VK_Z = 0x5A;

var VK_OPEN_BRACKET = 0x5B;
var VK_BACK_SLASH = 0x5C;
var VK_CLOSE_BRACKET = 0x5D;

var VK_NUMPAD0 = 0x60;
var VK_NUMPAD1 = 0x61;
var VK_NUMPAD2 = 0x62;
var VK_NUMPAD3 = 0x63;
var VK_NUMPAD4 = 0x64;
var VK_NUMPAD5 = 0x65;
var VK_NUMPAD6 = 0x66;
var VK_NUMPAD7 = 0x67;
var VK_NUMPAD8 = 0x68;
var VK_NUMPAD9 = 0x69;
var VK_MULTIPLY = 0x6A;
var VK_ADD = 0x6B;

// This constant is obsolete, and is included only for backwards compatibility. @see #VK_SEPARATOR
var VK_SEPARATER = 0x6C;
// Constant for the Numpad Separator key. @since 1.4
var VK_SEPARATOR = VK_SEPARATER;

var VK_SUBTRACT = 0x6D;
var VK_DECIMAL = 0x6E;
var VK_DIVIDE = 0x6F;
var VK_DELETE = 0x7F; /* ASCII DEL */
var VK_NUM_LOCK = 0x90;
var VK_SCROLL_LOCK = 0x91;

// Constant for the F1 function key. 
var VK_F1 = 0x70;
// Constant for the F2 function key. 
var VK_F2 = 0x71;
// Constant for the F3 function key. 
var VK_F3 = 0x72;
// Constant for the F4 function key. 
var VK_F4 = 0x73;
// Constant for the F5 function key. 
var VK_F5 = 0x74;
// Constant for the F6 function key. 
var VK_F6 = 0x75;
// Constant for the F7 function key. 
var VK_F7 = 0x76;
// Constant for the F8 function key. 
var VK_F8 = 0x77;
// Constant for the F9 function key. 
var VK_F9 = 0x78;
// Constant for the F10 function key. 
var VK_F10 = 0x79;
// Constant for the F11 function key. 
var VK_F11 = 0x7A;
// Constant for the F12 function key. 
var VK_F12 = 0x7B;
// Constant for the F13 function key.
// F13 - F24 are used on IBM 3270 keyboard; use random range for constants. 
var VK_F13 = 0xF000;
// Constant for the F14 function key.
var VK_F14 = 0xF001;
// Constant for the F15 function key.
var VK_F15 = 0xF002;
// Constant for the F16 function key.
var VK_F16 = 0xF003;
// Constant for the F17 function key.
var VK_F17 = 0xF004;
// Constant for the F18 function key.
var VK_F18 = 0xF005;
// Constant for the F19 function key.
var VK_F19 = 0xF006;
// Constant for the F20 function key.
var VK_F20 = 0xF007;
// Constant for the F21 function key.
var VK_F21 = 0xF008;
// Constant for the F22 function key.
var VK_F22 = 0xF009;
// Constant for the F23 function key.
var VK_F23 = 0xF00A;
// Constant for the F24 function key.
var VK_F24 = 0xF00B;

var VK_PRINTSCREEN = 0x9A;
var VK_INSERT = 0x9B;
var VK_HELP = 0x9C;
var VK_META = 0x9D;

var VK_BACK_QUOTE = 0xC0;
var VK_QUOTE = 0xDE;
// Constant for the numeric keypad <b>up</b> arrow key.
var VK_KP_UP = 0xE0;
// Constant for the numeric keypad <b>down</b> arrow key.
var VK_KP_DOWN = 0xE1;
// Constant for the numeric keypad <b>left</b> arrow key.
var VK_KP_LEFT = 0xE2;
// Constant for the numeric keypad <b>right</b> arrow key.
var VK_KP_RIGHT = 0xE3;


//KeyEvent.prototype= new InputEvent(); 
/* extends InputEvent */
function KeyEvent( /* Component */ source, /* svgKeyEvent */ evt) {
        var argv = KeyEvent.arguments;
        var argc = KeyEvent.length;
        this.className = "KeyEvent";

        this.source = null;
        /* int */
        this.keyCode = 0; // The unique value assigned to each of the keys on the keyboard.
        /* char */
        this.keyChar = 0; // A valid unicode character that is fired by a key or a key combination on a keyboard.
        /* boolean */
        this.ctrlKey = false;
        /* boolean */
        this.shiftKey = false;
        /* boolean */
        this.altKey = false;
        /* boolean */
        this.metaKey = false;
        
        if (argv.length > 0) 
        	this.initKeyEvent(source, evt);
    }

KeyEvent.prototype.initKeyEvent = function(source, evt) {
        this.source = source;
        this.ctrlKey = evt.ctrlKey;
        this.shiftKey = evt.shiftKey;;
        this.altKey = evt.altKey;
        this.metaKey = evt.metaKey;
        this.keyCode = evt.keyCode;
        this.keyChar = evt.charCode;
    }

KeyEvent.prototype.getKeyCode = function() {
		// Summary:
		// Returns the integer keyCode associated with the key in this event.
        return this.keyCode;
    }

KeyEvent.prototype.setKeyCode = function( /* int */ keyCode) {
		// Summary:
		// Returns the integer keyCode associated with the key in this event.
        this.keyCode = keyCode;
    }

KeyEvent.prototype.getKeyChar = function() {
		// Summary:
		// Returns the character associated with the key in this event.
		// For example, the key-typed event for shift + "a" returns the value for "A".
        return this.keyChar;
    }

KeyEvent.prototype.setKeyChar = function( /* int */ keyChar) {
		// Summary:
		// Set the keyChar value to indicate a logical character.
        this.keyChar = keyChar;
    }

KeyEvent.prototype.isShiftDown = function() {
		// Summary:
		// Returns whether or not the Shift modifier is down on this event.
        return this.shiftKey;
    }

KeyEvent.prototype.isControlDown = function() {
		// Summary:
		// Returns whether or not the Control modifier is down on this event.
        return this.ctrlKey;
    }

KeyEvent.prototype.isMetaDown = function() {
		// Summary:
		// Returns whether or not the Meta modifier is down on this event.
        return this.metaKey;
    }

KeyEvent.prototype.isAltDown = function() {
		// Summary:
		// Returns whether or not the Alt modifier is down on this event.
        return this.altKey;
    }

KeyEvent.prototype.toString = function() {
    return this.className + "[keyCode=" + this.keyCode + ", keyChar=" + this.keyChar + ", altKey=" + this.altKey + ", ctrlKey=" + this.ctrlKey + ", shiftKey=" + this.shiftKey + ", metaKey=" + this.metaKey + ", source=" + this.source + "]";
}

/**
 * Java.js : ActionEvent
 *
 * @author    Adnan Sagar, PhD <adnan@websemantics.ca>
 * @copyright 2004-2015 Web Semantics, Inc. (http://websemantics.ca)
 * @license   http://www.opensource.org/licenses/mit-license.php MIT
 * @since     19th Feb 2005
 * @package   websemantics/oea/java.js/awt/event
 */

/**
 * Class ActionEvent [comments are taken from java]
 * 
 *  A semantic event which indicates that a component-defined action occured.
 *  This high-level event is generated by a component (such as a Button) when
 *  the component-specific action occurs (such as being pressed).
 *  The event is passed to every every ActionListener object
 *  that registered to receive such events using the component's
 *  addActionListener method.
 *  The object that implements the ActionListener interface gets this ActionEvent
 *  when the event occurs. The listener is therefore spared the details of 
 *  processing individual mouse movements and mouse clicks, and can instead 
 *  process a "meaningful" (semantic) event like "button pressed".
 */
	
/* extends AWTEvent
 * ActionEvent.prototype= new AWTEvent(); 
 */

function ActionEvent( /* Component */ source, /* String */ command, /* svgActionEvent */ evt) {
        var argv = ActionEvent.arguments;
        var argc = ActionEvent.length;
        this.className = "ActionEvent";
        this.source = null;
        
        // The nonlocalized string that gives more details of what actually 
        // caused the event. This information is very specific to the component 
        // that fired it.
        
        /* String */
        this.actionCommand = null;
        /* boolean */
        this.ctrlKey = false;
        /* boolean */
        this.shiftKey = false;
        /* boolean */
        this.altKey = false;
        /* boolean */
        this.metaKey = false;
        /* MouseEvent */
        this.evt = null;
        
        if (argv.length > 0) 
        	this.initActionEvent(source, command, evt);
    }

ActionEvent.prototype.initActionEvent = function(source, command, evt) {
        this.source = source;
        this.actionCommand = command;
        if (evt == null) return;
        this.evt = evt;
        this.ctrlKey = evt.ctrlKey;
        this.shiftKey = evt.shiftKey;;
        this.altKey = evt.altKey;
        this.metaKey = evt.metaKey;
    }

ActionEvent.prototype.getActionCommand = function() {
		// Summary:
		// 
    // Returns the command string associated with this action.
    // This string allows a "modal" component to specify one of several 
    // commands, depending on its state. For example, a single button might
    // toggle between "show details" and "hide details". The source object
    // and the event would be the same in each case, but the command string
    // would identify the intended action.
        return this.actionCommand;
    }

ActionEvent.prototype.isShiftDown = function() {
		// Summary:
		// Returns whether or not the Shift modifier is down on this event.
        return this.shiftKey;
    }

ActionEvent.prototype.isControlDown = function() {
		// Summary:
		// Returns whether or not the Control modifier is down on this event.
        return this.ctrlKey;
    }

ActionEvent.prototype.isMetaDown = function() {
		// Summary:
		// Returns whether or not the Meta modifier is down on this event.
        return this.metaKey;
    }

ActionEvent.prototype.isAltDown = function() {
		// Summary:
		// Returns whether or not the Alt modifier is down on this event.
        return this.altKey;
    }

ActionEvent.prototype.getMouseEvent = function() {
        return this.evt;
    }

ActionEvent.prototype.toString = function() {
    return this.className + "[actionCommand=" + this.actionCommand + ", altKey=" + this.altKey + ", ctrlKey=" + this.ctrlKey + ", shiftKey=" + this.shiftKey + ", metaKey=" + this.metaKey + ", source=" + this.source + "]";
}
/**
 * Java.js : KeyListener
 *
 * @author    Adnan Sagar, PhD <adnan@websemantics.ca>
 * @copyright 2004-2015 Web Semantics, Inc. (http://websemantics.ca)
 * @license   http://www.opensource.org/licenses/mit-license.php MIT
 * @since     12th January 2005
 * @package   websemantics/oea/java.js/awt/event
 */

/**
 * Class KeyListener [comments are taken from java]
 *
 * The listener interface for receiving keyboard events (keystrokes).
 * 
 */

/* extends EventListener 
 * KeyListener.prototype= new EventListener(); 
 */

function KeyListener(/* Component */ source,/* int */ x,/* int */ y,/* int */ clickCount, /*int */ button){  
		var argv = KeyListener.arguments;
		var argc = KeyListener.length;
		this.className="KeyListener";
}

KeyListener.prototype.keyTyped = function(/* KeyEvent */ e){
	//* Invoked when a key has been typed. See the class description 
	// for {@link KeyEvent} for a definition of a key typed event.
}

KeyListener.prototype.keyPressed = function(/* KeyEvent */ e){
	// Invoked when a key has been pressed. See the class description 
	// for {@link KeyEvent} for a definition of a key pressed event.
}

KeyListener.prototype.keyReleased = function(/* KeyEvent */ e){
	// Invoked when a key has been released. See the class description 
	// for {@link KeyEvent} for a definition of a key released event.
}

/**
 * Java.js : ActionListener
 *
 * @author    Adnan Sagar, PhD <adnan@websemantics.ca>
 * @copyright 2004-2015 Web Semantics, Inc. (http://websemantics.ca)
 * @license   http://www.opensource.org/licenses/mit-license.php MIT
 * @since     23rd Feb 2005
 * @package   websemantics/oea/java.js/awt/event
 */

/**
 * Class ActionListener [comments are taken from java]
 *
 * The listener interface for receiving action events. The class that is 
 * interested in processing an action event implements this interface, and the 
 * object created with that class is registered with a component, using the 
 * component's addActionListener method. When the action event occurs, 
 * that object's actionPerformed method is invoked.
 *
 */

/* extends EventListener 
 * ActionListener.prototype= new EventListener(); 
 */

function ActionListener(){  
        var argv = ActionEvent.arguments;
        var argc = ActionEvent.length;
        this.className = "ActionEvent";
				this.className="ActionListener";
}

ActionListener.prototype.actionPerformed = function(/* ActionEvent */ e){
}


/**
 * Swing.svg : ButtonSkin
 *
 * @author    Adnan Sagar, PhD <adnan@websemantics.ca>
 * @copyright 2004-2015 Web Semantics, Inc. (http://websemantics.ca)
 * @license   http://www.opensource.org/licenses/mit-license.php MIT
 * @since     19th July 2005
 * @package   websemantics/oea/swing.svg/lookandfeel
 */

/**
 * Class ButtonSkin
 *
 * An interface of a button skin
 * 
 */

/* INTERFACE */ function ButtonSkin(){
	/* String */    this.name="ButtonSkin";
	/* String */    this.className="ButtonSkin";
	/* Boolean */   this.pressed=false;
	/* Button */    this.button=null;
}


ButtonSkin.prototype.createSVGContent = function(/* Button */ but){}

ButtonSkin.prototype.drawBorder = function(){
	// This can be overridden to use different Border Shapes 
}

ButtonSkin.prototype.mousePressed = function(){}

ButtonSkin.prototype.mouseReleased = function(){}

ButtonSkin.prototype.mouseOut = function(){}

ButtonSkin.prototype.mouseIn = function(){}

ButtonSkin.prototype.update = function(/* int */ x,/* int */ y){
	// Depends on the mouse location (ON or OFF the button) 
}

ButtonSkin.prototype.setSize = function(/* int */ w,/* int */ h){}

ButtonSkin.prototype.clone = function(){}

/**
 * Swing.svg : SimpleButtonSkin
 *
 * @author    Adnan Sagar, PhD <adnan@websemantics.ca>
 * @copyright 2004-2015 Web Semantics, Inc. (http://websemantics.ca)
 * @license   http://www.opensource.org/licenses/mit-license.php MIT
 * @since     19th July 2005
 * @package   websemantics/oea/swing.svg/lookandfeel
 */

/**
 * Class SimpleButtonSkin
 *
 * And implementation of ButtonSkin interface for a simple button
 * 
 */

SimpleButtonSkin.prototype = new ButtonSkin();

function SimpleButtonSkin() {
        /* String */
        this.name = "SimpleButtonSkin";
        /* String */
        this.className = "SimpleButtonSkin";
        /* Shape  */
        this.border = null;
    }

SimpleButtonSkin.prototype.createSVGContent = function( /* Button */ but) {
        this.button = but;
        var w = but.getWidth() - but.left - but.right;
        var h = but.getHeight() - but.top - but.bottom;
        var bg = but.sking;
        bg.setBackground("#D4D0C8");
        this.border = this.drawBorder(bg, 0, 0, w, h);
        this.border.setAttribute('shape-rendering', 'optimizeSpeed'); //shape-rendering ( auto | optimizeSpeed | crispEdges | geometricPrecision | inherit )
    }

SimpleButtonSkin.prototype.drawBorder = function( /* Graphics */ g, /* int */ x, /* int */ y, /* int */ w, /* int */ h) {
        return g.drawStepBorder(x, y, w, h);
    }

SimpleButtonSkin.prototype.mousePressed = function() {
        if (this.pressed) return;
        this.pressed = true;
        this.border.setFaceDown();
        this.button.contentg.moveBy(0, 1);
    }

SimpleButtonSkin.prototype.mouseReleased = function() {
        if (!this.pressed) return;
        this.pressed = false;
        this.border.setFaceUp();
        this.button.contentg.moveBy(0, -1);
    }

SimpleButtonSkin.prototype.mouseOut = function() {
        this.mouseReleased();
    }

SimpleButtonSkin.prototype.mouseIn = function() {}

SimpleButtonSkin.prototype.setSize = function( /* int */ w, /* int */ h) {
        //w-=this.button.left+this.button.right;
        //h-=this.button.top+this.button.bottom;
        this.button.sking.setSize(w, h);
        this.border.setSize(w, h);
    }

SimpleButtonSkin.prototype.clone = function() {
    return new SimpleButtonSkin();
}

/**
 * Swing.svg : WinButtonSkin
 *
 * @author    Adnan Sagar, PhD <adnan@websemantics.ca>
 * @copyright 2004-2015 Web Semantics, Inc. (http://websemantics.ca)
 * @license   http://www.opensource.org/licenses/mit-license.php MIT
 * @since     19th July 2005
 * @package   websemantics/oea/swing.svg/lookandfeel
 */

/**
 * Class WinButtonSkin
 *
 * And implementation of ButtonSkin interface for a window button
 */

WinButtonSkin.prototype = new SimpleButtonSkin();

function WinButtonSkin() {
        /* String */
        this.name = "WinButtonSkin";
        /* String */
        this.className = "WinButtonSkin";
    }

WinButtonSkin.prototype.drawBorder = function( /* Graphics */ g, /* int */ x, /* int */ y, /* int */ w, /* int */ h) {
        return g.drawWinBorder(x, y, w, h);
    }

WinButtonSkin.prototype.clone = function() {
    return new WinButtonSkin();
}

/**
 * Swing.svg : BoxButtonSkin
 *
 * @author    Adnan Sagar, PhD <adnan@websemantics.ca>
 * @copyright 2004-2015 Web Semantics, Inc. (http://websemantics.ca)
 * @license   http://www.opensource.org/licenses/mit-license.php MIT
 * @since     19th July 2005
 * @package   websemantics/oea/swing.svg/lookandfeel
 */

/**
 * Class BoxButtonSkin
 *
 * And implementation of ButtonSkin interface for box-like button
 * 
 */

BoxButtonSkin.prototype= new SimpleButtonSkin(); 

function BoxButtonSkin() {
        /* String */
        this.name = "BoxButtonSkin";
        /* String */
        this.className = "BoxButtonSkin";
        /* int    */
        this.depth = 2;
    }

BoxButtonSkin.prototype.drawBorder = function( /* Graphics */ g, /* int */ x, /* int */ y, /* int */ w, /* int */ h) {
	// Summary:
	// This can be overridden to use different Border Shapes 
        var border = g.drawBoxBorder(x, y, w, h, this.depth);
        this.button.sking.setSize(w - this.depth, h - this.depth);
        this.button.setBackground("#cbc8c1");
        return border;
    }

BoxButtonSkin.prototype.setSize = function( /* int */ w, /* int */ h) {
        this.button.sking.setSize(w - this.depth, h - this.depth);
        this.border.setSize(w, h);
    }

BoxButtonSkin.prototype.mousePressed = function() {
        if (this.pressed) return;
        this.pressed = true;
        this.border.setFaceDown();
        this.button.sking.setSize(this.button.w, this.button.h);
        this.button.contentg.moveBy(0, 1);
    }

BoxButtonSkin.prototype.mouseReleased = function() {
        if (!this.pressed) return;
        this.pressed = false;
        this.border.setFaceUp();
        this.button.sking.setSize(this.button.w - this.depth, this.button.h - this.depth);
        this.button.contentg.moveBy(0, -1);
    }

BoxButtonSkin.prototype.clone = function() {
    return new BoxButtonSkin();
}

/**
 * Swing.svg : ToolButtonSkin
 *
 * @author    Adnan Sagar, PhD <adnan@websemantics.ca>
 * @copyright 2004-2015 Web Semantics, Inc. (http://websemantics.ca)
 * @license   http://www.opensource.org/licenses/mit-license.php MIT
 * @since     19th July 2005
 * @package   websemantics/oea/swing.svg/lookandfeel
 */

/**
 * Class ToolButtonSkin
 *
 * And implementation of ButtonSkin interface for tool button
 * 
 */

ToolButtonSkin.prototype = new SimpleButtonSkin();

function ToolButtonSkin() {
        /* String */
        this.name = "ToolButtonSkin";
        /* String */
        this.className = "ToolButtonSkin";
        /* Boolean */
        this.mIn = false;

    }

ToolButtonSkin.prototype.drawBorder = function( /* Graphics */ g, /* int */ x, /* int */ y, /* int */ w, /* int */ h) {
        var border = g.drawStepBorder(x, y, w, h);
        border.setVisibility(this.mIn);
        return border
    } 

ToolButtonSkin.prototype.mousePressed = function() {
        if (this.pressed) return;
        this.pressed = true;
        this.mIn = true;
        this.border.setVisibility(this.mIn);
        this.border.setFaceDown();
        this.button.contentg.moveBy(0, 1);
    }

ToolButtonSkin.prototype.mouseReleased = function() {
        if (!this.pressed) return;
        this.pressed = false;
        this.border.setVisibility(this.mIn);
        this.border.setFaceUp();
        this.button.contentg.moveBy(0, -1);
    }

ToolButtonSkin.prototype.mouseOut = function() {
        this.mIn = false;
        this.border.setVisibility(this.mIn);
        this.mouseReleased();
    }

ToolButtonSkin.prototype.mouseIn = function() {
        this.mIn = true;
        this.border.setVisibility(this.mIn);
    }

ToolButtonSkin.prototype.clone = function() {
    return new ToolButtonSkin();
}

/**
 * Swing.svg : FlatButtonSkin
 *
 * @author    Adnan Sagar, PhD <adnan@websemantics.ca>
 * @copyright 2004-2015 Web Semantics, Inc. (http://websemantics.ca)
 * @license   http://www.opensource.org/licenses/mit-license.php MIT
 * @since     19th July 2005
 * @package   websemantics/oea/swing.svg/lookandfeel
 */

/**
 * Class FlatButtonSkin
 *
 * And implementation of ButtonSkin interface for a flat button
 * 
 */

FlatButtonSkin.prototype = new ButtonSkin();

function FlatButtonSkin() {
        /* String */
        this.name = "FlatButtonSkin";
        /* String */
        this.className = "FlatButtonSkin";
    }

FlatButtonSkin.prototype.createSVGContent = function( /* Button */ but) {
        this.button = but;
        var bg = but.sking;
        bg.setBackground(this.button.getBackground());
    }

FlatButtonSkin.prototype.mousePressed = function() {}

FlatButtonSkin.prototype.mouseReleased = function() {}

FlatButtonSkin.prototype.setSize = function( /* int */ w, /* int */ h) {
        this.button.sking.setSize(w, h);
    }

FlatButtonSkin.prototype.clone = function() {
    return new FlatButtonSkin();
}

/**
 * Swing.svg : WindowSkin
 *
 * @author    Adnan Sagar, PhD <adnan@websemantics.ca>
 * @copyright 2004-2015 Web Semantics, Inc. (http://websemantics.ca)
 * @license   http://www.opensource.org/licenses/mit-license.php MIT
 * @since     19th July 2005
 * @package   websemantics/oea/swing.svg/lookandfeel
 */

/**
 * Interface WindowSkin
 * 
 * An interface of a window skin
 * 
 */

function WindowSkin() {
        /* String */
        this.name = "WindowSkin";
        /* String */
        this.className = "WindowSkin";
        /* Window */
        this.window = null;
        /* Window */
        this.g = null;
        /* Shape  */
        this.border = null;
        /* int    */
        this.borderWidth = 2;
        /* Shape  */
        this.titleRect = null;
        /* Component */
        this.titleLabel = null;
        /* Color */
        this.activeColor = null;
        /* Color */
        this.inactiveColor = null;
    }

WindowSkin.prototype.createSVGContent = function( /* Window */ win) {}

WindowSkin.prototype.drawBorder = function() {}

WindowSkin.prototype.setSize = function( /* int */ w, /* int */ h) {}

WindowSkin.prototype.recalc = function() {}

WindowSkin.prototype.getTitleColor = function() {}

WindowSkin.prototype.getFont = function() {}

WindowSkin.prototype.active = function() {}

WindowSkin.prototype.inactive = function() {}

WindowSkin.prototype.clone = function() {}

/**
 * Swing.svg : DefaultWindowSkin
 *
 * @author    Adnan Sagar, PhD <adnan@websemantics.ca>
 * @copyright 2004-2015 Web Semantics, Inc. (http://websemantics.ca)
 * @license   http://www.opensource.org/licenses/mit-license.php MIT
 * @since     28th July 2005
 * @package   websemantics/oea/swing.svg/lookandfeel
 */

/**
 * Class DefaultWindowSkin
 *
 * The default Window skin
 * 
 */

DefaultWindowSkin.prototype = new WindowSkin();

function DefaultWindowSkin() {

        /* String */
        this.name = "DefaultWindowSkin";
        /* String */
        this.className = "DefaultWindowSkin";
        /* Window */
        this.window = null;
        /* int    */
        this.borderWidth = 2; // Works as margin,..to shift the label and title rect to the right/bottom
        /* Shape  */
        this.titleRect = null;
        /* Shape  */
        this.border = null;
        /* Component */
        this.titleLabel = null;
        /* Color */
        this.activeColor = "url(#WinG1)";
        /* Color */
        this.inactiveColor = "url(#WinG2)";
    }

DefaultWindowSkin.prototype.createSVGContent = function( /* Window */ win) {
        this.window = win;
        this.g = win.sking;
        this.g.setBackground("#D4D0C8");
        this.titleRect = this.drawTitleRect(this.g, this.borderWidth, this.borderWidth, win.w - this.borderWidth - this.borderWidth, 10);
        this.border = this.drawBorder(this.g, 0, 0, win.w, win.h);
        this.border.setAttribute('shape-rendering', 'optimizeSpeed'); //shape-rendering ( auto | optimizeSpeed | crispEdges | geometricPrecision | inherit )
        this.titleLabel = new Label(this.borderWidth, this.borderWidth, 10, 10, "title", win.getTitle(), win.getIcon());
        this.titleLabel.setFont(this.getFont());
        this.titleLabel.paint(this.g);
        this.titleLabel.setTextColor(this.getTitleColor());
        this.titleLabel.setAttribute("pointer-events", "none");
    }

DefaultWindowSkin.prototype.drawBorder = function( /* Graphics */ g, /* int */ x, /* int */ y, /* int */ w, /* int */ h) {
        return g.drawWinBorder(x, y, w, h);
    }

DefaultWindowSkin.prototype.getTitleColor = function() {
        return "white";
    }

DefaultWindowSkin.prototype.getFont = function() {
        return this.window.getFont();
    }

DefaultWindowSkin.prototype.getActiveColor = function() {
        return this.activeColor;
    }

DefaultWindowSkin.prototype.getInActiveColor = function() {
        return this.inactiveColor;
    }

DefaultWindowSkin.prototype.drawTitleRect = function( /* Graphics */ g, /* int */ x, /* int */ y, /* int */ w, /* int */ h) {
        g.setColor(this.getActiveColor());
        var rect = g.drawRect(x, y, w, 20);
        return rect;
    }

DefaultWindowSkin.prototype.setSize = function( /* int */ w, /* int */ h) {
        if (this.g != null) this.g.setSize(w, h);
        if (this.border != null) this.border.setSize(w, h);
        if (this.titleRect != null) this.titleRect.setSize(this.window.getWidth() - this.borderWidth - this.borderWidth, this.titleRect.h);
    }

DefaultWindowSkin.prototype.recalc = function() {
        this.titleLabel.recalc();
        // Resize the title rectangle to fit the window width and the window title's height.
        this.titleRect.setSize(this.window.getWidth() - this.borderWidth - this.borderWidth, this.titleLabel.getHeight());
    }

WindowSkin.prototype.active = function() {
        this.titleRect.setAttribute('fill', this.getActiveColor());
    }

WindowSkin.prototype.inactive = function() {
        this.titleRect.setAttribute('fill', this.getInActiveColor());
    }

DefaultWindowSkin.prototype.clone = function() {
    return new DefaultWindowSkin();
}

/**
 * Swing.svg : SimpleWindowSkin
 *
 * @author    Adnan Sagar, PhD <adnan@websemantics.ca>
 * @copyright 2004-2015 Web Semantics, Inc. (http://websemantics.ca)
 * @license   http://www.opensource.org/licenses/mit-license.php MIT
 * @since     28th July 2005
 * @package   websemantics/oea/swing.svg/lookandfeel
 */

/**
 * Class SimpleWindowSkin
 * 
 * An interface of a window skin
 * 
 */

SimpleWindowSkin.prototype = new WindowSkin();

function SimpleWindowSkin() {
        
        /* String */
        this.name = "SimpleWindowSkin";
        /* String */
        this.className = "SimpleWindowSkin";
        /* Window */
        this.window = null;
        /* int    */
        this.borderWidth = 2;
        /* Shape  */
        this.titleRect = null;
        /* Shape  */
        this.border = null;
        /* Component */
        this.titleLabel = null;
        /* Color */
        this.activeColor = "blue";
        /* Color */
        this.inactiveColor = "gray";
    }

SimpleWindowSkin.prototype.createSVGContent = function( /* Window */ win) {
        this.window = win;
        this.g = win.sking;
        this.g.setBackground("white");
        this.titleRect = this.drawTitleRect(this.g, this.borderWidth, this.borderWidth, win.w - this.borderWidth - this.borderWidth, 10);
        this.border = this.drawBorder(this.g, 0, 0, win.w, win.h);
        this.border.setAttribute('shape-rendering', 'optimizeSpeed'); //shape-rendering ( auto | optimizeSpeed | crispEdges | geometricPrecision | inherit )
        this.titleLabel = new Label(this.borderWidth, this.borderWidth, this.w, 10, "title", win.getTitle(), win.getIcon());
        this.titleLabel.setFont(this.getFont());
        this.titleLabel.paint(this.g);
        this.titleLabel.setTextColor(this.getTitleColor());
        this.titleLabel.setAttribute("pointer-events", "none");
    }

SimpleWindowSkin.prototype.drawBorder = function( /* Graphics */ g, /* int */ x, /* int */ y, /* int */ w, /* int */ h) {
        g.setColor("none");
        g.setStrokeColor("black");
        g.setStrokeWidth(1);
        return g.drawRect(x, y, w, h);
    }

SimpleWindowSkin.prototype.getTitleColor = function() {
        return "white";
    }

SimpleWindowSkin.prototype.getFont = function() {
        return this.window.getFont();
    }

SimpleWindowSkin.prototype.getActiveColor = function() {
        return this.activeColor;
    }

SimpleWindowSkin.prototype.getInActiveColor = function() {
        return this.inactiveColor;
    }

SimpleWindowSkin.prototype.drawTitleRect = function( /* Graphics */ g, /* int */ x, /* int */ y, /* int */ w, /* int */ h) {
        g.setColor(this.getActiveColor());
        var rect = g.drawRect(x, y, w, 20);
        return rect;
    }

SimpleWindowSkin.prototype.setSize = function( /* int */ w, /* int */ h) {
        if (this.g != null) this.g.setSize(w, h);
        if (this.border != null) this.border.setSize(w, h);
        if (this.titleRect != null) this.titleRect.setSize(this.window.getWidth() - this.borderWidth - this.borderWidth, this.titleRect.h);
    }

SimpleWindowSkin.prototype.recalc = function() {
        this.titleLabel.recalc();
        // Resize the title rectangle to fit the window width and the window title's height.
        this.titleRect.setSize(this.window.getWidth() - this.borderWidth - this.borderWidth, this.titleLabel.getHeight());
    }

WindowSkin.prototype.active = function() {
        this.titleRect.setAttribute('fill', this.getActiveColor());
    }

WindowSkin.prototype.inactive = function() {
        this.titleRect.setAttribute('fill', this.getInActiveColor());
    }

SimpleWindowSkin.prototype.clone = function() {
    return new SimpleWindowSkin();
}

/**
 * Swing.svg : ListenerManager
 *
 * @author    Adnan Sagar, PhD <adnan@websemantics.ca>
 * @copyright 2004-2015 Web Semantics, Inc. (http://websemantics.ca)
 * @license   http://www.opensource.org/licenses/mit-license.php MIT
 * @since     12th Febuary 2005
 * @package   websemantics/oea/swing.svg
 */

var mouseStartDragged="mouseStartDragged";
var mouseEndDragged="mouseEndDragged";
var mouseDragged="mouseDragged";
var mouseMoved="mouseMoved";
var mouseClicked="mouseClicked";
var mousePressed="mousePressed";
var mouseReleased="mouseReleased";
var mouseEntered="mouseEntered";
var mouseExited="mouseExited";
var keyTyped="keyTyped";
var keyPressed="keyPressed";
var keyReleased="keyReleased"; 

ListenerManager.prototype= new Node(); 

function ListenerManager() {
        /* String */
        this.className = "ListenerManager";
        /* String */
        this.name = "ListenerManager";

        // ListenerManagers can add internal 'methods' to listen on mouse motion events or basic mouse events,..
        /* array */
        this.intEventListeners = null; //								
        // External listeners on mouse motion events or basic mouse events,..
        /* Vector */
        this.extMouseMotionListeners = null;
        /* Vector */
        this.extMouseListeners = null;
        /* Vector */
        this.extKeyListeners = null;
    }

ListenerManager.prototype.initEventListenersBuffer = function() {
        if (this.intlEventListeners != null) return;
        /* array */
        this.intlEventListeners = new Array();
        /* Vector */
        this.intlEventListeners[mouseStartDragged] = new Vector();
        /* Vector */
        this.intlEventListeners[mouseEndDragged] = new Vector();
        /* Vector */
        this.intlEventListeners[mouseDragged] = new Vector();
        /* Vector */
        this.intlEventListeners[mouseMoved] = new Vector();
        /* Vector */
        this.intlEventListeners[mouseClicked] = new Vector();
        /* Vector */
        this.intlEventListeners[mousePressed] = new Vector();
        /* Vector */
        this.intlEventListeners[mouseReleased] = new Vector();
        /* Vector */
        this.intlEventListeners[mouseEntered] = new Vector();
        /* Vector */
        this.intlEventListeners[mouseExited] = new Vector();
        /* Vector */
        this.intlEventListeners[keyTyped] = new Vector();
        /* Vector */
        this.intlEventListeners[keyPressed] = new Vector();
        /* Vector */
        this.intlEventListeners[keyReleased] = new Vector();
    }
    //**********************************************************
    // keyEventHandler : keyPressed. keyReleased and keyTyped
    //**********************************************************

ListenerManager.prototype.keyEventHandler = function( /* String */ awtEventType, /* KeyEvent */ event) {
        if (this.extKeyListeners == null) return false;

        // External listeners for key events
        var k = new Enumerator(this.extKeyListeners);
        while (k.hasMoreElements()) {
            /* Object */
            var f = k.nextElement();
            f[awtEventType](event);
        }
    }

ListenerManager.prototype.mouseMotionEventHandler = function( /* String */ awtEventType, /* MouseEvent */ event) {
        this.listenerManagerMouseMotionEventHandler(awtEventType, event);
    }

ListenerManager.prototype.mouseEventHandler = function( /* String */ awtEventType, /* MouseEvent */ event) {
        this.listenerManagerMouseEventHandler(awtEventType, event);
    }

ListenerManager.prototype.listenerManagerMouseMotionEventHandler = function( /* String */ awtEventType, /* MouseEvent */ event) {
        if (this.extMouseMotionListeners != null) {
            // External Mouse Motion Events
            var k = new Enumerator(this.extMouseMotionListeners);
            while (k.hasMoreElements()) k.nextElement()[awtEventType](event);
        }
        this.internalEventHandler(awtEventType, event);
    }

ListenerManager.prototype.listenerManagerMouseEventHandler = function( /* String */ awtEventType, /* MouseEvent */ event) {
        if (this.extMouseListeners != null) {
            // External Mouse Events
            var k = new Enumerator(this.extMouseListeners);
            while (k.hasMoreElements()) k.nextElement()[awtEventType](event);
        }
        this.internalEventHandler(awtEventType, event);
    }

ListenerManager.prototype.internalEventHandler = function( /* String */ awtEventType, /* MouseEvent */ event) {
        // Internal listeners [call internal methods] 
        if (this.intlEventListeners != null) {
            var k = new Enumerator(this.intlEventListeners[awtEventType]);
            while (k.hasMoreElements()) this[k.nextElement()](event);
        }
    }
    //*****************************************************************
    //
    // Add internal event listener: 
    //
    // Since no real inheritance is support in Javascript, 
    //                   those method will allow to have multiple events handlers
    //                   for any subclass of type ListenerManager 
    //                   (this) [each subclass will have its own events handling 
    //                   methods for any event type],..
    //
    // type: mouseMoved, mouseDragged, mousePresses, mouseReleased, 
    //       mouseClicked, mouseEntered, mouseExited
    //       keyTyped, keyPressed and keyReleased 
    //*****************************************************************

    /* 1 : addInternalMouseMotionListener */
ListenerManager.prototype.addInternalMouseMotionListener = function(type, callbackMethod) {
        this.initEventListenersBuffer();
        this.intlEventListeners[type].addElement(callbackMethod);
    }

    /* 2 : addInternalMouseListener */
ListenerManager.prototype.addInternalMouseListener = function(type, callbackMethod) {
        this.initEventListenersBuffer();
        this.intlEventListeners[type].addElement(callbackMethod);
    }

    /* 3 : addInternalKeyListener */
ListenerManager.prototype.addInternalKeyListener = function(type, callbackMethod) {
        this.initEventListenersBuffer();
        this.intlEventListeners[type].addElement(callbackMethod);
    }

    //***************************************
    // Remove internal event listener: 
    //***************************************
   
    /* 1 : removeInternalMouseMotionListener */
ListenerManager.prototype.removeInternalMouseMotionListener = function(type, callbackMethod) {
        this.intlEventListeners[type].removeElement(callbackMethod);
    }
    /* 2 : removeInternalMouseListener */
ListenerManager.prototype.removeInternalMouseListener = function(type, callbackMethod) {
        this.intlEventListeners[type].removeElement(callbackMethod);
    }
    /* 2 : removeInternalKeyListener */
ListenerManager.prototype.removeInternalKeyListener = function(type, callbackMethod) {
        this.intlEventListeners[type].removeElement(callbackMethod);
    }
    //************************************************************************
    // Objects that want to register has to implement either 'motionListener' 
    // interface, 'mouseListerner' or 'keyListener' interface,.. 
    // Listen to all the events of a particular interface
    //************************************************************************
    
    /* 1: addMouseMotionListener */
ListenerManager.prototype.addMouseMotionListener = function( /* MouseMotionListener */ object) {
        if (this.extMouseMotionListeners == null) this.extMouseMotionListeners = new Vector();
        this.extMouseMotionListeners.addElement(object);
    }

    /* 2: addMouseListener */
ListenerManager.prototype.addMouseListener = function( /* MouseListener */ object) {
        if (this.extMouseListeners == null) this.extMouseListeners = new Vector();
        this.extMouseListeners.addElement(object);
    }

    /* 3: addKeyListener */
ListenerManager.prototype.addKeyListener = function( /* KeyListener */ object) {
        if (this.extKeyListeners == null) this.extKeyListeners = new Vector();
        this.extKeyListeners.addElement(object);
    }

    //*************************************
    // remove EventListener 
    //*************************************

    /* 1: removeMouseMotionListener */
ListenerManager.prototype.removeMouseMotionListener = function(object) {
        this.extMouseMotionListeners.removeElement(object);
    }

    /* 2: removeMouseListener */
ListenerManager.prototype.removeMouseListener = function(object) {
        this.extMouseListeners.removeElement(object);
    }

    /* 3: removeKeyListener */
ListenerManager.prototype.removeKeyListener = function(object) {
        this.extKeyListeners.removeElement(object);
    }

ListenerManager.prototype.mouseStartDragged = function( /* MouseEvent */ event) {}

ListenerManager.prototype.mouseEndDragged = function( /* MouseEvent */ event) {}

ListenerManager.prototype.mouseDragged = function( /* MouseEvent */ event) {}

ListenerManager.prototype.mouseMoved = function( /* MouseEvent */ event) {}

ListenerManager.prototype.mouseClicked = function( /* MouseEvent */ event) {}

ListenerManager.prototype.mousePressed = function( /* MouseEvent */ event) {}

ListenerManager.prototype.mouseReleased = function( /* MouseEvent */ event) {}

ListenerManager.prototype.mouseEntered = function( /* MouseEvent */ event) {}

ListenerManager.prototype.mouseExited = function( /* MouseEvent */ event) {}

ListenerManager.prototype.keyTyped = function( /* KeyEvent */ event) {}

ListenerManager.prototype.keyPressed = function( /* KeyEvent */ event) {}

ListenerManager.prototype.keyReleased = function( /* KeyEvent */ event) {}

/**
 * Swing.svg : EventManager
 *
 * @author    Adnan Sagar, PhD <adnan@websemantics.ca>
 * @copyright 2004-2015 Web Semantics, Inc. (http://websemantics.ca)
 * @license   http://www.opensource.org/licenses/mit-license.php MIT
 * @since     12th Febuary 2005
 * @package   websemantics/oea/swing.svg
 */

EventManager.prototype= new ListenerManager(); 

function EventManager() {
        var argv = EventManager.arguments;
        var argc = EventManager.length;
        /* String */
        this.className = "EventManager";
        /* String */
        this.name = "EventManager";
        /* int */
        this.mouseState = null; // "mouseup", "mousedown", "mousemove", "keyup",...etc 
        /* function */
        this.processMouseMotionEvent = null;
        /* function */
        this.processMouseEvent = null;

        if (argv.length > 0) 
        	this.initEventManager();
    }

EventManager.prototype.initEventManager = function() {
        this.processMouseMotionEvent = this.emptyProcessEvent;
        this.processMouseEvent = this.emptyProcessEvent;
    }

EventManager.prototype.handleEvent = function(evt) {
    // Summary: [ overridden from Node class ]
    // Here: svg low-level events are converted to mouse motion and mouse events,...
        if (this[evt.type] != undefined) this[evt.type](evt);
        this.mouseState = evt.type;
    }

//*************
//  key and mouse individual handleEvent methods for all events
//*************

EventManager.prototype.mousedown = function(evt) {
    this.processMouseEvent("mousePressed", evt);
}
EventManager.prototype.click = function(evt) {
    this.processMouseEvent("mouseClicked", evt);
}
EventManager.prototype.mouseup = function(evt) {
    this.processMouseEvent("mouseReleased", evt);
}
EventManager.prototype.mouseover = function(evt) {
    this.processMouseEvent("mouseEntered", evt);
}
EventManager.prototype.mouseout = function(evt) {
    this.processMouseEvent("mouseExited", evt);
}
EventManager.prototype.keyup = function(evt) {
    this.processKeyEvent("keyReleased", evt);
}
EventManager.prototype.keydown = function(evt) {
    this.processKeyEvent("keyPressed", evt);
}
EventManager.prototype.keypress = function(evt) {
    this.processKeyEvent("keyTyped", evt);
}
EventManager.prototype.mousemove = function(evt) {
        if (this.mouseState == "mousedown") {
            this.processMouseMotionEvent("mouseStartDragged", evt);
            ds_getDesktop().startDragMode(this);
        } else
            this.processMouseMotionEvent("mouseMoved", evt);
    }

EventManager.prototype.dragModeEventHandler = function(evt) {
    // Summary: 
    // 
    // [This is used to handle the drag mode of the component, 
    // this method is called by desktop]
    // 
    // In dragg mode,...the desktop only captures mousemove and mouseup,..
    // The desktop calls this method and this method routes the call to either 
    // draggmodemousemove or draggmodemouseup

        if (this["draggmode" + evt.type]) this["draggmode" + evt.type](evt);
    }

EventManager.prototype.draggmodemousemove = function(evt) {
    this.processMouseMotionEvent("mouseDragged", evt);
    this.mouseState = evt.type;
}

EventManager.prototype.draggmodemouseup = function(evt) {
        ds_getDesktop().endDragMode();
        this.processMouseMotionEvent("mouseEndDragged", evt);
        this.mouseState = evt.type;
    }

EventManager.prototype.processKeyEvent = function(awtEventType, evt) {
    // Summary : 
    // Multicast events to listeners after processing,...
    // convert from svg event to awt event,..

        this.keyEventHandler(awtEventType, new KeyEvent(this, evt));
    }

EventManager.prototype.emptyProcessEvent = function(awtEventType, evt) {
        // DO NOTHING 
    }

EventManager.prototype.defaultProcessMouseMotionEvent = function(awtEventType, evt) {
    // Summary : 
    // For mouse motion events,
    // Pass control to ListenerManager after processing,..
		// http://pilat.free.fr/asv6/
	
        if (this.getNode() == null) return;

        var matrix;

        if (this.isHidden != undefined && this.isHidden()) {
            this.show();
            matrix = this.getNode().getScreenCTM().multiply(this.getNode().getTransformToElement(this.getNode()));
            this.hide();
        } else
            matrix = this.getNode().getScreenCTM().multiply(this.getNode().getTransformToElement(this.getNode()));

        x = matrix.inverse().a * evt.clientX + matrix.inverse().c * evt.clientY + matrix.inverse().e;
        y = matrix.inverse().b * evt.clientX + matrix.inverse().d * evt.clientY + matrix.inverse().f;

        this.mouseMotionEventHandler(awtEventType, new MouseEvent(this, evt, x, y));
    }

EventManager.prototype.defaultProcessMouseEvent = function(awtEventType, evt) {
    // Summary :  
    // For mouse events ,
    // Pass control to ListenerManager after processing,..
		// http://pilat.free.fr/asv6/
		
        if (this.getNode() == null) return;

        var matrix;

        if (this.isHidden != undefined && this.isHidden()) {
            this.show();
            matrix = this.getNode().getScreenCTM().multiply(this.getNode().getTransformToElement(this.getNode()));
            this.hide();
        } else
            matrix = this.getNode().getScreenCTM().multiply(this.getNode().getTransformToElement(this.getNode()));

        x = matrix.inverse().a * evt.clientX + matrix.inverse().c * evt.clientY + matrix.inverse().e;
        y = matrix.inverse().b * evt.clientX + matrix.inverse().d * evt.clientY + matrix.inverse().f;

        this.mouseEventHandler(awtEventType, new MouseEvent(this, evt, x, y));
    }

EventManager.prototype.enableMouseListener = function(useCapture) {
    // Summary : 
    // A component does not receive any svg events at start,..
    // run this method to recieve mouse events,....
    // use addMouseListener to register this object as a listener,...

        if (useCapture != undefined) this.useCapture = useCapture; // see Node class for useCapture
        this.processMouseEvent = this.defaultProcessMouseEvent;
        // Enable low-level svg events,.. those are: up, down, over and out
        this.enableSVGMouseEvents(true, true, false, true, true, true); // (up,down,move,over,out,click)
    }

EventManager.prototype.enableMouseMotionListener = function(useCapture) {
    // Summary : 
    // A component does not receive any svg events at start,..
    // run this method to recieve motion events,....
    // use addMouseMotionListener to register this object as a listener,...

        if (useCapture != undefined) this.useCapture = useCapture; // see Node class for useCapture
        this.processMouseMotionEvent = this.defaultProcessMouseMotionEvent;
        // Enable low-level svg events,..those are: down and move,....(bug fix: and up, because your need that to change value of mouseState)
        if (this.processMouseEvent == this.emptyProcessEvent)
            this.enableSVGMouseEvents(true, true, true, false, false, false); // (up,down,move,over,out,click)
        else
            this.enableSVGMouseEvents(false, false, true, false, false, false); // (up,down,move,over,out,click)
    }

EventManager.prototype.enableKeyListener = function(useCapture) {
    // Summary : 
    // A component does not receive any svg events at start,..
    // run this method to recieve key events,....
    // use addKeyListener to register this object as a listener,...

        if (useCapture != undefined) this.useCapture = useCapture; // see Node class for useCapture
        // Enable low-level svg key events,..those are: keyup, keydown and keypress
        this.enableSVGKeyEvents(true, true, true); // (up,down,press)
    }

EventManager.prototype.disableMouseListener = function(useCapture) {
        if (useCapture != undefined) this.useCapture = useCapture; // see Node class for useCapture
        this.processMouseEvent = this.emptyProcessEvent;
        // Disable low-level svg events,.. those are: over and out and (up and down if motion listener is disabled)
        if (this.processMouseMotionEvent == this.emptyProcessEvent)
            this.disableSVGMouseEvents(true, true, false, true, true, true); // (up,down,move,over,out,click)
        else
            this.disableSVGMouseEvents(true, false, false, true, true, true); // (up,down,move,over,out,click)
    }

EventManager.prototype.disableMouseMotionListener = function(useCapture) {
        if (useCapture != undefined) this.useCapture = useCapture; // see Node class for useCapture
        this.processMouseMotionEvent = this.emptyProcessEvent;
        // Disable low-level svg events,..those are: move and (up and down if mouse listener is disabled)
        if (this.processMouseEvent == this.emptyProcessEvent)
            this.disableSVGMouseEvents(true, true, true, false, false, true); // (up,down,move,over,out,click)
        else
            this.disableSVGMouseEvents(false, false, true, false, false, false); // (up,down,move,over,out,click)
    }

EventManager.prototype.disableKeyListener = function(useCapture) {
    if (useCapture != undefined) this.useCapture = useCapture; // see Node class for useCapture
    // Disable low-level svg key events,..those are: keyup, keydown and keypress
    this.disableSVGKeyEvents(true, true, true); // (up,down,press)
}
/**
 * Swing.svg : FlowLayout
 *
 * @author    Adnan Sagar, PhD <adnan@websemantics.ca>
 * @copyright 2004-2015 Web Semantics, Inc. (http://websemantics.ca)
 * @license   http://www.opensource.org/licenses/mit-license.php MIT
 * @since     12th Feb 2005
 * @package   websemantics/oea/swing.svg
 */

/**
 * Class FlowLayout
 *
 * A flow layout arranges components in a left-to-right flow, much
 * like lines of text in a paragraph. Flow layouts are typically used
 * to arrange buttons in a panel. It will arrange buttons left to right until 
 * no more buttons fit on the same line. Each line is centered.
 *
 */

/* int */ var TOP = 3;
/* int */ var BOTTOM = 4;

// This value indicates that each row of components should be left-justified.
/* int */ var LEFT=0;

// This value indicates that each row of components should be centered.
/* int */ var CENTER=1;

// This value indicates that each row of components should be right-justified.
/* int */ var RIGHT=2;

// This value indicates that each row of components should be justified to the 
// leading edge of the container's orientation, for example, to the left in 
// left-to-right orientations.
/* int */ var LEADING=3;

// This value indicates that each row of components should be justified to the 
// trailing edge of the container's orientation, for example, to the right in 
// left-to-right orientations.
/* int */ var TRAILING=4;

// Implements LayoutManager

function FlowLayout( /* int */ align, /* int */ hgap, /* int */ vgap) {
        var argv = FlowLayout.arguments;
        var argc = FlowLayout.length;

        /* String */
        this.name = "FlowLayout";
        /* String */
        this.className = "FlowLayout";
        // This value indicates that each row of components should be left-justified.
        /* int */
        this.LEFT = 0;
        // This value indicates that each row of components should be centered.
        /* int */
        this.CENTER = 1;
        // This value indicates that each row of components should be right-justified.
        /* int */
        this.RIGHT = 2;
        // This value indicates that each row of components should be justified to the 
        // leading edge of the container's orientation, for example, to the left in 
        // left-to-right orientations.
        /* int */
        this.LEADING = 3;
        // This value indicates that each row of components should be justified to the 
        // trailing edge of the container's orientation, for example, to the right in 
        // left-to-right orientations.
        /* int */
        this.TRAILING = 4;
        // align is the property that determines how each row distributes empty space.
        // It can be one of the following values:LEFT,RIGHT,CENTER,LEADING and TRAILING.
        /* int */
        this.align = -1;
        /* int */
        this.newAlign = -1;
        // The flow layout manager allows a seperation of components with gaps.  
        // The horizontal gap will specify the space between components.
        /* int */
        this.hgap = 0;
        // The flow layout manager allows a seperation of components with gaps.  
        // The vertical gap will specify the space between rows.
        /* int */
        this.vgap = 0;
        
        if (argv.length > 0) 
        	this.initFlowLayout(align, hgap, vgap);
    }

FlowLayout.prototype.initFlowLayout = function(align, hgap, vgap) {
        if (align == undefined || align == null) align = this.LEFT;
        if (hgap == undefined || hgap == null) hgap = 5;
        if (vgap == undefined || vgap == null) vgap = 5;
        this.hgap = hgap;
        this.vgap = vgap;
        this.setAlignment(align);
    }

FlowLayout.prototype.getAlignment = function() {
		// Summary:
    // Gets the alignment for this layout.
        return this.newAlign;
    }

FlowLayout.prototype.setAlignment = function(align) {
		// Summary:
    // Sets the alignment for this layout.
        this.newAlign = align;
    }

FlowLayout.prototype.getHgap = function() {
		// Summary:
    // Gets the horizontal gap between components.
        return this.hgap;
    }

FlowLayout.prototype.setHgap = function(hgap) {
		// Summary:
    // Sets the horizontal gap between components.
        this.hgap = hgap;
    }

FlowLayout.prototype.getVgap = function() {
		// Summary:
    // Gets the vertical gap between components.
        return this.vgap;
    }

FlowLayout.prototype.setVgap = function(vgap) {
		// Summary:
    // Sets the vertical gap between components.
        this.vgap = vgap;
    }

FlowLayout.prototype.addLayoutComponent = function( /* String */ name, /* Component */ comp) {
		// Summary:
    // Adds the specified component to the layout. Not used by this class.	
}

FlowLayout.prototype.removeLayoutComponent = function( /* Component */ comp) {
		// Summary:
    // Removes the specified component from the layout. Not used by	
}

FlowLayout.prototype.preferredLayoutSize = function( /* Container */ target) {
		// Summary:
    // Returns the preferred dimensions for this layout given the visible components in 
    // the specified target container.

        /*Dimension */
        var dim = new Dimension(0, 0);
        /* int */
        var nmembers = target.componentCount();
        /* boolean */
        var firstVisibleComponent = true;

        for (var i = 0; i < nmembers; i++) {
            /* Component */
            var m = target.componentAt(i);
            if (m.visible && !m.absolutePosition) {
                /*Dimension */
                var d = m.getPreferredSize();
                dim.height = Math.max(dim.height, d.height);
                if (firstVisibleComponent) {
                    firstVisibleComponent = false;
                } else {
                    dim.width += this.hgap;
                }
                dim.width += d.width;
            }
        }

        /* Insets */
        var insets = target.getInsets();
        dim.width += insets.left + insets.right + this.hgap * 2;
        dim.height += insets.top + insets.bottom + this.vgap * 2;

        return dim;
    }

FlowLayout.prototype.minimumLayoutSize = function( /* Container */ target) {
		// Summary:
    // Returns the minimum dimensions needed to layout the visible components contained
    // in the specified target container.

        /* Dimension */
        var dim = new Dimension(0, 0);
        var nmembers = target.componentCount();

        for (var i = 0; i < nmembers; i++) {
            /* Component */
            var m = target.componentAt(i);
            if (m.visible && !m.absolutePosition) {
                /* Dimension */
                var d = m.getMinimumSize();
                dim.height = Math.max(dim.height, d.height);
                if (i > 0) {
                    dim.width += this.hgap;
                }
                dim.width += d.width;
            }
        }
        /* Insets */
        var insets = target.getInsets();
        dim.width += insets.left + insets.right + this.hgap * 2;
        dim.height += insets.top + insets.bottom + this.vgap * 2;

        return dim;
    }

FlowLayout.prototype.moveComponents = function( /* Container */ target, x, y, width, height, rowStart, rowEnd, /*boolean*/ ltr) {
		// Summary:
    // Centers the elements in the specified row, if there is any slack.

        switch (this.newAlign) {
            case this.LEFT:
                x += ltr ? 0 : width;
                break;
            case this.CENTER:
                x += width / 2;
                break;
            case this.RIGHT:
                x += ltr ? width : 0;
                break;
            case this.LEADING:
                break;
            case this.TRAILING:
                x += width;
                break;
        }

        for (var i = rowStart; i < rowEnd; i++) {
            /* Component */
            var m = target.componentAt(i);
            if (m.visible && !m.absolutePosition) {
                if (ltr) {
                    m.setLocation(x, y + (height - m.getHeight()) / 2);
                } else {
                    m.setLocation(target.getWidth() - x - m.getWidth(), y + (height - m.getHeight()) / 2);
                }
                x += m.getWidth() + this.hgap;
            }
        }
    }

FlowLayout.prototype.layoutContainer = function( /* Container */ target) {
		// Summary:
    // Lays out the container. This method lets each component take its preferred size 
    // by reshaping the components in the target container in order to satisfy the alignment of
    // FlowLayout object.

        /* Insets */
        var insets = target.getInsets();
        var maxwidth = target.getWidth() - (insets.left + insets.right + this.hgap * 2);
        var nmembers = target.componentCount();
        var x = 0,
            y = insets.top + this.vgap;
        var rowh = 0,
            start = 0;

        /* boolean */
        var ltr = true; // target.getComponentOrientation().isLeftToRight(); <=== [ NOT IMPLEMENTED] 

        for (var i = 0; i < nmembers; i++) {
            /* Component */
            m = target.componentAt(i);
            if (m.visible && !m.absolutePosition) {
                /* Dimension */
                var d = m.getPreferredSize();
                m.setSize(d.width, d.height);
                if ((x == 0) || ((x + d.width) <= maxwidth)) {
                    if (x > 0) {
                        x += this.hgap;
                    }
                    x += d.width;
                    rowh = Math.max(rowh, d.height);
                } else {
                    this.moveComponents(target, insets.left + this.hgap, y, maxwidth - x, rowh, start, i, ltr);
                    x = d.width;
                    y += this.vgap + rowh;
                    rowh = d.height;
                    start = i;
                } // else
            } // visible
        } // i
        this.moveComponents(target, insets.left + this.hgap, y, maxwidth - x, rowh, start, nmembers, ltr);
    }

FlowLayout.prototype.toString = function() {
    var str = "";
    switch (this.newAlign) {
        case LEFT:
            str = ",align=left";
            break;
        case CENTER:
            str = ",align=center";
            break;
        case RIGHT:
            str = ",align=right";
            break;
        case LEADING:
            str = ",align=leading";
            break;
        case TRAILING:
            str = ",align=trailing";
            break;
    }
    return this.className + "[hgap=" + this.hgap + ",vgap=" + this.vgap + str + "]";
}

/**
 * Swing.svg : BoxLayout
 *
 * @author    Adnan Sagar, PhD <adnan@websemantics.ca>
 * @copyright 2004-2015 Web Semantics, Inc. (http://websemantics.ca)
 * @license   http://www.opensource.org/licenses/mit-license.php MIT
 * @since     12th Feb 2005
 * @package   websemantics/oea/swing.svg
 */

/**
 * Class BoxLayout
 * 
 * A flow layout arranges components in a left-to-right flow, much
 * like lines of text in a paragraph. Flow layouts are typically used
 * to arrange buttons in a panel. It will arrange buttons left to right until 
 * no more buttons fit on the same line. Each line is centered.
 *
 */

// Components are laid out horizontally from left to right.
/* int */ var X_AXIS = 0; 

// Components are laid out vertically from top to bottom.
/* int */ var Y_AXIS = 1; 

// Implements LayoutManager
function BoxLayout( /* int */ axis, /* int */ align, /* int */ valign, /* int */ gap) {
        var argv = BoxLayout.arguments;
        var argc = BoxLayout.length;

        /* String */
        this.name = "BoxLayout";
        /* String */
        this.className = "BoxLayout";
        /* int */
        this.axis = -1; // Either, X_AXIS or Y_AXIS
        /* int */
        this.align = -1;
        /* int */
        this.valign = -1; // Vertical
        // The Box layout manager allows a seperation of components with gaps.  
        /* int */
        this.gap = -1;

        if (argv.length > 0)
        	this.initBoxLayout(axis, align, valign, gap);
    }

BoxLayout.prototype.initBoxLayout = function(axis, align, valign, gap) {
        if (axis == undefined || axis == null) axis = X_AXIS;
        if (align == undefined || align == null) align = LEFT;
        if (valign == undefined || valign == null) valign = TOP;
        if (gap == undefined || gap == -1) gap = 5;
        this.axis = axis;
        this.gap = gap;
        this.align = align;
        this.valign = valign;
    }

BoxLayout.prototype.getGap = function() {
		// Summary:
		// Gets the gap between components.
        return this.gap;
    }

BoxLayout.prototype.setGap = function(gap) {
		// Summary:
    // Sets the gap between components.
        this.gap = gap;
    }

BoxLayout.prototype.addLayoutComponent = function( /* String */ name, /* Component */ comp) {
		// Summary:
    // Adds the specified component to the layout. Not used by this class.	
}

BoxLayout.prototype.removeLayoutComponent = function( /* Component */ comp) {
		// Summary:
    // Removes the specified component from the layout. Not used by
}

BoxLayout.prototype.preferredLayoutSize = function( /* Container */ target) {
		// Summary:
    // Returns the preferred dimensions for this layout given the visible components in 
    // the specified target container.

        /* Dimension */
        var dim = new Dimension(0, 0);
        var nmembers = target.componentCount();

        for (var i = 0; i < nmembers; i++) {
            /* Component */
            var m = target.componentAt(i);
            if (m.visible && !m.absolutePosition) {
                /* Dimension */
                var d = m.getPreferredSize();
                // Calculate the height
                if (this.axis == X_AXIS)
                    dim.height = Math.max(dim.height, d.height);
                else {
                    if (i > 0) dim.height += this.gap;
                    dim.height += d.height;
                }
                // Calculate the width
                if (this.axis == Y_AXIS)
                    dim.width = Math.max(dim.width, d.width);
                else {
                    if (i > 0) dim.width += this.gap;
                    dim.width += d.width;
                }
            }
        }

        /* Insets */
        var insets = target.getInsets();
        dim.width += insets.left + insets.right + this.gap * 2;
        dim.height += insets.top + insets.bottom + this.gap * 2;

        return dim;
    }

BoxLayout.prototype.minimumLayoutSize = function( /* Container */ target) {
		// Summary:
    // Returns the minimum dimensions needed to layout the visible components contained
    // in the specified target container.

        /* Dimension */
        var dim = new Dimension(0, 0);
        var nmembers = target.componentCount();

        for (var i = 0; i < nmembers; i++) {
            /* Component */
            var m = target.componentAt(i);
            if (m.visible && !m.absolutePosition) {
                /* Dimension */
                var d = m.getMinimumSize();
                // Calculate the height
                if (this.axis == X_AXIS)
                    dim.height = Math.max(dim.height, d.height);
                else {
                    if (i > 0) dim.height += this.gap;
                    dim.height += d.height;
                }
                // Calculate the width
                if (this.axis == Y_AXIS)
                    dim.width = Math.max(dim.width, d.width);
                else {
                    if (i > 0) dim.width += this.gap;
                    dim.width += d.width;
                }
            }
        }


        /* Insets */
        var insets = target.getInsets();
        dim.width += insets.left + insets.right + this.gap * 2;
        dim.height += insets.top + insets.bottom + this.vgap * 2;

        return dim;
    }

BoxLayout.prototype.moveComponents = function( /* Container */ target, x, y, width, height, rowStart, rowEnd) {
		// Summary:
    // Centers the elements in the specified row, if there is any slack.

        /* Insets */
        var insets = target.getInsets();

        switch (this.align) {
            case RIGHT:
                x += width - insets.right;
                break;
            case CENTER:
                x += width / 2;
                break;
            case LEFT:
                x += insets.left;
                break;
        }

        for (var i = rowStart; i < rowEnd; i++) {
            /* Component */
            var m = target.componentAt(i);
            if (m.visible && !m.absolutePosition) {
                m.setLocation(x, y + (height - m.getHeight()) / 2);
                x += m.getWidth() + this.gap;
            }
        }
    }

BoxLayout.prototype.layoutContainer = function( /* Container */ target) {
		// Summary:
    // Lays out the container. This method lets each component take its preferred size 
    // by reshaping the components in the target container in order to satisfy the alignment of
    // BoxLayout object.

        /* Insets */
        var insets = target.getInsets();
        var nmembers = target.componentCount();
        var x = 0,
            y = insets.top,
            rowh = 0;

        var height = 0;

        if (this.axis == X_AXIS) {
            for (var i = 0; i < nmembers; i++) {
                /* Component */
                m = target.componentAt(i);
                if (m.visible && !m.absolutePosition) {
                    /* Dimension */
                    var d = m.getPreferredSize();
                    m.setSize(d.width, d.height);
                    if (x > 0) x += this.gap;
                    x += d.width;
                    rowh = Math.max(rowh, d.height);
                } // visible
            } // i
            // target,x,y,width,height,rowStart,rowEnd
            this.moveComponents(target, insets.left + this.gap, y, target.getWidth() - x - this.gap, rowh, 0, nmembers);
            height = target.getHeight() - rowh;
        } // axis==X_AXIS
        else
        if (this.axis == Y_AXIS) {
            var x = 0,
                y = 0,
                rowh = 0;
            for (var i = 0; i < nmembers; i++) {
                /* Component */
                m = target.componentAt(i);
                if (m.visible && !m.absolutePosition) {
                    /* Dimension */
                    var d = m.getPreferredSize();
                    m.setSize(d.width, d.height);
                    if (y > 0) y += this.gap;
                    y += d.height;
                    rowh = d.height;
                    // target,x,y,width,height,rowStart,rowEnd
                    this.moveComponents(target, x, y - d.height + this.gap, target.getWidth() - d.width, rowh, i, i + 1);
                } // visible
            } // i
            height = target.getHeight() - y - this.gap;
        } // axis==Y_AXIS

        // Move all components vertically,...
        var dy = 0;
        switch (this.valign) {
            case TOP:
                dy = insets.top;
                break;
            case CENTER:
                dy = height / 2;
                break;
            case BOTTOM:
                dy = height - insets.bottom;
                break;
        }
        for (var i = 0; i < nmembers; i++) {
            /* Component */
            m = target.componentAt(i);
            if (m.visible && !m.absolutePosition)
                m.setLocation(m.getX(), m.getY() + dy);
        } // i	 	 
    }

BoxLayout.prototype.toString = function() {
    var str = "";
    switch (this.axis) {
        case X_AXIS:
            str = "axis = X_AXIS";
            break;
        case Y_AXIS:
            str = "axis = Y_AXIS";
            break;
    }
    switch (this.align) {
        case LEFT:
            str += ", align = left";
            break;
        case CENTER:
            str += ", align = center";
            break;
        case RIGHT:
            str += ", align = right";
            break;
    }

    switch (this.valign) {
        case CENTER:
            str += ", valign = center";
            break;
        case TOP:
            str += ", valign = top";
            break;
        case BOTTOM:
            str += ", valign = bottom";
            break;
    }

    return this.className + "[" + str + ", gap = " + this.gap + "]";
}

/**
 * Swing.svg : Component
 *
 * @author    Adnan Sagar, PhD <adnan@websemantics.ca>
 * @copyright 2004-2015 Web Semantics, Inc. (http://websemantics.ca)
 * @license   http://www.opensource.org/licenses/mit-license.php MIT
 * @since     30th January 2005 -> 15th July 2005
 * @package   websemantics/oea/swing.svg
 */

/**
 * Class Component
 *
 * Comment: Things to look for when the mouse cursor hovers on a component.
 * 
 * (1) Change the mouse cursor
 * (2) Display Tooltip
 * (3) Display Contextual Menu when Mouse Right Click
 */

var componentDefaultWidth = 200 ;
var componentDefaultHeight = 200;
var TOP_LEVEL = true ;
var LOW_LEVEL = false ;

/**
 * Class Counter
 *
 * Counter, used to generate ids for svgSwing components when they are created
 * 
 */

function Counter( /* int */ counter) {
        if (counter != undefined)
            this.counter = counter;
        else
            this.counter = 0;
    }

Counter.prototype.getNext = function() {
        return this.counter++;
    }

/**
 * Class Component
 *
 * Extends EventManager
 * 
 */

Component.prototype = new EventManager();

function Component(x, y, w, h, name) {
        var argv = Component.arguments;
        var argc = Component.length;
        /* String */
        this.className = "Component";
        /* String */
        this.name = "Component";

        //  ***************** [ IMPORTANT ] ********************************
        // Each widget type (i.e. button , window, etc) should have a counter that 
        // keeps track of the number available of that components of that type. 
        // It's also needed to refernce the name of the counter in counterName 
        // (i.e. bCounter for buttons)
       
        /* String */
        this.componentId = null; // Ex: Button_1, Window_10, Textbox_4, etc
        
        /* Array */
        this.counter = new Array(0); // An array of counters used to count different types of components
        
        // *****************************************************************
        
        /* int */
        this.x = 0;
        /* int */
        this.y = 0;
        /* int */
        this.w = 0;
        /* int */
        this.h = 0;
        /* int */
        this.left = 0; // Padding for left, right, top, bottom of a Component
        /* int */
        this.right = 0;
        /* int */
        this.top = 0;
        /* int */
        this.bottom = 0;
        /* Component */
        this.cParent = null; // The parent component, for TOP_LEVEL equal NULL		
        /* int */
        this.type = LOW_LEVEL; // Has two values : LOW_LEVEL or TOP_LEVEL
        /* Color */
        this.foreground = "black"; // Color used to draw the text for instance
        /* Color */
        this.background = "none"; // Background color
        /* Font */
        this.font = null; // Font used to draw text
        /* Cursor */
        this.cursor = null; // Cursor shape,.. text ,cross, hair,..etc
        /* boolean */
        this.visible = true;
        /* boolean */
        this.enabled = true;
        /* boolean */
        this.focusable = true;
        /* boolean */
        this.hasFocus = false;
        /* Dimension */
        this.minSize = null;
        /* Dimension */
        this.prefSize = null;
        /* Rectangle */
        this.GlassPane = null; // A transparent content covers the whole area of the component, used to trap mouse events
        /* boolean */
        this.created = false; // True of the svg content has been created (only once).
        /* boolean */
        this.absolutePosition = false; // if true the conponent can not be laied out!			
        /* Vector */
        this.actionListeners = null; // A list of action listeners				
        /* String */
        this.tooltipText = null; // The text displayed when the mouse hovers on the widget
        
        // ****************** [ popUp Menu ] *********************
        /* PopUpMenu */
        this.popUpMenu = null;
        
        // ****************** [ refernces to SVG content, in addintion to getNode() ] *********************
        /* Graphics */
        this.rootg = null;
        /* Graphics */
        this.g = null;
        /* Graphics */
        this.glassPaneg = null;

 				// Number of layered Graphics: children of content Graphics 'g'
        /* int */
        this.layeredGraphicsCount = 0;
				
				// A refernce to the Graphics that's used for the Tooltip (root or glass pane)
        /* Graphics */
        this.tooltipGraphics = null; 
        
        if (argv.length > 0) 
        	this.initComponent(x, y, w, h, name);
    }

Component.prototype.initComponent = function(x, y, w, h, name) {
	
        this.font = new Font("Helvetica", "normal", "10pt");
        //this.font=new Font("Times New Roman","normal","14pt");
        this.initNode(x, y, w, h, 0, 1); // Args: x,y,w,h, rotate=0 and scale=1 
        this.setBounds(x, y, w, h);
        this.initEventManager();

        if (name != undefined) 
        	this.name = name;
        else 
        	name = this.getComponentId();

    }

Component.prototype.getComponentId = function() {
    // Summary: 
    // 	Returns a unique Id that starts with the component type (i.e. Button, Window, etc) and a number
    //   Ex: Button_1, Window_10, Textbox_4, etc

        // ex: this.counter["Lable"]++
        if (this.componentId == null) {
            if (this.counter[this.className] == undefined) this.counter[this.className] = 0;
            else this.counter[this.className]++;
            this.componentId = this.className + "_" + this.counter[this.className];
        }
        return this.componentId;
    }

Component.prototype.getAbsoluteLocation = function() {
    // Summary: 
    // getAbsoluteLocation: Get the x,y of this component absolute to the screen corner (0,0)

        var p = new Point(this.x, this.y);
        var node = this.cParent;

        while (node != null) {
            p.x += node.x;
            p.y += node.y;
            node = node.cParent;
        }

        return p;
    }

Component.prototype.addMenuItem = function( /* String */ text) {
        if (text == undefined || text == null) return;
        if (this.popUpMenu == null) {
            this.popUpMenu = new PopUpMenu(0, 0, 0, 0);
            this.popUpMenu.addActionListener(this);
        }
        this.popUpMenu.addTextItem(text);
    }

Component.prototype.addMenuSeparator = function() {
        if (this.popUpMenu == null) return;
        this.popUpMenu.addSeparator();
    }

Component.prototype.clipEdgesOn = function() {
        this.rootg.setClipOn();
    }

Component.prototype.clipEdgesOff = function() {
    // Summary: 
    // clipEdgesOff : Leave any content that falls outside the component boundaries uncut
        this.rootg.setClipOff();
    }

Component.prototype.glassPaneOn = function() {
    // Summary:
    // To capture mouse events and not to confuse the mouseout/over (mouseEntered, mouseExited) events.
    // Top-level subclass has to put the Glasspane on.
    // Make sure to transfer the tooltip to the glassPaneg

        this.glassPaneg.setBackground("blue");
        this.glassPaneg.backgroundRect.setOpacity(0);
    }

Component.prototype.removeGlassPane = function() {
    // Summary:
    // removeGlassPane : 
    // Make sure to transfer the tooltip to the rootg

        this.glassPaneg.removeBackground();
    }

Component.prototype.getGraphics = function() {
    // Summary:
    // getGraphics : Create a layered Graphics that's a child of the 
    // Content Graphics, 'g'

        var g = createGraphics(0, 0, this.w, this.h, this.getComponentId() + "_LayeredGraphics_" + (this.layeredGraphicsCount++), this.g);
        g.setFont(this.getFont())
        g.setColor(this.foreground);
        return g;
    }

Component.prototype.setAbsolutePosition = function( /* boolean */ flag) {
        this.absolutePosition = flag;
    }

Component.prototype.addActionListener = function( /* ActionListener */ obj) {
        if (this.actionListeners == null) this.actionListeners = new Vector();
        if (!this.actionListeners.contains(obj))
            this.actionListeners.addElement(obj);
    }

Component.prototype.removeActionListener = function( /* ActionListener */ obj) {
        this.actionListeners.removeElement(obj);
    }

Component.prototype.setParent = function( /* Component */ parent) {
        this.cParent = parent;
    }

Component.prototype.getParent = function() {
        return this.cParent;
    }

Component.prototype.setBackground = function( /* Color */ background) {
        if (background != undefined)
            this.background = background;
        if (this.rootg)
            this.rootg.setBackground(background);
    }

Component.prototype.getBackground = function() {
	// Summary:
	// return 'none' if background color = null 
        return this.background;
        //return this.rootg.getBackground();
    }

Component.prototype.setInsets = function( /* int */ left, /* int */ right, /* int */ top, /* int */ bottom) {
        this.left = left;
        this.right = right;
        this.top = top;
        this.bottom = bottom;
        // if(this.created)
        //   this.recalc();
    }

Component.prototype.getInsets = function() {
        return new Insets(this.top, this.left, this.bottom, this.right);
    }

Component.prototype.getLocation = function() {
    // Summary:
    // Gets the location of this component in the form of a point

        return new Point(this.x, this.y);
    }

Component.prototype.setLocation = function(x, y) {
    // Summary:
    // Moves this component to a new location. 
    //
    // Forms:
    // ======
    // (1) setLocation(x,y)
    // (2) setLocation(point)

        if (x instanceof Point) {
            /* Point */
            var p = x;
            this.setLocation(p.x, p.y);
            return;
        }
        this.setBounds(x, y, this.w, this.h);
    }

Component.prototype.getSize = function() {
    // Summary:
    // Returns the size of this component in the form of aDimension object.
        return new Dimension(this.w, this.h);
    }

Component.prototype.setSize = function(width, height) {
    // Summary:
    // Resizes this component so that it has width and height.
    //
    // Forms:
    // ======
    // (1) setSize(width,height)
    // (2) setSize(dimension)

        if (width instanceof Dimension) {
            /* Dimension */
            var d = width;
            this.setSize(d.width, d.height);
            return;
        }
        this.setBounds(this.x, this.y, width, height);
    }

Component.prototype.getBounds = function() {
    // Summary:
    // Gets the bounds of this component in the form of aRectangle object.
        return new gRectangle(this.x, this.y, this.w, this.h);
    }

Component.prototype.setBounds = function(x, y, width, height) {
    // Summary:
    // Moves and resizes this component.
    //
    // Forms:
    // ======
    // (1) setBounds(x,y,width,height)
    // (2) setBounds(rectangle)

        if (x instanceof gRectangle) {
            /* Rectangle */
            var r = x;
            this.setBounds(r.x, r.y, r.width, r.height);
            return;
        }
        this.x = x;
        this.y = y;
        this.w = width;
        this.h = height;
        //
        this.onResize();
        this.onMove();
    }

Component.prototype.getX = function() {
    // Summary:
    // Returns the current x coordinate of the components origin.
        return this.x;
    }

Component.prototype.getY = function() {
    // Summary:
    // Returns the current y coordinate of the components origin.
        return this.y;
    }

Component.prototype.getWidth = function() {
    // Summary:
    // Returns the current width of this component.
        return this.w;
    }

Component.prototype.getHeight = function() {
    // Summary:
    // Returns the current height of this component.
        return this.h;
    }

Component.prototype.isEnabled = function() {
        return this.enabled;
    }

Component.prototype.getPreferredSize = function() {
		// Summary:
		// Gets the preferred size of this component
        return this.getSize();
    }

Component.prototype.getMinimumSize = function() {
    // Summary:
    // Gets the preferred size of this component.
        return this.getSize();
    }

Component.prototype.setToolTipText = function(text) {
    // Summary : 
    // This method is used to create a tooltip for the component AND to change the content of this.tooltipText property

        // First remove previous handlers of the Tooltip
        this.removeToolTipText();
        this.tooltipGraphics = null;

        if (this.glassPaneg != null) this.tooltipGraphics = this.glassPaneg;
        else this.tooltipGraphics = this.rootg;

        this.tooltipText = text;
        tp_setToolTipText(this.tooltipText, this.tooltipGraphics);
    }

Component.prototype.removeToolTipText = function() {
        if (this.rootg != null) tp_removeToolTipText(this.rootg);
        if (this.glassPaneg != null) tp_removeToolTipText(this.glassPaneg);
    }

Component.prototype.changeDisplayedToolTipText = function(text) {
    // Summary
    // This method does not affect the content of this.tooltipText 
    // property, it only changes the text displayed

        var node = this;

        // Change the tooltip of the top-most container,...
        while (node.cParent != null) node = node.cParent;

        if (node.tooltipGraphics != null)
            node.tooltipGraphics.changeToolTipText(text); // see SVGNode


    }

Component.prototype.getToolTipText = function() {
        return this.tooltipText;
    }

Component.prototype.paint = function( /* Graphics */ g) {
        this.paintComponent(g);
    }

Component.prototype.paintComponent = function( /* Graphics */ g) {
    // Summary
    // Paint a component and its subclass.
        
        if (!this.created) {
            this.created = true;
            this.createSVGContent();
        }
        // Always add the rootg to the incoming Graphics.
        if (g != undefined) g.addGraphics(this.rootg);
    }

Component.prototype.repaint = function(x, y, width, height) {
        if (x == undefined || y == undefined || 
        	  width == undefined || height == undefined) {
            this.repaint(this.x, this.y, this.w, this.h);
            return;
        }
        this.paint();
    }

Component.prototype.createSVGContent = function() {
        this.createSVGContentComponent();
    }

Component.prototype.createSVGContentComponent = function() {
    // Summary: 
    // createSVGContent: Used to create the SVG content of a component 
    // (Graphics and background, etc) and its subclass only once.
    // The programmer needs to call createSVGContent only inside the paint method.

        this.rootg = createGraphics(this.x, this.y, this.w, this.h, this.getComponentId()); // this.rootg is the root Graphics object 
        this.rootg.setBackground(this.background); // The background color of the component
        this.setNode(this.rootg.getNode()); // Set the root svg node to the group element associated with the root Graphics
        this.g = createGraphics(0, 0, this.w, this.h, this.getComponentId() + "_ContentGraphics", this.rootg);
        this.glassPaneg = createGraphics(0, 0, this.w, this.h, this.getComponentId() + "_GlassPaneGraphics", this.rootg);
        if (this.popUpMenu != null) {
            this.popUpMenu.paint();
            menuLayer.addGraphics(this.popUpMenu);
        }
        this.setToolTipText(this.tooltipText);
        this.setCursor(this.getCursor());
        this.show();
    }

Component.prototype.onResize = function() {
        this.onResizeComponent();
    }

Component.prototype.onResizeComponent = function() {
        // Make neccessary changes on the component content first,...
        if (this.rootg != null) this.rootg.setSize(this.w, this.h);
        if (this.glassPaneg != null) this.glassPaneg.setSize(this.w, this.h);
    }

Component.prototype.onMove = function() {
        this.onMoveComponent();
    }

Component.prototype.onMoveComponent = function() {
        // Make neccessary changes on the component content first,...
        if (this.rootg) this.rootg.translate(this.x, this.y);
    }

Component.prototype.recalc = function() {
    // Summary: 
    // Used when the component is relying on computationals based on text,...

        this.recalcComponent();
    }

Component.prototype.recalcComponent = function() {
    // Summary: 
    // Used when the component is relying on computationals based on text,...

        if (this.popUpMenu != null) this.popUpMenu.recalc();
    }

Component.prototype.setFont = function( /* Font */ font) {
        this.font = font;
    }

Component.prototype.getFont = function() {
        return this.font;
    }

Component.prototype.isShown = function() {
        return (this.getAttribute('display') == "inline");
    }

Component.prototype.isHidden = function() {
        return (this.getAttribute('display') == "none");
    }

Component.prototype.show = function() {
        this.showComponent();
    }

Component.prototype.hide = function() {
        this.hideComponent();
    }
    //*************************************************
    // showComponent
    //*************************************************
Component.prototype.showComponent = function() {
        this.setAttribute('display', "inline");
    }

Component.prototype.hideComponent = function() {
        this.setAttribute('display', "none");
    }

Component.prototype.enableKeyboard = function() {
    // Summary: 
    // Enable the component to receive keyboard events from the desktop
        ds_addEventListener(this, "keydown", "keyProcess");
        ds_addEventListener(this, "keyup", "keyProcess");
        ds_addEventListener(this, "keypress", "keyProcess");
    }

Component.prototype.disableKeyboard = function() {
    // Summary: 
    // Disable the component to receive keyboard events from the desktop
        ds_removeEventListener(this, "keydown", "keyProcess");
        ds_removeEventListener(this, "keyup", "keyProcess");
        ds_removeEventListener(this, "keypress", "keyProcess");
    }

Component.prototype.keyProcess = function(evt) {
    // Summary : 
    // Pass the received SVG events to EventManager. To make it as if the objet itself has received the event,..not the desktop
    switch (evt.type) {
        case "keydown":
            this.processKeyEvent("keyPressed", evt);
            break;
        case "keyup":
            this.processKeyEvent("keyReleased", evt);
            break;
        case "keypress":
            this.processKeyEvent("keyTyped", evt);
            break;
    }
}

Component.prototype.gainFocus = function() {
		// Summary: 
		// Very simple implementation of focus, when the component has focus it can 
		// receive keyboard events

        this.gainFocusComponent();
    }

Component.prototype.gainFocusComponent = function() {
        this.hasFocus = true;
        this.enableKeyboard();
    }

Component.prototype.lostFocus = function() {
        this.lostFocusComponent();
    }

Component.prototype.lostFocusComponent = function() {
        this.hasFocus = false;
        this.disableKeyboard();
    }

Component.prototype.actionPerformed = function( /* ActionEvent */ e) {}

Component.prototype.toString = function() {
    return this.getComponentId();
}
/**
 * Swing.svg : Canvas
 *
 * @author    Adnan Sagar, PhD <adnan@websemantics.ca>
 * @copyright 2004-2015 Web Semantics, Inc. (http://websemantics.ca)
 * @license   http://www.opensource.org/licenses/mit-license.php MIT
 * @since     9th Feb 2005
 * @package   websemantics/oea/swing.svg
 */

/** 
 * Class Canvas
 *
 * It is not permitted to use the Component type directly, use this instead
 * 
 */

Canvas.prototype = new Component();

function Canvas(x, y, w, h, name) {
        var argv = Canvas.arguments;
        var argc = Canvas.length;
        /* String */
        this.name = "Canvas";
        /* String */
        this.className = "Canvas";

        if (argv.length > 0) 
        	this.initCanvas(x, y, w, h, name);
    }

Canvas.prototype.initCanvas = function(x, y, w, h, name) {
        this.initComponent(x, y, w, h, name);
    }

Canvas.prototype.paint = function( /* Graphics */ g) {
        this.paintCanvas(g);
    }

Canvas.prototype.paintCanvas = function( /* Graphics */ g) {
        this.paintComponent(g);
    }

Canvas.prototype.createSVGContent = function() {
        this.createSVGContentCanvas();
    }

Canvas.prototype.createSVGContentCanvas = function() {
        this.createSVGContentComponent();
    }

Canvas.prototype.onResize = function() {
        this.onResizeCanvas();
    }

Canvas.prototype.onResizeCanvas = function() {
        this.onResizeComponent();
    }

Canvas.prototype.onMove = function() {
        this.onMoveCanvas();
    }

Canvas.prototype.onMoveCanvas = function() {
        this.onMoveComponent();
    }

Canvas.prototype.recalc = function() {
        this.recalcCanvas();
    }

Canvas.prototype.recalcCanvas = function() {
        this.recalcComponent();
    }

Canvas.prototype.gainFocus = function() {
        this.gainFocusCanvas();
    }

Canvas.prototype.gainFocusCanvas = function() {
        this.gainFocusComponent();
    }

Canvas.prototype.lostFocus = function() {
        this.lostFocusCanvas();
    }

Canvas.prototype.lostFocusCanvas = function() {
    this.lostFocusComponent();
}
/**
 * Swing.svg : Container
 *
 * @author    Adnan Sagar, PhD <adnan@websemantics.ca>
 * @copyright 2004-2015 Web Semantics, Inc. (http://websemantics.ca)
 * @license   http://www.opensource.org/licenses/mit-license.php MIT
 * @since     13th Feb 2005
 * @package   websemantics/oea/swing.svg
 */

/**
 * Class Container
 *
 *  Comments: 
 *  --------
 *  To control the Context Menu of ASV,.. The algorithm used
 *  is that when the mouse is pressed the context menu gets deleted and and 
 *  but then restored when it is released. existed or end dragged. 
 *  Known bug,.. when zoom/pan using keyboard the context menu might come back.
 *
 */

Container.prototype = new Canvas();

function Container( /* String */ name) {
        var argv = Container.arguments;
        var argc = Container.length;

        /* String */
        this.name = "Container";
        /* String */
        this.className = "Container";
        /* Vector */
        this.children = null;
        /* Layout */
        this.layout = null;
        /* int */
        this.pressX = 0;
        /* int */
        this.pressY = 0;
        /* menu */
        this.oldContextMenu = null;
        /* Component */
        this.draggOwner == null;
        /* Component */
        this.moveOwner == null;
        /* String */
        this.containerCursor = null;

        if (argv.length > 0) 
          this.initContainer(name);
    }

Container.prototype.initContainer = function(x, y, w, h, name) {
        this.initCanvas(x, y, w, h, name);
        // The container handles its own events
        this.addInternalMouseMotionListener(mouseStartDragged, "econtMouseStartDragged");
        this.addInternalMouseMotionListener(mouseEndDragged, "econtMouseEndDragged");
        this.addInternalMouseMotionListener(mouseDragged, "econtMouseDragged");
        this.addInternalMouseMotionListener(mouseMoved, "econtMouseMoved");
        this.addInternalMouseMotionListener(mousePressed, "econtMousePressed");
        this.addInternalMouseMotionListener(mouseReleased, "econtMouseReleased");
        this.addInternalMouseMotionListener(mouseClicked, "econtMouseClicked");
        this.addInternalMouseMotionListener(mouseEntered, "econtMouseEntered");
        this.addInternalMouseMotionListener(mouseExited, "econtMouseExited");
    }

Container.prototype.createSVGContent = function() {
        this.createSVGContentContainer();
    }

Container.prototype.createSVGContentContainer = function() {
        this.createSVGContentCanvas();
    }

Container.prototype.paintChildren = function( /* Graphics */ g) {
        if (this.children != null) {
            /* Enumeration */
            var k = this.components();
            while (k.hasMoreElements()) k.nextElement().paint(g);
        }
        this.layoutChildren();
    }

Container.prototype.paint = function( /* Graphics */ g) {
        this.paintContainer(g);
    }

Container.prototype.paintContainer = function( /* Graphics */ g) {
        this.paintCanvas(g);
    }

Container.prototype.layoutChildren = function() {
        if (this.children != null && this.getLayout() != null)
            this.getLayout().layoutContainer(this);
    }

Container.prototype.recalc = function() {
        this.recalcContainer();
    }

Container.prototype.recalcContainer = function() {
    // Summary:
    //  recalc all the contained components

        this.recalcCanvas();
        if (this.children != null) {
            /* Enumeration */
            var k = this.components();
            while (k.hasMoreElements()) k.nextElement().recalc();
        }
        this.layoutChildren();
    }

Container.prototype.onResize = function() {
        this.onResizeContainer();
    }

Container.prototype.onResizeContainer = function() {
        this.onResizeCanvas();

        if (this.children != null) {
            /* Enumeration */
            var k = this.components();
            while (k.hasMoreElements()) k.nextElement().onResize();
        }
        this.layoutChildren();
    }

Container.prototype.onMove = function() {
        this.onMoveContainer();
    }

Container.prototype.onMoveContainer = function() {
        this.onMoveCanvas();
    }

Container.prototype.setLayout = function( /* Layout */ manager) {
        this.layout = manager;
    }

Container.prototype.getLayout = function() {
        return this.layout;
    }

Container.prototype.add = function( /* Component */ d) {
    // Summary:
    // Adds a component to the list of cmponents. 

        return this.addContainer(d);
    }

Container.prototype.addContainer = function( /* Component */ d) {

        if (this.children == null)
            this.children = new Vector();
        if (!this.children.contains(d)) {
            this.children.addElement(d);
            d.setParent(this);
        }
        return d;
    }

Container.prototype.remove = function( /* Component */ d) {
    // Summary:
    // Removes a component from the container.
        return this.removeContainer(d);
    }

Container.prototype.removeContainer = function( /* Component */ d) {
        if (this.children != null && this.children.contains(d)) {
            d.setParent(null);
            this.children.removeElement(d);
        }
        return d;
    }

Container.prototype.sendToBack = function( /* Component */ d) {
    // Summary:
    // Sends a component to the back.

        if (this.children != null && this.children.contains(d)) {
            this.children.removeElement(d);
            this.children.insertElementAt(d, 0);
        }
    }

Container.prototype.bringToFront = function( /* Component */ d) {
    // Summary:
    // Brings a component to the front.

        if (this.children != null && this.children.contains(d)) {
            this.children.removeElement(d);
            this.children.addElement(d);
        }
    }

Container.prototype.componentAt = function(i) {
    // Summary:
    // Gets a component at the given index.

        if (this.children != null) return this.children.elementAt(i);
        else return null;
    }

Container.prototype.components = function() {
    // Summary:
    // Returns an Enumeration for accessing the contained components.
    // The components are returned in the drawing order.

        if (this.children != null) return new Enumerator(this.children);
        else return null;
    }

Container.prototype.componentCount = function() {
    // Summary:
    // Gets number of child figures.

        if (this.children != null) return this.children.size();
        else return null;
    }

Container.prototype.componentsReverse = function() {
    // Summary:
    // Returns an Enumeration for accessing the contained components in the reverse drawing order.

        if (this.children != null) return new ReverseEnumerator(this.children);
        else return null;
    }

Container.prototype.findComponent = function(x, y) {
    // Summary:
    // Finds a top level component. Use this call for hit detection that should not 
    // descend into the figure's children.

        /* Enumeration */
        var k = this.componentsReverse();
        while (k != null && k.hasMoreElements()) {
            /* Component */
            var d = k.nextElement();
            /* gRectangle */
            var r = new gRectangle(d.x, d.y, d.getWidth(), d.getHeight());
            if (r.contains(x, y)) return d;
        }
        return null;
    }

Container.prototype.getComponentAt = function(x, y) {
    // Summary :
    //  Return only components that have active=true

        return this.findComponent(x, y);
    }

Container.prototype.findComponentInside = function(x, y) {
    // Summary :
    // Finds a component but descends into a component's children. Use this method to implement 
    // click-through hit detection, that is, you want to detect the inner most component 
    // containing the given point.

        /* Enumeration */
        var k = this.componentsReverse();
        while (k != null && k.hasMoreElements()) {
            /* Component */
            var d = k.nextElement().findComponentInside(x, y);
            if (d != null) return d;
        }
        return null;
    }

Container.prototype.includes = function( /* Component */ d) {
    // Summary :
    // Checks if the container has the argument as one of its children.

        /* Enumeration */
        var k = this.components();
        while (k != null && k.hasMoreElements()) {
            /* Component */
            var f = k.nextElement();
            if (f.includes(d)) return true;
        }
        return false;
    }

Container.prototype.isEventable = function( /* Component */ d) {
        return d != null && d.isEnabled();
    }

Container.prototype.econtMouseStartDragged = function( /* MouseEvent */ e) {

        tp_turnToolTipOff(); // <===[ Turn the Tooltip off ]

        this.pressX = e.getX();
        this.pressY = e.getY();
        var d = this.getComponentAt(e.getX(), e.getY())
        if (this.isEventable(d)) {
            this.draggOwner = d;
            this.moveOwner = null;
            this.fireMouseMotionEventToComponent(d, "mouseStartDragged", e);
        }
    }

Container.prototype.econtMouseEndDragged = function( /* MouseEvent */ e) {

        this.restoreASVContextMenue(); // <=======[restoreASVContextMenue]

        tp_turnToolTipOn(); // <======[ Turn the Tooltip on]

        if (this.draggOwner != null) {
            this.fireMouseMotionEventToComponent(this.draggOwner, "mouseEndDragged", e);
            this.draggOwner = null;
        } else this.mouseEventHandler("mouseReleased", e);
    }

Container.prototype.econtMouseDragged = function( /* MouseEvent */ e) {

        if (this.draggOwner != null) {
            this.fireMouseMotionEventToComponent(this.draggOwner, "mouseDragged", e);
        }
        // else this.mouseMotionEventHandler("mouseMoved",e);
    }

Container.prototype.econtMouseMoved = function( /* MouseEvent */ e) {
        var d = this.getComponentAt(e.getX(), e.getY())
        if (this.moveOwner != null) {
            if (d != this.moveOwner) {
                var old = this.moveOwner;
                this.moveOwner = null;
                this.fireMouseEventToComponent(old, "mouseExited", e);

                if (this.isEventable(d)) {
                    this.moveOwner = d;
                    this.fireMouseEventToComponent(d, "mouseEntered", e);
                }
            } else if (this.isEventable(d)) this.fireMouseMotionEventToComponent(d, "mouseMoved", e);
        } else
        if (this.isEventable(d)) {
            this.moveOwner = d;
            this.fireMouseEventToComponent(d, "mouseEntered", e);
        }
    }

Container.prototype.econtMouseEntered = function( /* MouseEvent */ e) {
        if (this.draggOwner == null) {
            d = this.getComponentAt(e.getX(), e.getY());
            if (this.isEventable(d)) {
                this.moveOwner = d;
                this.fireMouseEventToComponent(d, "mouseEntered", e);
            }
        }
    }

Container.prototype.econtMouseExited = function( /* MouseEvent */ e) {
        
        this.restoreASVContextMenue(); // <==========[restoreASVContextMenue]

        if (this.moveOwner != null && this.draggOwner == null) {
            d = this.moveOwner;
            this.moveOwner = null;
            this.fireMouseEventToComponent(d, "mouseExited", e);
        }
    }

Container.prototype.econtMouseClicked = function( /* MouseEvent */ e) {
        this.pressX = e.getX();
        this.pressY = e.getY();
        var d = this.getComponentAt(e.getX(), e.getY())
        if (this.isEventable(d)) this.fireMouseEventToComponent(d, "mouseClicked", e);
    }

Container.prototype.econtMousePressed = function( /* MouseEvent */ e) {

        this.removeASVContextMenue(); // <==========[removeASVContextMenue]

        var d = this.getComponentAt(e.getX(), e.getY());

        /* Point */
        var p = this.getAbsoluteLocation();

        // PopUpMenu
        if (e.getButton() == BUTTON2) {
            var popUpMenu = null;
            var x = p.x + e.getX() + 5;
            var y = p.y + e.getY() + 5;
            // Display the PopUp Menu of the component d (d is not a container)
            if (d != null && d.popUpMenu != null && !d.initContainer)
                popUpMenu = d.popUpMenu;
            else if (this.popUpMenu != null) // Else, display the PopUp Menu of the container
                popUpMenu = this.popUpMenu;

            if (popUpMenu != null) {
                var w = popUpMenu.getWidth();
                var h = popUpMenu.getHeight();
                if (x + w > innerWidth) x = innerWidth - w;
                if (y + h > innerHeight) y = innerHeight - h;
                popUpMenu.translate(x, y);
                popUpMenu.show();
            }

        }

        this.pressX = e.getX();
        this.pressY = e.getY();
        if (this.isEventable(d)) this.fireMouseEventToComponent(d, "mousePressed", e);
    }

Container.prototype.econtMouseReleased = function( /* MouseEvent */ e) {
        this.restoreASVContextMenue(); // <===============[restoreASVContextMenue]
        var d = this.getComponentAt(e.getX(), e.getY())
        if (this.isEventable(d)) this.fireMouseEventToComponent(d, "mouseReleased", e);
    }

Container.prototype.fireMouseEventToComponent = function( /* component */ comp, eventType, /* MouseEvent */ event) {
        // The x and y of the event starts from 0 and 0
        event.translatePoint(-comp.x, -comp.y);
        // Display the Tooltip of the component and change the mouse shape to the component mouse cursor 
        if (eventType == "mouseEntered") {
            var ttext = comp.getToolTipText();
            if (ttext != null) this.changeDisplayedToolTipText(ttext);
            this.containerCursor = this.getCursor();
            var cursor = comp.getCursor();
            if (cursor != null)
                this.setCursor(cursor);
        }
        // Display the Tooltip of the container and change the mouse shape to the container mouse cursor 
        if (eventType == "mouseExited") {
            var ttext = this.getToolTipText();
            if (ttext != null) this.changeDisplayedToolTipText(ttext);
            else this.removeToolTipText();
            if (this.containerCursor != null)
                this.setCursor(this.containerCursor);
            else
                this.setCursor("default");
        }

        comp.mouseEventHandler(eventType, event);
    }

Container.prototype.fireMouseMotionEventToComponent = function( /* component */ comp, eventType, /* MouseEvent */ event) {
        // The x and y of the event starts from 0 and 0
        event.translatePoint(-comp.x, -comp.y);
        // Display the Tooltip of the container and change the mouse shape to the container mouse cursor 
        if (eventType == "mouseEndDragged") {
            var ttext = this.getToolTipText();
            if (ttext != null) this.changeDisplayedToolTipText(ttext);
            else this.removeToolTipText();
            if (this.containerCursor != null)
                this.setCursor(this.containerCursor);
            else
                this.setCursor("default");
        }

        comp.mouseMotionEventHandler(eventType, event);
    }
    //===================================================================
    //
    // Customized methods for Adobe SVG plugin to remove the ContextMenu
    //
    //===================================================================

Container.prototype.removeASVContextMenue = function() {
    // Summary:
    // Remove ASV context Menue

        if (!contextMenu && contextMenu == undefined) return;
        if (contextMenu.firstChild && contextMenu.firstChild != null) {
            this.oldContextMenu = contextMenu.firstChild;
            contextMenu.removeChild(contextMenu.firstChild);
        }
    }

Container.prototype.restoreASVContextMenue = function() {
    // Summary:
    // Restore ASV context Menue

    if (contextMenu && contextMenu == undefined || this.oldContextMenu == null) return;
    if (!contextMenu.firstChild) contextMenu.appendChild(this.oldContextMenu);
}
/**
 * Swing.svg : Panel
 *
 * @author    Adnan Sagar, PhD <adnan@websemantics.ca>
 * @copyright 2004-2015 Web Semantics, Inc. (http://websemantics.ca)
 * @license   http://www.opensource.org/licenses/mit-license.php MIT
 * @since     9th Feb 2005
 * @package   websemantics/oea/swing.svg
 */

Panel.prototype = new Container();

function Panel(x, y, w, h) {
        var argv = Panel.arguments;
        var argc = Panel.length;

        /* String */
        this.name = "Panel";
        /* String */
        this.className = "Panel";

        if (argv.length > 0) 
        	this.initPanel(x, y, w, h);
    }

Panel.prototype.initPanel = function(x, y, w, h) {
        this.initContainer(x, y, w, h);
    }

Panel.prototype.paint = function( /* Graphics */ g) {
        this.paintPanel(g);
    }

Panel.prototype.paintPanel = function( /* Graphics */ g) {
        this.paintContainer(g);
    }

Panel.prototype.createSVGContent = function() {
        this.createSVGContentPanel();
    }

Panel.prototype.createSVGContentPanel = function() {
        this.createSVGContentContainer();
        this.contentg = this.getGraphics();
        this.paintChildren(this.contentg);
    }

Panel.prototype.onResize = function() {
        this.onResizePanel();
    }

Panel.prototype.onResizePanel = function() {
        this.onResizeContainer();
    }

Panel.prototype.onMove = function() {
        this.onMovePanel();
    }

Panel.prototype.onMovePanel = function() {
        this.onMoveContainer();
    }

Panel.prototype.recalc = function() {
        this.recalcPanel();
    }

Panel.prototype.recalcPanel = function() {
    this.recalcContainer();
}



/**
 * Swing.svg : Icon
 *
 * @author    Adnan Sagar, PhD <adnan@websemantics.ca>
 * @copyright 2004-2015 Web Semantics, Inc. (http://websemantics.ca)
 * @license   http://www.opensource.org/licenses/mit-license.php MIT
 * @since     20th July 2005
 * @package   websemantics/oea/swing.svg
 */

function Icon( /* String */ filename, /* int */ w, /* int */ h) {
        var argv = Icon.arguments;
        var argc = Icon.length;

        /* String */
        this.className = "Icon";
        /* String */
        this.name = "Icon";
        /* String */
        this.filename = null;
        /* Image */
        this.iconShape = null;
        /* int */
        this.w = 0;
        /* int */
        this.h = 0;

        if (argv.length > 0) 
        	this.initIcon(filename, w, h);
    }

Icon.prototype.initIcon = function(filename, w, h) {
        if (filename != undefined) this.filename = filename;
        this.w = w;
        this.h = h;
    }

Icon.prototype.createSVGContent = function( /* Graphics */ g) {
        this.iconShape = g.drawImage(0, 0, this.w, this.h, this.filename);
        this.iconShape.setOriginToCenter();
    }

Icon.prototype.getWidth = function() {
        if (this.iconShape != null) return this.iconShape.getWidth();
        else return 0;
    }

Icon.prototype.getHeight = function() {
        if (this.iconShape != null) return this.iconShape.getHeight();
        else return 0;
    }

Icon.prototype.translate = function(x, y) {
    if (this.iconShape != null) this.iconShape.translate(x, y);
}
/**
 * Swing.svg : Label
 *
 * @author    Adnan Sagar, PhD <adnan@websemantics.ca>
 * @copyright 2004-2015 Web Semantics, Inc. (http://websemantics.ca)
 * @license   http://www.opensource.org/licenses/mit-license.php MIT
 * @since     15th July 2005
 * @package   websemantics/oea/swing.svg
 */

Label.prototype= new Canvas(); 

function Label( /* int */ x, /* int */ y, /* int */ w, /* int */ h, /* String */ name, /* String */ caption, /* Icon */ icon) {
        var argv = Label.arguments;
        var argc = Label.length;

        /* String */
        this.className = "Label";
        /* String */
        this.name = "Label";
        /* String */
        this.caption = null;
        /* Color */
        this.textColor = "black";
        /* int */
        this.align = CENTER;
        /* int */
        this.valign = CENTER;
        /* Boolean */
        this.resizeToText = true; // if true, the size of the Label is set to the size of its text content
        /* Graphics */
        this.lg = null;
        /* Icon */
        this.icon = null;
        /* Shape */
        this.textShape = null;
        /* int */
        this.textShapeWidth = 0; // The width of the text node,...to be calculated in recalc method
        /* int */
        this.textShapeHeight = 0; // The height of the text node,...to be calculated in recalc method
        
        if (argv.length > 0) 
          this.initLabel(x, y, w, h, name, caption, icon);
    }

Label.prototype.initLabel = function(x, y, w, h, name, caption, icon) {
        this.initCanvas(x, y, w, h);
        // left,right,top,bottom 
        this.setInsets(4, 4, 4, 4);

        if (name != undefined) this.name = name;
        else name = this.getComponentId();
        if (caption != undefined) this.caption = caption;

        if (icon != undefined) this.icon = icon;
    }

Label.prototype.createSVGContent = function() {
        this.createSVGContentLabel();
    }

Label.prototype.createSVGContentLabel = function() {
        this.createSVGContentCanvas();

        this.lg = this.getGraphics();
        this.lg.setFont(this.font);
        this.lg.setColor(this.foreground);

        var x = this.left;
        var y = this.top;

        if (this.icon != null) {
            this.icon.createSVGContent(this.lg);
            x += this.icon.w;
        }

        if (this.caption != null) {
            this.lg.setColor(this.textColor);
            this.textShape = this.lg.drawText(x, y, this.caption);
            y += this.textShape.getStringHeight();
            this.textShape.setToBaseLine();
        }
    }

Label.prototype.onResize = function() {
        this.onResizeLabel();
    }

Label.prototype.onResizeLabel = function() {
        this.onResizeCanvas();
        this.positionText();
    }

Label.prototype.onMove = function() {
        this.onMoveLabel();
    }

Label.prototype.onMoveLabel = function() {
        this.onMoveCanvas();
    }

Label.prototype.recalc = function() {
        this.recalcLabel();
    }

Label.prototype.recalcLabel = function() {
        this.recalcCanvas();

        var w = this.w;
        var h = this.h;

        this.textShapeWidth = w - this.left - this.right;
        this.textShapeHeight = h - this.top - this.bottom;

        // Resize the Label to the size of the text
        if (this.resizeToText) {
            if (this.textShape != null) {
                this.textShape.setFont(this.font);
                this.textShapeWidth = this.textShape.getStringWidth();
                this.textShapeHeight = this.textShape.getStringHeight();
                w = this.textShapeWidth + this.left + this.right;
                h = this.textShapeHeight + this.top + this.bottom;
                if (this.icon != null) {
                    w += this.icon.getWidth();
                    h = Math.max(this.icon.getHeight() + this.top + this.bottom, h);
                }
            } else
            if (this.icon != null) {
                w = this.icon.getWidth() + this.left + this.right;
                h = this.icon.getHeight() + this.top + this.bottom;
            }
            this.setSize(w, h);
        } else this.onResizeLabel();

    }

Label.prototype.setTextAlign = function( /* int */ align, /* int */ valign) {
        if (align != undefined) this.align = align;
        if (valign != undefined) this.valign = valign;
        // Apply the effect;
        this.positionText();
    }

Label.prototype.positionText = function() {

        if (this.textShape == null && this.icon == null) return;

        var tw = 0; // Text Width
        var th = 0; // Text Height
        var iw = 0; // Icon Width
        var ih = 0; // Icon Height

        if (this.textShape != null) {
            tw = this.textShapeWidth;
            th = this.textShapeHeight;
        }

        if (this.icon != null) {
            iw = this.icon.getWidth();
            ih = this.icon.getHeight();
        }

        var x = 0; // for both, icon and text
        var y = 0; // for text only
        var iy = 0; // for icon only

        switch (this.align) {
            case LEFT:
                x = this.left + iw;
                break;
            case RIGHT:
                x = this.w - tw - this.right;
                break;
            case CENTER:
                x = (this.w - (tw + iw)) / 2 + iw;
                break;
        }

        switch (this.valign) {
            case TOP:
                y = this.top;
                iy = this.top;
                break;
            case BOTTOM:
                y = this.h - th - this.bottom;
                iy = this.h - ih - this.bottom;
                break;
            case CENTER:
                y = (this.h - th) / 2;
                iy = (this.h - ih) / 2;
                break;
        }

        if (this.textShape != null)
            this.textShape.translate(x, y);


        if (this.icon != null)
            this.icon.translate(x - iw, iy);

    }

Label.prototype.setText = function(txt) {
        if (this.textShape == null) return;
        this.textShape.setText(txt);
        this.recalc();
    }

Label.prototype.getText = function() {
        return this.textShape.getText();
    }

Label.prototype.setTextColor = function(color) {
        if (this.textShape != null)
            this.textShape.setTextColor(color)
        else
            this.textColor = color;
    }

Label.prototype.highlightOn = function() {
        if (this.textShape != null)
            this.textShape.getNode().setAttribute("font-weight", "bold");
        if (this.icon != null)
            this.icon.iconShape.scale(1.1);
    }

Label.prototype.highlightOff = function() {
        if (this.textShape != null)
            this.textShape.getNode().setAttribute("font-weight", "normal");
        if (this.icon != null)
            this.icon.iconShape.scale(1);
    }

Label.prototype.setResizeToText = function( /* Boolean */ flag) {
        this.resizeToText = flag;
    }

Label.prototype.toString = function() {
    return this.getComponentId() + " [ caption: " + this.caption + ", name: " + this.name + "]";
}
/**
 * Swing.svg : Button
 *
 * SUPPORTS LOOK AND FEEL
 *
 * @author    Adnan Sagar, PhD <adnan@websemantics.ca>
 * @copyright 2004-2015 Web Semantics, Inc. (http://websemantics.ca)
 * @license   http://www.opensource.org/licenses/mit-license.php MIT
 * @since     11th Feb 2005
 * @package   websemantics/oea/swing.svg
 */

Button.prototype = new Label();

function Button( /* int */ x, y, w, h, /* String */ name, caption, /* Icon */ icon) {
        var argv = Button.arguments;
        var argc = Button.length;
        /* String */
        this.name = "Button";
        /* String */
        this.className = "Button";
        /* Graphics */
        this.sking = null; // Used by the ButtonSkin
        /* Graphics */
        this.contentg = null; // Used to draw the content
        /* ButtonSkin */
        this.buttonSkin = null;

        if (argv.length > 0) 
        	this.initButton(x, y, w, h, name, caption, icon);
    }

Button.prototype.initButton = function( /* int */ x, y, w, h, /* String */ name, caption, /* Icon */ icon) {
    // Summary: 
    //
    // Forms:
    // (1) initButton(caption)
    // (2) initButton(caption,icon)
    // (3) initButton(name,caption,icon)
    // (4) initButton(x,y,w,h,name,caption,icon)
    //
    // Note: if the orther of args is different than above, no error message is given

        if (x.length != undefined) {
            if (y != undefined) {
                if (y instanceof Icon) {
                    // initButton(caption,icon)
                    caption = x;
                    icon = y;
                    x = 0;
                    y = 0;
                    w = 0;
                    h = 0;
                    name = caption;
                } else {
                    // initButton(name,caption,icon),... I expect that, since x is String and y is not,...then y should be a String!!! (not the best logic ;-)
                    name = x;
                    caption = y;
                    icon = w;
                    x = 0;
                    y = 0;
                    w = 0;
                    h = 0;
                }
            } else {
                // initButton(caption)
                caption = x;
                name = caption;
                x = 0;
                y = 0;
                w = 0;
                h = 0;
            }
        }
        this.initLabel(x, y, w, h, name, caption, icon);
        this.buttonSkin = new SimpleButtonSkin();
        this.addMouseListener(this);
        this.addMouseMotionListener(this);
    }

Button.prototype.changeSkin = function( /* ButtonSkin */ skin) {
        if (!this.created)
            this.buttonSkin = skin;
        else {
            this.sking.oldClear();
            this.contentg.oldClear();
            this.buttonSkin = skin;
            this.createSVGContentButton(this);
        }
    }

Button.prototype.createSVGContent = function() {
        this.createSVGContentButton();
    }

Button.prototype.createSVGContentButton = function() {

        this.createSVGContentCanvas();

        this.sking = this.getGraphics();
        this.contentg = this.getGraphics();

        this.buttonSkin.createSVGContent(this);

        this.contentg.setFont(this.font);
        this.contentg.setColor(this.foreground);

        var x = this.left;
        var y = this.top;

        if (this.icon != null) {
            this.icon.createSVGContent(this.contentg);
            x += this.icon.w;
        }

        if (this.caption != null) {
            this.textShape = this.contentg.drawText(x, y, this.caption);
            this.textShape.setToBaseLine();
        }
    }

Button.prototype.setBackground = function( /* Color */ background) {
        if (background != undefined)
            this.background = background;
        if (this.sking)
            this.sking.setBackground(background);
    }

Button.prototype.onResize = function() {
        this.onResizeButton();
    }

Button.prototype.onResizeButton = function() {
        this.onResizeLabel();
        if (this.buttonSkin != null)
            this.buttonSkin.setSize(this.w, this.h);
    }

Button.prototype.onMove = function() {
        this.onMoveButton();
    }

Button.prototype.onMoveButton = function() {
        this.onMoveLabel();
    }

Button.prototype.recalc = function() {
        this.recalcButton();
    }

Button.prototype.recalcButton = function() {
        this.recalcLabel();
    }

Button.prototype.mousePressed = function( /* MouseEvent */ e) {
        if (e.getButton() == BUTTON2) return;
        this.buttonSkin.mousePressed();
    }

Button.prototype.mouseReleased = function( /* MouseEvent */ e) {
        this.buttonSkin.mouseReleased();
    }

Button.prototype.mouseEntered = function( /* MouseEvent */ e) {
        this.buttonSkin.mouseIn();
    }

Button.prototype.mouseExited = function( /* MouseEvent */ e) {
        this.buttonSkin.mouseOut();
    }

Button.prototype.mouseClicked = function( /* MouseEvent */ e) {
        /* ActionEvent */
        var aevt = new ActionEvent(this, "buttonClicked", e);
        // Action Listeners 
        if (this.actionListeners != null) {
            var k = new Enumerator(this.actionListeners);
            while (k.hasMoreElements())
            /* ActionListener */
                k.nextElement().actionPerformed(aevt);
        }
    }

Button.prototype.mouseDragged = function( /* MouseEvent */ e) {
        if (!(e.x >= 0 && e.x <= this.w && e.y >= 0 && e.y <= this.h))
            this.mouseExited(e);
    }

Button.prototype.mouseEndDragged = function( /* MouseEvent */ e) {
        if (e.x >= 0 && e.x <= this.w && e.y >= 0 && e.y <= this.h)
            this.mouseReleased(e);
    }

Button.prototype.reset = function() {
        this.mouseReleased();
    }

Button.prototype.toString = function() {
    return this.getComponentId() + " [ caption: " + this.caption + ", name: " + this.name + "]";
}
/**
 * Swing.svg : CheckBox
 *
 * SUPPORTS LOOK AND FEEL
 * 
 * @author    Adnan Sagar, PhD <adnan@websemantics.ca>
 * @copyright 2004-2015 Web Semantics, Inc. (http://websemantics.ca)
 * @license   http://www.opensource.org/licenses/mit-license.php MIT
 * @since     25 Augus 2005
 * @package   websemantics/oea/swing.svg
 */

CheckBox.prototype = new Label();

function CheckBox( /* String */ caption) {
        var argv = CheckBox.arguments;
        var argc = CheckBox.length;
        /* String */
        this.name = "CheckBox";
        /* String */
        this.className = "CheckBox";
        /* Graphics */
        this.contentg = null; // Used to draw the content
        /* Shape */
        this.bgRect = null; // White background
        /* Shape */
        this.boxBorder = null; // Checkbox border
        /* Shape */
        this.crossLine1 = null; // Firsrt line of the cross
        /* Shape */
        this.crossLine2 = null; // Firsrt line of the cross
        /* boolean */
        this.selected = false;

        if (argv.length > 0) 
          this.initCheckBox( /* String */ caption);
    }

CheckBox.prototype.initCheckBox = function( /* String */ caption) {
        this.initLabel(0, 0, 0, 0, caption, caption);
        this.addMouseListener(this);
        this.addMouseMotionListener(this);
    }

CheckBox.prototype.createSVGContent = function() {
        this.createSVGContentCheckBox();
    }

CheckBox.prototype.createSVGContentCheckBox = function() {

        var x = this.left;
        var y = this.top;
        this.createSVGContentLabel();
        this.contentg = this.getGraphics();
        this.contentg.setColor("white");
        this.bgRect = this.contentg.drawRect(x, y, 0, 0);
        this.boxBorder = this.contentg.drawWinBorder(x, y, 0, 0);
        this.boxBorder.setFaceDown();
        this.contentg.setStrokeColor("black");
        this.contentg.setStrokeWidth(1);
        this.crossLine1 = this.contentg.drawLine(0, 0, 0, 0);
        this.crossLine2 = this.contentg.drawLine(0, 0, 0, 0);
        this.setSelected(this.selected);
    }

CheckBox.prototype.onResize = function() {
        this.onResizeCheckBox();
    }

CheckBox.prototype.onResizeCheckBox = function() {
        this.onResizeLabel();
    }

CheckBox.prototype.onMove = function() {
        this.onMoveCheckBox();
    }

CheckBox.prototype.onMoveCheckBox = function() {
        this.onMoveLabel();
    }

CheckBox.prototype.recalc = function() {
        this.recalcCheckBox();
    }

CheckBox.prototype.recalcCheckBox = function() {
        this.recalcLabel();
        this.setTextAlign(RIGHT, CENTER);
        // Calculate the dimension of the CheckBox,...
        var h = (this.h - this.top - this.bottom) * 0.7;
        var w = h;
        // Expand the size of the Check Box to fit the new drawings,..
        this.setSize(this.w + h + this.left, this.h);
        // Update the drawings
        var x = this.left;
        var y = (this.getHeight() - h) / 2;
        this.bgRect.translate(x, y);
        this.bgRect.setSize(h, h);
        this.boxBorder.translate(x, y);
        this.boxBorder.setSize(h, h);
        
        // Update the cross,..
        var strokeWidth = w * 0.1
        var m = 0.8 * w;
        this.crossLine1.setAttribute('stroke-width', strokeWidth);
        this.crossLine2.setAttribute('stroke-width', strokeWidth);
        this.crossLine1.setPoint1(x + m, y + m);
        this.crossLine1.setPoint2(x + w - m, y + h - m);
        this.crossLine2.setPoint1(x + w - m, y + m);
        this.crossLine2.setPoint2(x + m, y + h - m);
    }

CheckBox.prototype.setSelected = function( /* boolean */ selected) {
        this.selected = selected;
        if (this.crossLine1 != null) this.crossLine1.setVisibility(this.selected);
        if (this.crossLine2 != null) this.crossLine2.setVisibility(this.selected);
    }

CheckBox.prototype.getSelected = function() {
        return this.selected;
    }

CheckBox.prototype.mouseClicked = function( /* MouseEvent */ e) {
        /* ActionEvent */
        var aevt = new ActionEvent(this, "checkBoxChanged", e);
        // Action Listeners 
        this.setSelected(!this.selected);
        if (this.actionListeners != null) {
            var k = new Enumerator(this.actionListeners);
            while (k.hasMoreElements())
            /* ActionListener */
                k.nextElement().actionPerformed(aevt);
        }
    }

CheckBox.prototype.toString = function() {
    return this.getComponentId() + " [ caption: " + this.caption + ", name: " + this.name + "]";
}
/**
 * Swing.svg : RadioButton
 *
 * SUPPORTS LOOK AND FEEL
 *
 * @author    Adnan Sagar, PhD <adnan@websemantics.ca>
 * @copyright 2004-2015 Web Semantics, Inc. (http://websemantics.ca)
 * @license   http://www.opensource.org/licenses/mit-license.php MIT
 * @since     25 Augus 2005
 * @package   websemantics/oea/swing.svg
 */

RadioButton.prototype= new CheckBox(); 

function RadioButton( /* String */ caption) {
        var argv = RadioButton.arguments;
        var argc = RadioButton.length;
        /* String */
        this.name = "RadioButton";
        /* String */
        this.className = "RadioButton";
        /* Shape */
        this.bgCircle = null;
        /* Shape */
        this.innerCircle = null;

        if (argv.length > 0) 
        	this.initRadioButton( /* String */ caption);
    }

RadioButton.prototype.initRadioButton = function( /* String */ caption) {
        this.initCheckBox(caption);
    }

RadioButton.prototype.createSVGContent = function() {
        this.createSVGContentRadioButton();
    }

RadioButton.prototype.createSVGContentRadioButton = function() {
        var x = this.left;
        var y = this.top;
        this.createSVGContentLabel();
        this.contentg = this.getGraphics();
        this.contentg.setColor("white");
        this.contentg.setStrokeColor("Gray");
        this.contentg.setStrokeWidth(3);
        this.bgCircle = this.contentg.drawCircle(x, y, 0);
        this.contentg.setStrokeColor("none");
        this.contentg.setColor("black");
        this.innerCircle = this.contentg.drawCircle(x, y, 0);
        this.setSelected(this.selected);
    }

RadioButton.prototype.recalc = function() {
        this.recalcRadioButton();
    }

RadioButton.prototype.recalcRadioButton = function() {
        this.recalcLabel();
        this.setTextAlign(RIGHT, CENTER);
        var h = (this.h - this.top - this.bottom) * 0.7;
        // Expand the size of the Radoi Button to fit the new drawings,..
        this.setSize(this.w + h + this.left, this.h);
        // Update the drawings
        var x = this.left;
        var y = (this.getHeight() - h) / 2;
        this.bgCircle.translate(x, y);
        this.bgCircle.setRadius(h / 2);
        this.innerCircle.translate(x + h / 4, y + h / 4);
        this.innerCircle.setRadius(h / 4);
    }

RadioButton.prototype.setSelected = function( /* boolean */ selected) {
    this.selected = selected;
    if (this.innerCircle != null) this.innerCircle.setVisibility(this.selected);
}
/**
 * Swing.svg : ButtonGroup
 *
 * @author    Adnan Sagar, PhD <adnan@websemantics.ca>
 * @copyright 2004-2015 Web Semantics, Inc. (http://websemantics.ca)
 * @license   http://www.opensource.org/licenses/mit-license.php MIT
 * @since     25th July 2005
 * @package   websemantics/oea/swing.svg
 */

ButtonGroup.prototype = new Container();

function ButtonGroup( /* int */ x, /* int */ y) {
        var argv = ButtonGroup.arguments;
        var argc = ButtonGroup.length;
        /* String */
        this.className = "ButtonGroup";
        /* String */
        this.name = "ButtonGroup";
        /* Graphics  */
        this.lg = null;
        /* Graphics  */
        this.contentg = null;

        if(argv.length > 0)
          this.initButtonGroup(x, y);
    }

ButtonGroup.prototype.initButtonGroup = function(x, y) {
        
        if (x == undefined && y == undefined) {
            x = 0;
            y = 0;
        }

        // The ButtonGroup listens to mouseClick event so it could capture the clicked radio button and update other buttons accordingly,..
        this.addInternalMouseMotionListener(mouseClicked, "buttonGroupMouseClicked");
        this.initContainer(x, y, 0, 0);
        this.setInsets(0, 0, 0, 0); // left,right,top,bottom 
        
        // set the default layout manager,...
        this.setLayout(new BoxLayout(Y_AXIS, LEFT, TOP, 0));
    }

ButtonGroup.prototype.createSVGContent = function() {
        this.createSVGContentButtonGroup();
    }

ButtonGroup.prototype.createSVGContentButtonGroup = function() {
        this.createSVGContentContainer();
        this.contentg = this.getGraphics();
        this.paintChildren(this.contentg);
    }

ButtonGroup.prototype.recalc = function() {
        this.recalcButtonGroup();
    }

ButtonGroup.prototype.recalcButtonGroup = function() {
        this.recalcContainer();

        if (this.getLayout() != null) {
            /* Dimension */
            var d = this.getLayout().preferredLayoutSize(this);
            this.setSize(d.getWidth(), d.getHeight());
        }

        this.layoutChildren();
    }

ButtonGroup.prototype.add = function( /* Component */ radioButton) {

        if (radioButton.getSelected()) this.unSelectAll();

        return this.addContainer(radioButton);
    }

ButtonGroup.prototype.unSelectAll = function() {
        if (this.children != null) {
            /* Enumeration */
            var k = this.components();
            while (k.hasMoreElements()) k.nextElement().setSelected(false);
        }
    }

ButtonGroup.prototype.buttonGroupMouseClicked = function( /* MouseEvent */ e) {

    var d = this.getComponentAt(e.getX(), e.getY());

    if (d == null || d.className != "RadioButton") return;

    this.unSelectAll();

    /* ActionEvent */
    var aevt = new ActionEvent(d, "radioButtonClicked", e);
    // Action Listeners 
    if (this.actionListeners != null) {
        var k = new Enumerator(this.actionListeners);
        while (k.hasMoreElements())
        /* ActionListener */
            k.nextElement().actionPerformed(aevt);
    }
}
/**
 * Swing.svg : Toolbar
 *
 * @author    Adnan Sagar, PhD <adnan@websemantics.ca>
 * @copyright 2004-2015 Web Semantics, Inc. (http://websemantics.ca)
 * @license   http://www.opensource.org/licenses/mit-license.php MIT
 * @since     20th July 2005
 * @package   websemantics/oea/swing.svg
 */

Toolbar.prototype= new Panel();

function Toolbar(x, y, w, h) {
        var argv = Toolbar.arguments;
        var argc = Toolbar.length;

        /* String */
        this.name = "Toolbar";
        /* String */
        this.className = "Toolbar";
        /* Shape */
        this.border = null;
        /* Graphics */
        this.contentg = null;
        /* Boolean */
        this.autoResize = true; // if true the Toolbar resizes to fit its components
        
        if (argv.length > 0) 
          this.initToolbar(x, y, w, h);
    }

Toolbar.prototype.initToolbar = function(x, y, w, h) {
        this.initPanel(x, y, w, h);
        this.setLayout(new FlowLayout(LEFT));
        this.setBackground("#d4d0c8");
    }

Toolbar.prototype.createSVGContent = function() {
        this.createSVGContentToolbar();
    }

Toolbar.prototype.createSVGContentToolbar = function() {
        this.createSVGContentPanel();
        this.contentg = this.getGraphics();
        this.paintChildren(this.contentg);
        this.border = this.contentg.drawStepBorder(0, 0, this.w, this.h);
        this.glassPaneOn();
        this.enableMouseListener();
        this.enableMouseMotionListener();
    }

Toolbar.prototype.onResize = function() {
        this.onResizeToolbar();
    }

Toolbar.prototype.onResizeToolbar = function() {
        this.onResizePanel();
        if (this.border != null) this.border.setSize(this.w, this.h);
    }

Toolbar.prototype.onMove = function() {
        this.onMoveToolbar();
    }

Toolbar.prototype.onMoveToolbar = function() {
        this.onMovePanel();
    }

Toolbar.prototype.recalc = function() {
        this.recalcToolbar();
    }

Toolbar.prototype.recalcToolbar = function() {
        this.recalcPanel();
        if (this.getLayout() != null && this.autoResize) {
            /* Dimension */
            var d = this.getLayout().minimumLayoutSize(this);
            this.setSize(d.getWidth(), d.getHeight());
        }
    }

Toolbar.prototype.changeSkin = function( /* ButtonSkin */ buttonSkin) {
        if (this.children != null) {
            /* Enumeration */
            var k = this.components();
            while (k.hasMoreElements()) k.nextElement().changeSkin(buttonSkin.clone());
        }
    }

Toolbar.prototype.addItem = function( /* String */ name, /* String or Icon */ is1, /* String */ is2) {
      // Ex: this.addItem("button_1",icon1,"hello");
        var button = null;

        if (is1 != undefined && is1 instanceof Icon) {
            if (is2 != undefined)
                button = new Button(0, 0, 0, 0, name, is2, is1);
            else
                button = new Button(0, 0, 0, 0, name, null, is1);

        } else {
            button = new Button(0, 0, 0, 0, name, is1);
        }

        if (button != null) {
            button.setInsets(3, 3, 3, 3);
            button.changeSkin(new ToolButtonSkin());
            this.add(button);
            button.addActionListener(this);
        }
    }

Toolbar.prototype.actionPerformed = function( /* ActionEvent */ e) {
    // Action Listeners 
    if (this.actionListeners != null) {
        var k = new Enumerator(this.actionListeners);
        while (k.hasMoreElements())
        /* ActionListener */
            k.nextElement().actionPerformed(e);
    }
}
/**
 * Swing.svg : TabbedPane
 *
 * @author    Adnan Sagar, PhD <adnan@websemantics.ca>
 * @copyright 2004-2015 Web Semantics, Inc. (http://websemantics.ca)
 * @license   http://www.opensource.org/licenses/mit-license.php MIT
 * @since     21th July 2005
 * @package   websemantics/oea/swing.svg
 */

TabbedPane.prototype= new Panel(); 

function TabbedPane(x, y, w, h) {
        var argv = TabbedPane.arguments;
        var argc = TabbedPane.length;

        /* Pane */
        this.panes = null;
        /* Pane */
        this.currentPane = null;
        /* String */
        this.name = "TabbedPane";
        /* String */
        this.className = "TabbedPane";

				// When the button are layied out X axis then the pane needs to know the max height
        /* int */
        this.tabsEffectiveWidth = 0; 

        // When the button are layied out Y axis then the pane needs to know the max width
        /* int */
        this.tabsEffectiveHeight = 0; 
        /* int */
        this.tabsLocation = LEFT; // (LEFT,RIGHT,TOP,BOTTOM)
        /* Graphics */
        this.paneg = null;
        /* Graphics */
        this.buttonsg = null;

        if (argv.length > 0) 
        	this.initTabbedPane(x, y, w, h);
    }

TabbedPane.prototype.initTabbedPane = function(x, y, w, h) {
        this.initPanel(x, y, w, h);
        this.setAlign(Y_AXIS, LEFT, TOP, 2);
    }

TabbedPane.prototype.createSVGContent = function() {
        this.createSVGContentTabbedPane();
    }

TabbedPane.prototype.createSVGContentTabbedPane = function() {
        this.createSVGContentPanel();

        this.paneg = this.getGraphics();
        this.buttonsg = this.getGraphics();

        this.paintPanes(this.paneg);
        this.paintButtons(this.buttonsg);

        this.glassPaneOn();
        this.enableMouseListener();
        this.enableMouseMotionListener();
    }

TabbedPane.prototype.paintButtons = function( /* Graphics */ g) {
        if (this.children != null) {
            /* Enumeration */
            var k = this.components();
            while (k.hasMoreElements()) {
                var child = k.nextElement();
                if (child.className == "Button") child.paint(g);
            }
            if (this.getLayout() != null) this.getLayout().layoutContainer(this);
        }
    }

TabbedPane.prototype.paintPanes = function( /* Graphics */ g) {
        if (this.children != null) {
            /* Enumeration */
            var k = this.components();
            while (k.hasMoreElements()) {
                var child = k.nextElement();
                if (child.className == "Pane") child.paint(g);
            }
        }
    }

TabbedPane.prototype.onResize = function() {
        this.onResizeTabbedPane();
    }

TabbedPane.prototype.onResizeTabbedPane = function() {
        this.onResizePanel();
    }

TabbedPane.prototype.recalc = function() {
        this.recalcTabbedPane();
    }

TabbedPane.prototype.recalcTabbedPane = function() {

        this.recalcPanel();

        // First, Calculate the effective width and height of the set of button to be used to draw panes
        var dim = this.getLayout().preferredLayoutSize(this);
        this.tabsEffectiveWidth = dim.width;
        this.tabsEffectiveHeight = dim.height;

        if (this.children != null) {
            /* Enumeration */
            var k = this.components();
            while (k.hasMoreElements()) {
                var child = k.nextElement();
                if (child.className == "Button")
                    switch (this.tabsLocation) {
                        case LEFT:
                            child.setSize(this.tabsEffectiveWidth, child.h);
                            break;
                        case RIGHT:
                            child.setSize(this.tabsEffectiveWidth, child.h);
                            break;
                        case TOP:
                            child.setSize(child.w, this.tabsEffectiveHeight);
                            break;
                        case BOTTOM:
                            child.setSize(child.w, this.tabsEffectiveHeight);
                            break;
                    }
            }
            /* Enumeration */
            var k = this.components();
            while (k.hasMoreElements()) {
                var child = k.nextElement();
                if (child.className == "Pane") child.recalcPaneOnly();
            }


            if (this.getLayout() != null) this.getLayout().layoutContainer(this);
        }

        if (this.currentPane != null)
            this.currentPane.button.highlightOn();
    }

TabbedPane.prototype.addPane = function(name, caption, icon) {
        var b = new Button(0, 0, 0, 0, name, caption, icon);
        b.setFont(this.getFont());
        b.setTextAlign(LEFT, CENTER);
        b.changeSkin(new FlatButtonSkin());
        b.setInsets(8, 8, 3, 3);
        b.setBackground("none");
        b.addActionListener(this);
        var p = new Pane(0, 0, this.w, this.h, b);
        p.setFont(this.getFont());
        p.setAbsolutePosition(true);
        b.pane = p;
        this.add(p);
        this.add(b);
        this.currentPane = p;
        return p;
    }

TabbedPane.prototype.setAlign = function( /* int */ axis, /* int */ align, /* int */ valign, /* int */ gap) {

        if (gap == undefined) gap = 2;

        if (axis == X_AXIS) {
            this.tabsLocation = valign;
            if (valign == CENTER) {
                alert("Warning: Vertical alignment must not be set to CENTER when layout on X axis");
                return;
            }
        }

        if (axis == Y_AXIS) {
            this.tabsLocation = align;
            if (align == CENTER) {
                alert("Warning: Horizontal alignment must not be set to CENTER when layout on Y axis");
                return;
            }
        }

        var layout = this.getLayout();
        if (layout != null) delete layout;

        this.setLayout(new BoxLayout(axis, align, valign, gap));

        //this.recalc();
    }

TabbedPane.prototype.actionPerformed = function( /* ActionEvent */ e) {
    var src = e.source;
    var comm = e.getActionCommand();

    // Action Listeners 
    if (this.actionListeners != null) {
        var k = new Enumerator(this.actionListeners);
        while (k.hasMoreElements())
        /* ActionListener */
            k.nextElement().actionPerformed(e);
    }

    if (src.className == "Button" && src.pane != undefined) {
        this.currentPane.button.highlightOff();
        this.currentPane = src.pane
        this.currentPane.button.highlightOn();
        this.bringToFront(src.pane);
        this.paneg.addGraphics(src.pane); // Move window to the top
    }

}

/**
 * Swing.svg : Pane
 *
 * @author    Adnan Sagar, PhD <adnan@websemantics.ca>
 * @copyright 2004-2015 Web Semantics, Inc. (http://websemantics.ca)
 * @license   http://www.opensource.org/licenses/mit-license.php MIT
 * @since     21th July 2005
 * @package   websemantics/oea/swing.svg
 */

Pane.prototype= new Panel(); 

function Pane(x, y, w, h, button) {
        var argv = Pane.arguments;
        var argc = Pane.length;

        /* String */
        this.name = "Pane";
        /* String */
        this.className = "Pane";
        /* Label */
        this.button = null;
        /* Shape */
        this.border = null;

        if (argv.length > 0) 
        	this.initPane(x, y, w, h, button);
    }

Pane.prototype.initPane = function(x, y, w, h, button) {
        this.initPanel(x, y, w, h);
        this.button = button;
    }

Pane.prototype.createSVGContent = function() {
        this.createSVGContentPane();
    }

Pane.prototype.createSVGContentPane = function() {

        this.createSVGContentPanel();

        this.drawing = this.getGraphics();
        this.contentg = this.getGraphics();

        this.paintChildren(this.contentg);

        this.drawing.setStrokeWidth(1);
        this.drawing.setStrokeColor("white");
        this.drawing.setColor("#d4d0c8");
        this.backgroundPolygon = this.drawing.drawPolygon(0, 0);
        this.backgroundPolygon.setAttribute('shape-rendering', 'optimizeSpeed');
        this.drawing.setColor("none");
        this.drawing.setStrokeColor("black");
        this.path1 = this.drawing.drawPath(0, 0, "");
        this.path2 = this.drawing.drawPath(0, 0, "");
        this.path1.setAttribute('shape-rendering', 'optimizeSpeed');
        this.path2.setAttribute('shape-rendering', 'optimizeSpeed');
        
        //this.glassPaneOn();
        //this.enableMouseListener();
        //this.enableMouseMotionListener();
    }

Pane.prototype.onResize = function() {
        this.onResizePane();
    }

Pane.prototype.onResizePane = function() {
        this.onResizePanel();
        if (this.border != null)
            this.border.setSize(this.w, this.h);
    }

Pane.prototype.recalc = function() {
        this.recalcPane();
    }

Pane.prototype.recalcPane = function() {
        this.recalcPanel();
        this.recalcPaneOnly();
    }

Pane.prototype.recalcPaneOnly = function() {
    var xx = new Array();
    var yy = new Array();
    var mode = this.cParent.tabsLocation; // TOP, BOTTOM, LEFT or RIGHT
    var bx = this.button.x;
    var by = this.button.y;
    var bw = this.button.w;
    var bh = this.button.h;
    var px = 0;
    var py = 0;
    var pw = this.w;
    var ph = this.h;
    var ew = this.cParent.tabsEffectiveWidth;
    var eh = this.cParent.tabsEffectiveHeight;

    if (mode == LEFT) {
        this.setLocation(ew, 0);
        //this.setSize(this.w-ew,this.h);
        this.button.setSize(ew, this.button.h);
        var p1 = new Point(0, 0);
        var p2 = new Point(pw - ew, 0);
        var p3 = new Point(pw - ew, ph);
        var p4 = new Point(0, ph);
        var p5 = new Point(0, by + bh);
        var p6 = new Point(-ew, by + bh);
        var p7 = new Point(-ew, by);
        var p8 = new Point(0, by);

        xx[0] = p1.x;
        xx[1] = p2.x;
        xx[2] = p3.x;
        xx[3] = p4.x;
        xx[4] = p5.x;
        xx[5] = p6.x;
        xx[6] = p7.x;
        xx[7] = p8.x;
        yy[0] = p1.y;
        yy[1] = p2.y;
        yy[2] = p3.y;
        yy[3] = p4.y;
        yy[4] = p5.y;
        yy[5] = p6.y;
        yy[6] = p7.y;
        yy[7] = p8.y;
        this.backgroundPolygon.setXYPoints(xx, yy);

        delete xx;
        xx = new Array();
        delete yy;
        yy = new Array();

        xx[0] = p5.x;
        xx[1] = p6.x;
        yy[0] = p5.y;
        yy[1] = p6.y;
        this.path1.setXYPoints(xx, yy);

        xx[0] = p2.x;
        xx[1] = p3.x;
        xx[2] = p4.x;
        yy[0] = p2.y;
        yy[1] = p3.y;
        yy[2] = p4.y;
        this.path2.setXYPoints(xx, yy);

    }
    if (mode == RIGHT) {
        this.setLocation(0, 0);
        //this.setSize(this.w-ew,this.h);
        var p1 = new Point(0, 0);
        var p2 = new Point(pw - ew, 0);
        var p3 = new Point(pw - ew, by);
        var p4 = new Point(pw, by);
        var p5 = new Point(pw, by + bh);
        var p6 = new Point(pw - ew, by + bh);
        var p7 = new Point(pw - ew, ph);
        var p8 = new Point(0, ph);

        xx[0] = p1.x;
        xx[1] = p2.x;
        xx[2] = p3.x;
        xx[3] = p4.x;
        xx[4] = p5.x;
        xx[5] = p6.x;
        xx[6] = p7.x;
        xx[7] = p8.x;
        yy[0] = p1.y;
        yy[1] = p2.y;
        yy[2] = p3.y;
        yy[3] = p4.y;
        yy[4] = p5.y;
        yy[5] = p6.y;
        yy[6] = p7.y;
        yy[7] = p8.y;
        this.backgroundPolygon.setXYPoints(xx, yy);


        delete xx;
        xx = new Array();
        delete yy;
        yy = new Array();

        xx[0] = p2.x;
        xx[1] = p3.x;
        yy[0] = p2.y;
        yy[1] = p3.y;
        this.path1.setXYPoints(xx, yy);

        xx[0] = p4.x;
        xx[1] = p5.x;
        xx[2] = p6.x;
        xx[3] = p7.x;
        xx[4] = p8.x;
        yy[0] = p4.y;
        yy[1] = p5.y;
        yy[2] = p6.y;
        yy[3] = p7.y;
        yy[4] = p8.y;
        this.path2.setXYPoints(xx, yy);
    }

    if (mode == TOP) {
        this.setLocation(0, eh);
        //this.setSize(this.w,this.h-eh);
        this.button.setSize(this.button.w, eh);
        var p1 = new Point(0, 0);
        var p2 = new Point(bx, 0);
        var p3 = new Point(bx, -eh);
        var p4 = new Point(bx + bw, -eh);
        var p5 = new Point(bx + bw, 0);
        var p6 = new Point(pw, 0);
        var p7 = new Point(pw, ph - eh);
        var p8 = new Point(0, ph - eh);

        xx[0] = p1.x;
        xx[1] = p2.x;
        xx[2] = p3.x;
        xx[3] = p4.x;
        xx[4] = p5.x;
        xx[5] = p6.x;
        xx[6] = p7.x;
        xx[7] = p8.x;
        yy[0] = p1.y;
        yy[1] = p2.y;
        yy[2] = p3.y;
        yy[3] = p4.y;
        yy[4] = p5.y;
        yy[5] = p6.y;
        yy[6] = p7.y;
        yy[7] = p8.y;
        this.backgroundPolygon.setXYPoints(xx, yy);

        delete xx;
        xx = new Array();
        delete yy;
        yy = new Array();

        xx[0] = p4.x;
        xx[1] = p5.x;
        yy[0] = p4.y;
        yy[1] = p5.y;
        this.path1.setXYPoints(xx, yy);

        xx[0] = p6.x;
        xx[1] = p7.x;
        xx[2] = p8.x;
        yy[0] = p6.y;
        yy[1] = p7.y;
        yy[2] = p8.y;
        this.path2.setXYPoints(xx, yy);

    }
    if (mode == BOTTOM) {
        this.setLocation(0, 0);
        //this.setSize(this.w,this.h-eh);
        this.button.setSize(this.button.w, eh);
        var p1 = new Point(0, 0);
        var p2 = new Point(pw, 0);
        var p3 = new Point(pw, ph - eh);
        var p4 = new Point(bx + bw, ph - eh);
        var p5 = new Point(bx + bw, ph);
        var p6 = new Point(bx, ph);
        var p7 = new Point(bx, ph - eh);
        var p8 = new Point(0, ph - eh);

        xx[0] = p1.x;
        xx[1] = p2.x;
        xx[2] = p3.x;
        xx[3] = p4.x;
        xx[4] = p5.x;
        xx[5] = p6.x;
        xx[6] = p7.x;
        xx[7] = p8.x;
        yy[0] = p1.y;
        yy[1] = p2.y;
        yy[2] = p3.y;
        yy[3] = p4.y;
        yy[4] = p5.y;
        yy[5] = p6.y;
        yy[6] = p7.y;
        yy[7] = p8.y;
        this.backgroundPolygon.setXYPoints(xx, yy);

        delete xx;
        xx = new Array();
        delete yy;
        yy = new Array();

        xx[0] = p7.x;
        xx[1] = p8.x;
        yy[0] = p7.y;
        yy[1] = p8.y;
        this.path1.setXYPoints(xx, yy);

        xx[0] = p2.x;
        xx[1] = p3.x;
        xx[2] = p4.x;
        xx[3] = p5.x;
        xx[4] = p6.x;
        yy[0] = p2.y;
        yy[1] = p3.y;
        yy[2] = p4.y;
        yy[3] = p5.y;
        yy[4] = p6.y;
        this.path2.setXYPoints(xx, yy);
    }
}
/**
 * Swing.svg : TitledBorder
 *
 * @author    Adnan Sagar, PhD <adnan@websemantics.ca>
 * @copyright 2004-2015 Web Semantics, Inc. (http://websemantics.ca)
 * @license   http://www.opensource.org/licenses/mit-license.php MIT
 * @since     15th July 2005
 * @package   websemantics/oea/swing.svg
 */

TitledBorder.prototype= new Container(); 

function TitledBorder( /* int */ x, /* int */ y, /* int */ w, /* int */ h, /* Component */ comp) {
        var argv = TitledBorder.arguments;
        var argc = TitledBorder.length;

        /* String */
        this.className = "TitledBorder";
        /* String */
        this.name = "TitledBorder";
        /* int */
        this.align = LEFT;
        /* int */
        this.valign = BOTTOM;
        /* Graphics  */
        this.contentg = null;
        /* Graphics  */
        this.tg = null;
        /* Shape */
        this.rect1 = null;
        /* Shape */
        this.rect2 = null;
        /* Component */
        this.comp = null;
        /* int */
        this.strokeWidth = 1.5;
        
        if (argv.length > 0) 
        	this.initTitledBorder(x, y, w, h, comp);
    }

TitledBorder.prototype.initTitledBorder = function(x, y, w, h, comp) {
        this.initContainer(x, y, w, h);
        this.setInsets(2, 2, 2, 2); // left,right,top,bottom 
        if (comp != undefined) {
            this.comp = comp;
            this.comp.setBackground("#d4d0c8");
        }
        this.setBackground("#d4d0c8");
    }

TitledBorder.prototype.createSVGContent = function() {
        this.createSVGContentTitledBorder();
    }

TitledBorder.prototype.createSVGContentTitledBorder = function() {
        this.createSVGContentContainer();
        this.tg = this.getGraphics();
        this.contentg = this.getGraphics();
        this.tg.setColor("none");
        this.tg.setStrokeWidth(this.strokeWidth);
        this.tg.setStrokeColor(pal[1]);
        this.rect1 = this.tg.drawRect(0, 0, this.w - this.strokeWidth, this.h - this.strokeWidth);
        this.tg.setStrokeColor(pal[3]);
        this.rect2 = this.tg.drawRect(this.strokeWidth, this.strokeWidth, this.w - this.strokeWidth, this.h - this.strokeWidth);
        this.rect1.setAttribute('shape-rendering', 'optimizeSpeed');
        this.rect1.setAttribute('shape-rendering', 'optimizeSpeed');
        if (this.comp != null) {
            this.comp.setFont(this.getFont());
            this.comp.paint(this.tg);
        }
        this.paintChildren(this.contentg);
    }

TitledBorder.prototype.onResize = function() {
        this.onResizeTitledBorder();
    }

TitledBorder.prototype.onResizeTitledBorder = function() {
        this.onResizeContainer();

        if (this.comp != null)
            this.positionComponent();

    }

TitledBorder.prototype.onMove = function() {
        this.onMoveTitledBorder();
    }

TitledBorder.prototype.onMoveTitledBorder = function() {
        this.onMoveContainer();
    }

TitledBorder.prototype.recalc = function() {
        this.recalcTitledBorder();
    }

TitledBorder.prototype.recalcTitledBorder = function() {

        var cw = 0;
        var ch = 0;

        if (this.comp != null) {
            this.comp.recalc();
            this.positionComponent();
            var cw = this.comp.getWidth();
            var ch = this.comp.getHeight();
        }

        var dh = ch / 2;

        if (this.valign == TOP) {
            this.rect1.translate(0, dh);
            this.rect1.setSize(this.w - this.strokeWidth, this.h - this.strokeWidth - dh);
            this.rect2.translate(this.strokeWidth, this.strokeWidth + dh);
            this.rect2.setSize(this.w - this.strokeWidth, this.h - this.strokeWidth - dh);
            this.setInsets(5, 5, 5 + ch, 5); // left,right,top,bottom 

        }
        if (this.valign == BOTTOM) {
            this.rect1.translate(0, 0);
            this.rect1.setSize(this.w - this.strokeWidth, this.h - this.strokeWidth - dh);
            this.rect2.translate(this.strokeWidth, this.strokeWidth);
            this.rect2.setSize(this.w - this.strokeWidth, this.h - this.strokeWidth - dh);
            this.setInsets(5, 5, 5, 5 + ch); // left,right,top,bottom 
        }


        this.recalcContainer();
    }

TitledBorder.prototype.setAlign = function( /* int */ align, /* int */ valign) {
        if (align != undefined) this.align = align;
        if (valign != undefined) this.valign = valign;
        if (this.comp != null)
            this.positionComponent();
    }

TitledBorder.prototype.positionComponent = function() {
    var x = 0;
    var y = 0;
    var w = this.comp.getWidth();
    var h = this.comp.getHeight();
    var gap = 10;

    switch (this.align) {
        case LEFT:
            x = gap;
            break;
        case RIGHT:
            x = this.w - w - gap;
            break;
        case CENTER:
            x = (this.w - w) / 2;
            break;
    }

    switch (this.valign) {
        case TOP:
            y = 0;
            break;
        case BOTTOM:
            y = this.h - h;
            break;
    }

    this.comp.setLocation(x, y);
}

/**
 * Swing.svg : Separator
 *
 * @author    Adnan Sagar, PhD <adnan@websemantics.ca>
 * @copyright 2004-2015 Web Semantics, Inc. (http://websemantics.ca)
 * @license   http://www.opensource.org/licenses/mit-license.php MIT
 * @since     25th July 2005
 * @package   websemantics/oea/swing.svg
 */

Separator.prototype= new Canvas(); 

function Separator( /* int */ x, /* int */ y, /* int */ w, /* int */ h) {
        var argv = Separator.arguments;
        var argc = Separator.length;

        /* String */
        this.className = "Separator";
        /* String */
        this.name = "Separator";
        /* Graphics */
        this.sg = null;
        /* Shape */
        this.separatorShape = null;

        if (argv.length > 0) 
        	this.initSeparator(x, y, w, h);
    }

Separator.prototype.initSeparator = function(x, y, w, h) {
        this.initCanvas(x, y, w, h);
    }

Separator.prototype.createSVGContent = function() {
        this.createSVGContentSeparator();
    }

Separator.prototype.createSVGContentSeparator = function() {
        this.createSVGContentCanvas();
        this.sg = this.getGraphics();
        this.separatorShape = this.sg.drawStepBorder(0, this.h / 2, this.w, 2);
    }

Separator.prototype.onResize = function() {
        this.onResizeSeparator();
    }
    //*************
    // onResizeSeparator
    //*************
Separator.prototype.onResizeSeparator = function() {
        this.onResizeCanvas();
        if (this.separatorShape != null)
            this.separatorShape.setSize(this.w, this.separatorShape.h);

    }

Separator.prototype.recalc = function() {
        this.recalcSeparator();
    }

Separator.prototype.recalcSeparator = function() {
    this.recalcCanvas();
    if (this.separatorShape != null)
        this.separatorShape.setSize(this.w, this.separatorShape.h);

}
/**
 * Swing.svg : List
 *
 * @author    Adnan Sagar, PhD <adnan@websemantics.ca>
 * @copyright 2004-2015 Web Semantics, Inc. (http://websemantics.ca)
 * @license   http://www.opensource.org/licenses/mit-license.php MIT
 * @since     25th July 2005
 * @package   websemantics/oea/swing.svg
 */

List.prototype= new Container(); 

function List( /* int */ x, /* int */ y, /* int */ w, /* int */ h) {
        var argv = List.arguments;
        var argc = List.length;

        /* String */
        this.className = "List";
        /* String */
        this.name = "List";
        /* boolean */
        this.fixedSize = false;
        /* Graphics  */
        this.lg = null;
        /* Graphics  */
        this.contentg = null;
        /* Shape */
        this.border = null;
        /* Color */
        this.selRectColor = "blue"; // The color of the selected item
        /* Component */
        this.highlightedComp = null; // The one which's selected or mouseOver
        
        if (argv.length > 0) 
          this.initList(x, y, w, h);
    }

List.prototype.initList = function(x, y, w, h) {
        this.addInternalMouseMotionListener(mouseClicked, "listMouseClicked");
        this.initContainer(x, y, w, h);
        this.setInsets(7, 7, 5, 5); // left,right,top,bottom 
        this.setBackground("white");
        this.setLayout(new BoxLayout(Y_AXIS, LEFT, TOP, 0));
    }

List.prototype.createSVGContent = function() {
        this.createSVGContentList();
    }

List.prototype.createSVGContentList = function() {
        this.createSVGContentContainer();
        this.contentg = this.getGraphics();
        this.lg = this.getGraphics();
        this.border = this.drawBorder(this.lg);
        this.border.setAttribute('shape-rendering', 'optimizeSpeed');
        this.paintChildren(this.contentg);
    }

List.prototype.drawBorder = function( /* Graphics */ g) {
        var border = g.drawWinBorder(0, 0, this.w, this.h);
        border.setFaceDown();
        return border;
    }

List.prototype.addSeparator = function() {
        var s = new Separator(0, 0, 10, 10);
        this.add(s);
    }

List.prototype.addComponentItem = function( /* Component */ comp) {
        comp.className = "Item";
        comp.setFont(this.font);
        this.add(comp);
    }

List.prototype.addTextItem = function( /* String */ text) {
        var l = new Label(0, 0, 0, 0, text, text);
        l.className = "Item";
        l.setFont(this.font);
        this.add(l);
    }

List.prototype.addTextIconItem = function( /* String */ text, /* String */ fn, /* int */ w, /* int */ h) {
        var icon = null;

        if (fn != undefined) icon = new Icon(fn, w, h);

        var l = new Label(0, 0, 0, 0, text, text, icon);
        l.className = "Item";
        l.setFont(this.font);
        this.add(l);
    }

List.prototype.onResize = function() {
        this.onResizeList();
    }

List.prototype.onResizeList = function() {
        this.onResizeContainer();
        if (this.border != null) this.border.setSize(this.w, this.h);
    }

List.prototype.onMove = function() {
        this.onMoveList();
    }

List.prototype.onMoveList = function() {
        this.onMoveContainer();
    }

List.prototype.setToFixedSize = function() {
        this.fixedSize = true;
    }

List.prototype.recalc = function() {
        this.recalcList();
    }

List.prototype.recalcList = function() {
        this.recalcContainer();

        if (this.getLayout() != null & this.fixedSize != true) {
            /* Dimension */
            var d = this.getLayout().preferredLayoutSize(this);
            this.setSize(d.getWidth(), d.getHeight());
        }

        if (this.children != null) {
            var k = this.components();
            while (k.hasMoreElements()) {
                var child = k.nextElement();
                if (child.setTextAlign != undefined)
                    child.setTextAlign(LEFT, CENTER);
                child.setSize(this.w - this.left - this.right, child.h);
            }

            if (this.getLayout() != null) this.getLayout().layoutContainer(this);
        }
    }

List.prototype.listMouseClicked = function( /* MouseEvent */ e) {
        // if(e.source!=this)return;

        var d = this.getComponentAt(e.getX(), e.getY());

        if (d == null || d.className != "Item") return;

        this.changeHighlightedComp(d);

        /* ActionEvent */
        var aevt = new ActionEvent(d, "itemClicked", e);
        // Action Listeners 
        if (this.actionListeners != null) {
            var k = new Enumerator(this.actionListeners);
            while (k.hasMoreElements())
            /* ActionListener */
                k.nextElement().actionPerformed(aevt);
        }
    }

List.prototype.changeHighlightedComp = function( /* Component */ d) {

        if (this.highlightedComp != null) {
            this.highlightedComp.setBackground(this.getBackground());
            this.highlightedComp.setTextColor("black");
        }
        this.highlightedComp = d;
        this.highlightedComp.setTextColor("white");
        this.highlightedComp.setBackground(this.selRectColor);
    }

List.prototype.show = function() {
        if (this.getNode() == null) return;
        this.showComponent();
        this.getNode().setAttribute("pointer-events", "all");
        //
        if (this.highlightedComp != null) {
            this.highlightedComp.setBackground(this.getBackground());
            this.highlightedComp.setTextColor("black");
            this.highlightedComp.highlightOff();
        }
    }

List.prototype.hide = function() {
        if (this.getNode() == null) return;
        this.hideComponent();
        this.getNode().setAttribute("pointer-events", "none");
    }

List.prototype.getItemDimension = function() {
        var fComp = this.getComponentAt(this.left, this.top);
        return new Dimension(fComp.getWidth(), fComp.getHeight());
    }

List.prototype.getFirstItem = function() {
    return this.getComponentAt(this.left, this.top);
}

List.prototype.getSelected = function() {
    if (this.highlightedComp == null) return null;
    return this.highlightedComp.getText();
}

/**
 * Swing.svg : PopUpMenu
 *
 * @author    Adnan Sagar, PhD <adnan@websemantics.ca>
 * @copyright 2004-2015 Web Semantics, Inc. (http://websemantics.ca)
 * @license   http://www.opensource.org/licenses/mit-license.php MIT
 * @since     25th July 2005
 * @package   websemantics/oea/swing.svg
 */

PopUpMenu.prototype= new List(); 

function PopUpMenu( /* int */ x, /* int */ y, /* int */ w, /* int */ h) {
        var argv = PopUpMenu.arguments;
        var argc = PopUpMenu.length;
        /* String */
        this.name = "PopUpMenu";
        /* String */
        this.className = "PopUpMenu";

        if (argv.length > 0) 
          this.initPopUpMenu(x, y, w, h);
    }

PopUpMenu.prototype.initPopUpMenu = function(x, y, w, h) {
        this.addInternalMouseMotionListener(mousePressed, "popUpMenuMousePressed");
        this.addInternalMouseMotionListener(mouseMoved, "popUpMenuMouseMoved");
        ds_addEventListener(this, "mousedown", "desktopMouseDown");
        this.initList(x, y, w, h);
        this.setBackground("#d4d0c8");
        this.font = new Font("Arial", "normal", "10pt");
    }

PopUpMenu.prototype.createSVGContent = function() {
        this.createSVGContentPopUpMenu();
    }

PopUpMenu.prototype.createSVGContentPopUpMenu = function() {
        this.createSVGContentList();
        this.glassPaneOn();
        this.enableMouseListener();
        this.enableMouseMotionListener();
        this.hide();
    }

PopUpMenu.prototype.drawBorder = function( /* Graphics */ g) {
        var border = g.drawWinBorder(0, 0, this.w, this.h);
        border.setFaceUp();
        return border;
    }

PopUpMenu.prototype.recalc = function() {
        this.recalcPopUpMenu();
    }

PopUpMenu.prototype.recalcPopUpMenu = function() {
        this.setVisibility(false);
        this.show(); // <=== to fix a bug when it works on batik,....if text node display property is none getComputedTextLength does not work,..
        this.recalcList();
        this.setVisibility(true);
        this.hide();
    }

PopUpMenu.prototype.desktopMouseDown = function(evt) {
    // Summary:
    // Click anywhere to hide the Menu,...
        this.hide();
    }

PopUpMenu.prototype.popUpMenuMouseMoved = function( /* MouseEvent */ e) {
        var d = this.getComponentAt(e.getX(), e.getY());
        if (d != null && d.className == "Item")
            this.changeHighlightedComp(d);
    }

PopUpMenu.prototype.popUpMenuMousePressed = function( /* MouseEvent */ e) {
    // Summary:
    // Because the menu click event is delivered after the desktop event 
    // is excuted then the menu will show.

    if (e.source != this) return;

    this.show();

    var d = this.getComponentAt(e.getX(), e.getY())

    if (d == null || e.getButton() == BUTTON2 || e.getButton() == BUTTON3 || d.className == "Separator") return;

    /* ActionEvent */
    var aevt = new ActionEvent(d, "menuItemSelected", e);
    // Action Listeners 
    if (this.actionListeners != null) {
        var k = new Enumerator(this.actionListeners);
        while (k.hasMoreElements()) {
            /* ActionListener */
            k.nextElement().actionPerformed(aevt);

        }
    }
    this.hide();
}

/**
 * Swing.svg : TextBox (***** 5 Stars Widget)
 *
 * @author    Adnan Sagar, PhD <adnan@websemantics.ca>
 * @copyright 2004-2015 Web Semantics, Inc. (http://websemantics.ca)
 * @license   http://www.opensource.org/licenses/mit-license.php MIT
 * @since     5th July 2005 (me birthday)
 * @package   websemantics/oea/swing.svg
 */

/*
* 
* Class Textbox: 
* 
* Overview:
* 
* This is an SVG implementation of a Textbox widget. 
* 
* The component has a cursor and works in two modes: (1) Type mode, and 
* (2) Insert mode. To switch between the two modes use the 'insert'
* key. The cursor in the type mode is bold while in the insert mode
* is transparent and has the width of the char beneath it. Textbox
* inherits from Component class. While writing this class the
* SCanvas class was modified to support changing the SVG Mouse
* cursor shape. Since this modification, now the mouse cursor takes
* the 'text' shape when the mouse hovers over the Textbox. Maximum
* effort was put to ensure that this widget feels no different
* than a normal non-SVG weight. This class (Textbox) has a cursor
* that moves: left, right, up, down, 'home' and 'end'. And also it
* locates to the char nearest to the mouse click spot. Text
* selection is also supported. One can either select text by moving
* the cursor using the keyboard arrows, 'home' and 'end' while
* pressing on the shift key or by dragging the mouse on the
* required fragment of text. One can also double-click on a word to
* select it or press Ctrl-A to select all. Textbox support styled
* selection rectangle in the single line mode. The color, stroke
* color and stroke width of the selection rectangle can be changed.
* Good care take taken to ensure that Textbox widget works in Batik
* viewer as well. A minimal form of a clipboard was supported. Use
* Ctrl-C to copy the selected text, Ctrl-X/Shift-Delete to copy and
* cut and Ctrl-V/Shift-Insert to paste. The copied text can be
* either used locally or with other Textbox objects. If the flag
* 'trs' (Type Replaces Selection) is on (true), the inserted text
* replaces the selected text otherwise it does not. This component
* support 'focus' mechanism independently. The technique to support
* focus is simple and easy to implement. At first, the component
* does not have focus and therefore the cursor is hidden and the
* widget does not listen to the keyboard. If the user clicks on the
* component the component gains focus BUT if the user click
* anywhere else on the desktop then the widget loses it. So, for
* multiple Textbox object: they all start with no focus but when
* the user clicks on a particular Textbox all other Textbox objects
* receive Mouse Click/Press Event from the desktop and that causes
* them to lose focus (including the one that the user's clicked)
* but after that the same component receive another Mouse Click
* Event but this one is originated from the component itself and
* that causes it to gain the focus. When the component gain focus
* it starts to listen to the keyboard. The component can be
* configured to work as a single line or multi-line Textbox. The
* multi-line form of the component uses the new features supported
* in ASV6 (text layout). However, the current version of Batik does
* not support that. Also, the Textbox widget can be used to input
* single line text, where it uses a simple SVG text element that
* can be used in Batik and ASV viewers. The component resizes
* itself to fit only a single line of text. This component can not
* deal with an amount of text that does not fit into its working
* space so it cuts the extra text out and displays the rest. A
* warning message is produced to the user when that happens.
* 
* 16th Dec 2005
* 
* (1) Bug fix: 
* 
* There was a problem sometimes the baseline of the text inside the text box is 
* not given correctly by the host SVG env. because it is obtained while the creation
* of the text box SVG content (createSVGContent). The fix was to re-obtain the baseline
* again when the 'recalc' method is executed by calling setFont(getFont()).
* 
* (2) New features: 
* 
* The new feature added is that, the text box can hide what is written in it
* by replacing types characters witl an alternative letter ('*' or else). 
* This can be used for enter passwords.
*
* Known bugs:
* (1) When type x, there will be an error (line 119). NOT FIXED
*/

TextBox.prototype= new Canvas(); // Extends EventManager

function TextBox(x, y, w, h, text, multiLine) {
        var argv = TextBox.arguments;
        var argc = TextBox.length;
        if (multiLine != undefined) 
          this.multiLine = multiLine;
        else
        /* boolean */ this.multiLine = false;

        /* boolean */
        this.passwordMode = false; // display star '*' if this flag is set to true
        /* Char */
        this.passwordChar = "*"; // display star '*' 
        /* int */
        this.margin = 5; // Never change this property directly,...use setMargin method
        /* int */
        this.selCharPos1 = -1;
        /* int */
        this.selCharPos2 = -1;
        /* int */
        this.cursorCharPos = 0;
        /* int */
        this.cursorHeight = 0;
        /* int */
        this.cursorWidth = 1; // The width of char 'i',..changes when the font has changed
        /* String */
        this.name = "TextBox";
        /* String */
        this.text = null; // Never change this property directly,... Use setText method
        /* Shape */
        this.textShape = null;
        /* Shape */
        this.tv = null; // TextView
        /* Shape */
        this.cursorShape = null;
        /* Shape */
        this.selectionRectShape = null;
        /* Boolean */
        this.insertMode = false; // New text overwrite old
        /* Boolean */
        this.trs = true; // Type Replaces Selection flag
        /* Font */
        this.font = new Font("Helvetica", "normal", "10pt");
        /* Font */ //this.font=new Font("monospace","normal","8pt");
        /* Color */
        this.fontColor = "black"; // for font and cursor
        /* Color */
        this.backgroundColor = "white"; // for font and cursor
        /* Boolean */
        this.selectionGraphicsClear = true; // To indicate if the selection graphics is full of empty of sel rects
        /* Color */
        this.selectionColor = "blue";
        /* Color */
        this.selectionStrokeColor = "none";
        /* Color */
        this.selectionStrokeWidth = 0;
        /* Graphics */
        this.sg = null; // Graphics for the selection rectangles
        /* Boolean */
        this.styledMode = false; // Textbox supports single line in styled mode, with this mode the selection
        // Is done differently using a styled rectangle.
        /* String */
        this.className = "TextBox";
        /* boolean */
        this.created = false; // true of the svg content is created (only once).
        
        if (argv.length > 0) 
          this.initTextBox(x, y, w, h, text);
    }

TextBox.prototype.initTextBox = function(x, y, w, h, text) {
        this.initCanvas(x, y, w, h);
        if (text) this.text = text; // Does not get updated!, use this.getText();
        this.addMouseMotionListener(this);
        this.addMouseListener(this);
        this.addKeyListener(this);
        ds_addEventListener(this, "click", "desktopMouseClick");
        ds_addEventListener(this, "mousedown", "desktopMouseClick");
    }

TextBox.prototype.setPasswordMode = function( /* boolean */ mode) {
    // Summary:
    // setPasswordMode: display '*' if in password mode
        this.passwordMode = mode;
    }

TextBox.prototype.paint = function( /* Graphics */ g) {
        this.paintTextBox(g);
    }

TextBox.prototype.paintTextBox = function( /* Graphics */ g) {
        this.paintCanvas(g);
        this.updateCursor();
        this.lostFocus();
    }

TextBox.prototype.recalc = function() {
        this.recalcTextBox();
    }

TextBox.prototype.recalcTextBox = function() {
        this.recalcCanvas();
        // When the widget changes font it automatically calculate the baseline and 
        // the problem is fixed!!!
        this.setFont(this.getFont());
    }

TextBox.prototype.createSVGContent = function() {
        this.createSVGContentTextBox();
    }

TextBox.prototype.createSVGContentTextBox = function() {
        this.createSVGContentCanvas();

        this.contentg = this.getGraphics();

        var cg = this.contentg;
        
        // The font size MUST be in pt to calculate the height correctly,...
        cg.setFont(this.font);
        this.created = true;
        this.setBackground(this.backgroundColor);
        this.border = cg.drawWinBorder(0, 0, this.w, this.h);
        this.border.setFaceDown();
        cg.setColor(this.fontColor);
        var fm = cg.getFontMetrics();
        
        // this.cursorBaseline=fm.getBaseline();  <== DOES NOT RETURN A TRUE BASELINE,..
        
        this.cursorHeight = fm.getHeight();
        
        // If this text box is multiline then create a Text View shape.
        if (this.multiLine) { // ***************** [ MLUTI-LINE OR SINGLE-LINE ] ********************
            this.tv = cg.drawTextView(this.margin, this.margin, this.w - (this.margin * 2), this.h - (this.margin * 2));
            this.tv.setAttribute("pointer-events", "none");
            this.textShape = this.tv.addParagraph("A"); // Set the text to 'A' to get the baseline only then reset to default
        } else {
            this.textShape = cg.drawText(this.margin, this.margin, "A");
            this.textShape.setToBaseLine();
            this.textShape.setAttribute("pointer-events", "none");
            var temp = this.text;
            this.setSize(this.getWidth(), this.cursorHeight + (this.margin * 2)); // Resize to only to one line of text
            this.text = temp;
        }
        
        // Get THE REAL baseline,.. 
        this.cursorBaseline = this.textShape.getNode().getStartPositionOfChar(0).y;
        
        // this.cursorBaseline=fm.getBaseline(); 

        // Set text
        if (this.text != null) this.setText(this.text);
        else this.setText("");

        cg.setStrokeColor("black");

        this.cursorShape = cg.drawRect(this.margin, this.margin, 1, this.cursorHeight);
        this.cursorShape.setAttribute('shape-rendering', 'optimizeSpeed'); //shape-rendering( auto | optimizeSpeed | crispEdges | geometricPrecision | inherit )
        var ani = document.createElementNS("http://www.w3.org/2000/svg", "animate")
        ani.setAttribute("attributeName", "visibility")
        ani.setAttribute("values", "visible;hidden;visible")
        ani.setAttribute("begin", "0s")
        ani.setAttribute("repeatCount", "indefinite")
        ani.setAttribute("dur", "1")
        this.cursorShape.getNode().appendChild(ani);
        // Set the mouse cursor shape
        this.setCursor("text");

        // Draw the selection Rect
        this.sg = createGraphics(0, 0, 1, 1);

        // Selection recangle style
        this.sg.setColor(this.selectionColor);
        this.sg.setStrokeColor(this.selectionStrokeColor);
        this.sg.setStrokeWidth(this.selectionStrokeWidth);
        cg.addGraphics(this.sg);
        this.selectionGraphicsClear = true;
    }

TextBox.prototype.insertTextConsiderSelection = function( /* String */ text) {
    // Summary: 
    // insertTextConsiderSelection: Insert a text but consider the selection,..replace when neccessary
   
        var temp = this.text; // save the current state (text)
        var pos = this.cursorCharPos; // save the current state (cursor location)

        if (this.isSelection() && this.trs) { // If there is a selection then the typed text should replace it, otherwise normal
            this.replaceText(this.selStartCharPos(), this.selEndCharPos() - this.selStartCharPos(), text);
            this.cursorCharPos = this.selStartCharPos() + text.length;
        } else {
            if (this.insertMode)
                this.replaceText(this.cursorCharPos, text.length, text);
            else
                this.insertText(this.cursorCharPos, text);
            this.cursorCharPos += text.length;
        }

        // If the box is full of text then don't take more, go back to previous state,..
        if (!this.isThereStillRoom(this.text.length - 1)) {
            this.setText(temp);
            this.cursorCharPos = pos;
        }

        this.resetSelection();

    }

TextBox.prototype.getDisplayText = function( /* String */ text) {

        if (!this.passwordMode) return text;
        if (text == undefined || text == null) return "";

        var len = text.length;
        text = "";
        for (var i = 0; i < len; i++)
            text += this.passwordChar;
        return text;
    }

TextBox.prototype.setText = function( /* String */ text) {

        this.text = text;

        if (this.textShape != null)
            this.textShape.setText(this.getDisplayText(text));

        if (this.text == null || this.text.length == 0) return;
        // Cut out any extra text that can not fit into the Textbox space,...
        var i = 0;

        for (i = 0; i < this.text.length && this.isThereStillRoom(i); i++);

        if (i < this.text.length) {
            // alert("Warning: The TEXT can not fit the TextBox component. The extra letters will be cut."); <<<==== [Un comment]
            // Cut the extra text
            this.textShape.setText(this.getDisplayText(this.text.substring(0, i)));
            this.text = this.text.substring(0, i);
        }

    }

TextBox.prototype.getText = function() {
        return this.text;
    }

TextBox.prototype.insertText = function( /* int */ charPos, /* String */ text) {
        this.text = this.text.substring(0, charPos) + text + this.text.substring(charPos, this.text.length);
        this.textShape.insertText(charPos, this.getDisplayText(text));
        this.sendChangeEvent(); // [8-2-2006]
    }

TextBox.prototype.replaceText = function( /* int */ charPos, /* int */ count, /* String */ text) {
        this.textShape.replaceText(charPos, count, this.getDisplayText(text));
        this.text = this.text.substring(0, charPos) + text + this.text.substring(charPos + count, this.text.length);
        this.sendChangeEvent(); // [8-2-2006]
    }

TextBox.prototype.deleteText = function( /* int */ charPos, /* int */ count) {
        this.textShape.deleteText(charPos, count);
        this.text = this.text.substring(0, charPos) + this.text.substring(charPos + count, this.text.length);
        this.sendChangeEvent(); // [8-2-2006]
    }

TextBox.prototype.sendChangeEvent = function() {
        // Delever change event for listners [8-2-2006]
        /* ActionEvent */
        var aevt = new ActionEvent(this, "textBoxChanged", null);
        // Action Listeners 
        if (this.actionListeners != null) {
            var k = new Enumerator(this.actionListeners);
            while (k.hasMoreElements())
            /* ActionListener */
                k.nextElement().actionPerformed(aevt);
        }
    }

TextBox.prototype.getRotationOfChar = function( /* int */ charPos) {
    // Summary: 
    // getRotationOfChar : Wrapper around SVG Interface

        return (this.textShape.getNode().getRotationOfChar(charPos));
    }

TextBox.prototype.getStartPositionOfChar = function( /* int */ charPos) {
    // Summary: 
    // getStartPositionOfChar: Wrapper around SVG Interface

        if( charPos > -1) // Added April 28th 2015
          return (this.textShape.getNode().getStartPositionOfChar(charPos));
        else 
          return 0;
    }

TextBox.prototype.getEndPositionOfChar = function( /* int */ charPos) {
    // Summary: 
    // getEndPositionOfChar: Wrapper around SVG Interface

        return (this.textShape.getNode().getEndPositionOfChar(charPos));
    }

TextBox.prototype.getXPositionOfChar = function( /* int */ charPos) {
    // Summary: 
    // getXPositionOfChar
    // return: x position of a char 

        return (this.getStartPositionOfChar(charPos)).x;
    }

TextBox.prototype.getYPositionOfChar = function( /* int */ charPos) {
    // Summary: 
    // getYPositionOfChar
    // return: y position of a char 

        return (this.getStartPositionOfChar(charPos)).y;
    }

TextBox.prototype.isCharsAtSameLine = function( /* int */ charPos1, /* int */ charPos2) {
    // Summary: 
    // isCharsAtSameLine
    // return: true as long as the two chars are at the same line,.. 

        return (this.getYPositionOfChar(charPos1) == this.getYPositionOfChar(charPos2));
    }

TextBox.prototype.calcSelectionEnds = function( /* boolean */ shiftDown, /* int */ charPos1, /* int */ charPos2) {
    // Summary: 
    // calcSelectionEnds: Claculated the 'start' and the 'end' of a selection

        if (shiftDown) {
            if (this.selCharPos1 == -1)
                this.selCharPos1 = charPos1;
            this.selCharPos2 = charPos2;
        } else
            this.resetSelection();
    }

TextBox.prototype.isThereStillRoom = function( /* int */ charPos) {
    // Summary: 
    // isThereStillRoom: return true if we can add more text 

        if (!this.multiLine) {
            var fm = this.font.getFontMetrics();
            if (fm.getStringWidth(this.text.substring(0, charPos + 1)) > this.w - (this.margin * 2)) return false;
            return true;
        } else {
            if (this.text.length > 0 && this.getYPositionOfChar(charPos) <= 0) return false;
            return true;
        }
    }

TextBox.prototype.getCharPosFromXY = function( /* int */ x, /* int */ y) {

        // This to fix the problem when the mouse cursor y coord is bigger than the y coord of the last line of the text box
        if (y > this.getYPositionOfChar(this.text.length - 1)) y = this.getYPositionOfChar(this.text.length - 1);
        // This to fix the problem when the mouse cursor y coord is less than the y coord of the first line of the text box
        if (y < this.getYPositionOfChar(0)) y = this.getYPositionOfChar(0);

        y = this.quantizeY(y); // Y is always crosses the middle y axis of a line of chars

        var p = document.documentElement.createSVGPoint();
        p.x = x;
        p.y = y;

        var pos = this.textShape.getNode().getCharNumAtPosition(p);

        if (pos != -1) return pos;
        else {
            // First, check if there is a line along the y axis, eventhough the location under the mouse cursor is empty
            // Meaning, if the mouse is not over any letter in the current line,...
            p.x = 0;
            p.y = y;
            pos = this.textShape.getNode().getCharNumAtPosition(p);

            if (pos != -1) { // So if there's a line then check if the mouse is one the left then go to the 
                // start of the line 'home'; otherwise go to the right 'end'
                if (x <= 0) return pos;
                // Now go to the last char of the current line,...same as the end key

                var j = 0;
                for (j = pos; j < this.text.length && this.isCharsAtSameLine(j, pos); j++);

                if (j == this.text.length) return j;
                else return (j - 1);
            } // if 
        } // else
        return -1;
    }

TextBox.prototype.quantizeY = function( /* int */ y) {
    // Summary:
    // Make the value of Y always fall in the middle of the line ,.. Height / 2
        return (Math.floor(y / this.cursorHeight) * (this.cursorHeight)) + this.cursorHeight / 2;
    }

TextBox.prototype.selStartCharPos = function() {
        return Math.min(this.selCharPos1, this.selCharPos2);
    }

TextBox.prototype.selEndCharPos = function() {
        return Math.max(this.selCharPos1, this.selCharPos2);
    }

TextBox.prototype.isSelection = function() {
        return (this.selCharPos1 > -1 && this.selCharPos2 > -1);
    }

TextBox.prototype.resetSelection = function() {

        this.selCharPos1 = -1;
        this.selCharPos2 = -1;
        if (this.styledMode) {
            this.sg.clear();
            this.selectionGraphicsClear = true;
        } else svgDocument.documentElement.deselectAll();

    }

TextBox.prototype.updateSelection = function() {

        if (!this.styledMode && this.isSelection()) { // Update Selecion,..
            var s = this.selStartCharPos();
            var e = this.selEndCharPos();
            this.textShape.getNode().selectSubString(s, (e - s));
            return;
        }

        // Batik Mode only!
        if (this.selStartCharPos() == this.selEndCharPos()) return;
        var spoint, epoint;
        spoint = this.getStartPositionOfChar(this.selStartCharPos());
        if (this.selEndCharPos() == this.text.length)
            epoint = this.getEndPositionOfChar(this.selEndCharPos() - 1);
        else
            epoint = this.getStartPositionOfChar(this.selEndCharPos());

        var x = spoint.x + this.margin;
        var y = spoint.y + this.margin - this.cursorBaseline;
        var w = epoint.x - spoint.x;
        var h = this.cursorHeight;

        if (this.isSelection()) {

            if (this.selectionGraphicsClear) {
                this.selectionGraphicsClear = false;
                var sy = spoint.y;

                while (sy != epoint.y) {
                    var lastCharPos = this.getCharPosFromXY(this.w, sy);
                    w = this.getEndPositionOfChar(lastCharPos).x - x;
                    sy = this.getStartPositionOfChar(lastCharPos + 1).y;
                }

                this.sRect = this.sg.drawRect(x, y, w, h);
                this.sRect.setAttribute('shape-rendering', 'optimizeSpeed');
                this.sRect.setOpacity(0.3);
            } else {
                if (spoint.y != epoint.y) {
                    w = this.getEndPositionOfChar(this.getCharPosFromXY(this.w, this.y)).x - x;
                }
                this.sRect.translate(x, y);
                this.sRect.setSize(w, h);
            }
        }
    }

TextBox.prototype.moveCursorLeftRight = function( /* int */ inc, /* boolean */ shiftDown) {
        this.calcSelectionEnds(shiftDown, this.cursorCharPos, this.cursorCharPos + inc);
        this.cursorCharPos += inc;
        this.updateSelection();
    }

TextBox.prototype.moveCursorUpDown = function( /* int */ inc, /* boolean */ shiftDown) {
        var oldCursorCharPos = this.cursorCharPos;
        var p = document.documentElement.createSVGPoint();
        p.x = this.cursorX;
        p.y = this.getYPositionOfChar(this.cursorCharPos) + inc;

        var pos = this.textShape.getNode().getCharNumAtPosition(p);
        if (pos != -1)
            this.cursorCharPos = pos;
        else {
            // sometimes the cursor is at the end of a line and eventhough three's more lines under, the cursor does not find
            // a char underneath itself because of linebreak (emty),...so we'll check if there are more lines under; if so move the 
            // cursor to the end of that line,... THE SAME FOR ABOVE!!
            if (inc > 0) { // GO DOWN
                for (i = this.cursorCharPos; i <= this.text.length; i++)
                    if (!this.isCharsAtSameLine(i, this.cursorCharPos)) {
                        this.cursorCharPos = i;
                        // Now go to the last char,...same login as the end key
                        for (j = this.cursorCharPos; j <= this.text.length && this.isCharsAtSameLine(j, this.cursorCharPos); j++);
                        this.cursorCharPos = j - 1;
                        break;
                    }
            } else { // GO UP
                for (i = this.cursorCharPos; i >= 0; i--)
                    if (!this.isCharsAtSameLine(i, this.cursorCharPos)) {
                        this.cursorCharPos = i;
                        break;
                    }
            }
        } // else [pos != -1]
        this.calcSelectionEnds(shiftDown, oldCursorCharPos, this.cursorCharPos);
    }

TextBox.prototype.endKeyPressed = function(shiftDown) {

        var oldCursorCharPos = this.cursorCharPos;
        // first, move to char last pos check if it's in the same line (it could be that the cursor in the 
        // forth line for instance and 0 is the begin of the text),..effecent for single line text box
        if (this.isCharsAtSameLine(this.text.length - 1, this.cursorCharPos)) this.cursorCharPos = this.text.length;
        else {
            for (i = this.cursorCharPos; i <= this.text.length && this.isCharsAtSameLine(i, this.cursorCharPos); i++);
            this.cursorCharPos = i - 1;
        }

        this.calcSelectionEnds(shiftDown, oldCursorCharPos, this.cursorCharPos);
    }

TextBox.prototype.homeKeyPressed = function( /* boolean */ shiftDown) {

        var oldCursorCharPos = this.cursorCharPos;
        // first, move to char pos 0 and check if it's in the same line,..effecent for single line text box
        if (this.text.length != 0 && this.cursorCharPos == this.text.length) this.cursorCharPos--;

        if (this.isCharsAtSameLine(0, this.cursorCharPos)) this.cursorCharPos = 0;
        else {
            for (i = this.cursorCharPos; i >= 0 && this.isCharsAtSameLine(i, this.cursorCharPos); i--);
            this.cursorCharPos = i + 1;
        }

        this.calcSelectionEnds(shiftDown, oldCursorCharPos, this.cursorCharPos);
    }

TextBox.prototype.updateCursor = function() {

        if (this.cursorShape == null) return;

        // If the Text Box is empty then it's imposible to retrive the x,y coord so we set
        // the text of the Text Box with any text and delete it after getting x and y 

        var emptyText = false;

        if (this.text.length == 0) {
            emptyText = true;
            this.setText("A");
            this.cursorCharPos = 0;
        }

        var rot = 0; // Rotation
        // Inforce the range between 0 and text.length
        if (this.cursorCharPos < 0) this.cursorCharPos = 0;
        if (this.cursorCharPos >= this.text.length) {
            this.cursorCharPos = this.text.length;
            pos = this.getEndPositionOfChar(this.cursorCharPos - 1);
            rot = this.getRotationOfChar(this.cursorCharPos - 1);
        } else {
            pos = this.getStartPositionOfChar(this.cursorCharPos);
            rot = this.getRotationOfChar(this.cursorCharPos);
        }

        // Calc the x and y coordinates of the cursor
        this.cursorX = pos.x + this.margin;
        this.cursorY = pos.y + this.margin - this.cursorBaseline;

        if (this.insertMode && this.cursorCharPos != this.text.length &&
            this.text.substring(this.cursorCharPos, this.cursorCharPos + 1) != " ") {
            f = this.textShape.getNode().getExtentOfChar(this.cursorCharPos);
            this.cursorShape.setSize(f.width, this.cursorShape.getHeight());
            this.cursorShape.setOrigin((this.cursorWidth / 2), this.cursorShape.getHeight());
            this.cursorShape.rotate(rot);
            this.cursorShape.translate(f.x + this.margin, this.cursorY);
            if (this.hasFocus) this.cursorShape.setOpacity(0.4);
        } else {
            this.cursorShape.setSize(this.cursorWidth, this.cursorShape.getHeight());
            this.cursorShape.setOrigin((this.cursorWidth / 2), this.cursorShape.getHeight());
            this.cursorShape.rotate(rot);
            this.cursorShape.translate(this.cursorX - (this.cursorWidth / 2), this.cursorY);

            if (this.hasFocus) {
                if (this.insertMode)
                    this.cursorShape.setOpacity(0.4);
                else
                    this.cursorShape.setOpacity(1);
            } // hasFocus
        }

        // Undo the things that have been done !! :-)
        if (emptyText) {
            emptyText = false;
            this.setText("");
        }

        // Update Selecion,..
        this.updateSelection();
    }

TextBox.prototype.desktopMouseClick = function(evt) {
        this.lostFocus();
    }

TextBox.prototype.mouseClicked = function( /* MouseEvent */ e) {

        var i, j;
        this.gainFocus();
        // Here we already know the pos of the cursor (has been done in mousePressed)
        if (e.getClickCount() == 2) {
            // if the char of the cursor is a space then return;
            if (this.text.substring(this.cursorCharPos, this.cursorCharPos + 1) == " ") return;
            // first get the left end (space char or the begining of the para) of the current work
            for (i = this.cursorCharPos; i >= 0 && this.text.substring(i, i + 1) != " "; i--);
            this.selCharPos1 = i + 1;
            for (j = this.cursorCharPos; j < this.text.length && this.text.substring(j, j + 1) != " "; j++);
            this.selCharPos2 = j;
        }
        this.updateCursor();
    }

TextBox.prototype.mousePressed = function( /* MouseEvent */ e) {

    this.gainFocus();

    if (e.isShiftDown() && this.selCharPos1 == -1) this.selCharPos1 = this.cursorCharPos;

    var pos = this.getCharPosFromXY(e.getX() - this.margin, e.getY() - this.margin);
    if (pos != -1) this.cursorCharPos = pos;

    if (e.isShiftDown()) this.selCharPos2 = this.cursorCharPos;
    else if (e.getButton() != BUTTON2) this.resetSelection(); // Don't remove selection if the right button is pressed

    this.updateCursor();
}

TextBox.prototype.mouseStartDragged = function( /* MouseEvent */ e) {

        if (!this.hasFocus) return;

        var pos = this.getCharPosFromXY(e.getX() - this.margin, e.getY() - this.margin);

        if (pos != -1) {
            this.cursorCharPos = pos;
            this.selCharPos1 = pos;
            if (viewerMode != Batik && !this.styledMode) // <=== This is a fix for ASV
                this.textShape.getNode().selectSubString(this.selCharPos1, 0);
        }
    }

TextBox.prototype.mouseDragged = function( /* MouseEvent */ e) {

        if ((!this.styledMode && viewerMode != Batik) || !this.hasFocus) return; // <=== This is a fix for ASV [if ASV return]

        var pos = this.getCharPosFromXY(e.getX() - this.margin, e.getY() - this.margin);

        if (pos != -1) {
            this.cursorCharPos = pos;
            this.selCharPos2 = pos;
            this.updateCursor();
        } else {
            this.resetSelection();
        }

    }

TextBox.prototype.mouseEndDragged = function( /* MouseEvent */ e) {

        if (this.styledMode) return;

        var pos = this.getCharPosFromXY(e.getX() - this.margin, e.getY() - this.margin);

        if (pos != -1) {
            this.cursorCharPos = pos;
            this.selCharPos2 = pos;
            this.updateCursor();
        } else {
            this.resetSelection();
        }

    }

TextBox.prototype.mouseReleased = function( /* MouseEvent */ e) {}
TextBox.prototype.mouseEntered = function( /* MouseEvent */ e) {}
TextBox.prototype.mouseExited = function( /* MouseEvent */ e) {}
TextBox.prototype.mouseMoved = function( /* MouseEvent */ e) {}

TextBox.prototype.keyPressed = function( /* KeyEvent */ event) {}

TextBox.prototype.keyTyped = function( /* KeyEvent */ event) {
        var code = event.getKeyChar();
        if (!event.isControlDown() && !event.isAltDown() && code != VK_BACK_SPACE && code != VK_ENTER &&
            code != VK_DOWN && code != VK_UP && code != VK_HOME && code != VK_END && code != VK_LEFT &&
            code != VK_RIGHT && code != VK_DELETE && code != VK_INSERT && code <= 0xFF) {
            this.insertTextConsiderSelection(String.fromCharCode(event.getKeyChar()));
            this.updateCursor();
        } // if code
    }

TextBox.prototype.keyReleased = function( /* KeyEvent */ event) {

        var code = event.getKeyCode();
        var temp = this.getText();
        switch (code) {

            case VK_SPACE:
                this.resetSelection();
                break;
            case VK_ENTER:
                this.resetSelection();
                break;
            case VK_BACK_SPACE:
                if (this.isSelection()) {
                    this.deleteText(this.selStartCharPos(), this.selEndCharPos() - this.selStartCharPos());
                    this.cursorCharPos = this.selStartCharPos();
                    this.resetSelection();
                } else if (this.cursorCharPos > 0) {
                    this.deleteText(this.cursorCharPos - 1, 1);
                    this.cursorCharPos--;
                }
                break;
            case VK_DELETE:
                if (this.isSelection()) {
                    // Copy to Clipboard if shift key is pressed
                    if (event.isShiftDown())
                        clipboard.setData(this.getText().substring(this.selStartCharPos(), this.selEndCharPos()));
                    this.deleteText(this.selStartCharPos(), this.selEndCharPos() - this.selStartCharPos());
                    this.cursorCharPos = this.selStartCharPos();
                    this.resetSelection();
                } else
                    this.deleteText(this.cursorCharPos, 1);
                break;
                VK_INSERT
            case VK_INSERT:
                if (event.isShiftDown() && clipboard.getData() != null)
                    this.insertTextConsiderSelection(clipboard.getData());
                else
                if (!this.insertMode) {
                    this.insertMode = true
                } else {
                    this.insertMode = false;
                }
                break;
                /* Ctrl+A : Select All */
            case VK_A:
                if (event.isControlDown()) {
                    this.selCharPos1 = 0;
                    this.selCharPos2 = this.text.length;
                }
                break;
                /* Ctrl+C : Copy */
            case VK_C:
                if (event.isControlDown() && this.isSelection())
                    clipboard.setData(this.getText().substring(this.selStartCharPos(), this.selEndCharPos()));
                break;
                /* Ctrl+X : Cut  */
            case VK_X:
                if (event.isControlDown() && this.isSelection()) {
                    clipboard.setData(this.getText().substring(this.selStartCharPos(), this.selEndCharPos()));
                    this.deleteText(this.selStartCharPos(), this.selEndCharPos() - this.selStartCharPos());
                    this.cursorCharPos = this.selStartCharPos();
                    this.resetSelection();
                }
                break;
                /* Ctrl+V : Past */
            case VK_V:
                if (event.isControlDown() && clipboard.getData() != null)
                    this.insertTextConsiderSelection(clipboard.getData());
                break;
            case VK_DOWN:
                this.moveCursorUpDown(this.cursorHeight, event.isShiftDown());
                break;
            case VK_UP:
                this.moveCursorUpDown(-this.cursorHeight, event.isShiftDown());
                break;
            case VK_HOME:
                this.homeKeyPressed(event.isShiftDown());
                break;
            case VK_END:
                this.endKeyPressed(event.isShiftDown());
                break;
            case VK_LEFT:
                this.moveCursorLeftRight(-1, event.isShiftDown());
                break;
            case VK_RIGHT:
                this.moveCursorLeftRight(1, event.isShiftDown());
                break;
        }
        this.updateCursor();
    }

TextBox.prototype.selectAll = function(event) {
        this.selCharPos1 = 0;
        this.selCharPos2 = this.text.length;
        this.updateCursor();
    }

TextBox.prototype.gainFocus = function() {
        this.gainFocusTextBox();
    }

TextBox.prototype.gainFocusTextBox = function() {
        this.gainFocusCanvas();
        if (this.cursorShape != null)
            if (this.insertMode) this.cursorShape.setOpacity(0.4);
            else this.cursorShape.setOpacity(1);
    }

TextBox.prototype.lostFocus = function() {
        this.lostFocusTextBox();
    }

TextBox.prototype.lostFocusTextBox = function() {
        this.lostFocusCanvas();
        if (this.cursorShape != null)
            this.cursorShape.setOpacity(0);
        this.resetSelection(); // Because the way we support focus this might not be working as it's supposed to.
    }

TextBox.prototype.setFontSize = function( /* Size in pt*/ size) {
        this.font.setSize(size);
        this.setFont(this.font);
    }

TextBox.prototype.getFontSize = function() {
        return this.font.getSizeValue();
    }

TextBox.prototype.setFont = function( /* Font */ font) {

        this.font = font;

        if (this.contentg == null) return;

        this.contentg.setFont(font);

        var fm = font.getFontMetrics();
        this.cursorHeight = fm.getHeight();

        var temp = this.text;
        this.setText("A"); // We do this to ensure that the textShape object is always has text even when it has been empty.
        // Then we restore the original text.

        if (this.textShape != null)
            this.textShape.setFont(font);

        // Calculate the width of the cursor caret
        var fm = this.getFont().getFontMetrics();
        this.cursorWidth = fm.getStringWidth("i") / 4;

        // Get THE REAL baseline,.. 
        this.cursorBaseline = this.textShape.getNode().getStartPositionOfChar(0).y;
        this.cursorShape.setSize(this.cursorWidth, this.cursorHeight);

        this.setSize(this.w, this.h);
        this.setText(temp);
        this.cursorCharPos = 0;

        this.updateCursor();
    }

TextBox.prototype.setmargin = function( /* int */ margin) {

        this.margin = margin;

        if (this.multiLine) {
            if (this.tv != null) {
                this.tv.translate(this.margin, this.margin);
                this.tv.setSize(this.w - (this.margin * 2), this.h - (this.margin * 2));
            }
        } else {
            if (this.textShape != null) {
                this.textShape.translate(this.margin, this.margin);
                this.setSize(this.w, 0);
            }
        }
        this.setText(this.getText());
        this.updateCursor();
    }

TextBox.prototype.onResize = function() {

        // Fix the height for single line Textbox
        if (!this.multiLine) this.h = this.cursorHeight + (this.margin * 2);

        this.onResizeCanvas();

        if (this.border != undefined && this.border != null)
            this.border.setSize(this.w, this.h);

        if (this.multiLine && this.tv != null)
            this.tv.setSize(this.w - (this.margin * 2), this.h - (this.margin * 2));

        this.setText(this.getText());
        this.updateCursor();
    }

TextBox.prototype.setStyledModeOff = function() {
        this.styledMode = false;
    }

TextBox.prototype.setStyledModeOn = function() {
        this.styledMode = true;
    }

TextBox.prototype.changeSelectionRectStyle = function( /* Color */ color, /* Color */ strokeColor, /* int */ strokeWidth) {

        this.selectionColor = color;
        this.selectionStrokeColor = strokeColor;
        this.selectionStrokeWidth = strokeWidth;

        this.sg.setColor(this.selectionColor);
        this.sg.setStrokeColor(this.selectionStrokeColor);
        this.sg.setStrokeWidth(this.selectionStrokeWidth);

    }

TextBox.prototype.getPreferredSize = function( /* int */ cols) {
    // Summary:
    // Gets the preferred size of this component.

        if (cols == undefined) return this.getSize();
        var fm = this.getFont().getFontMetrics();
        var str = "";
        for (var i = 0; i < cols; i++) str += "M";
        return new Dimension(fm.getStringWidth(str), this.h);
    }

TextBox.prototype.toString = function() {
    return this.className + " [ caption: " + this.caption + ", name: " + this.name + "]";
}
/**
 * Swing.svg : ComboBox
 *
 * @author    Adnan Sagar, PhD <adnan@websemantics.ca>
 * @copyright 2004-2015 Web Semantics, Inc. (http://websemantics.ca)
 * @license   http://www.opensource.org/licenses/mit-license.php MIT
 * @since     27th July 2005
 * @package   websemantics/oea/swing.svg
 */

/**
 * Class ComboBox
 */

ComboBox.prototype = new Container();
//
function ComboBox( /* int */ x, /* int */ y, /* int */ w, /* int */ h, /* String */ name) {
        var argv = ComboBox.arguments;
        var argc = ComboBox.length;
        /* String    */
        this.name = "ComboBox";
        /* String    */
        this.className = "ComboBox";
        /* Graphics  */
        this.cg = null;
        /* Graphics  */
        this.contentg = null;
        /* Graphics  */
        this.screen = null;
        /* Button    */
        this.button = null;
        /* Component */
        this.comp = null; // this is the currently selected component
        /* PopUpMenu */
        this.menu = null;

        if (argv.length > 0) 
        	this.initComboBox(x, y, w, h, name);
    }

ComboBox.prototype.initComboBox = function(x, y, w, h, name) {
        this.addInternalMouseMotionListener(mousePressed, "comboBoxMousePressed");
        this.initContainer(x, y, w, h, name);
        this.setBackground("white");
        this.button = this.add(new Button(0, 0, 40, 40, "drop"));
        this.initilizeList();
        this.setLayout(new BoxLayout(Y_AXIS, RIGHT, TOP, 0));
        this.setInsets(7, 2, 2, 2);
    }

ComboBox.prototype.initilizeList = function() {
        this.menu = this.add(new PopUpMenu(0, 0, 0, 0));
        this.menu.setFont(this.font);
        this.menu.setBackground(this.getBackground());

        // change the drawBorder method of the List
        this.menu.drawBorder = function( /* Graphics */ g) {
            g.setColor("none");
            g.setStrokeColor("black");
            g.setStrokeWidth(1);
            return g.drawRect(0, 0, this.w, this.h);
        }
        this.menu.setBackground(this.getBackground());
        this.menu.addActionListener(this);
        this.menu.setAbsolutePosition(true);
    }

ComboBox.prototype.changeMenuType = function( /* PopUpMenu */ menu) {
        this.remove(this.menu);
        this.menu = this.add(menu);
        this.menu.setFont(this.font);
        this.menu.setBackground(this.getBackground());
        this.menu.addActionListener(this);
        this.menu.setAbsolutePosition(true);
    }

ComboBox.prototype.createSVGContent = function() {
        this.createSVGContentComboBox();
    }

ComboBox.prototype.createSVGContentComboBox = function() {
        this.createSVGContentContainer();
        this.contentg = this.getGraphics();
        this.screen = this.getGraphics();
        this.screen.translate(this.left, this.top);
        this.cg = this.getGraphics();
        this.border = this.cg.drawWinBorder(0, 0, this.w, this.h);
        this.border.setAttribute('shape-rendering', 'optimizeSpeed');
        this.border.setFaceDown();
        this.paintChildren(this.contentg);
        // Attach the list to the menuLayer,..
        menuLayer.addGraphics(this.menu);
        this.menu.hide();
        var g = this.button.getGraphics();
        this.button.triangle = g.drawPolygon(0, 0);
        this.glassPaneOn();
        this.enableMouseListener();
        this.enableMouseMotionListener();
    }

ComboBox.prototype.setFont = function( /* Font */ font) {
        this.font = font;
        if (this.menu != null) this.menu.setFont(this.font);
    }

ComboBox.prototype.addComponent = function( /* Component */ comp) {
        this.menu.addComponentItem(comp);
    }

ComboBox.prototype.addTextItem = function( /* String */ text) {
        var l = new Label(0, 0, 0, 0, text, text);
        l.className = "Item";
        l.setFont(this.font);
        this.addComponent(l);
    }

ComboBox.prototype.addTextIconItem = function( /* String */ text, /* String */ fn, /* int */ w, /* int */ h) {
        var icon = null;
        if (fn != undefined) icon = new Icon(fn, w, h);
        var l = new Label(0, 0, 0, 0, text, text, icon);
        l.className = "Item";
        l.setFont(this.font);
        this.addComponent(l);
    }

ComboBox.prototype.recalc = function() {
        this.recalcComboBox();
    }

ComboBox.prototype.recalcComboBox = function() {
        this.recalcContainer();

        // Get the size of an item in the list to resize the ComboBox accordingly
        var dim = this.menu.getItemDimension();

        var w = dim.getHeight();
        var h = dim.getHeight();

        this.button.setSize(w, h);

        var xx = new Array();
        var yy = new Array();
        xx[0] = w / 3;
        xx[1] = w - w / 3;
        xx[2] = w / 2;
        yy[0] = h / 3;
        yy[1] = h / 3;
        yy[2] = h - h / 3;
        this.button.triangle.setXYPoints(xx, yy);

        //this.setSize(this.menu.getWidth()+this.button.getWidth(),fComp.getHeight()+this.top+this.bottom); // OLD [delete]
        this.setSize(dim.getWidth() + this.button.getWidth() + this.left + this.right, this.button.getHeight() + this.top + this.bottom);

        this.menu.setLocation(0.5, this.h);

        this.displayComponent(this.menu.getFirstItem());
    }

ComboBox.prototype.onResize = function() {
        this.onResizeComboBox();
    }

ComboBox.prototype.onResizeComboBox = function() {
        this.onResizeContainer();
        if (this.border != null) this.border.setSize(this.w, this.h);
    }

ComboBox.prototype.comboBoxMousePressed = function( /* MouseEvent */ e) {
    // Summart:
    // Because the menu click event is delivered after the desktop event is excuted then the menu will show.

        /* Point */
        var p = this.getAbsoluteLocation();
        this.menu.setLocation(p.x + 1, p.y + this.h);
        this.menu.show();
    }

ComboBox.prototype.displayComponent = function( /* Component */ d) {
        var clone = d.g.getNode().cloneNode(true);
        this.g.getNode().replaceChild(clone, this.screen.getNode());
        this.screen.setNode(clone);
        this.screen.translate(this.left, this.top);
        this.comp = d;
    }

ComboBox.prototype.getCurrentComponent = function() {
        return this.comp;
    }

ComboBox.prototype.changeToText = function( /* String */ text) {
    var ll = new Label(0, 0, 0, 0, "lb_text", text);
    ll.setFont(this.getFont());
    ll.paint();
    this.displayComponent(ll);
    ll.dispose();
}

ComboBox.prototype.actionPerformed = function( /* ActionEvent */ e) {

    var src = e.source;
    var comm = e.getActionCommand();

    this.displayComponent(src);
    this.menu.hide();

    /* ActionEvent */
    var aevt = new ActionEvent(this, "itemClicked", e);
    // Action Listeners 
    if (this.actionListeners != null) {
        var k = new Enumerator(this.actionListeners);
        while (k.hasMoreElements())
        /* ActionListener */
            k.nextElement().actionPerformed(aevt);
    }
}
/**
 * Swing.svg : Spin
 *
 * @author    Adnan Sagar, PhD <adnan@websemantics.ca>
 * @copyright 2004-2015 Web Semantics, Inc. (http://websemantics.ca)
 * @license   http://www.opensource.org/licenses/mit-license.php MIT
 * @since     17th November 2004
 * @package   websemantics/oea/swing.svg
 */
Spin.prototype = new Panel();

function Spin(x, y, name, format, value) {
        var argv = Spin.arguments;
        var argc = Spin.length;
        /* String */
        this.name = "Spin";
        /* String */
        this.className = "Spin";

        // This is used to allocate spaces and determined the width, i.e. 00000
        /* String */
        this.format = null;

        /* int */
        this.value = 0;
        /* int */
        this.dinc = 1;
        /* int */
        this.min = 0;
        /* int */
        this.max = 100;
        /* Label */
        this.label = null;
        /* Button */
        this.upButton = null;
        /* Button */
        this.downButton = null;
        /* Shape */
        this.border = null;
        /* Graphics */
        this.contentg = null;

        if (argv.length > 0) 
        	this.initSpin(x, y, name, format, value);
    }

Spin.prototype.initSpin = function(x, y, name, format, value) {
        this.initPanel(x, y, 10, 10);
        this.setValue(value);
        if (name != undefined) this.name = name;
        else name = this.getComponentId();
        if (format != undefined) this.format = format;
        else format = "000";
        this.setBackground("white");
        // Add internal Components
        this.upButton = new Button(0, 0, 0, 0, "upButton");
        this.downButton = new Button(0, 0, 0, 0, "downButton");
        this.label = new Label(0, 0, 0, 0, "screen", this.value);
        this.upButton.setAbsolutePosition(true);
        this.downButton.setAbsolutePosition(true);
        this.label.setAbsolutePosition(true);
        this.add(this.label);
        this.add(this.upButton);
        this.add(this.downButton);
        this.upButton.addActionListener(this);
        this.downButton.addActionListener(this);
    }

Spin.prototype.setMinMax = function( /* int */ min, /* int */ max) {
        this.min = min;
        this.max = max;
        this.setValue(this.value);
    }

Spin.prototype.setValue = function( /* int */ v) {
        if (v == undefined) v = 0;
        if (v > this.max) v = this.max;
        if (v < this.min) v = this.min;
        this.value = v;
        if (this.label != null)
            this.label.setText(this.value);
        this.notifyListeners();
    }

Spin.prototype.getValue = function() {
        return this.value;
    }

Spin.prototype.getMin = function() {
        return this.min;
    }

Spin.prototype.getMax = function() {
        return this.max;
    }

Spin.prototype.changeInc = function( /* int */ dx) {
        if (dx == undefined) dx = 1;
        this.dinc = dx;
    }

Spin.prototype.inc = function( /* int */ dx) {
        if (dx == undefined) dx = this.dinc;
        this.setValue(this.value += dx);
    }

Spin.prototype.dec = function( /* int */ dx) {
        if (dx == undefined) dx = this.dinc;
        this.setValue(this.value -= dx);
    }

Spin.prototype.createSVGContent = function() {
        this.createSVGContentSpin();
    }

Spin.prototype.createSVGContentSpin = function() {
        this.createSVGContentPanel();
        this.label.setFont(this.getFont());
        this.contentg = this.getGraphics();
        this.paintChildren(this.contentg);
        this.border = this.contentg.drawStepBorder(0, 0, this.w, this.h);
        this.border.setFaceDown();
        // Draw arrows on the buttons
        var g = this.upButton.getGraphics();
        this.upButton.triangle = g.drawPolygon(0, 0);
        g = this.downButton.getGraphics();
        this.downButton.triangle = g.drawPolygon(0, 0);
    }

Spin.prototype.onResize = function() {
        this.onResizeSpin();
    }

Spin.prototype.onResizeSpin = function() {
        this.onResizePanel();
        if (this.border != null) this.border.setSize(this.w - this.h / 2, this.h);
    }

Spin.prototype.recalc = function() {
        this.recalcSpin();
    }

Spin.prototype.recalcSpin = function() {
        //this.recalcPanel();

        this.label.setText(this.format);
        this.label.recalc();
        this.label.setLocation(this.left, this.top);
        var h = this.label.getHeight() + this.top + this.bottom;
        var w = this.label.getWidth() + this.left + this.right + h / 2;
        this.setSize(w, h);

        h = this.h / 2;

        this.upButton.setLocation(w - h, 0);
        this.downButton.setLocation(w - h, h);

        this.label.setText(this.value);

        this.upButton.setSize(h, h);
        this.downButton.setSize(h, h);
        // Draw arrows on the buttons
        w = h;
        h = h;
        var xx = new Array();
        var yy = new Array();
        xx[0] = w / 3;
        xx[1] = w - w / 3;
        xx[2] = w / 2;
        yy[0] = h - h / 3;
        yy[1] = h - h / 3;
        yy[2] = h / 3;
        this.upButton.triangle.setXYPoints(xx, yy);
        xx[0] = w / 3;
        xx[1] = w - w / 3;
        xx[2] = w / 2;
        yy[0] = h / 3;
        yy[1] = h / 3;
        yy[2] = h - h / 3;
        this.downButton.triangle.setXYPoints(xx, yy);

        this.notifyListeners();
    }

Spin.prototype.actionPerformed = function( /* ActionEvent */ e) {
        var src = e.source;
        var comm = e.getActionCommand();
        if (src == this.upButton) this.inc();
        if (src == this.downButton) this.dec();
    }

Spin.prototype.notifyListeners = function() {

    /* ActionEvent */
    var aevt = new ActionEvent(this, "valueChanged", null);

    // Action Listeners 
    if (this.actionListeners != null) {
        var k = new Enumerator(this.actionListeners);
        while (k.hasMoreElements())
        /* ActionListener */
            k.nextElement().actionPerformed(aevt);
    }
}
/**
 * Swing.svg : ColorComboBox
 *
 * @author    Adnan Sagar, PhD <adnan@websemantics.ca>
 * @copyright 2004-2015 Web Semantics, Inc. (http://websemantics.ca)
 * @license   http://www.opensource.org/licenses/mit-license.php MIT
 * @since     28th July 2005
 * @package   websemantics/oea/swing.svg
 */

/**
 * Classes: ColorBox , ColorList and ColorComboBox
 *
 * The PopUp part of the ComboBox is using a Flow Layout Manager and accepting 
 * components of type ColorBox (below). 
 * 
 */

/**
 * 
 * Class ColorBox
 * 
 */

ColorBox.prototype = new Canvas();

function ColorBox(x, y, w, h, color, bkColor) {
        var argv = ColorBox.arguments;
        var argc = ColorBox.length;
        /* String */
        this.name = "ColorBox";
        /* String */
        this.className = "ColorBox";
        /* Color */
        this.color = "red";
        /* Shape */
        this.rect = null;
        /* Shape */
        this.border = null;
        /* Graphics */
        this.contentg = null;

        if (argv.length > 0) 
        	this.initColorBox(x, y, w, h, color, bkColor);
    }

ColorBox.prototype.initColorBox = function(x, y, w, h, color, bkColor) {
        this.initCanvas(x, y, w, h);
        this.setInsets(2, 2, 2, 2);
        this.setColor(color);
        if (bkColor == undefined) bkColor = "white";
        this.color = color;
        this.setBackground(this.bkColor);
    }

ColorBox.prototype.getColor = function() {
        return this.color;
    }

ColorBox.prototype.setColor = function( /* Color */ color) {
        if (color == undefined) color = "none";
        this.color = color;
    }

ColorBox.prototype.setTextColor = function() {
	// To make combatable with Label compoenent so it works with the ComboBox and PopUpMenu
}

ColorBox.prototype.highlightOff = function() {
	// To make combatable with Label compoenent so it works with the ComboBox and PopUpMenu
}

ColorBox.prototype.createSVGContent = function() {
        this.createSVGContentColorBox();
    }

ColorBox.prototype.createSVGContentColorBox = function() {
        this.createSVGContentCanvas();
        this.contentg = this.getGraphics();
        this.contentg.setColor(this.color);
        if (this.color != "none") {
            this.rect = this.contentg.drawRect(this.left, this.top, this.w - this.left - this.right, this.h - this.top - this.bottom);
        } else { // Draw a cross
            this.contentg.setStrokeColor("red");
            this.contentg.setStrokeWidth(4);
            this.contentg.drawLine(this.left, this.top, this.w - this.left - this.right, this.h - this.top - this.bottom);
            this.contentg.drawLine(this.w - this.left - this.right, this.top, this.left, this.h - this.top - this.bottom);
        }
        this.rootg.setAttribute('shape-rendering', 'optimizeSpeed'); //shape-rendering ( auto | optimizeSpeed | crispEdges | geometricPrecision | inherit )
    }

/**
 * 
 * Class ColorlList
 * 
 */

ColorlList.prototype = new PopUpMenu();

function ColorlList( /* int */ x, /* int */ y, /* int */ w, /* int */ h) {
        var argv = ColorlList.arguments;
        var argc = ColorlList.length;
        /* String */
        this.className = "ColorlList";
        /* String */
        this.name = "ColorlList";
        /* int    */
        this.itemWidth = 25;
        /* int    */
        this.itemHeight = 25;
        /* int    */
        this.colNum = 0; // Number of Coulmns (depends of width and itemWidth)
        /* int    */
        this.rowNum = 0; // Number of Rows (depends of height and itemHeight)
        /* Shape    */
        this.selRect = null; // Selecion Rectangle
        /* Array */
        this.colors = new Array("#000000", "#202020", "#404040", "#808080", "#C0C0C0", "#FFFFFF", "#030031", "#07024C", "#0A036B", "#003270", "#006667", "#009965", "#340067", "#680398", "#683496", "#6A6995", "#669899", "#6CC29B", "#330000", "#343201", "#356500", "#349803", "#33CC00", "#31FE01", "#690000", "#673500", "#6A6B0D", "#6B9407", "#65CC01", "#63FF00", "#990001", "#9F3304", "#995E00", "#9B9500", "#97CC00", "#9BFF00", "#CF0001", "#C83708", "#C7680A", "#CF9903", "#D1CC00", "#C9FB01", "#FE0000", "#FE0000", "#FE6601", "#FC9A05", "#FFFF00", "none");
        /* Color    */
        this.curColor = this.colors[0]; // Current Color
        
        if (argv.length > 0) 
        	this.initColorlList(x, y, w, h);
    }

ColorlList.prototype.initColorlList = function(x, y, w, h) {
        this.initPopUpMenu(x, y, w, h);
        this.setLayout(new FlowLayout(LEFT, 0, 0));
        this.setInsets(3, 3, 4, 4);
        this.setBackground("black");
        this.selRectColor = "white";
    }

ColorlList.prototype.createSVGContent = function() {
        this.createSVGContentColorlList();
    }

ColorlList.prototype.createSVGContentColorlList = function() {
        this.createSVGContentPopUpMenu();
        var g = this.getGraphics();

        this.colNum = parseInt(this.getWidth() / this.itemWidth);
        this.rowNum = parseInt(this.getHeight() / this.itemHeight);
        var colorCount = 0;

        var x;
        var y;
        for (var j = 0; j < this.rowNum; j++) {
            for (var i = 0; i < this.colNum; i++) {
                g.setColor(this.colors[colorCount]);
                x = i * this.itemWidth + this.left;
                y = j * this.itemHeight + this.top;
                g.drawRect(x, y, this.itemWidth, this.itemHeight);
                colorCount++;
            }
        }

        // Draw a cross
        var m = 4;
        g.setStrokeColor("red");
        g.setStrokeWidth(4);
        x += 2;
        y += 2;
        g.drawLine(x + m, y + m, x + this.itemWidth - m * 2, y + this.itemHeight - m * 2);
        g.drawLine(x + this.itemWidth - m * 2, y + m, x + m, y + this.itemHeight - m * 2);


        g.setStrokeColor("white");
        g.setStrokeWidth(2);
        g.setColor("none");
        this.selRect = g.drawRect(this.left, this.top, this.itemWidth, this.itemHeight);
        this.selRect.setVisibility(false);


    }

ColorlList.prototype.drawBorder = function( /* Graphics */ g) {
        var border = g.drawStepBorder(0, 0, this.w, this.h);
        return border;
    }

ColorlList.prototype.popUpMenuMouseMoved = function( /* MouseEvent */ e) {
        this.selRect.setVisibility(true);
        var hi = parseInt(e.getX() / this.itemWidth);
        var vi = parseInt(e.getY() / this.itemHeight);
        if (hi > (this.colNum - 1)) hi = this.colNum - 1;
        if (vi > (this.rowNum - 1)) vi = this.rowNum - 1;
        this.selRect.translate(hi * this.itemWidth + this.left, vi * this.itemHeight + this.top);
    }

ColorlList.prototype.popUpMenuMousePressed = function( /* MouseEvent */ e) {
    // Summary:
    // Because the menu click event is delivered after the desktop event is excuted then the menu will show.

        if (e.source != this) return;

        var hi = parseInt(e.getX() / this.itemWidth);
        var vi = parseInt(e.getY() / this.itemHeight);
        if (hi > (this.colNum - 1)) hi = this.colNum - 1;
        if (vi > (this.rowNum - 1)) vi = this.rowNum - 1;

        var i = hi + vi * this.colNum;

        this.curColor = this.colors[i];


        this.show();

        var aevt = new ActionEvent(this, "menuItemSelected", e);
        // Action Listeners 
        if (this.actionListeners != null) {
            var k = new Enumerator(this.actionListeners);
            while (k.hasMoreElements()) {
                k.nextElement().actionPerformed(aevt);

            }
        }

        this.selRect.setVisibility(false);
        this.hide();
    }

ColorlList.prototype.recalc = function() {
        this.recalcColorlList();
    }

ColorlList.prototype.recalcColorlList = function() {
        this.recalcContainer();
    }

ColorlList.prototype.getItemDimension = function() {
        return new Dimension(this.itemWidth, this.itemHeight);
    }

ColorlList.prototype.getFirstItem = function() {
    // Summary:
    // getFirstItem: this component does not have any children

        return this;
    }

ColorlList.prototype.getColor = function() {
        return this.curColor;
    }

/**
 * 
 * Class ColorComboBox
 * 
 */

ColorComboBox.prototype = new ComboBox();

function ColorComboBox( /* String */ name) {
        var argv = ColorComboBox.arguments;
        var argc = ColorComboBox.length;
        /* String    */
        this.name = "ColorComboBox";
        /* String    */
        this.className = "ColorComboBox";
        
        if (argv.length > 0) 
        	this.initColorComboBox(name);
    }

ColorComboBox.prototype.initColorComboBox = function(name) {
        this.initComboBox(0, 0, 0, 0, name);
        this.setBackground("black");
        this.changeMenuType(new ColorlList(0, 0, 155, 205));
        this.setInsets(2, 2, 2, 2);
    }

ColorComboBox.prototype.changeToColor = function( /* Color */ color) {
        this.rootg.setBackground(color)
    }

ColorComboBox.prototype.displayComponent = function( /* ColorlList */ cl) {
        this.changeToColor(cl.getColor());
    }

ColorComboBox.prototype.getCurrentComponent = function() {
        return this.menu;
    }

ColorComboBox.prototype.getColor = function() {
    return this.getCurrentComponent().getColor();
}
/**
 * Swing.svg : Window
 *
 * @author    Adnan Sagar, PhD <adnan@websemantics.ca>
 * @copyright 2004-2015 Web Semantics, Inc. (http://websemantics.ca)
 * @license   http://www.opensource.org/licenses/mit-license.php MIT
 * @since     11th Feb 2005 -> 28th July 2005
 * @package   websemantics/oea/swing.svg
 */

Window.prototype= new Panel(); 

function Window(x, y, w, h, title, icon, closeButtonFlag) { // Implements ActionListener
        var argv = Window.arguments;
        var argc = Window.length;

        /* String   */
        this.name = "Window";
        /* String   */
        this.className = "Window";
        /* Graphics */
        this.sking = null; // Used by the WindowSkin
        /* Graphics */
        this.contentg = null; // Used to draw the content
        /* WindowSkin */
        this.windowSkin = null;
        /* int */
        this.edgeWidth = 5; // Used to change the mouse cursor when it's at the window edges
        /* Boolean */
        this.fixedSize = false; // If true, the window can not be resized
        /* String */
        this.title = null;
        /* icon */
        this.icon = null;
        /* int */
        this.titleRectHeight = 18;
        /* int */
        this.minWidth = 70;
        /* int */
        this.minHeight = 70;
        /* Component */
        this.closeBut = null;
        /* Boolean */
        this.closeButtonFlag = true; // If true, display close button
        /* Boolean */
        this.active = false; // If true, the window is active
        /* int */
        this.execludedMovingAreaWidth = 0; // the area taken by the buttons
        /* boolean */
        this.recalcInsets = true; // 
        
        if (argv.length > 0) 
          this.initWindow(x, y, w, h, title, icon, closeButtonFlag);
    }

Window.prototype.initWindow = function(x, y, w, h, title, icon, closeButtonFlag) {
        if (closeButtonFlag != undefined) this.closeButtonFlag = closeButtonFlag;
        if (title == undefined) title = "Untitled: ";
        this.title = title;
        if (icon != undefined) this.icon = icon;
        //this.windowSkin=new SimpleWindowSkin();
        this.windowSkin = new DefaultWindowSkin();
        this.enableMouseListener();
        this.enableMouseMotionListener();
        this.addInternalMouseMotionListener(mouseStartDragged, "winMouseStartDragged");
        this.addInternalMouseMotionListener(mouseDragged, "winMouseDragged");
        this.addInternalMouseMotionListener(mouseMoved, "winMouseMoved");
        this.addInternalMouseMotionListener(mouseClicked, "winMouseClicked");
        this.addInternalMouseMotionListener(mousePressed, "winMousePressed");
        ds_addEventListener(this, "mousedown", "desktopMouseClick");
        this.initContainer(x, y, w, h); // The container is intilized here to let the mouse listeners run after the window ones, so
        
        // mouse events of its childeren get executed afterwards.
        ds_addEventListener(this, "click", "desktopMouseClick");
        this.setInsets(3, 3, 3, 3);
        this.setFont(new Font("Helvetica", "normal", "10pt"));

        if (this.closeButtonFlag) {
            this.closeBut = this.add(new Button(0, 0, 20, 20, "closeBut"));
            this.closeBut.addActionListener(this);
            this.closeBut.setAbsolutePosition(true);
        }

    }

Window.prototype.changeSkin = function( /* WindowSkin */ skin) {
        if (!this.created)
            this.windowSkin = skin;
        else {
            this.sking.oldClear();
            this.contentg.oldClear();
            this.windowSkin = skin;
            this.createSVGContent();
        }
    }

Window.prototype.paint = function( /* Graphics */ g) {
        this.paintWindow(g);
    }

Window.prototype.paintWindow = function( /* Graphics */ g) {
        this.paintPanel(g);
    }

Window.prototype.createSVGContent = function() {
        this.createSVGContentWindow();
    }

Window.prototype.createSVGContentWindow = function() {
        this.createSVGContentContainer();
        this.sking = this.getGraphics();
        this.contentg = this.getGraphics();
        this.windowSkin.createSVGContent(this);
        this.paintChildren(this.contentg);
        if (this.closeBut != null) {
            var g = this.closeBut.getGraphics();
            g.setStrokeColor("black");
            g.setStrokeWidth(1);
            this.closeBut.line1 = g.drawLine(0, 0, 0, 0);
            this.closeBut.line2 = g.drawLine(0, 0, 0, 0);
        }
        this.glassPaneOn();
        this.enableMouseListener();
        this.enableMouseMotionListener();
    }

Window.prototype.onResize = function() {
        this.onResizeWindow();
    }

Window.prototype.onResizeWindow = function() {
        //this.onResizePanel(); [Skip the Container resize]
        if (this.w < this.minWidth) this.w = this.minWidth;
        if (this.h < this.minHeight) this.h = this.minHeight;
        this.onResizeCanvas();
        this.windowSkin.setSize(this.w, this.h);
        if (this.closeBut != null)
            this.closeBut.setLocation(this.w - this.closeBut.w - this.windowSkin.borderWidth * 2, this.windowSkin.borderWidth * 2);
    }

Window.prototype.onMove = function() {
        this.onMoveWindow();
    }

Window.prototype.onMoveWindow = function() {
        this.onMovePanel();
    }

Window.prototype.recalc = function() {
        this.recalcWindow();
    }

Window.prototype.recalcWindow = function() {
        if (this.windowSkin != null) {
            this.windowSkin.recalc();
            this.titleRectHeight = this.windowSkin.titleLabel.getHeight();
            if (this.recalcInsets) {
                this.setInsets(this.left, this.right, this.top + this.titleRectHeight, this.bottom);
                this.recalcInsets = false;
            }
            // Update the close button and its drawings
            if (this.closeBut != null) {
                this.closeBut.setSize(this.titleRectHeight - 6, this.titleRectHeight - 6);
                this.closeBut.setLocation(this.w - this.closeBut.w - this.windowSkin.borderWidth * 2, this.windowSkin.borderWidth * 2);
                var w = this.closeBut.w;
                var h = this.closeBut.h;
                var strokeWidth = w * 0.1
                var m = 0.8 * w;
                this.closeBut.line1.setAttribute('stroke-width', strokeWidth);
                this.closeBut.line2.setAttribute('stroke-width', strokeWidth);
                this.closeBut.line1.setPoint1(m, m);
                this.closeBut.line1.setPoint2(w - m, h - m);
                this.closeBut.line2.setPoint1(w - m, m);
                this.closeBut.line2.setPoint2(m, h - m);
                this.execludedMovingAreaWidth = this.closeBut.w + this.windowSkin.borderWidth * 2;
            }
        }
        this.recalcPanel();
    }

Window.prototype.setToFixedSize = function() {
        this.fixedSize = true;
    }

Window.prototype.getTitle = function() {
        return this.title;
    }

Window.prototype.getIcon = function() {
        return this.icon;
    }

Window.prototype.setMinSize = function(w, h) {
        this.minWidth = w;
        this.minHeight = h;
    }

Window.prototype.putWindowOnTop = function() {
    windowLayer.addGraphics(this); // Move window to the top
}

Window.prototype.winMousePressed = function( /* MouseEvent */ event) {

        if (this.windowSkin != null) {
            this.windowSkin.active();
            this.active = true;
        }

    }
Window.prototype.winMouseClicked = function( /* MouseEvent */ event) {

        this.winMousePressed(event);
        this.putWindowOnTop();
    }

Window.prototype.winMouseMoved = function( /* MouseEvent */ event) {
        //if(!this.active)return;
        var x = event.getX();
        var y = event.getY();
        var w = this.w;
        var h = this.h;
        var bw = this.edgeWidth;
        if (!this.fixedSize) {
            if (x < bw && y < bw) {
                this.setCursor("nw-resize");
                return
            }
            if ((x > bw && x < (w - bw)) && y < bw) {
                this.setCursor("n-resize");
                return
            }
            if ((x > (w - bw)) && y < bw) {
                this.setCursor("ne-resize");
                return
            }
            if (x < bw && (y > bw && y < (h - bw))) {
                this.setCursor("w-resize");
                return
            }
            if (x < bw && (y > (h - bw))) {
                this.setCursor("sw-resize");
                return
            }
            if ((x > (w - bw)) && (y > bw && y < (h - bw))) {
                this.setCursor("e-resize");
                return
            }
            if ((x > (w - bw)) && (y > (h - bw))) {
                this.setCursor("se-resize");
                return
            }
            if ((x > bw && x < (w - bw)) && (y > (h - bw))) {
                this.setCursor("s-resize");
                return
            }
        }
        if (y < this.titleRectHeight && x < this.w - this.execludedMovingAreaWidth) {
            this.setCursor("move");
            return;
        }
        this.setCursor("default");
    }

Window.prototype.winMouseStartDragged = function( /* MouseEvent */ event) {
        this.tempX = event.getX();
        this.tempY = event.getY();

        this.putWindowOnTop();
    }

Window.prototype.winMouseDragged = function( /* MouseEvent */ event) {
        var x = event.getX();
        var y = event.getY();
        var dragMode = this.getCursor();
        switch (dragMode) {
            case "n-resize":
                if (this.fixedSize) break;
                this.setSize(this.w, this.h - y);
                this.setLocation(this.x, this.y + y);
                break;
            case "w-resize":
                if (this.fixedSize) break;
                this.setSize(this.w - x, this.h);
                this.setLocation(this.x + x, this.y);
                break;
            case "e-resize":
                if (this.fixedSize) break;
                this.setSize(x, this.h);
                break;
            case "s-resize":
                if (this.fixedSize) break;
                this.setSize(this.w, y);
                break;
            case "nw-resize":
                if (this.fixedSize) break;
                this.setSize(this.w - x, this.h - y);
                this.setLocation(this.x + x, this.y + y);
                break;
            case "ne-resize":
                if (this.fixedSize) break;
                this.setSize(x, this.h - y);
                this.setLocation(this.x, this.y + y);
                break;
            case "sw-resize":
                if (this.fixedSize) break;
                this.setSize(this.w + (this.tempX - x), y);
                this.setLocation(this.x - this.tempX + x, this.y);
                break;
            case "se-resize":
                if (this.fixedSize) break;
                this.setSize(x, y);
                break;
            case "move":
                this.translate(this.x - this.tempX + x, this.y - this.tempY + y);
                break;
        }
    }

Window.prototype.desktopMouseClick = function(evt) {
        var r = new gRectangle(this.x, this.y, this.w, this.h);

        var matrix = document.rootElement.getScreenCTM();
        var scale = document.rootElement.currentScale;

        var x = parseInt((evt.screenX - matrix.e) / scale);
        var y = parseInt((evt.screenY - matrix.f) / scale);

        if (!r.contains(x, y))
            if (this.windowSkin != null) {
                this.windowSkin.inactive();
                this.active = false;
            }
    }

Window.prototype.show = function() {
        this.showWindow();
    }

Window.prototype.showWindow = function() {
        this.showComponent();
        this.putWindowOnTop();
    }

Window.prototype.actionPerformed = function( /* ActionEvent */ e) {
        this.actionPerformedWindow(e);
    }

Window.prototype.actionPerformedWindow = function( /* ActionEvent */ e) {

    var src = e.source;
    var comm = e.getActionCommand();

    if (comm == "buttonClicked") {
        switch (src) {
            //  case this.closeBut:this.dispose(); break;
            case this.closeBut:
                this.hide();
                break;
        }
    }
}