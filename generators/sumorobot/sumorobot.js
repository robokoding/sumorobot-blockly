/**
 * @fileoverview Generating sumorobot code for logic blocks.
 * @author info@robokoding.com (RoboKoding)
 */

'use strict';

goog.provide('Blockly.Sumorobot.sumorobot');

goog.require('Blockly.Generator');

Blockly.Sumorobot['controls_if'] = function(block) {
  // If/elseif/else condition.
  var n = 0;
  var argument = Blockly.Sumorobot.valueToCode(block, 'IF' + n,
      Blockly.Sumorobot.ORDER_NONE) || 'false';
  var branch = Blockly.Sumorobot.statementToCode(block, 'DO' + n);
  var code = 'if (' + argument + ') {\n' + branch + '}';
  for (n = 1; n <= block.elseifCount_; n++) {
    argument = Blockly.Sumorobot.valueToCode(block, 'IF' + n,
        Blockly.Sumorobot.ORDER_NONE) || 'false';
    branch = Blockly.Sumorobot.statementToCode(block, 'DO' + n);
    code += ' else if (' + argument + ') {\n' + branch + '}';
  }
  if (block.elseCount_) {
    branch = Blockly.Sumorobot.statementToCode(block, 'ELSE');
    code += ' else {\n' + branch + '}';
  }
  return code + '\n';
};

Blockly.Sumorobot['sumorobot_delay'] = function(block) {
  var code = "delay(" + parseFloat(block.getFieldValue('DELAY')) + ");\n";
  return code;
};

Blockly.Sumorobot['sumorobot_move'] = function(block) {
  var code = block.getFieldValue('MOVE') + "();\n";
  return code;
};

Blockly.Sumorobot['sumorobot_enemy'] = function(block) {
  var code = block.getFieldValue('ENEMY');
  return [code, Blockly.Sumorobot.ORDER_ATOMIC];
};

Blockly.Sumorobot['sumorobot_line'] = function(block) {
  var code = block.getFieldValue('LINE');
  return [code, Blockly.Sumorobot.ORDER_ATOMIC];
};
