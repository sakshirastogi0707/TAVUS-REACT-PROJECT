import React, { Component } from 'react';
import './users.scss';
import { html } from "./users.html";
import _ from 'lodash';
import { toast } from "react-toastify";
import { HTTP } from "../../../service/core/http.service";
import { urls } from "../../../config/urlConfig";
import firebase from '../../firebase/firebase'

class Users extends Component {
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
            userRoleData: [
                { label: "qa", value: "qa" },
                { label: "user", value: "user" },
                { label: "admin", value: "admin" },
            ],
            menuOpen: false,
            anchorEl: null,
            toggleId: 0
        }
    }

    componentDidMount() {
        this.getUsers(1, this.state.searchField, true)
    }

    openModel = (isDialogOpen, name) => {
        this.setState({
            [name]: isDialogOpen,
        })
        if (name === 'isInviteUser') {
            this.setState({
                email: '',
                role: '',
                errors: {}
            })
        }
    }

    selectRole = async (val, user) => {
        let params = user.id + '/role'
        let data = {
            "role": val
        }
        await HTTP.put(urls.userRoleUpdate + params, data).then((result) => {
            if (result.data.status) {
                this.getUsers(1, this.state.searchField, true)
            }
        }).catch((err) => {
            console.log(err.message);
        }).finally(() => {
            this.setState({ anchorEl: null, menuOpen: false })
            this.getUsers(1, this.state.searchField, false)
        })
    }

    showEdit = (e, index) => {
        let allUsers = this.state.allUsers
        allUsers[index].edit = true;
        this.setState({ allUsers: allUsers })
    }

    handleToggle = (event, id) => {
        this.setState({ toggleId: id, anchorEl: event.currentTarget, menuOpen: true })
    };

    handleCloseMenu = () => {
        this.setState({ anchorEl: null, menuOpen: false })
    };

    pagination = (e) => {
        this.getUsers(e, this.state.searchField, true)
    }

    getUsers = (page, search, loading) => {
        this.setState({ isLoading: loading })
        let params = '?page=' + page + '&limit=10&search=' + search
        HTTP.get(urls.getUsers + params).then((result) => {
            if (result.status == 200) {
                if (result.data?.data?.rows) {
                    this.setState({
                        allUsers: result.data.data.rows,
                        totalItemsCount: result.data.data.count,
                        activePage: page
                    })
                }
            }
            this.setState({ isLoading: false })
        }).catch((err) => {
            console.log(err.message);
            this.setState({ isLoading: false })
        })
    }

    handlerInput = (e) => {
        let state = { [e.target.name]: e.target.value };
        this.setState(state);
    }

    inviteUser = () => {
        let isValid = this.validateForm()
        if (isValid) {
            this.setState({ isLoading: true })
            HTTP.post(urls.inviteUser, { email: this.state.email, role: this.state.role }).then((result) => {
                if (result.data.status == true) {
                    toast.success(result.data.message)
                    this.setState({ email: '', isInviteUser: false })
                    this.getUsers(1, this.state.searchField, true)
                } else {
                    toast.warning(result.data.message)
                }
                this.setState({ isLoading: false })
            }).catch((err) => {
                console.log(err.message);
                toast.warning(err.message)
                this.setState({ isLoading: false })
            })
        }
    }

    inviteUserMail = (mail, code, user) => {
        this.setState({ isLoading: true })
        HTTP.post(urls.inviteUserMail, { email: mail, code: code }).then((result) => {

            if (result.data.status == true) {
                toast.success(result.data.message)
                this.setState({ email: '', isInviteUser: false, role: '' })
                this.getUsers(1, this.state.searchField, true)
            } else {
                toast.warning(result.data.message)
            }
            this.setState({ isLoading: false })
        }).catch((err) => {
            console.log(err.message);
            toast.warning(err.message)
            this.setState({ isLoading: false })
        })
    }

    handleChange = (data) => {
        const role = { value: 'user', label: 'User' }
        this.setState({
            role
        })
    };

    validateForm = () => {
        const { email, role } = this.state;
        const errors = {};
        let error = false;

        if (email === "") {
            toast.warning("Please enter email");
            error = true;
        }
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (!re.test(String(email).toLowerCase())) {
            errors.email = "Please enter a valid email address."
        }
        if (role === "") {
            toast.warning("Please select role.");
            errors.role = "Please select role."
            error = true;
        }
        console.log(errors, 'errors')
        this.setState({ errors })
        return _.isEmpty(errors);
    }

    changeStatus = async (user,index) =>{
        let params = user.id + '/status'
        let data = {}
        let allUsers = this.state.allUsers
        allUsers[index].status = allUsers[index].status == 'ready' ? 'initial_signup' : 'ready';
        this.setState({
            allUsers
        })
        await HTTP.put(urls.userRoleUpdate + params, data).then((result) => {
            if (result.data.status) {
                this.getUsers(this.state.activePage, this.state.searchField, true)
            }
        }).catch((err) => {
            console.log(err.message);
        })
    }

    render = () => html.apply(this);
}

export default (Users);
