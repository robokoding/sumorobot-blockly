blockly
=======

![blockly](http://www.robokoding.com/assets/images/blockly.jpg)

blockly extensions for sumorobot programming

instrctions
===========

* download [blockly](https://developers.google.com/blockly/guides/get-started/web#get_the_code) and [closure](https://developers.google.com/blockly/guides/modify/web/closure#getting_closure)
* copy the javascript files to the respective Blockly folders
* append the language files to the end of the respective json files
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

credits ^_^
===========
* https://developers.google.com/blockly/
* https://developers.google.com/closure/
* https://github.com/code-dot-org/code-dot-org
