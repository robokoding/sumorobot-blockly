/**
 * @fileoverview Sumorobot blocks for Blockly.
 * @author info@robokoding.com (RoboKoding)
 */
'use strict';

goog.provide('Blockly.Blocks.sumorobot');

goog.require('Blockly.Blocks');

Blockly.Blocks['sumorobot_delay'] = {
  init: function() {
    this.setHelpUrl(Blockly.Msg.SUMOROBOT_DELAY_HELPURL);
    this.setColour("#E64C00");
    this.appendDummyInput()
      .appendField(Blockly.Msg.SUMOROBOT_DELAY_TITLE)
        .appendField(new Blockly.FieldTextInput('0',
          Blockly.FieldTextInput.numberValidator), 'DELAY');
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip(Blockly.Msg.SUMOROBOT_DELAY_TOOLTIP);
  }
};

Blockly.Blocks['sumorobot_move'] = {
  init: function() {
    var OPERATORS =
      [[Blockly.Msg.SUMOROBOT_MOVE_MSG_STOP, 'stop'],
       [Blockly.Msg.SUMOROBOT_MOVE_MSG_LEFT, 'left'],
       [Blockly.Msg.SUMOROBOT_MOVE_MSG_RIGHT, 'right'],
       [Blockly.Msg.SUMOROBOT_MOVE_MSG_FORWARD, 'forward'],
       [Blockly.Msg.SUMOROBOT_MOVE_MSG_BACKWARD, 'backward']];
    this.setHelpUrl(Blockly.Msg.SUMOROBOT_MOVE_HELPURL);
    this.setColour("#E60000");
    var dropdown = new Blockly.FieldDropdown(OPERATORS);
    this.appendDummyInput().appendField(dropdown, 'MOVE');
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip(Blockly.Msg.SUMOROBOT_MOVE_TOOLTIP);
  }
};

Blockly.Blocks['sumorobot_enemy'] = {
  init: function() {
    this.setHelpUrl(Blockly.Msg.SUMOROBOT_ENEMY_HELPURL);
    this.setColour("#0099E6");
    var dropdown = new Blockly.FieldDropdown(OPERATORS);
    this.appendDummyInput().appendField('ENEMY');
    this.setOutput(true, 'Boolean');
    this.setTooltip(Blockly.Msg.SUMOROBOT_ENEMY_TOOLTIP);
  }
};

Blockly.Blocks['sumorobot_line'] = {
  init: function() {
    var OPERATORS =
      [[Blockly.Msg.SUMOROBOT_LINE_MSG_LEFT, 'LINE_LEFT'],
       [Blockly.Msg.SUMOROBOT_LINE_MSG_FRONT, 'LINE_FRONT'],
       [Blockly.Msg.SUMOROBOT_LINE_MSG_RIGHT, 'LINE_RIGHT']];
    this.setHelpUrl(Blockly.Msg.SUMOROBOT_LINE_HELPURL);
    this.setColour("#E6BF00");
    var dropdown = new Blockly.FieldDropdown(OPERATORS);
    this.appendDummyInput().appendField(dropdown, 'LINE');
    this.setOutput(true, 'Boolean');
    this.setTooltip(Blockly.Msg.SUMOROBOT_LINE_TOOLTIP);
  }
};
