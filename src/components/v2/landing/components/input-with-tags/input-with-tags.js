import React, {useRef} from "react";
import ReactDOM from "react-dom";
import Tags from "@yaireo/tagify/dist/react.tagify";
import { ClickAwayListener } from "@material-ui/core";
import Tagify from "@yaireo/tagify";
import "@yaireo/tagify/dist/tagify.css";
import './input-with-tags.scss'
import Utils from "../../../../../service/core/utils";
import {InputWithTagsHelper} from "./input-with-tags-helper";
import {CampaignService} from "../../../../../service/api/campaign.service";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import Action from "../../../../../redux/action";
import {StorageKeys, StorageService} from "../../../../../service/core/storage.service";

class TaggedInput extends React.PureComponent {

    constructor(props) {
        super(props);
        // const parsed = InputWithTagsHelper.parseTagResult(props.value)
        this.state = {
            // value: this.props.value || '',
            value: '',
            showDropdown: false,
            newVariableName: {
                heading1: '',
                button1: '',
            },
            initializedWithDefault: false,
            variables: [],
            campaignId: props.campaignId
        };
        this.tagify_el = React.createRef();
        this.dropdown = React.createRef();
        this.input = React.createRef();
        this.prevTags = null
    }

    getVariablesFromAPI = async () => {
        const variables = await CampaignService.getVariables(this.state.campaignId)
        new Action({context: this}).updateVariableList(variables)
        this.formatAndUpdateVariables(variables)
    }

    formatAndUpdateVariables = (variables) => {
        if (!variables) return
        this.setState({variables})
    }

    variableClick = (e) => {
        const varName = e.target.attributes['data-var-name'].value;
        const colorIndex = e.target.attributes['data-var-color-index'].value;
        const variable = this.state.variables.find(x => x.value === varName)
        variable.instanceid = Utils.generateInstanceId()
        this.appendTag(variable, +colorIndex, true)
        this.state.newVariableName[this.props.name] = ''

        this.saveNewVariableInstance(varName, variable.instanceid)
        InputWithTagsHelper.removeDropdownFromDOM(this)
        InputWithTagsHelper.focusTaggedInput(this)
        this.handleInputChange()
    }

    handleVariableInput = (e) => {
        this.state.newVariableName[this.props.name] = e.target.value
    }

    getColorIndexForNewVariable = (variable) => {
        const variableInList = this.state.variables.find(x => x.value === '@'+variable)
        let colorIndex = this.state.variables.length % InputWithTagsHelper.colors().length
        if (variableInList) {
            colorIndex = variableInList.colorIndex
        }
        return colorIndex
    }

    handleAddNewVariableClick = (newVariableName) => {
        let variable = typeof newVariableName === 'string' ? newVariableName : this.state.newVariableName[this.props.name]
        if (variable) variable = variable.trim()
        if (!variable) {
            return
        }
        const instanceid = Utils.generateInstanceId()

        const varObj = {value: '@'+variable, instanceid}
        let colorIndex = this.getColorIndexForNewVariable(variable)
        this.appendTag(varObj, colorIndex, true)
        this.state.newVariableName[this.props.name] = ''

        const newList = [...this.state.variables, {value: '@' + variable}]
        this.setState({variables: newList})

        this.saveNewVariableInstance(variable, instanceid)

        InputWithTagsHelper.removeDropdownFromDOM(this)
        InputWithTagsHelper.focusTaggedInput(this)
        this.handleInputChange()
    }

    saveNewVariableInstance = async (variable, instanceid) => {
        const params = {
            "variableName": variable.replace(/@/g, ''),
            "variableInstanceId": instanceid
        }
        const variables = await CampaignService.addVariable(this.state.campaignId, params)
        new Action({context: this}).updateVariableList(variables)
        this.formatAndUpdateVariables(variables)
    }

    removeVariableInstance = (variable, instanceid) => {
        const params = {
            "variableName": variable,
            "variableInstanceId": instanceid
        }
        return CampaignService.removeVariable(this.state.campaignId, params)
    }

    newVariableClick = (e) => {
        const newVariableName = e.target.attributes['data-var-name'].value;
        if (newVariableName) {
            this.handleAddNewVariableClick(newVariableName)
        } else {
            InputWithTagsHelper.showNewVariableForm(this)
        }
    }

    callbackInput = (str, html) => {
        // console.log('======== callbackInput', html)
        const text = str.replace(/@$/, '@')
        const lastPart = text.split(' ').slice(-1)[0]
        const currentTags = this.tagify_el.current.DOM.input.querySelectorAll('tag')

        if (this.prevTags !== null &&
            this.prevTags.length - currentTags.length > 0) {
            const tags = InputWithTagsHelper.getDeletedTag(this.prevTags, currentTags)
            this.handleRemoveVariable(tags)
        }
        if (lastPart.includes('@')) {
            this.hideSuperChargeCopy()
            const parts = lastPart.split('@')
            const query = parts[1].toLowerCase()
            InputWithTagsHelper.showDropdown(this, query)
        } else {
            InputWithTagsHelper.removeDropdownFromDOM(this)
        }
        if (html.endsWith('</tag>')) {
            InputWithTagsHelper.removeDropdownFromDOM(this)
        }

        try {
            let array = [...str.matchAll(/@\S+\s$/g)]
            if (array.length === 0) {
                array = [...str.matchAll(/@\S+\n\n$/g)]
            }
            if (array.length > 0) {
                const newVariable = array[0][0]
                    .trim()
                    .replace('@', '')
                    .replace('\n', '')
                this.handleAddNewVariableClick(newVariable)
            }
        } catch (e) {
            console.log('xxxxx xxxxx xxxxx exception in callbackInput', e)
        }
        InputWithTagsHelper.cleanSpaces(this)
        this.handleInputChange()
    }

