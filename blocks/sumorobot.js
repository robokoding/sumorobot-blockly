/**
 * @license
 * Visual Blocks Editor
 *
 * Copyright 2012 Google Inc.
 * https://blockly.googlecode.com/
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * @fileoverview Arduino blocks for Blockly.
 * @author silver.kuusik@gmail.com (Silver Kuusik)
 */
'use strict';

goog.provide('Blockly.Blocks.sumorobot');

goog.require('Blockly.Blocks');

Blockly.Blocks['sumorobot_delay'] = {
  init: function() {
    this.setHelpUrl(Blockly.Msg.SUMOROBOT_DELAY_HELPURL);
    this.setColour(330);
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
      [[Blockly.Msg.SUMOROBOT_MOVE_MSG_FORWARD, 'forward'],
       [Blockly.Msg.SUMOROBOT_MOVE_MSG_BACKWARD, 'backward'],
       [Blockly.Msg.SUMOROBOT_MOVE_MSG_LEFT, 'left'],
       [Blockly.Msg.SUMOROBOT_MOVE_MSG_RIGHT, 'right'],
       [Blockly.Msg.SUMOROBOT_MOVE_MSG_STOP, 'stop']];
    this.setHelpUrl(Blockly.Msg.SUMOROBOT_MOVE_HELPURL);
    this.setColour(330);
    var dropdown = new Blockly.FieldDropdown(OPERATORS);
    this.appendDummyInput().appendField(dropdown, 'MOVE');
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip(Blockly.Msg.SUMOROBOT_MOVE_TOOLTIP);
  }
};

Blockly.Blocks['sumorobot_enemy'] = {
  init: function() {
    var OPERATORS =
      [[Blockly.Msg.SUMOROBOT_ENEMY_MSG_LEFT, 'ENEMY_LEFT'],
       [Blockly.Msg.SUMOROBOT_ENEMY_MSG_FRONT, 'ENEMY_FRONT'],
       [Blockly.Msg.SUMOROBOT_ENEMY_MSG_RIGHT, 'ENEMY_RIGHT']];
    this.setHelpUrl(Blockly.Msg.SUMOROBOT_ENEMY_HELPURL);
    this.setColour(120);
    var dropdown = new Blockly.FieldDropdown(OPERATORS);
    this.appendDummyInput().appendField(dropdown, 'ENEMY');
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
    this.setColour(120);
    var dropdown = new Blockly.FieldDropdown(OPERATORS);
    this.appendDummyInput().appendField(dropdown, 'LINE');
    this.setOutput(true, 'Boolean');
    this.setTooltip(Blockly.Msg.SUMOROBOT_LINE_TOOLTIP);
  }
};