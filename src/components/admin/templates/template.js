import React, { Component } from 'react';
import './template.scss';
import { html } from "./template.html";
import _ from 'lodash';
import { toast } from "react-toastify";
import { HTTP } from "../../../service/core/http.service";
import { urls } from "../../../config/urlConfig";
import firebase from '../../firebase/firebase'
import Strings from "./../../../constants/strings"

class TemplateShare extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            value: 0,
            email: '',
            role: '',
            errors: {},
            isLoading: false,
            allUsers: [],
            totalItemsCount: '',
            activePage: 1,
            openSearch: false,
            searchField: '',
            assignTemplate: false,
            selectedTemplates: [],
            removeUser: false,
            tempUsers: 0,
            deleteTempSelect: [],
            selectedUsers: [],
            page: 1,
            isLoadingPopup: false,
            isLoadingDelete: false,
            selectedTempSearch: []
        }
    }

    componentDidMount() {
        this.templatesWithAsign(this.state.page, this.state.searchField, true)
        this.handleSearchUser('')
    }

    randomColor = (index) => {
        if (index === 0) {
            return "user-circle circle-2"
        } else if (index === 1) {
            return "user-circle circle-2_1"
        } else if (index === 2) {
            return "user-circle circle-2_2"
        }
    }

    openModel = (isDialogOpen, name) => {
        if (name == 'assignUser') {
            if (!this.state.selectedTemplates.length > 0) {
                return toast.warning(Strings.SELECT_ANY_TEMPLATE)
            }
        }
        this.setState({
            [name]: isDialogOpen,
        })
    }

    openModelAssign = async (data) => {
        this.setState({
            assignTemplate: true,
            tempUsers: '',
            selectedTemplates: []
        })
        let allUsers = this.state.allUsers
        let assignedUsers = []
        this.state.templatesWithUsers && this.state.templatesWithUsers[data] && this.state.templatesWithUsers[data].assign_users && this.state.templatesWithUsers[data].assign_users.map((val) => {
            if (val.user_info) {
                assignedUsers.push({
                    value: val.user_info.id,
                    label: val.user_info.fullName ? val.user_info.fullName : val.user_info.email
                })
            }
        })
        let tempallUsers = []
        tempallUsers = allUsers.filter(item => !assignedUsers.some(itemNew => itemNew.value === item.value))
        this.setState({ tempUsers: data, allUsers: tempallUsers })
    }

    openModelDeleteModal = (data, template_id) => {
        let selected = {
            "user_id": data.user_info.id,
            "template_id": template_id
        }
        this.setState({
            removeUser: true,
            deleteTempSelect: selected
        })
    }

    deleteUserFromTemp = () => {
        let data = this.state.deleteTempSelect
        this.setState({ isLoadingDelete: true })
        HTTP.delete(urls.unassign, { data }).then((result) => {
            if (result.data.status) {
                this.setState({
                    removeUser: false,
                    delete_temp_id: ''
                })
                this.handleSearchUser('')
                this.templatesWithAsign(1, this.state.searchField, false)
            } else {
                this.setState({
                    removeUser: false,
                    delete_temp_id: ''
                })
                this.handleSearchUser('')
                return toast.warning(result.data.message)

            }
        }).catch((err) => {
            console.log(err.message);
        }).finally(() => {
            this.setState({ isLoadingDelete: false, selectedTempSearch: [] })
        })
    }

    pagination = (e) => {
        this.setState({ page: e })
        this.templatesWithAsign(e, this.state.searchField, true)
    }

    getRandomColor() {
        var letters = '0123456789ABCDEF';
        var color = '#';
        for (var i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }

    handleSearchUser = (val) => {
        let userDate = []
        let { tempUsers } = this.state
        let params = "?search=" + encodeURIComponent(val)
        HTTP.get(urls.getUsers + params).then((result) => {
            if (result.data.status) {
                if (result.data?.data?.rows) {
                    result.data.data.rows.map((valresult, key) => {
                        if (val && valresult.email.includes(val)) {
                            userDate.push({
                                value: valresult.id,
                                label: valresult.email
                            })
                        } else {
                            userDate.push({
                                value: valresult.id,
                                label: valresult.first_name !== null ? valresult.fullName ? valresult.fullName : valresult.first_name : valresult.email
                            })
                        }
                    })
                }

                let assignedUsers = []
                this.state.templatesWithUsers && this.state.templatesWithUsers[tempUsers] && this.state.templatesWithUsers[tempUsers].assign_users && this.state.templatesWithUsers[tempUsers].assign_users.map((val) => {
                    if (val.user_info) {
                        assignedUsers.push({
                            value: val.user_info.id,
                            label: val.user_info.fullName
                        })
                    }
                })
                let tempallUsers = []
                tempallUsers = userDate.filter(item => !assignedUsers.some(itemNew => itemNew.value === item.value))
                if (userDate.length > 0) {
                    this.setState({
                        allUsers: tempallUsers,
                        page:1
                    })
                }
            }
        }).catch((err) => {
            console.log(err.message);
        }).finally(() => {
            this.setState({ isLoading: false })
        })
    }

    getCheckboxVal = (temp) => {
        let status = this.state.selectedTemplates.filter(function (template) { return temp.template_id === template })
        if (status.length > 0) {
            return true
        } else {
            return false
        }
    }

    templatesWithAsign = (page= 1, search, choice) => {
        this.setState({ isLoading: choice })
        let params = '?page=' + page + '&limit=10&search=' + search
        HTTP.get(urls.getAllCampaigns + params).then((result) => {
            if (result.data.status) {
                if (result.data?.data?.rows) {
                    this.setState({
                        templatesWithUsers: result.data.data.rows,
                        totalItemsCount: result.data.data.count,
                        activePage: page
                    })
                }
            }
        }).catch((err) => {
            console.log(err.message);
        }).finally(() => {
            this.setState({ isLoading: false })
        })
    }

    handleSelectUser = (val) => {
        this.setState({ selectedUsers: val })
    }

    assignTemplate = (users, template) => {
        let user_ids = []
        this.handleSearchUser('')
        if (users.length > 0) {
            users.map((val) => {
                user_ids.push(val.value)
            })
        }
        let data = {
            "user_ids": user_ids,
            "template_ids": template
        }
        HTTP.post(urls.assignTemplate, data).then((result) => {
            if (result.data.status) {
                this.templatesWithAsign(this.state.page, this.state.searchField, false)
                this.handleSearchUser('')
                this.setState({ selectedUsers: [], selectedTemplates: [], assignUser: false })
            }
        }).catch((err) => {
            console.log(err.message);
        }).finally(() => {
            this.setState({ isLoadingPopup: false })
        })
    }


    getNameInitials = (fname, lname) => {
        let name = ''
        if (fname) {
            name = fname.charAt(0);
        }
        if (lname) {
            name += lname.charAt(0);
        }
        return name.toUpperCase()
    }

    selectTemplates = (e, template_id) => {
        var joined = []
        if (e.target.checked) {
            joined = this.state.selectedTemplates.concat(template_id);
        } else if (!e.target.checked) {
            joined = this.state.selectedTemplates
            const index = joined.indexOf(template_id);
            if (index > -1) {
                joined.splice(index, 1);
            }
        }
        this.setState({ selectedTemplates: joined })
    }

    handlerInput = (e) => {
        let state = { [e.target.name]: e.target.value };
        this.setState(state);
    }

    handleChange = (data) => {
        const role = { value: 'user', label: 'User' }
        this.setState({
            role
        })
    };


    render = () => html.apply(this);
}

export default (TemplateShare);
