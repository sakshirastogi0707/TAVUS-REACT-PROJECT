import React, { useEffect, useRef, useState } from "react";
import {
  EditorState,
  getDefaultKeyBinding,
  RichUtils,
  convertToRaw,
} from "draft-js";
import Editor from "draft-js-plugins-editor";
import createMentionPlugin, {
  defaultSuggestionsFilter,
} from "draft-js-mention-plugin";
import "draft-js-mention-plugin/lib/plugin.css";
import "draft-js/dist/Draft.css";
import Suggestions from "./Suggestion.component";
import Entry from "./Entry.component";
import VariableInstance from "./MentionComponent.component";
import { useGVS } from "../context/GVS.context";
import { keyCodes, commands } from "./constants/KeyCommands";

const cmdState = {
  handled: "handled",
  notHandled: "not-handled",
};

const mentionPlugin = createMentionPlugin({
  entityMutability: "IMMUTABLE",
  mentionComponent: VariableInstance,
  mentionPrefix: "@",
  mentionSuggestionsComponent: Suggestions,
});
const { MentionSuggestions } = mentionPlugin;
const plugins = [mentionPlugin];

const convertVariableFormat = (variables) => {
  const variableKeys = Object.keys(variables).sort();
  const vars = variableKeys.map((variable, idx) => ({
    name: variable,
    id: idx,
    colorIdx: variables[variable].colorIdx,
    instances: variables[variable].instances,
  }));
  return vars;
};

const SuggestionTextArea = ({ setOutput, className, placeholder, setDisableCreate }) => {
  const { vars, isLoading } = useGVS();
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const editor = useRef();
  const Keybindings = useRef();

  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    if (!isLoading && vars != null && editor.current) {
      setSuggestions(convertVariableFormat(vars));
      setTimeout(() => {
        editor.current.focus(); //https://github.com/draft-js-plugins/draft-js-plugins/issues/800 Race condition for focus
      }, 0);
    }
  }, [isLoading, vars, editor.current]);


  const customSuggestionsFilter = (searchValue, suggestions) => {
    const size = (list) => (list.constructor.name === 'List'
        ? list.size
        : list.length);

    const get = (obj, attr) => (obj.get
        ? obj.get(attr)
        : obj[attr]);

    const value = searchValue.toLowerCase();
    const filteredSuggestions = suggestions.filter((suggestion) => (
      !value || get(suggestion, 'name').toLowerCase().indexOf(value) > -1
    ));
    return filteredSuggestions;
  };

  const onSearchChange = ({ value }) => {
    const filteredSuggestions = customSuggestionsFilter(
      value,
      convertVariableFormat(vars)
    );
    setSuggestions(filteredSuggestions);
  };


  const onChange = (newEditorState) => {
    setEditorState(newEditorState);
    const outputText = editorState.getCurrentContent().getPlainText("\u0001");

    setOutput({
      outputText,
      contentBlock:  convertToRaw(editorState.getCurrentContent())
    });
  };

 

  const keyBindingFn = (e) => {
    if (e.keyCode && keyCodes[e.keyCode]) {
      return commands[keyCodes[e.keyCode]];
    }
    return getDefaultKeyBinding(e);
  };

  const handleKeyCommand = (command) => {
    switch (command) {
      case commands.arrowDown:
        Keybindings.current.onArrowDown();
        return cmdState.handled;
      case commands.arrowUp:
        Keybindings.current.onUpArrow();
        return cmdState.handled;
      case commands.tab:
        Keybindings.current.onCommit();
        return cmdState.handled;
      case commands.enter:
        Keybindings.current.onCommit();
        return cmdState.handled;
      default:
        return cmdState.notHandled;
    }
  };
  return (
    <div
      className={`editor ${className}`}
      style={{ color: "white", fontSize: "20px" }}
      onClick={() => {
        editor.current.focus();
      }}
    >
      <Editor
        editorState={editorState}
        onChange={onChange}
        plugins={plugins}
        keyBindingFn={keyBindingFn}
        handleKeyCommand={handleKeyCommand}
        placeholder={placeholder}
        ref={editor}
      />
      {vars && (
        <MentionSuggestions
          onTab={Keybindings}
          onSearchChange={onSearchChange}
          suggestions={suggestions}
          entryComponent={Entry}
          setDisableCreate={setDisableCreate}
        />
      )}
    </div>
  );
};

export default SuggestionTextArea;
