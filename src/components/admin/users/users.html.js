import React from "react";
import { AppImage } from "../../$widgets/images/app-image";
import TextFields from "../../$widgets/input-fields/text-field";
import './users.scss';
import { Grid, Menu, MenuItem } from "@material-ui/core";
import Loader from "../../$widgets/loader/loader"
import { ButtonGray } from "../../$widgets/buttons/button-gray";
import CustomSelect from "../../$widgets/input-fields/custom-select";
import AppDialog from "../../$widgets/AppDialog/AppDialog";
import Pagination from "react-js-pagination";
import { BrowserView, MobileView } from 'react-device-detect';
import Switch from '@mui/material/Switch';
import AddIcon from '@material-ui/icons/Add';
import SearchIcon from '@material-ui/icons/Search';
import EditIcon from '@material-ui/icons/Edit';
import { ButtonLightBlue } from "../../$widgets/buttons/button-lightblue";

const roles = [
  { value: 'user', label: 'User' },
  { value: 'qa', label: 'Qa' },
  { value: 'admin', label: 'Admin' },
]

export function html() {
  const { errors, allUsers, isInviteUser, isLoading, openSearch, searchField, role, menuOpen, anchorEl } = this.state;
  const { } = this.props;

  return (
    <div className={'dashboard-main'}>
      <Grid container className={'user'}>
        <Grid item xs={5} sm={4} md={2} lg={2}>
          <div className="d-flex justify-content-between">
            <div className={'title'}>Users</div>
          </div>
        </Grid>
        <Grid item xs={7} sm={8} md={10} lg={10}>
          
        </Grid>
      </Grid>
      <Grid container className=" mt-4 pb-4">
          <Grid item xs={12} sm={12} md={3} lg={3} >
           
          </Grid>
          <Grid item xs={12} sm={12} md={9} lg={9} className="align-self">
          <div className="d-flex d-flex-mobile justify-content-end">
            <div className="d-flex search-section ">
              <div className={'searchDiv align-self pr-2'}>
                {openSearch ?
                  <div className={'search-icon '}>
                    <div className="md-form mt-0">
                      <SearchIcon className="search-thumb" />
                      <AppImage name={'coolicon.svg'} onClick={() => this.setState({ searchField: '', openSearch: false }, () => this.getUsers(1, this.state.searchField, true))} className="search-cross" />
                      <input onChange={(e) => this.setState({ searchField: e.target.value }, () => this.getUsers(1, this.state.searchField, true))} name="searchField" value={this.state.searchField} className="form-control" type="text" placeholder="Search" aria-label="Search" />
                    </div>
                  </div>
                  :
                  <div className={'search-icon '}>
                    <SearchIcon onClick={() => this.setState({ openSearch: true })}  />
                  </div>
                }
              </div>
            </div>
            <div className="d-flex  justify-content-lg-end">
              <ButtonGray className="generateBtn mt-35" onClick={() => this.openModel(true, 'isInviteUser')}> Create New User <AddIcon  /></ButtonGray>
            </div>
          </div>
          </Grid>
        </Grid>
      <div className={'card'}>
        
          <div className={'card-body'}>
            <div className="table-responsive">
              <table className="table table-fixed">
                <thead>
                  <tr>
                    <th width="12%" className="table_title">User ID</th>
                    <th>Name</th>
                    <th >Email</th>
                    <th width="12%">Role</th>
                    <th >Status</th>
                  </tr>
                </thead>
                <tbody>
                  {allUsers && allUsers.length > 0 && allUsers.map((user, key) => {
                    return <tr key={key}>
                      <td>{user?.id}</td>
                      <td>{`${user?.first_name ? user?.first_name : ''} ${user?.last_name ? user?.last_name : ''}`}</td>
                      <td>{user.email}</td>
                      <td className="role">
                        <Menu
                          id="basic-menu"
                          anchorEl={anchorEl}
                          open={(this.state.toggleId === user?.id && menuOpen)}
                          onClose={this.handleCloseMenu}
                          MenuListProps={{
                            'aria-labelledby': 'basic-button',
                          }}
                        >
                          {this.state.userRoleData && this.state.userRoleData.length > 0 && this.state.userRoleData.map((val) => {
                            return <MenuItem selected={user.role == val.value} onClick={(e) => this.selectRole(val.value, user)} >{val.label}</MenuItem>
                          })}
                        </Menu>
                        <span>{user.role}
                          <span className="edit-icon">
                            <span
                              id="basic-button"
                              aria-controls="basic-menu"
                              aria-haspopup="true"
                              aria-expanded={menuOpen ? 'true' : undefined}
                              className="dotteds"
                            >
                              <EditIcon onClick={(e) => this.handleToggle(e, user?.id)} name={'edit.svg'}  />
                            </span>
                          </span>
                        </span>
                      </td>
                      {user.status == 'invited' || (user.status == 'initial_signup' && user.step)
                        ? <td className="send-invite" >
                                { user.status == 'invited' ? 'Invited' : 'Registration Started' }
                          </td>
                        : 
                          <td >
                            <Switch
                              checked={ user.status == 'ready' ? true : false}
                              onChange={(e) => this.changeStatus(user,key)}
                              inputProps={{ 'aria-label': 'controlled' }}
                            />
                          </td>
                      }

                    </tr>
                  })}
                  {!isLoading && allUsers&&  allUsers.length == 0 ?
                    <tr><td colSpan={5} style={{textAlign:'center'}} >No Data Found</td></tr>:''
                  } 
                </tbody>
              </table>
            </div>
            <BrowserView>
              <div className="text-right px-3 pb-3">
                <Pagination
                  activePage={this.state.activePage}
                  totalItemsCount={this.state.totalItemsCount}
                  itemsCountPerPage={10}
                  onChange={(e) => this.pagination(e)}
                  prevPageText={"Prev"}
                  nextPageText={"Next"}
                  pageRangeDisplayed={3}
                />
              </div>
            </BrowserView>
            <MobileView>
              <div className="text-right px-3 pb-3">
                <Pagination
                  activePage={this.state.activePage}
                  totalItemsCount={this.state.totalItemsCount}
                  itemsCountPerPage={2}
                  onChange={(e) => this.pagination(e)}
                  prevPageText={"Prev"}
                  nextPageText={"Next"}
                  pageRangeDisplayed={3}
                />
              </div>
            </MobileView>
          </div>

        
      </div>


      <AppDialog open={isInviteUser}
        maxWidth={'xs'}
        className="invite-user-modal"
        onClose={() => this.openModel(false, 'isInviteUser')}
        modelTitle={'Create New User'}
        content={
          <>{isLoading ? <Loader /> :
            <div className='contentModal'>
              <div className="mb-20 Userinput">
                <label className="text-left" for="email">Email</label>
                <div >
                  <TextFields id="email" name="email" value={this.state.email} auto onChange={(e) => this.handlerInput(e)} />
                  {errors['email'] && <span className='error'>{errors.email}</span>}
                </div>
              </div>
              <div className="mb-20">
                <label className="text-left" for="role">Role </label>
                <div >

                  <CustomSelect onChange={this.handlerInput} options={roles} name='role' value={role} />

                  {errors['role'] && <span className='error'>{errors.role}</span>}
                </div>
              </div>
              <ButtonLightBlue onClick={this.inviteUser} className="mt-3 mb-2">Create User</ButtonLightBlue>
            </div>
          }
          </>
        }
      />

    </div>
  );
}