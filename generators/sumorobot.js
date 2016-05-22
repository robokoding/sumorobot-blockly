/**
 * @license
 * Visual Blocks Language
 *
 * Copyright 2012 Google Inc.
 * https://github.com/google/blockly
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
 * @fileoverview Helper functions for generating Sumorobot for blocks.
 * @author silver.kuusik@gmail.com (Silver Kuusik)
 */
'use strict';

goog.provide('Blockly.Sumorobot');

goog.require('Blockly.Generator');


/**
 * Sumorobot code generator.
 * @type !Blockly.Generator
 */
Blockly.Sumorobot = new Blockly.Generator('Sumorobot');

/**
 * List of illegal variable names.
 * This is not intended to be a security feature.  Blockly is 100% client-side,
 * so bypassing this list is trivial.  This is intended to prevent users from
 * accidentally clobbering a built-in object or function.
 * @private
 */
Blockly.Sumorobot.addReservedWords(
        // http://arduino.cc/en/Reference/HomePage
'setup,loop,if,else,for,switch,case,while,do,break,continue,return,goto,define,include,HIGH,LOW,' +
'INPUT,OUTPUT,INPUT_PULLUP,true,false,interger, constants,floating,point,void,bookean,char,unsigned,'+
'byte,int,word,long,float,double,string,String,array,static, volatile,const,sizeof,pinMode,digitalWrite,'+
'digitalRead,analogReference,analogRead,analogWrite,tone,noTone,shiftOut,shitIn,pulseIn,millis,micros,delay,'+
'delayMicroseconds,min,max,abs,constrain,map,pow,sqrt,sin,cos,tan,randomSeed,random,lowByte,highByte,bitRead,'+
'bitWrite,bitSet,bitClear,bit,attachInterrupt,detachInterrupt,interrupts,noInterrupts,'+
'forward,backward,left,right,stop,ENEMY_LEFT,ENEMY_RIGHT,ENEMY_FRONT,LINE_LEFT,LINE_RIGHT,LINE_FRONT');

/**
 * Order of operation ENUMs.
 */
Blockly.Sumorobot.ORDER_ATOMIC = 0;          // 0 "" ...
Blockly.Sumorobot.ORDER_MEMBER = 1;         // . []
Blockly.Sumorobot.ORDER_NEW = 1;            // new
Blockly.Sumorobot.ORDER_FUNCTION_CALL = 2;  // ()
Blockly.Sumorobot.ORDER_INCREMENT = 3;      // ++
Blockly.Sumorobot.ORDER_DECREMENT = 3;      // --
Blockly.Sumorobot.ORDER_LOGICAL_NOT = 4;    // !
Blockly.Sumorobot.ORDER_BITWISE_NOT = 4;    // ~
Blockly.Sumorobot.ORDER_UNARY_PLUS = 4;     // +
Blockly.Sumorobot.ORDER_UNARY_NEGATION = 4; // -
Blockly.Sumorobot.ORDER_TYPEOF = 4;         // typeof
Blockly.Sumorobot.ORDER_VOID = 4;           // void
Blockly.Sumorobot.ORDER_DELETE = 4;         // delete
Blockly.Sumorobot.ORDER_MULTIPLICATION = 5; // *
Blockly.Sumorobot.ORDER_DIVISION = 5;       // /
Blockly.Sumorobot.ORDER_MODULUS = 5;        // %
Blockly.Sumorobot.ORDER_ADDITION = 6;       // +
Blockly.Sumorobot.ORDER_SUBTRACTION = 6;    // -
Blockly.Sumorobot.ORDER_BITWISE_SHIFT = 7;  // << >> >>>
Blockly.Sumorobot.ORDER_RELATIONAL = 8;     // < <= > >=
Blockly.Sumorobot.ORDER_IN = 8;             // in
Blockly.Sumorobot.ORDER_INSTANCEOF = 8;     // instanceof
Blockly.Sumorobot.ORDER_EQUALITY = 9;       // == != === !==
Blockly.Sumorobot.ORDER_BITWISE_AND = 10;   // &
Blockly.Sumorobot.ORDER_BITWISE_XOR = 11;   // ^
Blockly.Sumorobot.ORDER_BITWISE_OR = 12;    // |
Blockly.Sumorobot.ORDER_LOGICAL_AND = 13;   // &&
Blockly.Sumorobot.ORDER_LOGICAL_OR = 14;    // ||
Blockly.Sumorobot.ORDER_CONDITIONAL = 15;   // ?:
Blockly.Sumorobot.ORDER_ASSIGNMENT = 16;    // = += -= *= /= %= <<= >>= ...
Blockly.Sumorobot.ORDER_COMMA = 17;         // ,
Blockly.Sumorobot.ORDER_NONE = 99;          // (...)

