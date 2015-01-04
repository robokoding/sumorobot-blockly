blockly
=======

<img src="https://lh6.googleusercontent.com/-xXfCcqL_Zmk/VKbsCu-XyDI/AAAAAAAAJxU/chWyHsPw0JQ/w569-h287-no/blockly_sumorobot.png" alt="blockly" width="49%">
<img src="https://lh5.googleusercontent.com/-XHaMHrGOujI/VKlFvsZbCDI/AAAAAAAAJxw/ySdAVwUa8os/w969-h939-no/sumo.jpg" alt="blockly" width="49%">

blockly extensions for sumorobot programming

instrctions
===========

option 1
--------
* download blockly and closure
* copy the javascript files to the respective Blockly folders
* for existing languages append to the files
* copy this line to build.py and run it
```python
```
```bash
python build.py
```
* link the generated javascript to your application

option 2
--------
* link the javascript files directly to your application

optional
--------
* to add custom colors to your Blockly blocks
```javascript
Blockly.Block.prototype.setHSV = function(a, b, c) {
  this.colourHue_ = a;
  this.colourSaturation_ = b;
  this.colourValue_ = c;
  this.rendered&&this.updateColour()
};
Blockly.BlockSvg.prototype.updateColour = function(){
  if (!this.disabled){
    if (typeof(this.colourSaturation_) === 'undefined') {
      this.colourSaturation_ = Blockly.HSV_SATURATION;
      this.colourValue_ = 255 * Blockly.HSV_VALUE;
    }
    var a = goog.color.hsvToHex(this.getColour(), this.colourSaturation_, this.colourValue_);
    var b = goog.color.hexToRgb(a);
    var c = goog.color.lighten(b,.3);
    b = goog.color.darken(b,.4);
    this.svgPathLight_.setAttribute("stroke",goog.color.rgbArrayToHex(c));
    this.svgPathDark_.setAttribute("fill",goog.color.rgbArrayToHex(b));
    this.svgPath_.setAttribute("fill",a);
    c = this.getIcons();
    for (a = 0; a < c.length; a++)
      c[a].updateColour();
    for (a = 0; c = this.inputList[a]; a++)
      for (var b = 0,d; d = c.fieldRow[b]; b++)
        d.setText(null);
    this.rendered&&this.render()
  }
};
```
* then you can just use setHSV instead of setColour in your block init
```javascript
init: function() {
  this.setHSV(0, 1.00, 255*0.74);
  ...
}
```

credits ^_^
-----------
https://code.google.com/p/blockly/