    callbackBlur = (e) => {
        //this.handleInputChange()
        this.props.onBlur()
    }

    hideSuperChargeCopy = () => {
        if (this.props.landingState.showSuperCharge) {
            this.props.dispatch({
                type: Action.UpdateLandingState,
                payload: {
                    showSuperCharge: false
                },
                origin: 'input-with-tags.hideSuperChargeCopy'
            })
        }
    }

    handleRemoveVariable = async (tags) => {
        // console.log('====== handleRemoveVariable ', tags)
        const promises = []

        InputWithTagsHelper.removeDropdownFromDOM(this)
        for (const tag of tags) {
            let {instanceid, value} = tag
            promises.push(this.removeVariableInstance(value, instanceid))
        }
        await Promise.all(promises)
        this.getVariablesFromAPI()
    }

    handleInputChange = () => {
        this.state.inputStarted = true
        InputWithTagsHelper.cleanSpaces(this)
        const result = InputWithTagsHelper.getTagResultForAPI(this)
        this.props.onChange(this.props.name, result)
        this.prevTags = this.tagify_el.current.DOM.input.querySelectorAll('tag')
    }

    tagifySettings = {
        mode: "mix",
        // trim: true,
        mixTagsInterpolator: ["{{", "}}"],
        pattern: /@/, // <--  Text starting with @ or # (if single, String can be used here)
        duplicates: true,
        placeholder: this.props.placeholder,
        dropdown: {
            enabled: 200, // always show suggestions dropdown,
        },
        mixMode: {
            // insertAfterTag: ' '
        },
        autoComplete: {
            rightKey: false
        },
        callbacks: {
            // add: this.callbackAddRemove,
            // remove: this.callbackAddRemove,
            // input: (e) => this.callbackInput(e.detail.textContent),
            blur: this.callbackBlur,
        },
        tagTextProp: 'text',
        // pasteAsTags: false,
    };

    appendTag = (variable, colorIndex, replaceWith) => {
        const node = this.tagify_el.current.createTagElem.call(this.tagify_el.current, variable)
        node.classList.add(`tag-theme${colorIndex + 1}`);
        node.dataset.instanceid = variable.instanceid
        node.dataset.value = variable.value
        const {color} = InputWithTagsHelper.colors(colorIndex)
        node.setAttribute('color', color)

        const deleteIcon = node.querySelector('x');
        if (deleteIcon) deleteIcon.remove();
        InputWithTagsHelper.cleanSpaces(this)
        if (replaceWith) {
            const temp = this.tagify_el.current.DOM.input.innerHTML
            this.tagify_el.current.DOM.input.innerHTML = temp.replace(/@\S*\s*$/, '')
        }
        this.tagify_el.current.DOM.input.appendChild(node)
        this.tagify_el.current.DOM.input.innerHTML += ' '
        this.tagify_el.current.value.push(variable)
    }

    componentDidMount = () => {
        this.getVariablesFromAPI()
        const input = document.querySelector(`#tagify_${this.props.name}`);
        this.tagify_el.current = new Tagify(input, {
            whitelist: this.state.variables,
            ...this.tagifySettings,
        });
        this.dropdown.current = this.tagify_el.current.dropdown
        this.input.current = input

        this.tagify_el.current.DOM.input.addEventListener('input', (e) => {
            this.callbackInput(e.target.textContent, e.target.innerHTML)
        })
        this.tagify_el.current.DOM.input.addEventListener('paste', (e) => {
            this.handleInputChange()
        })
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        // console.log('this.state.initializedWithDefault', this.state.initializedWithDefault)
        // console.log('this.props.value', this.props.value)
        // console.log('this.state.value', this.state.value)
        if (!this.state.initializedWithDefault && this.props.value) {
            this.init(this.props.value)
        }

        if (this.props.variables.length > 0 && this.state.variables !== this.props.variables) {
            this.formatAndUpdateVariables(this.props.variables)
        }
    }

    componentWillUnmount() {
        // console.log('======= unmounted =======', this.props.name)
    }

    init = (inputValue) => {
        if (this.state.inputStarted) return
        // console.log('======= init =======', inputValue)
        const parsed = InputWithTagsHelper.parseTagResult(inputValue)
        this.setState({
            initializedWithDefault: true,
            value: inputValue
        })
        this.tagify_el.current.DOM.input.innerHTML = ''
        parsed.variables.forEach((variable) => {
            if (typeof variable === 'string') {
                this.tagify_el.current.DOM.input.innerHTML += variable + ' '
            } else {
                this.appendTag(variable, variable.colorIndex)
                this.prevTags = this.tagify_el.current.DOM.input.querySelectorAll('tag')
            }
        })
        InputWithTagsHelper.cleanSpaces(this)
    }

    render() {
        const {value} = this.state;
        return <textarea id={`tagify_${this.props.name}`} autoComplete='off' name="mix" value={value}/>
    }
}

const mapStateToProps = (state) => {
    return {
        landingState: state.landingState,
        variables: state.variables,
    }
}

export default connect(mapStateToProps)(TaggedInput);
