blockly
=======

<img src="https://lh6.googleusercontent.com/-xXfCcqL_Zmk/VKbsCu-XyDI/AAAAAAAAJxU/chWyHsPw0JQ/w569-h287-no/blockly_sumorobot.png" alt="blockly" height="200px">
<img src="https://lh5.googleusercontent.com/-XHaMHrGOujI/VKlFvsZbCDI/AAAAAAAAJxw/ySdAVwUa8os/w969-h939-no/sumo.jpg" alt="blockly" height="200px">

blockly extensions for sumorobot programming

instrctions
===========

option 1
--------
* download blockly and closure
* copy the javascript files to the respective Blockly folders
* for existing languages append to the files
* include the sumorobot generator in build.py and run it
```python
...
self.gen_generator('javascript')
self.gen_generator('sumorobot')
self.gen_generator('python')
...
```
```bash
python build.py
```
* link the generated javascript to your application

option 2
--------
* link the javascript files directly to your application

additional
----------
* the sumorobot toolbox
```html
<xml id="toolbox" style="display: none">
  <block type="controls_if"></block>
  <block type="sumorobot_move"></block>
  <block type="sumorobot_line"></block>
  <block type="sumorobot_enemy"></block>
</xml>
```

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
    var value = this.colourValue_;
    var saturation = this.colourSaturation_;
    var a = goog.color.hsvToHex(this.getColour(), saturation, value);
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
===========
* https://developers.google.com/blockly/
* https://developers.google.com/closure/
* https://github.com/code-dot-org/code-dot-org
