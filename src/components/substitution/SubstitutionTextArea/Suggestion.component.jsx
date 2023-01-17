import React, {
  useEffect,
  useRef,
  useState,
  forwardRef,
  useImperativeHandle,
} from "react";
import addMention from "draft-js-mention-plugin/lib/modifiers/addMention";
import getSearchText from "draft-js-mention-plugin/lib/utils/getSearchText";
import getTriggerForMention from "./utils/tiggerForMention";
import { Grid, makeStyles, Typography } from "@material-ui/core";

import CreateNewVariableButton from "./CreateNewVariableButton.component";
import "./Suggestions.styles.scss";
import { getColorIndex, useGVS } from "../context/GVS.context";
import clsx from "clsx";

const useStyles = makeStyles({
  createNewVarContainerBase: {
    minWidth: "250px",
    margin: "0 auto",
    padding: "22px 22px 24px 22px",
  },
  createNewVarContainerSuggestion: {
    borderTop: "1px solid #6F6897",
  },
  createNewVarContainerNoSuggestions: {
    border: "none",
  },
  suggestionsContainer: {
    overflowY: "auto",
    margin: "10px -10px",
    padding: "0 10px",
    listStyle: "none",
    height: "100%",
    maxHeight: "200px",
    overflowY: "scroll",
    "&::-webkit-scrollbar": {
      width: "3px",
      display: "block",
      position: "absolute",
      right: "10px",
      background: "none",
    },
    "&::-webkit-scrollbar-track": {
      boxShadow: "inset 0 0 6px rgba(0,0,0,0.00)",
      webkitBoxShadow: "inset 0 0 6px rgba(0,0,0,0.00)",
    },
    "&::-webkit-scrollbar-thumb": {
      backgroundColor: "rgba(111, 120, 151, 1)",
      borderRadius: "54px",
      width: "1px",
      border: "none",
    },
    "&::before": {
      content: '" "',
      position: "absolute",
      right: "0",
      height: "25px",
      top: "35px",
      margin: '0 15px',
      width: "calc(100% - 30px)",
      background: `linear-gradient(180deg, #232631 0%, #232631 24.48%, rgba(35, 38, 49, 0.93) 37.5%, rgba(35, 38, 49, 0.69) 66.67%, rgba(35, 38, 49, 0) 100%)`,
      zIndex: 1,
    },
    "&::after": {
      content: '" "',
      position: "absolute",
      right: "0",
      height: "25px",
      bottom: "86px",
      margin: '0 15px',
      width: "calc(100% - 30px)",
      background: `linear-gradient(0deg, #232631 0%, #232631 24.48%, rgba(35, 38, 49, 0.93) 37.5%, rgba(35, 38, 49, 0.69) 66.67%, rgba(35, 38, 49, 0) 100%)`,
      zIndex: 1,
    }
    
  },
});

