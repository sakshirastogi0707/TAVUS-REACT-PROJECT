import React from "react";
import moment from "moment";
import { AppImage } from "../../$widgets/images/app-image";
import TextFields from "../../$widgets/input-fields/text-field";
import './template';
import { Grid } from "@material-ui/core";
import Loader from "../../$widgets/loader/loader"
import { ButtonGray } from "../../$widgets/buttons/button-gray";
import CustomSelect from "../../$widgets/input-fields/custom-select";
import AppDialog from "../../$widgets/AppDialog/AppDialog";
import Pagination from "react-js-pagination";
import CheckboxLabels from "../../$widgets/checkbox/checkbox";
import Tooltip from '@material-ui/core/Tooltip';
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";
import SingleDropdown from "../../$widgets/dropdown/singledropdown";
import { BrowserView, MobileView, isBrowser, isMobile } from 'react-device-detect';
import SearchIcon from '@material-ui/icons/Search';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import AddIcon from '@material-ui/icons/Add';

export function html() {
  const { errors, templatesWithUsers, allUsers, assignTemplate, assignUser, isLoading, removeUser, openSearch, searchField, role, tempUsers, selectedTemplates } = this.state;
  const { } = this.props;
  const theme = createMuiTheme({
    overrides: {
      MuiTooltip: {
        tooltip: {
          position: "relative",
          fontSize: "14px",
          color: "#fff",
          backgroundColor: "#000000",
          left: "-10px",
          top: "10px",
          padding: "5px 15px",
        }
      }
    }
  });

  let placeholder = (defaultStyles) => {
    return {
      ...defaultStyles,
      color: '#ffffff',
    }
  }

  return (
    <div className={'template-main'}>
      <Grid container className={'user justify-content-between'}>
        <Grid item xs={12} sm={12} md={12} lg={12}>
          <div className="d-flex justify-content-between">
            <div className={'title'}>Campaigns</div>
          </div>
        </Grid>

      </Grid>
      <Grid container className=" mt-4 pb-4">
          <Grid item xs={12} sm={12} md={3} lg={3} >
          </Grid>
          <Grid item xs={12} sm={12} md={9} lg={9} className="align-self">
          <div className="d-flex d-flex-mobile justify-content-end">
            <div className="d-flex search-section pr-2">
              <div className={'searchDiv align-self p-0'}>
                {openSearch ?
                  <div className={'search-icon '}>
                    <div className="md-form mt-0">
                      <SearchIcon className="search-thumb" />
                      <AppImage name={'coolicon.svg'} onClick={() => this.setState({ searchField: '', openSearch: false }, () => this.templatesWithAsign(this.state.page, this.state.searchField, false))} className="search-cross" />
                      <input onChange={(e) => this.setState({ searchField: e.target.value }, () => this.templatesWithAsign(1, this.state.searchField, false))} name="searchField" value={this.state.searchField} className="form-control" type="text" placeholder="Search" aria-label="Search" />
                    </div>
                  </div>
                  :
                  <div className={'search-icon '}>
                    <SearchIcon onClick={() => this.setState({ openSearch: true })} />
                  </div>
                }
              </div>
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
                    <th className="table_title">Campaign ID</th>
                    <th>Campaign Name</th>
                  </tr>
                </thead>
                {isLoading ? <Loader /> :
                <tbody>
                  {templatesWithUsers && templatesWithUsers.length > 0 && templatesWithUsers.map((temp, key) => {
                    return <tr key={key}>
                      <td>
                        <div className="templateId align-self pl-1">{temp?.id} </div>
                      </td>
                      <td>{`${temp?.campaign_name}`}</td>
                    </tr>
                  })}
                  {!isLoading && templatesWithUsers&&  templatesWithUsers.length == 0 ?
                    <tr><td colSpan={3} style={{textAlign:'center'}} > No Data Found</td></tr>:''
                  } 
                </tbody>
                 }
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
                  itemsCountPerPage={6}
                  onChange={(e) => this.pagination(e)}
                  prevPageText={"Prev"}
                  nextPageText={"Next"}
                  pageRangeDisplayed={2}
                />
              </div>
            </MobileView>
          </div>
      </div>
      <AppDialog open={assignUser}
        maxWidth={'xs'}
        className="invite-user-modal"
        modelTitle={'Assign'}
        onClose={() => this.openModel(false, 'assignUser')}
        content={
          <>{this.state.isLoadingPopup ? <Loader /> :
            <div className='contentModal assign_user '>
              <div className="search-section">
                <div className={'searchDiv align-self p-0'}>
                  <div className={'search-icon  assignUser1'}>
                    <div className="md-form mt-0">
                      <SingleDropdown
                        isMulti
                        className="test-classname"
                        onInputChange={this.handleSearchUser}
                        options={allUsers && allUsers}
                        BackdropProps={{ style: { backgroundColor: 'white' } }}
                        onChange={val => this.handleSelectUser(val)}
                        components={{ DropdownIndicator: () => null, IndicatorSeparator: () => null }}
                        placeholder={<div className="placeholder-text"><SearchIcon  /> </div>}
                      />
                    </div>
                    <div className="d-flex">
                      <ButtonGray className="mt-35 mb-2" onClick={() => this.assignTemplate(this.state.selectedUsers, this.state.selectedTemplates)} >Submit</ButtonGray>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          }
          </>
        }
      />








      <AppDialog open={assignTemplate}
        maxWidth={'auto'}
        className="invite-user-modal"
        flag={false}
        onClose={() => this.openModel(false, 'assignTemplate')}
        modelTitle={'Assign User'}
        content={
          <>{this.state.isLoadingPopup ? <Loader /> :
            <div className='contentModal assign_user'>
              <div className="search-section">
                <div className={'searchDiv align-self p-0'}>
                  <div className={'search-icon assignUser1'}>
                    <div className="fixedDrop md-form mt-0">

                      <SingleDropdown
                        options={allUsers}
                        value={this.state.selectedTempSearch}
                        onInputChange={this.handleSearchUser}
                        placeholder={<div className="placeholder-text"> <SearchIcon /> Search user</div>}
                        components={{ DropdownIndicator: () => null, IndicatorSeparator: () => null }}
                        onChange={(val) => this.assignTemplate([val], [templatesWithUsers[tempUsers].template_id])}
                      />
                    </div>
                  </div>
                  <div className="invite-user-list">
                    <table className="table table-fixed">
                      <tbody>
                        {templatesWithUsers && templatesWithUsers[tempUsers]?.campaign_access && templatesWithUsers[tempUsers]?.campaign_access.length > 0 && templatesWithUsers[tempUsers]?.campaign_access.sort((a, b) => a.created_at < b.created_at ? 1 : -1).map((temp, key) => {
                          return <tr key={key}>
                            {temp?.user_info &&
                              <>
                                <td width="90px">
                                  <div className="userbox">
                                    <span className={"user-circle"} style={{ background: temp?.user_info?.avatar_color }}>
                                      {
                                        temp?.user_info?.first_name ?
                                          this.getNameInitials(temp?.user_info?.first_name, temp?.user_info?.last_name) :
                                          this.getNameInitials(temp?.user_info?.email, '')
                                      }
                                    </span>
                                  </div>
                                </td>
                                <td className="align-self"><span>{`${temp?.user_info?.first_name ? temp?.user_info?.fullName : temp?.user_info?.email}`}</span></td>
                                <td className="text-right">
                                  <AppImage onClick={() => this.openModelDeleteModal(temp, templatesWithUsers[tempUsers].template_id)} name={'close_circle.svg'} />
                                </td>
                              </>
                            }
                          </tr>
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>

            </div>
          }
          </>
        }
      />
      <AppDialog open={removeUser}
        maxWidth={'sm'}
        className="video-modal"
        onClose={() => this.setState({ removeUser: false })}
        modelTitle={'Remove user'}
        content={
          <>
          {this.state.isLoadingDelete ? <Loader /> :
            <div className='setting-modal'>
              <h3 className="m-title">Are you sure you want to remove this user from selected template?</h3>
                <div className="setting-text">
                  <div className="d-flex">
                    <ButtonGray className="Btn-white mt-35 mb-2 mr-2" onClick={() => this.openModel(false, 'removeUser')}>No</ButtonGray>
                    <ButtonGray className="mt-35 mb-2 ml-2" onClick={() => this.deleteUserFromTemp()} >Yes</ButtonGray>
                  </div>
                </div>
            </div>
            }
          </>
        }
      />

    </div>
  );
}