/**
 * Initialise the database of variable names.
 */
Blockly.Sumorobot.init = function() {
  // Create a dictionary of definitions to be printed before the code.
  Blockly.Sumorobot.definitions_ = Object.create(null);
  // Create a dictionary mapping desired function names in definitions_
  // to actual function names (to avoid collisions with user functions).
  Blockly.Sumorobot.functionNames_ = Object.create(null);

  if (!Blockly.Sumorobot.variableDB_) {
    Blockly.Sumorobot.variableDB_ =
        new Blockly.Names(Blockly.Sumorobot.RESERVED_WORDS_);
  } else {
    Blockly.Sumorobot.variableDB_.reset();
  }

  var defvars = [];
  var variables = Blockly.Variables.allVariables();
  for (var x = 0; x < variables.length; x++) {
    defvars[x] = 'var ' +
        Blockly.Sumorobot.variableDB_.getName(variables[x],
        Blockly.Variables.NAME_TYPE) + ';';
  }
  Blockly.Sumorobot.definitions_['variables'] = defvars.join('\n');
};

/**
 * Prepend the generated code with the variable definitions.
 * @param {string} code Generated code.
 * @return {string} Completed code.
 */
Blockly.Sumorobot.finish = function(code) {
  // Convert the definitions dictionary into a list.
  var definitions = [];
  for (var name in Blockly.Sumorobot.definitions_) {
    definitions.push(Blockly.Sumorobot.definitions_[name]);
  }
  return definitions.join('\n\n') + '\n\n\n' + code;
};

/**
 * Naked values are top-level blocks with outputs that aren't plugged into
 * anything.  A trailing semicolon is needed to make this legal.
 * @param {string} line Line of generated code.
 * @return {string} Legal line of code.
 */
Blockly.Sumorobot.scrubNakedValue = function(line) {
  return line + ';\n';
};

/**
 * Encode a string as a properly escaped Sumorobot string, complete with
 * quotes.
 * @param {string} string Text to encode.
 * @return {string} Sumorobot string.
 * @private
 */
Blockly.Sumorobot.quote_ = function(string) {
  // TODO: This is a quick hack.  Replace with goog.string.quote
  string = string.replace(/\\/g, '\\\\')
                 .replace(/\n/g, '\\\n')
                 .replace(/'/g, '\\\'');
  return '\'' + string + '\'';
};

/**
 * Common tasks for generating Sumorobot from blocks.
 * Handles comments for the specified block and any connected value blocks.
 * Calls any statements following this block.
 * @param {!Blockly.Block} block The current block.
 * @param {string} code The Sumorobot code created for this block.
 * @return {string} Sumorobot code with comments and subsequent blocks added.
 * @private
 */
Blockly.Sumorobot.scrub_ = function(block, code) {
  var commentCode = '';
  // Only collect comments for blocks that aren't inline.
  if (!block.outputConnection || !block.outputConnection.targetConnection) {
    // Collect comment for this block.
    var comment = block.getCommentText();
    if (comment) {
      commentCode += Blockly.Sumorobot.prefixLines(comment, '// ') + '\n';
    }
    // Collect comments for all value arguments.
    // Don't collect comments for nested statements.
    for (var x = 0; x < block.inputList.length; x++) {
      if (block.inputList[x].type == Blockly.INPUT_VALUE) {
        var childBlock = block.inputList[x].connection.targetBlock();
        if (childBlock) {
          var comment = Blockly.Sumorobot.allNestedComments(childBlock);
          if (comment) {
            commentCode += Blockly.Sumorobot.prefixLines(comment, '// ');
          }
        }
      }
    }
  }
  var nextBlock = block.nextConnection && block.nextConnection.targetBlock();
  var nextCode = Blockly.Sumorobot.blockToCode(nextBlock);
  return commentCode + code + nextCode;
};