const Suggestions = forwardRef(
  ({
    callbacks,
    ariaProps,
    store,
    onSearchChange: onSearchChangeProp,
    mentionTrigger,
    mentionPrefix,
    entityMutability,
    entryComponent,
    suggestions,
    onTab,
    setDisableCreate
  }) => {
    let activeOffsetKey;
    let lastSearchValue;
    let lastActiveTrigger = "";
    let lastSelectionIsInsideWord;
    const [position, setPosition] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const classes = useStyles();

    const { addVariable } = useGVS();

    const [focusedOptionIndex, setFocusedOptionIndex] = useState(0);

    const [search, setSearch] = useState("");
    const [newVarsCreated, setNewVarsCreated] = useState({});

    const closeDropdown = () => {
      callbacks.handleReturn = undefined;
      callbacks.keyBindingFn = undefined;
      ariaProps.ariaHasPopup = "false";
      ariaProps.ariaExpanded = false;
      ariaProps.ariaActiveDescendantID = undefined;
      ariaProps.ariaOwneeID = undefined;
      store.setIsOpened(false);
      setDisableCreate(false)
    };

    React.useEffect(() => {
      onTab.current = {
        onArrowDown() {
          if (store.getIsOpened()) {
            const newIndex = focusedOptionIndex + 1;
            const focus = newIndex > suggestions.length - 1 ? 0 : newIndex;
            setFocusedOptionIndex(focus);
          }
        },
        onUpArrow() {
          if (store.getIsOpened()) {
            const newIndex = focusedOptionIndex - 1;
            const focus = newIndex < 0 ? suggestions.length - 1 : newIndex;
            setFocusedOptionIndex(focus);
          }
        },
        onCommit() {
          handleOnCommit();
        },
      };
    }, [suggestions, focusedOptionIndex]);

    const handleOnCommit = () => {
      if (store.getIsOpened() && suggestions.length > 0) {
        onMentionSelect(suggestions[focusedOptionIndex]);
      }
      if (store.getIsOpened() && suggestions.length === 0) {
        handleAddVar();
      }
    };

    const handleAddVar = async () => {
      setIsLoading(true);
      const newVariableName = search.replace("@", "");
      const { variableName, variableInstanceId } = await addVariable(
        newVariableName
      );
      setNewVarsCreated({
        ...newVarsCreated,
        [variableName]: { variableName, variableInstanceId },
      });

      const mentionAdd = {
        gvsId: variableInstanceId,
        title: newVariableName,
        name: newVariableName,
        colorIdx: getColorIndex(newVariableName),
      };

      const newEditorState = addMention(
        store.getEditorState(),
        mentionAdd,
        "@",
        "@",
        entityMutability
      );
      store.setEditorState(newEditorState);
      closeDropdown();

      setIsLoading(false);
    };

    const onSearchChange = (
      editorState,
      selection,
      activeOffsetKey,
      lastActiveOffsetKey,
      trigger
    ) => {
      const { matchingString: searchValue } = getSearchText(
        editorState,
        selection,
        [trigger]
      );
      openDropdown();

      setSearch(searchValue);

      if (
        lastActiveTrigger !== trigger ||
        lastSearchValue !== searchValue ||
        activeOffsetKey !== lastActiveOffsetKey
      ) {
        lastActiveTrigger = trigger;
        lastSearchValue = searchValue;
        onSearchChangeProp({ trigger, value: searchValue });
        //reset focus item if search is cahnged
        setFocusedOptionIndex(0);
      }
    };

    const openDropdown = () => {
      setDisableCreate(true)
      store.setIsOpened(true);
    };

    const onEditorStateChange = (editorState) => {
      const searches = store.getAllSearches();
      if (searches.size === 0) {
        return editorState;
      }

      const removeList = () => {
        store.resetEscapedSearch();
        closeDropdown();
        return editorState;
      };

      const triggerForMention = getTriggerForMention(editorState, searches, [
        mentionTrigger,
      ]);

      if (!triggerForMention) {
        return removeList();
      }

      const lastActiveOffsetKey = activeOffsetKey;
      activeOffsetKey = triggerForMention.activeOffsetKey;

      const currRect = store.getPortalClientRect(activeOffsetKey);
      if (position.top != currRect.top + 30 && position.left != currRect.left) {
        setPosition({ top: currRect.top + 30, left: currRect.left });
      }

      onSearchChange(
        editorState,
        editorState.getSelection(),
        activeOffsetKey,
        lastActiveOffsetKey,
        "@"
      );

      // make sure the escaped search is reseted in the cursor since the user
      // already switched to another mention search
      if (!store.isEscaped(activeOffsetKey || "")) {
        store.resetEscapedSearch();
      }

      // If none of the above triggered to close the window, it's safe to assume
      // the dropdown should be open. This is useful when a user focuses on another
      // input field and then comes back: the dropdown will show again.
      if (!store.getIsOpened() && !store.isEscaped(activeOffsetKey || "")) {
        openDropdown();
      }
      // makes sure the focused index is reseted every time a new selection opens
      // or the selection was moved to another mention search
      if (lastActiveOffsetKey !== activeOffsetKey) {
        setFocusedOptionIndex(0);
      }
      return editorState;
    };

    callbacks.onChange = onEditorStateChange;

    const onMentionSelect = (mention) => {
      let variableInstanceId = "";
      if (newVarsCreated[mention.name]) {
        variableInstanceId = newVarsCreated[mention.name].variableInstanceId;
      }

      mention.gvsId = variableInstanceId;
      const mentionAdd = {
        ...mention,
        title: mention.name,
        name: mention.name,
      };

      const newEditorState = addMention(
        store.getEditorState(),
        mentionAdd,
        "@",
        "@",
        entityMutability
      );
      store.setEditorState(newEditorState);
      closeDropdown();
    };

    const isSearchInVars = () => {
      const res = suggestions.find(({ name }) => {
        return name === search;
      });
      return res;
    };
    const isCreateNewVarDisabled = () => {
      const baseCase = suggestions.length === 1 || search.length === 0;
      return baseCase || isSearchInVars() != undefined;
    };

    const Entry = entryComponent;
    if (!store.getIsOpened()) return null;
    return (
      <Grid
        container
        direction="column"
        style={{
          maxWidth: "fit-content",
          minWidth: "250px",
          background: "#232631",
          borderRadius: "8px",
          position: "fixed",
          top: position.top,
          left: position.left,
          zIndex: 2147483647,
          boxShadow: "0 3px 24px rgba(0,0,0,0.25)",
        }}
      >
        <Grid
          item
          style={{
            padding: "0 22px",
            background: "#232631",
            borderRadius: "8px",
          }}
        >
          <div
            style={{
              padding: "21px 0 0 0",
              display: suggestions.length == 0 ? "none" : "block",
            }}
          >
            <Typography
              style={{ color: "#6F7897", fontSize: "11px", fontWeight: "700" }}
            >
              DYNAMIC VARIABLES
            </Typography>
          </div>
          <div>
            <div className={classes.suggestionsContainer} style={{ display: suggestions.length == 0 ? "none" : "block",}}>
              <Grid
                container
                direction="column"
                style={{ background: "#232631", padding:"10px 0" }}
              >
                {suggestions.map((mention, idx) => {
                  return (
                    <Entry
                      key={idx}
                      isFocused={idx === focusedOptionIndex}
                      setCurrentToFocusIndex={() => setFocusedOptionIndex(idx)}
                      mention={mention}
                      onMentionSelect={onMentionSelect}
                    />
                  );
                })}
              </Grid>
            </div>
          </div>
        </Grid>
        <Grid
          item
          className={clsx(classes.createNewVarContainerBase, {
            [classes.createNewVarContainerSuggestion]: suggestions.length > 0,
            [classes.createNewVarContainerNoSuggestions]:
              suggestions.length < 0,
          })}
        >
          <CreateNewVariableButton
            onClick={handleAddVar}
            disabled={isCreateNewVarDisabled()}
            isLoading={isLoading}
          />
        </Grid>
      </Grid>
    );
  }
);

export default Suggestions;
