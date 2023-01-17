import React from "react";
import Invite from './invite'
import AppFooter from "../../app-frame/app-footer/app-footer";
import Header from "../../app-frame/app-header/app-header"
import IconLabelButtons from '../../$widgets/buttons/icon-label-buttons'
export function html() {
    const {isInviteTeam, allUsers,seats, userDetail} = this.state;
    const {} = this.props;
    return (
        <div className={'invite-user-main'}>
            <div className={'align-self-center w-100'} >
                <Header
                    userData={userDetail}
                    title="Team Members"
                    subtitle="Collaborate with others in your workspace" /> 
                
                <div className={'container'}> 
                    <div className="box boxDev d-flex flex-column align-items-center justify-content-center ">
                        <div className="DevBox inviteBtn ">
                                <div className="text-center  pd-48">
                                    <IconLabelButtons  onClick={()=>this.setState({isInviteTeam: true})} title="Invite Team Members" startIcon="person-add-outline.svg" />
                                </div>
                                {allUsers && allUsers.length>0 && 
                                <div className="invite-user">
                                    <table className="tabel_list table table-fixed">
                                        <thead>
                                            <tr>
                                                <th width="30%" className="table_title">Members</th>
                                                <th width="30%" className="text-end">Status </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                        {allUsers && allUsers.length>0 && allUsers.map((val)=> {
                                            return  <tr >
                                                        <td >
                                                            <span className="userbox">
                                                                <span className="user-circle">
                                                                {
                                                                    val?.first_name ?
                                                                    this.getNameInitials(val?.first_name, val?.last_name) :
                                                                    this.getNameInitials(val?.email, '')
                                                                }
                                                                </span>
                                                            </span>
                                                            <span className="align-self user_title vertical-middle">{val.email}</span>
                                                        </td>
                                                        <td style={{textTransform: 'capitalize'}} className="text-end">{val.status =='invited' ? 'Invite Sent': val.status}</td>
                                                    </tr>
                                            })}
                                        </tbody> 
                                    </table>
                                </div>
                                    }
                        </div>
                    </div>
                </div>
                <AppFooter 
                    userData={userDetail}
                    invite={true}
                    title={allUsers.length>0 ?'Next':'Skip'}  
                    isActive={allUsers.length>0 ?true:false}  
                    isBack={false}
                    step={'invite'}
                    onClick={()=>this.handleOnclick(allUsers.length>0 ?'Next':'Skip')}
                    disabled={(userDetail.campaign_count>1) ? true : false} 
                />
                <Invite
                    isInviteTeam={isInviteTeam}
                    setInvite={this.setInvite}
                    getUserDEtail={this.getUserDEtail}
                    seats={seats}
                    myDetail={userDetail}
                />
            </div>
        </div>
    );
}